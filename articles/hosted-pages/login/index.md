---
title: Hosted Login Page
description: How to use the Hosted Login Page
toc: true
crews: crew-2
---
# Hosted Login Page

## About the Hosted Login Page

Auth0's Hosted Login Page is the most secure way to easily authenticate users for your applications. The Hosted Login Page is easily customizable right from the [Dashboard](${manage_url}). By default, the Hosted Login Page uses Auth0's [Lock Widget](/libraries/lock) to authenticate your users, but the code of the Hosted Login Page can be customized to replace Lock with the Lock Passwordless widget, or an entirely custom UI can be built in its place, using the [Auth0.js SDK](/libraries/auth0js) for authentication.

![Hosted Login Page](/media/articles/hosted-pages/hlp-lock.png)

### How Does the Hosted Login Page Work

Auth0 shows the Hosted Login Page whenever something (or someone) triggers an authentication request, such as calling the `/authorize` endpoint (OIDC/OAuth) or sending a SAML login request. It can also be accessed via a request, in the following format:

```text
https://${account.namespace}/login?client=${account.clientId}
```

Users will see the Hosted Login Page, typically with either the Lock widget or with your custom UI. Once they login, they will be redirected back to your application.

::: warning
If the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the Hosted Login Page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.
:::

#### Single Sign-On (SSO)

If you want to use single sign on, you should use the Hosted Login Page for logins rather than an embedded login solution. When a user logs in via the Hosted Login Page, a cookie will be created and stored. On future calls to the `authorize` endpoint, the cookie will be checked, and if SSO is achieved, the user will not ever be redirected to the Hosted Login Page. They will see the page only when they need to actually login. 

This behavior occurs without modification to the actual Hosted Login Page. This is a simple two step process:

1. Enable SSO for the client in the [Dashboard](${manage_url}) (Go to the Client's Settings, then scroll down to the **Use Auth0 instead of the IdP to do Single Sign On** setting and toggle it on.
1. Use the [authorize endpoint](/api/authentication#authorization-code-grant) with `?prompt=none` for [silent SSO](/api-auth/tutorials/silent-authentication).

::: note 
For more details about how SSO works, see the [SSO documentation](/sso).
:::

### Why Use the Hosted Login Page

Why use the Hosted Login Page rather than embedding your login functionality within your application?

Security is the primary reason, followed by ease of setup. Cross-origin authentication is inherently more dangerous, and more likely to be vulnerable to [man-in-the-middle attacks](/security/common-threats#man-in-the-middle-mitm-attacks). Using the Hosted Login Page for the authentication process with Auth0 prevents that from ever being a concern. Additionally, the Hosted Login Page is very easy to implement, especially if a custom UI is not required.

### What the Hosted Login Page is Not Intended For

An important thing to remember is that the Hosted Login Page is intended to be only for signups and authentication. Attempting to host any significant amount of application logic in the Hosted Login Page is not advised.

The Hosted Login Page is truly a single page constructed within the editor, so all custom styling and includes will need to be put into the single editor window. Hosting other files or images along with the Hosted Login Page is not possible, so those will need to be hosted in the application itself, or elsewhere.

### Passwordless on Native Platforms

Currently, the Hosted Login Page is the **only** way to use [Passwordless](/connections/passwordless) authentication on Native platforms. So if your use case is a native iOS or Android application, for example, and you intend to implement Passwordless, you will need to use the Hosted Login Page.

## How to Use the Hosted Login Page

### 1. Enable the Hosted Login Page

In the [Dashboard](${manage_url}), you can enable a custom Hosted Login Page by navigating to [Hosted Pages](${manage_url}/#/login_page) and enabling the **Customize Login Page** toggle.

![Hosted Login Page](/media/articles/hosted-pages/login.png)

### 2. Choose a Technology

In order to get started using the Hosted Login Page, you'll first want to choose the technology that you'd like to use to power it. Click one of the links below to get started.

- [Lock](/hosted-pages/login/lock) - Lock is the simplest way to use the HLP. Lock is a pre-built, customizable login widget that will allow your users to quickly and easily login to your application.
- [Lock Passwordless](/hosted-pages/login/lock-passwordless) - Lock Passwordless uses the same style of interface as Lock, but rather than offering identity providers as login options, will simply ask the user to enter an email or SMS number to begin a Passwordless authentication transaction.
- [Auth0.js v8](/hosted-pages/login/auth0js/v8) - Auth0.js is the SDK used for interacting with the Auth0 [authentication API](/api/authentication). Primarily, you would use the SDK if you need to build your own custom login UI, or implement more complex functionality than simply allowing your users to login. Auth0.js v8 is the most up to date version of that SDK, and is fully capable of [OIDC compliant transactions](/api-auth/intro).

### 3. Customization

You can customize the Hosted Login Page at will right from the editor. If you use Lock, you can alter its behavior and appearance with [customization options](/libraries/lock/v10/customization). If you are building a custom UI, you can style the Hosted Login Page to your own specifications.

All changes to the page's appearance and/or behavior will apply to **all** users shown this login page, regardless of the client or connection. Remember that the Hosted Login Page customizations are per **domain** rather than per client. When necessary, you can provide different pages to different clients via a method discussed later in this document.

#### Query String Parameters

You can add query string parameters to the URL you are using to call your Hosted Login Page from your application, and use those items to customize its behavior or appearance.

For example, you can pass the parameter `title` in your request as a query parameter, and then access it in your Hosted Login Page Code by using `config.extraParams.title`.

The `config` object contains the set of configuration values that adjusts the behavior of the Hosted Login Page at runtime. Set the `config` object up in the Hosted Login Page editor so that you can access the config parameters to use in your page:

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

If you choose to initiate the Hosted Login Page via the `authorize` endpoint, whether by an SDK like auth0.js or by calling the endpoint directly, you may also pass some customization parameters to the Hosted Login Page. However, parameters passed to the `authorize` endpoint must be [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) compliant parameters.

The `config` object contains the set of configuration values that adjusts the behavior of the Hosted Login Page at runtime. Set the `config` object up in the Hosted Login Page editor so that you can access the config parameters to use in your page:

```js
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
```

The below examples assume that you are using [Auth0.js](/libraries/auth0js/v8) within your application to call the `authorize` endpoint and show the Hosted Login Page. 

##### Login Hint

For example, suppose you wanted to add a login hint to your page; it can be done simply by passing the `login_hint` parameter to your `authorize` call:

```js
webAuth.authorize({
  login_hint: "Here is a cool login hint"
});
```

You will then be able to access the value of `login_hint` within the Hosted Login Page editor by using `config.extraParams.login_hint`.

##### Callback URL

Once authentication has been performed using the Hosted Login Page, your user will then be redirected to the default callback URL set in your [Client's settings page](${manage_url}/#/clients/${account.clientId}/settings). You can also pass a specific `redirect_uri` option to `authorize`, and access it within the Hosted Login Page editor by referring to `config.callbackURL`.

::: note
Make sure that you've added any redirect URLs you're using to the **Allowed Redirect URLs** field on the [Client's settings page](${manage_url}/#/clients/${account.clientId}/settings).
:::

```js
webAuth.authorize({
  redirect_uri: "http://example.com/foo"
});
```

## Configure Multiple Pages by Using Separate Domains

In some cases, you might have multiple apps and want to configure separate login pages for each. Since the hosted pages are configured in the [Dashboard](${manage_url}) at the domain level (every client app you have set up on a single domain would use the same Hosted Login Page), you would have to create a new domain for each client that requires a different hosted page. 

In most cases, it would be preferable to use a single login page, which unifies your brand and the authentication experience for your users across the various areas in which they might encounter it. Additionally, using the same pages, and the same domain, will allow you to share the resources that would otherwise need to be separated across multiple domains.

Creating a separate domain is only really a viable option for an organization that needs two or more separate sets of custom pages, such as for branding reasons. If an example corporation has multiple branded subsidiaries or products, and separate APIs for all of them, it might make sense for them to create several separate Auth0 domains, each with their own hosted pages set up for that brand or product's specific needs. 

Bear in mind that separating domains with the goal of having separate hosted pages will also mean that those separate domains will have two distinct sets of clients, users, settings, etc. as these things are not shared between domains.

### Creating New Domains

If your use case requires separate sets of custom pages, let's see how you would go about creating them.

If you have five different applications, with three of them (`app1`, `app2`, `app3`) using the same set of hosted pages and the other two (`app4`, `app5`) using different ones, you would do the following:

- If you already have an account, you have a domain configured. Configure three clients under this domain, one to represent each app (`app1`, `app2`, `app3`), and one hosted login page  which these clients will all share.
- Create a second domain, configure a new client for `app4`, and configure the hosted login page for this client.
- Create a third domain, configure a new client for `app5`, and configure the hosted login page for this client.

To create a new domain go to the [Dashboard](${manage_url}), and using the top right menu, click on the __New Account__ option.

![Create new domain](/media/articles/hosted-pages/create-new-tenant.png)

You can easily switch between domains using the top right menu on the [Dashboard](${manage_url}). You can also [configure different administrators for each](/tutorials/manage-dashboard-admins).
