## Add the Auth0 Callback Handler

First we need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Auth0CallbackHandler` provided by the SDK.

We have to define a new Controller, configure it to use the `auth0.loginCallback` endpoint, and inherit from `Auth0CallbackHandler`.

Create a new `CallbackController.java` file and set the following contents:

${snippet(meta.snippets.use)}

## Define Endpoint Security Configuration

The [Auth0 Spring Security MVC library](https://github.com/auth0/auth0-spring-security-mvc) contains a security configuration class, called `Auth0SecurityConfig`. This class handles all the library Application Context wiring configuration, and a default `HttpSecurity` endpoint configuration that secures the URL Context path defined with `auth0.securedRoute` property.

This is defined in a method called `authorizeRequests(final HttpSecurity http)` which should be overridden by you.

${snippet(meta.snippets.LoginAuthRequestsMethod)}

By subclassing, and overriding `authorizeRequests` you can define whatever endpoint security configuration (authentication and authorization) is suitable for your own needs.

For example, this is the declared subclass together with overridden method from our sample application.

${snippet(meta.snippets.LoginAuthRequestsSubclass)}


## Display Lock Widget

In order to setup [Lock](/libraries/lock) update the `login.jsp` as follows:

${snippet(meta.snippets.LoginJsp)}

__NOTE__: The sample also includes several css, js, and font files, which are not listed in this document for brevity. These files can be found under the `auth0-spring-mvc-sample/src/main/resources/static/` directory and you don't need to include them if you don't want to.

First, we initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

We set several parameters as input, like `redirectUrl` and `responseType`. For details on what each parameter does, refer to [Lock: User configurable options](/libraries/lock/customization).

Once the `Auth0Lock` is initialized we display the widget using `lock.show()`.

## Display User Information

Depending on what `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received.

The full user profile information is available as a session object keyed on `Auth0User`, you can call `SessionUtils.getAuth0User()` to retrieve the information. However, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

Add the following to your `HomeController.java` file:

${snippet(meta.snippets.LoginHomeController)}

The value `/portal/home` should be replaced with the valid one for your implementation.

Once the user has successfully authenticated, the application displays the `home.jsp`. In order to display some user information, as retrieved from Auth0, update the `home.jsp` as follows:

${snippet(meta.snippets.LoginHomeJsp)}

## Test the App

We are now ready to test the application!

Build and run the project using `mvn spring-boot:run`. Then, go to [http://localhost:3099/login](http://localhost:3099/login).

You should see the custom login page, instead of Lock.

![Lock Login](/media/articles/java/lock_login_form.png)

Enter the credentials of the user you created earlier to test the login. You should see the following screen.

![Lock Login](/media/articles/java/lock_user_info.png)