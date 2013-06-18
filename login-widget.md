# Auth0 Login Widget

The __Auth0 Login Widget__ makes it easy to integrate SSO in your your app. You won't have to worry about:

* Having a professional looking login dialog that shows well on any resolution and device.
* Finding the right icons for popular social providers.
* Remembering what was the identity provider the user chose the last time.
* Solving the home realm discovery challenge with enterprise users (i.e.: asking the enterprise user the email, and redirecting to the right enterprise identity provider).
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

##Anatomy of the Auth0 Login Widget

![](img/widget-numbered.png)

1. The __title__ of the widget. Optionally you can show a 24x24 icon.
2. The __social buttons__ will be shown if you have at least one social connection enabled.
3. The __Email__ field will be shown if you have at least one enterprise connection enabled. The __Password__ field will be shown if you have a Database connection. 
4. The __Sign Up__ and __Forgot Password__ links will be shown if you have a Database connection. 

> **How does enterprise SSO work?** Consider a user that enters john@**fabrikam.com**. There is an enterprise connection whose domain is "**fabrikam.com**". In that situation, the password field will be hidden. When the user clicks on __Sign In__, he/she will be redirected to the corresponding identity provider (Google Apps, AD, Windows Azure AD, etc.) hwere that domain is registered. If the user is already logged in, there will be Single Sign On.

## Including the Login Widget on your page

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@"></script>

Add the script tag to your page to get started with __Auth0 Login Widget__. This script will add an `Auth0` component to the `window` object.

## Invoking the Widget

To invoke the widget, use the `signIn` method

    window.Auth0.signIn({onestep: true});

## Customizing the Widget

The Widget can be customized through the parameters sent to the `signIn` method.

For example:

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

Will display the following:

![](img/widget-customized.png)

## Customizing error messages

You can customize the error messages that will be displayed on certain situations:

    window.Auth0.signIn({
        onestep: true,
        title: "Contoso",
        // ... other properties ... 
        // wrongEmailPasswordErrorText and serverErrorText are used only if you have a Database connection
        wrongEmailPasswordErrorText: 'Custom error message for invalid user/pass',
        serverErrorText: 'There was an error processing the sign in.',
        // strategyDomainInvalid is shown if the email does not have a matching enterprise connection
        strategyDomainInvalid: 'The domain {domain} has not been setup.',
        // strategyEmailInvalid is shown if the email is not valid
        strategyEmailInvalid: 'The email is invalid'
    });

These errors will be shown on the widget header:

![](img/widget-error.png)

## Sending extra query string parameters

You can send extra parameters when starting a login by adding query strings in the `script` tag. The example below adds a `state` parameter with a value equal to `foo`.

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@&state=foo"></script>

Common parameters are:

* `response_type`: this could be `code` or `token`. Usually `code` is used in web apps (server-side) and `token` on mobile, native or single page apps. See [server side protocol](oauth-web-protocol) and [mobile, single page apps and native apps](oauth-implicit-protocol) sections for more information about one or the other.
* `state`: arbitrary state value that will be mantained across redirects (useful for XSRF)
* `scope`: there are two possible values for scope today
    * `scope=openid`: it will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
    * `scope=openid%20profile`: If you want the entire user profile to be part of the `id_token`.
* `redirect_uri`: by setting this value you can choose what callback url to use if you have multiple registered. Useful when you have multiple environments (e.g. Dev & Test), and a single application in Auth0.
* `authorize_url`: if specified, it will start the login transaction at that url. This is useful if you want to do something on the server, before redirecting to Auth0. For instance, this is used when integrating with ASP.NET MVC4 which uses DotNetOpenAuth and generates a proprietary "state" parameter that can only be generated on the server side.
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

    Not currently. But if there is enough interest, we might implement that in the future. In the meantime you can use the JavaScript object model as shown above.

* Can I remove the "Powered by Auth0"?

    It can be removed if you are subscribed to one of the paid plans.

* Is it possible to embed the widget in an HTML element instead of using a modal dialog?

    Yes. You can embed it on a `div` by adding a query string to the script URL specifying the div `id`. e.g.: &lt;script id="auth0" src="https://sdk.auth0.com/auth0.js#client=...&**container=root**">&lt;/script>

* What happens if the user enters an email corresponding to a domain that has not been provisioned before? 

    That behavior will depend on another parameter called `provisioningOnUnknownDomain`. If this flag is true, we will show the [provisioning widget](#) pre-populated with that domain. If that flag is false, an error message will be displayed (The domain has not been setup yet).
