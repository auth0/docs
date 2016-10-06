### Configuring Your Application

## 1. Initialize

First, add Auth0's Javascript SDK to your JQuery application.

```html
<script src="${auth0js_url}"></script>
```

Then create a new Auth0 client instance as follows:

```js
var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}'
});
```

Note that the callbackURL must be defined in Dashboard for your client.

## 2. Login

Within your application's HTML, create an element with id `btn-login`. Then trigger the login on any of your enabled `Connections` with the following code. This will direct the user to the /authorize URL, which is the first step in the Implicit Grant OAuth flow. You can read more about API Authorization [here](../../../api-auth/grant/implicit).

```js
// trigger login to Auth0 when the Login button is clicked
$('#btn-login').click(function(e) {
    auth0.login({
      responseType: 'id_token token',
      scope: 'openid profile {API SCOPES}',
      audience: '{API IDENTIFIER}'
    });
});
```

The `audience` parameter should contain your API identifier from the Dashboard. The `scope` parameter should include one or more scopes you defined in the Dashboard for your API, in addition to any of the standard openid scopes.

## 3. Processing the callback

Once you have succesfully authenticated, Auth0 will redirect to the `callbackURL` parameter defined in the constructor. Auth0 will append a few extra parameters after a hash on the URL. These include an `access_token` and an `id_token`, both JSON Web Tokens (JWTs). You can parse the hash and grab the tokens as follows:

```js
var result = auth0.parseHash(window.location.hash);

if (result && result.idToken) {
    // keep these in localStorage to use later
    localStorage.setItem('access_token', result.accessToken);
    localStorage.setItem('id_token', result.idToken);
    
    auth0.getProfile(result.idToken, function (err, profile) {
        alert('hello ' + profile.name);
    });

} else if (result && result.error) {
  alert('error: ' + result.error);
}
```

The `access_token` will be used to make an Authenticated API call. Remember that using response_type token means that you cannot get a `refresh_token`. The `id_token` can be used in your application for basic profile data. If you want to retrieve additional profile data for the user, you can info the `userinfo` endpoint with the `access_token` in the Authorization header. for more information, see [our API documentation](https://auth0.com/docs/api/authentication#!#get--userinfo).

## 4. Making an Authenticated API Call

Use the `access_token` to invoke your Resource Server (API):

```js
var accessToken = localStorage.getItem('accessToken');
fetch('{API URL}', {
  method: 'get',
  headers: new Headers({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + accessToken
  })
}).then(function(response) {
  response.text().then(function(t) {
    if (response.status !== 200) {
      console.log('error');
      return;
    }
    alert('API Response: ' + JSON.stringify(JSON.parse(t)));
  })
}).catch(function(err) {
  alert('error: ' + err);
});
```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: https://${account.namespace}/.well-known/jwks.json. You can any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quick start tutorial. More information can be found [in our documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).

## 5. Log Out

In this implementation, a logout involves simply deleting the saved tokens from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('access_token');
localStorage.removeItem('id_token');
window.location.href = "/";
```