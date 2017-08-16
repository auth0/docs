Use the  [hosted login page](https://auth0.com/docs/hosted-pages/login) to provide a way for your users to log in to your ${library} application.

When the users log in, Auth0 returns three items:
* `access_token` - an access token
* `id_token` - an ID token
* `expires_in` - the number of seconds before the access token expires

You can use these items in your application to set up and manage authentication. 