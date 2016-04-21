# Lock vs. Custom UI

When adding Auth0 to your app, you have the option of:

* Using [Lock](/libraries/lock);
* Using a custom user interface that you have created in conjunction with the [auth0.js](libraries/auth0js) library or the [Authentication API](https://auth0.com/docs/auth-api).

**Lock** is a drop-in authentication widget that provides a standard set of behavior and a customizable user interface. **Auth0.js** is a client-side library that *does not* come with a user interface but provides near limitless customization in terms of behavior and appearance. The **Authentication API** provides integration without requiring the use of any Auth0 libraries. Whichever option you choose depends on the needs of your app.

## Lock

![](/media/articles/lock-vs-customui/lock.png)

**Lock** is an embeddable login form that makes it easy for your users to authenticate themselves using the appropriate Connection. Lock will automatically handle most of the details involved with creating and authenticating users for you. You will also have a user interface that:

* Is robust and provides an excellent user experience on any device with any resolution;
* Has a simple design that fits in with most modern websites with just a few tweaks to its custom color;
* Adapts to whatever your configuration is. It displays the correct forms controls for each available Connection and only those that are allowable (such as sign up or password reset);
* Chooses the correct Connection automatically. In cases of ambiguity, you may set the desired default behavior;
* Remembers the last used Connection for any given user;
* Accommodates internationalization;
* Provides instant password policy checking during sign up.

While you cannot change Lock's behavior, you may [configure basic options](https://auth0.com/docs/libraries/lock/customization) regarding Lock and its usage on your app. You may also [customize its appearance](https://auth0.com/docs/libraries/lock/ui-customization).

### When to Use Lock

You should consider using Lock for your app(s) if:

* You are okay with adopting the structure, look, and feel of Lock;
* You would like a quick solution with low turn-around time in terms of implementation;
* Your business process includes many of the use cases that Lock provides out of the box: Enterprise logins, database with password policies, signup and password reset, authentication using social providers, and the usage of avatars;
* You want a login box that can be consistently reused in multiple areas.

## Custom User Interfaces

![](/media/articles/lock-vs-customui/customui.png)

The **auth0.js** library and the **Authentication API** allow you to implement a customized process to trigger the signup/authentication process and handle the response. You are free to customize the behavior and flow of your process, so if your business needs aren't met by the standardized **Lock** behavior or if you have a complex custom process, this option would be a better fit.

Unlike **Lock**, neither of these options includes a user interface. As such, you have complete control over the implementation of the user experience for authentication/signup flow, UI-related aspects such as layout, look and feel, branding, internationalization, RTL support, and so on.

You should consider using a custom user interface in conjunction with the auth0.js library or the Authentication API for your app(s) if:

* You have strict requirements for how the user interface should appear;
* You are comfortable with HTML, CSS, and JavaScript;
* Your business process includes just a few use cases (for example, you only need to handle username/password and social provider authentication);
* You have multiple database or Active Directory connections.
