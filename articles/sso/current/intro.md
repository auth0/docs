---
title: Introduction to Single Sign-On
description: Overview of what Single Sign-on (SSO) is and how it works.
toc: true
topics:
  - sso
contentType:
  - index
  - concept
useCase:
  - integrate-saas-sso
---

# Introduction to Single Sign-On

<dfn data-key="single-sign-on">Single Sign-On (SSO)</dfn> is when a user logs in to one application and is then signed in to other applications automatically, regardless of the platform, technology, or domain the user is using. The user signs in only one time, hence the name: Single Sign-on.

## What is SSO?

Single Sign On (SSO) is a type of authentication in which a user logs in to one application or service and is automatically granted access to other applications or services.

For example, if you login to a Google service such as Gmail, you are automatically authenticated to YouTube, AdSense, Google Analytics, and other Google apps. Likewise, if you log out of your Gmail or other Google apps, you are automatically logged out of all the apps.

### How it works

A central domain performs authentication and then shares the session with other domains. The way a session is shared may differ between SSO protocols, but the general concept is the same.

For example, the authentication domain may generate a signed JSON Web Token (JWT), encrypted using JSON Web Encryption (JWE). This token is passed to the client and used by the authentication domain as well as any other domains. The token can be passed to the original domain by a redirect and it contains all the information needed to identify the user for the domain requiring authentication. Since the token is signed, it cannot be modified in any way by the client.

### Sessions

Single Sign-on and Single Logout are possible through the use of [sessions](/sessions). There may be up to three different sessions for a user with SSO:

* Local session maintained by the application
* Authorization Server session, if SSO is enabled
* Identity Provider session, if the user chose to log in through an Identity Provider (such as Google, Facebook, or an enterprise <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider)

### User experience

Whenever users go to a domain that requires authentication, they are redirected to the authentication domain. If a user is already logged in at the authentication domain, they can be immediately redirected to the original domain with the necessary authentication token.

### Why use it?

Single Sign-On provides a seamless experience for users when using your applications and services. Instead of having to remember separate sets of credentials for each application or service, users can simply login once and access your full suite of applications.

### Identity federation

Identity federation deals with managing user identities and granting them the rights and privileges to log into the different applications and services.

## Protocols

...

### SAML

...

### WS-Fed

...

### OIDC

...

### LDAP/AD - intranets

...

## Inbound SSO to an Auth0 tenant with connections

...

### Built-in and custom SAML Identity Providers

* [SAML Identity Providers](/protocols/saml/identity-providers)

### Social Identity Providers

* [Social Identity Providers](/connections#social)

### Custom OAuth and OIDC providers

* [Add a generic OAuth2 Authorization Server to Auth0](/connections/social/oauth2)
* [Custom Social Connections Extension](/extensions/custom-social-extensions)

## Outbound from

...

### SAML

...

### WS-Fed

...

### OIDC

...

## SSO Integrations (outbound sso)

Auth0 provides [SSO Integrations](/integrations/sso) for the following services:

- [Active Directory RMS](/integrations/sso/ad-rms)
- [Box](/integrations/sso/box)
- [CloudBees](/integrations/sso/cloudbees)
- [Concur](/integrations/sso/concur)
- [Disqus](/integrations/sso/disqus)
- [Dropbox](/integrations/sso/dropbox)
- [Microsoft Dynamics CRM](/integrations/sso/dynamics-crm)
- [Adobe Echosign](/integrations/sso/echosign)
- [Egnyte](/integrations/sso/egnyte)
- [New Relic](/integrations/sso/new-relic)
- [Office 365](/integrations/sso/office-365)
- [SalesForce](/integrations/sso/salesforce)
- [SharePoint](/integrations/sso/sharepoint)
- [Slack](/integrations/sso/slack)
- [SpringCM](/integrations/sso/springcm)
- [Zendesk](/integrations/sso/zendesk)
- [Zoom](/integrations/sso/zoom)

## Extension: SSO Dashboard

The [Single Sign-On (SSO) Dashboard Extension](/extensions/sso-dashboard) allows you to create a dashboard with multiple enterprise applications that can be enabled for SSO for your users for login.

## Use Cases

...

### B2C - nav between multiple in-house or third-party apps, outbound; inbound social providers

...

### B2B - same outbound, inbound support three customers idp

...

### B2E - outbound federated between third-party apps used by business, inbound their internal ids

...

#### IdP-initiated SSO

...