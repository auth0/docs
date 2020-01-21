---
description: Overview of Universal Login with Auth0
topics:
  - login
  - universal-login
  - password-reset
  - mfa
  - error-pages
  - hosted-pages
contentType: index
toc: true
useCase: customize-hosted-pages
---
# Auth0 Universal Login

Universal Login is Auth0's implementation of the login flow, which is the key feature of an Authorization Server. Each time a user needs to prove their identity, your applications redirect to Universal Login and Auth0 will do what is needed to guarantee the user's identity. 

By choosing Universal Login, you don't have to do any integration work to handle the various flavors of authentication. You can start off using a simple username and password. With a simple toggle switch, you can add new features such as social login and <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>. All of this is dynamic, and adjustable in real-time without requiring application-level changes, since all functionality is driven dynamically by the web pages served by the centralized Authentication Server. Your application will benefit from all improvements Auth0 does in the login flow without you changing a single line of code. 

The login page appearance and behavior is customizable right from the [Dashboard](${manage_url}). The logo and colors of the login pages can be changed, and in more advanced use cases, the code of each page itself can be modified.

For information on the differences between Universal Login and traditional embedded login within your application, see [our comparison guide](/guides/login/universal-vs-embedded).

## Choosing an experience

There are two available experiences in Universal Login. The Classic Universal Login Experience uses JavaScript controls for each page. The New Universal Login experience does not _require_ JavaScript to work, and it offers a simpler and faster experience for end-users.

In the Dashboard, the dialog shown below lets you select which Experience will be used for default, non-customized pages:

![Login Page](/media/articles/universal-login/experience-picker.png)

**Choose an experience to learn more about:**

* [Classic Universal Login Experience](/universal-login/classic)
* [New Universal Login Experience](/universal-login/new) (and its [current limitations](/universal-login/new-experience-limitations))


## Simple Customization

![Customization Settings for Login Page](/media/articles/universal-login/settings.png)

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Universal Login](${manage_url}/#/login_setting) and looking at the Settings tab.

The settings available here are:

* Logo (recommended size: 150 x 150 pixels)
* Primary Color
* Background Color

These settings, once changed, will take effect on all your Universal Login pages if you have not enabled customization of the pages' code. The settings will also work if you have enabled customization but are using the predefined templates and have not changed those options in the code.

If you select the New Universal Login Experience, you can also configure the favicon URL and a custom font URL using [the Branding API](/api/management/v2#!/Branding).

## Implement Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to complete a few other steps:

1. Set up a connection(s) in the [Dashboard](${manage_url}) (Choose **Connections** in the Dashboard's sidebar, then choose a type and pick one to configure, such as a database or a social login provider). 
1. Set up your application in the [Dashboard](${manage_url}/#/applications). 
1. Configure your application's code to call Auth0's [`/authorize`](/api/authentication#login) endpoint in order to trigger Universal Login, and then to deal with the response. You can either do this directly, or use one of our SDKs to make the process easier.

### Using the SPA SDK

If you are already using Auth0's [Single-Page App SDK](/libraries/auth0-spa-js), using the `auth0.loginWithPopup()` or `auth0.loginWithRedirect()` methods will bring you to the authorize endpoint.

```html
<button id="loginPopup">Login with Popup</button>
```

```js
$('#loginPopup').click(async () => {
  await auth0.loginWithPopup();
});
```

### Calling the endpoint manually

You can call the endpoint with any tool that allows you to make HTTP requests.

```text
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE
```

You can (optionally) specify a connection, but you must [specify a state](/protocols/oauth2/oauth-state) and choose whether you want a `code` or `token` response (the choice you make depends on your app type and the flow you are using). Finally, make sure to fill in the domain, client ID, and redirect URI if they haven't been pre-filled.

### Further instructions

<%= include('./_implement_universal_login') %>
