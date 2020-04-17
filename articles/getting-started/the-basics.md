---
title: Learn the Basics
description: Learn the basics of Auth0 and familiarize yourself with our terminology.
toc: true
topics:
  - auth0-101
  - auth0-basics
contentType: concept
useCase:
  - development
  - strategize
  - get-started
---

# Learn the Basics

Often, the biggest barrier to learning new things, especially in the tech industry, is terminology. The words that are used to describe things can cause problems when you try to understand new concepts. This document explains some of the basic terminology we use at Auth0 and maps these terms to concepts you are already familiar with. We also have a handy [glossary](/glossary).

::: panel TL;DR
This article uses an example to introduce some core concepts of Auth0: **accounts**, **tenants**, **domains**, **applications**, and **connections**. If you already know what these are in the context of Auth0, you can safely skip reading it.

We will use a very simple example: A company named `Example-Co` wants to use Auth0 for authentication. They have a web app and a mobile app, and they want their users to be able to log in with username/password, Google, or GitHub.
:::

## Account and tenants

If you haven't already, [sign up](https://auth0.com/signup) for an Auth0 account (it's free!). You can use a username and password or log in with a social provider (like Facebook, Google, or Apple). Once you create your account, you will be asked to create a tenant. 

The term *tenant* is borrowed from the concept of [software multitenancy](https://en.wikipedia.org/wiki/Multitenancy), which refers to an architecture where a single software instance serves multiple tenants. At Auth0, a tenant is a logically-isolated group of users who share common access with specific privileges. No tenant can access the data of another tenant, even though multiple tenants might be running on the same machine.

The name you give your Auth0 tenant is very important because we will use it for your *domain*, and you **can't change it after it is created**. The name must

- be between 3 and 64 characters long
- consist of **only** lowercase, alphanumeric characters and hyphens ("-")
- not begin or end with a hyphen

You can create more than one tenant; in fact, we encourage you to do so for each environment you have (for example, development, staging, and production). At any time, you can create additional tenants using the Auth0 Dashboard: Just click on your tenant name in the upper right to display the pulldown menu, and then click **Create Tenant**. This is another reason why it's important to plan your tenant names. 

## Domains

When you create a new account with Auth0 and choose a name for your tenant, a regional subdomain (like `auth0.com`) will be appended to your tenant name. The result is your Auth0 *domain*, which is the base URL you will use to access our API and the URL where your users are redirected to authenticate. 

Auth0 supports three regional subdomains: 

- `auth0.com` for the Americas
- `eu.auth0.com` for Europe
- `au.auth0.com` for Australia

When you create your tenant, you will be asked for the region you want to use. This choice affects which regional subdomain will be assigned to you and where your data will be hosted. For example, if you pick the Americas, then the name format will be `YOUR-TENANT-NAME.auth0.com`; for Europe, it will be `YOUR-TENANT-NAME.eu.auth0.com`; and so forth. In our example, the owner of `Example-Co` picked the name `example-co` and chose the Americas as their region. Therefore, their domain is `example-co.auth0.com`.

Alternatively, you can use [custom domains](#custom-domains) (which we highly recommend for a production environment), like `example-co.com`. (This option requires an additional cost.) Using a custom domain gives your users the most secure and seamless experience. If you have a [**single-tenant** implementation](/private-cloud), you can deploy your custom domain in either the cloud managed by Auth0 or an AWS cloud that you manage. To learn more, see [Custom Domains](/custom-domains). 

## Application

Now that you have an account and a tenant, we need to know how your app(s) will be using our services. To that end, you must register each application in the Dashboard. We use the term *application* in the same way that [OAuth 2.0](https://tools.ietf.org/html/rfc6749#page-6) does.

When you register an application in the [Dashboard](${manage_url}/#/applications), the first piece of information we ask for is its type. This can be one of the following:

![Application Types](/media/articles/getting-started/client-types.png)

Each application is assigned a **Client ID** upon creation. This is an alphanumeric that serves as the unique identifier for your application (such as `q8fij2iug0CmgPLfTfG1tZGdTQyGaTUA`). The Client ID **cannot be modified**, and you will use it in your application's code when you call Auth0 APIs.

Another important piece of information is the **Client Secret**. Think of it as your application's password, which **must be kept confidential at all times**. If anyone gains access to your Client Secret, they can impersonate your application and access protected resources.

In our example, `ExampleCo` has two apps: a web app (running on a server) and a mobile app. They would register two applications: one of type `Regular Web Applications` and one of type `Native`.

TO learn more about Applications, see [Applications](/applications). To see some examples for different types of apps, see [Set Up an App](/getting-started/set-up-app).

## Connection

Now that you have set up your applications, you are ready to configure how your users will log in. Auth0 sits between your app and the identity provider that authenticates your users (such as Google or Facebook). Through this level of abstraction, Auth0 keeps your app isolated from any changes of the provider's implementation. The relationship between Auth0 and the identity provider is referred to as a **Connection**.

Connections are sources of users and they can be of the following types:

- [Database connections](/connections/database): Users log in with username and passwords stored either in the Auth0 cloud or your own database
- [Social logins](/connections/identity-providers-social): Google, Facebook, Twitter, and more
- [Enterprise directories](/connections/identity-providers-enterprise): LDAP, G Suite, Office 365, ADFS, AD, <dfn data-key="security-assertion-markup-language">SAML-P</dfn>, WS-Federation, and more
- <dfn data-key="passwordless">[Passwordless systems](/connections/passwordless)</dfn>: Users log in with one-time codes, sent via SMS or email

You can share a connection among multiple applications, and you can configure any number of connections, then choose which of them to enable for each application.

In our example, `ExampleCo` wants their users to be able to log in with username/password, Google, and GitHub from the web app and from the mobile app. Therefore, they would need to:

1. [Configure a GitHub connection](/connections/social/github)
2. [Configure a Google connection](/connections/social/google)
3. [Configure a database connection](/connections/database)
4. Enable all three connections for the web app
5. Enable all three connections for the mobile app

To learn more about supported identity providers, see [Identity Providers Supported by Auth0](/identityproviders). To learn how to enable connection for an application, see [Set Up Social Connections](/dashboard/guides/connections/set-up-connections-social) and [Set Up Database Connections](/dashboard/guides/connections/set-up-connections-database).

## Where to go from here

To learn more about the next steps when setting up Auth0, you can read more:

- **Hook Auth0 up to your app**: Assuming that your app has a login and a logout button, you need to add some code to your app to invoke Auth0 APIs each time your user clicks one of these buttons. To explore details and examples, see one of our [quickstarts](/quickstarts). You can also directly call our API to [log a user in](/api/authentication#login) or [log a user out](/api/authentication#logout), or use one of Auth0's [libraries and SDKs](/libraries).

- **Migrate your users to Auth0**: If you already have a user store, you will need to migrate your users to Auth0 before you go live. To learn more, see [User Migration](/users/concepts/overview-user-migration). Alternatively, you can [connect your app to your own user database](/connections/database/custom-db) and access it via Auth0.

## Keep reading

- [Auth0 APIs](/api/info): Learn about Auth0 APIs.
- [Set Up an API](/getting-started/set-up-api): Learn how to configure your own API with Auth0.
- [Auth0 Libraries & SDKs](/libraries): Learn about our libraries and SDKs.
- [Manage Users](/users): Learn about working with users and user profiles in Auth0.
