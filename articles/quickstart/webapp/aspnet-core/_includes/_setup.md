<%= include('../../../../_includes/_callback_url') %>

Depending on the web server you use, select the callback URL to whitelist for your application:
* If you use IIS Express, the callback URL is `http://localhost:60856/signin-auth0`.
* If you use Kestrel, the callback URL is `http://localhost:5000/signin-auth0`.

If you deploy your application to a different URL, you must add that URL to the **Allowed Callback URLs** field. For ASP.NET Core, this URL is in the format `http://YOUR_APPLICATION_URL/signin-auth0`.

## Configure the JSON Web Token Signature Algorithm

Auth0 uses the ASP.NET Core OpenID Connect (OIDC) middleware to authenticate the user. This middleware requires signing the JSON Web Token (JWT) with an asymmetric key. To configure the signature:
1. In your Auth0 dashboard, open the [Client Settings](${manage_url}/#/applications/${account.clientId}/settings).
2. Click on **Show Advanced Settings** > **OAuth**.
3. Set the **JsonWebToken Signature Algorithm** to **RS256**.

## Dependencies

To integrate Auth0 with ASP.NET Core, use the Cookie and OIDC authentication handlers. The seed project references the ASP.NET Core metapackage (`Microsoft.AspNetCore.All`), which includes all the NuGet packages that are a part of the ASP.NET Core 2.0 framework. The metapackage includes the packages for the Cookie and OIDC authentication handlers.

If you want to use those dependencies in your own project, in your application, add a note reference to the metapackage. Then, add the following packages to your application: 
* `Microsoft.AspNetCore.Authentication.Cookies` 
* `Microsoft.AspNetCore.Authentication.OpenIdConnect`

```bash
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
```