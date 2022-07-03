---

description: Learn how to use a single logical API in Auth0 to represent and control access to multiple APIs.
topics:
  - api-authentication
  - oidc
  - apis
  - scopes
  - permissions
contentType: how-to
useCase:
  - secure-api
  - call-api
---

# Represent Multiple APIs Using a Single Logical API

If you have multiple distinct API implementations that are all logically a part of the same API, you can simplify your authorization process by representing them with a single logical [API](/apis) in the Auth0 Dashboard. Doing this allows you to implement just one authorization flow, while still controlling access to the individual APIs by assigning the appropriate <dfn data-key="scope">scopes</dfn>.

This tutorial explains how to use and represent multiple APIs as a single Resource Server in Auth0. As a learning tool, we provide a sample application that you can follow along with as you read.

## The Sample Application

The sample application uses a microservices architecture and contains:

* 1 Single-Page Application (SPA)
* 2 APIs (services), called `contacts` and `calendar`

We will represent the two APIs using just one Auth0 API called `Organizer Service`. We will then create two scopes to demonstrate how you can use the [Implicit Flow](/flows/concepts/implicit) to access the `calendar` and `contacts` APIs from the SPA.

## Prerequisites

Before beginning this tutorial:

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-spa)
  * Select an **Application Type** of **Single-Page App**.
  * Add <dfn data-key="callback">**Allowed Callback URLs**</dfn> of `http://localhost:3000` and `http://localhost:3000/callback.html`.
* [Download the sample application](https://github.com/auth0-samples/auth0-api-auth-implicit-sample), so you can follow along as you read. Please see the `README` for additional information on setting up the sample on your local environment.

## Steps

1. [Enable a Connection for your Application](#enable-a-connection-for-your-application): Configure a source of users for your new application.
2. [Create a test user](#create-a-test-user): Associate a test user with your new connection.
3. [Register a logical API in Auth0](#register-a-logical-api-in-auth0): Register a single logical API to represent your multiple APIs.
4. [Configure scopes for the logical API](#configure-scopes-for-the-logical-API): Create the scopes that will allow the logical API to represent your multiple APIs.
5. [Grant access to the logical API](#grant-access-to-the-logical-api): Configure the login link in your sample application, initiate the authorization flow, and extract the Access Token to be used to call your multiple APIs.
Optional: [Implement Single Logout (SLO) or Single Sign-on (SSO)](#implement-single-log-out-slo-or-single-sign-on-sso)

## Enable a connection for your Application

You will need a source of users for your newly-registered application, so you will need to configure a [Connection](/identityproviders). For the purpose of this sample, we'll create a simple [Database Connection](/connections/database) that asks only for the user's email address and a password.

1. Navigate to the [Auth0 Dashboard](${manage_url}), and click on [Connections > Database](${manage_url}/#/connections/database) in the left-hand nav. Click **Create DB Connection**.
2. The **Create DB Connection** window will open. Provide a **Name** for your Connection, and click **Create** to proceed.
3. Click the **Applications** tab, and enable the Connection.

## Create a test user

Since you're working with a newly-created Connection, there won't be any users associated with it. Before we can test the sample application's login process, we'll need to create and associate a user with the Connection.

1. Navigate to the [Auth0 Dashboard](${manage_url}), and click on [Users](${manage_url}/#/users) in the left-hand nav. Click **Create User**.
2. Provide the requested information about the new user (**email address** and **password**), and select your newly-created **Connection**.
3. Click **Save**.

## Register a logical API in Auth0

Register a single logical [API](/apis) that you will use to represent the multiple APIs contained within the sample application.

1. Navigate to the [Auth0 Dashboard](${manage_url}), and click on [APIs](${manage_url}/#/apis) in the left-hand nav. Click **Create API**.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/dashboard-apis.png)

2. When prompted, provide a **name** and **identifier** for the new API, and choose the **signing algorithm** for the tokens obtained for this API.

For the purpose of this sample, we'll call our API `Organizer Service` and set its unique identifier to `organize`. By default, the [signing algorithm](/tokens/concepts/signing-algorithms) for the tokens obtained for this API is **RS256**, which we will leave as is.

When finished, click **Create**.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/create-new-api.png)

## Configure scopes for the logical API

To allow the logical API to represent the APIs included within the sample application, you will need to create the proper scopes.

Scopes allow you to define which API actions will be accessible to calling applications. One scope will represent one API/action combination. 

For example, if you want calling applications to be able to `read` and/or `delete` from one API called `samples` and another one called `examples`, you would need to create the following permissions:

* `read:samples`
* `delete:samples`
* `read:examples`
* `delete:examples`

You can think of each one as a microservice.

1. In your newly-created logical API, click the **Scopes** (or **Permissions**) tab. 

![](/media/articles/api-auth/tutorials/represent-multiple-apis/scopes-page.png)

2. Add two scopes:

* `read:calendar`
* `read:contacts`

**Save** your changes.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/new-scopes.png)

## Grant access to the logical API

You are now ready to provide access to your APIs by allowing the logical API to obtain <dfn data-key="access-token">Access Tokens</dfn>. By including the necessary scopes, you can control an application's access to the APIs represented by the logical API.

:::panel Authorization Flows

The rest of this article covers use of the [Implicit Flow](/flows/concepts/implicit) to reflect the sample. However, you can use whichever flow best suits your needs. For example:

* If you have a **Machine-to-Machine Application**, you can authorize it to request Access Tokens for your API by executing a [Client Credentials Flow](/flows/concepts/client-credentials).
* If you are building a **Native App**, you can implement the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce).

For a full list of available Authorization flows, see [API Authorization](/api-auth).
:::

1. The user clicks Login within the SPA, and the app redirects the user to the Auth0 Authorization Server (`/authorize` endpoint).

```text
https://YOUR_AUTH0_DOMAIN/authorize?
scope=read:contacts%20read:calendar&
audience=organize&
response_type=id_token%20token&
client_id=YOUR_CLIENT_ID&
redirect_uri=http://localhost:3000&
nonce=NONCE
```

::: note
For additional information on the call's parameters, refer to our tutorial, [Call Your API Using the Implicit Flow](/flows/guides/implicit/call-api-implicit#authorize-the-user).
:::

![SPA Home before Login](/media/articles/api-auth/tutorials/represent-multiple-apis/home.png)

2. Your Auth0 Authorization Server redirects the user to the login page, where the user authenticates using one of the configured login options.

![SPA Login](/media/articles/api-auth/tutorials/represent-multiple-apis/lock.png)

3. If this is the first time the user has been through this flow, they see a consent prompt listing the permissions Auth0 will give to the SPA. In this case, the user is asked to consent to the app reading their contacts and calendar.

![Consent Screen](/media/articles/api-auth/tutorials/represent-multiple-apis/consent-screen.png)

4. If the user consents, Auth0 redirects the user back to the SPA with tokens in the hash fragment of the URI. The SPA can now extract the tokens from the hash fragment using JavaScript and use the Access Token to call your APIs on behalf of the user.

```js
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}
```

In our sample, after you successfully log in, you will see buttons that allow you to call either of your APIs using the Access Token obtained from the logical API.

![SPA Home after Login](/media/articles/api-auth/tutorials/represent-multiple-apis/apis.png)


## Implement Single Logout (SLO) or Single Sign-on (SSO)

<%= include('../../_includes/_checksession_polling') %>
