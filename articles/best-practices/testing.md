---
title: Testing Best Practices
description: Learn about best practices for testing.
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
# Testing

The Auth0 Dashboard provides the facility to [`TRY`](/rules/guides/debug) a rule for the purpose of testing and debugging. This facility allows a mock [`user`](/best-practices/rules#user-object) and [`context`](/best-practices/rules#context-object) object to be defined, which is then passed to the rule as part of its execution. The resulting output from the rule (including any console logging) is displayed upon completion. While this provides an immediate at-a-glance way to unit test a rule, it is very much a manual approach, and one which is unable to leverage the use of automated testing tools such as [Mocha](https://mochajs.org/) or [rewire](https://www.npmjs.com/package/rewire).

::: panel Best Practice
As a best practice, and as part of the recommended [support for the Software Development Life Cycle](https://auth0.com/docs/architecture-scenarios/implementation/b2c/b2c-architecture#sdlc-support), you should use a separate test Tenant in Auth0 to test any rule/rule changes before deploying to production.
:::

## Automation

With the help of a little boilerplate, however, it is possible to implement in a way that enables a rule to be deployed and executed in an Auth0 Tenant *and*, without modification, to be consumed in any Continuous Integration/Continuous Deployment (CI/CD) automated (unit) testing environment:

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
The options object passed on the call to `runInThisContext` provides information that can be used to assist with [debugging](/best-practices/debugging) in the case where any exceptional error condition(s) may arise. Please see the Node.js [documentation](https://node.readthedocs.io/en/stable/api/vm/) for further information regarding this function call.
:::

The first two objects passed to the rule during testing represent the [`user`](/best-practices/rules#user-object) and [`context`](/best-practices/rules#context-object) objects, and these can be mocked in a fashion similar to that employed in the Auth0 Dashboard `TRY` functionality. The [`callback`](/best-practices/rules#callback-function) function, supplied as the third parameter, can be implemented to simulate pipeline continuation, subsequently performing execution of the next rule in [order](/best-practices/rules#order).

::: panel Best Practice
The `callback` function supplied can be used to ensure execution of the callback is performed *at least* once by having the (callback) function complete the test and/or provide an assertion. We also recommend providing implementation to also ensure that multiple execution of the callback is not performed by a rule.
:::

In addition, the (Node.js) `global` object can be used to provide both the [configuration](/best-practices/rules#environment) object and also an instance of the [`auth0`](/best-practices/rules#auth0-object) object if required. In the sample above, a global `configuration` object has been defined that aligns with recommended practices to assist with [debugging](/best-practices/debugging) (as described in the section above).

The sample above also makes use of the file system directory structure provided by Auth0 [Deploy CLI](/extensions/deploy-cli)&mdash;the tooling which can assist with rule [deployment](/best-practices/deployment).
