---
description: How to implement a user redirect using rules, and actions after redirecting.
tags:
  - rules
  - extensibility
  - redirection
---
# Redirect Users from Rules

[Rules](/rules) allow you to define arbitrary code which can be used to fulfill custom authentication and authorization requirements, log events, retrieve information from external services, and much more.

Rules can also be used to programatically redirect users before an authentication transaction is complete, allowing the implementation of custom authentication flows which require input on behalf of the user, such as:

* Requiring users to provide additional verification when logging in from unknown locations.
* Implementing custom verification mechanisms (such as proprietary multifactor authentication providers).
* Forcing users to change passwords.

::: panel-warning Redirect Rules
Redirect rules won't work for the [Resource Owner endpoint](/api/authentication/reference#resource-owner), the [Password exchange](/api-auth/grant/password) or the [Refresh Token exchange](/tokens/refresh-token#rules). You can detect these cases by checking `context.protocol`:
- For Password exchange: `context.protocol === 'oauth2-password'`
- For Refresh Token exchange: `context.protocol === 'oauth2-refresh-token'`
- For Resource Owner logins: `context.protocol === 'oauth2-resource-owner'`
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

Auth0 will also pass a state value in that URL, for example `https://example.com/foo?state=abc123`.

::: note
State is an opaque value, used to prevent [CSRF attacks](/security/common-threats#cross-site-request-forgery-xsrf-or-csrf-). In this case, Auth0 passes this param to the redirect URL.
:::

Your redirect URL will need to extract the `state` parameter and send it back to Auth0 in order to resume the authentication transaction.

## What to do afterwards

An authentication transaction that has been interrupted, by setting `context.redirect`, can be resumed by redirecting the user to the following URL:

```text
https://${account.namespace}/continue?state=THE_ORIGINAL_STATE
```

By `THE_ORIGINAL_STATE` we mean the value that Auth0 generated and sent to the redirect URL. For example, if your rule redirected to `https://example.com/foo`, Auth0 would use a redirect URL similar to: `https://example.com/foo?state=abc123` (`abc123` being the `THE_ORIGINAL_STATE`). In this case in order to resume the authentication transaction you should redirect to `https://${account.namespace}/continue?state=abc123`.

How you extract the `state` parameter depends entirely on the server you redirect to. If you're using [Node.js and Express, you could use `req.query.state` to extract this parameter](https://expressjs.com/en/api.html#req.query).

When a user has been redirected to the `/continue` endpoint, **all rules will be run again.**

::: warning
Make sure to send back the original state to the `/continue` endpoint, otherwise Auth0 will lose the context of the login transaction and the user will not be able to login due to to an `invalid_request` error.
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

## How to securely process results

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
      return callback(null, user, context);
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

You can redirect a user **once** per authentication flow. For example, if you have one rule that redirects a user, you cannot invoke a second rule to redirect the user at a later time.

Redirect rules won't work for the [Resource Owner endpoint](/api/authentication/reference#resource-owner) authentication endpoint. This is because the endpoint returns a JSON result. Redirect rules work _only_ with browser based protocols.

Also, if you are using any social network as a connection, make sure you register your own account (vs. using Auth0's Dev Keys). This is because redirect rules are resumed on the endpoint: `https://${account.namespace}/continue`. When using Auth0's Dev Keys, the session is established on a special endpoint that is generic and tenant agnostic, and calling `/continue` will not find your previous session, resulting in an error.

You can [read more about issues that may arise from using Auth0's Dev Keys here.](/connections/social/devkeys)
