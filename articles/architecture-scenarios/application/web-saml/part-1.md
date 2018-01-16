---
description: Regular Web App Using SAML - Solution Overview
toc: true
---
# Regular Web App Using SAML: Solution Overview

In this section, we'll go over the solution we're implementing, including details on the:

* Identity management
* Protocol used
* Authentication flow

![](/media/articles/architecture-scenarios/web-saml.png)

## Identity Management

For the purposes of this example, we will have:

* The regular web app (and later Slack) act as the service provider
* Auth0 act as the identity provider

When working with the SAML protocol, it's important to remember that the **service provider** is the part *provide* or *consume* SAML services. An **identity provider** (which, in this case, is Auth0) handles everything related to authentication and authorization.

What this means is that all identity-related functionality is strictly the responsibility of Auth0. Auth0, as an Identity-as-a-Service provider, offers cloud-based services for identity and access management, and its services include SSO, federated identity, password management, and more.

## The SAML 2.0 Protocol

The protocol we're using for authentication in this tutorial is **SAML 2.0**.

SAML, which stands for **S**ecurity **M**arkup **A**ssertion **L**anguage, is an XML-based framework that facilitates authentication and authorization between the service and identity providers. While SAML was originally developed for general use on the internet, one of the biggest uses for SAML today is to implement single sign on in enterprise settings.

The service provider (SP) agrees to trust the authentication of the identity provider (IdP). The IdP conveys such information to the SP using what is called an *authentication assertion*. This assertion is sent in an XML file, and it can be encrypted for additional security -- remember, this file contains authentication and authorization information and some of the details may be considered sensitive information.

## The Authentication Flow

When the user attempts to log in to the regular web app, which contains the embeddable Auth0 Lock widget, the web app responds by:

1. Generating a SAML request
2. Redirecting the user to the SSO URL

At this point, Auth0 begins to:

1. Parse the SAML request
2. Authenticate the user
3. Generate a SAML response to send back to the regular web app/Slack for verification. This is sent using an **HTTP POST** call to a designated endpoint (or callback) for the regular web app/Slack. The response contains SAML assertions about the user.

If the regular web app/Slack is able to verify the SAML response, it allows the user to log in and access the timesheets.

## The Implementation Process

In this tutorial, we will cover two methods for using Auth0 as a SAML identity provider (IdP). Because our timesheets app is a custom application, we'll need to manually configure the SAML integration. However, when integrating with Slack for SSO, we can take advantage of Auth0's built-in SSO support.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/web-saml"],
 next: ["2. Auth0 Configuration", "/architecture-scenarios/application/web-saml/part-2"]
}) %>