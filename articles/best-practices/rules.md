---
title: Rules Best Practices
description: Learn about best practices for writing and managing Auth0 Rules.
toc: true
topics:
  - best-practices
  - rules
contentType: reference
useCase:
  - best-practices
  - rules
---

# Rules Best Practices

[Rules](/rules) can be used in a [variety of situations](/rules#what-can-i-use-rules-for-) as part of the authentication pipeline where protocol specific artifacts are generated:

- an ID Token in [OpenID Connect (OIDC)](/protocols/oidc)
- an <dfn data-key="access-token">Access Token</dfn> in [OAuth 2.0](/protocols/oauth2)
- an [assertion in SAML](/protocols/saml/saml-configuration/saml-assertions#use-rules)

A new pipeline in which rules execute is created for each authentication request.

Auth0 provides a number of [pre-existing Rules/Rule templates](https://github.com/auth0/rules) to help you achieve your goal(s). You may also want to [build your own Rule(s)](/rules/guides/create) to support your specific functionality requirements. You can modify a pre-existing rule template or choose to start from scratch using one of our [samples](/rules/references/samples). Either way, there are a number of best practices that you’ll want to adopt to ensure that you achieve the best possible outcome.

The image below shows the [Auth0 Dashboard](/dashboard) with a number of enabled and disabled rules for a specific [Auth0 Tenant](/getting-started/the-basics#account-and-tenants). Enabled rules&mdash;those with the green toggle&mdash;are those rules that are active and will execute as part of a pipeline. Disabled rules&mdash;those with the greyed-out toggle&mdash;on the other hand, won't.

![Rules Dashboard](/media/articles/rules/rules-best-practice-dashboard.png)

## Anatomy

A rule is essentially an anonymous JavaScript function that is passed three parameters: a [`user`](#user-object) object, a [`context`](#context-object) object, and a [`callback`](#callback-function) function.

```js
    function (user, context, callback) {
        // TODO: implement your rule
        return callback(null, user, context);
    }
 ```

::: note
**Do not** add a trailing semicolon at the end of the function declaration as this will break rule execution. 
:::

::: panel Best Practice
Anonymous functions make it hard to interpret the call-stack generated as a result of any [exceptional error](/best-practices/error-handling#exceptions) condition. For convenience, use compact and unique naming conventions to assist with diagnostic analysis (e.g., `function MyRule1 (user, context, callback) {...}`).
:::

Rules execute in the pipeline associated with the generation of artifacts for authenticity that forms part of the overall [Auth0 engine](https://cdn.auth0.com/blog/auth0-raises-100m-to-fuel-the-growth/inside-the-auth0-engine-high-res.jpg). When a pipeline is executed, all enabled rules are packaged together in the order in which they are listed and sent as one code blob to be executed as an Auth0 serverless Webtask.

![Rules Pipeline](/media/articles/rules/rules-best-practice-pipeline.png)

## Size

We recommend that the total size of implementation for all enabled rules should not exceed 100 kB. The larger the size, the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any [`npm`](https://www.npmjs.com/) modules that may be referenced as part of any [`require`](https://nodejs.org/api/modules.html#modules_require_id) statements.

## Order

The order in which rules are displayed in the [Auth0 Dashboard](/dashboard) dictates the order in which the rules will be executed. This is important because one rule may make one or more definitions within the [environment](/best-practices/custom-db-connections/environment) associated with execution that another rule may depend upon. In this case, the rule making the definition(s) should execute before the rule that makes use of it.

::: panel Best Practice
Run expensive rules that call APIs (including the Auth0 Management API) as late as possible. If you have other, less expensive rules that could cause an `unauthorized` access determination, then you should run these first.
:::

## Environment

Rules execute as a series of called JavaScript functions in an instance of an Auth0 serverless Webtask __container__. As part of this, a specific environment is provided, together with a number of artifacts supplied by both the container and the Auth0 authentication server (your Auth0 tenant) itself.

### `npm` modules

Auth0 serverless Webtask containers can make use of a wide range of [`npm`](https://www.npmjs.com/) modules; npm modules not only reduce the overall size of rule code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available npm modules are [supported out-of-the-box](https://auth0-extensions.github.io/canirequire/). This list has been compiled and vetted for any potential security concerns. If you require an npm module that is not supported, you can request one at the [Auth0 support](https://support.auth0.com/) portal or via your Auth0 representative. Auth0 evaluates requests to determine suitability. There is currently no support in Auth0 for the use of `npm` modules from private repositories. New packages are typically added on a 2 week cycle when requested. Existing packages are rarely removed as this would cause breaking changes in rules. Keep in mind, Auth0 packages and versions are stored on an internal registry and are not in sync with `npm`.

::: panel Best Practice
When using `npm` modules to access external services, [keep API requests to a minimum](/best-practices/performance#minimize-api-requests), [avoid excessive calls to paid services](/best-practices/performance#limit-calls-to-paid-services), and avoid potential security exposure by [limiting what is sent](#do-not-send-entire-context-object-to-external-services). For more information, see [Performance Best Practices](/best-practices/performance) and [Security Best Practices](/best-practices/custom-db-connections/security).

When requiring a module in a rule, if the version is not specified, the package manager uses the first version it finds on the internal list. Only specify a version if that package contains specific logic needed in the rule. 
:::

### Environment variables

Auth0 Rules support environment variables, accessed via the globally available [configuration](/rules/guides/configuration) object. Configuration should be treated as read-only and should be used for [storing sensitive information](#store-security-sensitive-values-in-rules-settings), such as credentials or API keys for external service access. This mitigates having security-sensitive values hard-coded in a rule. It can also be used to support [Software Development Life Cycle (SDLC)](/dev-lifecycle/setting-up-env) best practice strategies you employ by allowing you to define variables that have tenant-specific values. This mitigates hard-code values in a rule which may change depending upon which tenant is executing it.

### `global` object

Auth0 serverless Webtask containers are provisioned from a pool that's associated with each Auth0 tenant. Each container instance makes available the `global` object, which can be accessed across all rules that execute within the container instance. The `global` object acts as a global variable and can be used to define information, or to even define functions, that can be used across all rules (that run in the container) irrespective of the pipeline instance:

```js
    global.tokenVerify = global.tokenVerify || function(token, secret) {
     /* The 'jwt.verify' function is synchronous, however wrapping with a promise
      * provides for better error management and integration within the logic
      * flow.
      */
     return new Promise(function(resolve, reject) {
      jwt.verify(
        token,
        secret,{
        clockTolerance: 5},
        function(err, decoded) {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
      });
    });
   };
```

The `global` object can also be used to cache expensive resources, such as an Access Token for a third-party (e.g., logging) API that provides non user-specific functionality or an Access Token to your own API defined in Auth0 and obtained by using [Client Credentials](/flows/concepts/client-credentials) flow.

Rules can run more than once when a pipeline is executed, and this depends on the [context](#context-object) of operation. For each context in which a rule is run, an existing container instance is either provisioned from the Auth0 tenant pool or *may* be instantiated anew. For each instantiation of a new Webtask container, the `global` object is reset. Thus, any declaration within the `global` object should also include provision for initialization (as shown above), ideally with that declaration being made as early as possible (i.e., in a rule that runs early in the execution [order](#order)).

### `auth0` object

The `auth0` object is a specially-restricted instance of [`ManagementClient`](https://github.com/auth0/node-auth0#management-api-client) (defined in the [node-auth0](https://github.com/auth0/node-auth0) Node.js client library) and provides limited access to the [Auth0 Management API](/api/management/v2). It is primarily used for [updating metadata](/rules/guides/metadata#update-metadata) associated with the [`user`](#user-object) object from within a rule.

As well as being restricted (i.e., supporting a limited number of `ManagementClient` methods for `user` access only), the [Access Token](/tokens/concepts/access-tokens) associated with the `auth0` object has scopes limited to `read:users` and `update:users`. Typically, all of this is sufficient for the majority of operations we recommend being performed from within a rule. However, if you need access to the full range of supported methods, and/or access to additional scope(s), then you will need to employ an alternative means of [access to the Management API](/api/management/v2/tokens).

::: note
Alternative access to the Management API from within a rule is typically achieved by instantiating an independant instance of the [`ManagementClient`](https://github.com/auth0/node-auth0#management-api-client). This will give you access to all current capabilities, including logic like automatic retries on `429` errors as a result of [rate limiting policy](/policies/rate-limits). In addition, if you only require the default scopes, then you can even initialize the new instance using the Access Token associated with the `auth0` object.
:::

Like the [`context`](#context-object) object (described below), the `auth0` object contains security-sensitive information, so you should not pass it to any external or third-party service. Further, the Auth0 Management API is both [rate limited](/policies/rate-limits#management-api-v2) and subject to latency, so you should be judicious regarding [how often calls are made](/best-practices/performance#minimize-api-requests).

::: panel Best Practice
Use the `auth0` object (and any other mechanisms for calling the Auth0 Management API) sparingly and use adequate [exception](/best-practices/error-handling#exceptions) and [error](/best-practices/error-handling) handling to prevent unexpected interruption of pipeline execution.
:::

## Execution

Each rule is executed as a JavaScript function called in the [order](#order) defined. The next rule in order won’t execute until the previous rule has completed. In addition, the rule pipeline only executes for workflows that involve _user_ credentials; the rule pipeline **does not** execute during [Client Credentials flow](/api-auth/tutorials/adoption/client-credentials) (which is instead supported via use of the [Client Credentials Exchange](/hooks/concepts/credentials-exchange-extensibility-point) hook).

In pipeline terms, a rule completes when the [`callback`](#callback-function) function supplied to the rule is called. Failure to call the function results in a stall of pipeline execution, and ultimately in an error being returned. Each rule must call the `callback` function **exactly** once.

Rule execution supports the asynchronous nature of JavaScript, and constructs such as [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects and the like can be used. Asynchronous processing effectively results in suspension of a pipeline pending completion of the asynchronous operation. An Auth0 serverless Webtask container typically has a circa 20-second execution limit, after which the container may be recycled. Recycling of a container due to this limit will prematurely terminate a pipeline&mdash;suspended or otherwise&mdash;ultimately resulting in an error in authentication being returned (as well as resulting in a potential reset of the [`global`](#global-object) object).

::: panel Best Practice
Setting `context.redirect` triggers a [redirection](#redirection) once all rules have completed (the redirect is not forced at the point it is set). While all rules must complete within the execution limit of the Webtask container for the redirect to occur, the time taken as part of redirect processing *can* extend beyond that limit. We recommend that redirection back to Auth0 via the `/continue` endpoint should ideally occur within _one hour_. Redirection back to the `/continue` endpoint will also cause the creation of a new container in the context of the current pipeline, in which all rules will again be run.
:::

Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete. This callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. If a rule is making use of asynchronous processing, then a call to the (Auth0) supplied [`callback`](#callback-function) function must be deferred to the point where asynchronous processing completes and must be the final thing called. As discussed above, the (Auth0) supplied `callback` function must be called exactly once; calling the function more than once within a rule will lead to unpredictable results and/or errors.

### `context` object

The [`context`](/rules/references/context-object) object provides information about the context in which a rule is run (such as client identifier, connection name, session identifier, request context, protocol, etc). Using the context object, a rule can determine the reason for execution. For example, as illustrated in the sample fragment below, [`context.clientID`](/rules/references/context-object#properties-of-the-context-object) as well as [`context.protocol`](/rules/references/context-object#properties-of-the-context-object) can be used to implement conditional processing to determine when rule logic is executed. The sample also shows some best practices for [exception handling](/best-practices/error-handling#exceptions), use of [`npm` modules](/best-practices/custom-db-connections/environment#npm-modules) (for `Promise` style processing), and the [`callback`](#callback-object) object.

```js
  switch (context.protocol) {
    case 'redirect-callback':
      return callback(null, user, context);
    	break;

    default: {
      user.app_metadata = user.app_metadata || {};
      switch(context.clientID) {
        case configuration.PROFILE_CLIENT: {
          user.user_metadata = user.user_metadata || {};
          Promise.resolve(new
            Promise(function (resolve, reject) {
              switch (context.request.query.audience) {
                case configuration.PROFILE_AUDIENCE: {
                  switch (context.connection) {
                      .
                      .
                  }
                } break;
              .
              .
            })
          )
          .then(function () {
              .
              .
          })
          .catch(function (error) {
            return callback(new UnauthorizedError(“unauthorized”), user, context);
          });
        } break;

        default:
          return callback(null, user, context);
          break;

    } break;
```

::: warning
We highly recommend reviewing best practices when [using contextual bypass logic for Multi-Factor Authentication checking](#contextual-bypass-for-multi-factor-authentication-mfa-). For example, **serious security flaws** can surface if use of MFA is predicated on `context.request.query.prompt === 'none'`. In addition, the content of the `context` object is **security sensitive**, so you should [**not** directly pass the object to any external or third-party service](#do-not-send-entire-context-object-to-external-services).
:::

#### Redirection

It may not be practical to collect information from a user as part of a login flow in situations where there are many applications and you want a centralized service to manage that, or if you are using a SPA and you want to prevent the user from getting an access token under certain conditions.  In these cases, having a centralized way to collect information or provide a challenge to a user is necessary.

Auth0 allows you to redirect the user to any URL where you can collect information from that user and then return the user to the `/continue` endpoint where they can complete the original `/authorize` request that triggered the redirect.  This is a powerful capability, and depending on the use case, the impact of doing it wrong can be anywhere from innocuous to leaving a security vulnerability in the application.  As such, it is important to ensure that this is done correctly.

In most use cases, a redirect rule is in use to prompt the user to make some change to their profile such as:
- forcing a password change
- verifying their email
- adding information to their profile

We recommend that the rule check for some flag or value in the user's `app_metadata`, then redirect to an application that does its own `/authorize` call to Auth0 and make any changes to the user's metadata and redirect the user back to Auth0.  This works great for any profile changing redirects or anything that does not need to restrict the user from logging in.

[Redirect from rule](/rules/guides/redirect) allows you to implement custom authentication flows that require additional user interaction triggered by [context.redirect](/rules/references/context-object#properties-of-the-context-object). Redirect from rule can only be used when calling the [`/authorize`](/api/authentication#login) endpoint.

::: panel Best Practice
Redirection to your own hosted user interface is performed before a pipeline completes and can be triggered *only once* per `context.clientID` context. Redirection should only [use HTTPS](#always-use-https) when executed in a production environment, and additional parameters should be kept to a minimum to help mitigate [common security threats](/security/common-threats). Preferably, the Auth0-supplied `state` is the only parameter supplied.
:::

Once redirected, your own hosted user interface executes in a user authenticated context, and obtains authenticity artifacts by the virtue of Auth0 SSO. Obtaining these artifacts&mdash;e.g., an ID Token in [OpenID Connect (OIDC)](/protocols/oidc), and/or an <dfn data-key="access-token">Access Token</dfn> in [OAuth 2.0](/protocols/oauth2)&mdash;is achieved by using a `context.clientID` context **that is not** the one which triggered redirect. To do this, redirect to the `/authorize` endpoint. In the case of a SPA for example, use [silent authentication](/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens). This creates a new pipeline that causes all rules to execute again, and you can use the `context` object within a rule to perform conditional processing.

Upon completion of whatever processing is to be performed, pipeline execution continues by redirecting the user back to Auth0 via the `/continue` endpoint (and specifying the `state` supplied). This causes all rules to execute again within the current pipeline, and you can use the `context` object within a rule to perform conditional processing checks.

::: panel Storing Data
Beware of storing too much data in the Auth0 profile. This data is intended to be used for authentication and authorization purposes. The metadata and search capabilities of Auth0 are not designed for marketing research or anything else that requires heavy search or update frequency. Your system is likely to run into scalability and performance issues if you use Auth0 for this purpose. A better approach is to store data in an external system and store a pointer (the user ID) in Auth0 so that backend systems can fetch the data if needed. A simple rule to follow is to store only items that you plan to use in rules to add to tokens or make decisions.  
:::

::: warning
Passing information back and forth in the front channel opens up surface area for bad actors to attack.  This should definitely be done only in conditions where you must take action in the rule (such as rejecting the authorization attempt with `UnauthorizedError`). 
:::

### `user` object

The [`user`](/rules/references/user-object) object provides access to a cached copy of the user account (a.k.a. [user profile](/users/concepts/overview-user-profile)) record in Auth0. The object provides access to information regarding the user without the need to access the Auth0 Management API&mdash;access which is both [rate limited](/policies/rate-limits) and subject to latency.

While the contents of the `user` object can be modified&mdash;for example, one rule could make a change which another rule could use to influence its execution&mdash;any changes made will not be persisted. There may be occasions when it becomes necessary to persist, say, [updates to metadata](/rules/guides/metadata#update-metadata) associated with a user, and the [`auth0`](#auth0-object) object can be used to perform such operations where required.

::: note
Updating a user via use of the `auth0` object ultimately results in a call to the Auth0 Management API. As the Auth0 Management API is both [rate limited](/policies/rate-limits) and subject to latency, caution should be exercised regarding when and how often updates are performed.
:::

The [`context`](#context-object) object contains the `primaryUser` property which refers to the user identifier of the primary user. This user identifier will typically be the same as `user_id` property in the root of the `user` object. The primary user is the user that is returned to the Auth0 engine when the rule pipeline completes, and the `user_id` is a unique value generated by Auth0 to uniquely identify the user within the Auth0 tenant. This `user_id` should be treated as an opaque value.

There are occasions when `primaryUser` must be updated as the primary user may change&mdash;i.e., the user returned to the Auth0 engine will be different from the user on rule pipeline entry; [automatic account linking](/users/concepts/overview-user-account-linking#automatic-account-linking) is the primary use case. On such occasions, a rule must update `primaryUser` to reflect the new primary user identifier. Note that this change *will not* affect any subsequent rule executed in the current instance of the pipeline; the `user` object will remain unchanged.

#### Identities

The `user` object also contains a reference to the identities associated with the user account. The `identities` property is an array of objects, each of which contain properties associated with the respective identity as known to the identity provider (for example, the `provider` name, associated `connection` in Auth0, and the `profileData` obtained from the identity provider during the last authentication using that identity). [Linking user accounts](/users/guide/concepts/overview-user-account-linking) creates multiple entries in the array.

Each identity in the `identities` array also contains a `user_id` property. This property is the identifier of the user as known to the identity provider. While the `user_id` property in the root of the `user` object *may* also include the identifier of the user as known to the identity provider, as a best practice, use of the `user_id` property in an array identity should be preferred. The `user_id` in the root of the user object should be treated as an opaque value and should not be parsed.

#### Metadata

The `user_metadata` property and the `app_metadata` property refer to the two different aspects of the [metadata](/users/concepts/overview-user-metadata) associated with a user. Both the `user_metadata` property and the `app_metadata` property provide access to cached copies of each.

::: warning
Authorization-related attributes for a user&mdash;such as role(s), group(s), department, and job codes&mdash;should be stored in `app_metadata` and not `user_metadata`. This is because `user_metadata` can essentially be modified by a user, whereas `app_metadata` cannot.
:::

There may be occasions when it becomes necessary to persist, say, [updates to metadata](/rules/guides/metadata#update-metadata) associated with a user, and the [`auth0`](#auth0-object) object can be used to perform such operations where required. When updating either metadata object, it is important to be judicious regarding what information is stored: in line with [metadata best practice](/users/concepts/overview-user-metadata#user-metadata-best-practices), be mindful of excessive use of metadata, which can result in increased latency due to excessive processing within the pipeline. Use of the `auth0` object also results in a call to the Auth0 Management API, so caution should be exercised regarding when and how often updates are performed since the Auth0 Management API is both [rate limited](/policies/rate-limits) and subject to latency.

### `callback` function

The `callback` function supplied to a rule effectively acts as a signal to indicate completion of the rule. A rule should complete immediately following a call to the callback function&mdash;either implicitly or by explicitly executing a (JavaScript) `return` statement&mdash;refraining from any other operation.

Failure to call the function will result in a stall of pipeline execution, and ultimately in an error condition being returned. Each rule then must call the `callback` function exactly once; at least once in order to prevent stall of the pipeline, but not more than once&mdash;otherwise unpredictable results and/or errors will occur:

```js
  function (user, context, callback) {
    // Roles should only be set to verified users.
    if (!user.email || !user.email_verified) {
      return callback(null, user, context);
    } else {
      getRoles(user.email, (err, roles) => {
        if (err) return callback(err);

        context.idToken['https://example.com/roles'] = roles;

        return callback(null, user, context);
      });
    }
  }
```

As can be seen in the example above, the `callback` function can be called with up to three parameters. The first parameter is mandatory and provides an indication of the status of rule operation. The second and third parameters are optional and represent the user and the context to be supplied to the next rule in the pipeline. If these are specified, then it is a recommended best practice to pass the [`user`](#user-object) and [`context`](#context-object) object (respectively) as supplied to the rule.

::: panel Best Practice
While it can be acceptable to modify certain contents of either the `user` or the `context` object for certain situations, as a recommended best practice you should refrain from passing a newly-created instance of either the `user` or the `context` object. Passing anything other than a `user` or `context` object will have unpredictable results and may lead to an [exception](/best-practices/error-handling#exceptions) or [error](/best-practices/error-handling) condition.
:::

The status parameter should be passed as either `null`, an instance of an `Error` object, or an instance of an `UnauthorizedError` object. Specifying null will permit the continuation of pipeline processing, while any of the other values will terminate the pipeline; an `UnauthorizedError` signals [denial of access and allows information to be returned to the originator of the authentication operation](/rules/references/legacy#deny-access-based-on-a-condition) regarding the reason why access is denied. Passing any other value for any of these parameters will have unpredictable results and may lead to an exception or error condition.

As authentication has already occurred, any early exit of the pipeline with an (authorization) error will _not_ impact the authenticated session within the browser; subsequent redirects to [`/authorize`](/api/authentication#login) will typically result in an automatic login. The early exit of the pipeline simply stops tokens et al from being generated. One option is for the application to redirect to the `/v2/logout` endpoint of in the Authentication API, if required, to force termination of the Auth0 session in the browser.

::: warning
Any call to the [`/logout`](/api/authentication#logout) endpoint could be interrupted, so explicit Auth0 session termination is not guaranteed. This is important, as any explicit condition that caused an `unauthorized` error must be re-checked in any subsequent rule pipeline execution, and it should not be possible to bypass these condition check(s) through any other conditions (such as [`prompt===none`](/api-auth/tutorials/silent-authentication)).
:::

The example provided above also demonstrates best practice use of both [early exit](/best-practices/performance#exit-early) as well as [email address verification](#check-if-an-email-is-verified), as described in [Performance Best Practices](/best-practices/performance) and [Security Best Practices](/best-practices/custom-db-connections/security). Note: the `getRoles` function used is implemented elsewhere within the rule, as a wrapper function to a third-party API.

## Security

### Always use HTTPS

Always use HTTPS, not HTTP, when making calls to external services or when executing [redirect](#redirection) as part of your rule implementation.

### Store security sensitive values in rule Settings

Security-sensitive information, such as credentials or API keys, should be stored in your [rule settings](${manage_url}/#/rules) where they'll be obfuscated, encrypted, and available via the [`configuration`](#configuration-object) object. Do not store these values as literals in your rules code. For example, do not write code like this:

```js
const myApiKey = 'abc123';
```

Instead, prefer to store (secret) information so that it's accessible via the [`configuration`](#configuration-object) object:

```js
const myApiKey = configuration.myApiKey;
```

### Do not send entire `context` object to external services

For rules that send information to an external service, make sure you are not sending the entire [context](#context-object) object, since this object may contain tokens or other sensitive data. For rules that send information to external services, you should only send a *subset* of the less sensitive attributes from the `context` object when and where necessary.

::: warning
In a similar fashion, avoid passing **any** aspect of the [`auth0`](#auth0-object) object outside of a rule.
:::

### Check if an email is verified

Whenever granting authorization predicated on email address or email address characteristics, always start by checking if the email address is verified:

```js
function (user, context, callback) {
  // Access should only be granted to verified users.
  if (!user.email || !user.email_verified) {
    return callback(new UnauthorizedError('Access denied.'));
  }
	  .
	  .
}
```

### Check for exact string matches

For rules that determine access control based on a particular string, such as an email domain, check for an exact string match instead of checking for a substring match. If you check only for a substring, your rule may not function as you intend. For example, in:

```js
if( _.findIndex(connection.options.domain_aliases, function(d){
  return user.email.indexOf(d) >= 0;
}
```

the code (above) would return `true` given emails such as:
* `user.domain.com@not-domain.com`
* `“user@domain.com”@not-domain.com` (quotes included)

which may not be as desired. Instead, prefer to perform exact matches using code such as:

```js
const emailSplit = user.email.split('@');
const userEmailDomain = emailSplit[emailSplit.length - 1].toLowerCase();
```

For further explanation, see the **Check if user email domain matches configured domain rule template** [on GitHub](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) or via the [Auth0 dashboard](${manage_url}/#/rules/new).

### Contextual bypass for Multi-Factor Authentication (MFA)

[Multi-Factor Authentication (MFA)](/multifactor-authentication) provides an additional layer of security in order to guard against unauthorized access. From a user experience perspective, this typically requires additional user interaction to provide a second authentication factor&mdash;i.e., typically presenting some additional credential(s) or authorizing some form of access request.

There are situations, though, when it may be desirable to bypass MFA for a user who has been designated as requiring multi-factor authentication. For instance, it maybe desirable to bypass MFA if a user has already presented both primary and secondary factors as part of authentication in the current browser context. Contextual checking in this way can help improve the user experience. However, if not done properly, it can open up serious security loop-holes which could lead to subsequent security breaches due to MFA being skipped. We therefore recommend that you observe the following guidance when considering whether to employ contextual bypass of MFA or not:

::: panel Best Practice
As a recommended best practice, use of `allowRememberBrowser` or `context.authentication` should be the only options considered for contextual bypass when using out-of-box MFA. Setting `allowRememberBrowser` to `true` lets users check a box so they will only be [prompted for multi-factor authentication periodically](/multifactor-authentication/custom#change-the-frequency-of-authentication-requests), whereas [`context.authentication`](/rules/references/context-object) can be used safely and accurately to determine when MFA was last performed in the current browser context; you can see some sample use of `context.authentication` in the out-of-box supplied rule, [Require MFA once per session](https://github.com/auth0/rules/blob/master/src/rules/require-mfa-once-per-session.js).
:::

* **do not perform MFA bypass** based on conditional logic related to [silent authentication](/api-auth/tutorials/silent-authentication) (e.g., `context.request.query.prompt === 'none'`)
* **do not perform MFA bypass** based on conditional logic using some form of device fingerprinting (e.g., where `user.app_metadata.lastLoginDeviceFingerPrint ===  deviceFingerPrint`)
* **do not perform MFA bypass** based on conditional logic using geographic location (e.g., where `user.app_metadata.last_location === context.request.geoip.country_code`)

#### Context checking when using custom MFA providers

In a similar fashion to that already discussed, we recommend following guidance provided in the items listed above for any rules that redirect users to custom multi-factor authentication providers. For example, for custom providers, there's no safe way to effectively bypass MFA during silent authentication because [redirection](#redirection) (required for custom MFA) will always fail in silent authentication situations.

## Keep reading

* [Error Handling](/best-practices/error-handling)
* [Debugging](/best-practices/debugging)
* [Testing](/best-practices/testing)
* [Deployment](/best-practices/deployment)
* [Performance](/best-practices/performance)
