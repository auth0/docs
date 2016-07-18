# Using Metadata with Auth0's Lock Library

When using [Auth0's Lock library](/libraries/lock), you may define and update the user's `user_metadata` field.

## Defining `user_metadata` on Signup

Please see the section on Lock's [custom sign up fields](libraries/lock/v10/new-features#custom-sign-up-fields) for additional information on adding `user_metadata` on signup.

**For an overview on implementing Lock, please refer to the [JavaScript Quickstart](/quickstart/spa/vanillajs).**

Once you have [implemented the login functionality](/quickstart/spa/vanillajs#3-implement-the-login) for your Lock instances, you may opt to store the newly-created `id_token`. This token is used to retrieve the user's profile from Auth0 or to call APIs.

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

## Updating `user_metadata` Properties

You may [update the `user_metadata` property](/metadata/apiv2#updating-a-user-s-metadata) via calls to the Auth0 Management API.

Using the user's `id_token`, make the appropriate `PATCH` call to [update the `user_metadata` field](/metadata/apiv2#updating-a-user-s-metadata).
