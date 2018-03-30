---
public: false
---
# Parsing an HS256-Signed ID Token Without an Access Token

**Error Message**: accessToken parameter is not valid

## Why this error occurred

Beginning with **auth0.js version 9** and **Lock version 11**, when ID Tokens are signed with HS256, they are discarded and a call to **/userinfo** is made to retrieve user information. 

Calling **/userinfo** requires and Access Token. If you don't ask for an access token when authenticating, you will receive the following error:

```
accessToken parameter is not valid
```

## Ways to fix this error

1. Change the value of your **responseType** parameter to **token id_token**, so that you receive an Access Token in the response.

1. Change your client's hash algorithm to RS256. You can do so using the Dashboard:

    1. Go to [Dashboard > Clients]({$manage_url}/#/clients)
    1. Select your client
    1. Scroll to the bottom of the **Settings** tab, and click **Show Advanced Settings**
    1. Open up the **OAuth** tab. Change the value of **JsonWebToken Signature Algorithm** to **RS256**
    1. Scroll to the bottom of the page and click **Save Changes**

    If you proceed with this option and you are using the ID Token to call your APIs, be sure to change your server code so that it validates tokens using the RS256 algorithm instead of HS256. Note that using ID Tokens to call APIs [is not recommended](/api-auth/why-use-access-tokens-to-secure-apis).

