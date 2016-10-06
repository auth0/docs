## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the Auth0 OAuth2 middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:56572/signin-auth0`, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `http://YOUR_APPLICATION_URL/signin-auth0`  

That's all you need to start working with Auth0!

Please continue with the [Login](/quickstart/webapp/aspnet-owin/01-login) tutorial to know how to implement basic login.