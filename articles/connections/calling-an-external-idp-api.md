---
title: Call an Identity Provider API
description: Learn how to call an external Identity Provider API.
toc: true
crews: crew-2
topics:
  - connections
  - social
  - access-tokens
  - api
contentType: how-to
useCase:
  - customize-connections
  - add-idp
---
# Call an Identity Provider API

Once you successfully authenticate a user with an external Identity Provider (IdP), such as Facebook or GitHub, the IdP often includes an <dfn data-key="access-token">Access Token</dfn> in the user profile it returns to Auth0. 

You can retrieve and use this token to call the IdP's API.

::: note
This article assumes that you have already configured the connection with the IdP of your choice. If not, go to [Identity Providers Supported by Auth0](/identityproviders), select the IdP you want, and follow the configuration steps.
:::

The process you will follow differs depending on whether your code runs in the backend or the frontend:

- If your code runs in the backend, then we can assume that your server is trusted to safely store secrets (as you will see, we use a secret in the backend scenario). If that's the case, proceed to the [backend section](#from-the-backend) of this article.

- If your code runs in the frontend (for example, it's a SPA, native desktop, or mobile app), then your app cannot hold credentials securely and has to follow an alternate approach. In this case, proceed to the [frontend section](#from-the-frontend) of this article.

## From the backend

Once you authenticate a user, the IdP often includes an Access Token in the user profile it returns to Auth0.

For security and compliance reasons, Auth0 does not send this token to your app as part of the user profile. To get it, you must access the Auth0 Management API and retrieve the full user's profile:

1. Get an Access Token that allows you to call the [Auth0 Management API](/api/management/v2).

2. Call the Auth0 Management API's [Get Users by ID endpoint](/api/management/v2#!/Users/get_users_by_id) using the Access Token obtained in step one. This endpoint returns the full user's profile, which contains the IdP Access Token.

3. Extract the IdP Access Token from the response and use it to call the IdP's API.

### Step 1: Get a Token

You will need an Access Token to call the [Management API](/api/management/v2).

#### Create a test application for the Management API

If this is the first time you are requesting a [Management APIv2 Token](/api/management/v2/tokens), you will need to create and configure an application that can be used to call the Management API:

1. From the [registered Auth0 Management API](${manage_url}/#/apis/management/authorized-clients) in the [Dashboard], click the **API Explorer** tab.

2. Click **Create & Authorize a Test Application**.

This will create a new application and grant **all <dfn data-key="scope">scopes</dfn> of the Management API**. This means that the tokens generated for this application will be able to access **all Management API endpoints**.

::: panel Can't see the button?
If you don't see this button, it means that you already have at least one authorized application for the Management API. In this case, you can either update the scopes of the existing application and use that, or create a new one following these steps:

1. Navigate to [Applications](${manage_url}/#/applications) in the [Dashboard](${manage_url}), and click **Create Application**. 
2. Select **Machine to Machine Applications**, and click **Create**
3. From the **Select an API** dropdown, select `Auth0 Management API`.
4. Enable required scopes, and click **Authorize**.
5. Click on the **APIs** tab.
5. Enable the toggle for **Auth0 Management API**.
:::

::: warning Security
For security reasons, we recommend that you assign only the required scopes to the application you will be using. For this particular case, the scopes you need are: `read:users`, `read:user_idp_tokens`. Required scopes are listed for each endpoint in the [Management API Explorer](/api/management/v2/).
:::

To grant or remove scopes from the [registered Auth0 Management API](${manage_url}/#/apis/management/authorized-clients) in the [Dashboard](${manage_url}), click the [**Machine to Machine Applications** tab](${manage_url}/#/apis/management/authorized-clients):

![Edit the scopes granted to the Application](/media/articles/connections/edit-granted-scopes.png)

#### Get the Management API Token

You are now done with configuration and are ready to get your Management API token:

1. From the [registered Auth0 Management API](${manage_url}/#/apis/management/authorized-clients) in the [Dashboard](${manage_url}), click the [Test tab](${manage_url}/#/apis/management/test).

2. Choose your application from the **Application** dropdown to pre-populate the ready-to-use snippets with customized variables.

3. Choose your language of preference for the snippet, and copy and run it.

4. Extract the `access_token` property from the response. This is what you will use to access the Management API.

::: panel What are the snippets doing?
The snippets make a `POST` operation to the [/oauth/token endpoint of the Auth0 Authentication API](/api/authentication#client-credentials), using the **OAuth 2.0 Client Credentials grant**. This is the grant that machine-to-machine processes use to access an API. To learn more about the flow, refer to [Client Credentials Flow](/flows/concepts/client-credentials).
:::

#### Token expiration

By default, the token you received expires in 24 hours (86400 seconds). To change this:

1. From the [registered Auth0 Management API](${manage_url}/#/apis/management/authorized-clients) in the [Dashboard](${manage_url}), click the [Settings tab](${manage_url}/#/apis/management/settings).

2. Locate the **Token Expiration (Seconds)** field, enter a new value, and click **Save**. The maximum value you can set is 2592000 seconds (30 days), though we recommend that you keep the default value.

The next token you generate will use the updated expiration time. 

::: panel-warning Security warning
These tokens **cannot be revoked**. To minimize risk, we recommend issuing short-lived tokens and granting only the necessary scopes for each application. For a production environment, you can configure a simple CLI that will fetch a new token when the old one expires.
:::

### Step 2: Get the full User Profile

To get a user's profile, call the [Get a User endpoint](/api/management/v2#!/Users/get_users_by_id) of the Management API using the Access Token you extracted in the previous section: 

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_ACCESS_TOKEN"
    }]
}
```

Replace these values:
- `USER_ID`: ID of the user for whom you want to call the IdP's API.
- `YOUR_ACCESS_TOKEN`: Access Token you extracted in the previous section.

::: panel Where do I find the User ID?
- For testing purposes, you can find a user ID at [Users](${manage_url}/#/users/) in the [Auth0 Dashboard](${manage_url}). Locate a user, and copy the value of the **user_id** field.
- For your implementation, you can either extract the user ID from the `sub` claim in the [ID Token](/tokens/concepts/id-tokens), or call the [/userinfo endpoint](/api/authentication#get-user-info) of the Authentication API and extract it from the `user_id` response property.
:::

### Step 3: Extract the IdP Access Token

You can find the Access Token used to call the IdP's API within the user's `identities` array: `user.identities[0].access_token`.

::: note
For certain Identity Providers, Auth0 will also store a <dfn data-key="refresh-token">Refresh Token</dfn>, which you can use to obtain a new Access Token for the IdP. This works for: BitBucket, Google (OAuth 2.0), OAuth 2.0, SharePoint, and Azure AD. To learn more, see [Identity Provider Access Tokens](/tokens/concepts/idp-access-tokens#renew-tokens).
:::

In most cases, the user will only have one identity, but if the user has signed in multiple times through different connections and you have used [account linking](/users/concepts/overview-user-account-linking), there may be more.

In this sample response, we see that our user has only one identity: `google-oauth2`.

```json
{
  "email": "john.doe@test.com",
  "email_verified": true,
  "name": "John Doe",
  "given_name": "John",
  "family_name": "Doe",
  "picture": "https://myavatar/photo.jpg",
  "gender": "male",
  "locale": "en",
  "updated_at": "2017-03-15T07:14:32.451Z",
  "user_id": "google-oauth2|111199914890750704174",
  "nickname": "john.doe",
  "identities": [
    {
      "provider": "google-oauth2",
      "access_token": "ya29.GlsPBCS6ahokDlgCYnVLnDKNE71HBXPEzNhAPoKJLAGKDSe1De3_xclahNcdZXoU-26hCpa8h6240TV86dtaEQ4ZWoeeZduHDq_yeu9QyQqUr--S9B2CR9YJrLTD",
      "expires_in": 3599,
      "user_id": "111199914890750704174",
      "connection": "google-oauth2",
      "isSocial": true
    }
  ],
  "created_at": "2017-03-15T07:13:41.134Z",
  "last_ip": "127.0.0.1",
  "last_login": "2017-03-15T07:14:32.451Z",
  "logins_count": 99
}
```

You are now ready to call the IdP's API. Please refer to the IdP's documentation for specifics on how to do so.

::: warning
Don't expose IdP tokens to your client-side application! If your application is public, see the [frontend section](#from-the-frontend) of this article.
:::

::: note
To learn more about how to request specific scopes for an Identity Provider Access Token, please see [Add scopes/permissions to call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp).
:::

## From the frontend

If you are working with a public application (SPA, native desktop, or mobile app), then this is the place to be.

When working with a frontend app, the process for calling IdP APIs differs from the backend process because frontend apps are public applications that **cannot hold credentials securely**. Because SPA code can be viewed and altered, and native/mobile apps can be decompiled and inspected, they cannot be trusted to hold sensitive information like secret keys or passwords.

Specifically, they cannot securely hold the **Client Secret** for the Machine to Machine Application, which you use to call `/oauth/token` during the first step of the backend process.

Instead, you must build a proxy for your backend and expose it to your application as an API.

### Build a proxy

First, you will build a process in your backend that will implement the steps included in [the backend section](#from-the-backend) of this article, and expose it to your application as an API.

You will call the IdP's API from the same backend process, so the Access Token is never exposed to your public application.

Then, you will call your proxy API from your public application using the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).

:::panel Show me how
If you haven't implemented this before, you might find our [SPA + API](/architecture-scenarios/application/spa-api) article useful. It covers a different scenario, but it explains how to configure Auth0, how to call an API from a SPA, and how to implement API validations. It comes with a sample that uses [Angular 2](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-spa/angular) and [Node.js](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-api/node).

We also offer a [Mobile + API](/architecture-scenarios/application/mobile-api) variation (the sample uses [Android](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-mobile/android) and [Node.js](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-api/node)).
:::
