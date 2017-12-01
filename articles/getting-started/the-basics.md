---
title: Learn the Basics
description: Learn the basics of Auth0 and familiarize yourself with the terminology
toc: true
---
# Learn the Basics

Let's see some basic terminology we use here at Auth0 and how these terms map to what you already know.

::: panel TL;DR
This article uses an example to introduce three core concepts of Auth0: **domains**, **clients**, and **connections**. If you already know what these are you can skip reading it.
:::

We will use a very simple example: A company named `Example-Co` wants to use Auth0 for authentication. They have a web app and a mobile app, and they want their users to be able to login with username/password, Google or GitHub.

## Account and Tenants

If you haven't already signed up for an Auth0 account, do so (it's free). You can either use username/password credentials or log in with a social provider (GitHub, Google, or Microsoft).

Once you create your account you will be asked to create a **Tenant**. This is a logical isolation unit. 

The term is borrowed from "software multitenancy". This refers to an architecture where a single instance of the software serves multiple tenants. No tenant can access the instance of another tenant, even thougn the software might be running on the same machine (hence the logical isolation).

Some characteristics:

- It has to be unique (we will see in the next paragraph that it is used to create your own personal domain)
- It cannot be changed afterwards
- You can create more than one tenants (you are actually encouraged to do so for each separate environment you have: Development/Staging/Production)
- If you chose to host your data in Europe or Australia, then your tenant will have a suffix (`eu` or `au`). In our example, if `Example-Co` picked the name `example-co`, then depending on where the data are stored, the tenant name could eventually be `example-co-eu` or `example-co-au`.

## Domain

As discussed in the previous paragraph, When you create a new account with Auth0, you are asked to pick a name for your **Tenant**. This name, appended with the `auth0.com`, will be your Auth0 **Domain**. It's the base URL you will be using when you want to access our API (in order, for example, to authenticate a user). The name format is `TENANT-NAME.auth0.com` (you get to pick the `TENANT-NAME` part).

In our example, `Example-Co` could pick the name `example-co`, hence their domain would be `example-co.auth0.com`.

::: panel Custom Domains
You can use a custom domain, such as `example-co.com`. This comes with an additional cost and requires a **single-tenant** implementation of Auth0, which can be deployed in one of three locations:
- The Auth0-managed cloud
- A customer-managed cloud
- An [on-premise installation](/appliance)
:::

## Client

Now that you have an account, we need to know your app(s) that will be using our services.

So we ask that you register each application. From now on we will be calling an application, **Client**.

When you create a client, the first piece of information we ask for is its type. This can be one of the following.

![Client Types](/media/articles/getting-started/client-types.png)

Each client is assigned a **Client ID** upon creation. This is the unique identifier for your client and it is an alphanumeric string (example: `q8fij2iug0CmgPLfTfG1tZGdTQyGaTUA`). It cannot be modified and you will be using it in your app's code when you call Auth0's APIs.

Another important piece of information, is the **Client Secret**. Think of it as your client's password which **must be kept confidential at all times**. If anyone can access your Client Secret they can impersonate your app and access resources they shouldn't!

Let's go back to our example. `ExampleCo` has two apps: a web app (running on a server) and a mobile app. Hence, they would create two clients: one of type `Regular Web Applications` and one of type `Native`.

::: note
We won't get into details on how to create a client, since this article is only supposed to provide a high level overview. However, if you want to know more about clients and how to create one refer to [Clients](/clients).
:::

## Connection

Now that you have registered your app(s), you are ready to configure how your users will login. 

Auth0 sits between your app and the identity provider that authenticates your users (for example. Google or Facebook). Through this level of abstraction, Auth0 keeps your app isolated from any changes to and idiosyncrasies of each provider's implementation.

The relationship between Auth0 and the identity providers is referred to as a **Connection**.

Connections are sources of users and they be of the following types.

- [Database](/connections/database): username and passwords, stored either in the Auth0 user store or your own database
- [Social logins](/identityproviders#social): Google, Facebook, Twitter, and any OAuth2, OAuth1 or OpenID Connect provider
- [Enterprise directories](/identityproviders#enterprise): LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, etc.
- [Passwordless systems](/connections/passwordless): one-time codes on SMS or email

Each connection can be shared among different applications. You can configure any number of connections, and then, at client level, choose which of them should be enabled for the given client.

In our example, `ExampleCo` wants their users to be able to login with username/password, Google or GitHub, both from the web app and from the mobile app. Therefore, the steps to follow would be:
1. [Configure a GitHub connection](/connections/social/github)
1. [Configure a Google connection](/connections/social/google)
1. [Configure a database connection](/connections/database)
1. Enable all three connections for the web app client
1. Enable all three connections for the mobile app client

::: note
For more information on the supported identity providers refer to [Identity Providers Supported by Auth0](/identityproviders). For info on how to enable a connection for a client refer to [Client Connections](/clients/connections).
:::

## Next steps

In this article you familiarized yourself with the three core concepts of Auth0: domains, clients, and connections. 

We used a simple example that adds authentication to a couple of apps.

For now we won't get into details about the next steps, but in case you want to read some more, the next steps to follow would be the following:

- **Hook it up to your app**: Assuming that your app has a login and a logout button, you have to add some code in order to invoke Auth0 APIs each time one of these buttons is clicked. For details you can refer to one of our [quickstarts](/quickstarts). Alternatively, you can call directly our API to [login](/api/authentication#login) or [logout](/api/authentication#logout) a user.

- **Migrate your users to Auth0**: Assuming that you already have a user store, you have to migrate these users to Auth0 before you go live. For more information refer to [User Migration](/users/migrations). Alternatively, you can [connect your app to a custom database](/connections/database/custom-db) and access it via Auth0.

## Keep reading

::: next-steps
- [Learn how you can configure, secure, and access your own API with Auth0](/apis)
- [Learn more about Auth0 APIs](/api/info)
- [Learn about our libraries](/libraries)
- [Learn about working with users and user profiles in Auth0](/users)
:::

<%= include('./_stepnav', {
 next: ["Dashboard Overview", "/getting-started/dashboard-overview"],
 prev: ["Getting Started", "/getting-started"]
}) %>
