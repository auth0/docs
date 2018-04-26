---
title: Learn the Basics
description: Learn the basics of Auth0 and familiarize yourself with the terminology
toc: true
---
# Learn the Basics

Often, the biggest barrier to learning new things, especially in the tech industry, is terminology. The words that are used to describe things can cause problems when you try to understand new concepts. This document explains some of the basic terminology we use here at Auth0, and maps these terms to concepts you are already familiar with.

::: panel TL;DR
This article uses an example to introduce some core concepts of Auth0: **accounts**, **tenants**, **domains**, **applications**, and **connections**. If you already know what these are (in the context of Auth0) you can safely skip reading it.

We will use a very simple example: A company named `Example-Co` wants to use Auth0 for authentication. They have a web app and a mobile app, and they want their users to be able to login with username/password, Google, or GitHub.
:::

## Account and tenants

If you haven't already signed up for an Auth0 **account**, do so (it's free). You can either use username/password or log in with a social provider (GitHub, Google, or Microsoft).

Once you create your account you will be asked to create a **Tenant**. This is a **logical isolation unit**.

The term is borrowed from "software multitenancy". This refers to an architecture where a single instance of the software serves multiple tenants. No tenant can access the instance of another tenant, even though the software might be running on the same machine (hence the logical isolation).

Some characteristics:

- The tenant name has to be unique (we will see in the next paragraph that it is used to create your own personal domain).
- The tenant name cannot be changed after creation.
- You can create more than one tenant; in fact, you are encouraged to do so for each environment you have (such as Development, Staging, or Production).
- If you chose to host your data in Europe or Australia, then your tenant will have a suffix (`eu` or `au`). In our example, if `Example-Co` picked the name `example-co`, then depending on where the data is stored, the tenant name would be `example-co-eu` or `example-co-au`.

## Domain

As discussed in the previous section, when you create a new account with Auth0, you are asked to pick a name for your **Tenant**. This name, appended with `auth0.com`, will be your Auth0 **Domain**. It's the base URL you will be using when you want to access our API (for example, to authenticate a user). The name format is `TENANT-NAME.auth0.com` (you get to pick the `TENANT-NAME` part).

In our example, `Example-Co` picked the name `example-co`; hence their domain is `example-co.auth0.com`.

::: panel Custom Domains
You can use a custom domain, such as `example-co.com`. This comes with an additional cost. This feature is in beta for **public-cloud tenants** (see the [Custom Domains](/custom-domains) documentation for details). If you have a **single-tenant** implementation, you can deploy your custom domain in one of three locations:
- The cloud managed by Auth0
- A cloud managed by you
- An [on-premise installation](/appliance)
:::

## Application

Now that you have an account, we need to know about your app(s) that will be using our services. To that end, you must register each application. We use the term **application** to refer to an application (like [OAuth 2.0 does](https://tools.ietf.org/html/rfc6749#page-6)).

When you create an application in the [Dashboard](${manage_url}/#/applications), the first piece of information we ask for is its type. This can be one of the following.

![Application Types](/media/articles/getting-started/client-types.png)

Each application is assigned a **Client ID** upon creation. This is an alphanumeric string and it's the unique identifier for your application (such as `q8fij2iug0CmgPLfTfG1tZGdTQyGaTUA`). It cannot be modified and you will be using it in your application's code when you call Auth0 APIs.

Another important piece of information is the **Client Secret**. Think of it as your application's password which **must be kept confidential at all times**. If anyone gains access to your Client Secret they can impersonate your application and access protected resources.

In our example, `ExampleCo` has two apps: a web app (running on a server) and a mobile app. Hence, they would create two applications: one of type `Regular Web Applications`, and one of type `Native`.

::: note
We won't get into details on how to create an application, since this article is meant to provide a high level overview. However, if you want to know more, refer to the [Applications](/applications) documentation.
:::

## Connection

Now that you have set up your **Applications**, you are ready to configure how your users will login. 

Auth0 sits between your app and the identity provider that authenticates your users (such as Google or Facebook). Through this level of abstraction, Auth0 keeps your app isolated from any changes of the provider's implementation.

This relationship between Auth0 and the identity provider is referred to as a **Connection**.

Connections are sources of users and they can be of the following types:

- [Database connections](/connections/database): Users log in with username and passwords, stored either in the Auth0 cloud or your own database
- [Social logins](/identityproviders#social): Google, Facebook, Twitter, and more
- [Enterprise directories](/identityproviders#enterprise): LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, and more
- [Passwordless systems](/connections/passwordless): Users log in with one-time codes, sent via SMS or email

Each connection can be shared among multiple applications. You can configure any number of connections, and then choose which of them to enable for each application.

In our example, `ExampleCo` wants their users to be able to login with username/password, Google, and GitHub, both from the web app and from the mobile app. Therefore, the steps to follow would be:
1. [Configure a GitHub connection](/connections/social/github)
1. [Configure a Google connection](/connections/social/google)
1. [Configure a database connection](/connections/database)
1. Enable all three connections for the web app
1. Enable all three connections for the mobile app

::: note
For more information on the supported identity providers, refer to [Identity Providers Supported by Auth0](/identityproviders). For details on how to enable a connection for an application, refer to [Application Connections](/applications/connections).
:::

## Where to go from here

In this article you familiarized yourself with several core concepts of Auth0. We used a simple example that added authentication to a couple of different apps.

If you wish to learn more about the next steps in setting up Auth0, you can read more:

- **Hook Auth0 up to your app**: Assuming that your app has a login and a logout button, you need to add some code in order to invoke Auth0 APIs each time one of these buttons is clicked. For details you can refer to one of our [quickstarts](/quickstarts). Alternatively, you can directly call our API to [log in](/api/authentication#login) or [log out](/api/authentication#logout) a user, or implement one of Auth0's [libraries and SDKs](/libraries).

- **Migrate your users to Auth0**: If you already have a user store, you need to migrate these users to Auth0 before you go live. For more information refer to [User Migration](/users/migrations). Alternatively, you can [connect your app to your own user database](/connections/database/custom-db) and access it via Auth0.

## Keep reading

::: next-steps
- [Learn how you can configure, secure, and access your own API with Auth0](/apis)
- [Learn more about Auth0 APIs](/api/info)
- [Learn about our libraries](/libraries)
- [Learn about working with users and user profiles in Auth0](/users)
:::