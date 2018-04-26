---
order: 05
title: Regular Web App (using SAML)
image: /media/articles/architecture-scenarios/web-saml.png
extract: Traditional web application which needs to authenticate users using SAML2
description: Explains the architecture scenario of using a traditional web application to authenticate users using SAML2.
beta: true
---

# Regular Web App (using SAML)

::: note
This architecture scenario is under construction and will be updated soon.
:::

![](/media/articles/architecture-scenarios/web-saml.png)

In this scenario you have a traditional web application which needs to authenticate users using SAML2. The end result of the SAML flow after a user has successfully authenticated is a POST of the SAML Response (which contains SAML Assertions about the user) to a server-side endpoint (aka callback) in the Application. The Application therefore needs some SAML library that can process that response, validate the user, and create a local login session, which usually stored using one or more cookies.

::: note
In this scenario an Access Token is also returned but it is rarely used since their is no API involved against which the user needs to be authenticated.
:::

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](/libraries/lock)
* [SAML](/saml-configuration)
