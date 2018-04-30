---
url: /api-auth
section: articles
classes: topic-page
title: API Authorization
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>API Authorization</h1>
  <p>
    How to implement API authentication and authorization using the OAuth 2.0 authorization framework.
  </p>
</div>

::: note
<strong>Heads up!</strong> As part of our efforts to improve security and standards-based interoperability, we have implemented several new features in our authentication flows and made changes to existing ones. For an overview of these changes, and details on how you adopt them, refer to <a href="/api-auth/intro">Introducing OIDC Conformant Authentication</a>.
:::

At some point, your APIs will need to allow limited access to users, servers, or servers on behalf of users.

Auth0's API authorization features allow you to manage the authorization requirements for server-to-server and application-to-server applications.

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself.

Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/intro">Introducing OIDC Conformant Authentication</a>
    <p>
      This document presents an overview of the latest new features and changes in our authentication flows, explain why they were made and points to other detailed tutorials to help you adopt these changes.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/tutorials/adoption">OIDC Conformant Authentication Adoption Guide</a>
    <p>
      This guide details all the latest new features and changes and provides suggestions on how to adapt your existing applications.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/which-oauth-flow-to-use">Which OAuth 2.0 flow should I use?</a>
    <p>
      OAuth 2.0 supports several different grants. Deciding which one is suited for your case depends mostly on your Application's type, but other parameters weight in as well, like the level of trust for the Application, or the experience you want your users to have. Start here if you are not familiar with all that and you need directions in order to decide the proper flow for your case.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/grant/authorization-code">Calling APIs from Server-side Web Apps</a>
    <p>
      If your application executes on a server and you want to configure it to use OAuth 2.0 to access an API, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/grant/authorization-code">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/authorization-code-grant">Executing the flow</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/grant/authorization-code-pkce">Calling APIs from Mobile Apps</a>
    <p>
      If your application is a native app and you want to configure it to use OAuth 2.0 to access an API, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/grant/authorization-code-pkce">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/authorization-code-grant-pkce">Executing the flow</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/grant/implicit">Calling APIs from Client-side Web Apps</a>
    <p>
      If your application is a JavaScript-centric app executing on the browser, and you want to configure it to use OAuth 2.0 to access an API, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/grant/implicit">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/implicit-grant">Executing the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/silent-authentication">Silent authentication for SPAs</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/nonce">Protect against replay attacks</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/represent-multiple-apis">Represent Multiple APIs Using a Single Auth0 API</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/grant/client-credentials">Calling APIs from a Service</a>
    <p>
      If you want to implement server-to-server interaction, and you want to configure it to use OAuth 2.0, read these docs.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/grant/client-credentials">Overview of the flow</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/config/using-the-auth0-dashboard">How to set up a Client Credentials Grant using the Dashboard</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/config/using-the-management-api">How to set up a Client Credentials Grant using the Management API</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/config/asking-for-access-tokens">How to execute a Client Credentials Grant</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/api-auth/tutorials/client-credentials/customize-with-hooks">Change the scopes and add custom claims to the tokens using Hooks</a>
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
    <i class="icon icon-budicon-715"></i><a href="/api-auth/why-use-access-tokens-to-secure-apis">Why you should always use Access Tokens to secure an API</a>
    <p>
      Learn about the differences between Αccess Τoken and ID Τoken and why the latter should never be used to secure an API.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/dynamic-application-registration">Dynamic Application Registration</a>
    <p>
      Learn how to allow third party developers to create applications under your tenant following the <a href="https://openid.net/specs/openid-connect-registration-1_0.html">OpenID Connect Dynamic Application Registration specification</a>.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/tutorials/verify-access-token">Verify Access Tokens</a>
    <p>
      Learn what an API has to do in order to verify a Bearer Access Token.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/restrict-requests-for-scopes">Restrict User/Application Requests for API Scopes</a>
    <p>
      Learn how to restrict users/applications from requesting API scopes for which they don't have access.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/blacklists-vs-grants">Blacklists and Application Grants</a>
    <p>
      Learn about revoking access to APIs and best practices for doing so.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/tutorials/represent-multiple-apis">How to Represent Multiple APIs Using a Single Auth0 API</a>
    <p>
      Learn how to represent multiple APIs using a single Auth0 API.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api-auth/faq">FAQ</a>
    <p>
      Frequently Asked Questions on API Authentication and Authorization .
    </p>
  </li>
</ul>
