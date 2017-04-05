---
description: How to implement client-side SSO on single page applications.
toc: true
---

# Client-Side SSO on Single Page Applications

Single Page Applications (SPA) are user-friendly apps that load a single HTML page. This page then dynamically updates as the users interacts with the app. If your SPA is associated with other apps or sites that asks for authentication, you can implement OIDC-compliant Single Sign On to minimize the number of times the user has to provide their credentials. This ensures both the security of the process and ease of use from the perspective of the user.

## What SSO Looks Like

Suppose you have two applications:

* App 1: app1.com (single page app)
* App 2: app2.com (regular web app)

If you've implemented SSO and the user logs in either of the two applications, the user should automatically be logged in to the other application.

This article shows you how to implement OIDC-compliant Single Sign On via [Silent Authentication](/api-auth/tutorials/silent-authentication) for your Single Page Applications using [this sample](https://github.com/auth0-samples/oidc-sso-sample).

## Configure the OIDC-Compliant Single Sign On Sample

<div class="alert alert-info">
  <strong>Heads up!</strong> This document assumes that you're using port 3000 when running the sample. If you are using a different port, you'll need to adjust for this as you work through the sample (specifically the <i>auth0-variables.js</i>, <i>callback.html</i>, and <i>index.js</i> files) and configure your Auth0 Client.
</div>

If you don't already have an Auth0 Client (of type **Single Page Web Applications**) with the **OIDC Conformant** flag enabled, you'll need to create one.

1. Go to the [Auth0 Dashboard](${manage_url}) and click on [Clients](${manage_url}/#/clients) in the left-hand navigation bar. Click **Create Client**.
2. The **Create Client** window will open, allowing you to enter the name of your new Client. Choose **Single Page Web Applications** as the **Client Type**. When done, click on **Create** to proceed.
3. Navigate to the [Auth0 Client Settings](${manage_url}/#/clients/${account.clientId}/settings) page. Add `http://localhost:3000` and `http://localhost:3000/callback.html` to the Allowed Callback URLs field of your [Auth0 Client Settings](${manage_url}/#/clients/${account.clientId}/settings).
4. Scroll to the bottom of the [Settings](${manage_url}/#/clients/${account.clientId}/settings) page, where you'll find the *Advanced Settings* section. Under the *OAuth* tab, enable the **OIDC Conformant** Flag under the *OAuth* area of *Advanced Settings*.

Now that you've configured your Auth0 Client, you can continue configuring your sample.

1. Update the `auth0-variables.js` file included in the sample repository with your Auth0 Domain and the ID of the Auth0 Client you're using. These values can be found in your [Auth0 Client's Settings page](${manage_url}/#/clients/${account.clientId}/settings).
2. Once you've made the configuration changes detailed in steps 2 and 3, start up a web server in the root of the repository at port `3000` .
3. Browse to `http://localhost:3000` to view the client side of the sample.

  ![Home page before logging in](/media/articles/sso/v2/spa/before-login.png)

Please feel free to [download the sample](https://github.com/auth0-samples/oidc-sso-sample) and work through the examples on your local environment as you read this doc.

## Silent Authentication

Because client applications cannot query Auth0 directly to determine if users are logged in via SSO, the apps must redirect users to Auth0 for SSO authentication. However, because users find redirection disruptive, you should avoid doing so. One way of doing this is via **silent authentication**, which allows you to implement an authentication flow where Auth0 replies only with redirects (and never presents a login page to your users).

### Configure Silent Authentication

To bypass displaying the Lock screen when logging in a user (a process known as [*silent authentication*](#silent-authentication)), you must:

* Enable the **Use Auth0 instead of the IdP to do Single Sign On** flag in the [Auth0 Client's settings page](${manage_url}/#/clients/${account.clientId}/settings);
* Have a SSO cookie for the tenant's domain (in other words, the user has previously signed in and their saved cookie is still valid);
* Pass the name of the user's Connection to Auth0 for authentication. You can do this by:
  * Including it as a parameter when calling the `signin` function of the [auth0.js library](/libraries/auth0js);
  * Passing the `connection` query string parameter when calling the [Authentication API's `/authorize` endpoint](/api/authentication#implicit-grant).

### Initiate a Silent Authentication Request

To initiate a silent authentication request, include the `prompt` parameter in your [authorization URL](/api/authentication#implicit-grant) and set it to `none` when redirecting users to the [Authentication API's `/authorize` endpoint](/api/authentication#implicit-grant).

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

:::panel-info Authorization Call Parameters
Refer to the [tutorial on using the Implict Grant](/api-auth/tutorials/implicit-grant#1-get-the-user-s-authorization) for information on the authorization call's parameters.
:::

For requests received with the parameter `prompt=none`, Auth0 redirects to the `redirect_uri` specified. There are two possible outcomes:

* If the user is already logged in via SSO, Auth0 sends a successful authentication response;
* If the user is not logged in via SSO (and therefore Auth0 cannot silently authenticate the user), Auth0 sends an error response.

Regardless of which outcome occurs, the sample app's [`postMessage` function](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) sends Auth0's response from the iframe back to the main page, allowing it to act based on the response.

When you run the sample app for the first time, you will not have a valid access token. As such, the SSO login process errors when attempting silent authentication.

![Prompt to begin silent authentication](/media/articles/sso/v2/spa/begin-silent-auth.png)

You will then see the Lock screen, which allows you to provide the required credentials.

![Lock screen](/media/articles/sso/v2/spa/lock.png)

Once you've provided correct credentials, the app will indicate if you've successfully acquired a token.

![Home page after logging in](/media/articles/sso/v2/spa/logged-in.png)

If silent authentication succeeds, however, the app stores the token and its expiration date in your local storage.

#### Auth0's Successful Authentication Response

If the user is logged in via SSO already, Auth0 responds as if the user had manually authenticated using the SSO login page. You can extract the `access_token` from the hash fragment of the returned URL:

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

  // Use the access token to make API calls
  // ...
});
```

The response for a call made *without* the `prompt=none` parameter is indistinguishable from the response for a call made *with* the parameter.

You can test this using the sample app. If you're already logged in, you can request an updated token by clicking the **Click here to renew it** link.

At this point, the app silently authenticates you, gets the new token, and updates the page to reflect your new token expiration datetime. Notice that you *did not* see the Lock screen asking for your credentials.

### Further Actions

If your authentication flow triggers an error (indicating unsuccessful authentication) at any point, you'll need to [handle the error(s)](/api-auth/tutorials/silent-authentication#refresh-expired-tokens) before moving on.

If your access tokens expire, you can [refresh them](/api-auth/tutorials/silent-authentication#refresh-expired-tokens).

## Single Logout

If the user logs out of app1.com, then you'll want the user's tokens cleaned up on app2.com and app3.com.

To implement [Single Log Out](/logout), you need to check periodically to see if Auth0 has expired the SSO session. If so, remove the token from the application's local storage to ensure that the local session clears.

```js
setInterval(function() {
  // if the token is not in local storage, there is nothing to check (i.e. the user is already logged out)
  if (!localStorage.getItem('userToken')) return;

  auth0.getSSOData(function (err, data) {
    // if there is still a session, do nothing
    if (err || (data && data.sso)) return;

    // if we get here, it means there is no session on Auth0,
    // then remove the token and redirect to #login
    localStorage.removeItem('userToken');
    window.location.href = '#login'

  });
}, 5000)
```
