---
title: Learn the Basics
description: Learn the basics of Auth0 and familiarize yourself with the terminology
toc: true
---
# Learn the Basics

This page introduces some of Auth0's most fundamental concepts: **tenants**, **domains**, **clients**, and **connections**. If you already know what these are (in the context of Auth0), you can skip this page.

Otherwise, if you want to follow along and you do not have an Auth0 account yet, [sign up for a free trial](https://auth0.com/signup) and read on.

## Tenants

During signup, you will be asked to create a **tenant**. The tenant name must be unique across all Auth0 customers, and you cannot change it later.

A tenant is similar to what some SaaS providers call an organization or a team: your Auth0 account starts with one, supports many, and keeps them isolated from each other. If you are a solo developer or you work at a small company, you might create a tenant for each operating environment (one for staging, one for production, and so on). If you work at a large company, you might create one for each division within the engineering department.

Not only does each tenant have its own users—whom you, the administrator of the Auth0 account, can invite to the tenant via email—it has its own domain, clients, connections, and more.

Do not worry about creating multiple tenants right now.

## Domains

A tenant's users and clients access the Auth0 API via the tenant's **domain**. A tenant named `myapp-staging` will have one of the following domains, depending on its region:

<table class="table">
    <thead>
        <tr>
            <th class="info"><strong>Region</strong></th>
            <th class="info" colspan="3"><strong>Domain</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>US</th>
            <td colspan="3">myapp-staging.auth0.com</td>
        </tr>
        <tr>
            <th>EU</th>
            <td colspan="3">myapp-staging.eu.auth0.com</td>
        </tr>
        <tr>
            <th>AU</th>
            <td colspan="3">myapp-staging.au.auth0.com</td>
        </tr>
    </tbody>
</table>

If you need to use your own domain (for example, `myapp-staging.com`), you can configure a custom domain. To read more about this non-free beta feature, see [Custom Domains](/custom-domains).

## Clients

Like OAuth 2.0, Auth0 calls the applications it serves **clients**. Think of clients as your applications' Auth0 credentials; every app needs its own client before it can talk to Auth0.

When creating a client in the [Dashboard](${manage_url}/#/clients), you must choose its type:

![Client Types](/media/articles/getting-started/client-types.png)

Each client is assigned a **Client ID** upon creation. This immutable alphanumeric string is your app's username. The **Client Secret** is its password, so of course, **you must not share it with others**. Anyone that learns the Client Secret can impersonate your application.

See [Clients](/clients) to learn more.

## Connections

Just as clients help your applications connect to Auth0, **connections** help Auth0 connect to the identity providers that authenticate your applications' users. Auth0 supports a wide variety of identity providers and credential types:

- [Database connections](/connections/database): Usernames and passwords stored in either your Auth0 account or your own (external) database.
- [Social logins](/identityproviders#social): Google, Facebook, Twitter, and more.
- [Enterprise directories](/identityproviders#enterprise): LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, and more
- [Passwordless systems](/connections/passwordless): One-time codes sent via SMS or email.

For a comprehensive list of identity providers, see [Identity Providers](/identityproviders).

Each connection can be shared among multiple clients. You can configure any number of connections, and then choose which of them to enable for each client. To read about how to do that, see [Client Connections](/clients/connections).

## Putting it all together

Suppose ExampleCo has two applications—a server-side web app and a mobile app—and that it wants to allow users of both apps to login with either username/password, Google, or GitHub.

After ExampleCo signs up for an Auth0 account (and creates a tenant), it needs to:

1. Create a client (type: Regular Web Application) for the web app
1. Create a client (type: Native) for the mobile app
1. [Configure a GitHub connection](/connections/social/github)
1. [Configure a Google connection](/connections/social/google)
1. [Configure a database connection](/connections/database)
1. Enable all three connections for the web app client
1. Enable all three connections for the mobile app client

## Where to go from here

If you wish to learn more about the next steps in setting up Auth0, read more:

- **Hook Auth0 up to your app**: Assuming that your app has a login and a logout button, you need to add some code in order to invoke Auth0 APIs each time one of these buttons is clicked. For details you can refer to one of our [quickstarts](/quickstarts). Alternatively, you can directly call our API to [log in](/api/authentication#login) or [log out](/api/authentication#logout) a user, or implement one of Auth0's [libraries and SDKs](/libraries).

- **Migrate your users to Auth0**: If you already have a user store, you need to migrate these users to Auth0 before you go live. For more information refer to [User Migration](/users/migrations). Alternatively, you can [connect your app to your own user database](/connections/database/custom-db) and access it via Auth0.

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
