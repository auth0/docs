---
description: Details on how to generate and use a token for the Auth0 Management APIv2
section: apis
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - concept
    - how-to
useCase: invoke-api
---
# How to Get an Access Token for the Management API

In order to call the endpoints of [Auth0 Management API v2](/api/management/v2), you need to authenticate. For this you need a token, which we call the __Auth0 Management API Token__. 

This token is a [JSON Web Token](/jwt) and it contains specific granted permissions (known as __scopes__).

## How to get and use tokens

If you want to quickly call an endpoint for test purposes, then you can [get a token manually using the Dashboard](#get-a-token-for-test).

For production use however, the recommended best practice is to [get short-lived tokens programmatically](#get-a-token-for-production). 

## Before you start

In this section we will see some configuration you must do in the Auth0 [Dashboard](${manage_url}) the first time you want to get a token for the Management API. You won't have to do this again, unless you create a new tenant.

You must create and authorize a [Machine to Machine Application](/applications/machine-to-machine). We recommend creating one exclusively for authorizing access to the Management API, instead of reusing another one you might have.

To create and authorize a Machine to Machine Application for the Management API:
1. Go to [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer)
2. Click the button __Create & Authorize a Test Application__
3. That's it! A new application has been created and it's authorized to access the Management API

![Create and Authorize Application](/media/articles/api/tokens/create-authorize-client.png)

Note, that each Machine to Machine Application that accesses an API, has to be granted a set of scopes. This application that we just created has been granted __all__ the Management API scopes. This means that it can access all the endpoints.

::: panel What are the scopes?
The scopes are permissions that should be granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. For example, the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create an application](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. From that we can deduce that if we need to read _and_ create applications, then our token should include three scopes: `read:clients`, `read:client_keys` and `create:clients`.
:::

If you have multiple applications that should access the Management API, and you need different sets of scopes per app, we recommend creating a new Machine to Machine Application for each. For example, if one application is to read and create users (`create:users`, `read:users`) and another to read and create applications (`create:clients`, `read:clients`) create two Applications (one for user scopes, one for applications) instead of one.

:::panel How do I know which scopes I must set?
Go to the [Management API Explorer](/api/management/v2#!) and find the endpoint you want to call. Each endpoint has a section called **Scopes** and there you can find listed all the scopes that this endpoint requires. For example, the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`.
:::

## Get a token for test

:::note
If this the first time you are trying to get a token for your tenant, then you must do some [configuration steps](#before-you-start) before you continue in this section.
:::

Let's see how you can get a token manually. Remember, this is only for test purposes. You shouldn't get manually long-lived tokens and use them in your applications, since this is cancelling out the security advantages that tokens offer. 

To manually get a token, go to [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer). A token is automatically generated and displayed there. 

Click __Copy Token__. You can now make authorized calls to the [Management API v2](/api/management/v2) using this token.

![Test Application](/media/articles/api/tokens/copy-token.png)

Note that this token has by default an expiration time of __24 hours__ (86400 seconds). After that the token will expire and you will have to get a new one. To change that, update the __Token Expiration (Seconds)__ field and click __Update & Regenerate Token__.

:::warning
These tokens **cannot be revoked** so long expiration times are not recommended. Instead we recommend that you use short expiration times and issue a new one every time you need it.
:::

### Use the token

You can use the [Management API v2 explorer page](/api/management/v2) to manually call an endpoint, using the token you got in the previous step. You will need:
- The Management API v2 token you just got.
- Your tenant's domain (`${account.namespace}`). You can find this on the _Settings_ of any of your [Applications](${manage_url}/#/applications/${account.clientId}/settings).

Once you have this information you are ready to call the API. Follow these steps:
1. Go to the [Management API v2 explorer page](/api/management/v2)
1. Click the __Set API Token__ button at the top left
1. Set the __Domain__ and __API Token__ fields, and click __Set Token__
1. Under the __Set API Token__ button at the top left, some new information is now displayed: the domain and token set, and the scopes that have been granted to this application
1. Go to the endpoint you want to call, fill any parameters that might be required and click __Try__

![Set the Token](/media/articles/api/tokens/set-token.png)

## Get a token for production

:::note
If this the first time you are trying to get a token for your tenant, then you must do some [configuration steps](#before-you-start) before you continue in this section.
:::

[The manual process](#get-a-token-for-test) might work for you if you want to test an endpoint. But if you need to make scheduled frequent calls then you have to build a process at your backend that will provide you with a token automatically (and thus simulate a non-expiring token).

### Step 1. Get a token

To ask Auth0 for a Management API v2 token, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint, using the credentials of the Machine to Machine Application you created at [this step](#1-create-and-authorize-an-application).

The payload should be in the following format:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"audience\": \"https://${account.namespace}/api/v2/\"}"
  }
}
```

The request parameters are:

| __Request Parameter__ | __Description__ |
| ------ | ----------- |
| __grant_type__ | Denotes which [OAuth 2.0 flow](/protocols/oauth2#authorization-grant-types) you want to run. For machine to machine communication use the value `client_credentials`. |
| __client_id__ | This is the value of the __Client ID__ field of the Machine to Machine Application you created at [this step](#before-you-start). You can find it at the [Settings tab of your Application](${manage_url}/#/applications/${account.clientId}/settings). |
| __client_secret__ | This is the value of the __Client Secret__ field of the Machine to Machine Application you created at [this step](#before-you-start). You can find it at the [Settings tab of your Application](${manage_url}/#/applications/${account.clientId}/settings). |
| __audience__ | This is the value of the __Identifier__ field of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis). |

The response will contain a [signed JWT](/jwt), when it expires, the scopes granted, and the token type.

```json
{
  "access_token": "eyJ...Ggg",
  "expires_in": 86400,
  "scope": "read:clients create:clients read:client_keys",
  "token_type": "Bearer"
}
```

From the above we can see that our Access Token is a [bearer Access Token](https://tools.ietf.org/html/rfc6750), it will expire in 24 hours (86400 seconds), and it has been authorized to read and create applications.

#### Use Auth0's Node.js Client Library

As an alternative to making HTTP calls, you can use the [node-auth0](https://www.npmjs.com/package/auth0) library to automatically [obtain tokens for the Management API](https://www.npmjs.com/package/auth0#user-content-management-api-client).

### Step 2. Use the token

To use this token, include it in the `Authorization` header of your request.

```har
{
  "method": "POST",
  "url": "http://PATH_TO_THE_ENDPOINT/",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN"}
  ]
}
```

For example, in order to [Get all applications](/api/management/v2#!/Clients/get_clients) use the following:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/clients",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5ESTFNa05DTVRGQlJrVTRORVF6UXpFMk1qZEVNVVEzT1VORk5ESTVSVU5GUXpnM1FrRTFNdyJ9.eyJpc3MiOiJodHRwczovL2RlbW8tYWNjb3VudC5hdXRoMC5jb20vIiwic3ViIjoib9O7eVBnMmd4VGdMNjkxTnNXY2RUOEJ1SmMwS2NZSEVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGVtby1hY2NvdW50LmF1dGgwLmNvbS9hcGkvdjIvIiwiZXhwIjoxNDg3MDg2Mjg5LCJpYXQiOjE5ODY5OTk4ODksInNjb3BlIjoicmVhZDpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMifQ.oKTT_cEA_U6hVzNYPCl_4-SnEXXvFSOMJbZyFydQDPml2KqBxVw_UPAXhjgtW8Kifc_b2HQ4jFh7nH0KC_j1XjfEJPvwFZgqfI_ILzO3DPfpEIK_n_aX-Tz4okbZe6nj2aT_qLpHimLxK50jOGaMuzp4a1djHJTj5q-NbIiPW8AJowS2-gveP4T3dyyegUsZkmTNwrreqppPApmpWWE-wVsxnVsI_FZFrHnq0rn7lmY_Iz6vyiZjaKrd2C3hFm0zFGTn8FslBfHUldTcDNzOKOpCq7HFMeU0urXBXDetrzkW1afxIqED3G2C51JEV-4nTRYUinnWgXJfLJ87G3ge_A"}
  ]
}
```

::: note
You can get the curl command for each endpoint from the Management API v2 Explorer. Go to the endpoint you want to call, and click the __get curl command__ link at the __Test this endpoint__ section.
:::

### Sample Implementation: Python

This python script gets a Management API v2 Access Token, uses it to call the [Get all applications](/api/management/v2#!/Clients/get_clients) endpoint, and prints the response in the console.

Before you run it make sure that the following variables hold valid values:
- `AUDIENCE`: The __Identifier__ of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis).
- `DOMAIN`: The __Domain__ of the Machine to Machine Application you created at [this step](#before-you-start).
- `CLIENT_ID`: The __Client ID__ of the Machine to Machine Application you created at [this step](#before-you-start).
- `CLIENT_SECRET`: The __Client Secret__ of the Machine to Machine Application you created at [this step](#before-you-start).

```python
def main():
  import json, urllib, urllib2

  # Configuration Values
  AUDIENCE = "https://${account.namespace}/api/v2/"
  DOMAIN = "${account.namespace}"
  CLIENT_ID = "${account.clientId}"
  CLIENT_SECRET = "YOUR_CLIENT_SECRET"
  GRANT_TYPE = "client_credentials" # OAuth 2.0 flow to use

  # Get an Access Token from Auth0
  base_url = "https://{domain}".format(domain=DOMAIN)
  data = urllib.urlencode([('client_id', CLIENT_ID),
                          ('client_secret', CLIENT_SECRET),
                          ('audience', AUDIENCE),
                          ('grant_type', GRANT_TYPE)])
  req = urllib2.Request(base_url + "/oauth/token", data)
  response = urllib2.urlopen(req)
  oauth = json.loads(response.read())
  access_token = oauth['access_token']

  # Get all Applications using the token
  req = urllib2.Request(base_url + "/api/v2/clients")
  req.add_header('Authorization', 'Bearer ' + access_token)
  req.add_header('Content-Type', 'application/json')

  try:
    response = urllib2.urlopen(req)
    res = json.loads(response.read())
    print res
  except urllib2.HTTPError, e:
    print 'HTTPError = ' + str(e.code) + ' ' + str(e.reason)
  except urllib2.URLError, e:
    print 'URLError = ' + str(e.reason)
  except urllib2.HTTPException, e:
    print 'HTTPException'
  except Exception:
    print 'Generic Exception'

# Standard boilerplate to call the main() function.
if __name__ == '__main__':
  main()
```

## Get a token from the frontend

The method we showed in the previous section cannot be used from Single Page Applications (SPAs). The reason why is because we are using the **Client Secret** which is sensitive information (same as a password) and cannot be exposed to the browser.

You can still get tokens for the Management API from the frontend, but very limited in scope. You can access only certain scopes and update only the logged-in user's data. In detail, you can access the following scopes, and hence endpoints:

| **Endpoint** | **Scope for current user** |
| ------ | ----------- |
| [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) | `read:current_user` |
| [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) | `read:current_user` |
| [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) | `update:current_user_identities` |
| [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) | `update:current_user_identities` |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | `update:current_user_metadata` |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | `create:current_user_metadata` |
| [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) | `delete:current_user_metadata` |
| [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) | `create:current_user_device_credentials` | 
| [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) | `delete:current_user_device_credentials` |

For example, if I get an Access Token that contains the scope `read:current_user` I can retrieve the information of the **currently logged-in user** (the one that the token was issued for).

You can get a token, for example to retrieve the information of the currently logged-in user, using the [Authorization endpoint](/api/authentication#authorize-application). This is where you redirect your users to login or sign up.

In the example below, we want to use the [GET User by ID endpoint](/api/management/v2#!/Users/get_users_by_id) to retrieve the full profile information of the logged-in user. To do so, first we will authenticate our user (using the [Implicit grant](/api/authentication?http#implicit-grant)) and retrieve the token(s).

```text
https://${account.namespace}/authorize?
  audience=https://${account.namespace}/api/v2/
  &scope=read:current_user
  &response_type=token%20id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &nonce=CRYPTOGRAPHIC_NONCE
  &state=OPAQUE_VALUE
```

:::note
If you are not familiar with authentication for Single Page Applications, see [Authentication for Client-side Web Apps](/application-auth/current/client-side-web).
:::

Notice the following:
- We set the `audience` to `https://${account.namespace}/api/v2/`
- We asked for the scope `read:current_user`
- We set the `response_type` to `id_token token` so Auth0 will sent us both an ID Token and an Access Token

If we decode the Access Token and review its contents we can see the following:

```text
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|5a620d29a840170a9ef43672",
  "aud": "https://${account.namespace}/api/v2/",
  "iat": 1521031317,
  "exp": 1521038517,
  "azp": "${account.clientId}",
  "scope": "read:current_user"
}
```

Notice that the `aud` is set to your tenant's API URI, the `scope` to `read:current_user`, and the `sub` to the user ID of the logged in user.

Once you have the Access Token you can use it to call the endpoint. Use the Access Token in the `Authorization` header of the request.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users/USER_ID",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  }]
}
```

## Frequently Asked Questions

__How long is the token valid for?__</br>
The Management API token has by default a validity of __24 hours__. After that the token will expire and you will have to get a new one. If you get one manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer) though, you can change the expiration time. However, having non-expiring tokens is not secure.

__The old way of generating tokens was better, since the token never expired. Why was this changed?__</br>
The old way of generating tokens was insecure since the tokens had an infinite lifespan. The new implementation allows tokens to be generated with specific scopes and expirations. We decided to move to the most secure implementation because your security, and that of your users, is priority number one for us.

__Can I change my token's validity period?__</br>
You cannot change the default validity period, which is set to 24 hours. However, if you get a token manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer) you can change the expiration time for the specific token. Note though, that your applications should use short-lived tokens to minimize security risks.

__Can I refresh my token?__</br>
You cannot renew a Management API token. A [new token](#2-get-the-token) should be created when the old one expires.

__My token was compromised! Can I revoke it?__</br>
You cannot directly revoke a Management API token, thus we recommend a short validity period.
Note that deleting the application grant will prevent *new tokens* from being issued to the application. You can do this either by [using our API](/api/management/v2#!/Client_Grants/delete_client_grants_by_id), or manually [deauthorize the API application using the dashboard](${manage_url}/#/apis/management/authorized-applications).

__My Client Secret was compromised! What should I do?__</br>
You need to change the secret immediately. Go to your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings) and click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i>, or use the [Rotate a client secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint. Note that previously issued tokens will continue to be valid until their expiration time.

## Keep reading

::: next-steps
* [Changes in Auth0 Management API Tokens](/api/management/v2/tokens-flows)
* [Calling APIs from a Service](/api-auth/grant/client-credentials)
* [Ask for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
* [Information on the query string syntax](/api/management/v2/query-string-syntax)
* [Search for Users](/users/search)
:::
