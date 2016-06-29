# Call an Identity Provider API

**The user is logged in. That means that we can get the [user profile](/user-profile).**

If we're using [Lock](https://github.com/auth0/Lock) or [Auth0.js](https://github.com/auth0/Auth0.js) from the client side, we'll get the profile in the callback after the user is logged in.
If we're using any SDK from the server side, we probably can access the profile from either the request or the session.

The profile will look as follows:

```json
{
  "email": "johnfoo@gmail.com",
  "email_verified": true,
  "family_name": "Foo",
  "gender": "male",
  "given_name": "John",
  "identities": [
    {
      "access_token": "ya29.AsaS6ZQgRHlCHqzZ3....sFFBpQYpVVieSWur-7tmZbzEtwMkA",
      "provider": "google-oauth2",
      "user_id": "103547991597142817347",
      "connection": "google-oauth2",
      "isSocial": true
    }
  ],
  "locale": "en",
  "name": "John Foo",
  "nickname": "matiasw",
  "picture": "https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg",
  "user_id": "google-oauth2|103547991597142817347"
}
```

As you can see, **there's an array called `identities`**. In there, we'll get **the `accessToken`** of the different Identity Providers the user has used to log in.

> Most of the times, there's going to be just one, but if you've used [account linking feature](/link-accounts) there might be more than one.

The `accessToken` we get here will have access to call all the APIs we've specified we need in Auth0 dashboard.

> You can read [this article](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp) If you need to add more scopes/permissions to call other APIs. 

Let's just use the `accessToken` then! For example, if we're using lock we can do as follows:

```js
lock.show(function(err, token, profile) {
  // Assuming the user can ONLY log in with Google
  // We're sure the first identity is Google
  var googleToken = profile.identities[0].accessToken;

  // Function to call Google's API with the accessToken
  getGoogleContactsWithToken(googleToken);
})
```

> When you need to call an external IdP that uses OAuth, you can use a third-party library that does the heavy-lifting for you. A non-exhaustive list of such libraries is available at [this page](http://oauth.net/code/).
