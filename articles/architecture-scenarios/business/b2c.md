---
order: 01
title: Business to Consumer Idenity Scenarios
image: /docs/media/articles/architecture-scenarios/b2c.png
extract: Usually eCommerce or SAAS applications which have end users (consumers) as customers and the application typically used OpenID Connect as a protocol to communicate with Auth0.
description: Explains the architecture scenario B2C with an eCommerce or SAAS application.
---

# Business to Consumer Idenity Scenarios

![](/media/articles/architecture-scenarios/b2c.png)

Usually eCommerce or SAAS applications which have end users (consumers) as customers and the application typically used OpenID Connect as a protocol to communicate with Auth0.

Users are created and stored with a Database connection (username/password) which they can then later use to log in, or alternatively users can use a social connection such as Facebook, Twitter, Google, etc to log in. Passwordless connections are also common with B2C.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](https://auth0.com/lock)
* [Identity Protocols supported by Auth0](/protocols)
* [Integrating a Web App with Auth0](/oauth-web-protocol)
* [Database Identity Providers](/connections/database)
* [Import users to Auth0](/connections/database/migrating)
* [Social Login](https://auth0.com/learn/social-login/)
* [Passwordless](/connections/passwordless)
