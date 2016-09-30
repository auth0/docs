## 3. Implement the Login

To implement the login, call the `.show()` method of Auth0's `Lock` instance when a user clicks the login button.

${snippet(meta.snippets.use)}

After authentication, Auth0 will redirect the user back to your application with an identifying token. This token is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `id_token` is stored in `localStorage` to keep the user authenticated after each page refresh:

```js
// app.js

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);

    // Display user information
    $('.nickname').text(profile.nickname);
    $('.avatar').attr('src', profile.picture);
  });
});
```

${browser}