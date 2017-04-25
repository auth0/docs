---
title: Introducing OIDC Conformant Authentication
description: An overview of the OIDC Conformant authentication flows, why these changes were made and how you can adopt them.
toc: true
---

# Introducing OIDC Conformant Authentication

As part of our efforts to improve security and standards-based interoperability, we have implemented several new features in our authentication flows and made changes to existing ones. This document will present an overview of these changes, explain why they were made and point you to other detailed tutorials to help you adopt these changes.

We will start by reviewing the new features, continue with what changed and how you can distinguish which authentication flow is used (the latest or the legacy). Towards the end of this doc, you can find a summarizing table and links for further reading.

If you are new to Auth0, go through the What’s New section of this doc. There you can find all the cool new features we introduced, like the ability to create APIs, call them from services, or enable external parties or partners to access protected resources at your API in a secure way. Then head off to the How to use the new flows section and make sure that your new implementation follows our latest, and more secure, authentication pipeline.

If you are already using Auth0 in your app, you should read the complete doc. We have taken great care to make sure that we do not break our existing customers with this new OIDC conformant implementation, however you should be aware of all changes and new features, and how you can use them (or avoid doing so). It goes without saying that we strongly encourage you to adopt this authentication pipeline, to improve your app’s security.

Note, that if you are integrating Auth0 as a SAML or WS-Federation identity provider to your application (i.e. not through OIDC/OAuth), then you do not need to make any changes.

## What's New

### APIs Section in the Dashboard

### Third-Party Clients

### Calling APIs from a Service (machine-to-machine)

## What is Changing

### Calling APIs with Access Tokens

### User Profile Claims and Scope

### Single Sign On (SSO)

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
