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

## Protocols

### Security Assertion Markup Language

Security Assertion Markup Language (SAML) is a widely used protocol in Single Sign-On implementations. The SAML protocol exchanges authorization and authentication data in XML format. The main parts of this exchange are the user, identity provider, and service provider.

With SAML, a user requests a resource from the service provider. The service provider checks with the identity provider if the user should have access to the resource. The identity provider verifies the user's identity and if it's valid asserts back to the service provider that the user should have access. 

### Web Services Federation

Web Services Federation (WS-Fed) is a commonly used protocol in Single Sign-On implementations. The WS-Fed protocol exchanges authorization and authentication data in XML format. Like SAML, the main parts of this exchange are the user, identity provider, and service provider.

With WS-Fed, a user requests a resource from the service provider. The service provider checks with the identity provider if the user should have access to the resource. The identity provider verifies the user's identity and if it's valid asserts back to the service provider that the user should have access.

### OpenID Connect

OpenID Connect (OIDC) is an authentication protocol, commonly used in consumer facing Single Sign-On implementations. The OIDC protocol handles authentication through [JSON Web Tokens (JWTs)](/tokens/jwt) and a central identity provider.

With OIDC, a user requests access to an application. The application redirects the user to the identity provider for authentication. The identity provider verifies the user and if successful prompts the user to grant data access to the application. The identity provider generates a token, the `id_token`, containing user identity information the application can consume. Then the identity provider returns the user to the application.

### Lightweight Directory Access Protocol & Active Directory

Lightweight Directory Access Protocol (LDAP) is an application protocol for accessing a directory of credentials that can be shared by multiple applications. LDAP when paired with Active Directory (AD) provides a centralized location for user identity. The LDAP protocol exchanges information in LDAP Data Interchange Format (LDIF)

With LDAP/AD, an application makes an authentication request to the LDAP/AD server.

## Inbound SSO

For [inbound SSO](/sso/current/inbound), Auth0 is the SSO provider. The application presents a user with one or more external identity providers. The user selects an identity provider to authenticate with. Upon successful authentication, the user is returned to the application.

Inbound SSO in Auth0 is handled by [connections](/connections).

## Outbound SSO

For [outbound SSO](/sso/current/outbound), a third-party identity provider is the SSO provider. The application redirects a user to an identity provider for authentication and authorization. Upon successful authentication, the user is returned to the application.

## Extension: SSO Dashboard

The [Single Sign-On (SSO) Dashboard Extension](/extensions/sso-dashboard) allows you to create a dashboard with multiple enterprise applications that can be enabled for SSO for your users for login.

## Use Cases

For examples and implementation guides, check out our [Architecture Scenarios](/architecture-scenarios).

### Business to Business

For Business to Business (B2B) scenarios, SSO can simplify packaging your application for enterprise consumption. With Auth0 your applications can support common enterprise federation scenarios such as Active Directory, Lightweight Directory Access Protocol (LDAP), Ping, or Security Assertion Markup Language (SAML). This allows your partners and enterprise customers to login with their preferred enterprise identity technologies.

* [Case Study: Safari](https://auth0.com/learn/safari-case-study/)

### Business to Consumer / Customer Identity Access Management

For Business to Consumer (B2C) or Customer Identity Access Management (CIAM) scenarios, SSO can provide frictionless access to your applications or services. You can let customers authenticate through popular social identity providers such as Google, Facebook, LinkedIn, Twitter, and Microsoft instead of requiring them to make another account.

* [Case Study: Giving Compass](https://auth0.com/learn/giving-compass-case-study/)

### Business to Employees

For Business to Employees (B2E) scenarios, SSO can simplify the provisioning and management of employee credentials. Instead of keeping track of credentials for each and every service, employees can login once and gain access to everything they need. And if an employee leaves, deprovisioning a single account is much easier.

* [Case Study: Schneider Electric](https://auth0.com/learn/schneider-electric-case-study/)