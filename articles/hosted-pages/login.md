---
description: Guide on how to use the hosted login page
---

# Hosted Login Page

Auth0 hosts a login page that is shown whenever an authentication request is triggered, such as when using the `/authorize` endpoint (OIDC/OAuth) or when sending a SAML login request.

This login page will be a basic login page for your client, and will use Lock to provide your users with a beautiful and smooth authentication process. The hosted login page is both one of your most secure authentication options as well as one of the easiest to implement.

> Note that if the authentication request includes a specific connection, and that connection is for an external identity provider, the hosted login page might not be displayed and the user will be directed to the identity provider's login page.

## Custom Hosted Login Page

In your [Auth0 Dashboard](${manage_url}/#/login_page), you can enable a custom Hosted Login Page by simply flipping the toggle switch, that allows you to customize the look and feel and behavior of the Hosted Login Page.

![Hosted Login Page](/media/articles/hosted-pages/login.png)


### Customizing Lock in the Hosted Login Page

If you want to change some of the [configuration options](/libraries/lock/v10/customization) within Lock, you may do so _right on this page_, just make your changes and make sure to remember to hit the _Save_ button. Remember that any changes to behaviors or appearance "hard coded" on this page into Lock's configuration here will apply to all users that access this Hosted Login Page, regardless of connection or client.

### The @@config@@ Object 

Auth0 provides a whole set of configuration values in the `@@config@@` string that is used to adjust the hosted login page's behavior in a more dynamic way - many of these values are passed from your app to the Hosted Login Page.

The `@@config@@` object is the vehicle by which the Hosted Login page can be customized at runtime. It contains a varety of configuration options. Note that the below examples assume that the `authorize` endpoint, and the Hosted Lock page, are being called via [Auth0.js v8](/libraries/auth0js/v8).

#### Customizing Lock text on the Hosted Login page

The `@@config@@` object contains a property called `dict` which can be used to set the text displayed in various parts of the Lock widget, similarly to the [languageDictionary](/libraries/lock/v10/customization#languagedictionary-object-) property in Lock itself. In order to pass your custom `languageDictionary` values to the Hosted Login Page, call `authorize` with the parameter `lang`.

```
webAuth.authorize({
  lang: {
    signin: {
      title: "Login to Awesomeness"
    }
  }
});
```

::: panel-info Default Lock Title
By default, the Lock widget's title is set to be the Client Name (i.e. "Default App") can be overridden with a `config.dict.signin.title` value, as exhibited above. If you wish, you can also customize the `languageDictionary` definition that is on the Hosted Login Page by default, and arrange your `lang`/`dict` object however you see fit.
:::

You can define your `languageDictionary` object for use in Lock on the Hosted Login Page as follows:

```
languageDictionary = { 
  title: config.dict.signin.title 
};
```

Check the See English language [Language Dictionary Specification](https://github.com/auth0/lock/blob/master/src/i18n/en.js) for more information about values that can be defined here.


#### Redirect URI

You can also pass the `redirect_uri` option to `authorize`, and access it within the Hosted Login Page editor by referring to `config.callbackURL`.

```
webAuth.authorize({
  redirect_uri: "http://example.com/foo"
});
```

Note that, as always, any redirect URL is going to need to be in the Allowed Redirect URLs, in the Client settings section of the [Auth0 Management Dashboard](${manage_url}).

#### Passing extraParams

When calling `authorize`, you can also pass other parameters by URL as required. If you choose to make customizations to your Hosted Lock Page, you can use `extraParams` to pass other values into the Hosted Lock page. The restriction is that those values need to not be keyed the same as any normal `authorize` parameters, as `extraParams` is filled from the parameters which are "extra" beyond those normally accepted by the endpoint. Below is a quick example:

```
webAuth.authorize({
  login_hint: "Here is a cool hint"
});

The value of `login_hint` can be accessed within the Hosted Login Page code via `config.extraParams.login_hint`.

You can take a look at the `@@config@@` object in further detail to help you further determine how to use it:

```javascript
// Decode configuration options
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

// now use the config object to tailor the behavior of the hosted login page
...
```

### Using Auth0.js in a hosted login page

When customizing the hosted login page you might want to use [Auth0.js](/libraries/auth0js) along with [Lock](/libraries/lock) (or instead of Lock) to perform authentication tasks, such as building an authorization URL to take the user to a specific connection, or logging in the user with credentials obtained from input elements in the HTML. When doing so, make sure to provide all the parameters provided in `config.internalOptions`.

This example builds a link that takes the user directly to a specific connection, using [Auth0.js v8](/libraries/auth0js):

```html
  [...]
  <a id="direct-link" href="">A direct link to the IdP</a>
  <script src="https://cdn.auth0.com/js/auth0/8.3.0/auth0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.core.min.js"></script>  
  <script src="https://cdn.auth0.com/js/lock/10.11/lock.js"></script>
  <script>
    // standard config decoding as in the default template
    var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
    
    // builds an Auth0.js instance using config options
    var authClient = new auth0.Authentication({
      domain:       config.auth0Domain,
      clientID:     config.clientID,
      _disableDeprecationWarnings: true,
      redirectUri: config.callbackURL,
      responseType: config.extraParams.response_type || 
        config.callbackOnLocationHash ? 'token' : 'code'
    });
    
    // build an authorize URL specifying a connection
    var buildDirectAuthUrl = function(connectionName) {
      // using lodash to extend config.internalOptions with the connectionName
      var options = _.extend({}, config.internalOptions, {
        connection: connectionName
      });
      return authClient.buildAuthorizeUrl(options);
    };
    
    window.getElementById('direct-link').href = buildDirectAuthUrl("my-idp-connection");
``` 

This example shows a very simple username/password form, using [Auth0.js v7](/libraries/auth0js/v7) instead of Lock:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Sign In with Auth0</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <form id="usernamepasswordform">
    <label for="email">Email:</label>
    <input id="email" type="text" />
    <br />
    <label for="password">Password:</label>
    <input id="password" type="password" />
    <br />
    <button>Submit</button>
  </form>  
  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/base64.js"></script>
  <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
  <![endif]-->

  <script src="//cdn.auth0.com/w2/auth0-7.6.1.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"> </script>
  <script>
    // Decode utf8 characters properly
    var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
    
    var auth0Client = new Auth0({
        domain:       config.auth0Domain,
        clientID:     config.clientID,
        callbackURL:  config.callbackURL,
        responseType: config.callbackOnLocationHash ? 'token' : 'code'
    });
    $('#usernamepasswordform').on('submit', function(e) {
      // make sure to provide config.internalOptions
      var options = $.extend({}, config.internalOptions, {
        // assuming a single database-type connection
        connection: 'Username-Password-Authentication',
        username: $('#email').val(),
        password: $('#password').val()
      });
      e.preventDefault();
      auth0Client.login(options);
    });
  </script>
</body>
</html>
``` 
