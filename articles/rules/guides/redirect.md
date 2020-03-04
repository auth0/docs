---
title: Redirect Users From Within Rules
description: Learn how to customize authentication flows by redirecting users using rules. Example areas that can be customized include MFA, privacy policy acceptance, and gathering user data.
toc: true
topics:
  - rules
  - extensibility
  - redirection
contentType: how-to
useCase: extensibility-rules
---

# Redirect Users From Within Rules

You can use [Rules](/rules) to redirect users before an authentication transaction is complete. This lets you implement custom authentication flows that require additional user interaction beyond the standard login form. Redirect rules are commonly used to do [custom Multi-factor Authentication (MFA)](/multifactor-authentication) in Auth0, but they can also be used for:

* Custom privacy policy acceptance, terms of service, and data disclosure forms.
* Securely performing a one-time collection of additional required profile data.
* Allowing remote Active Directory users to change their password.
* Requiring users to provide additional verification when logging in from unknown locations.
* Gathering more information about your users than they provided at initial signup.

::: note
You can redirect a user **once** per authentication flow. If you have one rule that redirects a user, you **cannot** invoke a second rule to redirect the user at a later time.
:::

## Start redirect and resume authentication

1. Set the `context.redirect` property as follows:

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

    Your redirect URL will need to extract the `state` parameter and send it back to Auth0 to resume the authentication transaction. State is an opaque value, used to prevent [Cross-Site Request Forgery (CSRF) attacks](/security/common-threats#cross-site-request-forgery).

2. After the redirect, resume authentication by redirecting the user to the `/continue` endpoint and include the `state` parameter you received in the URL. 

    ::: warning
    If you do not send the original state back to the `/continue` endpoint, Auth0 will lose the context of the login transaction and the user will not be able to log in due to an `invalid_request` error.
    :::

    For example:

    ```http
    https://${account.namespace}/continue?state=THE_ORIGINAL_STATE
    ```

    If you're using a custom domain:

    ```http
    https://YOUR_AUTH0_CUSTOM_DOMAIN/continue?state=THE_ORIGINAL_STATE
    ```

    `THE_ORIGINAL_STATE` is the value that Auth0 generated and sent to the redirect URL. For example, if your rule redirected to `https://example.com/foo`, Auth0 would use a redirect URL similar to `https://example.com/foo?state=abc123`. So `abc123` would be the `THE_ORIGINAL_STATE`. To resume the authentication transaction, you would redirect to

    ```http
    https://${account.namespace}/continue?state=abc123
    ```

    When a user has been redirected to the `/continue` endpoint, **all rules will be run again.**

::: note
When a user has been redirected from a rule to the `/continue` endpoint, the user object won't be refreshed. So any updates to user account information during the redirect will not be reflected in the user object. For example, metadata updates that occurred during redirect will not be available.
:::

## Validate resumed login

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

In some cases, you may want to force users to change their passwords under specific conditions. You can write a rule that has the following behavior:

1. The user attempts to log in and needs to change their password.
2. The user is redirected to an application-specific page with a JWT in the query string. This JWT ensures that only this user's password can be changed and **must be validated** by the application.
3. The user changes their password in the application-specific page by having the application call the [Auth0 Management API](/api/v2#!/Users/patch_users_by_id)
4. Once the user has successfully changed their password, the application extracts the `authorize_again` claim from the verified and decoded JWT, then proceeds to redirect the user to that URL allowing them to sign in with their new password.

```js
function(user, context, callback) {
   /*
   * Prerequisites:
   * 1. Implement a `mustChangePassword` function
   * 2. Set configuration variables for the following:
   *    - CLIENT_ID
   *    - CLIENT_SECRET
   *    - ISSUER
   */

  const url = require('url@0.10.3');
  const req = context.request;

  function mustChangePassword() {
    // TODO: implement function
    return true;
  }

  if (mustChangePassword()) {
    // User has initiated a login and is forced to change their password
    // Send user's information and query params in a JWT to avoid tampering
    function createToken(clientId, clientSecret, issuer, user) {
      const options = {
        expiresInMinutes: 5,
        audience: clientId,
        issuer: issuer
      };
      return jwt.sign(user, clientSecret, options);
    }

    const token = createToken(
      configuration.CLIENT_ID,
      configuration.CLIENT_SECRET,
      configuration.ISSUER,
      {
        sub: user.user_id,
        email: user.email,
        authorize_again: url.format({
          protocol: 'https',
          hostname: auth0.domain,
          pathname: '/authorize',
          query: req.query
        })
      }
    );

    context.redirect = {
      url: `<%= "https://example.com/change-pw?token=${token}"%>`
    };
  }

  return callback(null, user, context);
}
```

## Where to store data

Beware of storing too much data in the Auth0 profile. This data is intended to be used for authentication and authorization purposes. The metadata and search capabilities of Auth0 are not designed for marketing research or anything else that requires heavy search or update frequency. Your system is likely to run into scalability and performance issues if you use Auth0 for this purpose. A better approach is to store data in an external system and store a pointer (the user ID) in Auth0 so that backend systems can fetch the data if needed. A simple rule to follow is to store only items that you plan to use in rules to add to tokens or make decisions.  

## Security considerations

Passing information back and forth in the front channel opens up surface area for bad actors to attack.  This should definitely be done only in conditions where you must take action in the rule (such as rejecting the authorization attempt with `UnauthorizedError`). 

If, however, you need to communicate directly back to Auth0 and give it instructions for restricting access (you are implementing CAPTCHA checks or custom MFA), then you must have a way to securely tell Auth0 that the requirements of that operation were performed.  Likewise, if you need to hand information to the application that you are redirecting to, then you must have a secure way to ensure that the information transferred has not been tampered with.  

### Ensure app is logging into the same user

The application is going to redirect the user back to the Auth0 tenant, so any data related to the user can be gathered through the ID token that is returned to the application.  However, you may want to ensure that the application is logging into the same user that is being redirected from to ensure that there is no tampering of any sort in-between.  Therefore you will likely want to send a token along with the request.

The token sent to the app should have the following requirements:

| Token Element | Description |
| -- | -- |
| `sub` | The Auth0 `user_id` of the user. |
| `iss` | An identifier that identifies the rule itself. |
| `aud` | The application that is targeted for the redirect. |
| `jti` | A randomly generated string that is stored for confirmation in the user object (in the rule code, set user.jti = uuid.v4(); and then add it as a jti to the token you create).  user.jti will still be set when rules run again when /continue is called.  This is inline with specifications. |
| `exp` | Should be as short as possible to avoid re-use of the token. |
| `other` | Any other custom claims information you need to pass. |
| `signature` | Assuming that the application has a secure place to store a secret, you can use HS256 signed signatures.  This greatly reduces the complexity of the solution and since the token being passed back will have to be signed as well, this is a requirement of this solution.  You can use RS256, but it requires the creating of a certificate and updating that certificate when it expires.  If you are not passing any information directly back to the rules, then you could use an SPA for this intermediate app and then may prefer RS256 so that the application doesn't have to store the info.  It would require you to have a way to validate the token, either through an introspection endpoint or through a public JWKS endpoint. |

::: warning
This token should **not** be treated as a Bearer token!  It is a signed piece of information for use in the application.  The application should still redirect back to Auth0 to authenticate the user.
:::

### Pass information back to the rule

In most scenarios, even if you want to pass information from the rule to the application.  The application will hopefully be able to safely store the information in whatever storage is necessary.  Even if the idea is to update the app or user metadata in Auth0, that can be done using the management API and the user information will be updated as long as it has been completed before redirecting the user back to the `/continue` endpoint.  Only if the rule itself must get information and that information is only relevant to this particular sign in session should you pass information back to the rule.

When passing information back to the `/continue` endpoint, the token passed should have the following requirements:

| Token Element | Description |
| -- | -- |
| `sub` | The Auth0 `user_id` of the user. |
| `iss` | The application that is targeted for the redirect. |
| `aud` | Some identifier that identifies the rule itself. |
| `jti` | The same JTI that was stored in the token passed to the application (NOTE: it should match user.jti or fail). |
| `exp` | Should be as short as possible to avoid reuse of the token. |
| `other` | Any other custom claims information you need to pass. |
| `signature` | Assuming that the application has a secure place to store a secret, you can use HS256 signed signatures.  This greatly reduces the complexity of the solution and since the token being passed back will have to be signed as well, this is a requirement of this solution.  You can use RS256, but it requires the creating of a certificate and updating that certificate when it expires. |

It should be sent using POST and then fetched at `context.request.body.token` (or something similar) rather than passing it as a query parameter.  This is similar to the form-post method for authentication.

If you are not passing information back to the `/continue` endpoint, you may want to blacklist the JTI unless your expiration times are short enough that replay attacks will be almost impossible. 

## Restrictions and limitations

Redirect Rules won't work with:
- [Resource Owner endpoint](/api/authentication/reference#resource-owner)
- [Password exchange](/api-auth/grant/password)
- [Refresh Token exchange](/tokens/concepts/refresh-token#rules)

You can detect the above cases by checking `context.protocol`:
- For Password exchange: `context.protocol === 'oauth2-password'`
- For Refresh Token exchange: `context.protocol === 'oauth2-refresh-token'`
- For Resource Owner logins: `context.protocol === 'oauth2-resource-owner'`

### Resource Owner endpoint

It is impossible to use redirect rules in the context where you are calling /oauth/token directly for the Resource Owner Password Grant.  Since the user is not in a redirect flow to begin with, you can not redirect the user in a rule.  If you attempt to set context.redirect you will get a failed login attempt with the error interaction_required.

### Flows where `prompt=none`

Since the goal of `prompt=none` is to avoid any scenario where the user will be required to enter input, any redirection will result in an `error=interaction_required`.

Since rules run after an authentication session is created, you cannot use `prompt=none` if you have a redirect rule that is attempting to block access to tokens under certain conditions (custom MFA, CAPTCHA with login, etc.).  

You cannot create a redirect flow that blocks token access and bypasses the redirect rule if `prompt=none` because after a failed attempt, a user can simply call again with `prompt=none` and get tokens because their authentication session has been created even though rules failed the first time.

### Refresh tokens

Due to the fact that using a refresh token requires a backchannel call to `/oauth/token`, this will also fail if you set `context.redirect`.

It is difficult to securely verify that any restrictions on login were carried out. There is not a consistent session ID in the context that could be used to collect information associated with the session such as *this user passed MFA challenges*. Therefore, you cannot use `prompt=none` at all. 

Anytime `context.redirect` is set in a rule, if `prompt=none` was passed, then the authorization fails with `error=interaction_required`, but since the user's session is created even if rules fail, we can't trust that a user passed all `context.redirect` challenges and therefore can't use `prompt=none` as a way to get tokens.  

In this specific case, we recommend that you use refresh tokens exclusively, because you can ensure that a user passed challenges if those challenges are required to generate a refresh token.

## Keep reading

* [Progressive Profiling](/users/concepts/overview-progressive-profiling)
* [Redirect Users After Login Authentication](/users/guides/redirect-users-after-login)
* [Redirect Users After Logout](/logout/guides/redirect-users-after-logout)
* [Resume Authentication](/rules/guides/redirect#resume-authentication)
* [Redirect Rule Best Practices](/best-practices/rules#redirection)
