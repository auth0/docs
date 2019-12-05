---
title: Error Handling Best Practices
description: Learn about best practices for error handling.
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
  - rules
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
  - rules
---
# Error Handling Best Practices

Error conditions returned from API calls and the like must be handled and processed in an appropriate manner. Failure to do so can lead to unhandled [exception](#exceptions) situations, resulting in premature termination of pipeline execution and ultimately in an authentication error being returned.

::: panel Best Practice
Use of [`console.error`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) to log any error conditions encountered is a recommended best practice and can also assist with any potential [debugging](/best-practices/debugging). We also recommend sending error conditions to an external service, such as [Splunk](/monitoring/guides/send-events-to-splunk), to provide better visibility and diagnosis of anomalous operation.
:::

As described in [Execution Best Practices](/best-practices/custom-db-connections/execution), there are time constraints regarding how much time a rule has available in which to execute. If recovery from an error condition is not possible (or probable) within this time period, then an error condition should be explicitly returned; this is as simple as completing rule execution by returning an instance of a Node [Error](https://nodejs.org/api/errors.html#errors_class_error) object, as in:

```js
  return callback(new Error('some description'));
```

Alternatively, an instance of the Auth0-specific `UnauthorizedError` can be returned, which will cause an `unauthorized` error condition with the supplied error description to be returned to the application that initiated authentication&mdash;e.g., the application from which redirect to the `/authorize` endpoint was initiated. This allows an application to offer (conditional) retry capability, and additionally, provides capability to implement rule(s) which can be used to [deny access based on certain conditions](/rules/references/legacy#deny-access-based-on-a-condition). For a description of other common authentication error conditions in Auth0, see the [Auth0 SDK library documentation](/libraries/error-messages):

```js
  return callback(new UnauthorizedError('some description'), user, context);
```

::: panel Best Practice
The `UnauthorizedError` object only returns the description supplied. If you wish to employ specific processing for specific unauthorized error conditions, then we’d recommend you format your descriptions to include some easily accessible “error code” information (e.g., `'[00043] - my specific error description'`).
:::

## Exceptions

Unexpected error conditions must also be handled. Unexpected error conditions, such as uncaught JavaScript exceptions, will typically result in the premature termination of pipeline execution, which will ultimately result in an error in authentication being returned.

::: panel Best Practice
Use of [`console.exception`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) to log any exceptional error conditions encountered is a recommended best practice and can also assist with any potential [debugging](/best-practices/debugging). We also recommend sending error conditions to an external service, such as [Splunk](/monitoring/guides/send-events-to-splunk), to provide better visibility and diagnosis of anomalous operation.
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

Alternatively, use of [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) processing can be used to handle JavaScript exceptions that occur during synchronous operation. Setup of this type of exception handling can often incur performance costs, so should be used sparingly; rule [performance](/best-practices/performance) should be as optimal as possible. A more pragmatic approach is to implement processing that prevents exceptions from occurring rather than handling them once they have occurred.

::: panel Best Practice
Use of uninitialized objects is a common cause of exceptions. To guard against this, prefer to include provision for initialization (e.g., `user.user_metadata = user.user_metadata || {}`) as part of any declaration in cases where the existence of an object is in question. In a rule, taking steps to prevent an exception from occurring in the first place is a best practice and is typically less costly in terms of performance and resource usage than implementing exception handling.
:::
