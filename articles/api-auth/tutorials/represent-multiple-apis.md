---
title: Represent Multiple APIs Using a Single Auth0 API
description: How to use a single Auth0 API to represent and control access to multiple APIs.
topics:
  - api-authentication
  - oidc
  - apis
  - scopes
  - permissions
contentType: tutorial
useCase:
  - secure-api
  - call-api
---

# Represent Multiple APIs Using a Single Auth0 API

If you have multiple APIs, you can simplify your authentication process by creating a single [API](/apis) in the Auth0 Dashboard that can act as a proxy and represent all of your APIs. Doing this allows you to implement just one authentication flow, while still controlling access to the individual APIs--by assigning the appropriate permissions.

This tutorial explains how to use and represent multiple APIs as a single Resource Server in Auth0. As a learning tool, we provide a sample application that you can follow along with as you read.

## The Sample Application

The sample application contains:

* 1 Single Page Application (SPA);
* 2 APIs (called `contacts` and `calendar`).

We will represent the two APIs using just one Auth0 API called `Organizer Service`. We will then create two namespaced permission levels to demonstrate how you can use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to access the `calendar` and `contacts` APIs from the SPA. The SPA also uses [Lock](/libraries/lock) to implement the sign-in screen.

## Prerequisites

Before beginning this tutorial:

* [Register your Application with Auth0](/applications/spa)
  * Select an **Application Type** of **Single-Page App**.
  * Add **Allowed Callback URLs** of `http://localhost:3000` and `http://localhost:3000/callback.html`.
* [Download the sample application](https://github.com/auth0-samples/auth0-api-auth-implicit-sample), so you can follow along as you read. Please see the `README` for additional information on setting up the sample on your local environment.

## Steps

1. [Enable a Connection for your Application](#enable-a-connection-for-your-application): Configure a source of users for your new application.
2. [Create a Test User](#create-a-test-user): Associate a test user with your new connection.
3. [Register a proxy API in Auth0](#register-a-proxy-api-in-auth0): Register a proxy API to represent your actual APIs.
4. [Configure permissions for the proxy API](#configure-permissions-for-the-proxy-API): Create the permission levels that will allow the proxy API to represent multiple APIs.
5. Grant access to the proxy API: 

## Enable a connection for your Application

You will need a source of users for your newly-registered application, so you will need to configure a [Connection](/identityproviders). For the purpose of this sample, we'll create a simple [Database Connection](/connections/database) that asks only for the user's email address and a password.

1. Navigate to the [Auth0 Dashboard](${manage_url}), and click on [Connections > Database](${manage_url}/#/connections/database) in the left-hand nav. Click **Create DB Connection**.
2. The **Create DB Connection** window will open. Provide a **Name** for your Connection, and click **Create** to proceed.
3. Click the **Applications** tab, and enable the Connection.

### Create a test user

Since you're working with a newly-created Connection, there won't be any users associated with it. Before we can test the sample application's login process, we'll need to create and associate a user with the Connection.

1. Navigate to the [Auth0 Dashboard](${manage_url}), and click on [Users](${manage_url}/#/users) in the left-hand nav. Click **Create User**.
2. Provide the requested information about the new user (**email address** and **password**), and select your newly-created **Connection**.
3. Click **Save**.

## Register a proxy API in Auth0

Create the single [API](/apis) that you will use to represent the multiple APIs contained within the sample application.

1. Navigate to the [Auth0 Dashboard](${manage_url}), and click on [APIs](${manage_url}/#/apis) in the left-hand nav. Click **Create API**.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/dashboard-apis.png)

2. When prompted, provide a **name** and **identifier** for the new API, and choose the **signing algorithm** for the tokens obtained for this API.

For the purpose of this sample, we'll call our API `Organizer Service` and set its unique identifier to `organize`. By default, the signing algorithm for the tokens obtained for this API is **RS256**, which we will leave as is.

When finished, click **Create**.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/create-new-api.png)

## Configure permissions for the proxy API

To allow the proxy API to represent the APIs included within the sample application, you will need to create the proper permissions.

Permissions allow you to define which API actions will be accessible to calling applications. One permission (or scope) will represent one API/action combination. 

For example, if you want calling applications to be able to `read` and/or `delete` from an API called `samples`, you would need to create the following scopes:

* `read:samples`
* `delete:samples`

1. In your newly-created proxy API, click the **Scopes** (or **Permissions**) tab. 

![](/media/articles/api-auth/tutorials/represent-multiple-apis/scopes-page.png)

2. Add two scopes:

* `read:calendar`;
* `read:contacts`.

You can think of each one as a microservice.

Add these two scopes to your API, and **Save** your changes.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/new-scopes.png)




## Grant Access to the Auth0 API

You are now ready to provide access to your APIs by granting Access Tokens to the Auth0 API. By including specific scopes, you can control an application to some or all of the APIs represented by the Auth0 API.

:::panel Authorization Flows

The rest of this article covers use of the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to reflect the sample. However, you can use whichever flow best suits your needs.

* If you have a **Machine-to-Machine Application**, you can authorize it to request Access Tokens to your API by executing a [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow).
* If you are building a **Native App**, you can implement the [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow).

For a full list of available Authorization flows, see [API Authorization](/api-auth).
:::

The app initiates the flow and redirects the browser to Auth0 (specifically to the `/authorize` endpoint), so the user can authenticate.

```text
https://YOUR_AUTH0_DOMAIN/authorize?
scope=read:contacts%20read:calendar&
audience=organize&
response_type=id_token%20token&
client_id=YOUR_CLIENT_ID&
redirect_uri=http://localhost:3000&
nonce=NONCE
```

For additional information on the call's parameters, refer to our tutorial, [Call Your API Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow#authorize-the-user).

The SPA executes this call whenever the user clicks **Login**.

![SPA Home before Login](/media/articles/api-auth/tutorials/represent-multiple-apis/home.png)

Lock handles the login process.

![SPA Login](/media/articles/api-auth/tutorials/represent-multiple-apis/lock.png)

Next, Auth0 authenticates the user. If this is the first time the user goes through this flow, they will be asked to consent to the scopes that are given to the Application. In this case, the user's asked to consent to the app reading their contacts and calendar.

![Consent Screen](/media/articles/api-auth/tutorials/represent-multiple-apis/consent-screen.png)

If the user consents, Auth0 continues the authentication process, and upon completion, redirects them back to the app with an Access Token in the hash fragment of the URI. The app can now extract the tokens from the hash fragment. In a Single Page Application (SPA) this is done using JavaScript.

```js
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}
```

The app can then use the Access Token to call the API on behalf of the user.

After logging in, you can see buttons that allow you to call either of your APIs.

![SPA Home after Login](/media/articles/api-auth/tutorials/represent-multiple-apis/apis.png)

## Polling checkSession() to attain SSO or SLO

<%= include('../../_includes/_checksession_polling') %>
