When you set up the `AuthService` service, you create an instance of the `auth0.WebAuth` object. In that instance, you can define the following:
* Configuration for your client and domain
* Response type, to show that you need a user's access token and an ID token after authentication
* Audience and scope, which specify that authentication should be [OIDC conformant](https://auth0.com/docs/api-auth/tutorials/adoption)
* The URL where your your users are redirected after authentication. In the example above, the route is `/callback`, which will be implemented later in the Add a Callback Component step. 

Your users authenticate at Auth0's hosted login page. They are then redirected back to your application. Their redirect URLs contain a hash fragment with each user's authentication information:
* `access_token`
* `id_token`
* `expires_in`

You can get these values from the URL using the `parseHash` method from the **auth0.js** library. You can save the values in local storage with the `setSession` method. This method also uses the `expires_in` value from the URL hash fragment to calculate when the user's access token expires.

Authentication using JSON Web Tokens is stateless. This means that when you use it, there is no information about the user's session stored on your server. 

To set up a session for the user on the client side, you need to save the following information in the browser storage: 
* `access_token`
* `id_token`
* `expires_in`

To log the user out, you need to remove these values from the storage. 

::: note
Our examples use local storage to save the user's authentication information. You can also use session storage or cookies.
:::

You need to provide a way for your application to recognize if the user is authenticated. To do that, use the `isAuthenticated` method to check if the user's access token is expired. The user is authenticated if the expiry time of their access token hasn't passed.