---
title: Authentication
description: Understand how authentication works in your CIAM implementation.
toc: true
topics:
    - b2c
    - ciam
    - authentication
    - universal-login
contentType: concept
useCase:
    - authentication
---
# Authentication

<%= include('../_includes/_authentication-intro.md') %>

<%= include('../_includes/_bp-authentication.md') %>

<%= include('../_includes/_authentication-design-considerations.md') %>

<%= include('../_includes/_authentication-design-considerations2.md') %>

## Universal Login

<%= include('../_includes/_authentication-universal-login.md') %>

## Username and password authentication

<%= include('../_includes/_authentication-username-password.md') %>

<%= include('../_includes/_bp-credentials-only-auth.md') %>

## Social authentication

The “bring your own identity” scenario offered by Facebook, Google, etc., is a valuable way of simplifying the user authentication experience without compromising security, and using [Universal Login](#universal-login) makes it easy to start adding support for [Social Connections](https://auth0.com/docs/identityproviders#social) with minimal disruption. 

::: warning
Auth0 provides a simple way to test social connections using [pre-configured developer keys](https://auth0.com/docs/connections/social/devkeys). However these have [limitations] (https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys), and before going into production, you’ll need to set up your own application-specific keys by following the [instructions] (https://auth0.com/docs/identityproviders#social) for your chosen social provider(s).
:::

With [Social Login](https://auth0.com/learn/social-login/), user identities and credentials are managed by the social provider, as well as claims - which Auth0 will use this information to populate the user [profile](/architecture-scenario/b2c/b2c-profile-mgmt). Auth0 can also provide access to Social Identity Providers (Social IdP) [Access tokens](https://auth0.com/docs/tokens/overview-idp-access-tokens), so that your application can also call 3rd party Social IdP APIs on behalf of the user.  

::: panel Best Practice
Social is a great feature to provide, but when you offer more than one way to sign-in, you need to consider the possibility that your customers will actually use more than one way to sign-in. By default, every user identity in Auth0 has its own user profile, so you’ll probably want to consider Auth0's capability to [Link User Accounts](https://auth0.com/docs/link-accounts) (a.k.a. Account Linking) to provide an effective way of associating one user profile with multiple identities.
:::

The Auth0 [Custom Social Connections extension](https://auth0.com/docs/extensions/custom-social-extensions) extends social authentication even further by allowing you to connect with any OpenID Connect ([OIDC](/protocols/oidc)) 3rd-party compliant vendor not supported out-of-box. For example, support for the government-issued-identity provider [SwissID](https://www.swissid.ch/) can be configured in Auth0 by using a Custom Social Connection and by following the guidance described in our [SwissID blog post](https://auth0.com/blog/configuring-swissid-login-into-custom-applications/). 

## Anomaly detection

<%= include('../_includes/_authentication-anomaly-detection.md') %>

::: panel Best Practice
Anomaly detection is handled behind the scenes by Auth0 and provides a great security feature for your product. If you're going to utilize it, ensure that you have set up your [Email Provider](/architecture-scenarios/b2c/b2c-operations#email-provider-setup) and configured your [Email Templates](/architecture-scenarios/b2c/b2c-branding#email-template-customization) before turning on email delivery to your users.
:::

## Application integration

<%= include('../_includes/_authentication-application-integration.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Branding](/architecture-scenarios/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/b2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
