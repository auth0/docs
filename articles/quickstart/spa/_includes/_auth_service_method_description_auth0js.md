When you set up the `AuthService` service, you create an instance of the `auth0.WebAuth` object. In that instance, you can define the following:
* Configuration for your client and domain
* Response type, to show that you need a user's access token and an ID token after authentication
* Audience and scope, which specify that authentication must be [OIDC-conformant](/api-auth/intro)
* The URL where your users are redirected to after authentication.
::: note
In this tutorial, the route is `/callback`, which is implemented in the [Add a Callback Component](#add-a-callback-component) step. 
:::

Your users authenticate at the Auth0 hosted login page. They are then redirected back to your application. Their redirect URLs contain a hash fragment with each user's authentication information:
* `access_token`
* `id_token`
* `expires_in`

You can get the tokens from the URL using the `parseHash` method in the auth0.js library. You can save the values in local storage with the `setSession` method. The `setSession` method uses the `expires_in` value from the URL hash fragment to calculate when the user's access token expires.

Authentication using JSON Web Tokens is stateless. This means that when you use it, no information about the user's session is stored on your server. 

To set up a session for the user on the client side, save the following information in browser storage: 
* `access_token`
* `id_token`
* `expires_in`

To log the user out, remove these values from the storage. 

::: note
Our examples use local storage to save the user's authentication information. You can also use session storage or cookies. Read more about storing user information in the [security documentation](/security/store-tokens).
:::

You need to provide a way for your application to recognize if the user is authenticated. To do that, use the `isAuthenticated` method to check if the user's access token has expired. The user is no longer authenticated when the expiry time of their access token passes.
