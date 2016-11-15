---
order: 01
title: SPA + API
image: /media/articles/architecture-scenarios/spa-api.png
extract: Single Page Web Application "Client" which talks to an API ("Resource Server"). The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.
description: Explains the architecture scenario with a Single Page Web Application to an API using OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.
---

# SPA + API

![Diagram for SPA + API scenario](/media/articles/architecture-scenarios/spa-api.png)

In this scenario you have a Single Page Web Application ("Client") which talks to an API ("Resource Server"). The application will use **OpenID Connect** with the **Implicit Grant Flow** to authenticate users with Auth0. Note that this flow can only be used for Clients whose type is **Single Page Application** in the [Dashboard](${manage_url}).

When a user logs in, Auth0 will return to the application an `access_token` and optionally an `id_token`:

- The `access_token` is used to securely call the API on behalf of the user.

- The `id_token` is consumed only by the client and contains user profile data. Alternatively the user profile can be obtained by calling the `/userinfo` endpoint in the Auth0 Authentication API with the `access_token`.

The application will usually store the information about the user's session (i.e. whether they are logged in, their tokens, user profile data, and so forth) inside some sort of storage such a Local Storage.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)
* [Calling APIs from Client-side Web Apps](/api-auth/grant/implicit)
* [Executing the Implicit Grant Flow](/api-auth/tutorials/implicit-grant)
* [Mitigating replay attacks when using the implicit grant](/api-auth/tutorials/nonce)
* [Single Page App Quickstarts](/quickstart/spa/)
* [Lock](/libraries/lock)
