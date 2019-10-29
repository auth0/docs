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

A <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> service is one that allows multiple applications to authenticate a user without the requirement to re-enter credentails.

For example, if you login to a Google service such as Gmail, you can than access other services like to YouTube, AdSense, Google Analytics, and other Google apps without re-entering credentials each time.

## Benefits

SSO provides a seamless experience for users when using your applications and services. Instead of having to remember separate sets of credentials for each application or service, users can simply login once and access your full suite of applications.

## User experience

Whenever users go to a domain that requires authentication, they are redirected to the authentication domain where they may be asked to log in. If the user is already logged in at the authentication domain, they can be immediately redirected to the original domain without signing in again.

## How it works

Single Sign-on is possible through the use of [sessions](/sessions). In most cases the Auth0 session is the SSO service for your applications, but the user session could begin with a external IdP.  Because of this there may be up to three different sessions for a user with SSO:

* Local session maintained by the application
* Authorization Server session, if SSO is enabled
* Identity Provider session, if the user chose to log in through an Identity Provider (such as Google, Facebook, or an enterprise <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider)

With SSO, a central domain performs authentication and then shares the session with other domains. The way a session is communicated between applications may differ between SSO protocols, but the general concept is the same.

### Auth0 As the IdP

The Auth0 session is leveraged by your applications to provide the SSO service.

When a user logs in to an application and the user has an active session with Auth0:

1. The application redirects the user to Auth0's Universal Login page.
2. Auth0 recognizes the user session via the session cookie.
3. The user is immediately redirected back to your application with an ID Token or assertion.
4. The application verifies the ID token or assertion and sets its own session.

The duration of the Auth0 Session is a [tenant level configuration](dashboard/reference/settings-tenant#login-session-management).

Custom first party and third party applications that will leverage your Auth0 session are configured as [Applications](/applications) within Auth0.

Additionally, Auth0 provides pre-built [SSO Integrations](/integrations/sso) for popular third party applications that your users may need access to as well.

### Working with External IdPs

In many cases your users may not exist within the Auth0 user store or custom database connection.  In this case before Auth0 can set its own session it will call out to the external IdP to first verify the user's identity and will then set the Auth0 session.

When a user logs in to an application and does not have an active session with Auth0:

1. The application redirects the user to Auth0's Universal Login page.
2. The user either chooses the external IdP or Auth0 performs Home Realm Discovery.
3. The user is redirect to the external identity provider.
4. The external identity provider verifies the user identity and responds to Auth0 with an assertion or ID Token.
5. Auth0 verifies the assertion or ID Token and sets the session
6. The user is redirected back to your application with an new ID Token or assertion created by Auth0.
7. The application verifies the ID token or assertion and sets its own session.

## Protocols

### Security Assertion Markup Language & Web Services Federation

[Security Assertion Markup Language (SAML)](/protocols/saml) and [Web Services Federation (WS-Fed)](/protocols/ws-fed) are both protocols that are widely used in SSO implementations. Both SAML and WS-Fed exchange authentication data in XML format; the main parts of this exchange are the user, the identity provider, and the service provider.

With SAML or WS-Fed:

1. A user navigates to a protected endpoint of the service provider.
2. The service provider needs to confirm the users identity before proceeding so it sends an assertion request to the identity provider.
3. The identity provider verifies the user's session, and if valid, returns an assertion back to the service provider with <dfn data-key="claim">claims</dfn> to validate the user's identity.

### OpenID Connect

[OpenID Connect (OIDC)](/protocols/oidc) is an authentication protocol more commonly used in consumer-facing SSO implementations. The OIDC protocol handles authentication through [JSON Web Tokens (JWTs)](/tokens/jwt) and a central identity provider.

With OIDC:

1. A user navigates to a protected endpoint of the client.
2. The client needs to confirm the users identity before proceeding so redirects the user to the identity provider to verify the user's identity.
3. The identity provider verifies the user's session, and if successful, may prompt the user to grant data access to the client.
4. If access is granted, the identity provider returns an <dfn data-key="id-token">ID Token</dfn> back to the client with <dfn data-key="claim">claims</dfn> to validate the user's identity.

### Lightweight Directory Access Protocol + Active Directory

[Lightweight Directory Access Protocol (LDAP)](/protocols/ldap) is an application protocol used to access a directory of credentials that can be shared by multiple applications; it is commonly used by intranets. When paired with Active Directory (AD), LDAP provides a centralized location for user identity, so the application makes an authentication request to the LDAP/AD server. The LDAP protocol exchanges information in LDAP Data Interchange Format (LDIF).

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

#### Auth0's SSO Dashboard Extension

In B2E usecases it is common to provide your employee's with a centralized dashboard for launching applications that leverage your Enterprise SSO session.

Auth0's [SSO Dashboard Extension](/extensions/sso-dashboard), allows you to create a dashboard that lists multiple enterprise applications that can be enabled for SSO. This dashboard is then presented to your users to log in.
