## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the OpenID Connect middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:60856/signin-auth0` if you use IIS Express, or `http://localhost:5000/signin-auth0` if you use Kestrel, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `http://YOUR_APPLICATION_URL/signin-auth0`  

## Configure JSON Web Token Signature Algorithm

The ASP.NET Core OpenID Connect (OIDC) middleware which will be used to authenticate the user, requires that the JSON Web Token (JWT) be signed with an asymmetric key. To configure this go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **RS256**.

Save your changes.     

## Dependencies

To integrate Auth0 with ASP.NET Core you will use the Cookie and OpenID Connect (OIDC) Middleware. Add the `Microsoft.AspNetCore.Authentication.Cookies` and `Microsoft.AspNetCore.Authentication.OpenIdConnect` packages to your application.

```bash
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
```