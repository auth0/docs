The first step in adding authentication to your ${library} application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the [hosted login page](https://auth0.com/docs/hosted-pages/login).

When authentication is successful, three items will be returned which can all be used at some point in your application: an `access_token`, an `id_token`, and the number of seconds until the `access_token` expires.
