# Auth0 Login Widget

The __Auth0 Login Widget__ makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional looking login dialog that displays well on any resolution and device.
* Finding the right icons for popular social providers.
* Remembering what was the identity provider the user chose the last time.
* Solving the home realm discovery challenge with enteranprise users (i.e.: asking the enterprise user the email, and redirecting to the right enterprise identity provider).
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

## Including the Login Widget on your page
Add the script tag to your page to get started with __Auth0 Login Widget__.

    <script src="@@widget_url@@"></script>

## Playground

@@sdk2@@

## Single Page Applications

You can handle the authorization process client-side as follows:

    <script type="text/javascript">
        var widget = new Auth0Widget({
            domain:                 '@@account.namespace@@',
            clientID:               '@@account.clientId@@', 
            callbackURL:            '@@account.callback@@',
            callbackOnLocationHash: true
        });

        var result = widget.parseHash(location.hash);
        if (result && result.id_token) {
            auth0.getProfile(result.id_token, function (err, profile) {
              window.location.hash = "";
              if (err) {
                return alert('error fetching profile: ' + JSON.stringify(err));
              }
              // store result.id_token and profile in local storage or cookie
                
            });
        }
        
        widget.signin();
    </script>

> When `callbackOnLocationHash: true` is specified, Auth0 will send the response back as a redirect to your site passing the tokens after the hash sign: `@@account.callback@@#access_token=...&id_token=...`.

## Customizing the Widget

The Widget can be customized through the `options` parameter sent to the `signin` method.

### Options

* __connections__: Array of enabled connections that will be used for the widget. Default: all enabled connections.
* __container__: The id of the DIV where the widget will be contained.
* __icon__: Icon url. Recommended: 32x32.
* __showIcon__: Show/Hide widget icon. Default: false.
* __showForgot__: Show/Hide the "Forgot your password?" link. Default: true.
* __showSignup__: Show/Hide the "Sign Up" link. Default: true.
* __enableReturnUserExperience__: Show the account used last time the user signed in. Default: `true`.
* __userPwdConnectionName__: Specify which Database/AD-LDAP connection should be used with the Email/Password fields. Default: the first Database connection found (if it exists) or the first AD-LDAP connection found.
* __username_style__: Specify the format of the username. Options: `email` or `username`.

> Is there an option that you think would be useful? Just <a target="_blank" href="https://github.com/auth0/widget/issues">open an issue on GitHub</a> and we'll look into adding it.

This example shows how to work with only specified connections and display the labels in Spanish:
    
    var widget = new Auth0Widget({
        domain:         '@@account.namespace@@',
        clientID:       '@@account.clientId@@', 
        callbackURL:    '@@account.callback@@',
        dict:           'es'
    });

    widget.signin({
        connections:    ['facebook', 'google-oauth2', 'twitter', 'Username-Password-Authentication'],
        icon:           'https://contoso.com/logo-32.png',
        showIcon:       true
    },
    function () {
      // The Auth0 Widget is now loaded.
    });

> `dict` constructor parameter is a string matching the language (`'en'`, `'es'`, `'it'`, <a target="_new" href="https://github.com/auth0/widget/tree/master/i18n">etc.</a>) or object containing all your customized text labels.

Resulting in:

![](https://i.cloudup.com/eE_1a3byo7.png)

## Sending extra login parameters

You can send extra parameters when starting a login by adding them to the options object. The example below adds a `state` parameter with a value equal to `foo`.

    widget.signin({
        // ... other options ... 
        state: 'foo'
    });

The following parameters are supported: `access_token`, `protocol`, `request_id`, `scope` and `state`.

There are other extrar parameters that will depend on the provider. For example, Google allows you to get back a `refresh_token` only if you explictely ask for `access_type=offline`. We support sending arbitrary parameters like this:

    widget.signin({
        // ... other options ... 
        extraParameters: {
            access_type: 'offline'
        }
    });

> Note: this would be analogous to trigger the login with `https://@@account.namespace@@/authorize?state=foo&access_type=offline&...`.

### Scope

There are different values supported for scope:

* `scope: 'openid'`: _(default)_ It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id (sub claim).
* `scope: 'openid profile'`: If you want the entire user profile to be part of the `id_token`.
* `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the `id_token` (For example: `scope: 'openid name email picture'`).

## Signup and Reset

It is also possible to start the widget in the **Sign Up** mode or **Reset Password** mode as follows:

    widget.signup(/* [same as the .signin method] */);
    // or
    widget.reset(/* [same as the .signin method] */);

## Anatomy of the Auth0 Login Widget

![](https://i.cloudup.com/y2iG3mE8Ll.png)

1. The __title__ of the widget. You can optionally show a 32x32 icon.
2. The __social buttons__ will be shown if you have at least one social connection enabled.
3. The __Email__ field will be shown if you have at least one enterprise connection enabled. The __Password__ field will be shown if you have a Database connection. 
4. The __Sign Up__ and __Forgot Password__ links will be shown if you have a Database connection. 

> **How does enterprise SSO work?** Consider a user that enters john@**fabrikam.com**. If there's an enterprise connection with an associated domain "**fabrikam.com**", then the password field will be hidden. When the user clicks on __Sign In__, he/she will be redirected to the corresponding identity provider (Google Apps, AD, Windows Azure AD, etc.) where that domain is registered. If the user is already logged in with the Identity Provider, then Single Sign On will happen.

## Customize the look and feel

You can apply your own style to the elements. All classes and ids are prefixed with `a0-` to avoid conflicts with your own stylesheets.

## Customizing error messages

You can also customize the error messages that will be displayed on certain situations:

    var widget = new Auth0Widget({
        // ... other parameters ... 
        dict: {
            loadingTitle:   'loading...',
            close:          'close',
            signin: {
                wrongEmailPasswordErrorText: 'Custom error message for invalid user/pass.',
                serverErrorText: 'There was an error processing the sign in.',
                strategyEmailInvalid: 'The email is invalid.',
                strategyDomainInvalid: 'The domain {domain} has not been setup.'
            },
            signup: {
                serverErrorText: 'There was an error processing the sign up.',
                enterpriseEmailWarningText: 'This domain {domain} has been configured for Single Sign On and you can\'t create an account. Try signing in instead.'
            },
            reset: {
                serverErrorText: 'There was an error processing the reset password.'
            }
            // wrongEmailPasswordErrorText, serverErrorText, enterpriseEmailWarningText are used only if you have a Database connection
            // strategyEmailInvalid is shown if the email is not valid
            // strategyDomainInvalid is shown if the email does not have a matching enterprise connection
        }
    });

These errors will be shown on the widget header:

![](img/widget-error.png)
