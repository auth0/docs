<!-- markdownlint-disable MD002 MD034 MD041 -->

## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the OpenID Connect middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:3000/callback`, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `https://YOUR_APPLICATION_URL/callback`.

<%= include('../../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

### Configure JSON Web Token Signature Algorithm

The ASP.NET Core OpenID Connect (OIDC) middleware which will be used to authenticate the user, requires that the JSON Web Token (JWT) be signed with an asymmetric key. To configure this go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **RS256**.

Save your changes.
