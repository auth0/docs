---
url: /api-auth
section: articles
classes: topic-page
title: API Authorization
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
  <h1>API Authorization</h1>
  <p>
    How to implement API authentication and authorization using the OAuth 2.0 authorization framework.
  </p>
</div>

At some point, your custom APIs will need to allow limited access to users, servers, or servers on behalf of users. With Auth0 you can manage the authorization requirements for server-to-server and application-to-server applications.

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself. With Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/<dfn data-key="openid">OpenID Connect (OIDC)</dfn> specification, or the many other technical aspects of API authorization.

In this page you can find a list of resources that can help you secure your APIs and access them in a secure manner.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/which-oauth-flow-to-use">Which OAuth 2.0 flow should I use?</a>
    <p>
      OAuth 2.0 supports several different grants. Deciding which one is suited for your case depends mostly on your Application's type, but other parameters weight in as well, like the level of trust for the Application, or the experience you want your users to have. Start here if you are not familiar with all that and you need directions in order to decide the proper flow for your case.
    </p>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code/call-api-auth-code">Call Your API from a Regular Web App</a>
    <p>
      If your application executes on a server and you want to configure it to use OAuth 2.0 to access an API, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/auth-code">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code/call-api-auth-code">Executing the flow</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Call Your API from a Native/Mobile App</a>
    <p>
      If your application is a native app and you want to configure it to use OAuth 2.0 to access an API, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/auth-code-pkce">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Executing the flow</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Call Your API from a Single-Page App</a>
    <p>
      If your application is a JavaScript-centric app executing on the browser, and you want to configure it to use OAuth 2.0 to access an API, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/auth-code-pkce">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/auth-code-pkce/call-api-auth-code-pkce">Executing the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/silent-authentication">Silent authentication for SPAs</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/nonce">Protect against replay attacks</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/represent-multiple-apis">Represent Multiple APIs Using a Proxy API in Auth0</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/flows/guides/client-credentials/call-api-client-credentials">Call Your API from a Machine-to-Machine App</a>
    <p>
      If you want to implement server-to-server interaction, and you want to configure it to use OAuth 2.0, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/concepts/client-credentials">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/flows/guides/client-credentials/call-api-client-credentials">Executing the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/config/using-the-auth0-dashboard">How to set up a Client Grant using the Dashboard</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/config/using-the-management-api">How to set up a Client Grant using the Management API</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/config/asking-for-access-tokens">How to execute a Client Credentials Grant</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/client-credentials/customize-with-hooks">Change the <dfn data-key="scope">scopes</dfn> and add custom claims to the tokens using Hooks</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/architecture-scenarios/application/server-api">Server + API architecture scenario</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/grant/password">Calling APIs from Highly Trusted Applications</a>
    <p>
      If the application is highly trusted and no other grant can be used, read these docs. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is sent to the backend and from there to Auth0.  It is therefore imperative that the application is absolutely trusted with this information.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/grant/password">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/password-grant">Executing the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/multifactor-resource-owner-password">How to use MFA with Resource Owner Password Grant</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/using-resource-owner-password-from-server-side">How to use Resource Owner Password Grant from the server side together with Anomaly Detection</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/tokens">Tokens</a>
    <p>
      Learn about the types of tokens related to identity and authentication and how they are used by Auth0.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/dynamic-application-registration">Dynamic Client Registration</a>
    <p>
      Learn how to allow third party developers to create applications under your tenant following the <a href="https://openid.net/specs/openid-connect-registration-1_0.html">OpenID Connect Dynamic Client Registration specification</a>.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/tokens/guides/validate-access-tokens">Validate Access Tokens</a>
    <p>
      Learn what an API has to do in order to verify a Bearer Access Token.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/restrict-access-api">Restrict Access to APIs</a>
    <p>
      Learn how to restrict users/applications from accessing APIs.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/blacklists-vs-grants">Blacklists and Application Grants</a>
    <p>
      Learn about revoking access to APIs and best practices for doing so.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/tutorials/represent-multiple-apis">Represent Multiple APIs Using a Single Logical API in Auth0</a>
    <p>
      Learn how to represent multiple APIs using a single logical API.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/faq">FAQ</a>
    <p>
      Frequently Asked Questions on API Authentication and Authorization .
    </p>
  </li>
</ul>
