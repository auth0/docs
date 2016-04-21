# Lock vs. Auth0.js

When adding Auth0 to your app, you have the option of using [Lock](/libraries/lock) or [auth0.js](libraries/auth0js).

**Lock** is a drop-in authentication widget that provides a standard set of behavior and a customizable user interface. **Auth0.js** is a client-side library that *does not* come with a user interface but provides for near limitless customization in terms of behavior. Whichever option you choose depends on the needs of your app.

> If you would prefer to not use either library, you still have the option of using the [Authentication API](https://auth0.com/docs/auth-api).

## Lock

**Lock** is an embeddable login form that makes it easy for your users to authenticate themselves using the appropriate Connection. By using Lock, you will:

* Have a professional-looking sign up/log in dialog box that displays well on any device;
* Eliminate the need of setting up behaviors such as remember the identity provider the user chose initially, resolving the home real discovery challenge with Enterprise users, or manually implementing a standard sign in protocol.

While you cannot change Lock's behavior, you may [configure basic options](https://auth0.com/docs/libraries/lock/customization) regarding Lock and its usage on your app. You may [customize its appearance](https://auth0.com/docs/libraries/lock/ui-customization).



## Auth0.js

**Auth0.js** allows you to trigger the authentication process and handle the response. Unlike Lock, auth0.js does **not** include a user interface. You are, however, free to customize the behavior and flow of your process, so if your business needs aren't met by the standardized **Lock** behavior or if you have a complex custom process, this option would be a better fit.

### Logging in Users

When using the auth0.js library, you begin by including an instance of the Auth0 client in the front-end of your app. Using this client, you can configure your user's login in any number of ways, including integration with social providers, implementing Passwordless sign-on, and so on. Unlike using Lock, you are not limited in terms of the methods you use to log in users.

### Processing Callbacks

After your user has attempted a login, you will need to handle the callback so that control returns to your app. How you do so is dependent on whether you've chosen to use **redirect** or **popup** mode and, in certain cases, the type of connection you are using.
