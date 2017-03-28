---
description: How to implement client-side SSO on single page applications.
toc: true
---

# Client-Side SSO on Single Page Applications

Single Page Applications (SPA) are user-friendly apps that load a single HTML page that dynamically updates as the users interacts with the app. If your SPA is associated with other apps or sites that asks for any type of authentication, you can do so by implementing OIDC-compliant Single Sign On, which ensures both security and ease of use.

## What SSO Looks Like

Suppose you have three applications:

* App 1: app1.com (single page app)
* App 2: app2.com (single page app)
* App 3: app3.com (regular web app)

If you've implemented SSO and the user logs in to *any* of the three applications, the user should automatically be logged in to the other applications.

This article shows you how to implement OIDC-compliant Single Sign On via [Silent Authentication](/api-auth/tutorials/silent-authentication) for your Single Page Applications using [this sample](#).

## Implement SSO on Your SPA

:::panel-warning Prerequisites
This article assumes that you have already created an Auth0 Client (with its type set to **Single Page Web Applications**) with the **OIDC Conformant** flag enabled.
:::

### Get Started with the IUDC-Compliance Single Sign On Sample

Please feel free to download the sample and work through the examples on your local environment as you read this doc. The following instructions will help you set up the sample SPA on your local environment.

<div class="alert alert-info">
  <strong>Heads up!</strong> This document assumes that you're using port 3000 when running the sample. If you are using a different port, you'll need to indicate this wherever the sample (or this article) mentions port 3000.
</div>

1. You can clone the necessary files from [Auth0-Samples](#) to your local environment.
2. Add `http://localhost:3000` to the Allowed Callback URLs field of your [Auth0 Client](${manage_url}/#/clients) Settings.
3. Update the `auth0-variables.js` file included in the sample repository with your Auth0 Domain and the ID of the Auth0 Client you're using. These values can be found in the Settings tab of your [Auth0 Client's Dashboard page](${manage_url}/#/clients).
4. Once you've made the configuration changes detailed in steps 2 and 3, start up a web server in the root of the repository at port `3000` .
5. Browse to `http://localhost:3000` to view the client side of the sample.

  ![Home page before logging in](/media/articles/sso/v2/spa/before-login.png)

## Configure Silent Authentication

To bypass displaying the Lock screen when logging in a user (a process known as [*silent authentication*](#silent-authentication)), you must:

* Enable the **Use Auth0 instead of the IdP to do Single Sign On** flag in the [Auth0 Client's settings tab](${manage_url});
* Have a SSO cookie for the tenant's domain (in other words, the user has previously signed in and their saved cookie is still valid);
* Pass the name of the user's Connection to Auth0 for authentication. You can do this by:
  * Including it as a parameter when calling the `signin` function of the [auth0.js library](/libraries/auth0js);
  * Passing the `connection` query string parameter when calling the [Authentication API's `/authorize` endpoint](/api/authentication#login).

## Silent Authentication

Because client applications cannot query Auth0 directly to determine if users are logged in via SSO, the apps must redirect users to Auth0 for SSO authentication. However, because users find redirection disruptive, you should avoid doing so. One way of doing this is via **silent authentication**, which allows you to implement an authentication flow where Auth0 replies only with redirects (and never presents a login page to your users).

### Initiate a Silent Authentication Request

To initiate a silent authentication request, include the `prompt` parameter in your [authorization URL](/api/authentication#implicit-grant) and set it to `none` when redirecting users to the [Authentication API's `/authorize` endpoint](/api/authentication#login).

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
Refer to the [tutorial on using Implict Grants](/api-auth/tutorials/implicit-grant#1-get-the-user-s-authorization) for information on the authorization call's parameters.
:::

For requests received with the parameter `prompt=none`, Auth0 redirects to the `redirect_uri` specified. There are two possible outcomes:

* If the user is already logged in via SSO, Auth0 sends a successful authentication response;
* If the user is not logged in via SSO (and therefore Auth0 cannot silently authenticate the user), Auth0 sends an error response.

When you run the sample app for the first time, you will not have a valid access token. As such, the SSO login process errors when attempting silent authentication.

![Prompt to begin silent authentication](/media/articles/sso/v2/spa/begin-silent-auth.png)

You will then see the Lock screen, which allows you to provide the required credentials.

![Lock screen](/media/articles/sso/v2/spa/lock.png)

Once you've provided correct credentials, the app will indicate if you've successfully acquired a token.

![Home page after logging in](/media/articles/sso/v2/spa/logged-in.png)

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

#### Auth0's Error (Unsuccessful Authentication) Response

If the user is not logged in via SSO, or if the SSO session has expired, Auth0 redirects to the specified `redirect_uri` and responds with an error. Auth0 returns error response parameters in a hash fragment.

The following is a list of possible `ERROR_CODE` values, as defined by the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthError):

* `login_required`: the user isn't logged in to Auth0, so Auth0 was unable to authenticate the user;
* `consent_required`: the user is logged in to Auth0, but hasn't consented to authorizing the client app;
* `interaction_required`: the user is logged in to Auth0, but needs to be redirected elsewhere before Auth0 can complete authentication (for example, if a [redirect rule](/rules/redirect) exists).

If your user triggers any of these errors, your app must redirect the user to the Auth0 login page so that they can authenticate using a URL without the `prompt` parameter.

## Refresh Expired Access Tokens

Access tokens are opaque to clients, which means they are unable to inspect the tokens' contents to determine their expiration dates. There are two ways you can handle this limitation:

1. Read the `expires_in` hash parameter included in Auth0's successful authentication response. This parameter indicates how long the token is valid (in seconds).
2. Ignore expiration dates; in the event that your API rejects a request from the client (for example, it returns an HTTP 401 response), renew the access token.

If the access token expires, you can use silent authentication to retrieve a new token without user interaction if the user's SSO session is still valid. With single page applications, you can use the `renewAuth` method of the [auth0.js library](/libraries/auth0js) to do so without disrupting the UX experience.

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
