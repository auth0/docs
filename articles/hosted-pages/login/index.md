---
title: Universal Login
description: How to use Universal Login
toc: true
crews: crew-2
---
# Universal Login

## About Universal Login

Auth0's universal login is the most secure way to easily authenticate users for your applications. The login page appearance and behavior is easily customizable right from the [Dashboard](${manage_url}). By default, the login page uses Auth0's [Lock Widget](/libraries/lock/v10) to authenticate your users, but the code of the login page can be customized to replace Lock with the Lock Passwordless widget, or an entirely custom UI can be built in its place, using the [Auth0.js SDK](/libraries/auth0js/v8) for authentication.

If you cannot use universal login, you can embed the Lock widget or a custom login form in your application using [cross-origin authentication](/cross-origin-authentication), but be sure to read about its limitations before choosing to do so.

![Login Page](/media/articles/hosted-pages/hlp-lock.png)

### How Does Universal Login Work

Auth0 shows the login page whenever something (or someone) triggers an authentication request, such as calling the `/authorize` endpoint (OIDC/OAuth) or sending a SAML login request. It can also be accessed via a request, in the following format:

```text
https://${account.namespace}/login?client=${account.clientId}
```

Users will see the login page, typically with either the Lock widget or with your custom UI. Once they login, they will be redirected back to your application.

::: warning
If the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the login page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.
:::

#### Single Sign-On (SSO)

If you want to use single sign on, you should use universal login rather than an embedded login solution. When a user logs in via the login page, a cookie will be created and stored. On future calls to the `authorize` endpoint, the cookie will be checked, and if SSO is achieved, the user will not ever be redirected to the login page. They will see the page only when they need to actually login. 

This behavior occurs without the need for any modification to the login page itself. This is a simple two step process:

1. Enable SSO for the client in the [Dashboard](${manage_url}) (Go to the Client's Settings, then scroll down to the **Use Auth0 instead of the IdP to do Single Sign On** setting and toggle it on.
1. Use the [authorize endpoint](/api/authentication#authorization-code-grant) with `?prompt=none` for [silent SSO](/api-auth/tutorials/silent-authentication).

::: note 
For more details about how SSO works, see the [SSO documentation](/sso).
:::

### Why Use Universal Login

Why use universal login rather than embedding your login functionality within your application?

Security is the primary reason, followed by ease of setup. Cross-origin authentication is inherently more dangerous, and more likely to be vulnerable to [man-in-the-middle attacks](/security/common-threats#man-in-the-middle-mitm-attacks). Using universal login for the authentication process with Auth0 prevents that from ever being a concern. Additionally, universal login is very easy to implement, especially if a custom UI is not required in your login page.

### What Universal Login is Not Intended For

An important thing to remember is that the login page is intended to be only for signups and authentication. Attempting to host any significant amount of application logic in the login page is not advised.

The login page is truly a single page constructed within the editor, so all custom styling and includes will need to be put into the single editor window. Hosting other files or images along with the login page is not possible, so those will need to be hosted in the application itself, or elsewhere.

### Passwordless on Native Platforms

Currently, universal login is the **only** way to use [Passwordless](/connections/passwordless) authentication on Native platforms. So if your use case is a native iOS or Android application, for example, and you intend to implement Passwordless, you will need to use the universal login.

## How to Customize Your Login Page

### 1. Enable Customization on the Login Page

In the [Dashboard](${manage_url}), you can enable a custom login page by navigating to [Hosted Pages](${manage_url}/#/login_page) and enabling the **Customize Login Page** toggle.

![Login Page](/media/articles/hosted-pages/login.png)

### 2. Choose a Technology

In order to get started customizing the login page, you'll first want to choose the technology that you'd like to use to power it. Click one of the links below to get started.

- [Lock](/hosted-pages/login/lock/v10) - Lock 10 is a pre-built, customizable login widget that will allow your users to quickly and easily login to your application.
- [Auth0.js v8](/hosted-pages/login/auth0js/v8) - Auth0.js v8 is the SDK used for interacting with the Auth0 [authentication API](/api/authentication). Primarily, you would use the SDK if you need to build your own custom login UI, or implement more complex functionality than simply allowing your users to login. 

::: note
Note that Lock 11 and Auth0.js v9 were specifically designed to work with embedded authentication in applications, not with universal login. For login page use, Lock 10 or Auth0.js v8 should be implemented.
:::

### 3. Customization

You can customize the login page at will right from the editor. If you use Lock, you can alter its behavior and appearance with [configuration options](/libraries/lock/v10/customization). If you are building a custom UI, you can style the login page to your own specifications.

All changes to the page's appearance and/or behavior will apply to **all** users shown this login page, regardless of the client or connection. Remember that the login page customizations are per **tenant** rather than per client. When necessary, you can provide different pages to different clients via a method discussed later in this document.

#### Query String Parameters

You can add query string parameters to the URL you are using to initiate universal login from your application, and use those items to customize the login page's behavior or appearance.

For example, you can pass the parameter `title` in your request as a query parameter, and then access it in your login page's code by using `config.extraParams.title`.

The `config` object contains the set of configuration values that adjusts the behavior of the login page at runtime. Set the `config` object up in the login page editor so that you can access the config parameters to use in your page:

```js
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
```

After which you can set the value of your Lock Widget's title (or use the value to alter the title of your own custom coded UI):

```js
if (config.extraParams.title) {
  languageDictionary = { title: config.extraParams.title };
} 
```

#### Parameters for the Authorize Endpoint

If you initiate universal login via the `authorize` endpoint, whether by an SDK like auth0.js or by calling the endpoint directly, you may also pass some customization parameters to the login page. However, parameters passed to the `authorize` endpoint must be [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) compliant parameters.

The `config` object contains the set of configuration values that adjusts the behavior of the login page at runtime. Set the `config` object up in the login page editor so that you can access the config parameters to use in your page:

```js
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
```

The below examples assume that you are using [Auth0.js](/libraries/auth0js/v8) within your application to call the `authorize` endpoint and show the login page. 

##### Login Hint

For example, suppose you wanted to add a login hint to your page; it can be done simply by passing the `login_hint` parameter to your `authorize` call:

```js
webAuth.authorize({
  login_hint: "Here is a cool login hint"
});
```

You will then be able to access the value of `login_hint` within the login page editor by using `config.extraParams.login_hint`.

##### Callback URL

Once authentication has been performed using universal login, your user will then be redirected to the default callback URL set in your [Client's settings page](${manage_url}/#/clients/${account.clientId}/settings). You can also pass a specific `redirect_uri` option to `authorize`, and access it within the login page editor by referring to `config.callbackURL`.

::: note
Make sure that you've added any redirect URLs you're using to the **Allowed Redirect URLs** field on the [Client's settings page](${manage_url}/#/clients/${account.clientId}/settings).
:::

```js
webAuth.authorize({
  redirect_uri: "http://example.com/foo"
});
```

## Configure Multiple Pages by Using Separate Tenants

In some cases, you might have multiple apps and want to configure separate login pages for each. Since the hosted pages are configured in the [Dashboard](${manage_url}) at the tenant level (every client app you have set up on a single tenant would use the same login page), you would have to create a new tenant for each client that requires a different hosted page. 

In most cases, it would be preferable to use a single login page, which unifies your brand and the authentication experience for your users across the various areas in which they might encounter it. Additionally, using the same pages, and the same tenant, will allow you to share the resources that would otherwise need to be separated across multiple tenants.

Creating a separate tenant is only really a viable option for an organization that needs two or more separate sets of custom pages, such as for branding reasons. If an example corporation has multiple branded subsidiaries or products, and separate APIs for all of them, it might make sense for them to create several separate Auth0 tenants, each with their own hosted pages set up for that brand or product's specific needs. 

Bear in mind that separating tenants with the goal of having separate hosted pages will also mean that those separate tenants will have two distinct sets of clients, users, settings, and so on as these things are not shared between tenants.

### Creating New Tenants

If your use case requires separate sets of custom pages, let's see how you would go about creating them.

If you have five different applications, with three of them (`app1`, `app2`, `app3`) using the same set of hosted pages and the other two (`app4`, `app5`) using different ones, you would do the following:

- If you already have an account, you have a tenant configured. Configure three clients under this tenant, one to represent each app (`app1`, `app2`, `app3`), and one login page  which these clients will all share.
- Create a second tenant, configure a new client for `app4`, and configure the login page for this client.
- Create a third tenant, configure a new client for `app5`, and configure the login page for this client.

To create a new tenant go to the [Dashboard](${manage_url}), and using the top right menu, click on the __New Account__ option.

![Create new tenant](/media/articles/hosted-pages/create-new-tenant.png)

You can easily switch between tenants using the top right menu on the [Dashboard](${manage_url}). You can also [configure different administrators for each](/tutorials/manage-dashboard-admins).
