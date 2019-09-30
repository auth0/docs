---
url: /flows
section: articles
classes: topic-page
title: Authentication and Authorization Flows
description: Introduction to the various flows used for authentication and authorization of applications and APIs.
topics:
  - api-authentication
  - api-authorization
  - oidc
contentType: index
useCase:
  - secure-api
  - call-api
  - add-login
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Authentication and Authorization Flows</h1>
  <p>Introduction to the various flows used for authentication and authorization of applications and APIs.</p>
</div>

Auth0 uses <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn> and [OAuth 2.0](/protocols/oauth2) to authenticate users and get their authorization to access protected resources. With Auth0, you can easily support different flows in your own applications and APIs without worrying about the OAuth 2.0/OIDC specification or the other technical aspects of authentication and authorization.

We support scenarios for server-side, mobile, desktop, client-side, machine-to-machine, and device applications.

<ul class="topic-links">
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/concepts/auth-code">Authorization Code Flow</a>
    <p>
      Because regular web apps are server-side apps where the source code is not publicly exposed, they can use the Authorization Code Flow (defined in OAuth 2.0 RFC 6749, section 4.1), which exchanges an Authorization Code for a token.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code/add-login-auth-code">Add Login Using the Authorization Code Flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code/call-api-auth-code">Call API Using the Authorization Code Flow</a>
      </li>
    </ul>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/concepts/auth-code-pkce">Authorization Code Flow with Proof Key for Code Exchange (PKCE)</a>
    <p>
      During authentication, mobile/native applications can use the OAuth 2.0 Authorization Code Flow, but they require additional security. To mitigate this, OAuth 2.0 provides a version of the Authorization Code Flow which makes use of a Proof Key for Code Exchange (PKCE) (defined in OAuth 2.0 RFC 7636).
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code-pkce/add-login-auth-code-pkce">Add Login Using the Authorization Code Flow with PKCE</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Call API Using the Authorization Code Flow with PKCE</a>
      </li>
    </ul>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/concepts/implicit">Implicit Flow</a>
    <p>
      During authentication, single-page applications (SPAs) have some special requirements. Since the SPA is a public client, it is unable to securely store information such as a Client Secret. As such a special authentication flow exists called the OAuth 2.0 Implicit Flow (defined in OAuth 2.0 RFC 6749, section 4.2).
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/implicit/add-login-implicit">Add Login Using the Implicit Flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/implicit/call-api-implicit">Call API Using the Implicit Flow</a>
      </li>
    </ul>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/concepts/client-credentials">Client Credentials Flow</a>
    <p>
      With machine-to-machine (M2M) applications, such as CLIs, daemons, or services running on your back-end, the system authenticates and authorizes the app rather than a user. For this scenario, typical authentication schemes like username + password or social logins don't make sense. Instead, M2M apps use the Client Credentials Flow (defined in OAuth 2.0 RFC 6749, section 4.4).
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/client-credentials/call-api-client-credentials">Call API Using the Client Credentials Flow</a>
      </li>
    </ul>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/concepts/device-auth">Device Authorization Flow</a>
    <p>
      With input-constrained devices that connect to the internet, rather than authenticate the user directly, the device asks the user to go to a link on their computer or smartphone and authorize the device. This avoids a poor user experience for devices that do not have an easy way to enter text. To do this, device apps use the Device Authorization Flow (drafted in OAuth 2.0). For use with mobile/native applications.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/device-auth/call-api-device-auth">Call API Using the Device Authorization Flow</a>
      </li>
    </ul>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/concepts/on-behalf-of">On-Behalf-Of Flow</a>
    <p>
      With applications that access APIs via a middle-tier API, it can be useful to allow an API to get Access Tokens for other APIs using only the Access Token already issued for itself&mdash;and without additional user interaction. To do this, a source API uses a version of the Token Exchange Flow (drafted in OAuth 2.0) to initiate a second authorization process and get an Access Token for another, target API.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/on-behalf-of/call-api-on-behalf-of">Call API Using the On-Behalf-Of Flow</a>
      </li>
    </ul>
  </li>
</ul>
