g---
title: Call an Identity Provider API
description: How to call an Identity Provider API.
---

# Call an Identity Provider API

Once you successfully authenticate a user with an external Identity Provider (IdP), such as Facebook or GitHub, the IdP often includes an access token in the user's profile. You can use this token to call the IdP's API.

<div class="alert alert-info">
  This doc assumes that you have already configured the connection with the IdP of your choice. If not, refer to <a href="/identityproviders">Identity Providers Supported by Auth0</a>, where you can find a list of the supported IdPs. Select the one you want for detailed steps on how to configure the connection.
</div>

If you need access to the user's IdP access token, you will need to call the [Get Users by ID](/api/management/v2#!/Users/get_users_by_id) endpoint of the [Auth0 Management API](/api/management/v2) with the `read:user_idp_tokens` scope. This document provides details on the recommended method to do so.

## 1. Get a Token

In order to access the [Management API](/api/management/v2), you need an access token. 

If this is the first time you are trying to get a Management APIv2 Token, there is a little configuration required:
1. Go to [Dashboard > APIs > Auth0 Management API > API Explorer](${manage_url}/#/apis/management/explorer).
2. Click __Create & Authorize a Test Client__.

That's it! You can now see a token in your screen. Click __Copy Token__ to copy it.

Alternatively, you may want to automate this process. In this case, instead of manually copying the token, click on the [Test tab](${manage_url}/#/apis/management/test) and use the provided snippet. It's a `POST` operation to the [https://${account.namespace}/oauth/token](/api/authentication#client-credentials) endpoint.

<div class="alert alert-info">
  For details on the Management APIv2 token and the process to get one refer to <a href="/api/management/v2/tokens">The Auth0 Management APIv2 Token</a>.
</div>

### 2. Get the User Profile

Using the access token, call the [Get a User](/api/management/v2#!/Users/get_users_by_id) endpoint to get the user profile:

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

<div class="alert alert-warning">
  <strong>Security Warning!</strong> Make sure that you don't expose the IdP access token to your client-side application.
</div>