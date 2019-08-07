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
# Custom Database Connection Best Practices



## Script template best practices

Use the following checklist to make sure your scripts achieve the results you intend:

1. **Set a `user_id` on the returned user profile that is consistent for the same user every time.**
   In the migration scenario, this is important because if you set a random `user_id` in the `get_user` script, then call `forgot password` and change the password, the user will get duplicated every time they log in.  In the non-migration scenario, if you set a random `user_id` you can end up with duplicate users for every login.

2. **If using a `username`, ensure that you aren't returning the same email address for two different users in the `get_user` or `login` script.**
   Auth0 will produce an error if you do this, but it is better to catch it in the script itself. 

3. **If setting `app_metadata`, call it `metadata` in the script.**
   To support backwards compatibility, `app_metadata` is called `metadata` in custom DB scripts. If you don't use `metadata` in the script, you will get an error where `app_metadata` will work but if you use the API to merge `app_metadata` with a user, it will appear as if all of your metadata was lost. 

   ::: note
   `user_metadata` is not affected by this and can simply be called `user_metadata`.
   :::

4. **If using Auth0 to do machine-to-machine to the legacy database, restrict access to that audience with a rule.**
   As with any API that you create, if you create it solely for client credentials, then you will want to restrict access to the API in a rule. By default, Auth0 gives you a token for any API if you authenticate successfully and include the <dfn data-key="audience">audience</dfn>. Someone could intercept the redirect to authorize and add the audience to your legacy database API. If you don’t block this in a rule, they will get an access token.

::: note
You can also update the API to expect the sub of the token to end in `@clients`.
:::

5. **Determine if they are accessing their database directly versus through an API.**
   This item is not a requirement; it is a recommended best practice. A database interface is extremely open. You should add protections between an API endpoint and your database. Most people do not expose their database directly to the internet. Though you can whitelist Auth0 IPs, those IPs are shared in the cloud environment. In general, Auth0 recommends that you protect your database from too many actors directly talking to it. The alternative is to create a simple API endpoint that each script within Auth0 can call. That API can be protected using an access token. You can use the client credentials flow to get the Access Token from within the rules. 

6. **If enabling trickle migration, ensure the following:**

   * **The `Login` script and the `get_user` script both return the same user profile.**
      Because of the two different flows (logging in, or using forgot password), if the `get_user` and `login` script return different user profiles, then depending on how a user migrates (either by logging in directly, or using the forgot password flow) they will end up with different profile information in Auth0.

   * **If setting `app_metadata` or `user_metadata`, use a rule to fetch the metadata if it is missing.**
      The metadata is not migrated until https://YOUR_TENANT.auth0.com/login/callback is called. However, the user credentials are migrated during the post to `usernamepassword/login`. This means that if the browser is killed, or computer dies or something on a user after they have posted to `usernamepassword/login`, but before login/callback, then they will have a user in the Auth0 database, but their app and user metadata are lost. It is really important, therefore, to create a rule that looks a lot like your `get_user` script to fetch the profile if app and user metadata are blank. This should only execute once per user at most (and usually never).

   * **Use a rule to mark users as migrated.**
      This is not a hard requirement, but it does protect against one scenario in which a user changes their email address, then changes it back to the original email address. A rule should call out to the legacy database to mark the user as being migrated in the original database so that `get_user` can return false. 

### User Metadata and Custom Databases

Depending on your custom database script, you may return a user profile to Auth0 apps. This profile includes the user metadata fields. The **app_metadata** field(s) should be [referred to as **metadata** in scripts for custom databases](/users/concepts/overview-user-metadata#metadata-and-custom-databases).

### Identity Provider (IdP) Tokens

If the `user` object returns the `access_token` and `refresh_token` properties, Auth0 handles these slightly differently from other pieces of user information. They will be stored in the `user` object's `identities` property, and retrieving them using the API, therefore, requires an additional <dfn data-key="scope">scope</dfn>: `read:user_idp_tokens`.

```js
{
  "email": "you@example.com",
  "updated_at": "2019-03-15T15:56:44.577Z",
  "user_id": "auth0|some_unique_id",
  "nickname": "a_nick_name",
  "identities": [
    {
      "user_id": "some_unique_id",
      "access_token": "e1b5.................92ba",
      "refresh_token": "a90c.................620b",
      "provider": "auth0",
      "connection": "custom_db_name",
      "isSocial": false
    }
  ],
  "created_at": "2019-03-15T15:56:44.577Z",
  "last_ip": "192.168.1.1",
  "last_login": "2019-03-15T15:56:44.576Z",
  "logins_count": 3
}
```

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

As depicted in the diagram below, you use custom database connections as part of Universal Login workflow in order to obtain user identity information from your own, legacy identity store. This can be for either (a) authentication - often referred to as legacy authentication - or (b) user import via [automatic migration](/users/guides/configure-automatic-migration) (a.k.a trickle or lazy migration). For the purpose of the remaining guidance we will refer to any authentication against an external identity store as “legacy authentication”.

![Custom Database Connections Anatomy](/media/articles/connections/database/custom-database-connections.png)

In addition to artifacts common for all database connection types, a custom database connection allows you to configure action scripts: custom code that’s used when interfacing with your independent (legacy) identity store. For the purpose of this guide, we will refer to any external identity storage as a *legacy identity store*. The scripts available for configuration are described in the [Execution](#execution) section, and will depend on whether you are creating a custom database connection for legacy authentication or for automatic migration.

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

As described in the [Anatomy](#anatomy) section, a custom database connection type allows you to configure action scripts: custom code that is used when interfacing with your legacy identity store. Each action script is essentially a named JavaScript function that is passed a number of parameters, with the name of the function and the parameters passed dependent on the script in question. 

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
| `password` | The password credential for the user is passed to the login script in plain text so care must be taken regarding its use.  |
| `callback` | For login, the callback function is executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter indicates that the operation executed successfully, while a non-null first parameter value indicates that some error condition occurred. If the first parameter is null then the second parameter is the profile for the user in JSON format. If the first parameter is non-null then the second parameter can be omitted. When indicating an error condition we recommend using an instance of either the `WrongUsernameOrPasswordError` or `Error` object (e.g., `callback(new WrongUsernameOrPasswordError()`) - in order to provide Auth0 with clear indication of whichever error condition. Both of these objects also take an option string parameter which can be used to provide additional information. |

#### `password` `bcrypt` example

You should refrain from storing it or transporting it anywhere in its vanilla form. Instead, prefer to use something similar to the following example below, which uses the `bcrypt` algorithm to perform cryptographic password comparison (and where the user object is the user identity as read from the legacy identity store).

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

#### `callback` `profile` example 

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

The `getUser` action script implements the function executed in order to determine the current state of existence of a user. We recommend naming this function getUser. The script is optional for both legacy authentication and for automatic migration, though we recommend its implementation. 

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
| `callback` | For `getUser`, the callback function is executed with up to two parameters. The first parameter is an indication of status: a null first parameter with a corresponding second parameter indicates that the operation executed successfully; a null first parameter with no corresponding second parameter indicates that no user was found, whilst a non null first parameter value indicates that some error condition occurred. If the first parameter is null then the second parameter should be the profile for the user in JSON format (if a user was found). If the first parameter is null and no user was found, or if the first parameter is non null, then the second parameter can be omitted. The second parameter provided to the callback function should be the profile for the user. This should be supplied as a JSON object in normalized user profile form. See the [profile](#profile) section in the `login` script above for further details. |

::: warning
When indicating an error condition we recommend using an instance of the Error object - e.g. `callback(new Error(“an error message”)`) in order to provide Auth0 with clear indication of the error condition. 
:::

### Create

The create action script implements the function executed in order to create a user in the legacy identity store. We recommend naming this function create. The script is only utilized in a legacy authentication scenario, and must be implemented if support in Auth0 is required for creating users in the legacy identity store - e.g. if user signup via Auth0 is required. If support is not required - e.g. if user signup via Auth0 is not required - then the script need not be implemented; not implementing the script will not preclude the creation of a user by some mechanism external to Auth0. The create function implemented in the script should be defined as follows:

```js
function create(user, callback) {
  // TODO: implement your script
  return callback(null);
}
```

::: note
The `create` action script is only responsible for creating a user identity in the legacy identity store. The call to create will typically be preceded by one or more calls to getUser (in order to determine if the user already exists), and followed by a call to login in order to obtain user profile information.  
:::

| Attribute | Description |
| --- | --- |
| `user` | An object containing attributes associated with the user identity to be created. |
| `callback` | For `create`, the `callback` function is executed with a single parameter. The parameter is an indication of status: a `null` indicates that the operation executed successfully, while a non-null value indicates that some error condition occurred. |

When indicating an error condition we recommend using an instance of the `Error` object (e.g., `callback(new Error(“an error message”))`) in order to provide Auth0 with clear indication of the error condition. 

#### `user` example

```js
{
    client_id: "<ID of creating client (application)>",
    tenant: "<name of creating Auth0 tenant>",
    email: "<email address for the user>",
    password: "<password for the user>",
    username: "<name associated with the user>",
    user_metadata: {
        "language": "en"
    },
    app_metadata: {
        "plan": "full"
    }
}
```

The `password` credential for the user is passed to the `create` script in plain text so care must be taken regarding its use. You should refrain from logging, storing, or transporting it anywhere in its vanilla form. Instead, prefer to use something similar to the following example below, which uses the [`bcrypt`](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) algorithm to perform cryptographic hash encryption:

```js
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) { 
      return callback(err); 
    } else {
	  .
	  .
    }
  });
```

If a username is supplied then this will typically be due to a custom database connection type having [`Requires Username`](/connections/database/require-username) as an enabled setting. If this is the case then username will need to be provided on any subsequent login or `getUser` execution, so should be stored accordingly in the legacy identity store. If the setting is not enabled then username will typically be optional. 

Whist `user_metadata` and `app_metadata` are optional, if supplied they do not necessarily need to be stored in the legacy identity store; Auth0 will automatically store these values as part of the user profile record created internally. Rather, these values are (optionally) provided as a reference: their contents potentially being influential to legacy identity creation. 

::: note
Note that unlike with login, `app_metadata` will be specified as-is and will not be renamed as `metadata`.
:::

### Verify

The verify action script implements the function executed in order to mark the verification status of a user’s email address in the legacy identity store. Email verification status information is typically returned via email_verified as part of any user profile information returned (see login and get user for further details). The script is executed when a user clicks on the link in the verification email sent by Auth0, and we recommend naming this function verify. The script is only utilized in a legacy authentication scenario, and must be implemented if support is required for Auth0 email verification functionality.

Whilst it’s not mandatory to implement the verify function per-se, it is a recommended best practice. The function is required to support user email address verification, and a verified email address for a user is critical to a number of the workflow scenarios in Auth0. 

Emails play a big part in the functionality supported in Auth0, and having a verified email address is critical in a number of workflow scenarios. Implementing the script will provide support for these workflows out-of-box, and the verify function implemented in the script should be defined as follows:

```js
function verify(email, callback) {
  // TODO: implement your script
  return callback(null, JSON Object);
}
```

::: note
Whilst the verify function is called when a user clicks on the link in the verification email sent by Auth0, change in email verification status influenced by other operations - such as via user profile modification in the Auth0 Dashboard - is performed via the change email script (described below).
:::

| Attribute | Description |
| --- | --- |
| `email` | The email address for the user as the user identifying credential. |
| `callback` | For verify, the callback function is executed with up to two parameters. The first parameter is an indication of status: a null first parameter with a corresponding second parameter indicates that the operation executed successfully, whilst a non null first parameter value indicates that some error condition occurred. |

### `callback` example

If the first parameter is null then the second parameter should be a JSON object in a format similar to the following:

```js
{
    "user_id": "<user identifier>",
    "email": "jane.doe@example.com",
    "email_verified": true
}
```

::: panel Best Practice
When indicating an error condition we recommend using an instance of the `Error` object (e.g., `callback(new Error(“an error message”))`) in order to provide Auth0 with clear indication of the error condition. 
:::

