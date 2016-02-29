# Single Sign-On with Zendesk using JWT

This [Zendesk article](https://support.zendesk.com/hc/en-us/articles/203663816-Setting-up-single-sign-on-with-JWT-JSON-Web-Token-) details everything about getting SSO to work with any JWT provider.

> **Note:** If you happen to lock yourself out of your Zendesk account while following this tutorial, you can always log in with your regular Zendesk credentials at https://your_domain.zendesk.com/access/normal

SSO can be enabled for Zendesk administrators/agents, users, or both. In any case, the configuration is the same.

## 1. Enable SSO with JWT

Log in to the Zendesk dashboard, go to **Security** settings and enable **SSO** with **JSON Web Token**:

![](/media/articles/scenarios/zendesk-sso/zendesk-sso-1.png)

**Remote login URL** should point to a webpage where your users will be able to sign in, for example, using [Lock](/lock).
Take note of the **Shared secret**, which will be used in the following step.

## 2. Implement a rule to create a JWT for Zendesk

We want to create a JWT with a user's information after login that Zendesk can understand.
This can be achieved by [using a rule](/rules).
In this example the Zendesk **Shared secret** is being stored as an encrypted key-value pair, which can be accessed with `configuration.ZENDESK_JWT_SECRET` in the rule's code.

Remember to replace `YOUR_ZENDESK_CLIENT_ID` with the actual client ID of your Zendesk application in Auth0.

```js
function (user, context, callback) {

  // If logging in to a different application, skip this rule
  if (context.clientID !== YOUR_ZENDESK_CLIENT_ID) {
    return callback(null, user, context);
  }

  // Assuming your Zendesk URL is https://foo.zendesk.com
  var ZENDESK_SUBDOMAIN = 'foo';

  // Generate a random UUID: http://en.wikipedia.org/wiki/Universally_unique_identifier
  // Used in the token's jti claim to protect against replay attacks
  var uuid = require('uuid');

  // Create the JWT as required by Zendesk
  var payload = {
    iat: new Date().getTime() / 1000,
    jti: uuid.v4(),
    email: user.email,
    name: user.name,
    external_id: user.user_id
  };

  // Sign the token and redirect the user to Zendesk directly
  var zendesk_token = jwt.sign(payload, configuration.ZENDESK_JWT_SECRET);
  var zendesk_url = 'https://' + ZENDESK_SUBDOMAIN + '.zendesk.com/access/jwt?jwt=' + zendesk_token;
  context.redirect = {
    url: zendesk_url
  };

  callback(null, user, context);
}
```

### Optional: Redirecting users to the URL they originally visited

When Zendesk redirects users to your login page, a [`return_to` query parameter](https://support.zendesk.com/hc/en-us/articles/203663816-Setting-up-single-sign-on-with-JWT-JSON-Web-Token-#topic_hkm_kst_kk) is added to your login page URL.
This parameter contains the Zendesk URL where your users should be redirected after login.
It should be added to the Zendesk URL returned by the above rule as follows:

```js
function (user, context, callback) {
  // build Zendesk token as usual
  
  var return_to = context.request.query.state;
  var zendesk_url = 'https://' + ZENDESK_SUBDOMAIN + '.zendesk.com/access/jwt?jwt=' + zendesk_token + '&return_to=' + return_to;
  context.redirect = {
    url: zendesk_url
  };
  callback(null, user, context);
}
```

The rule fragment assumes that you are sending an URL in the `state` parameter when initiating a login transaction.
This can be set as a query string parameter when calling the [`/authorize` endpoint directly](/auth-api#!#get--authorize_social) or as an [authentication parameter when using Lock](/libraries/lock/sending-authentication-parameters).
