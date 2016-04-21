# Lock vs. Auth0.js

When adding Auth0 to your app, you have the option of using either the [Lock](/libraries/lock) or [auth0.js](libraries/auth0js) libraries.

**Lock** is a drop-in authentication widget that provides a standard set of behavior and a customizable user interface. **Auth0.js** is a client-side library that *does not* come with a user interface but provides for near limitless customization in terms of behavior and appearance. Whichever option you choose depends on the needs of your app.

> If you would prefer to not use either library, you still have the option of using the [Authentication API](https://auth0.com/docs/auth-api).

## Lock

**Lock** is an embeddable login form that makes it easy for your users to authenticate themselves using the appropriate Connection. By using Lock, you will:

* Have a professional-looking sign up/log in dialog box that displays well on any device;
* Eliminate the need of setting up behaviors such as remember the identity provider the user chose initially, resolving the home real discovery challenge with Enterprise users, or manually implementing a standard sign in protocol.

While you cannot change Lock's behavior, you may [configure basic options](https://auth0.com/docs/libraries/lock/customization) regarding Lock and its usage on your app. You may [customize its appearance](https://auth0.com/docs/libraries/lock/ui-customization).

### When to Use Lock

You should consider using Lock for your app(s) if:

* You are okay with adopting the structure, look, and feel of Lock;
* You would like a quick solution with low turn-around time;
* Your business process includes many of the user cases that Lock provides out of the box: Enterprise logins, database with password policies, signup and password reset, authentication using social providers, and using avatars;
* You want a login box that can be consistently reused in multiple areas.

## Auth0.js

**Auth0.js** allows you to trigger the authentication process and handle the response. Unlike Lock, auth0.js does **not** include a user interface. You are, however, free to customize the behavior and flow of your process, so if your business needs aren't met by the standardized **Lock** behavior or if you have a complex custom process, this option would be a better fit.

In addition, you have complete control over the implementation of the user experience for authentication/signup flow, UI-related aspects such as layout, look and feel, branding, internationalization, RTL support, and so on.

You should consider using auth0.js for your app(s) if:

* You have strict requirements for how the user interface should appear;
* You are comfortable with HTML, CSS, and JavaScript;
* Your business process includes just a few use cases (for example, you only need to handle username/password and social provider authentication);
* You have multiple database or Active Directory connections.
