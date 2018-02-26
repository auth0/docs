## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the Auth0 OAuth2 middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:56572/signin-auth0`, so be sure to add this to the **Allowed Callback URLs** section of your application. Also add `http://localhost:56572/` to the **Allowed Logout URLs**.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs** and **Allowed Logout URLs**.
