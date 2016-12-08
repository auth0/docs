## Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/java/callback_error.png)

If you follow our seed project or the samples based on it, the values you must configure are:
- Allowed Callback URL: `http://localhost:3099/callback`
- Allowed Logout URLs: `http://localhost:3099/logout`


## Setup Dependencies

To integrate your Java application with Auth0 you need to add the following dependencies:

- [auth0-servlet](https://github.com/auth0/auth0-servlet): is the Java library that allows you to use Auth0 with Java for server-side MVC web apps. It validates the [JWT](/jwt) from Auth0 in every API call to assert authentication according to configuration.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}


## Configure your Java App

Your java app needs some information in order to authenticate against your Auth0 account. You need to set this information at the deployment descriptor file `src/main/webapp/WEB-INF/web.xml`. The required information is:

${snippet(meta.snippets.setup)}

As you can see in the seed project, there are many customizable attributes in the `web.xml`.

| Attribute | Description|
| --- | --- |
| `auth0.domain` | Your auth0 domain. You can find the correct value on the Settings tab of your client on the [dashboard](${manage_url}/#/applications). * |
| `auth0.issuer` | The issuer of the JWT Token. This is typically your auth0 domain with a `https://` prefix and a `/` suffix. For example, if your `auth0.domain` is `example.auth0.com` then the `auth0.issuer` should be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.clientId` | The unique identifier for your client. You can find the correct value on the Settings tab of your client on the [dashboard](${manage_url}/#/applications). * |
| `auth0.clientSecret` | The secret used to sign and validate the tokens that will be used in the different authentication flows. You can find the correct value on the Settings tab of your client on the [dashboard](${manage_url}/#/applications). * |
| `auth0.onLogoutRedirectTo` | The page that users of your site are redirected to on logout. Should start with `/`. |
| `auth0.redirect_on_success` | The landing page URL context path for a successful authentication. Should start with `/`. |
| `auth0.redirect_on_error` | The URL context path for the page to redirect to upon failure. Should start with `/`. |
| `auth0.redirect_on_authentication_error` | The URL context path for the page to redirect to upon authentication failure. Should start with `/`. |
| `auth0.signing_algorithm` | This is signing algorithm to verify signed JWT token. Use HS256 or RS256. |
| `auth0.public_key_path` | Path location to the public key. Should always be set when using RS256 and is ignored for HS256. |


**NOTE**: If you download the seed using our **Download Sample** button then the `domain`, `issuer`, `clientId` and `clientSecret` attributes will be populated for you, unless you are not logged in or you do not have at least one registered client. In any case, you should verify that the values are correct if you have multiple clients in your account and you might want to use another than the one we set the information for. Do not forget to manually set the `issuer` attribute!
