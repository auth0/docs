---
description: Tutorial on implementing client-side SSO on single-page applications.
toc: true
topics:
  - sso
  - spa
contentType:
  - how-to
  - concept
useCase:
  - integrate-saas-sso
---
# Client-Side SSO on Single Page Applications

Single Page Applications (SPA) are user-friendly apps that load a single HTML page. This page then dynamically updates as the users interacts with the app.

If your SPA is associated with other apps or sites that asks for authentication, you can implement OIDC-compliant Single Sign On to minimize the number of times the user has to provide their credentials.

SSO ensures both the security of the process and ease of use from the perspective of the user.

## What SSO looks like

Suppose you have two applications:

* App 1: `app1.com` (single page app)
* App 2: `app2.com` (regular web app)

If you've implemented SSO and the user logs in either of the two applications, the user should automatically be logged in to the other application.

This article shows you how to implement OIDC-compliant Single Sign On via [Silent Authentication](/api-auth/tutorials/silent-authentication) for your Single Page Applications using [this sample](https://github.com/auth0-samples/oidc-sso-sample).

## Running the sample application

This document assumes that you're using port *3000* when running the sample.

If you are using a different port, you'll need to adjust for this as you work through the sample (specifically the **auth0-variables.js**, **callback.html**, and **index.js** files) and configure your Auth0 application.

## Configure the sample application

If you don't already have an Auth0 application (of type **Single Page Web Applications**) with the **OIDC Conformant** flag enabled, you'll need to create one:

1. Go to the [Auth0 Dashboard](${manage_url}) and click on [Applications](${manage_url}/#/applications) in the left-hand navigation bar. Click **Create Application**.

2. The **Create Application** window will open, allowing you to enter the name of your new Application. Choose **Single Page Web Applications** as the **Application Type**. When done, click on **Create** to proceed.

3. Navigate to the [Auth0 application Settings](${manage_url}/#/Applications/${account.clientId}/settings) 
page. Add **http://localhost:3000** and **http://localhost:3000/callback.html** to the Allowed Callback URLs field of your [Auth0 application Settings](${manage_url}/#/Applications/${account.clientId}/settings).

4. Scroll to the bottom of the [Settings](${manage_url}/#/Applications/${account.clientId}/settings) page, where you'll find the **Advanced Settings** section. Under the **OAuth** tab, enable the **OIDC Conformant** Flag under the **OAuth** area of **Advanced Settings**.

Now that you've configured your Auth0 application, you can continue configuring your sample.

1. Update the **auth0-variables.js** file included in the sample repository with your Auth0 Domain and the ID of the Auth0 application you're using. These values can be found in your [Auth0 application's Settings page](${manage_url}/#/Applications/${account.clientId}/settings).

2. Once you've made the configuration changes detailed in steps 2 and 3, start up a web server in the root of the repository at port 3000.

3. Browse to **http://localhost:3000** to view the client side of the sample.

  ![Home page before logging in](/media/articles/sso/v2/spa/before-login.png)

## Silent authentication

Because client applications cannot query Auth0 directly to determine if users are logged in via SSO, the apps must redirect users to Auth0 for SSO authentication.

However, you should avoid redirection if at all possible because users find this disruptive.

One way to avoid redirection while still determining a user's SSO status is via [Silent Authentication](/api-auth/tutorials/silent-authentication).

Silent Authentication allows you to implement an authentication flow where Auth0 replies only with redirects and never presents a login page to your users.

### Configure silent authentication

To bypass displaying the Lock screen when logging in a user, you must:

* [configure SSO](/sso/current/setup)

* Have a SSO cookie for the tenant's domain (in other words, the user has previously signed in and their saved cookie is still valid);

* Pass the name of the user's Connection to Auth0 for authentication. You can do this by:

  * Including it as a parameter when calling the **signin** function of the [auth0.js library](/libraries/auth0js);

  * Passing the **connection** query string parameter when calling the [Authentication API's **/authorize** endpoint](/api/authentication#implicit-grant).

### Silent Authentication using the API

To initiate a silent authentication request, include the **prompt** parameter in your [authorization URL](/api/authentication#implicit-grant) and set it to **none** when redirecting users to the [Authentication API's **/authorize** endpoint](/api/authentication#implicit-grant).

```text
https://${account.namespace}/authorize?
    scope=YOUR_SCOPE&
    response_type=YOUR_RESPONSE_TYPE&
    client_id=4rO4qfTUOr1QafUxUGtGRYPqZfPVpuFa&
    redirect_uri=https://YOUR_APP/callback&
    nonce=YOUR_CRYPTOGRAPHIC_NONCE&
    state=YOUR_OPAQUE_VALUE&
    connection=CONNECTION_NAME&
    prompt=none
```

:::note
For details on the request parameters, refer to our tutorial, [Add Login Using the Single-Page Login Flow: Authorize the user](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow#authorize-the-user).
:::

For requests received with the parameter **prompt=none**, Auth0 redirects to the **redirect_uri** specified. There are two possible outcomes:

* If the user is already logged in via SSO, Auth0 sends a successful authentication response;

* If the user is not logged in via SSO (and therefore Auth0 cannot silently authenticate the user), Auth0 sends an error response.

Regardless of which outcome occurs, the sample app's [**postMessage()** function](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) sends Auth0's response from the iframe back to the main page, allowing it to act based on the response.

### Silent authentication using the auth0.js library

Users of the **Auth0.js** library have access to [the **checkSession()** method](/libraries/auth0js#using-checksession-to-acquire-new-tokens), which attempts to get a new token from Auth0 by using silent authentication or invokes callback with an error if the user does not have an active SSO session at your Auth0 domain.

This method can be used to detect a locally unauthenticated user's SSO session status, or to renew an authenticated user's Access Token. The actual redirect to **/authorize** happens inside an iframe, so it will not reload your application or redirect away from it.

```js
auth0.checkSession({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order'
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

### Polling with checkSession()

<%= include('../../_includes/_checksession_polling') %>

## Run the sample application

When you run the sample app for the first time, you will not have a valid Access Token. As such, the SSO login process errors when attempting silent authentication.

![Prompt to begin silent authentication](/media/articles/sso/v2/spa/begin-silent-auth.png)

You will then see the Lock screen, which allows you to provide the required credentials.

![Lock screen](/media/articles/sso/v2/spa/lock.png)

Once you've provided correct credentials, the app will indicate if you've successfully acquired a token.

![Home page after logging in](/media/articles/sso/v2/spa/logged-in.png)

If silent authentication succeeds, however, the app stores the token and its expiration date in your local storage.

## Successful authentication response

If the user is logged in via SSO already, Auth0 responds as if the user had manually authenticated using the SSO login page. You can extract the **access_token** from the hash fragment of the returned URL:

```js
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}

function getIdToken() {
  return getParameterByName('id_token');
}

$(function () {
  var access_token = getAccessToken();

  // Optional: an id_token will be returned by Auth0
  // if your response_type argument contained id_token
  var id_token = getIdToken();

  // Use the Access Token to make API calls
  // ...
});
```

The response for a call made without the **prompt=none** parameter is indistinguishable from the response for a call made with the parameter.

You can test this using the sample app. If you're already logged in, you can request an updated token by clicking the **Click here to renew it** link.

At this point, the app silently authenticates you, gets the new token, and updates the page to reflect your new token expiration datetime. Notice that you did not see the Lock screen asking for your credentials.

## Further actions

If your authentication flow triggers an error (indicating unsuccessful authentication) at any point, you'll need to [handle the error(s)](/api-auth/tutorials/silent-authentication#refresh-expired-tokens) before moving on.

If your Access Tokens expire, you can use [Silent Authentication](/api-auth/tutorials/silent-authentication#refresh-expired-tokens) to get a new one.

## Single log out

If the user logs out of **app1.com**, then you'll want the user's tokens cleaned up on **app2.com** and **app3.com**.

To implement [single log out](/logout), you need to check periodically to see if Auth0 has expired the SSO session. If so, remove the token from the application's local storage to ensure that the local session clears.

```js
// check every 15 minutes if the SSO session is still active

setInterval(function() {
  // if the token is not in local storage, there is nothing to check (that is, the user is already logged out)
  if (!localStorage.getItem('userToken')) return;

  auth0.checkSession(function (err, data) {
    if (err) { 
      // if we get here, it means there is no session on Auth0,
      // then remove the token and redirect to #login
      localStorage.removeItem('userToken');
      window.location.href = '#login';
    }
  });
}, 900000)
```
