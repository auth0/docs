---
order: 02
title: B2B
image: /docs/media/articles/architecture-scenarios/b2b.png
extract: In this scenario you usually have a larger SAAS application, like Zendesk for example, where their customers are typically other companies which are registered as tenants.
---

# B2B

![](/media/articles/architecture-scenarios/b2b.png)

In this scenario you usually have a larger SAAS application, like Zendesk for example, where their customers are typically other companies which are registered as tenants. Each of these companies (also referred to as tenants) will have their own set of users who can access the information of that tenant on the SAAS application.

When a tenant is smaller, these users can be stored and authenticated with a Database connection (username/password). Some of the tenants may also be large enterprise companies who wants federate their enterprise directory so they can manage their own users and the users can log in with their existing enterprise credentials.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](https://auth0.com/lock)
* [Identity Protocols supported by Auth0](https://auth0.com/docs/protocols)
* [Integrating a Web App with Auth0](https://auth0.com/docs/oauth-web-protocol)
* [Using Auth0 in SaaS, multi-tenant Apps](https://auth0.com/docs/saas-apps)
* [Identity Providers supported by Auth0](https://auth0.com/docs/identityproviders)
* [Connect Active Directory with Auth0](https://auth0.com/docs/connections/enterprise/active-directory)
* [Social Login](https://auth0.com/learn/social-login/)
