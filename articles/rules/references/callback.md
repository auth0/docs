---
title: The Rules Callback Function
description: Describes the properties of the callback function that is called to indicate the completion of rules processing 
topics:
  - rules
  - extensibility
contentType: reference
useCase: extensibility-rules
---
# The Rules `callback` Function

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