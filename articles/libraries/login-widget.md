::: warning-banner
__WARNING:__ This version of the login widget has been deprecated. <br> Please use the [new version](/lock) instead.
:::

# Auth0 Login Widget

The __Auth0 Login Widget__ makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional looking login dialog that displays well on any resolution and device.
* Finding the right icons for popular social providers.
* Remembering what was the identity provider the user chose the last time.
* Solving the home realm discovery challenge with enterprise users (i.e.: asking the enterprise user the email, and redirecting to the right enterprise identity provider).
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

## Anatomy of the Auth0 Login Widget

![](/media/articles/login-widget/widget-numbered.png)

1. The __title__ of the widget. You can optionally show a 24x24 icon.
2. The __social buttons__ will be shown if you have at least one social connection enabled.
3. The __Email__ field will be shown if you have at least one enterprise connection enabled. The __Password__ field will be shown if you have a Database connection.
4. The __Sign Up__ and __Forgot Password__ links will be shown if you have a Database connection.

> **How does enterprise SSO work?** Consider a user that enters john@**fabrikam.com**. If there's an enterprise connection with an associated domain "**fabrikam.com**", then the password field will be hidden. When the user clicks on __Sign In__, he/she will be redirected to the corresponding identity provider (Google Apps, AD, Windows Azure AD, etc.) where that domain is registered. If the user is already logged in with the Identity Provider, then Single Sign On will happen.

## Including the Login Widget on your page

    <script src="https://sdk.auth0.com/auth0.js#client=${account.clientId}"></script>

Add the script tag to your page to get started with __Auth0 Login Widget__. This script will add an `Auth0` component to the `window` object.

## Invoking the Widget

To invoke the widget, use the `signIn` method

    window.Auth0.signIn({onestep: true});

## Customizing the Widget

The Widget can be customized through the parameters sent to the `signIn` method.

This example shows how to display the labels in Spanish:

    window.Auth0.signIn({
        onestep: true,
        title: "Contoso",
        signInButtonText: "Ingresar",
        emailPlaceholder: "Correo",
        passwordPlaceholder: "Contraseña",
        separatorText: "o",
        showIcon: true,
        icon: "https://myapp.com/logo.png",
        showSignup: true,
        signupText: "Registrarme!",
        signupLink: "https://myapp.com/signup",
        showForgot: true,
        forgotText: "Olvidé mi contraseña",
        forgotLink: "https://myapp.com/forgot"
    });


Resulting in:

![](/media/articles/login-widget/widget-customized.png)

## Customizing the Login Widget for Database Connections

When using a database connections, the **Login Widget** has support for account creation (sign-up) and password changes:

### Customizing **sign-up** messages

    window.Auth0.signIn({
        onestep: true,
        separatorText: "o",
        showIcon: true,
        icon: "https://myapp.com/logo.png",
        // ... other properties ...
        signupTitle: "Registrarse",
        signupHeaderText: "Por favor, ingrese su correo y contraseña",
        signupFooterText: "Al hacer clic en \"Crear Usuario\", usted está aceptando nuestros términos y condiciones.",
        signupButtonText: "Crear Usuario",
        signupEmailPlaceholder: "Correo",
        signupPasswordPlaceholder: "Contraseña",
        signupCancelButtonText: "Cancelar"
    });

Will display the following:

![](/media/articles/login-widget/widget-customized-signup.png)

### Customizing **change-password** messages

    window.Auth0.signIn({
        onestep: true,
        separatorText: "o",
        showIcon: true,
        icon: "https://myapp.com/logo.png",
        // ... other properties ...
        resetTitle: "Cambiar Contraseña",
        resetHeaderText: "Por favor, ingrese su correo y una nueva contraseña. Se le enviará un correo para confirmar el cambio de la misma.",
        resetButtonText: "Enviar",
        resetEmailPlaceholder: "Correo",
        resetPasswordPlaceholder: "Nueva Contraseña",
        resetRepeatPasswordPlaceholder: "Confirmar Nueva Contraseña",
        resetCancelButtonText: "Cancelar",
        resetSuccessText: "Se ha enviado un correo electrónico para confirmar el cambio de contraseña.",
        resetEnterSamePasswordText: "Por favor, ingrese la misma contraseña"
    });

Will display the following:

![](/media/articles/login-widget/widget-customized-reset.png)

## Customizing error messages

You can also customize the error messages that will be displayed on certain situations:

    window.Auth0.signIn({
        onestep: true,
        title: "Contoso",
        // ... other properties ...
        // wrongEmailPasswordErrorText, serverErrorText, signupEnterpriseEmailWarningText, signupServerErrorText and resetServerErrorText are used only if you have a Database connection
        wrongEmailPasswordErrorText: 'Custom error message for invalid user/pass.',
        serverErrorText: 'There was an error processing the sign in.',
        signupEnterpriseEmailWarningText: 'This domain {domain} has been configured for Single Sign On and you can\'t create an account. Try signing in instead.',
        signupServerErrorText: 'There was an unhandled error processing the sign up.',
        resetServerErrorText: 'There was an unhandled error processing the change password.',
        // strategyDomainInvalid is shown if the email does not have a matching enterprise connection
        strategyDomainInvalid: 'The domain {domain} has not been setup.',
        // strategyEmailInvalid is shown if the email is not valid
        strategyEmailInvalid: 'The email is invalid.'
    });

These errors will be shown on the widget header:

![](/media/articles/login-widget/widget-error.png)

## Sending extra query string parameters

You can send extra parameters when starting a login by adding query strings in the `script` tag. The example below adds a `state` parameter with a value equal to `foo`.

    <script src="https://sdk.auth0.com/auth0.js#client=${account.clientId}&state=foo"></script>

Common parameters are:

* `response_type`: this could be `code` or `token`. Usually `code` is used in web apps (server-side) and `token` on mobile, native or single page apps. See [server side protocol](/oauth-web-protocol) and [mobile, single page apps and native apps](/oauth-implicit-protocol) sections for more information about one or the other.
* `state`: arbitrary state value that will be mantained across redirects (useful for XSRF)
* `scope`: there are various possible values for scope:
    * `scope=openid`: it will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
    * `scope=openid {attr1} {attr2}`: if you want specific user profile properties returned.(For example: `__scope: "openid name email picture"`). You can get more information about this in the [Scopes documentation](/scopes).
* `redirect_uri`: by setting this value you can choose what callback url to use if you have multiple registered. Useful when you have multiple environments (e.g. Dev & Test), and a single application in Auth0.
* `authorize_url`: if specified, it will start the login transaction at that url. This is useful if you want to do something on the server, before redirecting to Auth0. For instance, this is used when integrating with ASP.NET MVC4 which uses DotNetOpenAuth and generates a proprietary "state" parameter that can only be generated on the server side.
* `protocol`: this could be `oauth2` (default), `samlp` or `wsfed`.
* `any other thing`: will be passed through.

## Using the API instead of the widget

If you don't want to use the widget, you can still make use of the API with a simple JavaScript call and render anything you want.

Here is an example:

    var client = window.Auth0.getClient();
    for (var i in client.strategies) {
      for (var j in client.strategies[i].connections) {
        var connection = client.strategies[i].connections[j];

        var link = $('<a>')
                        .text(connection.name)
                        .attr('href', connection.url);

        $('ul.login-list').append($('<li>').append(link));
      }
    }

## FAQs

* Can I customize the colors and structure of the widget?

    Yes. You can customize it by passing a `css` parameter to the script pointing to a URL with your CSS (hosted on HTTPS). Or you can use the JavaScript API and use your own UI.
    Here are a couple of fiddles to play around: <a href="http://jsfiddle.net/auth0/FSCrV/">css customization</a> and <a href="http://jsfiddle.net/auth0/2t9HG/">JavaScript API</a>

* Can I remove the "Powered by Auth0"?

    It can be removed if you are subscribed to one of the paid plans.

* Is it possible to embed the widget in an HTML element instead of using a modal dialog?

    Yes. You can embed it on a `div` by adding a query string to the script URL specifying the div `id`. e.g.: &lt;script id="auth0" src="https://sdk.auth0.com/auth0.js#client=...&**container=root**">&lt;/script>

* What happens if the user enters an email corresponding to a domain that has not been provisioned before?

    That behavior will depend on another parameter called `provisioningOnUnknownDomain`. If this flag is true, we will show the [provisioning widget](#) pre-populated with that domain. If that flag is false, an error message will be displayed (The domain has not been setup yet).
