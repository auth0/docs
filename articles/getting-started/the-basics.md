---
toc: true
description: Learn the basics of Auth0 and familiarize yourself with the terminology
---
# Learn the Basics

Let's see some basic terminology we use here at Auth0 and how these terms map to what you already know.

We will use a very simple example: A company named `Example-Co` wants to use Auth0 for authentication. They have a web app and a mobile app, and they want their users to be able to login with username/password, Google or GitHub.

## Pick your Domain

When you create a new account with Auth0, you are asked to pick a **Tenant Domain**. This is the base URL you will be using when you want to authenticate a user or access our API.

The name format is `TENANT-NAME.auth0.com` (you get to pick the `TENANT-NAME` part).

In our example, `Example-Co` could pick the name `example-co`, hence their domain would be `example-co.auth0.com`.

Some characteristics:
- It has to be unique
- It cannot be changed afterwards
- You can create more than one tenants (you are actually encouraged to do so for each separate environment you have: Development/Staging/Production)
- If at the tenant creation process, you chose to host your data in Europe or Australia, then your tenant will have a suffix, for example `example-co-eu.auth0.com` or `example-co-au.auth0.com`

::: note
Yes, you can choose a custom domain that won't have the `auth0.com` suffix, more on that at [What's Next?](/getting-started/whats-next).
:::

## Register your App

Now that you have an account, we need to know your app(s) that will be using our services.

So we ask that you register each application. From now on we will be calling an application, **Client**.

When you create a client, the first piece of information we ask for is it's type. This can be one of the following.

![/media/articles/getting-started/client-types.png](Client Types)

In our example, `ExampleCo` has two apps: a web app (running on a server) and a mobile app.

Hence, they would create two clients: one of type `Regular Web Applications` and one of type `Native`.

## Pick your Connections

> Auth0 sits between your app and the identity provider that authenticates your users. Through this level of abstraction, Auth0 keeps your app isolated from any changes to and idiosyncrasies of each provider's implementation. In addition, Auth0's normalized user profile simplifies user management.
> The relationship between Auth0 and any of these authentication providers is referred to as a 'connection'.

## Keep?

You can connect any application (written in any language or on any stack) to Auth0 and define its [connection](/connections), the method used to authenticate the users of that application:

* [Custom credentials](/connections/database): username + passwords
* [Social network logins](/identityproviders#social): Google, Facebook, Twitter, and any OAuth2, OAuth1 or OpenID Connect provider
* [Enterprise directories](/identityproviders#enterprise): LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, etc.
* [Passwordless systems](/connections/passwordless): Touch ID, one time codes on SMS, or email