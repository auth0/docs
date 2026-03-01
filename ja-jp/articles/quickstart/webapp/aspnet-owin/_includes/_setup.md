## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the OWIN OpenID Connect middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:3000/callback`, so be sure to add this to the **Allowed Callback URLs** section of your application. Also, add `http://localhost:3000/` to the **Allowed Logout URLs**.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs** and **Allowed Logout URLs**. The `web.config` in the sample projects also contain two keys named `auth0:RedirectUri` and `auth0:PostLogoutRedirectUri` with these URLs. Be sure to change those as well.

That's all you need to start working with Auth0!
