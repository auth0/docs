---
title: Hosted Login Page
description: Guide on how to use the hosted login page
crews: crew-2
---

# Hosted Login Page

Auth0 shows a login page whenever something (or someone) triggers an authentication request, such as calling the `/authorize` endpoint (OIDC/OAuth) or sending a SAML login request.

You can customize this login page to suit your needs. You can change its colors, display fewer/more fields, and so on.

:::panel-info Connections Using External Identity Providers
If the authentication request includes a specifiction Connection that uses an external identity provider, the hosted login page may not display. Instead, Auth0 directs the user to the identity provider's login page.
:::

## Enable Hosted Login Page

In the [Auth0 Dashboard](${manage_url}), you can enable a custom Hosted Login Page by navigating to [Hosted Pages](${manage_url}/#/login_page) and enabling the **Customize Login Page** toggle.

![Hosted Login Page](/media/articles/hosted-pages/login.png)

### Customize Lock in the Hosted Login Page

The basic login page for your Client will use Lock to provide your users with an attractive interface and smooth authentication process.

If you want to change any of Lock's [configurable options](/libraries/lock/v10/customization), you can do so using the [Hosted Pages](${manage_url}/#/login_page). When you're done, click **Save** to persist your changes.

All changes to Lock's appearance and/or behavior using this page applies to *all* users shown this login page, regardless of Client or Connection.

### The `config` Object

The `config` object contains the set of configuration values that adjusts the hosted login page's behavior at runtime. Many of the values in `config` pass from your app to your hosted login page.

You can examine the contents of the `config` object using the following:

```js
// Decode configuration options
var config = JSON.parse(decodeURIComponent(escape(window.atob('config'))));
```

:::panel-info The Authorize Endpoint
The following examples demonstrating changes to the `config` object assume that you call the [`authorize` endpoint](/api/authentication#authorization-code-grant) and the Hosted Lock page via [Auth0.js v8](/libraries/auth0js/v8).

Please note that you **must** pass the parsed `config` object to the `authorize` endpoint.
:::

#### Customize Text Displayed in Lock on a Hosted Login Page

The `config` object contains a property called `dict` which can be used to set the text displayed in the Lock widget. It is similar to Lock's [`languageDictionary`](/libraries/lock/v10/customization#languagedictionary-object-) property.

To pass custom values to your `languageDictionary` property, call the`authorize` endpoint and include the `lang` parameter.

```
webAuth.authorize({
  lang: {
    signin: {
      title: "Log in to Awesomeness"
    }
  }
});
```

::: panel-info Lock's Default Title
By default, the Lock widget's title is set to be the Client Name (e.g. "Default App"). You can override this by providing a value to the `config.dict.signin.title` property as shown below.

You can also customize the `languageDictionary` definition on the Hosted Login Page and rearrange your `lang`/`dict` object.
:::

You can define your `languageDictionary` object for use in Lock on the Hosted Login Page as follows:

```
languageDictionary = {
  title: config.dict.signin.title
};
```

Check the [English Language Dictionary Specification](https://github.com/auth0/lock/blob/master/src/i18n/en.js) for more information about values you can define here.

#### Pass in Redirect URI

You can pass the `redirect_uri` option to `authorize`, and access it within the Hosted Login Page editor by referring to `config.callbackURL`.

You can pass a value for `redirect_uri` to the `authorize` endpoint and access it in the Hosted Login Page editor using `config.callbackURL`.

<div class="alert alert-info">
Make sure that you've added any redirect URLs you're using to the **Allowed Redirect URLs** field on the [Client's settings page](${manage_url}/#/clients/${account.clientId}/settings).
</div>

```
webAuth.authorize({
  redirect_uri: "http://example.com/foo"
});
```

#### Pass in Custom Parameters

You can pass custom parameters by adding them to the URL you use to call the `authorize` endpoint. This allows you to make further customizations to your Hosted Login page. The only restriction on the parameters you pass is that they cannot share names with any of the standard `authorize` parameters.

For example, suppose you wanted to add a login hint to your page:

```
webAuth.authorize({
  login_hint: "Here is a cool hint"
});
```

You can access that value of `login_hint` using `config.extraParams.login_hint`.

### Use Auth0.js in the Hosted Login Page

You can use the the [Auth0.js library](/libraries/auth0js) along with (or instead of) [Lock](/libraries/lock) to perform authentication tasks such as:

* Building an authorization URL for a specific Connection;
* Logging in the user with credentials obtained from HTML input elements.

To do this, you'll need to provide all the parameters requested in `config.internalOptions`.

#### Example 1

In this example, you'll build an authorization link that takes the user directly to a specific Connection using [Auth0.js v8](/libraries/auth0js).

```html
[...]
<a id="direct-link" href="">A direct link to the IdP</a>
<script src="https://cdn.auth0.com/js/auth0/8.3.0/auth0.min.js"></script>
<script src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.core.min.js"></script>
<script src="https://cdn.auth0.com/js/lock/10.11/lock.js"></script>

<script>
  // standard config decoding as in the default template
  var config = JSON.parse(decodeURIComponent(escape(window.atob('config'))));

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
</script>
```

#### Example 2

In this example, you'll create a username/password form that allows the user to log in and authenticate using [Auth0.js v7](/libraries/auth0js/v7). You'll use this custom form instead of Lock.

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
    var config = JSON.parse(decodeURIComponent(escape(window.atob('config'))));

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
