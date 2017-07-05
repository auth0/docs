---
title: Hosted Login Page
description: Guide on how to use the hosted login page
toc: true
crews: crew-2
---

# Hosted Login Page

Auth0 shows a login page whenever something (or someone) triggers an authentication request, such as calling the `/authorize` endpoint (OIDC/OAuth) or sending a SAML login request.

You can customize this login page to suit your needs. You can change its colors, display fewer/more fields, and so on.

::: note
If the authentication request includes a Connection that uses an external identity provider, the hosted login page may not display. Instead, Auth0 directs the user to the identity provider's login page.
:::

## Enable Hosted Login Page

In the [Auth0 Dashboard](${manage_url}), you can enable a custom Hosted Login Page by navigating to [Hosted Pages](${manage_url}/#/login_page) and enabling the **Customize Login Page** toggle.

![Hosted Login Page](/media/articles/hosted-pages/login.png)

## Customize Lock in the Hosted Login Page

The basic login page for your Client will use Lock to provide your users with an attractive interface and smooth authentication process.

If you want to change any of Lock's [configurable options](/libraries/lock/v10/customization), you can do so using the [Hosted Pages](${manage_url}/#/login_page). When you're done, click **Save** to persist your changes.

All changes to Lock's appearance and/or behavior using this page applies to *all* users shown this login page, regardless of Client or Connection.

## The `config` Object

The `config` object contains the set of configuration values that adjusts the hosted login page's behavior at runtime. Many of the values in `config` pass from your app to your hosted login page.

You can examine the contents of the `config` object using the following:

```js
// Decode configuration options
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

```

:::panel The Authorize Endpoint
The following examples demonstrating changes to the `config` object assume that you call the [`authorize` endpoint](/api/authentication#authorization-code-grant) and the Hosted Lock page via [Auth0.js v8](/libraries/auth0js/v8).

Please note that you **must** pass the parsed `config` object to the `authorize` endpoint.
:::

### Customize Text

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

::: panel Lock's Default Title
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

### Set the Callback URL

You can pass the `redirect_uri` option to `authorize`, and access it within the Hosted Login Page editor by referring to `config.callbackURL`.

You can pass a value for `redirect_uri` to the `authorize` endpoint and access it in the Hosted Login Page editor using `config.callbackURL`.

::: note
Make sure that you've added any redirect URLs you're using to the **Allowed Redirect URLs** field on the <a href="${manage_url}/#/clients/${account.clientId}/settings">Client's settings page</a>.
:::

```
webAuth.authorize({
  redirect_uri: "http://example.com/foo"
});
```

### Pass in Custom Parameters

You can pass custom parameters by adding them to the URL you use to call the `authorize` endpoint. This allows you to make further customizations to your Hosted Login page. The only restriction on the parameters you pass is that they cannot share names with any of the standard `authorize` parameters.

For example, suppose you wanted to add a login hint to your page:

```
webAuth.authorize({
  login_hint: "Here is a cool hint"
});
```

You can access that value of `login_hint` using `config.extraParams.login_hint`.

## Use Auth0.js in the Hosted Login Page

Within the Hosted Login page, you can use the the [Auth0.js library](/libraries/auth0js), instead of [Lock](/libraries/lock), to perform authentication using a custom UI. You can also use Auth0.js _in addition_ to Lock, for authentication or user management tasks.

Read more about either of them in their documentation (linked above) or see the [Using Auth0.js in the Hosted Login Page](/hosted-pages/hosted-login-auth0js) documentation for examples of implementing Auth0.js in the Hosted Login page.

## Configure Different Pages per Client

In some cases, you might have multiple apps and want to configure separate login pages for each. Since the hosted pages are configured at tenant level, you would have to create a new tenant for each client that requires a different hosted page.

For example, if you have five different applications, with three of them (`app1`, `app2`, `app3`) using the same hosted pages and the other two (`app4`, `app5`) using different ones, you would do the following:

- If you already have an account, you have a tenant configured. Configure three clients under this tenant, one to represent each app (`app1`, `app2`, `app3`), and one hosted login page  which these clients will use.
- Create a second tenant, configure a new client for `app4`, and configure the hosted login page for this client.
- Create a third tenant, configure a new client for `app5`, and configure the hosted login page for this client.

To create a new tenant go to the [dashboard](${manage_url}), and using the top right menu, click on the __New Account__ option.

![Create new tenant](/media/articles/hosted-pages/create-new-tenant.png)

You can easily switch between tenants using the top right menu on the [dashboard](${manage_url}). You can also [configure different administrators for each](/tutorials/manage-dashboard-admins).
