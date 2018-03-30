---
public: false
---
# Parsing an HS256-Signed ID Token Without an Access Token

**Error Message**: accessToken parameter is not valid

## Why this error occurred

Tokens signed with the HS256 algorithm cannot be properly validated.

Beginning with **auth0.js version 9** and **Lock version 11**, API calls to **/userinfo** must be made with a valid Access Token.

If you do not have an valid Access Token, you will receive the following error:

```
accessToken parameter is not valid
```

## Ways to fix this error

1. Change the value of your **responseType** parameter to **token id_token**, so that you receive an Access Token in the response
1. Change your client's hash algorithm to RS256. You can do so using the Dashboard:

    1. Go to [Dashboard > Clients]({$manage_url}/#/clients)
    1. Select your client
    1. Scroll to the bottom of the **Settings** tab, and click **Show Advanced Settings**
    1. Open up the **OAuth** tab. Change the value of **JsonWebToken Signature Algorithm** to **RS256**
    1. Scroll to the bottom of the page and click **Save Changes**