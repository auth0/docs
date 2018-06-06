---
title: Call an Identity Provider API
description: How to call an Identity Provider API
toc: true
crews: crew-2
---
# Call an Identity Provider API

Once you successfully authenticate a user with an external Identity Provider (IdP), such as Facebook or GitHub, the IdP often includes an Access Token in the user profile it returns to Auth0. 

You can retrieve and use this token to call the IdP's API.

::: note
This article assumes that you have already configured the connection with the IdP of your choice. If not, go to [Identity Providers Supported by Auth0](/identityproviders), select the IdP you want, and follow the configuration steps.
:::

The process you will follow differs, depending on whether your code runs in the backend or the frontend:

- If your code runs in the backend then we can assume that your server is trusted to safely store secrets (as you will see, we use a secret in the backend scenario). If that's the case proceed to the [backend section](#from-the-backend) of this article.

- If your code runs in the frontend (for example, it's a SPA, native desktop, or mobile app) then your app cannot hold credentials securely and has to follow an alternate approach. To see your options proceed to the [frontend section](#from-the-frontend) of this article.

## From the backend

Once you authenticate a user, the IdP often includes an Access Token in the user profile it returns to Auth0. 

Auth0, for security and compliance reasons, does **not** sent this token to your app as part of the user profile. In order to get it you will have to access the Auth0 Management API and retrieve the **full** user's profile. 

The steps to follow are:

1. Get an Access Token that allows you to call the [Auth0 Management API](/api/management/v2).
2. Call the Auth0 Management API's [Get Users by ID](/api/management/v2#!/Users/get_users_by_id) endpoint, using the Access Token obtained in step one. This endpoint returns the full user's profile, which contains the IdP Access Token.
3. Extract the IdP Access Token from the response and use it to call the IdP's API.

### Step 1: Get a Token

You will need an Access Token to call the [Management API](/api/management/v2).

If this is the first time you are requesting a [Management APIv2 Token](/api/management/v2/tokens), you will need to create and configure an application that can be used to call the API.

To do so, go to [Dashboard > APIs > Auth0 Management API > API Explorer](${manage_url}/#/apis/management/explorer) and click **Create & Authorize a Test Application**.

This will create a new application and grant **all scopes of the Management API**. This means that the tokens generated for this application will be able to access **all Management API endpoints**.

::: panel Can't see the button?
If you don't see this button, it means that you have at least one authorized application already. In this case you can either update the scopes of an existing application and use that, or create a new one following these steps:
1. Go to [Dashboard > Applications](${manage_url}/#/applications)
2. Click **+ Create Application**, select **Machine-to-Machine Applications** and click **Create**
3. At the **Select an API** dropdown select `Auth0 Management API`
4. Click **Navigate to the API and Authorize**
5. Set the toggle to **Authorized** and enable the required scopes
:::

It is recommended, for security reasons, that you only assign the required scopes to the application you will be using. For this particular case, the scopes you need are: `read:users`, `read:user_idp_tokens`.

You can grant or remove scopes from an application, at the [Dashboard > APIs > Auth0 Management API > Machine-to-Machine Applications tab](${manage_url}/#/apis/management/authorized-applications).

![Edit the scopes granted to the Application](/media/articles/connections/edit-granted-scopes.png)

You are now done with the configuration part, and you are ready to get your Management API token.

To do so, go to the [Test tab](${manage_url}/#/apis/management/test). There you can find ready-to-use snippets that you can use to get a token.

Pick your application using the dropdown at the top, and choose your language of preference for the snippet.

Copy and run the snippet. Extract the `access_token` property from the response. This is what you will use to access the Management API.

::: panel More info on the snippets
The snippets make a `POST` operation to the [/oauth/token endpoint of the Auth0 Authentication API](/api/authentication#client-credentials), using the **OAuth 2.0 Client Credentials grant**. This is the grant that machine-to-machine processes utilize in order to access an API. For more information on the grant, refer to [Calling APIs from a Service](/api-auth/grant/client-credentials).
:::

#### Token expiration

The token you received has, by default, an expiration time of 24 hours (86400 seconds). To change this, update the **Token Expiration (Seconds)** field, at the [Settings tab](${manage_url}/#/apis/management/settings) and save your changes. The next token you generate will use the updated expiration time.

::: panel-warning Security warning
These tokens **cannot be revoked**. To minimize the risk, we recommend issuing short-lived tokens (and granting only the necessary scopes for each application). For a production environment you can configure a simple CLI that will fetch a new token when the old one expires. You can find a sample implementation in Python [here](/api/management/v2/tokens#sample-implementation-python).
:::

### Step 2: Get the full User Profile

Using the Access Token you got in the previous section, call the [Get a User endpoint of the Management API](/api/management/v2#!/Users/get_users_by_id), in order to get a user's profile:

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
- `USER_ID`: The ID of the user for whom you want to call the IdP's API.
- `YOUR_ACCESS_TOKEN`: The token you got from the previous step.

::: panel Where do I find the User ID?
- For testing purposes, you can find a user ID at [Dashboard > Users](${manage_url}/#/users/). Select a user and copy the value of the **user_id** field.
- For your implementation, you can either extract this information from the [ID Token](/tokens/id-token) (get the value of the claim **sub**), or call the [/userinfo endpoint of the Authentication API](/api/authentication#get-user-info) (get the value of the response property **user_id**).
:::


### Step 3: Extract the IdP Access Token

Within the user's `identities` array, there will be an `access_token` that you can extract and use to make calls to the IdP's API: `user.identities[0].access_token`.

::: note
For certain Identity Providers, Auth0 will store a `refresh_token` which you can use to obtain a new `access_token` for the IdP. This works for: BitBucket, Google (OAuth 2.0), OAuth 2.0, SharePoint, Azure AD. For more information, refer to [Identity Provider Access Tokens](/tokens/idp#renewing-the-token).
:::

In most cases, the user will only have one identity, but if you have used the [account linking feature](/link-accounts), there may be more.

In this sample response we can see that our user had only one identity: `google-oauth2`.

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
Make sure that you don't expose the IdP tokens to your client-side application! If your application is public refer to the [frontend section](#from-the-frontend) of this article.
:::

::: note
For more information on how to request specific scopes for an Identity Provider `access_token`, please see [Add scopes/permissions to call Identity Provider's APIs](/tutorials/adding-scopes-for-an-external-idp).
:::

## From the frontend

If you are working with a public application (SPA, native desktop, or mobile app) then this is the place to be.

As you might have read earlier in this article, the process for calling IdP APIs from a **backend process** includes the following steps:

1. Get an Access Token in order to access the Auth0 Management API
2. Use said token to retrieve the user's full profile from the Auth0 Management API
3. Extract the IdP's Access Token from the user's full profile, and use it to call the IdP's API

You cannot follow the same process from a frontend app because it's a public application that **cannot hold credentials securely**. The credential we are referring to, is the machine to machine application's secret which you use to make the call to `/oauth/token`, at the first step of the process.

SPA's code can be viewed and altered and native/mobile apps can be decompiled and inspected. As such, they cannot be trusted to hold sensitive information like secret keys or passwords.

There are some alternatives you can use.

### Option 1: Build a proxy

You can build a process in your backend and expose it to your application as an API.

The backend process will implement the steps of [the backend section](#from-the-backend). You will call the IdP's API from the same backend process so the Access Token is never exposed to your public application.

Then, you will call your proxy API from your public application using the respective flow for your case:
- [Implicit Grant](/api-auth/tutorials/implicit-grant) if you are working with a SPA
- [Authorization Code Grant (PKCE)](/api-auth/tutorials/authorization-code-grant-pkce) if you are working with a mobile application

:::panel Show me how to do it
If you haven't implemented this before, you might find our [SPA + API](/architecture-scenarios/application/spa-api) article useful. It covers a different scenario but it does explain how to configure Auth0, call an API from a SPA, and implement the API validations. It comes with a sample that uses [Angular 2](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-spa/angular) and [Node.js](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-api/node). We also offer a [Mobile + API](/architecture-scenarios/application/mobile-api) variation (the sample uses [Android](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-mobile/android) and [Node.js](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-api/node)).
:::

### Option 2: Use webtasks

If you don't have a backend server, and you don't want to set up one, then you can leverage serverless technology, using webtasks.

Webtasks are the Auth0 way to create HTTP endpoints with Node.js and access them from anywhere. It's a way to safely execute server-side logic, when you do not have a backend. They come with a command line tool and an editor. For more information refer to [the webtask.io documentation](https://webtask.io/).

:::note
This option comes with an additional cost, for details see [Auth0 Extend pricing](https://auth0.com/extend/pricing).
:::

In this scenario, you will create a webtask and implement the steps of [the backend section](#from-the-backend). Then the webtask will call the IdP's API so the Access Token is never exposed to your public application.

Your application will invoke the webtask with a simple HTTP request and manipulate the response appropriately (for example, render the user's GitHub repositories in the UI).

:::note
You can find a sample [in this GitHub repository](https://github.com/vikasjayaram/ext-idp-api-webtask/tree/master/RS256). Review carefully before you use it since this is not officially maintained by Auth0 and could be outdated.
:::
