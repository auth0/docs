---
order: 07
title: Business to Business + Enterprise Identity Scenarios
image: /media/articles/architecture-scenarios/b2b-b2e.png
extract: This is essentially a hybrid between B2B and B2E where you have a larger SAAS application, like Zendesk for example, where users are grouped into companies.
description: Explains the architecture scenario of a hybrid between B2B and B2E where you have a larger SAAS application.
beta: true
---

# Business to Business + Enterprise Identity Scenarios

::: note
This architecture scenario is under construction and will be updated soon.
:::

![](/media/articles/architecture-scenarios/b2b-b2e.png)

This is essentially a hybrid between B2B and B2E where you have a larger SAAS application, like Zendesk for example, where users are grouped into companies. But you also have internal users (employees) who also log into the application, usually to perform support or administrative tasks.Those internal users will typically use federated identity to authenticate.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](https://auth0.com/lock)
* [Identity Protocols supported by Auth0](/protocols)
* [Integrating a Web App with Auth0](/oauth-web-protocol)
* [Connect Active Directory with Auth0](/connections/enterprise/active-directory)
* [SAML](/saml-configuration)
* [Using Auth0 in SaaS, multi-tenant Apps](/saas-apps)
* [Identity Providers supported by Auth0](/identityproviders)
* [Social Login](https://auth0.com/learn/social-login/)
* [Auth0 SSO Dashboard (sample)](https://github.com/auth0-samples/auth0-sso-dashboard)
