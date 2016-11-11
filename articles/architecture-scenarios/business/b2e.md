---
order: 03
title: Business to Enterprise Identity Scenarios
image: /media/articles/architecture-scenarios/b2e.png
extract: Large organization who wants to federate their existing enterprise directory service to allow employees to log in to applications using their existing enterprise credentials.
description: Explains the architecture scenario of B2E with a large organization that wants to extend their existing enterprise directory service.
---

# Business to Enterprise Identity Scenarios

![](/media/articles/architecture-scenarios/b2e.png)

In this scenario you have a large organization who wants to federate their existing enterprise directory service to allow employees to log in to the various internal, as well as 3rd party applications, using their existing enterprise credentials.

The 3rd party applications will typically be configured to use SAML as a protocol to communicate with Auth0, whereas the internal applications will more typically use OpenID Connect to communicate with Auth0.

Since there are usually multiple configured applications, SSO (single sign-on) is important. Often times some sort of dashboard UI is used to host shortcuts to all the applications that a given user has access to. In that case, users typically first log into the dashboard and then jump to the various applications they wish to use, and each jump uses SSO to facilitate automatic login.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](https://auth0.com/lock)
* [Identity Protocols supported by Auth0](/protocols)
* [Integrating a Web App with Auth0](/oauth-web-protocol)
* [Connect Active Directory with Auth0](/connections/enterprise/active-directory)
* [SAML](/saml-configuration)
* [What is SSO (Single Sign On)?](/sso)
* [Auth0 SSO Dashboard (sample)](https://github.com/auth0-samples/auth0-sso-dashboard)

