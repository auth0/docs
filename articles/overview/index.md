---
toc: true
description: Learn the basics of Auth0 including how it can help secure your application, how you can extend Auth0 to meet the exact needs of your project, and about the flexible deployment options in both the cloud and even your own datacenter.
tags:
    - auth0-101
    - overview
---
# Auth0 Overview

Auth0 is a service that abstracts how users authenticate to applications.

![](/media/articles/overview/overview.png)

You can connect any application (written in any language or on any stack) to Auth0 and define its [connection](/connections), the method used to authenticate the users of that application:

* [Custom credentials](/connections/database): username + passwords
* [Social network logins](/identityproviders#social): Google, Facebook, Twitter, and any OAuth2, OAuth1 or OpenID Connect provider
* [Enterprise directories](/identityproviders#enterprise): LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, etc.
* [Passwordless systems](/connections/passwordless): One time codes on SMS, or email

## Video: Developer Overview

This video will give you a walkthrough of Auth0 and how it will help save you time adding identity to your application.

<%= include('../videos/_video', { id: 's15ysw45uy' }) %>

## Integrate Auth0 with your Application

The default [protocol](/protocols) between your application and Auth0 is [OpenID Connect](/protocols/oidc), a modern, lightweight, simple to use, and simple to integrate protocol.

<%= include('../_includes/_pipeline2') %>

Auth0 ships [SDKs for all major platforms](/support/matrix#sdks) (.NET, Java, PHP, Python, node, iOS, and many more), but the use of Auth0 SDKs is not required. Virtually anything able to send HTTP requests can integrate with Auth0.

Auth0 also supports other common identity protocols, such as [WS-Federation](/protocols/ws-fed) and [SAML](/protocols/saml). Applications that are already "claims enabled" can easily connect to Auth0.

## Access your APIs

Auth0's [API authorization](/api-auth) features allow you to manage the authorization requirements for server-to-server and application-to-server applications, using the [OAuth 2.0 protocol](/protocols/oauth2). Using Auth0, you can easily support [different flows](/api-auth/which-oauth-flow-to-use) in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

## An Extensible Platform

Auth0 offers several ways to extend the platform's functionality:

- **Rules**: [Rules](/rules) are functions written in JavaScript or C#, that are executed in Auth0 just after successful authentication and before control returns to your app. Rules can be chained together for modular coding and can be turned on and off individually. They can be used for Access Control, Webhooks, Profile Enrichment, Multi-factor Authentication, and many other things.

- **Hooks**: [Hooks](/hooks) allow you to customize the behavior of Auth0 using Node.js code that is executed against extensibility points (which are comparable to webhooks that come with a server). They are [Webtasks](https://webtask.io) associated with specific [extensibility points](/hooks/extensibility-points) of the Auth0 platform. Auth0 invokes the Hooks at runtime to execute your custom logic. Hooks will eventually replace Rules, the current Auth0 extensibility method. Currently, you can use both Hooks and Rules, but Auth0 will implement new functionality in Hooks.

- **Extensions**: [Auth0 Extensions](/extensions) enable you to install applications or run commands/scripts that extend the functionality of the Auth0 base product. You can either use one of the [pre-defined extensions](/extensions#using-an-auth0-provided-extension), provided by Auth0, or [create your own](/extensions#creating-your-own-extension). Some of the actions you can do with extensions are manage the authorizations for users (using groups, roles and permissions), import/export users, export logs to other services, deploy scripts from external repositories, and more.

## Deployment Models

Auth0 is a service usually running in the cloud, but it can also be deployed in **Private Instances** (PI). PIs are dedicated installations of Auth0. You may choose to run PIs in Auth0's datacenters (which are separate from those that run the multi-tenant services), in your own cloud hosting environments (e.g. AWS, Azure, Rackspace, DigitalOcean), or even [on-premises](/appliance).

## Domain Names

The public, multi-tenant cloud service version of Auth0 supports a domain name based off of `auth0.com`. Auth0 assigns Applications deployed using this service a domain name in one of the two formats:

* `{account-name}.auth0.com`
* `{account-name}.{location}.auth0.com`

For example, if your company is **My Company**, you would receive some or all of the following addresses:

```
mycompany.auth0.com
mycompany.eu.auth0.com
mycompany.au.auth0.com
```

::: note
With the Auth0 public cloud service, the `*.auth0.com` endpoints are only used for authentication and the API, *not* user access to your Application.
:::

You may choose to use a custom domain name that obscures the Auth0 reference, such as `mycompany.com`. Using a custom domain name requires a *single-tenant* implementation of Auth0, which can be deployed in one of three locations:

* The Auth0-managed cloud
* A customer-managed cloud
* An on-premise installation

Due to the additional features offered by these three options, these deployment options do come with a higher cost.

If you are unable to use a multi-tenant cloud service due to compliance or other policy requirements, please take a look at [the PSaaS Appliance](/appliance).
