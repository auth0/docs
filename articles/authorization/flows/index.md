---
section: articles
classes: topic-page
title: Authorization Flows
topics:
  - api-authentication
  - oidc
contentType: index
useCase:
  - secure-api
  - call-api
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Authorization Flows</h1>
  <p>
    How to call APIs using the OAuth 2.0 authorization flows.
  </p>
</div>

At some point, your custom APIs will need to allow limited access to users, servers, or servers on behalf of users. With Auth0 you can manage the authorization requirements for server-to-server and application-to-server applications.

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs. With Auth0, you can easily support different flows in your own APIs without worrying about the details of the OAuth 2.0/<dfn data-key="openid">OpenID Connect (OIDC)</dfn> specifications, or the many other technical aspects of API authorization.

<ul class="topic-links">
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code/call-api-auth-code">Call Your API from a Regular Web App</a>
    <p>
      Learn how to configure a traditional web app that performs most of its application logic on the server to use OAuth 2.0 to access an API.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/auth-code">Flow Overview: Authorization Code</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code/call-api-auth-code">Call an API using the Authorization Code Flow</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Call Your API from a Native/Mobile App</a>
    <p>
      Learn how to configure a native app to use OAuth 2.0 to access an API.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/auth-code-pkce">Flow Overview: Authorization Code with Proof Key for Code Exchange (PKCE)</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Call an API using the Authorization Code Flow with PKCE</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/flows/guides/implicit/call-api-implicit">Call Your API from a Single-Page App</a>
    <p>
      Learn how to configure a JavaScript-centric app that performs most of its user interface logic in a web browser to use OAuth 2.0 to access an API.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/implicit">Flow Overview: Implicit</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/implicit/call-api-implicit">Call an API using the Implicit Flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/nonce">Mitigate replay attacks</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/flows/guides/client-credentials/call-api-client-credentials">Call Your API from a Machine-to-Machine App</a>
    <p>
      Learn to configure a machine-to-machine (M2M) app to use OAuth 2.0 to access an API.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/client-credentials">Flow Overview: Client Credentials</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/client-credentials/call-api-client-credentials">Call an API using the Client Credentials Flow</a>
      </li>
    </ul>
  </li>
</ul>
