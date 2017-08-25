Use the Auth0 hosted login page to provide a way for your users to log in to your ${library} application.

When the user logs in, Auth0 returns three items:
* `access_token`: an access token. To learn more, see the [access token documentation](/tokens/access-token).
* `id_token`: an ID token. To learn more, see the [ID token documentation](/tokens/id-token).
* `expires_in`: the number of seconds before the access token expires

You can use these items in your application to set up and manage authentication. 