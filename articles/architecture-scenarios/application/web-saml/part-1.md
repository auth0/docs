---
description: Regular Web App Using SAML - Solution Overview
toc: true
---
# Regular Web App Using SAML: Solution Overview

In this section, we'll go over the solution we're implementing, including details on the:

* Identity management
* Protocols used
* Authentication flow

![](/media/articles/architecture-scenarios/web-saml.png)

## Identity Management

For the purposes of this example, we will have:

* Auth0 act as the identity provider
* The regular web app act as the service provider

What this means is that all identity-related functionality is strictly the responsibility of Auth0. Auth0, as an Identity-as-a-Service provider, offers cloud-based services for identity and access management, and its services include SSO, federated identity, password management, and more.

## The SAML 2.0 Protocol

The protocol we're using for authentication in this tutorial is **SAML 2.0**.

## The Authentication Flow

When the user attempts to log in to the regular web app, the web app responds by:

1. Generating a SAML request
2. Redirecting the user to the SSO URL

At this point, Auth0 begins to:

1. Parse the SAML request
2. Authenticates the user
3. Generates a SAML response to send back to the regular web app for verification. This is sent using an HTTP POST call to a designated endpoint (or callback) for the regular web app. The response contains SAML assertions about the user.

If the regular web app is able to verify the SAML response, it allows the user to log in and access the protected resources.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/web-saml"],
 next: ["2. Auth0 Configuration", "/architecture-scenarios/application/web-saml/part-2"]
}) %>