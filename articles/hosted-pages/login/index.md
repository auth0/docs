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

Auth0 shows the Hosted Login Page whenever something (or someone) triggers an authentication request, such as calling the `/authorize` endpoint (OIDC/OAuth) or sending a SAML login request. Users will see the Hosted Login Page, typically with either the Lock widget or with your custom UI. Once they login, they will be redirected back to your application.

::: warning
If the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the Hosted Login Page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.
:::

#### SSO

When SSO is desired, a client should use the Hosted Login Page for logins rather than an embedded login solution. When a user logs in via the Hosted Login Page, a cookie will be created and stored. On future calls to the `authorize` endpoint, the cookie will be checked, and if SSO is achieved, the user will not ever be redirected to the Hosted Login Page. They will see the page only when they need to actually login. 

This behavior occurs without modification to the actual Hosted Login Page. The process involves enabling SSO for the client in the [Dashboard](${manage_url}) and then using the `authorize` endpoint with `?prompt=none` for silent SSO.

::: note 
For more information about how SSO works, see the [SSO documentation](/sso).
:::

![Hosted Login Page Preview](/media/articles/hosted-pages/hlp-preview-lock.png)

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

All changes to the page's appearance and/or behavior will apply to **all** users shown this login page, regardless of the client or connection. Remember that the Hosted Login Page customizations are per **tenant** rather than per client. You can provide different pages to different clients via the [methods discussed here](/hosted-pages#customize-your-hosted-page).

#### Query String Parameters

You can also pass [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) compliant parameters into the Hosted Login Page from your application by adding them to the query you use to call the `authorize` endpoint. This allows you to make further customizations to your Hosted Login page from the application. 

If you intend to pass any configuration parameters to the page from your client, you may need to become familiar with the `config` object. The `config` object contains the set of configuration values that adjusts the hosted login page's behavior at runtime. Some of the values in `config` are parameters which are received from your application code to your Hosted Login Page.

You can examine the contents of the `config` object using the following within the hosted login page editor:

```js
// Decode configuration options
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
```

The below examples assume that you are using [Auth0.js](/libraries/auth0js/v8) within your application to call the `authorize` endpoint and show the Hosted Login Page. If not using Auth0.js for this purpose, the important thing to note is that these options can be added to the Query String as needed.

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

## Configure Different Pages per Client

In some cases, you might have multiple apps and want to configure separate login pages for each. Since the hosted pages are configured in the [Dashboard](${manage_url}) at tenant level (every client app you have set up on a single tenant would use the same Hosted Login Page), you would have to create a new tenant for each client that requires a different hosted page.

There are two ways to handle this. The first option is to create different tenants for each client or sets of clients that you need to have separate custom pages for. Alternatively, you can use the [Management API](/api/management/v2) to set up a custom page for the specific client rather than using the editor in the [Dashboard](${manage_url}).

### Creating New Tenants

For example, if you have five different applications, with three of them (`app1`, `app2`, `app3`) using the same set of hosted pages and the other two (`app4`, `app5`) using different ones, you would do the following:

- If you already have an account, you have a tenant configured. Configure three clients under this tenant, one to represent each app (`app1`, `app2`, `app3`), and one hosted login page  which these clients will all share.
- Create a second tenant, configure a new client for `app4`, and configure the hosted login page for this client.
- Create a third tenant, configure a new client for `app5`, and configure the hosted login page for this client.

To create a new tenant go to the [Dashboard](${manage_url}), and using the top right menu, click on the __New Account__ option.

![Create new tenant](/media/articles/hosted-pages/create-new-tenant.png)

You can easily switch between tenants using the top right menu on the [Dashboard](${manage_url}). You can also [configure different administrators for each](/tutorials/manage-dashboard-admins).

## Using the Management API

There is also the option of setting per-client hosted pages using the [Management API](/api/management/v2). To do this, send a `PATCH` request at the `/api/v2/clients/{id}`, and alter the properties `custom_login_page` and `custom_login_page_on`. See the [documentation on patching a client](/api/management/v2#!/Clients/patch_clients_by_id)
) for more details.

The `custom_login_page` will need to be updated to contain the entire HTML contents for the Hosted Login Page specific to that client. The `custom_login_page_on` would just need set to `true`. Once this is done, the specific client will have its own custom login page, whereas any other clients on the same tenant would continue to use the one set up in the [editor in the dashboard](${manage_url}/#/login_page).

