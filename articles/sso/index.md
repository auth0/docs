---
url: /sso
description: Introduction to Single Sign On (SSO) with Auth0.
---

# What is SSO (Single Sign On)?

SSO (Single Sign On) occurs when a user logs in to one Client and is then signed in to other Clients automatically, regardless of the platform, technology, or domain the user is using.

Google's implementation of login for their products, such as Gmail, YouTube, Google Analytics, and so on, is an example of SSO. Any user that is logged in to one of Google's products are automatically logged in to their other products as well.

Single Sign On usually makes use of a *Central Service* which orchestrates the single sign on between multiple clients. In the example of Google, this central service is [Google Accounts](https://accounts.google.com). When a user first logs in, Google Accounts creates a cookie, which persists with the user as they navigate to other Google-owned services. The process flow is as follows:

1. The user accesses the first Google product.
2. The user receives a Google Accounts-generated cookie.
3. The user navigates to another Google product.
4. The user is redirected again to Google Accounts.
5. Google Accounts sees that the user already has an authentication-related cookie, so it redirects the user to the requested product.

## An overview of how SSO works with Auth0

In the case of SSO with Auth0, the *Central Service* is the Auth0 Authorization Server. 

Let's look at how the SSO flow looks when using Auth0 and a user visits your application for the first time: 

![]()

1. Your application will redirect the user to the Auth0 Hosted Lock page where they can log in. 
2. Auth0 will check to see whether there is an existing SSO cookie.
3. Because this is the first time the user visits this Hosted Lock page, and no SSO cookie is present, they may be presented with username and password fields and also possibly some Social Identity Providers such as LinkedIn, GitHub, etc. (The exact layout of the Lock screen will depend on the [Identity Providers](/identityproviders) you have configured.
4. Once the user has logged in, Auth0 will set an SSO cookie
5. Auth0 will also redirect back to your web application and will return an `id_token` containing the identity of the user.

Now let's look at flow when the user returns to your website for a subsequent visit:

![]()

1. Your application will redirect the user to the Auth0 Hosted Lock page where they can sign in. 
2. Auth0 will check to see whether there is an existing SSO cookie.
3. This time Auth0 finds an SSO cookie and instead of displaying the normal Lock screen with the username and password fields, it will display a Lock screen which indicates that we know you the user is, as they have already logged in before. They can simply confirm that they want to log in with that same account.
4. Auth0 will update the SSO cookie if required
5. Auth0 will also redirect back to your web application and will return an `id_token` containing the identity of the user.

If an SSO cookie is present you can also sign the user in silently, i.e. without even displaying Lock so they can enter their credentials. This is covered in more detail in the next section.

## How to Implement SSO with Auth0

::: panel-info Enabling Identity Providers
Prior to enabling SSO for a given Client, you must first [configure the Identity Provider(s)](/identityproviders) you want to use.
:::

To enable SSO for one of your Clients (recall that each Client is independent of one another), navigate to the [Clients section of the Auth0 Management Dashboard](${manage_url}/#/clients). Click on **Settings** (represented by the gear icon) for the Client with which you want to use SSO.

![](/media/articles/sso/single-sign-on/clients-dashboard.png)

Near the bottom of the *Settings* page, toggle **Use Auth0 instead of the IdP to do Single Sign On**.

![](/media/articles/sso/single-sign-on/sso-flag.png)

Alternatively you can also set the Client's SSO flag using the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).

Once you have set the SSO flag for your Client in the Auth0 Dashboard, you must add logic to your application to check the user's SSO status. Checking the user's SSO status can only be done via JavaScript by making use of the [`getSSOData`](https://auth0.com/docs/libraries/auth0js#sso) function in the [auth0.js library](https://auth0.com/docs/libraries/auth0js).  

The result of this function will indicate whether an SSO cookie is present, and if so it will return the SSO data of the user which can then subsequently be used to log the user in silently without even displaying Lock.

For more detailed information on how to implement this, please refer to the following documents:

* [Client-Side SSO (Single Page Apps)](/sso/single-page-apps-sso)
* [Server-Side SSO (Regular Web Apps)](/sso/regular-web-apps-sso)

> Please see the [Auth0 SSO Sample](https://github.com/auth0/auth0-sso-sample) repo for an example of SSO with both Single Page Apps and Regular Web Apps.

### Length of SSO Sessions

If the SSO flag is set for a Client, Auth0 will maintain an SSO session for any user authenticating via that Client. If the user remains active, the session will last no more than **7 days**, but if not, the session will terminate after **3 days**. To be considered active, the user must access the Client that created the session within the given timeframe.

## What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, etc.

There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.

## Using Social Identity Providers

Single Sign On works with Social Identity Providers given the following conditions:

1. You need to enable "Use Auth0 instead of the IdP to do Single Sign On" when configuring the Client
2. Your social connection can not be using the developer keys. You will need to register an app in the relevant social provider and then use that Client ID and Client Secret when configuring the connection. You can read more about the [caveats of using the Auth0 developer keys](/connections/social/devkeys#caveats).