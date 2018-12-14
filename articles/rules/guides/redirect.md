---
description: How to implement a user redirect using rules, and actions after redirecting.
toc: true
topics:
  - rules
  - extensibility
  - redirection
contentType: how-to
useCase: extensibility-rules
---

# Redirect Users from Rules

[Rules](/rules) can be used to redirect users before an authentication transaction is complete. This lets you implement custom authentication flows that require additional user interaction beyond the standard login form. Redirect Rules are commonly used to do [custom MFA (multifactor authentication)](/multifactor-authentication) in Auth0, but they can also be used for things like:

* Custom privacy policy acceptance, terms of service, and data disclosure forms.
* Securely performing a one-time collection of additional required profile data.
* Allowing remote Active Directory users to change their password.
* Requiring users to provide additional verification when logging in from unknown locations.

For some examples of redirect Rules, check out our [Rules repo](https://github.com/auth0/rules/tree/master/redirect-rules) on GitHub.

## Before you start

Here are some things you should know before you create a redirect Rule:

- You can redirect a user **once** per authentication flow. If you have one rule that redirects a user, you cannot invoke a second rule to redirect the user at a later time.
- Redirect Rules won't work with:
  - [Resource Owner endpoint](/api/authentication/reference#resource-owner)
  - [Password exchange](/api-auth/grant/password)
  - [Refresh Token exchange](/tokens/refresh-token#rules).
- You can detect the above cases by checking `context.protocol`:
  - For Password exchange: `context.protocol === 'oauth2-password'`
  - For Refresh Token exchange: `context.protocol === 'oauth2-refresh-token'`
  - For Resource Owner logins: `context.protocol === 'oauth2-resource-owner'`
- When a user has been redirected from a rule to the `/continue` endpoint, the user object won't be refreshed. So any updates to user account information during the redirect will not be reflected in the user object. For example, metadata updates that occurred during redirect won't be available.

## Start a redirect

To redirect a user from a Rule, set the `context.redirect` property as follows:

```js
function (user, context, callback) {
    context.redirect = {
        url: "https://example.com/foo"
    };
    return callback(null, user, context);
}
```

Once all rules have finished executing, Auth0 redirects the user to the URL specified in the `context.redirect.url` property. Auth0 also passes a `state` parameter in that URL. For example:

```
https://example.com/foo?state=abc123
```

Your redirect URL will need to extract the `state` parameter and send it back to Auth0 to resume the authentication transaction.

::: note
State is an opaque value, used to prevent [CSRF attacks](/security/common-threats#cross-site-request-forgery-xsrf-or-csrf-).
:::

## Resume authentication

After the redirect, resume authentication by redirecting the user to the `/continue` endpoint and include the `state` parameter you received in the URL. If you do not send the original state back to the `/continue` endpoint, Auth0 will lose the context of the login transaction and the user will not be able to log in due to an `invalid_request` error.

For example:

```http
https://${account.namespace}/continue?state=THE_ORIGINAL_STATE
```

By `THE_ORIGINAL_STATE` we mean the value that Auth0 generated and sent to the redirect URL.

For example, if your rule redirected to `https://example.com/foo`, Auth0 would use a redirect URL similar to `https://example.com/foo?state=abc123`. So `abc123` would be the `THE_ORIGINAL_STATE`. To resume the authentication transaction you would redirect to

```http
https://${account.namespace}/continue?state=abc123`.
```

When a user has been redirected to the `/continue` endpoint, **all rules will be run again.**

## Check for resumed login

To distinguish between user-initiated logins and resumed login flows, check the `context.protocol` property:

```js
function (user, context, callback) {
    if (context.protocol === "redirect-callback") {
        // User was redirected to the /continue endpoint
    } else {
        // User is logging in directly
    }
}
```

## Force password change example

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
