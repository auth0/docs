---
order: 02
title: Mobile + API
image: /media/articles/architecture-scenarios/mobile-api.png
extract: Mobile Application ("Client") which talks to an API ("Resource Server"). The application will use OpenID Connect with the Authorization Code Grant using Proof Key for Code Exchange (PKCE) to authenticate users.
description: Explains the architecture scenario with a mobile application client communicating with an API.
---

# Mobile + API

![Mobile + API Flow](/media/articles/architecture-scenarios/mobile-api.png)

In this scenario you have a mobile application ("Client") which talks to an API ("Resource Server"). The application will use **OpenID Connect** with the **Authorization Code Grant using Proof Key for Code Exchange (PKCE)** to authenticate users. Note that this flow can only be used for Clients whose type is **Native** in the [Dashboard](${manage_url}).

When a user logs in, Auth0 will return to the application an `access_token`, an `id_token`, and optionally a `refresh_token`:

- The `access_token` is used to securely call the API on behalf of the user.

- The `id_token` is consumed only by the client and contains user profile data. Alternatively the user profile can be obtained by calling the `/userinfo` endpoint in the Auth0 Authentication API with the `access_token`.

- The `refresh_token` can be used in order to obtain a new `access_token` whenever a previous one expires. Note that a `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled **Allow Offline Access** for your API in the [Dashboard](${manage_url}).

The application will usually store the information about the user's session (i.e. whether they are logged in, their tokens, user profile data, and so forth) inside some sort of Local Storage on the mobile device.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)
* [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
* [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)
* [Native Apps Quickstarts](/quickstart/native/)
* [Lock for iOS and OS X](/libraries/lock-ios)
* [Lock for Android](/libraries/lock-android)
