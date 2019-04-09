<!-- markdownlint-disable MD041 -->

When you set up the `AuthService` service, you create an instance of the `auth0.WebAuth` object. In that instance, you can define the following:

* Configuration for your application and domain
* Response type, to show that you need a user's ID Token after authentication
* The URL where you want to redirect your users after authentication.

::: note
In this tutorial, the route is `/callback`, which is implemented in the [Add a Callback Component](#add-a-callback-component) step. 
:::

Your users authenticate via Universal Login, at the login page. They are then redirected back to your application. Their redirect URLs contain hash fragments with the user's ID token.

You can get the tokens from the URL using the `parseHash` method in the auth0.js library. You can then set up the login session using the `localLogin` method. The `localLogin` method uses the `exp` value from the ID Token payload to calculate when the user's ID Token expires.

Authentication using JSON Web Tokens is stateless. This means that when you use it, no information about the user's session is stored on your server.

To set up a session for the user on the client side, save the `id_token` value into memory, and write a flag to local storage to indicate that the user is logged in.

To log the user out, remove the `id_token` value from memory and remove the flag from local storage.

You need to provide a way for your application to recognize if the user is authenticated. To do that, use the `isAuthenticated` method to check if the user's ID Token has expired. The user is no longer authenticated when the expiry time of their ID Token passes.
