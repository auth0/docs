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

```js
function (user, context, callback) {

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

  // Sign the token and add it to the profile
  var zendesk_token = jwt.sign(payload, configuration.ZENDESK_JWT_SECRET);
  user.zendesk_jwt_url = 'https://' + ZENDESK_SUBDOMAIN + '.zendesk.com/access/jwt?jwt=' + zendesk_token;

  callback(null, user, context);
}
```

## 3. Redirect users to the URL returned by Zendesk

The rule returned in the previous step will return a user property named `zendesk_jwt_url`, which will allow your user to log in.
If using [Lock](/lock), for example:

```js
lock.show(function (err, profile, id_token) {
  if (err) {
    console.error('Something went wrong!', err);
  } else if (profile.zendesk_jwt_url) {
    window.location = profile.zendesk_jwt_url;
  }
});
```

### Optional: Redirecting users to the URL they originally visited

When Zendesk redirects users to your login page, a [`return_to` query parameter](https://support.zendesk.com/hc/en-us/articles/203663816-Setting-up-single-sign-on-with-JWT-JSON-Web-Token-#topic_hkm_kst_kk) is added to your login page URL.
This parameter contains the Zendesk URL where your users should be redirected after login.
It should be added to the Zendesk URL returned by the above rule:

```js
// Using URI.js, see http://medialize.github.io/URI.js/
return_to = URI(document.URL).query(true).return_to;

lock.show(function (err, profile, id_token) {
  if (err) {
    console.error('Something went wrong!', err);
  } else if (profile.zendesk_jwt_url) {
    document.getElementById('zendesk_url').href = URI(profile.zendesk_jwt_url).addSearch({return_to: return_to});
  }
});
```
