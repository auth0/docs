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

For inbound <dfn data-key="single-sign-on">Single Sign-On (SSO)</dfn>, Auth0 is the SSO provider. When a user tries to access an application, the application presents the user with one or more external identity providers. The user selects one of the identity providers to authenticate with. Upon successful authentication, the user is returned to the application with an active session.

Inbound SSO in Auth0 is handled by [connections](/connections).

## Application sessions vs Auth0 SSO sessions

... [LINK](/LINK) ...

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
* OpenID Connect does not support identity provider-initiated SSO.