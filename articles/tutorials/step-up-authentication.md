---
description: You can add step-up authentication to your app with Authentication Context Class Reference
---
# Step-Up Authentication

With Step-Up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources.

If you have an app called Fabrikam that allows users to access different types of resources, you can vary the level of authentication required. For example, you might require a user to log into your portal using a username/password combination, but if they request access to Employees page, which contains sensitive details such as salary information, your app will ask your user to complete the [multifactor authentication](/multifactor-authentication) process before it grants the user their request.

![](/media/articles/step-up-authentication/flow.png)

## Key Terms When Using Step-Up Authentication

The following terminology is important when discussing step-up authentication using Auth0.

* Authentication Context Class Reference `acr`: string used to specify the authentication class performed on the current session. Denotes the strength of authentication, which can be used to make authorization decisions. Currently, Auth0 utilizes the [Multi-Factor Authentication policy](http://schemas.openid.net/pape/policies/2007/06/multi-factor), which is indicated by an `acr` value of `http://schemas.openid.net/pape/policies/2007/06/multi-factor`. See `acr` under [ID Token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken).

* Authentication Methods References `amr`: JSON array of strings listing the methods used to authenticate the current session. For example, the `amr` might indicate that the current session was authenticated using a username/password.  See `amr` under [ID Token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken).

* `acr_values`: string specifying the `acr` values that have been used to process the request in order of preference. See `acr_values` under [Authentication Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint).

When appropriate, both the `acr` and `amr` are available on the [ID token](/tokens/id-token) of the current session. You can use both to signal the need for MFA. The `acr-values` field is added to the authentication request.

## Example

To enable step-up authentication, add the `acr_values` field to the authentication request along with the `acr` level desired. For example, if you're using the [auth0.js library](/libraries/auth0js), your sign in snippet might look something like this:

```js
// Use acr_values to indicate this user needs MFA
auth0.signin({
  connection: 'google-oauth2',
  acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
});
```

If you're using [Lock](/libraries/lock), the following would indicate the need for MFA:

```js
// Use acr_values to indicate this user needs MFA
var options = {
  auth: {
    acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
  }
};

lock = new Auth0Lock('clientID', 'your-auth0-domain.auth0.com', options);
```

To confirm that a session has successfully undergone multifactor authentication, you can check the `id_token` for its `acr` and `amr` claims.

```js
// Decode the ID Token
var decoded = jwt.verify(id_token, AUTH0_CLIENT_SECRET, { algorithms: ['HS256'] });

// Confirm that the acr has the expected value
if (Array.isArray(decoded.amr) && decoded.amr.indexOf('mfa') >= 0) {
  throw new Error('Step-up authentication failed');
}

// Check that the amr claim exists
if(decoded.acr !== 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'){
  throw new Error('Step-up authentication failed');
}
```

For additional sample code snippets on how to use step-up authentication, see the [Guardian Example repo on GitHub](https://github.com/auth0/guardian-example).

## Keep reading

::: next-steps
* [Authentication Policy Definitions](http://openid.net/specs/openid-provider-authentication-policy-extension-1_0.html#rfc.section.4)
* [Guardian Example (with Step-Up Functionality)](https://github.com/auth0/guardian-example)
* [JSON Web Token Implementation for Node.js](https://github.com/auth0/node-jsonwebtoken)
* [OpenID Specs for `acr`, `amr` and `acr_values`](http://openid.net/specs/openid-connect-core-1_0.html)
:::
