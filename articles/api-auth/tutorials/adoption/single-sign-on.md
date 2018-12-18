---
title: OIDC Single sign-on
topics:
  - api-authentication
  - oidc
  - sso
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Single sign-on

<%= include('./_about.md') %>

Single sign-on (SSO) occurs when a user logs in to one application and is then signed in to other applications automatically.

In the context of the OIDC-conformant authentication pipeline, SSO must happen at the authorization server (i.e. Auth0) and not applications.

This means that for SSO to happen, you must employ [Universal Login](/hosted-pages/login) and redirect users to the login page.

We are planning on providing support for SSO from applications in future releases.

## How SSO works

At a general level, this is what happens when performing SSO:

1. If the user is not logged in locally, redirect them to Auth0 for authentication. This is done using the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow) or [Single-Page Login Flow](/flows/concepts/single-page-login-flow), depending on the type of application.
2. If the user was logged in through SSO, Auth0 will immediately authenticate them without needing to re-enter credentials.

An application that does not use SSO might decide to use embedded login to authenticate users instead of redirecting to Auth0 for authentication.

## Determining if users are logged in via SSO

An application can easily determine if a user is logged in locally by checking the validity of a local ID Token or session cookie.
However, in some cases your application might need to determine if the user has a valid SSO session at Auth0.
In the legacy authentication pipeline, this could be achieved by using the `/ssodata` endpoint, which would return information about the user's SSO session.
OIDC-conformant applications must use [silent authentication](/api-auth/tutorials/silent-authentication), which either re-authenticates a user if they are already logged in, or returns an error if they need to authenticate.

## Authentication flows without SSO

SSO sessions are managed by Auth0 setting a cookie on your Auth0 domain.
Since cross-origin requests cannot set cookies, this means that SSO sessions must be established by redirecting users to your Auth0 login page (`/authorize`).

The following flows are redirect-based and are capable of SSO:

* [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow)
* [Single-Page Login Flow](/flows/concepts/single-page-login-flow)

The following flows are request-based and are currently not capable of SSO:

* [Password credentials and realm grants](/api-auth/grant/password)

## Custom domains

When using Universal Login, the login page is by default hosted at an Auth0 domain, so any SSO will be performed at an Auth0 domain instead of your organization's domain.

This is only an aesthetic limitation and does not impact the security or functionality of SSO logins in any way.

You can read further about [customizing your domain](/custom-domains) if you require it, to help maintain a uniform experience for your users.
