```js
lock.on('authenticated', function(authResult) {
  localStorage.setItem('id_token', authResult.idToken);
  authManager.authenticate();
  lock.hide();

  // Redirect to default page
  location.hash = '#/';

  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      console.log(error);
    }

    localStorage.setItem('profile', JSON.stringify(profile));

  });
});
```