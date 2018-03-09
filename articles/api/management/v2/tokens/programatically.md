---
description: How to programatically generate and use a token for the Management API
title: Programatically Generate and Use an Access Token for the Management API
section: apis
crews: crew-2
toc: true
---
# Generate and Use an Access Token for the Management API

The [manual process](/api/management/v2/tokens/manually) for getting a token might work for you if you want to test an endpoint or invoke it sporadically. However, if you need to make scheduled/frequent calls, then you should build an app that provides you with a token automatically. Its behavior is functionally equivalent to having a non-expiring token.

In this article, we will show you how you can generate tokens for use with the Management API.

::: panel Prerequisites
Before you proceed with this tutorial, you must [create and authorize a Non Interactive Client](/api/management/v2/tokens/manually#1-create-and-authorize-a-client). The Client should have all the required scopes for the endpoints you need to access.
:::

## 1. Get a token

To obtain an Access Token for the Management API, make a **POST** call to the **https://${account.namespace}/oauth/token** using the credentials of the Non Interactive Client [you created](/api/management/v2/tokens/manually#1-create-and-authorize-a-client). 

Your payload will look something like this:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"https://${account.namespace}/api/v2/\"}"
  }
}
```

The request parameters are as follows:

| Parameter | Description | 
| - | - |
| **grant_type** | Denotes which [OAuth 2.0 flow](/protocols/oauth2#authorization-grant-types) you want to run. For machine to machine communication use `client_credentials` |
| **client_id** | This is the value of the __Client ID__ field of the Non Interactive Client you created at [this step](/api/management/v2/tokens/manually#1-create-and-authorize-a-client). You can find it on the [Settings tab of your Client](${manage_url}/#/clients/${account.clientId}/settings) |
| **client_secret** | This is the value of the __Client Secret__ field of the Non Interactive Client you created at [this step](/api/management/v2/tokens/manually#1-create-and-authorize-a-client). You can find it on the [Settings tab of your Client](${manage_url}/#/clients/${account.clientId}/settings) |
| **audience** | This is the value of the __Identifier__ field of the `Auth0 Management API`. You can find it on the [Settings tab of the API](${manage_url}/#/apis) |

The response will contain a [signed JWT (JSON Web Token)](/jwt). The token includes information on when it expires, the scopes granted, and the token type.

For example, the following sample response indicates that our Access Token is a [bearer Access Token](https://tools.ietf.org/html/rfc6750) that will expire in 24 hours (or 86400 seconds) and authorizes the user to read and create clients.

```json
{
  "access_token": "eyJ...Ggg",
  "expires_in": 86400,
  "scope": "read:clients create:clients read:client_keys",
  "token_type": "Bearer"
}
```

## 2. Use the token

To use the Access Token token, include it in the `Authorization` header of your request to the Management API.

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

For example, in order to call [Get all clients](/api/management/v2#!/Clients/get_clients), you would include the following header with your request:

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
You can get the curl command for each endpoint from the Management API Explorer. Go to the endpoint you want to call, and click the <em>get curl command</em> link in the <em>Test this endpoint</em> section.
:::

That's it! You are done!

## Sample implementation: Python

The following Python script:

1. Obtains a Management API Access Token
2. Uses the newly-obtained token to call the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint
3. Prints the results of its actions in the console.

Before you run it make sure that the following hold valid values:

| Parameter | Description |
| - | - |
| AUDIENCE | The __Identifier__ of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis) |
| DOMAIN | The __Domain__ of the Non Interactive Client [you created](/api/management/v2/tokens/manually#1-create-and-authorize-a-client) |
| CLIENT_ID | The __Client ID__ of the Non Interactive Client [you created](/api/management/v2/tokens/manually#1-create-and-authorize-a-client) |
| CLIENT_SECRET | The __Client Secret__ of the Non Interactive Client [you created](/api/management/v2/tokens/manually#1-create-and-authorize-a-client) |

```python
def main():
  import json, urllib, urllib2

  # Configuration Values
  AUDIENCE = "https://${account.namespace}/api/v2/"
  DOMAIN = "${account.namespace}"
  CLIENT_ID = "${account.clientId}"
  CLIENT_SECRET = "${account.clientSecret}"
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

  # Get all Clients using the token
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