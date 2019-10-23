---
description: An overview of the OIDC Conformant authentication flows, why these changes were made and how you can adopt them.
toc: true
topics:
  - api-authentication
  - oidc
contentType: concept
useCase:
  - secure-api
  - call-api
---
# OIDC-Conformant Authentication Overview

**Released Date**: May 10, 2017

As part of our efforts to improve security and standards-based interoperability, we have implemented several new features in our authentication flows and made changes to existing ones. This document presents an overview of these changes, explains why they were made and points you to other detailed tutorials to help you adopt these changes.

We will start by reviewing the [new features](#what-s-new), and then continue with [what changed](#what-is-changing) and how you can [distinguish which authentication flow is used](#how-to-use-the-new-flows) (the latest or the legacy). Towards the end of this doc, you can find a [summarizing table](#legacy-vs-new) and [links for further reading](#keep-reading).

## What should I read?

If you are new to Auth0, go through the [What’s New](#what-s-new) section of this doc. There you can find all the cool new features we introduced, like the ability to create APIs, call them from services, or enable external parties or partners to access protected resources at your API in a secure way. Then head off to the [How to use the new flows](#how-to-use-the-new-flows) section and make sure that your new implementation follows our latest, and more secure, authentication pipeline.

If you are already using Auth0 in your app, you should read the complete doc. We have taken great care to make sure that we do not break our existing customers with this new OIDC conformant implementation. However, you should be aware of all changes and new features, and how you can use them (or avoid doing so). It goes without saying that we strongly encourage you to adopt this authentication pipeline, to improve your app’s security.

If you are using Auth0 as a [SAML or WS-Federation identity provider](/protocols/saml/saml-idp-generic) for your application (that is, you're not using OIDC/OAuth), then you do not need to make any changes.

## What's New

### APIs Section in the Dashboard

You can now define your resource server APIs as entities separate from applications using our new APIs dashboard area.

![APIs Dashboard](/media/articles/api-auth/api-dashboard.png)

This lets you decouple your resource server APIs from the applications that consume them and also lets you define third-party applications that you might not control or even fully trust (keep reading for more info).

::: note
For more information on APIs, their role in OAuth and how to configure an API in Auth0 Dashboard, refer to [APIs Overview](/apis).
:::

### Third-Party Applications

Up until recently we were treating every application as first-party application. This means that all applications were considered trusted. Now you have the option to define an application as either first-party or third-party.

Third-party applications are applications that are controlled by different people or organizations who most likely should not have administrative access to your Auth0 domain. They enable external parties or partners to access protected resources at your API in a secure way. A practical application of third-party applications is the creation of "developer centers", which allow users to obtain credentials in order to integrate their applications with your API. Similar functionality is provided by well-known APIs such as Facebook, Twitter, Github, and many others.

So far, third-party applications cannot be created from the dashboard. They must be created through the management API. We have also implemented [Dynamic Client Registration](/api-auth/dynamic-client-registration) functionality. All applications registered through that will be third-party applications.

::: note
For more information, refer to [User consent and third-party applications](/api-auth/user-consent).
:::

### Calling APIs from a Service (machine to machine)

We implemented the OAuth 2.0 Client Credentials grant which allows applications to authenticate as themselves (that is, not on behalf of any user), in order to programmatically and securely obtain access to an API.

::: note
For more information on the Client Credentials grant, refer to [How to Implement the Client Credentials Grant](/flows/guides/client-credentials/call-api-client-credentials).
:::

## What is Changing

### Calling APIs with Access Tokens

Historically, protecting resources on your API has been accomplished using ID Tokens issued to your users after they authenticate in your applications. From now on, you should only use Access Tokens when calling APIs. ID Tokens should only be used by the application to verify that the user is authenticated and get basic user information. The main reason behind this change is security. For details, refer to [Tokens](/tokens).

::: note
For more information, refer to [Calling your APIs with Auth0 tokens](/api-auth/tutorials/adoption/api-tokens).
:::

### User Profile Claims and Scope

Historically, you were able to define and request arbitrary application-specific claims. From now on, your application can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims), as [defined by the OIDC Specification](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims), or any <dfn data-key="scope">scopes</dfn> supported by your [API](/apis).

In order to add custom claims to ID Tokens or Access Tokens, they must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims) to avoid possible collisions with standard OIDC claims.

To customize the tokens, use Hooks for the Client Credentials Flow, and Rules for the rest of the flows:
- __Client Credentials Flow__: [Customize Tokens using Hooks](/flows/guides/client-credentials/call-api-client-credentials#customize-tokens)
- __Trusted App Flow__: [Customize Tokens using Rules](/api-auth/grant/password#customizing-the-returned-tokens)
- __Single-Page Flow__: [Customize Tokens using Rules](/flows/guides/implicit/call-api-auth-code-pkce#customize-tokens)
- __Regular Web App Flow__: [Customize Tokens using Rules](/flows/guides/auth-code/call-api-auth-code#customize-tokens)
- __Native/Mobile Flow__: [Customize Tokens using Rules](/flows/guides/auth-code-pkce/call-api-auth-code-pkce#customize-tokens)

::: note
For more information, refer to [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
:::

### Single Sign-on (SSO)

Initiating an <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> session must now happen __only__ from an Auth0-hosted page and not from applications. This means that for SSO to work, you must be using <dfn data-key="universal-login">Universal Login</dfn>. Users must be redirected to the login page and then redirected to your application once authentication is complete.

::: note
Support for SSO from applications is planned for a future release.
:::

Not all [OAuth 2.0 grants](/protocols/oauth2#authorization-grant-types) support SSO at the moment:

<table class="table">
  <thead>
    <tr>
      <th><strong>OAuth 2.0 Grant</strong></th>
      <th><strong>Supports SSO?</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><a href="/flows/concepts/auth-code">Authorization Code</a></th>
      <td>Yes</td>
    </tr>
    <tr>
      <th><a href="/flows/concepts/auth-code-pkce">Authorization Code (PKCE)</a></th>
      <td>Yes</td>
    </tr>
    <tr>
      <th><a href="/flows/concepts/implicit">Implicit</a></th>
      <td>Yes</td>
    </tr>
    <tr>
      <th><a href="/api-auth/grant/password">Resource Owner Password</a></th>
      <td>No</td>
    </tr>
  </tbody>
</table>

::: note
For more information, refer to [OIDC Single Sign-on (SSO)](/api-auth/tutorials/adoption/single-sign-on).
:::

### Authorization Code Grant

Some changes were introduced in the implementation of Authorization Code grant:

- The `device` request parameter has been removed.
- The `audience` request parameter has been introduced. This denotes the target API for which the token should be issued.
- The returned Access Token is a [JWT](/tokens/concepts/jwts), valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) and the API specified by the `audience` parameter.
- A <dfn data-key="refresh-token">Refresh Token</dfn> will be returned only if the `offline_access` scope was granted.

::: note
For more information, refer to [Authorization Code grant](/api-auth/tutorials/adoption/authorization-code).
:::

### Implicit Grant

Some changes were introduced in the implementation of Implicit grant:

- The `device` request parameter has been removed.
- The `audience` request parameter has been introduced. This denotes the target API for which the token should be issued.
- The `response_type` request parameter indicates whether we want to receive both an Access Token and ID Token. If using `response_type=id_token`, we will return only an ID Token.
- Refresh Tokens are not allowed. [Use `prompt=none` instead](/api-auth/tutorials/silent-authentication).
- The <dfn data-key="nonce">`nonce`</dfn> request parameter must be a [cryptographically-secure random string](/api-auth/tutorials/nonce). After validating the ID Token, the application must [validate the nonce to mitigate replay attacks](/api-auth/tutorials/nonce). Requests made without a `nonce` parameter will be rejected.
- The returned Access Token is a [JWT](/tokens/concepts/jwts), valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) and the API specified by the `audience` parameter.
- ID Tokens will be signed asymmetrically using `RS256`.

::: note
For more information, refer to [Implicit grant](/api-auth/tutorials/adoption/implicit).
:::

### Resource Owner Password Grant

Some changes were introduced in the implementation of Resource Owner Password grant:

- The `device` request parameter has been removed.
- The `audience` request parameter has been introduced. This denotes the target API for which the token should be issued.
- The endpoint to execute token exchanges is [/oauth/token](/api/authentication#resource-owner-password).
- [Auth0's own grant type](/api-auth/tutorials/password-grant#realm-support) is used to authenticate users from a specific connection (`realm`). The [standard OIDC password grant](/api-auth/tutorials/password-grant) is also supported, but it does not accept Auth0-specific parameters such as `realm`.
- The returned Access Token is a [JWT](/tokens/concepts/jwts), valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) and the API specified by the `audience` parameter.
- The ID Token will be forcibly signed using `RS256` if requested by a [public application](/applications/concepts/app-types-confidential-public#public-applications).
- A Refresh Token will be returned only if the `offline_access` scope was granted.

::: note
For more information, refer to [Resource Owner Password Credentials exchange](/api-auth/tutorials/adoption/password).
:::

### Delegation

<%= include('../_includes/_deprecate-delegation') %>

[Delegation](/api/authentication#delegation) is used for many operations:
- Exchanging an ID Token issued to one application for a new one issued to a different application
- Using a Refresh Token to obtain a fresh ID Token
- Exchanging an ID Token for a third-party API token, such as Firebase or AWS.

Given that [ID Tokens should no longer be used as API tokens](/api-auth/tutorials/adoption/api-tokens) and that [Refresh Tokens should be used only at the token endpoint](/api-auth/tutorials/adoption/refresh-tokens), this endpoint is now considered deprecated.

At the moment there is no OIDC-compliant mechanism to obtain third-party API tokens. In order to facilitate a gradual migration to the new authentication pipeline, delegation can still be used to obtain third-party API tokens. This will be deprecated in future releases.

### Passwordless

Our new implementation only supports an [OIDC-conformant](/api-auth/tutorials/adoption) <dfn data-key="passwordless">passwordless</dfn> authentication mechanism when using web applications (with Lock.js or auth0.js).

Native applications need to use Universal Login (with an Auth0-hosted login page). Customers can use the <dfn data-key="lock">Lock</dfn> (Passwordless) template in the [Dashboard](${manage_url}/#/login) under **Hosted Pages -> Login -> Default Templates**, or customize it to fit specific requirements.

### Other Authentication API endpoints

- [/tokeninfo](/api/authentication#get-token-info): With the new implementation, this endpoint is disabled.

- [/userinfo](/api/authentication#get-user-info): Responses will conform to the OIDC specification, similar to the contents of ID Tokens.

- [/oauth/access_token](/api/authentication#social-with-provider-s-access-token): The [/oauth/access_token](/api/authentication#social-with-provider-s-access-token) endpoint, used on native social authentication on mobile devices (for example, use the Facebook SDK and then this endpoint to create the user in Auth0), is now disabled. The alternative is to open the browser to do social authentication, which is what [Google and Facebook are recommending](https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html) since last year.

- [/oauth/ro](/api/authentication#resource-owner): This endpoint will soon be deprecated. Use the password grant instead. Note that the password grant should be used only by highly trusted applications, with the current exception of native apps (not with SPAs). This grant's best use is to be called from the server-side of a regular web app or perhaps the backend API of a SPA. For more information on this grant refer to [Call APIs from Highly Trusted Applications](/api-auth/grant/password).

## How to use the new flows

To use the new pipeline, at least one of the following should apply:

- The application is flagged as __OIDC Conformant__, or
- The `audience` parameter is set in the [/authorize](/api/authentication#authorize-application) or [/token](/api/authentication#get-token) endpoints

If none of these applies, then the legacy flows will be used.

To mark your application as OIDC Conformant: go to [Dashboard](${manage_url}) > click [Applications](${manage_url}/#/applications) > select your application > go to _Settings_ > click the _Show advanced settings_ link at the end > click _OAuth_ > toggle the __OIDC Conformant__ flag.

![OIDC Conformant flag](/media/articles/api-auth/oidc-conformant-flag.png)

To use the `audience` parameter instead, configure your app to send it when initiating an authorization request.

## Legacy vs New

<table class="table">
  <thead>
    <tr>
      <th></th>
      <th><strong>Legacy</strong></th>
      <th><strong>OIDC</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><strong>Define APIs in the Dashboard</strong></th>
      <td>Not Supported</td>
      <td>Supported</td>
    </tr>
    <tr>
      <th><strong>Third-party Applications</strong></th>
      <td>Not Supported</td>
      <td>Supported</td>
    </tr>
    <tr>
      <th><strong>Client Credentials Grant</strong></th>
      <td>This grant does not exist in the legacy pipeline, but the <a href="/api-auth/tutorials/adoption/password">Resource Owner Password Credentials exchange</a> can be used to simulate it by creating a "service user". We strongly discourage the latter approach in favor of using Client Credentials, since it allows defining fine-grained permissions for each API application.</td>
      <td>Supported</td>
    </tr>
    <tr>
      <th><strong>Token used to call an API</strong></th>
      <td>ID Token</td>
      <td>Access Token</td>
    </tr>
    <tr>
      <th><strong>Add arbitrary claims in Tokens</strong></th>
      <td>Supported</td>
      <td>Supported. The <a href="/tokens/guides/create-namespaced-custom-claims">namespaced format</a> has to be used.</td>
    </tr>
    <tr>
      <th><strong>SSO</strong></th>
      <td>Supported</td>
      <td>Not supported for Resource Owner grant. For the rest, Universal Login must be employed and users redirected to the login page.
    </tr>
    <tr>
      <th><strong>Access Token format</strong></th>
      <td>Opaque string</td>
      <td>JWT for customer APIs, opaque string for /userinfo only</td>
    </tr>
    <tr>
      <th><strong>Authenticate users from a specific connection (<code>realm</code>)</strong></th>
      <td>Supported (using <a href="/api/authentication#resource-owner">/oauth/ro</a>)</td>
      <td><a href="/api-auth/tutorials/password-grant#realm-support">New password-realm extension grant</a></td>
    </tr>
    <tr>
      <th><strong>Passwordless</strong></th>
      <td>Supported</td>
      <td>Not supported at the moment, will be in future releases</td>
    </tr>
    <tr>
      <th><strong>/tokeninfo endpoint</strong></th>
      <td>Supported</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <th><strong>/delegation endpoint</strong></th>
      <td>Supported</td>
      <td>Should only be used to obtain third-party API tokens. A new mechanism will be provided  in future releases.</td>
    </tr>
    <tr>
      <th><strong>/oauth/access_token endpoint</strong></th>
      <td>Supported</td>
      <td>Disabled, an alternative will be added in future releases</td>
    </tr>
    <tr>
      <th><strong>/userinfo endpoint</strong></th>
      <td>Supported</td>
      <td>Supported. Responses will <a href="https://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse">conform to the OIDC specification</a>, similar to <a href="/api-auth/tutorials/adoption/scope-custom-claims">the contents of ID Tokens</a>.</td>
    </tr>
    <tr>
      <th><strong>Refresh Tokens with Implicit Grant</strong></th>
      <td>Supported</td>
      <td>Deprecated. Silent authentication should be used instead.</td>
    </tr>
    <tr>
      <th><strong>/ssodata endpoint and <code>getSSOData()</code> method from auth0.js
        </strong></th>
      <td>Supported (up to auth0.js v8)</td>
      <td>Deprecated. Silent authentication should be used instead.</td>
    </tr>
    <tr>
      <th><strong>Implicit Grant requests without nonce parameter set</strong></th>
      <td>Supported</td>
      <td>Will be rejected.</td>
    </tr>
    <tr>
      <th><strong><code>device</code> parameter (used to obtain Refresh Tokens)</strong></th>
      <td>Supported</td>
      <td>Not supported. <a href="/api/authentication#resource-owner-password">/oauth/token</a>
should be used instead with <code>"grant_type": "refresh_token"</code></td>
    </tr>
    <tr>
      <th><strong>/oauth/ro endpoint</strong></th>
      <td>Supported</td>
      <td>Replaced with Password Grant</td>
    </tr>
  </tbody>
</table>

## Keep reading

* [API Authorization index](/api-auth)
* [Tokens](/tokens)

