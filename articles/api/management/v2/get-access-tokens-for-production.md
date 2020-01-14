---
description: How to get Access Tokens to make scheduled frequent calls to the Management API.
section: apis
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - how-to
useCase: invoke-api
---

# Get Access Tokens for Production

To make scheduled frequent calls for a production environment, you have to build a process at your backend that will provide you with a token automatically (and thus simulate a non-expiring token).

## Prerequisite

* [Create and Authorize a Machine-to-Machine Application](/api/management/v2/create-m2m-app). 

## Get Access Tokens

To ask Auth0 for a Management API v2 token, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint, using the credentials of the Machine-to-Machine Application you created in the prerequisite step.

The payload should be in the following format:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
        {
          "name": "grant_type",
          "value": "client_credentials"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        },
        {
          "name": "client_secret",
          "value": "YOUR_CLIENT_SECRET"
        },
        {
          "name": "audience",
          "value": "https://${account.namespace}/api/v2/"
        }
    ]
  }
}
```

The request parameters are:

| __Request Parameter__ | __Description__ |
| ------ | ----------- |
| __grant_type__ | Denotes which [OAuth 2.0 flow](/protocols/oauth2#authorization-grant-types) you want to run. For machine to machine communication use the value `client_credentials`. |
| __client_id__ | This is the value of the __Client ID__ field of the Machine-to-Machine Application you created. You can find it at the [Settings tab of your Application](${manage_url}/#/applications/${account.clientId}/settings). |
| __client_secret__ | This is the value of the __Client Secret__ field of the Machine-to-Machine Application you created. You can find it at the [Settings tab of your Application](${manage_url}/#/applications/${account.clientId}/settings). |
| __audience__ | This is the value of the __Identifier__ field of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis). |

The response will contain a [signed JWT](/tokens/concepts/jwts), when it expires, the <dfn data-key="scope">scopes</dfn> granted, and the token type.

```json
{
  "access_token": "eyJ...Ggg",
  "expires_in": 86400,
  "scope": "read:clients create:clients read:client_keys",
  "token_type": "Bearer"
}
```

From the above we can see that our <dfn data-key="access-token">Access Token</dfn> is a [Bearer Access Token](https://tools.ietf.org/html/rfc6750), it will expire in 24 hours (86400 seconds), and it has been authorized to read and create applications.

### Use Auth0's Node.js Client Library

As an alternative to making HTTP calls, you can use the [node-auth0](https://www.npmjs.com/package/auth0) library to automatically [obtain tokens for the Management API](https://www.npmjs.com/package/auth0#user-content-management-api-client).

## Use Access Tokens

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

## Example: Python Implementation

This python script gets a Management API v2 Access Token, uses it to call the [Get all applications](/api/management/v2#!/Clients/get_clients) endpoint, and prints the response in the console.

Before you run it make sure that the following variables hold valid values:
- `AUDIENCE`: The __Identifier__ of the `Auth0 Management API`. You can find it at the [Settings tab of the API](${manage_url}/#/apis).
- `DOMAIN`: The __Domain__ of the Machine-to-Machine Application you created.
- `CLIENT_ID`: The __Client ID__ of the Machine to Machine Application you created.
- `CLIENT_SECRET`: The __Client Secret__ of the Machine-to-Machine Application you created.

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

## Keep reading

- [Applications](/applications)
* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)


