---
description: You can add step-up authentication to your app with Authentication Context Class Reference
---

# Step-Up Authentication

With Step-Up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources.

For example, *Fabrikam's Intranet* can require users to authenticate with their username and password to access customer data. However, a request for access to employee data (which may contain sensitive salary information) can trigger a stronger authentication mechanism like [multifactor authentication](/multifactor-authentication).

You can add step-up authentication to your app with Auth0's extensible multifactor authentication support. Your app can verify that the user has logged in using multifactor authentication and, if not, require the user to step-up to access certain resources.

![](/media/articles/step-up-authentication/flow.png)

## Step-Up Authentication with ACR

There are three core concepts used when addressing authentication level at Auth0.

* `acr`- Authentication Context Class Reference: is a string used to specify the 'class' of authentication that was performed on the current session. Look to [Authentication Context Class Reference](http://openid.net/specs/openid-connect-core-1_0.html) page for more detail and specific policies. Currently, Auth0 utilizes the 'Multi-Factor Authentication' policy, `http://schemas.openid.net/pape/policies/2007/06/multi-factor`.

* `amr`- Authentication Methods References: is a JSON case senstitive string list of methods that were used to authenticate the current session.  For instance, values might indicate that both password and OTP authentication methods were used.  See the [Authentication Methods References](http://openid.net/specs/openid-connect-core-1_0.html) page for more details.

* `acr_values`: this is a space-separated string that specifies the `acr` values that have been requested to use for processing the request, with the values appearing in order of preference. This can be used to request the class of `acr` above when authentication is to be performed.  See [here](http://openid.net/specs/openid-connect-core-1_0.html) for more details.

`acr` and `amr` are both available on the `id_token` of the current session, when appropriate. Both can signal to use MFA. The `acr_values` field is added to the request for authentication.

## Example

To request that Auth0 require a multifactor authentication, add the field `acr_values` to the authentication along with the `acr` level desired. For example, with [Auth0.js](/libraries/auth0js) it would work like the following code snippet:

```js
// Use acr_values to indicate this user needs a step-up with MFA
auth0.signin({
  connection: 'google-oauth2',
  acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
});
```

With [Lock](/libraries/lock), the following would indicate the need for MFA:
```js
// Use acr_values to indicate this user needs a step-up with MFA
var options = {
  ...
  auth: {
    acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
  }
};

lock = new Auth0Lock('clientID', 'account.auth0.com', options);
```

To confirm that a session has had multifactor authentication, the id_token can be checked for its `acr` and `amr` claims.
```js
var decoded = jwt.verify(id_token, AUTH0_CLIENT_SECRET, { algorithms: ['HS256'] });

// Confirm that the acr has the expected value
if (Array.isArray(decoded.amr) && decoded.amr.indexOf('mfa') >= 0) {
  throw new Error('Step-up authentication failed');
}

// We also expect to have the amr claim
if(decoded.acr !== 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'){
  throw new Error('Step-up authentication failed');
}
```

More example code with the step-up functionality can be found [here](https://github.com/auth0/guardian-example).

## Further Reading

* [Multifactor Authentication in Auth0](/multifactor-authentication)
* [Auth0 id_token](/tokens/id_token)
* [Overview of JSON Web Tokens](/jwt)
* [Reference for acr, amr and acr_values](http://openid.net/specs/openid-connect-core-1_0.html)
* [Authentication policy definitions](http://openid.net/specs/openid-provider-authentication-policy-extension-1_0.html#rfc.section.4)
* [JSON Web Token Example](https://github.com/auth0/node-jsonwebtoken)
* [Guardian example (with step-up functionality)](https://github.com/auth0/guardian-example)



