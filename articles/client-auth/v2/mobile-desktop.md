---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application.
toc: true
---

# Authentication for Mobile & Desktop Apps

You can authenticate users of your mobile/desktop applications by:

* Using the [Lock](/libraries/lock) client libraries;
* Calling the Auth0 OAuth 2.0 endpoints.

This article will cover how to call the Auth0 OAuch 2.0 endpoints using the [Authorization Code Grant Flow using Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce).

## Overview

Auth0 exposes OAuth 2.0 endpoints that you can use to authenticate users. You can call these endpoints through an embedded browser in your **native** application. After authentication completes, you can return an `id_token` that contains the user's profile information.

Please note that, instead of following this tutorial, you can use any of Auth0's client libraries. These encapsulate all the logic required and make it easier for your to implement authentication. Please refer to our [Native Quickstarts](/quickstart/native) to get started with any of these.

## Register Your Client

If you haven't already created a new [Client](/clients) in Auth0, you'll need to do so before implementing your authentication flow. The Auth0 Client maps to your application and allows your application to use Auth0 for authentication purposes.

### Create a New Client

Go to the [Auth0 Dashboard](${manage_url}) and click on [Clients](${manage_url}/#/clients) in the left-hand navigation bar. Click **Create Client**.

The **Create Client** window will open, allowing you to enter the name of your new Client. Choose **Native** as the **Client Type**. When done, click on **Create** to proceed.

::: panel-danger Warning
The Authorization Code flow with PKCE can only be used for Native Clients.
:::

![](/media/articles/client-auth/mobile-desktop/create-client.png)

Once Auth0 creates the Client, navigate to the Client's **Settings** tab to add the following to the **Allowed Callback URLs** field: `https://${account.namespace}/mobile`

Scroll to the bottom of the page and click **Save**.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)

## Implement Authentication

To implement the Authorization Code Grant Flow using Proof Key for Code Exchange, you will need to execute the following steps:

1. Create a random key (called the **code verifier**) and its transformed value (called the **code challenge**)
2. Obtain the user's authorization
3. Obtain an access token
4. Call the API using the new access token

Step 1: Create a Random Key and the Code Challenge

You will need to generate and store a `code_verifier`, which is a cryptographically random key that, along with its transformed value (called the `code_challenge`), will be sent to Auth0 for an `authorization_code`.

Step 2: Authorize the User

Once you've created the `code_verifier` and the `code_challenge` that you include in the authorization request, you'll need to obtain the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions.

To authorize the user, your application must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) (which includes the `code_challenge` you generated in the previous step, as well as the method you used to generate the `code_challenge`). Your URL should following this format:

```text
https://${account.namespace}/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.callback}
```

Request Parameters:

* `audience`: The unique identifier of the target API. Use the __Identifier__ value in [API Settings](${manage_url}/#/apis). If you don't see this page in the Dashboard, enable the __Enable APIs Section__ toggle at [Account Settings > Advanced](${manage_url}/#/account/advanced).
* `scope`: The [scopes](/scopes) for which you want to request authorization. Each scope must be separated from the others using a whitespace character. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) for users (such as `profile` and `email`), custom claims conforming to a namespaced format (see note below on Arbitrary Claims), and any scopes supported by the target API. Include `offline_access` to get a refresh token (make sure that you've enabled __Allow Offline Access__ in your [API Settings](${manage_url}/#/apis)).
* `response_type`: The credential type you want Auth0 to return (code or token). For authentication using PKCE, this value must be set to `code`.
* `client_id`: Your Client's ID. You can find this value in your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
* `redirect_uri`: The URL to which Auth0 will redirect the browser after user authorization. This URL must be specified as a valid callback URL in your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
* `code_challenge`: the generated challenge associated with the `code_verifier`.
* `code_challenge_method`: the method used to generate the challenge. The PKCE spec defines two methods (`S256` and `plain`), but Auth0 only supports `S256`.

::: panel-info Arbitrary Claims
To improve Client application compatibility, Auth0 returns profile information using an [OIDC-defined structured claim format](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that arbitrary claims to ID or access tokens must conform to a namespaced format to avoid collisions with standard OIDC claims. For example, if your namespace is `https://foo.com/` and you want to add an arbitrary claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, not `myclaim`.
:::

As an example, your HTML snippet for your authorization URL might look as follows:

```html
<a href="https://${account.namespace}/authorize?
  audience=appointments:api&
  scope=appointments%20contacts&
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=com.myclientapp://myclientapp.com/callback">
  Sign In
</a>
```

If all goes well, you'll receive an HTTP 302 response:

```text
HTTP/1.1 302 Found
Location: https://YOUR_APP/callback?code=AUTHORIZATION_CODE
```

Note the authorization code included at the end of the included URL.

### Step 3: Obtain an ID Token

Using the authorization code obtained in step 2, you can obtain the ID token by making the appropriate `POST` call to the [tokens endpoint](api/authentication#authorization-code-pkce-).
