---
description: Best practices for writing and managing Auth0 Rules.
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

This article covers some best practices when using [rules](/rules). Rules can be used in a [variety of situations](/rules#what-can-i-use-rules-for-) as part of the authentication pipeline where protocol specific artifacts are generated&mdash;i.e., an ID Token in [OpenID Connect (OIDC)](/protocols/oidc), an <dfn data-key="access-token">Access Token</dfn> in [OAuth 2.0](/protocols/oauth2), or an [assertion in SAML](/protocols/saml/saml-configuration/saml-assertions#use-rules). A new pipeline, in which rules execute, is created for each authentication request.

A number of [pre-existing Rules/Rule templates](https://github.com/auth0/rules) are provided out-of-box to help you achieve your goal(s). However, there are times when you will want to [build your own Rule(s)](/rules/guides/create) in support of your specific functionality/requirements. You may choose to extend or modify a pre-existing Rule/Rule template, or you may choose to start from scratch (using one of our [samples](/rules/references/samples) to guide you). Either way, there are a number of best practices that you’ll want to adopt to ensure that you achieve the best possible outcome.

![Rules Dashboard](/media/articles/rules/rules-best-practice-dashboard.png)

The image above depicts an [Auth0 Dashboard](/dashboard) showing a number of enabled and disabled rules for a specific [Auth0 Tenant](/getting-started/the-basics#account-and-tenants). Enabled rules&mdash;those with the green toggle&mdash;are those rules that are active and will execute as part of a pipeline. Disabled rules&mdash;those with the greyed-out toggle&mdash;on the other hand, won't.

## Anatomy

A rule is essentially an anonymous JavaScript function that is passed 3 parameters: a [`user`](#user-object) object, a [`context`](#context-object) object, and a [`callback`](#callback-function) function.

```js
    function (user, context, callback) {
        // TODO: implement your rule
        return callback(null, user, context);
    }
 ```

::: note
**Do not** be tempted to add a trailing semicolon at the end of the function declaration as this will break rule execution. Also, anonymous functions make it hard in [debugging](#debugging) situations to interpret the call-stack generated as a result of any [exceptional error](#exceptions) condition. For convenience, consider providing a function name using some compact and unique naming convention to assist with diagnostic analysis (e.g., `function MyRule1 (user, context, callback) {...}`).
:::

Rules execute in the pipeline associated with the generation of artifacts for authenticity that forms part of the overall [Auth0 engine](https://cdn.auth0.com/blog/auth0-raises-100m-to-fuel-the-growth/inside-the-auth0-engine-high-res.jpg). When a pipeline is executed, all enabled rules are packaged together in the order in which they are listed and sent as one code blob to be executed as an Auth0 serverless Webtask.

![Rules Pipeline](/media/articles/rules/rules-best-practice-pipeline.png)

## Size

As a best practice, we recommend that the total size of implementation for all enabled rules should not exceed 100 kB. The larger the size, the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any [`npm`](https://www.npmjs.com/) modules that may be referenced as part of any [`require`](https://nodejs.org/api/modules.html#modules_require_id) statements.

## Order

The order in which rules are displayed in the [Auth0 Dashboard](/dashboard) (see image above) dictates the order in which the rules will be executed. This is important because one rule may make one or more definitions within the [environment](#environment) associated with execution that another rule may depend upon. In this case, the rule making the definition(s) should execute before the rule that makes use of it.

::: panel Best Practice
As a recommended best practice, run expensive rules (i.e., rules that call out to APIs, including the Auth0 Management API) as late as possible. If you have other, less expensive rules that could cause an `unauthorized` access determination, then you should have these run first.
:::

## Environment

Rules execute as a series of called JavaScript functions in an instance of an Auth0 serverless Webtask __container__. As part of this, a specific environment is provided, together with a number of artifacts supplied by both the container and the Auth0 authentication server (a.k.a. your Auth0 tenant) itself.

### `npm` modules

Auth0 serverless Webtask containers can make use of a wide range of [`npm`](https://www.npmjs.com/) modules; npm modules not only reduce the overall size of rule code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available npm modules are [supported out-of-the-box](https://auth0-extensions.github.io/canirequire/). This list has been compiled and vetted for any potential security concerns. If you require an npm module that is not supported out-of-the-box, then a request can be made via the [Auth0 support](https://support.auth0.com/) portal or via your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the use of npm modules from private repositories.

::: panel Best Practice
When using `npm` modules to access external services, it’s recommended best practice to [keep API requests to a minimum](#minimize-api-requests), [avoid excessive calls to paid services](#limit-calls-to-paid-services), and avoid potential security exposure by [limiting what is sent](#don-t-send-entire-context-object-to-external-services). For more information, see the [performance](#performance) and [security](#security) sections below.
:::

### Environment variables

The Auth0 rule ecosystem supports the notion of environment variables, accessed via what is defined as the globally available [configuration](/rules/guides/configuration) object. Configuration should be treated as read-only and should be used for [storing sensitive information](/best-practices/rules#store-sensitive-values-in-settings), such as credentials or API keys for external service access. This mitigates having security-sensitive values hard coded in a rule.

It can also be used to support whatever [Software Development Life Cycle (SDLC)](/dev-lifecycle/setting-up-env) best practice strategies you employ by allowing you to define variables that have tenant-specific values. This mitigates hard code values in a rule which may change depending upon which tenant is executing it.

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

As well as being restricted (i.e., supporting a limited number of `ManagementClient` methods for `user` access only), the [Access Token](/tokens/access-tokens) associated with the `auth0` object has scopes limited to `read:users` and `update:users`. Typically, all of this is sufficient for the majority of operations we recommend being performed from within a rule. However, if you need access to the full range of supported methods, and/or access to additional scope(s), then you will need to employ an alternative means of [access to the Management API](/api/management/v2/tokens).

::: note
Alternative access to the Management API from within a rule is typically achieved by instantiating an independant instance of the [`ManagementClient`](https://github.com/auth0/node-auth0#management-api-client). This will give you access to all current capabilities, including logic like automatic retries on `429` errors as a result of [rate limiting policy](/policies/rate-limits). In addition, if you only require the default scopes, then you can even initialize the new instance using the Access Token associated with the `auth0` object.
:::

Like the [`context`](#context-object) object (described below), the `auth0` object contains security-sensitive information, so you should not pass it to any external or third-party service. Further, the Auth0 Management API is both [rate limited](/policies/rate-limits#management-api-v2) and subject to latency, so you should be judicious regarding [how often calls are made](#minimize-api-requests).

::: panel Best Practice
It’s recommended best practice to make use of the `auth0` object (and any other mechanisms for calling the Auth0 Management API) sparingly and to always make sure that adequate [exception](#exceptions) and [error](#error-handling) handling is employed to prevent unexpected interruption of pipeline execution.
:::

## Execution

Each rule is executed as a JavaScript function; these functions are called in the [order](#order) that the rules are defined. Rules execute sequentially; the next rule in order won’t execute until the previous rule has completed. In addition, the rule pipeline only executes for workflows that involve _user_ credentials; the rule pipeline **does not** execute during [Client Credentials flow](/api-auth/tutorials/adoption/client-credentials) (which is instead supported via use of the [Client Credentials Exchange](/hooks/concepts/credentials-exchange-extensibility-point) hook).

In pipeline terms, a rule completes when the [`callback`](#callback-function) function supplied to the rule is called. Failure to call the function will result in a stall of pipeline execution, and ultimately in an error being returned. Each rule must call the `callback` function **exactly** once.

Rule execution supports the asynchronous nature of JavaScript, and constructs such as [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects and the like can be used. Asynchronous processing effectively results in suspension of a pipeline pending completion of the asynchronous operation. An Auth0 serverless Webtask container typically has a circa 20-second execution limit, after which the container may be recycled. Recycling of a container due to this limit will prematurely terminate a pipeline&mdash;suspended or otherwise&mdash;ultimately resulting in an error in authentication being returned (as well as resulting in a potential reset of the [`global`](#global-object) object).

::: panel Best Practice
Setting `context.redirect` will trigger a [redirection](#redirection) once all rules have completed (the redirect is not forced at the point it is set). While all rules must complete within the execution limit of the Webtask container for the redirect to occur, the time taken as part of redirect processing *can* extend beyond that limit. As a best practice, we recommend that redirection back to Auth0 via the `/continue` endpoint should ideally occur within _one hour_. Redirection back to the `/continue` endpoint will also cause the creation of a new container in the context of the current pipeline, in which all rules will again be run.
:::

Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete. This callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. If a rule is making use of asynchronous processing, then a call to the (Auth0) supplied [`callback`](#callback-function) function must be deferred to the point where asynchronous processing completes and must be the final thing called. As discussed above, the (Auth0) supplied `callback` function must be called exactly once; calling the function more than once within a rule will lead to unpredictable results and/or errors.

### `context` object

The [`context`](/rules/references/context-object) object provides information about the context in which a rule is run (such as client identifier, connection name, session identifier, request context, protocol, etc). Using the context object, a rule can determine the reason for execution. For example, as illustrated in the sample fragment below, [`context.clientID`](/rules/references/context-object#properties-of-the-context-object) as well as [`context.protocol`](/rules/references/context-object#properties-of-the-context-object) can be used to implement conditional processing to determine when rule logic is executed. The sample also shows some best practices for [exception handling](#exceptions), use of [`npm` modules](#npm-modules) (for `Promise` style processing), and the [`callback`](#callback-object) object.

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
We highly recommended reviewing best practices when [using contextual bypass logic for Multi-Factor Authentication checking](#contextual-bypass-for-multi-factor-authentication-mfa-). For example, **serious security flaws** can surface if use of MFA is predicated on `context.request.query.prompt === 'none'`. In addition, the content of the `context` object is **security sensitive**, so you should [**not** directly pass the object to any external or third-party service](#don-t-send-entire-context-object-to-external-services).
:::

#### Redirection

[Redirect from rule](/rules/guides/redirect) provides the ability for implementing custom authentication flows that require additional user interaction (i.e., beyond the standard login form) and is triggered via use of [context.redirect](/rules/references/context-object#properties-of-the-context-object). Redirect from rule can only be used when calling the [`/authorize`](/api/authentication#login) endpoint.

Redirection to your own hosted user interface is performed before a pipeline completes and can be triggered *only once* per `context.clientID` context. Redirection should only [use HTTPS](#use-https) when executed in a production environment, and additional parameters should be kept to a minimum to help mitigate [common security threats](/security/common-threats). Preferably, the Auth0-supplied `state` is the only parameter supplied.

Once redirected, your own hosted user interface will execute in a user authenticated context, and can obtain authenticity artifacts by the virtue of Auth0 SSO. Obtaining these artifacts&mdash;e.g., an ID Token in [OpenID Connect (OIDC)](/protocols/oidc), and/or an <dfn data-key="access-token">Access Token</dfn> in [OAuth 2.0](/protocols/oauth2)&mdash;is achieved by using a `context.clientID` context **that is not** the one which triggered redirect. To do this, you would typically redirect to the `/authorize` endpoint; in the case of a SPA for example, this can be achieved seamlessly via use of [silent authentication](/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens). This will create a new pipeline that will cause all rules to execute again, and you can use the `context` object within a rule to perform conditional processing (as discussed above).

Upon completion of whatever processing is to be performed, pipeline execution continues by redirecting the user back to Auth0 via the `/continue` endpoint (and specifying the `state` supplied). This will cause all rules to execute again within the current pipeline, and you can use the `context` object within a rule to perform conditional processing checks.

### `user` object

The [`user`](/rules/references/user-object) object provides access to a cached copy of the user account (a.k.a. [user profile](/users/concepts/overview-user-profile)) record in Auth0. The object provides access to information regarding the user without the need to access the Auth0 Management API&mdash;access which is both [rate limited](/policies/rate-limits) and subject to latency.

While the contents of the `user` object can be modified&mdash;for example, one rule could make a change which another rule could use to influence its execution&mdash;any changes made will not be persisted. There may be occasions when it becomes necessary to persist, say, [updates to metadata](/rules/guides/metadata#update-metadata) associated with a user, and the [`auth0`](#auth0-object) object can be used to perform such operations where required.

::: note
Updating a user via use of the `auth0` object ultimately results in a call to the Auth0 Management API. As the Auth0 Management API is both [rate limited](/policies/rate-limits) and subject to latency, caution should be exercised regarding when and how often updates are performed.
:::

The [`context`](#context-object) object contains the `primaryUser` property which refers to the user identifier of the primary user. This user identifier will typically be the same as `user_id` property in the root of the `user` object. The primary user is the user that is returned to the Auth0 engine when the rule pipeline completes, and the `user_id` is a unique value generated by Auth0 to uniquely identify the user within the Auth0 tenant. This `user_id` should be treated as an opaque value.

There are occasions when `primaryUser` must be updated as the primary user may change&mdash;i.e., the user returned to the Auth0 engine will be different from the user on rule pipeline entry; [automatic account linking](/link-accounts#automatic-account-linking) is the primary use case. On such occasions, a rule must update `primaryUser` to reflect the new primary user identifier. Note that this change *will not* affect any subsequent rule executed in the current instance of the pipeline; the `user` object will remain unchanged.

#### Identities

The `user` object also contains a reference to the identities associated with the user account. The `identities` property is an array of objects, each of which contain properties associated with the respective identity as known to the identity provider (for example, the `provider` name, associated `connection` in Auth0, and the `profileData` obtained from the identity provider during the last authentication using that identity). [Linking user accounts](/link-accounts) creates multiple entries in the array.

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
While it can be acceptable to modify certain contents of either the `user` or the `context` object for certain situations, as a recommended best practice you should refrain from passing a newly-created instance of either the `user` or the `context` object. Passing anything other than a `user` or `context` object will have unpredictable results and may lead to an [exception](#exceptions) or [error](#error-handling) condition.
:::

The status parameter should be passed as either `null`, an instance of an `Error` object, or an instance of an `UnauthorizedError` object. Specifying null will permit the continuation of pipeline processing, while any of the other values will terminate the pipeline; an `UnauthorizedError` signals [denial of access and allows information to be returned to the originator of the authentication operation](/rules/references/legacy#deny-access-based-on-a-condition) regarding the reason why access is denied. Passing any other value for any of these parameters will have unpredictable results and may lead to an exception or error condition.

As authentication has already occurred, any early exit of the pipeline with an (authorization) error will _not_ impact the authenticated session within the browser; subsequent redirects to [`/authorize`](/api/authentication#login) will typically result in an automatic login. The early exit of the pipeline simply stops tokens et al from being generated. One option is for the application to redirect to the `/v2/logout` endpoint of in the Authentication API, if required, to force termination of the Auth0 session in the browser.

::: warning
Any call to the [`/logout`](/api/authentication#logout) endpoint could be interrupted, so explicit Auth0 session termination is not guaranteed. This is important, as any explicit condition that caused an `unauthorized` error must be re-checked in any subsequent rule pipeline execution, and it should not be possible to bypass these condition check(s) through any other conditions (such as [`prompt===none`](/api-auth/tutorials/silent-authentication)).
:::

The example provided above also demonstrates best practice use of both [early exit](#exit-early) as well as [email address verification](#check-if-an-email-is-verified), as described in the [Performance](#performance) and [Security](#security) sections below. Note: the `getRoles` function used is implemented elsewhere within the rule, as a wrapper function to a third-party API.

## Error Handling

Error conditions returned from API calls and the like must be handled and processed in an appropriate manner. Failure to do so can lead to unhandled [exception](#exceptions) situations, resulting in premature termination of pipeline execution and ultimately, in an authentication error being returned.

::: panel Best Practice
Use of [`console.error`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) to log any error conditions encountered is a recommended best practice and can also assist with any potential [debugging](#debugging). We'd also recommend sending error conditions to an external service, such as [Splunk](/monitoring/guides/send-events-to-splunk), to provide better visibility and diagnosis of anomalous operation.
:::

As described in the above section entitled [Execution](#execution), there are time constraints regarding how much time a rule has available in which to execute. If recovery from an error condition is not possible (or probable) within this time period, then an error condition should be explicitly returned; this is as simple as completing rule execution by returning an instance of a Node [Error](https://nodejs.org/api/errors.html#errors_class_error) object, as in:

```js
  return callback(new Error('some description'));
```

Alternatively, an instance of the Auth0-specific `UnauthorizedError` can be returned, which will cause an `unauthorized` error condition with the supplied error description to be returned to the application that initiated authentication&mdash;e.g., the application from which redirect to the `/authorize` endpoint was initiated. This allows an application to offer (conditional) retry capability, and additionally, provides capability to implement rule(s) which can be used to [deny access based on certain conditions](/rules/references/legacy#deny-access-based-on-a-condition). For a description of other common authentication error conditions in Auth0, see the [Auth0 SDK library documentation](/libraries/error-messages):

```js
  return callback(new UnauthorizedError('some description'), user, context);
```

::: panel Best Practice
The `UnauthorizedError` object only returns the description supplied. If you wish to employ specific processing for specific unauthorized error conditions, then we’d recommend you format your descriptions to include some easily accessible “error code” information, e.g., `'[00043] - my specific error description'`.
:::

### Exceptions

Unexpected error conditions must also be handled. Unexpected error conditions, such as uncaught JavaScript exceptions, will typically result in the premature termination of pipeline execution, which will ultimately result in an error in authentication being returned.

::: panel Best Practice
Use of [`console.exception`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) to log any exceptional error conditions encountered is a recommended best practice and can also assist with any potential [debugging](#debugging). We'd also recommend sending error conditions to an external service, such as [Splunk](/monitoring/guides/send-events-to-splunk), to provide better visibility and diagnosis of anomalous operation.
:::

For situations involving asynchronous operations, a `catch` handler when utilizing [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object processing is imperative. `Promise` object processing can also be effective for error handling during non-asynchronous operations. As illustrated below, a `Promise` object can be used to wrap, say, a synchronous function call, making it easier to implement cascaded error handling via use of [promise chaining](https://javascript.info/promise-error-handling) and the like.

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
      }
    });
  });
```

Alternatively, use of [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) processing can be used to handle JavaScript exceptions that occur during synchronous operation. Setup of this type of exception handling can often incur performance costs, so should be used sparingly; rule [performance](#performance) should be as optimal as possible. A more pragmatic approach is to implement processing that prevents exceptions from occurring rather than handling them once they have occurred.

::: panel Best Practice
Use of uninitialized objects is a common cause of exceptions. To guard against this, prefer to include provision for initialization (e.g., `user.user_metadata = user.user_metadata || {}`) as part of any declaration in cases where the existence of an object is in question. In a rule, taking steps to prevent an exception from occurring in the first place is a best practice and is typically less costly in terms of performance and resource usage than implementing exception handling.
:::

## Debugging

Out of the box, [runtime debugging](/rules/guides/debug) of a rule is typically achieved via the use of console logging by using the [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) facility. There is no interactive debugging of a rule available within the Auth0 platform (though one could employ the testing [automation](#automation) technique described below in conjunction with some external interactive source-debugging facility).

::: panel Best Practice
Adding sufficient line (i.e., `//`) or block (i.e., `/* */`) comments to a rule, particularly around non-obvious functionality, is invaluable to both code debugging and also code understanding, particularly as there are many occasions where the initial implementer of a rule may not be the same person responsible for maintaining it going forward.
:::

By default, console log output is unavailable for display during normal execution. However, the [Real-time Webtask Logs extension](/extensions/realtime-webtask-logs) can be used to display all console logs in real-time for all implemented extensibility in an Auth0 tenant, including rules. The real-time console log display provided by the extension includes all `console.log` output, [`console.error`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) output, and [`console.exception`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) output.

In a production environment, debug logging isn’t something that’s desirable all the time; given the [performance](#performance) considerations associated with rules it would not be prudent to have it continuously enabled. However, in a development or testing environment, the option to enable it on a more continuous basis is much more desirable. Further, excessive debug logging could create substantial “noise”, which could make identifying problems that much harder.

Modifying a rule to enable or disable debug logging dependent on the environment would be messy and prone to error. Instead, the environment [configuration](#environment-variables) object can be leveraged to implement conditional processing in a fashion similar to the following:

```js
  function NPClaims(user, context, callback) {
    /*
     * This rule (https://auth0.com/docs/rules) is used to derive
     * effective claims associated with the Normalized User Profile:
     *   https://auth0.com/docs/user-profile/normalized/auth0
     */
    var LOG_TAG = '[NORMALIZED_PROFILE_CLAIMS]: ';
    var DEBUG = configuration.DEBUG ? console.log : function () {};
    DEBUG(LOG_TAG, "identities=", user.identities);
    user.user_metadata = user.user_metadata || {};

    //
    user.family_name =
      user.family_name ||
      user.identities.filter(function(identity) {
        /* Filter out identities which do not have anything synonymous with
         * Family Name
         */
        return(
          identity.profileData &&
          identity.profileData.family_name);
      }).map(function(identity) {
        return identity.profileData.family_name;
      })[0];
    DEBUG(LOG_TAG, "Computed user.family_name as '", user.family_name, "'");
      .
      .

    //
    return callback(null, user, context);
  }
```

In the example above, a `DEBUG` environment configuration variable has been created, which can be set to `true` or `false`, depending on the execution environment (e.g., production, testing, development). The setting of this variable is used to determine when debug logging is performed. Further, a `DEBUGLEVEL` environment` configuration` variable, say, could be created, which could be used to control the debugging log level (e,.g. verbose, medium, sparse).

The above example also demonstrates declaration of a named function. For convenience, providing a function name&mdash;using some compact and unique naming convention&mdash;can assist with diagnostic analysis. Anonymous functions make it hard in debugging situations to interpret the call-stack generated as a result of any [exceptional error](#exceptions) condition, and providing a unique function name addresses this.

### Static analysis
The rule editor in the Auth0 dashboard provides some rudimentary syntax checking and analysis of rule semantics. However, no provision is made for more complex static code analysis, such as overwrite detection, loop detection, or vulnerability detection. To address this, consider leveraging use of third-party tooling&mdash;such as [JSHint](https://jshint.com/about/), [SonarJS](https://www.sonarsource.com/products/codeanalyzers/sonarjs.html), or [Coverity](https://www.synopsys.com/software-integrity/security-testing/static-analysis-sast.html)&mdash;in conjunction with rule [testing](#testing) as part of your [deployment](#deployment) automation process.

## Testing

The Auth0 Dashboard provides the facility to [`TRY`](/rules/guides/debug) a rule for the purpose of testing and debugging. This facility allows a mock [`user`](#user-object) and [`context`](#context-object) object to be defined, which is then passed to the rule as part of its execution. The resulting output from the rule (including any console logging) is displayed upon completion. While this provides an immediate at-a-glance way to unit test a rule, it is very much a manual approach, and one which is unable to leverage the use of automated testing tools such as [Mocha](https://mochajs.org/) or [rewire](https://www.npmjs.com/package/rewire).

::: panel Best Practice
As a best practice, and as part of the recommended [support for the Software Development Life Cycle](https://auth0.com/docs/architecture-scenarios/implementation/b2c/b2c-architecture#sdlc-support), the use of a separate test Tenant in Auth0 should be employed to test any rule/rule changes before deploying to production.
:::

### Automation
With the help of a little boilerplate, however, it’s possible to implement in a way that enables a rule to be deployed and executed in an Auth0 Tenant *and*, without modification, to be consumed in any Continuous Integration/Continuous Deployment (CI/CD) automated (unit) testing environment:

```js
  const vm = require('vm');
  const fs = require('fs');
  var user = {
      "name":        "jdoe@foobar.com",
      "email":       "jdoe@foobar.com",
      "user_id":     "auth0|0123456789",
          .
          .
    };
  var context = {
      "clientID":            "123456789",
      "clientName":          "MyWebApp",
      "connection":          "MyDbConn",
      "connectionStrategy":  "auth0",
      "protocol":            "oidc-basic-profile",
          .
          .
    };

  global.configuration = {
    DEBUG: true
  };

  vm.runInThisContext(
      "(()=>{return " + fs.readFileSync('./rules/Normalized Profile Claims.js') + " })();", {
        // filename for stack traces
        filename: 'Normalized Profile Claims.js',
        displayErrors: true
      }
  )(
    user,
    context,
    function callback() {
      console.log("Complete");
    }
  );
```

As shown in the example above, some relatively straightforward testing can be implemented (in an independent node module) by using the Node.js [VM](https://www.w3schools.com/nodejs/ref_vm.asp) to execute the rule to be tested. In this case, a rule named Normalized Profile Claims is read from a file, and some boilerplate is added around the rule (JavaScript) code prior to executing it (the boilerplate being in the strings that both prefix and suffix the filesystem call to [read the file](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) containing the rule code).

::: note
The options object passed on the call to `runInThisContext` provides information that can be used to assist with [debugging](#debugging) in the case where any exceptional error condition(s) may arise. Please see the Node.js [documentation](https://node.readthedocs.io/en/stable/api/vm/) for further information regarding this function call.
:::

The first two objects passed to the rule during testing represent the [`user`](#user-object) and [`context`](#context-object) objects, and these can be mocked in a fashion similar to that employed in the Auth0 Dashboard `TRY` functionality. The [`callback`](#callback-function) function, supplied as the third parameter, can be implemented to simulate pipeline continuation, subsequently performing execution of the next rule in [order](#order).

::: panel Best Practice
The `callback` function supplied can be used to ensure execution of the callback is performed *at least* once, by having the (callback) function complete the test and/or provide an assertion. Providing implementation to also ensure that multiple execution of the callback is not performed by a rule is also a recommended best practice.
:::

In addition, the (Node.js) `global` object can be used to provide both the [configuration](#environment) object and also an instance of the [`auth0`](#auth0-object) object if required. In the sample above, a global `configuration` object has been defined that aligns with recommended practices to assist with [debugging](#debugging) (as described in the section above).

The sample above also makes use of the file system directory structure provided by Auth0 [Deploy CLI](/extensions/deploy-cli)&mdash;the tooling which can assist with rule [deployment](#deployment), as described in the section below.

## Deployment
Coding a rule within the Auth0 Dashboard rule editor is a great way to implement and test while still in the development stage. However, when it comes time to deploy into automated test and/or production environments, a more automated mechanism is required; copy and pasting code between Auth0 tenants is not a satisfactory method to employ.

Out of the box, Auth0 provides a number of facilities for automated deployment of rule extensibility assets between Auth0 tenant environments. The Auth0 [GitHub](/extensions/github-deploy), [GitLab](/extensions/gitlab-deploy), and [Bitbucket](/extensions/bitbucket-deploy) extensions provide the ability to update rule assets from the respective third-party version control system&mdash;both manually and in many instances, automatically (i.e., when a change in the version control system is detected).

In addition, the Auth0 [Deploy CLI](/extensions/deploy-cli) tool can be used to automate deployment between Auth0 tenants. Deploy CLI works with files stored in the file system together with the Auth0 Management API and provides capability to allow the export of rule assets from an Auth0 tenant, as well as import of them into an Auth0 tenant. Further, the tool provides for programmatic control over rule ordering and rule environment [configuration](#environment-variables), as part of deployment automation. In many ways, the Deploy CLI is like a Swiss Army knife when it comes to rule extensibility deployment in Auth0.

::: panel Best Practice
As a best practice, use of the Auth0 [Deploy CLI](/extensions/deploy-cli) tool should be preferred in almost all cases involving deployment to test or production environments. While the extensions can provide automated detection of changes deployed to the respective version control system, the Deploy CLI tool allows precise control of what’s deployed, when, where, and how.
:::

### Versioning
There is no version management when it comes to rules in Auth0; changes made to a rule deployed to an Auth0 tenant will be made live immediately because any change written instantly overwrites what's already there. It's therefore recommended that (a) use of version control, such as Git via GitHub or the like, is employed to provide change management capability, and that (b) use of a separate [Test Tenant](/dev-lifecycle/setting-up-env) in Auth0 is employed (as part of testing strategy) to provide safe testing of any rule/rule changes before deploying to production.

## Performance

Rules execute as part of a pipeline where artifacts for authenticity are generated, as described in the [Anatomy](#anatomy) section above. As such, an enabled rule will execute for every login operation (interactive or otherwise), every silent authentication, and every time a user-credentials-related Access Token is generated for an API call. This means that even in small scale deployments, performance can be a concern, which will only be exacerbated as the scale of deployment increases.

### Avoid unnecessary execution

Prefer to implement execution based on conditional logic. For example, to run a rule for only specific applications, check on a specific [`clientID`](/rules/references/context-object) or for specific [`clientMetadata`](/rules/references/context-object)&mdash;especially when checking against a single `clientMetadata` value, common across multiple applications. Using `clientMetadata` can also make adding new clients (as well as reading rule code) easier, especially if you have a large number of applications defined, by reducing the code changes or configuration values needed between environments.

::: note
Client metadata for an application can be set manually via the Dashboard, by going to [Application Settings -> Advanced Settings -> Application Metadata](${manage_url}/#/applications/) or programmatically via use of the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

### Exit early
For optimal performance, prefer to write rules that complete as soon as possible. For example, if a rule has three checks to decide if it should run, use the first check to eliminate the majority of cases, followed by the check to eliminate the next largest set of cases, and so on and so forth. At the end of each check, remember to execute the [callback](#callback-function) function, ideally combined with a (JavaScript) `return` in order to exit the (rule) function.

### Minimize API requests
Calls to APIs, especially calls to third-party APIs, can slow down login response time and can cause rule timeout failures due to call latency, ultimately leading to authentication error situations. We recommend keeping API requests to a minimum wherever possible within a rule and avoiding excessive calls to paid services](#limit-calls-to-paid-services). We also recommend you avoid potential security exposure by [limiting what is sent](#don-t-send-entire-context-object-to-external-services) to any API&mdash;third party or otherwise.

::: panel Best Practice
The [`global`](#global-object) object can be used to cache information from API calls, which can subsequently be used across all rules that execute in the pipeline. Prefer to use this to store information instead of repeatedly calling an API. Additionally, the `global` object can also be used to cache other information between executing rules as described in the [section](#global-object) above.
:::

#### Limit calls to paid services
If you have rules that call paid services, such as sending SMS messages via Twilio, make sure that you only use those services when necessary. This not only provides performance enhancement, but also helps to avoid extra charges. To help reduce calls to paid services:

* Disallow public sign-ups to reduce the number of users who can sign up and trigger calls to paid services.
* Ensure that a rule only gets triggered for an authorized subset of users or other appropriate conditions. For example, you may want to add logic that checks if a user has a particular email domain, role/group, or subscription level before triggering the call to the paid service.

#### Limit calls to the Management API
Prefer to avoid calls to the Auth0 Management API. The Auth0 Management API is [rate limited](/policies/rate-limits#management-api-v2), which will still be a consideration even when using the `auth0` object (so be sure to use it sparingly). In addition, Management API functions take varying degrees of time to perform, so will incur varying degrees of latency; executing [user search](/api/management/v2#!/Users/get_users) functionality, for example, should be kept to a minimum and performed only where absolutely necessary&mdash;even when executed via the `auth0` object.

#### Avoid calls to the Management API for Connection-related details

We've recently expanded [connection-related properties](/rules/references/context-object) available to the rules [`context`](#context-object) object. You should now be able to obtain connection info from the `context` object instead of needing to call the Auth0 Management API.

By way of example, if you are using the **Check if user email domain matches configured domain** rule template, check out the latest version [on Github](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) or in the [Auth0 Dashboard](${manage_url}/#/rules/new) to see this in action. Note: the changes won't alter functionality but will improve the performance of rules that had once relied on calls to the Management API.

Removing calls to the Management API (as well as the extra call required to get the appropriate <dfn data-key="access-token">Access Token</dfn>) will make your rule code perform better and be more reliable.

### Consider use of explicit timeouts when making API calls

When calling APIs or accessing external services, consider specifying explicit timeout(s). The specific timeout value you choose will typically vary based on your user case, but in general, choosing one that's as low as possible&mdash;while bearing in mind the performance characteristics of the external service&mdash;is advised.

::: panel Best Practice
Whether you choose to employ use of explicit timeouts or you choose to opt for implicit timeout processing, always be sure to cater to [error](#error-handling) and/or [exception](#exceptions) conditions that may occur as a result of any timeout period expiration.
:::

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

### Don’t send entire [`context`](#context-object) object to external services

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
