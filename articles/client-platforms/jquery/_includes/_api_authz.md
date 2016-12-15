## Configuring Your Application

## Initialize

First, add Auth0's JavaScript SDK to your jQuery application.

```html
<script src="${auth0js_url}"></script>
```

Create a new Auth0 client instance as follows:

```js
var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}'
});
```

Note that the `callbackURL` must be defined in Dashboard for your client.

## Login

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

The `audience` parameter should contain your API identifier from the Dashboard. If you don't send this, the runtime will take it from the tenant settings (`tenant.default_audience` or you can set it in the Dashboard). The `scope` parameter should include one or more scopes (separated by a space) you defined in the Dashboard for your API, in addition to any of the standard [OpenID scopes](https://auth0.com/docs/scopes).

## Process the Callback

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

The `access_token` will be used to make an Authenticated API call. Remember that using `response_type: token` means that you cannot get a `refresh_token`. The `id_token` can be used in your application for basic profile data. If you want to retrieve additional profile data for the user, you can use the `userinfo` endpoint with the `access_token` in the `Authorization` header. For more information, see [our API documentation](/api/authentication/reference#get-user-info).

## Make an Authenticated API Call

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

<%= include('../../../_includes/_create_resource_server') %>

## Log Out

In this implementation, a logout involves simply deleting the saved tokens from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('access_token');
localStorage.removeItem('id_token');
window.location.href = "/";
```
