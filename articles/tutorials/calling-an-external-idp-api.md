---
title: Call an Identity Provider API
description: How to call an Identity Provider API.
crews: crew-2
---

# Call an Identity Provider API

Once you successfully authenticate a user with an external Identity Provider (IdP), such as Facebook or GitHub, the IdP often includes an access token in the user profile it returns. You can then use this token to call the IdP's API.

For more information on how to request specific scopes for an Identity Provider `access_token`, please see [Add scopes/permissions to call Identity Provider's APIs](/tutorials/adding-scopes-for-an-external-idp).

::: note
  This doc assumes that you have already configured the connection with the IdP of your choice. If not, refer to <a href="/identityproviders">Identity Providers Supported by Auth0</a>, where you can find a list of the supported IdPs. Select the one you want for detailed steps on how to configure the Connection.
:::

## Required Steps

To get access to the user's IdP access token, you will need to:

1. Obtain an access token that allows you to call the [Auth0 Management API](/api/management/v2).
2. Call the Auth0 Management API's [Get Users by ID](/api/management/v2#!/Users/get_users_by_id) endpoint using the access token obtained in step one (the token must have the `read:user_idp_tokens` scope). This returns the user's profile, which contains the IdP access token.
3. Extract the IdP access token.

Once you've extracted the IdP's access token, you can use it to to call the IdP's API. Please refer to your IdP's documentation for specifics on how to do so.

### 1. Get a Token

You will need an access token to call the [Management API](/api/management/v2).

If this is the first time you are requesting a Management APIv2 Token, you'll need to create and configure a test Client that can be used to call the API.

1. Go to [Dashboard > APIs > Auth0 Management API > API Explorer](${manage_url}/#/apis/management/explorer).
2. Click __Create & Authorize a Test Client__.
3. Go to the *Scopes* tab to set the ones that can be assigned by the API.

Once you've created the Client, you now have an access token that can be used to interact with the Management API. It can be found on the *API Explorer* page. Click __Copy Token__ so that you can use it at a later point.

#### Automate the Token Request

You may want to automate the token request process instead of manually copying and pasting the token. If this is the case, click on the [Test tab](${manage_url}/#/apis/management/test) and use the provided snippet. It's a `POST` operation to the [https://${account.namespace}/oauth/token](/api/authentication#client-credentials) endpoint.

The token you receive has, by default, an expiration time of 24 hours (86400 seconds). To change this, update the __Token Expiration (Seconds)__ field and click __Update & Regenerate Token__.

::: note
  For details on the Management APIv2 token and the process to get one refer to <a href="/api/management/v2/tokens">The Auth0 Management APIv2 Token</a>.
:::

::: panel-warning Security warning
It should be noted that these tokens __cannot be revoked__. We recommend issuing short-lived tokens to minimize the risk. For a production environment you can configure a simple CLI that will fetch a new token when the old one expires. You can find a sample implementation in Python [here](/api/management/v2/tokens#sample-implementation-python).
:::

### 2. Get the User Profile

Using the access token you obtained in step 1, call the [Get a User](/api/management/v2#!/Users/get_users_by_id) endpoint to get the user profile:

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
- `USER_ID`: The ID of the user for whom you want to call the IdP's API. You can find this at the [User Details](${manage_url}/#/users/).
- `YOUR_ACCESS_TOKEN`: The token you got from the previous step.


### 3. Extract the IdP Access Token

Within the user's `identities` array, there will be an `access_token` that you can extract and use to make calls to the IdP's API: `user.identities[0].access_token`.

::: note
The `access_token` is only returned from the following Identity Providers: BitBucket, Google (OAuth 2.0), OAuth 2.0, SharePoint, Azure AD. For more information, refer to [Identity Provider Access Tokens](https://auth0.com/docs/tokens/idp#renewing-the-token).
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

::: warning
  <strong>Security Warning!</strong> Make sure that you don't expose the IdP access token to your client-side application.
:::
