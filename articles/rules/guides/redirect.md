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

For some examples of redirect Rules, see our [Rules repo](https://github.com/auth0/rules/tree/master/redirect-rules) on GitHub.

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
- When a user has been redirected from a rule to the `/continue` endpoint, the user object won't be refreshed. So any updates to user account information during the redirect will not be reflected in the user object. For example, metadata updates that occurred during redirect will not be available.

<%= include('../../_includes/_redirect_uri_formats') %>

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
State is an opaque value, used to prevent [Cross-Site Request Forgery (CSRF) attacks](/security/common-threats#cross-site-request-forgery).
:::

## Resume authentication

After the redirect, resume authentication by redirecting the user to the `/continue` endpoint and include the `state` parameter you received in the URL. If you do not send the original state back to the `/continue` endpoint, Auth0 will lose the context of the login transaction and the user will not be able to log in due to an `invalid_request` error.

For example:

```http
https://${account.namespace}/continue?state=THE_ORIGINAL_STATE
```

If you're using a custom domain:

```http
https://YOUR_AUTH0_CUSTOM_DOMAIN/continue?state=THE_ORIGINAL_STATE
```

By `THE_ORIGINAL_STATE`, we mean the value that Auth0 generated and sent to the redirect URL.

For example, if your rule redirected to `https://example.com/foo`, Auth0 would use a redirect URL similar to `https://example.com/foo?state=abc123`. So `abc123` would be the `THE_ORIGINAL_STATE`. To resume the authentication transaction, you would redirect to

```http
https://${account.namespace}/continue?state=abc123
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

## Progressive profiling example

::: warning
This example hosts a User Profile webpage using a [Webtask](https://webtask.io) that you can modify, provision, and use in your webtask tenant. However, using webtasks is just one way of implementing and deploying the webpage; any HTTP server that provides the same behavior will work.
:::

<%= include('../../_includes/_webtask') %>

You can use redirect rules to collect additional information for a user's profile, otherwise known as [progressive profiling](/users/concepts/overview-progressive-profiling). 

This example prompts the user for their first and last name (but only if they didn't sign up using a social provider that already provided it):

![Core Fields](/media/articles/rules/core-fields.png)

Then, after the user's second login, it prompts the user for their birthday:

![Birthday](/media/articles/rules/birthday.png)

The `redirect-to-update-profile-website` rule checks to see if the user profile is missing any required fields. If so, it performs a redirect to the external **Update Profile Website**. When the redirect is performed, the required field names are passed via a self-signed JWT.

In this example, the website is hosted as a webtask: `update-profile-website`. However, it could be hosted anywhere, such as on Heroku.

::: note
If a user signs in with a Database Connection identity, then the `redirect-to-update-profile-website` rule will generate a prompt for first and last name. However, if they use a social connection (e.g., Google), then chances are those fields will already exist in the identity provider attributes, so no prompt will be necessary.
:::

The webtask renders a form that prompts the user for whatever fields were provided in the JWT. If the user provides the field values and they pass validation, the webtask renders a self-posting form with hidden fields; this form is designed to POST the values back to the Auth0 `/continue` endpoint.

The `continue-from-update-profile-website` rule then picks up the POST request from the webtask and updates the user profile. All fields are stored in `user_metadata`.

### Set up the rules

1. In your tenant, set up the following rules:

   * [`redirect-to-update-profile-website`](https://github.com/auth0/rules/blob/master/redirect-rules/progressive-profiling/redirect-to-update-profile-website.js)
   * [`continue-from-update-profile-website`](https://github.com/auth0/rules/blob/master/redirect-rules/progressive-profiling/continue-from-update-profile-website.js)

2. Configure the following rule settings:

    Key | Value
    --- | ---
    `TOKEN_ISSUER` | The issuer claim for the self-signed JWT that is generated by the `redirect-to-update-profile-website` rule and sent to the update-profile-website webtask website. (e.g., `https://example.com`).
    `TOKEN_AUDIENCE` | The audience claim for that JWT.
    `TOKEN_SECRET` | The secret used to sign the JWT using HS256.
    `UPDATE_PROFILE_WEBSITE_URL` | The URL of the update-profile-website webtask website (e.g., `https://wt-bob-example_com-0.sandbox.auth0-extend.com/update-profile-website`).

### Set up the Webtask

<%= include('../../_includes/_webtask') %>

1. In your webtask tenant, create the following webtasks, either via the Webtask Editor or the CLI.

2. Create a webtask called `update-profile-website` using this [source code](https://github.com/auth0/rules/blob/master/redirect-rules/progressive-profiling/update-profile-website.js).

3. Configure the following NPM modules:

   * `body-parser`
   * `cookie-session`
   * `csurf`
   * `ejs`
   * `express`
   * `jsonwebtoken`
   * `lodash`
   * `moment`
   * `webtask-tools`

4. Configure the webtask with the following secrets:

   Key | Value
   --- | ---
   `AUTH0_DOMAIN` | The domain of your Auth0 tenant.
   `TOKEN_ISSUER` | (Same value as the [Set up the rules](#set-up-the-rules) section above.)
   `TOKEN_AUDIENCE` | (Same Value as the [Set up the rules](#set-up-the-rules) section above.)
   `TOKEN_SECRET` | (Same value as the [Set up the rules](#set-up-the-rules) section above.)

The completed `user-metadata` in the user profile might look like this:

```js
{
    "given_name": "John",
    "family_name": "Smith",
    "birthdate": "1980-01-15"
}
```

### Security

The handoff redirect from the `redirect-to-update-profile-website` rule to the `update-profile-website` webtask is made secure via the self-signed JWT. It prevents someone from calling the webtask directly to invoke a new rendering of the update form. However, it's possible that someone could replay the same exact request (URL) before the JWT token has expired. This is prevented by virtue of the redirect protocol's state parameter, which binds the Auth0 session to the website session. To complete the Auth0 authentication transaction, the website must redirect (or POST) back to the Auth0 `/continue` endpoint, passing the same state value, and since the state value can only be used once, it's impossible to replay the same transaction.

In this example, a JWT is only required for the redirect from the `redirect-to-update-profile-website` rule to the `update-profile-website` webtask. The return trip is secured by virtue of the state parameter. For added security and flexibility, the field values are returned to Auth0 via a POST versus query parameters in a redirect (GET). There are cases where a JWT should be used on the return to Auth0. 

## Keep reading

* [Progressive Profiling](/users/concepts/overview-progressive-profiling)
* [Sample Code for Progressive Profiling Redirect Rule](https://github.com/auth0/rules/blob/master/redirect-rules/progressive-profiling/continue-from-update-profile-website.js)
* [Resume Authentication](/rules/guides/redirect#resume-authentication)
