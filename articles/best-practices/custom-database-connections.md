---
description: Best practices for custom database connections.
toc: true
topics:
  - best-practices
  - custom-database
  - extensibility
contentType: reference
useCase:
  - best-practices
  - custom-database
---

# Custom Database Connections Best Practices

With [Extensibility](/topics/extensibility) you can add custom logic in Auth0 to build out last mile solutions for Identity and Access Management (IdAM). Auth0 extensibility comes in several forms: Rules, Hooks, and scripts for both [custom database connection](/connections/database/custom-db) and custom database connection migration. Each is implemented using `Node.js` running on the Auth0 platform in an Auth0 Tenant. Auth0 extensibility executes at different points in the IdAM pipeline: 

* **Rules** run when artifacts for user authenticity are generated (i.e., an ID Token in OIDC), an Access Token in OAuth 2.0, or an assertion in SAML. 
* **Hooks** provide additional extensibility for when there is an exchange of non-user related artifacts, and for when user identities are created (see both pre user registration and post user registration Hooks for further details). 
* **Custom database scripts** can be used to integrate with an existing user identity store, or can be used where automatic user migration (from an independent legacy identity store) is required. 

Whatever the use case, Auth0 extensibility provides comprehensive and sophisticated capability to tailor IdAM operations to your exact requirements. However, if not used in the right way, this can open up the potential for improper or unintended use which can lead to problematic situations down the line. In an attempt to address matters ahead of time, this article provides best practice guidance to both designers and implementers, and we recommend reading it in its entirety at least once, even if you've already started your journey with Auth0.    

You typically use a custom database connection to provide access to your own identity store for the purpose of either authentication (often referred to as *legacy authentication*) or to import users by automatic migration (*trickle* or *lazy* migration). You can also use custom database connections to proxy access to an Auth0 tenant in scenarios where you use Auth0 multi-tenant architecture. For further details regarding this use case see the <to be documented> section below. 

You create and configure custom database connections with the Auth0 Dashboard. First you create a database connection, and then toggle **Use my own database** to enable editing of the database action scripts. You can also create and configure a custom database connection using the [Auth0 Management API](/docs/api/management/v2#!/Connections/post_connections) and the `auth0` strategy. 

![Custom Database Connections Dashboard](/media/articles/connections/database/custom-database.png)

## Anatomy

As depicted in the diagram below, custom database connections are utilized as part of Universal Login workflow in order to obtain user identity information from your own, independent (a.k.a. legacy) identity store. This can be for either (a) authentication - often referred to as legacy authentication - or (b) user import via [automatic migration](/users/guides/configure-automatic-migration) (a.k.a trickle or lazy migration). For the purpose of the remaining guidance we will refer to any authentication against an external identity store as “legacy authentication”.

![Custom Database Connections Anatomy](/media/articles/connections/database/custom-database-connections.png)

In addition to artifacts common for all database connection types, a custom database connection allows you to configure action scripts: custom code that’s used when interfacing with an independent (a.k.a. legacy) identity store. For the purpose of the remaining guidance we will refer to any external identity storage as a “legacy identity store”. The scripts available for configuration are described in the Execution section (below), and will depend on whether you are creating a custom database connection for legacy authentication or for automatic migration.

::: note
Action scripts can be implemented as anonymous functions, however anonymous functions make it hard in debugging situations when it comes to interpreting the call-stack generated as a result of any exceptional error condition. For convenience, we recommend providing a function name for each action script, and have supplied some recommended names as part of the Execution section below.
:::

During automatic - a.k.a. Trickle - migration, Auth0 will create a new user in a (database) identity store which is managed by Auth0. From then on Auth0 will always use identity in the Auth0 managed identity store authenticating the user. For this to occur, Auth0 will first require the user be authenticated against the legacy identity store and only if this succeeds will the new user be created. The new user will be created using the same id and password that was supplied during authentication.

::: panel Best Practice
Creation of a user in an automatic migration scenario typically occurs after the login action script completes. We therefore recommend that you do not attempt any deletion of a user from a legacy identity store as an inline operation (i.e. within the login script) but prefer to do this - where required - as an independent process. This will prevent accidental deletion of a user should an error condition occur during the migration process. 
:::

In a legacy authentication scenario, no new user record is created: Auth0 will always use the identity contained in the legacy identity store when authenticating the user. In either case, the user remains in the legacy identity store and can be deleted or archived if required. 

::: note
Custom database connections are also utilized outside of Universal Login workflow. For example, a connections’ changePassword action script will be called whenever a password change operation occurs for a user that resides in a legacy identity store.
:::

## Size

As a best practice, we recommend that the total size of implementation for any action script should not exceed 100 kB. The larger the size the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any npm modules that may be referenced as part of any require statements. 

## Environment

Action scripts execute as a series of called JavaScript functions in an instance of a serverless Webtask container. As part of this, a specific environment is provided, together with a number of artefacts supplied by both the Webtask container and the Auth0 authentication server (a.k.a. your Auth0 tenant) itself.  

### `npm` modules

Auth0 serverless Webtask containers can make use of a wide range of npm modules; npm modules not only reduce the overall size of action script code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available npm modules are supported out-of-the-box. This list has been compiled and vetted for any potential security concerns. If you require an npm module that is not supported out-of-the-box, then a request can be made via the Auth0 support portal or via your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the user of npm modules from private repositories.

### Variables

Auth0 action scripts supports the notion of environment variables, accessed via what is defined as the globally available configuration object. The configuration object should be treated as read-only, and should be used for storing sensitive information - such as credentials or API keys for accessing external identity stores. This mitigates having security sensitive values hard coded in an action script. 

The configuration object can also be used to support whatever Software Development Life Cycle (SDLC) best practice strategies you employ by allowing you to define variables that have tenant specific values. This mitigates hard code values in an action script which may change depending upon which tenant is executing it.

### `global` object

Auth0 serverless Webtask containers are provisioned from a pool that's associated with each Auth0 tenant. Each container instance makes available the global object, which can be accessed across all action scripts that execute within the container instance. The global object acts as a global variable and can be used to define information, or to even define functions, that can be used across all action scripts (that run in the container) irrespective of the execution instance.

The global object can also be used to cache expensive resources, such as an Access Token for a third-party (e.g., logging) API that provides non user-specific functionality or an Access Token to your own API defined in Auth0 and obtained by using Client Credentials flow.

For each instantiation of a new Webtask container the global object is reset. Thus, any declaration within the global object should also include provision for initialization.

## Execution

As described in the Anatomy section (above), a custom database connection type allows you to configure action scripts: custom code that is used when interfacing with your legacy identity store. Each action script is essentially a named JavaScript function that is passed a number of parameters, with the name of the function and the parameters passed dependent on the script in question. 

Action script execution supports the asynchronous nature of JavaScript, and constructs such as Promise objects and the like can be used. Asynchronous processing effectively results in suspension pending completion of an operation, and an Auth0 serverless Webtask container typically has a circa 20-second execution limit - after which the container may be recycled. Recycling of a container due to this limit will prematurely terminate operation, ultimately resulting in an error condition being returned (as well as resulting in a potential reset of the global object). 

The callback function supplied to each action script effectively acts as a signal to indicate completion of operation. An action script should complete immediately following a call to the callback function - either implicitly or, preferably, by explicitly executing a (JavaScript) return statement - and should refrain from any other operation. The (Auth0) supplied callback function must be called exactly once; calling the function more than once within an action script will lead to unpredictable results and/or errors.

::: note
Where callback is executed with no parameters, as in callback(), the implication is that function has been called as though callback(null) had been executed. 
:::

If an action script is making use of asynchronous processing, then a call to the (Auth0) supplied callback function must be deferred to the point where asynchronous processing completes, and must be the final thing called. Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete; this callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. 

Failure to execute the callback function will result in a stall of execution, and ultimately in an error condition being returned. The action script must call the callback function exactly once: the callback function must be called at least once in order to prevent stall of execution, however it must not be called more than once otherwise unpredictable results and/or errors will occur.

### Login

The login action script implements the function executed each time a user is required to authenticate. We recommend naming this function login. The login function is typically utilized during Universal Login workflow, but is also applicable in other authentication flow scenarios (such as Resource Owner Password Grant). The script is mandatory for both legacy authentication and for automatic migration, and the login function implemented should be defined as follows:

```js
function login(userNameOrEmail, password, callback) {
  // TODO: implement your script
  return callback(null, profile);
}
```

| Attribute | Description |
| --- | --- |
| `userNameOrEmail` | The identification credential for the user, and is typically either the email address for the user or the name associated with the user. With default out-of-box Universal Login, support for the use of user name during login is available only if the Requires Username setting is enabled for the database connection.  |
| `password` | The password credential for the user is passed to the login script in plain text so care must be taken regarding its use. You should refrain from storing it or transporting it anywhere in its vanilla form. Instead, prefer to use something similar to the following example below, which uses the `bcrypt` algorithm to perform cryptographic password comparison (and where the user object is the user identity as read from the legacy identity store). |
| `callback` | For login, the callback function is executed with up to two parameters. The first parameter is an indication of status: a null first parameter with a corresponding second parameter indicates that the operation executed successfully, whilst a non null first parameter value indicates that some error condition occurred. If the first parameter is null then the second parameter is the profile for the user in JSON format. If the first parameter is non null then the second parameter can be omitted. When indicating an error condition we recommend using an instance of either the WrongUsernameOrPasswordError or Error object - e.g. callback(new WrongUsernameOrPasswordError()) - in order to provide Auth0 with clear indication of whichever error condition. Both of these objects also take an option string parameter which can be used to provide additional information. |

::: warning
The password credential for the user is passed to the login script in plain text so care must be taken regarding its use. Refrain from logging, storing or transporting it anywhere in its vanilla form. Instead prefer to use it only with something like bcrypt as part of cryptographic comparison.
:::

```js
	bcrypt.compare(password, user.password, function (err, isValid) {
	  if (err) {
	    return callback(err);
	  } else 
	  if (!isValid) {
	    return callback(new WrongUsernameOrPasswordError());
	  } else {
	    return callback(null, {
		user_id: user.identifier.toString(),
		email_verified: (user.verified) ? true : false,
		email: user.email
	    });
	  }
	});
```

#### `callback` profile 

The second parameter provided to the `callback` function should be the profile for the user. This should be supplied as a JSON object in normalized user profile form. 

::: warning
The profile returned by the login script for a user should be consistent with the profile returned in the get user script, and vice-versa.
:::

Additionally, you can also provide metadata for a user as part of the user profile returned. The following is an example of the profile object that can be returned for a user.

```js
{
    "username": "<user name>",
    "user_id": "<user identifier>",
    "email": "jane.doe@example.com",
    "email_verified": false,
    "user_metadata": {
        "language": "en"
    },
    "metadata": {
        "plan": "full"
    }
}
```

::: warning
If you are providing app_metadata as part of the user profile then you should refer to this as metadata in the profile object returned. Failure to do this will result in a loss of the metadata if any modifications are made to the users’ `app_metadata` in the future. 
:::

If a custom database connection type has Requires Username as an enabled setting then the profile returned for the user must include a username. If the setting is not enabled then username is optional and can be omitted. 

The user_id value must be specified and provides the unique identifier for a user. For the auth0 strategy - the strategy used to define a custom database connection - Auth0 will automatically decorate whatever user_id value is supplied by prefixing the text auth0| in order to create the user_id in the root of the normalized user profile. The user_id value supplied will appear in it’s undecorated form in the identities array associated with the user profile in Auth0. 

::: warning
The user_id value specified must be unique across all database connections defined to an Auth0 tenant. Failure to observe this will result in user identifier collision which will lead to unpredictable operation. One way to avoid this is to explicitly prefix the supplied user_id with the name of, or pseudonym for, the connection (omitting any whitespace).
:::

The user_id must also be consistent for any given user; the value returned by the login script  must also be consistent with the value returned by the get user script, and vice-versa. Failure to observe this requirement can lead to duplicate Auth0 user profiles for a user, duplicate identities for any user migrated via automatic migration, and/or unpredictable results when it comes to user operations. 

::: warning
The user_id returned by the login script must be consistent for any given user and must also be consistent with the value returned by the get user script, and vice-versa. Failure to observe this requirement can lead to duplication in Auth0 and/or unpredictable results when it comes to user operation.
:::

An email value should also be specified. Whilst an email address is not mandatory for a user per-se, much of Auth0 out-of-box functionality - such as password reset - requires that a user has a valid email address. And one that has been verified too. Email addresses should be returned consistently - i.e. both the login script and the get user script should return the same value for any given user - and should also be unique within the context of a single custom database connection; the latter being particularly pertinent in automatic migration scenarios. Failure to observe either of these requirements will typically lead to unpredictable results when it comes to user operation.   

::: panel Best Practice
Whilst a user does not need to use an email address to login, it’s recommended best practice that they have an email address defined against their user profile. This ensures that Auth0 out-of-box functionality works as designed. Including password reset workflow, critical to good user experience. Where an email is specified it should be returned consistently between the login and the get user scripts, and should also be unique within the context of a single custom database connection. 
:::

For a legacy authentication scenario, you can also enable the `Sync user profile at each login` option for a custom database connection. This will allow update of attributes in the Auth0 user profile, each time a login for the user occurs, for attributes that would otherwise not be available for update via the Auth0 Management API. For legacy authentication scenarios there are a number of root profile attributes which cannot be updated directly via the Management API.

::: note
In order to update name, nickname, given_name, family_name, and/or picture attributes associated with the root of the normalized user profile, you must configure user profile sync so that user attributes will be updated from the identity provider. Auth0 does not support update of these attributes for a custom database  connection used for legacy authentication.   
:::

### Get User

The get user action script implements the function executed in order to determine the current state of existence of a user. We recommend naming this function getUser. The script is optional for both legacy authentication and for automatic migration, though we recommend its implementation. 

::: panel Best Practice
While it’s not mandatory to implement the `getUser` function *per se*, it is a recommended best practice. The `getUser` function is required to support password the reset workflow recommended for great customer experience. 
:::

For automatic migration the script is executed whenever executing password reset workflow - e.g. a forgot password from Universal Login - and for legacy authentication it is executed whenever the following out-of-box operations occur: create user, change email, change password and password reset (e.g via forgot password workflow). The getUser function implemented in the get user action script should be defined as follows:

```js
function getUser(email, callback) {
  // TODO: implement your script
  return callback(null, profile);
}
```

| Attribute | Description |
| --- | --- |
| `email` | The email address for the user as the user identifying credential. |
| `callback` | For `getUser`, the callback function is executed with up to two parameters. The first parameter is an indication of status: a null first parameter with a corresponding second parameter indicates that the operation executed successfully; a null first parameters with no corresponding second parameter indicates that no user was found, whilst a non null first parameter value indicates that some error condition occurred. If the first parameter is null then the second parameter should be the profile for the user in JSON format (if a user was found). If the first parameter is null and no user was found, or if the first parameter is non null, then the second parameter can be omitted. The second parameter provided to the callback function should be the profile for the user. This should be supplied as a JSON object in normalized user profile form. See the [profile](#profile) section in the login script above for further details. |

::: warning
When indicating an error condition we recommend using an instance of the Error object - e.g. `callback(new Error(“an error message”)`) in order to provide Auth0 with clear indication of the error condition. 
:::

### Create

