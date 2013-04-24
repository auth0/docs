# Login Widget

Auth0 Login Widget makes it easy to integrate login in your your app so you don't have to worry about:

* Having a good looking login dialog that looks good on any resolution and device
* Finding icons for the social providers
* Remembering what was the identity provider the user has chosen last time
* Solving the home realm discovery issue with enterprise users (i.e.: ask the enterprise user the email and redirect to the right enterprise identity provider)
* Implementing the sign in protocol

## Including the widget

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@"></script>

Add this script tag to your page to get started with Auth0 login widget. This script will add an `Auth0` component to the `window` object.

## signIn

`window.Auth0.signIn` will show the widget. There are two visual modes: large buttons (default) and small buttons.

### Large buttons

By default, you can invoke the widget like this

    window.Auth0.signIn();

And it will show the widget as illustrated below:

![](img/widget-large.png)

If the user selects an **enterprise** identity provider (like Windows Azure AD, Google Apps, AD, etc.), we need to identify the identity provider of that user's organization. To do that, we ask the email and extract the domain. With the domain, we can identify the associated enterprise identity provider.

![](img/widget-2.png)

> Once the user authenticated the first time, the widget will remember the email for the next time.

### Small buttons

The other visual mode can be invoked with the following JavaScript:

    window.Auth0.signIn({onestep: true});

![](img/widget-onestep.png)

Compared to the **large buttons** mode, in this mode you have the social providers represented by small buttons and then an input box to allow the users to enter their **work** email. The latter is used to identify the identity provider of the user's organization. To do that, we extract the domain from the email, identify the associated enterprise identity provider and redirect. This value will be stored in a cookie so the next time the user won't have to type it in.

> What happens if the user enters an email corresponding to a domain that has not been provisioned before? That behavior will depend on another parameter called `provisioningOnUnknownDomain`. If this flag is true, we will show the [provisioning widget](#) prepopulated with that domain. If that flag is false, we will show a message saying that the domain has not been setup.

## Customizing the widget

The widget can be customized in some ways:

![](img/widget-onestep-numbered.png)

1. `title`: title of the widget (default to "Sign In").
2. `standalone`: if `true` will not show the X and the widget can't be closed.
3. `social buttons`: only the connections that have been enabled will be shown here. This is not customizable today. 
4. `email textbox`: to identify the identity provider of the user's organization. This is only for **enterprise connections**. E.g.: If user enters "foo@mydomain.com", if there is a connection setup for mydomain.com, the widget will redirect to that connection.
    * `strategyEmailLabel`: label to show above the textbox where the user can enter the email (default to "Enter your work email:")
    * `strategyEmailInvalid`: label to show if the email is not valid (default to "The email is invalid")
    * `provisioningOnUnknownDomain`: if `true` it will launch the [provisioning widget](#) if the domain the user entered has not been registered before. If `false` it will show a message `strategyDomainInvalid`.
    * `strategyDomainInvalid`: label to show if the domain (taken from the user email) has not been provisioned yet.

Only for **large buttons** mode:

![](img/widget-large-full.png)

1. `title`: title of the widget (default to "Sign In").
2. `standalone`: if `true` will not show the X and the widget can't be closed.
3. social buttons: only the connections that have been enabled will be shown here. This is not customizable today. 
4. email textbox: will be shown as a second step if the identity provider chosen is an enterprise connection.
    * `strategyButtonTemplate`: text to show in the button (by default the name of the provider). For instance, you can use `{ strategyButtonTemplate: 'Sign in with {name}'}`
    * `allButtonTemplate`: link text to show all the buttons, if the user logged in before and a provider is already selected (default to "Show all").
    * `strategyEmailEmpty`: label to show when the user does not enter any email (default to 'The email is empty').
    * `strategyBack`: link text to allow going back to the providers selector (default to "Back").

Here is an example of a widget customized

    window.Auth0.signIn({title:'My App', allButtonTemplate: 'Login with a different account'})

We customized the title and the message that appears when a user logged in once, in this case using Google.

![](img/widget-custom.png)

## Customizing the login link

The widget buttons are URLs that trigger the login transaction. The login URLs look like this

    https://@@account.namespace@@/authorize?response_type=code&client_id=@@account.clientId@@&connection=...

If you want to send extra parameters when triggering a login, the way to do it is by adding query strings in the `script` tag. For instance, here we are adding paramter state

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@&state=foo"></script>

Common parameters are:

* `state`: arbitrary state value that will be mantained across redirects (useful for XSRF)
* `scope`: there are two possible values for scope today
    * `scope=openid`: it will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
    * `scope=openid%20profile`: If you want the whole user profile to be part of the id_token, specify
* `nonce`: 
* `redirect_uri`: by setting this value you can choose what callback url to use if you have multiple registered. Useful when you have multiple environments and a single application in Auth0.
* `any other thing`: will be passed through.

## Using the API instead of the widget

If you don't want to use the widget, you can still make use of the API with a simple JavaScript call and render whatever you want.

Here is an example:

    var client = window.Auth0.getClient();
    for (var i in client.strategies) {
      for (var j in client.strategies[i].connections) {
        var connection = client.strategies[i].connections[j];
        $('ul').append($('<li>').append($('<span>').text('connection.name: ' + connection.name))
                                  .append($('<br>'))
                                  .append($('<span>').text('connection.url: ' + connection.url))
                                  .append($('<br>'))
                                  .append($('<span>').text('connection.domain: ' + connection.domain)));
      }
    }
