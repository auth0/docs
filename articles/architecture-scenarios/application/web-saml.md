---
order: 05
title: Regular Web App (using SAML)
image: /docs/media/articles/architecture-scenarios/web-saml.png
extract: Traditional web application which needs to authenticate users using SAML2
---

# Regular Web App (using SAML)

![](/media/articles/architecture-scenarios/web-saml.png)

In this scenario you have a traditional web application which needs to authenticate users using SAML2. The end result of the SAML flow after a user has successfully authenticated is a POST of the SAML Response (which contains SAML Assertions about the user) to a server-side endpoint (aka callback) in the Client. The Client therefore needs some SAML library that can process that response, validate the user, and create a local login session, which usually stored using one or more cookies.

**Note:** In this scenario an Access Token is also returned but it is rarely used since their is no API involved against which the user needs to be authenticated.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](https://auth0.com/docs/libraries/lock)
* [SAML](https://auth0.com/docs/saml-configuration)
