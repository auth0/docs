---
description: Learn what the Rules environment is.
toc: true
topics:
  - rules
  - extensibility
contentType:
  - reference
useCase: extensibility-rules
---
# Environment for Executing Rules

Rules execute as a series of called JavaScript functions in an instance of an Auth0 serverless Webtask __container__. As part of this, a specific environment is provided, together with a number of artifacts supplied by both the container and the Auth0 authentication server (a.k.a. your Auth0 tenant) itself.

### `npm` modules

Auth0 serverless Webtask containers can make use of a wide range of [`npm`](https://www.npmjs.com/) modules; npm modules not only reduce the overall size of rule code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available npm modules are [supported out-of-the-box](https://auth0-extensions.github.io/canirequire/). This list has been compiled and vetted for any potential security concerns. If you require an npm module that is not supported out-of-the-box, then a request can be made via the [Auth0 support](https://support.auth0.com/) portal or via your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the use of npm modules from private repositories.

::: panel Best Practice
When using `npm` modules to access external services, it’s recommended best practice to [keep API requests to a minimum](/best-practices/performance#minimize-api-requests), [avoid excessive calls to paid services](/best-practices/performance#limit-calls-to-paid-services), and avoid potential security exposure by [limiting what is sent](#do-not-send-entire-context-object-to-external-services). For more information, see [Performance Best Practices](/best-practices/performance) and [Security Best Practices](/best-practices/custom-db-connections/security) sections below.
:::

### Environment variables

The Auth0 rule ecosystem supports the notion of environment variables, accessed via what is defined as the globally available [configuration](/rules/guides/configuration) object. Configuration should be treated as read-only and should be used for [storing sensitive information](#store-security-sensitive-values-in-rules-settings), such as credentials or API keys for external service access. This mitigates having security-sensitive values hard coded in a rule.

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

Like the [`context`](#context-object) object (described below), the `auth0` object contains security-sensitive information, so you should not pass it to any external or third-party service. Further, the Auth0 Management API is both [rate limited](/policies/rate-limits#management-api-v2) and subject to latency, so you should be judicious regarding [how often calls are made](/best-practices/performance#minimize-api-requests).

::: panel Best Practice
It’s recommended best practice to make use of the `auth0` object (and any other mechanisms for calling the Auth0 Management API) sparingly and to always make sure that adequate [exception](/best-practices/error-handling#exceptions) and [error](/best-practices/error-handling) handling is employed to prevent unexpected interruption of pipeline execution.
:::