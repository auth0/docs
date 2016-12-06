---
description: How to implement a user redirect using rules, and actions after redirecting.
---

# Redirect Users from Rules

[Rules](/rules) allow you to define arbitrary code which can be used to fulfill custom authentication and authorization requirements, log events, retrieve information from external services, and much more.

Rules can also be used to programatically redirect users before an authentication transaction is complete, allowing the implementation of custom authentication flows which require input on behalf of the user, such as:

* Requiring users to provide additional verification when logging in from unknown locations.
* Implementing custom verification mechanisms (e.g. proprietary multifactor authentication providers).
* Forcing users to change passwords.

::: panel-danger Caution:
Redirect rules won't work for the [Resource Owner endpoint](/auth-api#!#post--oauth-ro) authentication endpoint.
You can detect resource owner logins from a rule by checking `context.protocol === 'oauth2-resource-owner'`.
:::

## How to implement a redirect

To redirect a user from a rule, set the `context.redirect` property as follows:

```js
function (user, context, callback) {
    context.redirect = {
        url: "https://example.com/foo"
    };
    return callback(null, user, context);
}
```

Once all rules have finished executing, the user will be redirected to the specified URL.

## What to do after redirecting

An authentication transaction that has been interrupted by setting `context.redirect` can be resumed by redirecting the user to the following URL:

```text
https://${account.namespace}/continue?state=THE_ORIGINAL_STATE
```

When a user has been redirected to the `/continue` endpoint, all rules will be run again.

::: panel-danger Caution:
Make sure to send back the original state to the `/continue` endpoint, otherwise Auth0 will lose the context of the login transaction.
:::


To distinguish between user-initiated logins and resumed login flows, the `context.protocol` property can be checked:

```js
function (user, context, callback) {
    if (context.protocol === "redirect-callback") {
        // User was redirected to the /continue endpoint
    } else {
        // User is logging in directly
    }
}
```

## Securely processing results after redirecting

Suppose you would like to force users to change their passwords under specific conditions. You can write a rule that would have the following behavior:

1. The user attempts to log in and needs to change their password.
2. The user is redirected to an application-specific page with a JWT in the query string. This JWT ensures that only this user's password can be changed and **must be validated** by the application.
3. The user changes their password in the application-specific page by having the application call the [Auth0 Management API](/api/v2#!/Users/patch_users_by_id)
4. The application redirects back to `/continue`, with a JWT in the query string. This token must be issued for the same user that is attempting to log in, and must contain a `passwordChanged: true` claim.

```js
function(user, context, callback) {
  // Prerequisites:
  // 1. Implement a `mustChangePassword` function
  // 2. Set configuration variables for the following:
  // * CLIENT_ID
  // * CLIENT_SECRET
  // * ISSUER
  if (context.protocol !== "redirect-callback") {
    if (mustChangePassword(user)) {
      // User has initiated a login and is forced to change their password
      // Send user's information in a JWT to avoid tampering
      function createToken(clientId, clientSecret, issuer, user) {
        var options = {
          expiresInMinutes: 5,
          audience: clientId,
          issuer: issuer
        };
        return jwt.sign(user, clientSecret, options);
      }
      var token = createToken(
        configuration.CLIENT_ID,
        configuration.CLIENT_SECRET,
        configuration.ISSUER, {
          sub: user.user_id,
          email: user.email
        }
      );
      context.redirect = {
        url: "https://example.com/change-pw?token=" + token
      };
    }
  } else {
    // User has been redirected to /continue?token=..., password change must be validated
    // The generated token must include a `passwordChanged` claim to confirm the password change
    function verifyToken(clientId, clientSecret, issuer, token, cb) {
      jwt.verify(
        token,
        clientSecret, {
          audience: clientId,
          issuer: issuer
        },
        cb
      );
    }
    function postVerify(err, decoded) {
      if (err) {
        return callback(new UnauthorizedError("Password change failed"));
      } else if (decoded.sub !== user.user_id) {
        return callback(new UnauthorizedError("Token does not match the current user"));
      } else if (!decoded.passwordChanged) {
        return callback(new UnauthorizedError("Password change was not confirmed"));
      } else {
        // User's password has been changed successfully
        return callback(null, user, context);
      }
    }
    verifyToken(
      configuration.CLIENT_ID,
      configuration.CLIENT_SECRET,
      configuration.ISSUER,
      context.request.query.token,
      postVerify
    );
  }
}
```

## Caveats

Redirect rules won't work for the [Resource Owner endpoint](/auth-api#!#post--oauth-ro) authentication endpoint. This is because the endpoint returns a JSON result. __Redirect__ rules work with browser based protocols.

Also, if you are using any social network as a connection, make sure you register your own account (vs. using Auth0's Dev Keys). This is because redirect rules are resumed on the endpoint: `https://${account.namespace}/continue`. When using Auth0's Dev Keys, the session is established on a special endpoint that is generic and tenant agnostic, and calling `/continue` will not find your previous session, resulting in an error.
