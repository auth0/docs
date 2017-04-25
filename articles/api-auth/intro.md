---
title: Introducing OIDC Conformant Authentication
description: An overview of the OIDC Conformant authentication flows, why these changes were made and how you can adopt them.
toc: true
---

# Introducing OIDC Conformant Authentication

As part of our efforts to improve security and standards-based interoperability, we have implemented several new features in our authentication flows and made changes to existing ones. This document will present an overview of these changes, explain why they were made and point you to other detailed tutorials to help you adopt these changes.

We will start by reviewing the new features, continue with what changed and how you can distinguish which authentication flow is used (the latest or the legacy). Towards the end of this doc, you can find a summarizing table and links for further reading.

If you are new to Auth0, go through the [What’s New](#what-s-new) section of this doc. There you can find all the cool new features we introduced, like the ability to create APIs, call them from services, or enable external parties or partners to access protected resources at your API in a secure way. Then head off to the [How to use the new flows](#how-to-use-the-new-flows) section and make sure that your new implementation follows our latest, and more secure, authentication pipeline.

If you are already using Auth0 in your app, you should read the complete doc. We have taken great care to make sure that we do not break our existing customers with this new OIDC conformant implementation, however you should be aware of all changes and new features, and how you can use them (or avoid doing so). It goes without saying that we strongly encourage you to adopt this authentication pipeline, to improve your app’s security.

Note, that if you are integrating Auth0 as a [SAML or WS-Federation identity provider](/protocols/saml/saml-idp-generic) to your application (i.e. not through OIDC/OAuth), then you do not need to make any changes.

## What's New

### APIs Section in the Dashboard

You can now define your resource server APIs as entities separate from clients using our new APIs dashboard area.

![APIs Dashboard](/media/articles/api-auth/api-dashboard.png)

This lets you decouple your resource server APIs from the client applications that consume them and also lets you define third-party clients that you might not control or even fully trust (keep reading for more info).

__More Information: [APIs Overview](/apis).__

### Third-Party Clients

Up until recently we were treating every client as first-party client. This means that all clients were considered trusted. Now you have the option to define a client as either first-party or third-party.

Third-party clients, are clients that are controlled by different people or organizations who most likely should not have administrative access to your Auth0 domain. They enable external parties or partners to access protected resources at your API in a secure way. A practical application of third-party clients is the creation of "developer centers", which allow users to obtain credentials in order to integrate their applications with your API. Similar functionality is provided by well-known APIs such as Facebook, Twitter, Github, and many others.

So far, third-party clients cannot be created from the dashboard. They must be created through the management API. We have also implemented [Dynamic Client Registration](/api-auth/dynamic-client-registration) functionality. All clients registered through that will be third-party clients.

__More information__: [User consent and third-party clients](/api-auth/user-consent).

### Calling APIs from a Service (machine-to-machine)

We implemented the OAuth 2.0 Client Credentials grant which allows clients to authenticate as themselves (i.e. not on behalf of any user), in order to programatically and securely obtain access to an API.

__More information__: [Calling APIs from a Service](/api-auth/grant/client-credentials).

## What is Changing

### Calling APIs with Access Tokens

Historically, protecting resources on your API has been accomplished using ID tokens issued to your users after they authenticate in your applications. From now on, you should only use access tokens when calling APIs. ID tokens should only be used by the client to verify that the user is authenticated and get basic user information. The main reason behind this change is security. For details on refer to [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis).

__More information__: [Calling your APIs with Auth0 tokens](/api-auth/tutorials/adoption/api-tokens).

### User Profile Claims and Scope

Historically, you were able to define and request arbitrary application-specific claims. From now on, your client can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims), as [defined by the OIDC Specification](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims), or any scopes supported by your [API](/apis).

In order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims.

To customize the tokens, use Hooks for Client Credentials, and Rules for the rest of the grants:
- __Client Credentials__: [Customize Tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
- __Resource Owner__: [Customize Tokens using Rules](/api-auth/grant/password#customizing-the-returned-tokens)
- __Implicit Grant__: [Customize Tokens using Rules](/api-auth/tutorials/implicit-grant#optional-customize-the-tokens)
- __Authorization Code__: [Customize Tokens using Rules](/api-auth/tutorials/authorization-code-grant#optional-customize-the-tokens)
- __Authorization Code (PKCE)__: [Customize Tokens using Rules](/api-auth/tutorials/authorization-code-grant-pkce#optional-customize-the-tokens)

__More information__: [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).

### Single Sign On (SSO)

Initiating an SSO session must now happen __only__ from an Auth0-hosted page and not from client applications. This means that for SSO to work, users must be redirected to an Auth0-hosted login page and redirected to your application once authentication is complete.

__NOTE:__ Support for SSO from client applications is planned for a future release.

Not all [OAuth 2.0 grants](/protocols/oauth2#authorization-grant-types) support SSO at the moment:

<table class="table">
  <thead>
    <tr>
      <th>OAuth 2.0 Grant</th>
      <th>Supports SSO?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>[Authorization Code](/api-auth/grant/authorization-code)</th>
      <td>Yes</td>
    </tr>
    <tr>
      <th>[Authorization Code (PKCE)](/api-auth/grant/authorization-code-pkce)</th>
      <td>Yes</td>
    </tr>
    <tr>
      <th>[Implicit](/api-auth/grant/implicit)</th>
      <td>Yes/td>
    </tr>
    <tr>
      <th>[Resource Owner Password](/api-auth/grant/password)</th>
      <td>No</td>
    </tr>
  </tbody>
</table>

__More information__: [OIDC Single sign-on](/api-auth/tutorials/adoption/single-sign-on).

### Authorization Code Grant

### Implicit Grant

### Resource Owner Password Grant

### Delegation

### Passwordless

### Other Authentication API endpoints

## How to use the new flows

## Legacy vs New

## Keep Reading

<i class="notification-icon icon-budicon-345"></i>&nbsp;Read the [Adoption Guide](/api-auth/tutorials/adoption) which details all changes and provides suggestions on how to adapt your existing applications<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;Visit our [API Authorization index](/api-auth) to find information on the various OAuth 2.0 grants, which one you should implement, details on how to do so, and several other useful information<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;Read more about the [Access Token](/tokens/access-token)<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;Read more about the [Refresh Token](/tokens/preview/refresh-token)<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;Read about [OAuth 2.0](/protocols/oauth2) and [OIDC](/protocols/oidc)<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;[Learn why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)<br/>
