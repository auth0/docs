# Login Widget

Auth0 Login Widget makes it easy to integrate login in your your app so you don't have to worry about:

* Having a good looking login dialog that looks good on any resolution and device
* Finding icons for the social providers
* Remembering what was the identity provider the user has chosen last time
* Solving the home realm discovery issue with enterprise users (i.e.: ask the enterprise user the email and redirect to the right enterprise identity provider)
* Implementing the sign in standard protocol (OpenID Connect / OAuth2 Login)

![](img/widget-numbered.png)

1. The title of the widget. Optionally you can show a 24x24 icon.
2. The social buttons will be shown if you have at least one social connection enabled
3. The Email will be shown if you have at least one enterprise connection enabled. The Password will be shown if you have a Database connection. 
4. The Sign Up and Forgot Password links will be shown if you have a Database connection. 

> **How enterprise SSO works?** Suppose a user enters john@**fabrikam.com** and there is an enterprise connection whose domain is "**fabrikam.com**". In that situation, the password field will be hidden and when the user click on Sign In, he/she will be redirected to the corresponding identity provider (Google Apps, AD, Windows Azure AD, etc.). If the user is already logged in, there will be Single Sign On.

## Including the widget script on your page

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@"></script>

Add this script tag to your page to get started with Auth0 login widget. This script will add an `Auth0` component to the `window` object.

## Invoking the widget

To invoke the widget, use the `signIn` method

    window.Auth0.signIn({onestep: true});

## Customizing the widget

The widget can be customized through the parameters sent to `signIn`:

If you want to customize the widget texts, you have to invoke it with these properties:

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

Those properties will show this widget:

![](img/widget-customized.png)

## Customizing error messages

You can customize the error messages that will be displayed on certain situations.

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

These errors will be shown on the widget header.

![](img/widget-error.png)

## Sending extra query string paramters

If you want to send extra parameters when triggering a login, the way to do it is by adding query strings in the `script` tag. For instance, here we are adding paramter state

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@&state=foo"></script>

Common parameters are:

* `response_type`: this could be `code` or `token`. Usually `code` is used in web apps (server-side) and `token` on mobile, native or single page apps. See [server side protocol](oauth-web-protocol) and [mobile, single page apps and native apps](oauth-implicit-protocol) sections for more information about one or the other.
* `state`: arbitrary state value that will be mantained across redirects (useful for XSRF)
* `scope`: there are two possible values for scope today
    * `scope=openid`: it will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
    * `scope=openid%20profile`: If you want the whole user profile to be part of the id_token, specify
* `redirect_uri`: by setting this value you can choose what callback url to use if you have multiple registered. Useful when you have multiple environments and a single application in Auth0.
* `authorize_url`: if specified, it will start the login transaction at that url. This is useful if you want to do something on the server, before redirecting to Auth0. For instance, this is used when integrating with ASP.NET MVC4 which uses DotNetOpenAuth and generates a propietary "state" parameter that can only be generated on the server side.
* `any other thing`: will be passed through.

## Using the API instead of the widget

If you don't want to use the widget, you can still make use of the API with a simple JavaScript call and render whatever you want.

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

* Q: Can I customize the colors and structure of the widget?

    A: Not currently. But if there is enough interest, we might implement that in the future. In the meantime you can use the JavaScript object model as shown above.

* Q: Can I remove the Powered by Auth0?

    A: It can be removed if you are subscribed to one of the paid plans.

* Q: Is it possible to embed the widget in an HTML element instead of using a modal dialog?

    A: Yes. You can embed it on a `div` by adding a query string to the script URL specifying the div id. E.g.: &lt;script id="auth0" src="https://sdk.auth0.com/auth0.js#client=...&**container=root**">&lt;/script>

* Q: What happens if the user enters an email corresponding to a domain that has not been provisioned before? 

    A: That behavior will depend on another parameter called `provisioningOnUnknownDomain`. If this flag is true, we will show the [provisioning widget](#) prepopulated with that domain. If that flag is false, we will show a message saying that the domain has not been setup as explained above.
