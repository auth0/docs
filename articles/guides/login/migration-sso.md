---
title: Migration in Embedded Login Scenarios with Single Sign-On
description: Learn how to migrate from old versions of Lock/Auth0.js when your application uses embedded login and requires Single Sign-on (SSO).
topics:
  - lock
  - migrations
  - sso
  - embedded-login
contentType:
    - concept
    - index
useCase: migrate
---

# Migration in Embedded Login Scenarios with Single Sign-On

Migration from legacy versions of Lock and Auth0.js is required. For <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> scenarios, it will imply moving to [Universal Login](/hosted-pages/login) in most cases. 

## Single-Page Apps

Single-Page Applications (SPAs) with embedded login can only achieve SSO if they are on the same top-level domain. If SPAs with embedded login which are on different domains require SSO, the websites will need to [migrate to Universal Login](/guides/login/migration-embedded-universal).

SSO works by having Auth0 set a cookie that identifies the session in the Auth0 server for a specific domain. 

In order to make embedded login work properly, you need to set up a [custom domain](/custom-domains) that matches your website's top level domain, so as to avoid [cross-origin authentication issues](/cross-origin-authentication#limitations). 

If two applications using embedded login are sitting on different top-level domains, they would need to point to two different custom domains in order implement embedded login properly. If they are on different domains, those domains cannot share the same SSO cookie, so you can’t implement SSO across those sites.

## Web Apps

Web Applications using embedded login that require SSO need to [migrate to Universal Login](/guides/login/migration-embedded-universal). 

The proper way of implementing embedded login for web applications is by creating a custom form that POSTs credentials to the web application. The web application then validates them with Auth0 using the [/oauth/token endpoint](/api-auth/tutorials/password-grant). 

This approach does not allow for the creation of an SSO session, as the Auth0 server cannot set a cookie in the end-user’s browser. It also prevents Auth0 from performing [Anomaly Detection](/anomaly-detection).
