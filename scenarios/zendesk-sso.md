# Single Sign-On with Zendesk using JWT

This [Zendesk article](https://support.zendesk.com/hc/en-us/articles/203663816-Setting-up-single-sign-on-with-JWT-JSON-Web-Token-) details everything you need to know about getting SSO to work with any JWT provider.

Using Auth0 will allow you to quickly set up Zendesk logins with **LDAP**, **Active Directory**, **Google Apps** or any of the [supported identity providers](https://docs.auth0.com/identityproviders).

> **Note:** If you happen to lock yourself out of your Zendesk account while following this tutorial, you can always log in with your regular Zendesk credentials at https://your_domain.zendesk.com/access/normal

You can enable SSO for administrators/agents, users, or both. In any case, the configuration is the same.

## 1. Enable SSO with JWT

Log in to your Zendesk dashboard, go into your **Security** settings and enable **SSO** with **JSON Web Token**:

![](//cdn.auth0.com/docs/img/zendesk-sso-1.png)

Here you'll need to configure the **Remote login URL**, which points to a webpage where your users will be able to sign in, for example, using [Lock](/lock).
Also, take note of the **Shared secret** here, we'll be using it in the next step.

## 2. Implement a rule to create a JWT for Zendesk

We want to create a JWT with a user's information after login that Zendesk can understand.
We can achieve this using a [rule](https://auth0.com/docs/rules).
In this example, we're storing the Zendesk **Shared secret** as an encrypted key-value pair, which can be accessed with `configuration.ZENDESK_JWT_SECRET`.

```js
function (user, context, callback) {

  // Assuming your Zendesk URL is https://foo.zendesk.com
  var ZENDESK_SUBDOMAIN = 'foo';

  // Generate a random UUID: http://en.wikipedia.org/wiki/Universally_unique_identifier
  // Used in the token's jti claim to avoid replay attacks
  function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var id = s.join("");
    return id;
  }

  // Create the JWT as required by Zendesk
  var payload = {
    iat: new Date().getTime() / 1000,
    jti: uuid(),
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
If you are using [Lock](https://auth0.com/docs/lock), for example:

```js
lock.show(function (err, profile, id_token) {
  if (err) {
    console.error('Something went wrong!', err);
  } else if (profile.zendesk_jwt_url) {
    document.getElementById('zendesk_url').href = profile.zendesk_jwt_url;
  }
});
```

```html
<a id="zendesk_url">Click here to SSO with Zendesk</a>
```

That's it!
Your users can now use any of Auth0's supported identity providers to single sign-on with Zendesk.

### Optional: Redirecting users to the URL they originally visited

When Zendesk redirects users to your login page, a [`return_to` query parameter](https://support.zendesk.com/hc/en-us/articles/203663816-Setting-up-single-sign-on-with-JWT-JSON-Web-Token-#topic_hkm_kst_kk) is added to your login page URL.
This parameter contains the Zendesk URL where your users should be redirected after login.
It should be added to the Zendesk URL returned by the above rule:

```js
// Using URI.js, see http://medialize.github.io/URI.js/
return_to = URI(document.URL).query(true)['return_to'];

lock.show(function (err, profile, id_token) {
  if (err) {
    console.error('Something went wrong!', err);
  } else if (profile.zendesk_jwt_url) {
    document.getElementById('zendesk_url').href = URI(profile.zendesk_jwt_url).addSearch({return_to: return_to});
  }
});
```
