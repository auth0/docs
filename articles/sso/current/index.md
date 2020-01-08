---
title: Single Sign-On
description: Overview of what Single Sign-on (SSO) is and how it works.
toc: true
topics:
  - sso
  - authentication
contentType:
  - index
  - concept
useCase:
  - integrate-saas-sso
---

# Single Sign-On

<dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> occurs when a user logs in to one application and is then signed in to other applications automatically, regardless of the platform, technology, or domain the user is using. The user signs in only one time, hence the name of the feature (Single Sign-on).

For example, if you login to a Google service such as Gmail, you are automatically authenticated to YouTube, AdSense, Google Analytics, and other Google apps. Likewise, if you log out of your Gmail or other Google apps, you are automatically logged out of all the apps; this is known as Single Logout.

## Benefits

SSO provides a seamless experience for users when using your applications and services. Instead of having to remember separate sets of credentials for each application or service, users can simply login once and access your full suite of applications.

## User experience

Whenever users go to a domain that requires authentication, they are redirected to the authentication domain where they may be asked to log in. If the user is already logged in at the authentication domain, they can be immediately redirected to the original domain without signing in again.

## How it works

Single Sign-on and Single Logout are possible through the use of [sessions](/sessions). There may be up to three different sessions for a user with SSO:

* Local session maintained by the application
* Authorization Server session, if SSO is enabled
* Identity Provider session, if the user chose to log in through an Identity Provider (such as Google, Facebook, or an enterprise <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider)

With SSO, a central domain performs authentication and then shares the session with other domains. The way a session is shared may differ between SSO protocols, but the general concept is the same.

For example, the authentication domain may generate a signed [JSON Web Token (JWT)](/tokens/concepts/jwts) (encrypted using JSON Web Encryption (JWE)), which contains all the information needed to identify the user for any other domain requiring authentication. This token is passed to the client, but because it is signed, it cannot be modified in any way by the client. The token can be passed to the original domain by a redirect and used by the authentication domain and any other domains to identify the user.

## Protocols

### Security Assertion Markup Language & Web Services Federation

[Security Assertion Markup Language (SAML)](/protocols/saml) and [Web Services Federation (WS-Fed)](/protocols/ws-fed) are both protocols that are widely used in SSO implementations. Both SAML and WS-Fed exchange authorization and authentication data in XML format; the main parts of this exchange are the user, the identity provider, and the service provider.

With SAML or WS-Fed:

1. A user requests a resource from the service provider.
2. The service provider checks with the identity provider to see if the user should have access to the resource. 
3. The identity provider verifies the user's identity, and if valid, asserts back to the service provider that the user should have access.

### OpenID Connect

[OpenID Connect (OIDC)](/protocols/oidc) is an authentication protocol commonly used in consumer-facing SSO implementations. The OIDC protocol handles authentication through [JSON Web Tokens](/tokens/concepts/jwts) and a central identity provider.

With OIDC:

1. A user requests access to an application.
2. The application redirects the user to the identity provider for authentication.
3. The identity provider verifies the user, and if successful, prompts the user to grant data access to the application.
4. If access is granted, the identity provider generates an ID Token, which contains user identity information that the application can consume. 
5. The identity provider returns the user to the application.

### Lightweight Directory Access Protocol + Active Directory

[Lightweight Directory Access Protocol (LDAP)](/protocols/ldap) is an application protocol used to access a directory of credentials that can be shared by multiple applications; it is commonly used by intranets. When paired with Active Directory (AD), LDAP provides a centralized location for user identity, so the application makes an authentication request to the LDAP/AD server. The LDAP protocol exchanges information in LDAP Data Interchange Format (LDIF).

## Inbound SSO

For [inbound SSO](/sso/current/inbound), Auth0 is the SSO provider. 

When a user logs in to an application:

1. The application presents the user with one or more external identity providers.
2. The user selects an identity provider to authenticate with and logs in.
3. Upon successful authentication, the user is returned to the application.

Inbound SSO in Auth0 is handled by [connections](/connections).

## Outbound SSO

For [outbound SSO](/sso/current/outbound), a third-party identity provider is the SSO provider. 

When a user logs in to an application:

1. The application redirects the user to an identity provider.
2. The third-party identity provider performs authentication and authorization.
3. Upon successful authentication, the user is returned to the application.

### Auth0's SSO Dashboard Extension

When planning an outbound SSO implementation, you may choose to use Auth0's [SSO Dashboard Extension](/extensions/sso-dashboard), which allows you to create a dashboard that lists multiple enterprise applications that can be enabled for SSO. This dashboard is then presented to your users to log in.

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