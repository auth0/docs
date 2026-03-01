---
url: /api-auth/tutorials/adoption
title: OIDC Conformant Authentication Adoption Guide
topics:
  - api-authentication
  - oidc
contentType: concept
useCase:
  - secure-api
  - call-api
---

# OIDC Conformant Authentication Adoption Guide

Auth0 is a [certified OpenID Connect (OIDC) provider](http://openid.net/certification/), but not all Auth0 documentation and features conform to the [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html).

As part of our efforts to improve security and standards-based interoperability, we are rolling out new features exclusively on authentication flows that strictly conform to specifications. The first of these features is [API Authentication and Authorization](/api-auth), which is available today.

This guide details all the upcoming changes, **some of which will be breaking**, and provides suggestions on how to adapt your existing applications.

## Who is this guide for?

This guide is meant for developers and IT admins who manage Auth0 integrations in their applications. If you are not familiar with how OAuth works at a basic level, [we suggest reading our protocol overview](/protocols/oauth2).

If you are integrating Auth0 as a [SAML or WS-Federation **identity provider**](/saml-idp-generic) for your application (that is, not through OIDC/OAuth), then you do not need to make any changes.

To make this guide accessible to everyone, any authentication flows will be described only through HTTP requests instead of in the context of any particular language or library's implementation. This is the similar to the descriptions and examples provided by the [official OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html).

## Terminology

All of the changes described in this guide apply to the **OIDC Conformant Authentication Pipeline**. This pipeline will be used if **any** of the following are true:

-   An [authentication request](/api/authentication#social) was initiated with an <dfn data-key="audience">`audience`</dfn> parameter.

-   The application being used is flagged as **OIDC Conformant** (available at _Dashboard > Applications > Settings > Show advanced settings > OAuth > OIDC Conformant flag_).

If none of these conditions are met, the **legacy authentication pipeline** will be used, and everything will keep working as usual.

## My application works just fine, why should I update?

Any new Auth0 features, examples and documentation moving forward will target only the OIDC-conformant pipeline. All Auth0 SDK versions that depend on the legacy pipeline are deprecated and will not receive updates for new features or non-critical security issues, and will eventually be discontinued.

The new features provided by the OIDC-conformant pipeline include:

* [Create third-party applications for your APIs and display consent dialogs for authorization](/api-auth/user-consent)
* Restrict the user profile information provided to applications upon authentication
* [OIDC Dynamic Client Registration](/api-auth/dynamic-client-registration)

## Is there a deadline to adopt these new features?

We understand that making changes to the core authentication logic of your application is not something that you want to do every day, and that any changes need to be thoroughly tested. Because of this, we are not setting a deadline to make changes at this time. Instead, both authentication pipelines (OIDC-conformant and legacy) will be usable until further notice.

All Auth0 documentation, SDKs, libraries and samples will eventually apply only to the OIDC-conformant pipeline. Because of this, we strongly recommend adoption even if you do not need to leverage any new features or functionality in the near future.

## Keep reading

<%= include('./_index.md') %>
