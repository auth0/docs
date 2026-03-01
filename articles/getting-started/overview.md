---
title: Auth0 Overview
description: Learn what Auth0 is and how you can use it.
toc: true
topics:
  - auth0-101
  - auth0-overview
contentType: concept
useCase:
  - strategize
  - get-started
---
# Auth0 Overview

Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users. 

You can connect any application (written in any language or on any stack) to Auth0 and define the identity providers you want to use (how you want your users to log in). 

Based on your app's technology, choose one of our SDKs (or call our API), and hook it up to your app. Now each time a user tries to authenticate, Auth0 will verify their identity and send the required information back to your app.

## Why use Auth0?

Take a look at just a few of Auth0's use cases:

- You built an awesome app and you want to add user authentication and authorization. Your users should be able to log in either with username/password or with their social accounts (such as Facebook or Twitter). You want to retrieve the user's profile after the login so you can customize the UI and apply your authorization policies.
- You built an API and you want to secure it with [OAuth 2.0](/protocols/oauth2).
- You have more than one app, and you want to implement <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>.
- You built a JavaScript front-end app and a mobile app, and you want them both to securely access your API.
- You have a web app which needs to authenticate users using <dfn data-key="security-assertion-markup-language">Security Assertion Markup Language (SAML)</dfn>.
- You believe passwords are broken and you want your users to log in with one-time codes delivered by email or SMS.
- If one of your user's email addresses is compromised in some site's public data breach, you want to be notified, and you want to notify the users and/or block them from logging in to your app until they reset their password.
- You want to act proactively to block suspicious IP addresses if they make consecutive failed login attempts, in order to avoid DDoS attacks.
- You are part of a large organization who wants to federate their existing enterprise directory service to allow employees to log in to the various internal and third-party applications using their existing enterprise credentials.
- You don't want (or you don't know how) to implement your own user management solution. Password resets, creating, provisioning, blocking, and deleting users, and the UI to manage all these. You just want to focus on your app.
- You want to enforce <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> when your users want to access sensitive data.
- You are looking for an identity solution that will help you stay on top of the constantly growing compliance requirements of SOC2, GDPR, PCI DSS, HIPAA, and others.
- You want to use analytics to track users on your site or application. You plan on using this data to create funnels, measure user retention, and improve your sign-up flow.

## Which industry standards does Auth0 use?

Once upon a time, when computers were standalone systems, all the authentication and user data lived in a single machine. Times have changed, and now you can use the same login information across multiple apps and sites. This has been achieved through widespread adoption of identity industry standards across the web.

These are a set of open specifications and protocols that specify how to design an authentication and authorization system. They specify how you should manage identity, move personal data securely, and decide who can access applications and data.

The identity industry standards that we use here in Auth0 are:

- **Open Authorization (OAuth) 1**: the original standard for access delegation. Used as a way for a user to grant websites access to their information on other websites or apps, but without giving them the credentials.
- **Open Authorization (OAuth) 2**: an authorization standard that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials. You use this standard every time you log in to a site using your Google account and you are asked if you agree with sharing your email address and your contacts list with that site.
- <dfn data-key="openid">**OpenID Connect (OIDC)**</dfn>: an identity layer that sits on top of OAuth 2 and allows for easy verification of the user's identity, as well the ability to get basic profile information from the identity provider.
- **JSON Web Tokens (JWT)**: an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- **Security Assertion Markup Language (SAML)**: an open-standard, XML-based data format that allows businesses to communicate user authentication and authorization information to partner companies and enterprise applications their employees may use.
- **WS-Federation (WS-Fed)**: a standard developed by Microsoft, and used extensively in their applications. It defines the way security tokens can be transported between different entities to exchange identity and authorization information.

## Keep reading

::: next-steps
- [Learn the basics and familiarize yourself with identity terminology](/getting-started/the-basics)
- [Read about different deployment models offered by Auth0](/getting-started/deployment-models)
:::
