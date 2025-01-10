---
description: Understand how OIDC Single Sign-On occurs when a user logs into one app and is then signed into other apps automatically. 
topics:
  - api-authentication
  - oidc
  - sso
contentType: concept
useCase:
  - secure-api
  - call-api
---

# OIDC Single Sign-On

<%= include('./_about.md') %>

<dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> occurs when a user logs into one application and is then signed into other applications automatically.

In the context of the OIDC-conformant authentication pipeline, SSO must happen at the authorization server (i.e. Auth0) and not applications.

This means that for SSO to happen, you must employ <dfn data-key="universal-login">Universal Login</dfn> and redirect users to the login page.

## How it works

At a general level, this is what happens when performing SSO:

1. If the user is not logged in locally, redirect them to Auth0 for authentication. This is done using the [Authorization Code Flow](/flows/concepts/auth-code) or [Implicit Flow](/flows/concepts/implicit), depending on the type of application.
2. If the user was logged in through SSO, Auth0 will immediately authenticate them without needing to re-enter credentials.

An application that does not use SSO might decide to use embedded login to authenticate users instead of redirecting to Auth0 for authentication.

## Determining if users are logged in via SSO

An application can easily determine if a user is logged in locally by checking the validity of a local ID Token or session cookie.
However, in some cases your application might need to determine if the user has a valid SSO session at Auth0.
In the legacy authentication pipeline, this could be achieved by using the `/ssodata` endpoint, which would return information about the user's SSO session.
OIDC-conformant applications must use [silent authentication](/api-auth/tutorials/silent-authentication), which either re-authenticates a user if they are already logged in, or returns an error if they need to authenticate.

## Authentication flows without SSO

SSO [sessions](/sessions) are managed by Auth0 setting a cookie on your Auth0 domain.
Since cross-origin requests cannot set cookies, this means that SSO sessions must be established by redirecting users to your Auth0 login page (`/authorize`).

The following flows are redirect-based and are capable of SSO:

* [Authorization Code Flow](/flows/concepts/auth-code)
* [Implicit Flow](/flows/concepts/implicit)

The following flows are request-based and are currently not capable of SSO:

* [Password credentials and realm grants](/api-auth/grant/password)

## Custom domains

When using Universal Login, the login page is by default hosted at an Auth0 domain, so any SSO will be performed at an Auth0 domain instead of your organization's domain.

This is only an aesthetic limitation and does not impact the security or functionality of SSO logins in any way.

## Keep reading

* [Custom Domains](/custom-domains)
* [OIDC Handbook](https://auth0.com/resources/ebooks/the-openid-connect-handbook)
