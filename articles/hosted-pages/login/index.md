---
title: Universal Login
description: How to use Universal Login
toc: true
crews: crew-2
topics:
  - login
  - universal-login
  - auth0js
  - lock
  - hosted-pages
contentType:
  - concept
  - index
useCase: customize-hosted-pages
---
# Universal Login

## About Universal Login

Auth0's Universal Login is the most secure way to authenticate users for your applications. Universal Login centers around your Auth0 login page. The login page appearance and behavior is customizable right from the [Dashboard](${manage_url}). By default, the login page internally uses Auth0's [Lock Widget](/libraries/lock) to authenticate your users, but the code of the login page can be customized to replace the standard Lock widget with the Lock (Passwordless Mode) widget, or an entirely custom UI can be built in its place, using the [Auth0.js SDK](/libraries/auth0js) for authentication.

![Login Page](/media/articles/hosted-pages/hlp-lock.png)

### How does Universal Login work

Auth0 shows the login page whenever something (or someone) triggers an authentication request, such as calling the `/authorize` endpoint (OIDC/OAuth) or sending a SAML login request.

Users will see the login page, typically with either the Lock widget or with your custom UI. Once they log in, they will be redirected back to your application.

However if the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the login page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.

## Why use Universal Login

Why use Universal Login rather than embedding login functionality within your application?

Security is the primary reason, followed by ease of setup. Cross-origin authentication is inherently more dangerous, and more likely to be vulnerable to [man-in-the-middle attacks](/security/common-threats#man-in-the-middle-mitm-attacks). Using Universal Login for the authentication process with Auth0 prevents that from ever being a concern. Additionally, Universal Login is often easier to implement, especially if a custom UI is not required in your login page.

Additionally, Universal Login is the best (and often only) way to implement Single Sign-On and Passwordless connections on native platforms (such as iOS and Android).

### Single Sign-On (SSO)

If you want to use single sign-on, you should use Universal Login rather than an embedded login solution. With Universal Login, when a user logs in via the login page, a cookie will be created and stored. On future calls to the `/authorize` endpoint, the cookie will be checked, and if SSO is achieved, the user will not ever be redirected to the login page. They will see the page only when they need to actually log in. 

This behavior occurs in login pages (that have not been customized to alter behavior) without the need for changes to the page code itself. This is a simple two step process:

1. Enable SSO for the application in the [Dashboard](${manage_url}). Go to the Application's Settings, then scroll down to the **Use Auth0 instead of the IdP to do Single Sign On** setting and toggle it on.
1. Use the [authorize endpoint](/api/authentication#authorization-code-grant) with `?prompt=none` for [silent SSO](/api-auth/tutorials/silent-authentication).

::: note 
For more details about how SSO works, see the [SSO documentation](/sso).
:::

### Passwordless on native platforms

Currently, Universal Login is the **only** way to use [Passwordless](/connections/passwordless) authentication on Native platforms. If your use case is a native iOS or Android application, for example, and you intend to implement Passwordless, you will need to use Universal Login and call the `/authorize` endpoint. You can learn more about this from one of our [quickstarts](/quickstart/native).

## What the Universal Login Page is not intended for

Another important thing to remember is what the Universal Login Page is **not** intended for. The login page presented during Universal Login is intended to be only for signups and authentication. Attempting to host any significant amount of application logic in the login page is not advised.

The login page is truly a single page constructed within the editor, so all custom styling and includes will need to be put into the single editor window. Hosting other files or images along with the login page is not possible, so those will need to be hosted in the application itself, or elsewhere.

## How to customize your login page

### 1. Enable customization on the login page

In the [Dashboard](${manage_url}), you can enable a custom login page by navigating to [Hosted Pages](${manage_url}/#/login_page) and enabling the **Customize Login Page** toggle.

![Login Page](/media/articles/hosted-pages/login.png)

Note that the login page works for basic use cases without being customized. The script is kept up to date automatically. However, when the customization toggle is flipped on, you then become responsible for the updating and maintenance of the script, as it can no longer be automatically updated by Auth0. The templates are provided as guidelines to assist you, but this is worth noting. 

::: note
If, after looking at the page code and customization options, you decide **not** to customize your login page, you should disable the **Customize Login Page** toggle, to allow your page to receive the automatic updates it might need from Auth0.
:::

### 2. Choose a technology

In order to get started customizing the login page, you'll first want to choose the technology that you'd like to use to power it. Click one of the links below to get started.

- [Lock](/hosted-pages/login/lock) - Lock is a pre-built, customizable login widget that will allow your users to quickly and easily login to your application.
- [Lock (Passwordless Mode)](/hosted-pages/login/lock-passwordless) - Lock in Passwordless Mode uses the same Lock interface, but rather than offering identity providers as login options, will simply ask the user to enter an email or SMS number to begin a passwordless authentication transaction.
- [Auth0.js](/hosted-pages/login/auth0js) - Auth0.js is the SDK used for interacting with the Auth0 [authentication API](/api/authentication). Primarily, you would use the SDK if you need to build your own custom login UI, or implement more complex functionality than simply allowing your users to login. 

### 3. Customization

You can customize the login page right from the editor. If you use Lock, you can alter its behavior and appearance with [configuration options](/libraries/lock/configuration). If you are building a custom UI, you can style the login page to your own specifications. Note that the Lock library can also be used for embedded login, so some language in the Lock documentation reflects that use case.

Remember that the login page customizations are per **tenant** rather than per application. All changes to the page's appearance and/or behavior will apply to **all** login actions on your tenant. When necessary, you can provide different pages to different applications via a method discussed later in this document.

### 4. Authorization parameters

Customizations may alter the general user interface look and feel and behavior, but should not try to alter authorization parameters (such as `clientID`, `callbackURL`, `state`). 
Authorization parameters are passed through the `@@config@@` placeholder. Make sure your code uses the parameters provided in the `config` object (including `config.internalOptions`) to initialize Lock or Auth0.js as shown in the default templates.

#### When using Lock v11

```js
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  auth: {
    redirectUrl: config.callbackURL,
    responseType: (config.internalOptions || {}).response_type ||
      (config.callbackOnLocationHash ? 'token' : 'code'),
    params: config.internalOptions
  },
  assetsUrl:  config.assetsUrl,
  [...] 
```

#### When using Auth0.js v9

```js
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

var params = Object.assign({
  domain: config.auth0Domain,
  clientID: config.clientID,
  redirectUri: config.callbackURL,
  responseType: 'code'
}, config.internalOptions);

var webAuth = new auth0.WebAuth(params);
[...]
```

::: panel-warning Customization and deprecation notes
By default, `state` and `_csrf` parameters are included in the `config.internalOptions` object. If this object is removed or altered during customization, your tenant logs will show deprecation notes (`Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application.`). Additionally, after **July 16, 2018**, the application will no longer work until the login page customizations are fixed.
:::

#### Parameters for the /authorize endpoint

If you initiate Universal Login via the `/authorize` endpoint, whether by an SDK like Auth0.js or by calling the endpoint directly, you may also pass some customization parameters to the login page. However, parameters passed to the `/authorize` endpoint must be [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) compliant parameters.

The `config` object contains the set of configuration values that adjusts the behavior of the login page at runtime. You can decode the `config` object in the login page editor so that you can access the config parameters to use in your page:

```js
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
```

The below examples assume that you are using [Auth0.js](/libraries/auth0js) within your application to call the `/authorize` endpoint and show the login page. 

##### Callback URL

Once authentication has been performed using Universal Login, your user will then be redirected to the default callback URL set in your [Application's settings page](${manage_url}/#/applications/${account.clientId}/settings). You can also pass a specific `redirect_uri` option to `authorize()` when calling it from your application, and then access the value you passed to the login page within the login page editor by referring to `config.callbackURL`.

::: note
Make sure that you've added any redirect URLs you're using to the **Allowed Redirect URLs** field on the [Application's settings page](${manage_url}/#/applications/${account.clientId}/settings).
:::

```js
// Using Auth0.js to call the login page from inside your application
webAuth.authorize({
  redirect_uri: "http://example.com/foo"
});
```

## Error handling

If errors occur, the login page will still reroute to the callback URL, but will include the errors (and descriptions, if any) in the query for your application to handle.

## Configure multiple pages by using separate tenants

In some cases, you might have multiple apps and want to configure separate login pages for each. Since the hosted pages are configured in the [Dashboard](${manage_url}) at the tenant level (every app you have set up on a single tenant would use the same login page), you would have to create a new tenant for each application that requires a different hosted page. 

In most cases, it would be preferable to use a single login page, which unifies your brand and the authentication experience for your users across the various areas in which they might encounter it. Additionally, using the same pages, and the same tenant, will allow you to share the resources that would otherwise need to be separated across multiple tenants.

Creating a separate tenant is only really a viable option for an organization that needs two or more separate sets of custom pages, such as for branding reasons. If an example corporation has multiple branded subsidiaries or products, and separate APIs for all of them, it might make sense for them to create several separate Auth0 tenants, each with their own hosted pages set up for that brand or product's specific needs. 

Bear in mind that separating tenants with the goal of having separate hosted pages will also mean that those separate tenants will have two distinct sets of applications, users, settings, and so on as these things are not shared between tenants.

### Creating new tenants

If your use case requires separate sets of custom pages, the following example indicates how you would organize them.

If you have five different applications, with three of them (`app1`, `app2`, `app3`) using the same set of hosted pages and the other two (`app4`, `app5`) each using separate ones, you would do the following:

- If you already have an account, you already have a tenant configured. Configure three applications under this tenant; one to represent each app (`app1`, `app2`, `app3`). You will also configure one login page which these three applications will all share.
- Create a second tenant, configure a new application for `app4`, and configure the login page for this tenant.
- Create a third tenant, configure a new application for `app5`, and configure the login page for this tenant.

::: note
You can [configure different administrators for each tenant](/tutorials/manage-dashboard-admins) if you desire.
:::

#### How to create a new tenant

To create a new tenant go to the [Dashboard](${manage_url}), and using the top right menu, click on the **Create tenant** option.

![Create new tenant](/media/articles/hosted-pages/create-new-tenant.png)

You can also switch between tenants using the same top right menu on the [Dashboard](${manage_url}). 

## Incorrect implementations

The login page should **not** be implemented by calling its URL directly. This circumvents the Universal Login approach, does not allow for SSO (as the  `/authorize` endpoint is not hit), and is **not supported**. Note that this also applies to users who **bookmark the login page directly**. Users should bookmark your application, or your internal login page, but not the actual Universal Login Page.