---
description: Details on how to generate and use a token for the Auth0 Management APIv2
section: apis
crews: crew-2
toc: true
---
# The Auth0 Management APIv2 Token

In order to call the endpoints of [Auth0 Management API v2](/api/management/v2), you need a token, what we refer to as __Auth0 Management APIv2 Token__. This token is a [JWT](/jwt), it contains specific granted permissions (known as __scopes__), and it is signed with a application API key and secret for the entire tenant.

There are two ways to get a Management APIv2 Token:
- [get one manually using the Dashboard](#get-a-token-manually), or
- [automate the process](#automate-the-process) (build a simple command line tool that generates tokens).

In this article we will see how you can do either.

## Get a token manually

::: warning
Τhe Management APIv2 token, by default, has a validity of __24 hours__. After that the token will expire and you will have to get a new one. If this doesn't work for you, you can either [change the validity period of the token](#2-get-the-token), or [automate the process](#automate-the-process).
:::

Let's see how you can get a token manually. Note, that the first step of the process need to be executed _only_ the first time.

### 1. Create and Authorize an Application

First, you need to create and authorize a Machine to Machine Application. We recommend creating one exclusively for authorizing access to the Management API, instead of reusing another one you might have. If you already have done that, you can skip this paragraph.

::: panel What is a Machine to Machine Application?
A Machine to Machine Application represents a program that interacts with an API where there is no user involved. An example would be a server script that would be granted access to consume a Zip Codes API. It's a machine to machine interaction. This must be used instead of a Single Page or Native apps because those cannot meet the necessary security requirements for executing this type of flow. If you want to read more about calling APIs this way, refer to [Calling APIs from a Service](/api-auth/grant/client-credentials).
:::

To create and authorize a Machine to Machine Application for the Management API, go to [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer).

Click the button __Create & Authorize a Test Application__.

![Create and Authorize Application](/media/articles/api/tokens/create-authorize-client.png)

That's it! A new application has been created and it's authorized to access the Management API.

Note, that each Machine to Machine Application that accesses an API, has to be granted a set of scopes. This application that we just created has been granted __all__ the APIv2 scopes. This means that it can access all the endpoints.

::: panel What are the scopes?
The scopes are permissions that should be granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. For example, the [Get all applications](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create an application](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. From that we can deduce that if we need to read _and_ create applications, then our token should include three scopes: `read:clients`, `read:client_keys` and `create:clients`.
:::

::: note
If you have multiple apps that should access the Management API, and you need different sets of scopes per app, we recommend creating a new Machine to Machine Application for each. For example, if one app is to read and create users (`create:users`, `read:users`) and another to read and create applications (`create:clients`, `read:clients`) create two Applications (one for user scopes, one for applications) instead of one.
:::

### 2. Get the Token

A token is automatically generated and displayed at [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer).

Note, that this token has by default an expiration time of 24 hours (86400 seconds). To change that, update the __Token Expiration (Seconds)__ field and click __Update & Regenerate Token__.

![Test Application](/media/articles/api/tokens/copy-token.png)

Click __Copy Token__. You can now make authorized calls to the [Management API v2](/api/management/v2) using this token.

### 3. Use the Token

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

## Automate the Process

[The manual process](#get-a-token-manually) might work for you if you want to test an endpoint or invoke it sporadically. But if you need to make scheduled frequent calls then you have to build a simple CLI that will provide you with a token automatically (and thus simulate a non-expiring token).

::: panel Prerequisites
Before you proceed with the implementation, you must have [created and authorized a Machine to Machine Application](#1-create-and-authorize-an-application). The Application should have all the required scopes for the endpoints you mean to access.
:::

### 1. Get a Token

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
- `grant_type`: Denotes which [OAuth 2.0 flow](/protocols/oauth2#authorization-grant-types) you want to run. For machine to machine communication use the value `client_credentials`.
- `client_id`: This is the value of the __Client ID__ field of the Machine to Machine Application you created at [this step](#1-create-an-application). You can find it at the [Settings tab of your Application](${manage_url}/#/applications/${account.clientId}/settings).
- `client_secret`: This is the value of the __Client Secret__ field of the Machine to Machine Application you created at [this step](#1-create-an-application). You can find it at the [Settings tab of your Application](${manage_url}/#/applications/${account.clientId}/settings).
- `audience`: This is the value of the __Identifier__ field of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis).

The response will contain a [signed JWT (JSON Web Token)](/jwt), when it expires, the scopes granted, and the token type.

```json
{
  "access_token": "eyJ...Ggg",
  "expires_in": 86400,
  "scope": "read:clients create:clients read:client_keys",
  "token_type": "Bearer"
}
```

From the above we can see that our `access_token` is a [bearer Access Token](https://tools.ietf.org/html/rfc6750), it will expire in 24 hours (86400 seconds), and it has been authorized to read and create applications.

### 2. Use the Token

To use this token, just include it in the `Authorization` header of your request .

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
  You can get the curl command for each endpoint from the Management API v2 Explorer. Go to the endpoint you want to call, and click the <em>get curl command</em> link at the <em>Test this endpoint</em> section.
:::

That's it! You are done!

### Sample Implementation: Python

This python script gets a Management API v2 Access Token, uses it to call the [Get all applications](/api/management/v2#!/Clients/get_clients) endpoint, and prints the response in the console.

Before you run it make sure that the following variables hold valid values:
- `AUDIENCE`: The __Identifier__ of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis).
- `DOMAIN`: The __Domain__ of the Machine to Machine Application you created at [this step](#1-create-an-application).
- `CLIENT_ID`: The __Client ID__ of the Machine to Machine Application you created at [this step](#1-create-an-application).
- `CLIENT_SECRET`: The __Client Secret__ of the Machine to Machine Application you created at [this step](#1-create-an-application).

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

## Frequently Asked Questions

__How long is the token valid for?__</br>
The Management APIv2 token has by default a validity of __24 hours__. After that the token will expire and you will have to get a new one. If you get one manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer) though, you can change the expiration time. However, having non-expiring tokens is not secure.

__The old way of generating tokens was better, since the token never expired. Why was this changed?__</br>
The old way of generating tokens was insecure since the tokens had an infinite lifespan. The new implementation allows tokens to be generated with specific scopes and expirations. We decided to move to the most secure implementation because your security, and that of your users, is priority number one for us.

__Can I change my token's validity period?__</br>
You cannot change the default validity period, which is set to 24 hours. However, if you get a token manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer) you can change the expiration time for the specific token. Note though, that your applications should use short-lived tokens to minimize security risks.

__Can I refresh my token?__</br>
You cannot renew a Management APIv2 token. A [new token](#2-get-the-token) should be created when the old one expires.

__My token was compromised! Can I revoke it?__</br>
You cannot directly revoke a Management APIv2 token, thus we recommend a short validity period. 
Note that deleting the application grant will prevent *new tokens* from being issued to the application. You can do this either by [using our API](/api/management/v2#!/Client_Grants/delete_client_grants_by_id), or manually [deauthorize the APIv2 application using the dashboard](${manage_url}/#/apis/management/authorized-applications).

__My Client Secret was compromised! What should I do?__</br>
You need to change the secret immediately. Go to your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings) and click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i>, or use the [Rotate a client secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint. Note that previously issued tokens will continue to be valid until their expiration time.

## Keep reading

::: next-steps
* [Changes in Auth0 Management APIv2 Tokens](/api/management/v2/tokens-flows)
* [Calling APIs from a Service](/api-auth/grant/client-credentials)
* [Ask for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
* [Information on the query string syntax](/api/management/v2/query-string-syntax)
* [Search for Users](/api/management/v2/user-search)
:::
