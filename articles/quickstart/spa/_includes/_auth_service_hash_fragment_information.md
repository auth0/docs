Your users authenticate via Universal Login, at the login page. They are then redirected back to your application. Their redirect URLs contain hash fragments with each user's authentication information:
* `access_token`
* `id_token`
* `expires_in`

You can get the tokens from the URL using the `parseHash` method in the auth0.js library. You can save the values in local storage with the `setSession` method. The `setSession` method uses the `expires_in` value from the URL hash fragment to calculate when the user's Access Token expires.
