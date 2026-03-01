---
order: 05
title: Regular Web App (using SAML)
image: /media/articles/architecture-scenarios/web-saml.png
extract: Traditional web application which needs to authenticate users using SAML2
description: Learn about an architecture scenario that involves using a traditional web application to authenticate users using SAML2.
beta: true
topics:
    - architecture
    - regular-web-apps
    - api-auth
    - lockjs
    - saml
contentType: concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# Regular Web App (using SAML)

::: note
This architecture scenario is under construction.
:::

![](/media/articles/architecture-scenarios/web-saml.png)

In this scenario, you have a traditional web application that needs to authenticate users using <dfn data-key="security-assertion-markup-language">SAML2</dfn>. After a user has successfully authenticated using the SAML flow, the Authorization Server POSTs the SAML Response (which contains SAML Assertions about the user) to a server-side endpoint (aka callback) in your application. Therefore, your application needs a SAML library that can process that response, validate the user, and create a local login session, which is usually stored using one or more cookies.

::: note
In this scenario, an Access Token is also returned, but it is rarely used because no API exists against which the user needs to be authenticated.
:::

::: warning
If you are using Auth0 as a SAML Identity Provider (IdP) and are processing SAML responses in your own code, you will need to verify whether the libraries you use are vulnerable to SAML exploits.
:::

## Read More

* Learn how to implement login for this scenario using [Universal Login](/universal-login) or [Lock](/libraries/lock)
* Learn about [SAML](/saml-configuration)
