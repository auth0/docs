---
description: Best practices for writing and managing Auth0 Rules.
topics:
  - best-practices
  - rules
contentType: reference
useCase:
  - best-practices
  - rules
---

# Rules Best Practices

This article covers some best practices when using [rules](/rules). Rules can be used in a [variety of situations](/rules#what-can-i-use-rules-for-) as part of the pipeline where artifacts for authenticity are generated - i.e. an [ID Token](/tokens/id-token) in [OpenID Connect (OIDC)](/protocols/oidc), an [Access Token](/tokens/overview-access-tokens) in [OAuth 2.0](/protocols/oauth2), or an [assertion in SAML](/protocols/saml/saml-configuration/saml-assertions#use-rules). A new pipeline is created for each authentication request, in which rules execute.

A number of [pre-existing Rules/Rule templates](https://github.com/auth0/rules) are provided out-of-box to help you achieve your goal(s). However there are times when you will want to [build your own Rule(s)](/rules/guides/create) in support of your  specific functionality/requirements. You may choose to extend or modify a pre-existing Rule/Rule template, or you may choose to start from scratch (using one of our [samples](/rules/references/samples) to guide you). Either way, there are a number of [best practices](/best-practices/rules) that you’ll want to adopt in order to ensure that you achieve the best possible outcome.

**TODO: add screenshot here of rules page**

The image above depicts an [Auth0 Dashboard](/dashboard) showing a number of enabled and disabled rules for a specific [Auth0 Tenant](/getting-started/the-basics#account-and-tenants). Enabled rules - those with the green toggle - are those rules that are active and will execute as part of a pipeline. Disabled rules - those with the greyed-out toggle - on the other hand, won't. 

## Anatomy

A rule is essentially an anonymous JavaScript function that is passed 3 parameters: a [`user`](#user-object) object, a [`context`](#context-object) object, and a [`callback`](#callback-function) function. 

```js
    function (user, context, callback) {
        // TODO: implement your rule
        callback(null, user, context);
    }
 ```

::: note
Anonymous functions make it hard in [debugging](#debugging) situations to interpret the call-stack generated as a result of any [exceptional error](#exceptions) condition. For convenience, consider providing a function name using some compact and unique naming convention to assist with diagnostic analysis (e.g. `function MyRule1 (user, context, callback) {...}`). Do not be tempted to add a trailing semicolon at the end of the function declaration as this will break rule execution.
:::

As depicted in the image below, rules execute in what is the pipeline associated with the generation of artifacts for authenticity that forms part of the overall [Auth0 engine](https://cdn.auth0.com/blog/auth0-raises-100m-to-fuel-the-growth/inside-the-auth0-engine-high-res.jpg). When a pipeline is executed, all enabled rules are packaged together in the order in which they are listed and sent as one code blob to be executed as a [Webtask](https://webtask.io/).

**TODO: add picture here**

## Size

Webtasks currently have a [maximum execution limit](https://webtask.io/docs/limits) of 100 kB of code per instance. So the total size of implementation for all enabled rules must not exceed 100 kB - doing so will have unpredictable results. Note that the 100 kB limit does not include any [`npm`](https://www.npmjs.com/) modules referenced as part of any [`require`](https://nodejs.org/api/modules.html#modules_require_id) statements.  

## Order

The order in which rules are displayed in the [Auth0 Dashboard](/dashboard) (see image above) dictate the order in which the rules will be executed. This is important, as one rule may make one or more definitions within the [environment](#environment) associated with execution that another rule may depend upon. In this case, the rule making the definition(s) should execute before the rule that makes use of them.

## Environment

Rules execute as a series of called JavaScript functions, in an instance of a [Webtask container](https://www.webtask.io/docs/containers). As part of this, a specific environment is provided together with a number of artefacts supplied by both Webtask, and the Auth0 platform. 

### NPM modules

Webtask containers can make use of a wide range of [`npm`](https://www.npmjs.com/) modules; npm modules not only reduce the overall size of rule code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available npm modules are [supported out-of-the-box](https://auth0-extensions.github.io/canirequire/). This list has been compiled and vetted for any potential security concerns. If you require an npm module that is not supported out-of-the-box, then a request can be made via the [Auth0 support](https://support.auth0.com/) portal or via your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the user of npm modules from private repositories.

::: Best practice
When using NPM modules to access external services it’s recommended best practice to [keep API requests to a minimum](?), [avoid excessive calls to paid services](?), and avoid potential security exposure by [limiting what is sent](?). For more information on this see the [performance](#performance) and [security](#security) sections below.
:::

### Environment variables

The Auth0 rule ecosystem supports the notion of environment variables, accessed via what is defined as the globally available [configuration](/rules/guides/configuration) object. Configuration should be treated as read-only, and should be used for [storing sensitive information](/best-practices/rules#store-sensitive-values-in-settings) - such as credentials or API keys for external service access. This mitigates having security sensitive values hard coded in a rule. 

It can also be used to support whatever [Software Development Life Cycle (SDLC)](/dev-lifecycle/setting-up-env) best practice strategies you employ, by allowing you to define variables that have tenant specific values. This mitigates hard code values in a rule which may change depending upon which tenant is executing it.   

### 'global' object

Webtask containers also provide the global object, which can be accessed across all rules executing within a Webtask container instance. The global object acts as a global variable and can be used to cache information, or even define to functions, that can be used across all rules that run.    

Rules can run more than once when a pipeline is executed, and this depends on the [context](#context-object) of operation. For each context in which a rule is run, a new Webtask container *may* be instantiated, and for each instantiation of a new Webtask container the `global` object is reset. Thus any global declaration should also include provision for initialization - with that declaration typically being made as early as possible (i.e. in a rule that runs early in the execution [order](#order)), e.g: 

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
        
      });
    });
   };
```

### 'auth0' object

The `auth0` object is an instance of the [Management API Client](https://github.com/auth0/node-auth0#management-api-client) (defined in the [node-auth0](https://github.com/auth0/node-auth0) Node.js client library), and provides limited access to the [Auth0 Management API](/api/management/v2). It is primarily used for [updating metadata](/rules/guides/metadata#update-metadata) associated with the [`user`](#user-object) object from within a rule. 

::: note
The [access token](/tokens/overview-access-tokens) associated with the `auth0` object has scopes limited to `read:users` and `update:users` only; typically these are sufficient for the majority of operations we recommend being performed from within a rule. However, if you require additional scope(s) then you will need to employ an alternative means of [access to the Management API](/api/management/v2/tokens). 
:::

Like the [`context`](#context-object) object (described below), the `auth0` object contains security sensitive information, so you should not pass it to any external or 3rd party service. Further, the Auth0 Management API is both [rate limited](/docs/policies/rate-limits#management-api-v2) and subject to latency, so you should be judicious regarding [how often calls are made](/best-practices/rules#reduce-api-requests). 

::: Best practice
It’s recommended best practice to make use of the `auth0` object (and any other mechanisms for calling the Auth0 Management API) sparingly, and to always make sure that adequate [exception](?) and [error](#error-handling) handling is employed in order to prevent unexpected interruption of pipeline execution.
:::

## Execution

Each rule is executed as a JavaScript function; these functions are called in the [order](#order) that the rules are defined. Rules execute sequentially - that is to say the next rule in order won’t execute until the previous rule has completed.

In pipeline terms, a rule completes when the [`callback`](#callback-function) function supplied to the rule is called. Failure to call the function will result in a stall of pipeline execution, and ultimately in an error being returned. Each rule must call the `callback` function at least once.
 
Rule execution supports the asynchronous nature of JavaScript, and constructs such as [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects and the like can be used. Asynchronous processing effectively results in suspension of a pipeline pending completion of the asynchronous operation. A webtask container typically has a [30 second execution limit](https://webtask.io/docs/limits), after which the container may be recycled. A recycle of a container will prematurely terminate a pipeline (suspended or otherwise), ultimately resulting in an error in authentication being returned (as well as resulting in a reset of the [`global`](#global-object) object). 

::: note
Setting `context.redirect` will trigger a [Redirection](#redirection) once all rules have completed (the redirect is not forced at the point it is set). Whilst all rules must complete within the execution limit of the Webtask container for the redirect to occur, the time taken as part of redirect processing *can* extend beyond that limit. Redirection back to Auth0 via the `/continue` endpoint will cause the creation of a new Webtask container, in the context of the current pipeline, in which all rules will again be run.  
:::

Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete. This callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. If a rule is making use of asynchronous processing then a call to the (Auth0) supplied [`callback`](#callback-function) function must be deferred to the point where asynchronous processing completes - and must be the final thing called. The (Auth0) supplied `callback` function must be called only once; calling the function more than once within a rule will lead to unpredictable results and/or errors.

### `context` object

The [`context`](#context-object) object provides information about the context in which a rule is run (such as client identifier, connection name, session identifier, request context, protocol, etc). Using the context object, a rule can determine the reason for execution. For example, as illustrated in the sample fragment below, [`context.clientID`](/rules/references/context-object#properties-of-the-context-object) as well as [`context.protocol`](/rules/references/context-object#properties-of-the-context-object) can be used to implement conditional processing to determine when rule logic is executed. The sample also shows some best practices for [exception handling](#exceptions), use of [`npm` modules](#npm-modules) (for `Promise` style processing), and the [`callback`](#callback-object) object. 

```js
  switch (context.protocol) {
    case 'redirect-callback':
      callback(null, user, context);
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
            callback(new UnauthorizedError(“unauthorized”), user, context);
          });
        } break;
          
        default:
          callback(null, user, context);
          break;
      
    } break; 
```

::: warning
It’s recommended best practice to [avoid using conditional logic for Multi-Factor Authentication(MFA) based on context](?). For example, **serious security flaws** can surface if use of MFA is predicated on `context.request.query.prompt === 'none'`. Additionally, the contents of the `context` object is **security sensitive**, so you should [**not** directly pass the object to any external or 3rd party service](?).
:::

#### Redirection

[Redirect from rule](/rules/guides/redirect) provides the ability for implementing custom authentication flows that require additional user interaction (i.e. beyond the standard login form) and is triggered via use of [context.redirect](/rules/references/context-object#properties-of-the-context-object). Redirect from rule can only be utilized when using the [`\authorize`](/api/authentication#login) endpoint

Redirection to your own hosted user interface is performed before a pipeline completes, and can be triggered *only once* per `context.clientID` context. Redirection should only [use HTTPS](?) when executed in a production environment, and additional parameters should be kept to a minimum in order to help mitigate [common security threats](/security/common-threats). Preferably the Auth0 supplied `state` being the only parameter supplied.  

Once redirected, your own hosted user interface will execute in a user authenticated context. You can obtain authenticity artefacts - e.g. an [ID Token](/tokens/id-token) in [OpenID Connect (OIDC)](/protocols/oidc), and/or an [Access Token](/tokens/overview-access-tokens) in [OAuth 2.0](/protocols/oauth2) - for a `context.clientID` context **that is not** the one which triggered redirect, and this can be achieved via the use of [silent authentication](/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens). This will create a new pipeline which will cause all rules to execute again, and you can use the [`context`](#context-object) object within a rule to perform conditional processing (as discussed above). 

Upon completion of whatever processing is to be performed, pipeline execution continues by redirecting the user back to Auth0 via the `/continue` endpoint (and specifying the state supplied). This will cause all rules to execute again within the current pipeline, and you can use the `context` object within a rule to perform conditional processing checks.  

### `user` object

The [`user`](/rules/references/user-object) object provides access to a cached copy of the user account (a.k.a. [user profile](/users/concepts/overview-user-profile)) record in Auth0. The object provides access to information regarding the user without the need to access the Auth0 Management API - access which is both [rate limited](/policies/rate-limits) and subject to latency.

Whilst the contents of the `user` object can be modified - for example, one rule could make a change which another rule could use to influence it’s execution - any changes made will not be persisted. There may be occasions when it becomes necessary to persist, say, [updates to metadata](/rules/guides/metadata#update-metadata) associated with a user, and the [`auth0`](#auth0-object) object can be used to perform such operations where required. 

::: note
Updating a user via use of the `auth0` object ultimately results in a call to the Auth0 Management API. As the Auth0 Management API is both rate limited and subject to latency, caution should be exercised regarding when and how often updates are performed.
:::

The [`context`](#context-object) object contains the `primaryUser` property which refers to the user identifier of the primary user. This user identifier will typically be the same as `user_id` property in the root of the `user` object. The primary user is the user that is returned to the Auth0 engine when the rule pipeline completes, and the `user_id` is a unique value generated by Auth0 to uniquely identify the user within the Auth0 tenant. This `user_id` should be treated as an opaque value.

There are occasions when `primaryUser` must be updated as the primary user may change - i.e. the user returned to the Auth0 engine will be different from the user on rule pipeline entry. [Automatic account linking](/link-accounts#automatic-account-linking) being one of those occasions. On these occasions, a rule must update `primaryUser` to reflect the new primary user identifier. Note that this change *will not* affect any subsequent rule executed in the current instance of the pipeline; the 'user' object will remain unchanged.

#### Identities

The `user` object also contains a reference to the identities associated with the user account. The `identities` property is an array of objects, each of which contain properties associated with the respective identity as known to the identity provider (for example the `provider` name, associated `connection` in Auth0, and the `profileData` obtained from the identity provider during the last authentication using that identity). [Linking user accounts](/link-accounts) creates multiple entries in the array. 

Each identity in the `identities` array also contains a `user_id` property. This property is the identifier of the user as known to the identity provider. Whilst the `user_id` property in the root of the `user` object *may* also include the identifier of the user (as known to the identity provider), as a best practice, use of the `user_id` property in an array identity should be preferred. The `user_id` in the root of the user object should be treated as an opaque value and should not be parsed.   

#### Metadata

The `user_metadata` property and the `app_metadata` property refer to the two different aspects of [metadata](/users/concepts/overview-user-metadata) associated with a user. Both the `user_metadata` property and the `app_metadata` property provide access to cached copies of each.  

::: warning
Authorization related attributes for a user - such as role(s), group(s), department, job codes, etc - should be stored in `app_metadata` and not `user_metadata`. This is because `user_metadata` can essentially be modified by a user whereas `app_metadata` cannot.
:::

There may be occasions when it becomes necessary to persist, say, [updates to metadata](/rules/guides/metadata#update-metadata) associated with a user, and the [`auth0`](#auth0-object) object can be used to perform such operations where required. When updating either metadata object, it is important to be judicious regarding what information is stored: in line with [metadata best practice](/users/concepts/overview-user-metadata#user-metadata-best-practices), excessive use of metadata can result in increased latency due to excessive pipeline processing. Use of the `auth0` object also results in a call to the Auth0 Management API, so caution should be exercised regarding when and how often updates are performed - the Auth0 Management API being both rate limited and subject to latency too.

### `callback` function

The `callback` function supplied to a rule effectively acts as a signal to indicate completion of the rule. A rule should complete immediately following a call to the callback function - either implicitly, or by explicitly executing a (JavaScript) `return` statement - refraining from any other operation. 

Failure to call the function will result in a stall of pipeline execution, and ultimately in an error condition being returned. Each rule then must call the `callback` function exactly once; at least once in order to prevent stall of the pipeline, however not more than once otherwise unpredictable results and/or errors will occur:

```js
  function (user, context, callback) {
  	.
	.
    // Roles should only be set to verified users.
    if (!user.email || !user.email_verified) {
      return callback(null, user, context);
    } else {
      getRoles(user.email, (err, roles) => {
        if (err) return callback(err);

        context.idToken['https://example.com/roles'] = roles;

        callback(null, user, context);
      });
	  .
	  .
    }
  }
```

As can be seen in the example provided (above), the `callback` function can be called with up to 3 parameters. The first parameter is mandatory and provides an indication of the status of rule operation. The second and third parameters are optional, and represent the user and the context to be supplied to the next rule in the pipeline. If these are specified, then it is a recommended best practice to pass the [`user`](#user-object) and [`context`](#context-object) object (respectively) as supplied to the rule. Passing anything else will have unpredictable results, and may lead to an [exception](#exceptions) or [error](#error-handling) condition.

The status parameter should be passed as either `null`, an instance of an `Error` object, or an instance of an `UnauthorizedError` object. Specifying null will permit the continuation of pipeline processing, whilst any of the other values will terminate the pipeline; an `UnauthorizedError` signalling [denial of access, and allowing information to be returned to the originator of the authentication operation](/rules/references/legacy#deny-access-based-on-a-condition) regarding the reason why access is denied. Passing any other value for any of these parameters will have unpredictable results, and may lead to an exception or error condition.  

::: note
The example provided (above) also demonstrates best practice use of both [early exit](?) as well as [email address verification](?), as described in the [Performance](#performance) and [Security](#security) sections below. Note: the `getRoles` function used is implemented elsewhere within the rule, as a wrapper function to a 3rd party API.
:::

## Error Handling 

Error conditions returned from API calls and the like must be handled and processed in an appropriate manner. Failure to do so can lead to unhandled [exception](#exceptions) situations, resulting in premature termination of pipeline execution and ultimately in an authentication error being returned.

::: Best practice
Use of [`console.error`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) in order to log any error conditions encountered is a recommended best practice, and can also assist with any potential [debugging](#debugging) too. We'd also recommend sending error conditions to an external service - such as [Splunk](/monitoring/guides/send-events-to-splunk) - to provide for better visibility and diagnosis of anomalous operation.
:::

As described in the section entitled [Execution](#execution) (above), there are time constraints regarding how much time a rule has available in which to execute. If recovery from an error condition is not possible (or probable) within this time period, then an error condition should be explicitly returned; this is as simple as completing rule execution by returning an instance of a Node [Error](https://nodejs.org/api/errors.html#errors_class_error) object, as in:

```js
  callback(new Error('some description'), user, context);
```

In addition, an instance of the Auth0 specific `UnauthorizedError` can be returned which will cause an `unauthorized` error condition, with the supplied error description, to be returned to the application that initiated authentication - i.e. the application from which redirect to the `/authorize` end-point, say, was initiated. This provides the capability to implement rule(s) which can be used to [deny access based on certain conditions](/rules/references/legacy#deny-access-based-on-a-condition). For a description of other common authentication error conditions in Auth0, see the [Auth0 SDK library documentation](/libraries/error-messages): 

```js
  callback(new UnauthorizedError('some description'), user, context);
```

::: Best practice
The `UnauthorizedError` object only returns the description supplied. If you wish to employ specific processing for specific unauthorized error conditions, then we’d recommend you format your descriptions to include some easily accessible “error code” information, e.g: `'[00043] - my specific error description'`.
:::

### Exceptions

Unexpected error conditions must also be handled. Unexpected error conditions - such as uncaught JavaScript exceptions - will typically result in the premature termination of pipeline execution, ultimately resulting in an error in authentication being returned.

::: Best practice
Use of [`console.exception`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) in order to log any exceptional error conditions encountered is a recommended best practice, and can also assist with any potential [debugging](#debugging) too. We'd also recommend sending error conditions to an external service - such as [Splunk](/monitoring/guides/send-events-to-splunk) - to provide for better visibility and diagnosis of anomalous operation.
:::

For situations involving asynchronous operations, a `catch` handler when utilizing [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object processing is imperative. `Promise` object processing can also be effective for error handling during non-asynchronous operations too. As illustrated below, a `Promise` object can be used to wrap a synchronous function call say, making it easier to implement cascaded error handling via use of [promise chaining](https://javascript.info/promise-error-handling) and the like.

```js
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
      
    });
  });
```

Alternatively, use of [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) processing can be used to handle JavaScript exceptions that occur during synchronous operation. Setup of this type of exception handling can often incur performance costs, so should be used sparingly: rule [performance](#performance) should be as optimal as possible. A more pragmatic approach then, is to implement processing that prevents exceptions from occurring rather than handling them once they have occurred.

::: Best practice
Use of uninitialized objects is a common cause of exceptions. To guard against this, prefer to include provision for initialization - e.g. `user.user_metadata = user.user_metadata || {}` - as part of any declaration in cases where the existence of an object is in question. In a rule, taking steps to prevent an exception from occurring in the first place is a best practice, and is less costly in terms of performance and resource usage than implementing exception handling.
:::

## Debugging

Out of the box, [runtime debugging](/rules/guides/debug) of a rule is typically achieved via the use of console logging, using the [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) facility. These is no interactive debugging of a rule available within the Auth0 platform (though one could employ the testing [automation](#automation) technique described below in conjunction with some external interactive debug facility).

::: Best practice
Adding sufficient line - i.e. `//` - or block - i.e. `/* */` - comments to a rule, particularly around non-obvious functionality, is invaluable to both code debugging and also code understanding. Particularly as there are many occasions where the initial implementer of a rule may not be the same person responsible for maintaining it going forward.
:::


