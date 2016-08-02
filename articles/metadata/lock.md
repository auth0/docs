# Using Metadata with Auth0's Lock Library

When using [Auth0's Lock library](/libraries/lock), you may define and update the user's `user_metadata` field.

*For an overview on implementing Lock, please refer to the [JavaScript Quickstart](/quickstart/spa/vanillajs).*

## Defining `user_metadata` on Signup

Please see the section on Lock's [custom sign up fields](libraries/lock/v10/new-features#custom-sign-up-fields) for additional information on adding `user_metadata` on signup.

## Working with `user_metadata`

Once you have [implemented the login functionality](/quickstart/spa/vanillajs#3-implement-the-login) for your Lock instances, you may opt to store the newly-created `id_token`. This token is used to retrieve the user's profile from Auth0 or to call APIs.

```js
var hash = lock.parseHash(window.location.hash);
if (hash) {
  if (hash.error) {
    console.log("There was an error logging in", hash.error);
    alert('There was an error: ' + hash.error + '\n' + hash.error_description);
  } else {
    //save the token in the session:
    localStorage.setItem('id_token', hash.id_token);
  }
}
```

## Reading `user_metadata` Properties

You may read from the the user's `user_metadata` properties the same way you might for any other property on the user profile (for example, by calling for the value associated with `user.metadata.hobby`):

```js
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    document.getElementById('name').textContent = profile.user_metadata.hobby;
  });
}
```

## Updating Metadata Properties

You may [update the `app_metadata` and `user_metadata` properties](/metadata/apiv2#updating-a-user-s-metadata) via calls to the Auth0 Management API.

By including the user's `id_token` in the `Authorization` header, you may make the appropriate `PATCH` call to [update the user's metadata fields](/metadata/apiv2#updating-a-user-s-metadata). Here is what a sample request might look like:

```js
var request = require("request");

var options = { method: 'PATCH',
  url: 'https://manage.auth0.com/api/v2/users/%7Bid%7D',
  headers: { authorization: "Bearer " + localStorage.getItem(id_token) },
  body: { user_metadata: { addresses: { home: '123 Main Street, Anytown, ST 12345' } } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
