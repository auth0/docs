---
title: Debugging Best Practices
description: Learn about best practices for debugging.
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
# Debugging Best Practices

Out of the box, [runtime debugging](/rules/guides/debug) of a rule is typically achieved via the use of console logging by using the [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) facility. There is no interactive debugging of a rule available within the Auth0 platform (though one could employ the testing [automation](/best-practices/testing#automation) technique described below in conjunction with some external interactive source-debugging facility).

::: panel Best Practice
Adding sufficient line (i.e., `//`) or block (i.e., `/* */`) comments to a rule, particularly around non-obvious functionality, is invaluable to both code debugging and also code understanding, particularly as there are many occasions where the initial implementer of a rule may not be the same person responsible for maintaining it going forward.
:::

By default, console log output is unavailable for display during normal execution. However, the [Real-time Webtask Logs extension](/extensions/realtime-webtask-logs) can be used to display all console logs in real-time for all implemented extensibility in an Auth0 tenant, including rules. The real-time console log display provided by the extension includes all `console.log` output, [`console.error`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) output, and [`console.exception`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) output.

In a production environment, debug logging isn’t something that’s desirable all the time; given the [performance](/best-practices/performance) considerations associated with rules, it would not be prudent to have it continuously enabled. However, in a development or testing environment, the option to enable it on a more continuous basis is much more desirable. Further, excessive debug logging could create substantial “noise”, which could make identifying problems that much harder.

Modifying a rule to enable or disable debug logging dependent on the environment would be messy and prone to error. Instead, the environment [configuration](/best-practices/rules#environment-variables) object can be leveraged to implement conditional processing in a fashion similar to the following:

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

In the example above, a `DEBUG` environment configuration variable has been created, which can be set to `true` or `false` depending on the execution environment (e.g., production, testing, development). The setting of this variable is used to determine when debug logging is performed. Further, a `DEBUGLEVEL` environment` configuration` variable, say, could be created, which could be used to control the debugging log level (e.g., verbose, medium, sparse).

The above example also demonstrates declaration of a named function. For convenience, providing a function name&mdash;using some compact and unique naming convention&mdash;can assist with diagnostic analysis. Anonymous functions make it hard in debugging situations to interpret the call-stack generated as a result of any [exceptional error](/best-practices/error-handling#exceptions) condition and providing a unique function name addresses this.

### Static analysis
The rule editor in the Auth0 dashboard provides some rudimentary syntax checking and analysis of rule semantics. However, no provision is made for more complex static code analysis, such as overwrite detection, loop detection, or vulnerability detection. To address this, consider leveraging use of third-party tooling&mdash;such as [JSHint](https://jshint.com/about/), [SonarJS](https://www.sonarsource.com/products/codeanalyzers/sonarjs.html), or [Coverity](https://www.synopsys.com/software-integrity/security-testing/static-analysis-sast.html)&mdash;in conjunction with rule [testing](/best-practices/testing) as part of your [deployment](/best-practices/deployment) automation process.
