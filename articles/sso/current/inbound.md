---
title: Inbound Single Sign-On
description: Overview of Inbound Single Sign-on (SSO).
toc: true
topics:
  - sso
contentType:
  - index
  - concept
useCase:
  - integrate-saas-sso
---

# Inbound Single Sign-On

For inbound <dfn data-key="single-sign-on">Single Sign-On (SSO)</dfn> implementations, Auth0 is the SSO provider. 

When a user logs in to an application:

1. The application presents the user with one or more external identity providers.
2. The user selects an identity provider to authenticate with and logs in.
3. Upon successful authentication, the user is returned to the application with an active session.

Inbound SSO in Auth0 is handled by [connections](/connections).

## Auth0 SSO sessions vs. Application sessions

When users log in, various [session layers](/sessions/concepts/session-layers) can be created. For inbound SSO implementations, it's important to understand that the SSO experience is made possible by the Auth0 Session Layer, which is stored centrally on the Authorization Server. Leveraging this session layer, users can easily authenticate to different applications, each of which may have its own application session to track whether the user is logged into it specifically. 

For an example of session usage with SSO, see [Example: Application Sessions and SSO Sessions Workflow](/sessions/references/example-short-lived-session-mgmt).

## Build-Your-Own Implementations

## OIDC/OAuth

* [Social Identity Providers](/connections#social)
* [Add a generic OAuth2 Authorization Server to Auth0](/connections/social/oauth2)
* [Custom Social Connections Extension](/extensions/custom-social-extensions)

## SAML

* [SAML Identity Providers](/protocols/saml/identity-providers)
* [Auth0 as Service Provider](/protocols/saml/saml-sp-generic)
* [IdP-Initiated Single Sign-On](/protocols/saml/idp-initiated-sso)

## Limitations

* Native applications can only use [Universal Login](/universal-login).
* [OpenID Connect (OIDC)](/protocols/oidc) does not support identity provider-initiated SSO.