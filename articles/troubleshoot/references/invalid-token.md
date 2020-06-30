---
title: Invalid Token Errors
description: Describes how to troubleshoot invalid token errors. 
topics:
  - errors
  - tokens
contentType:
  - reference
useCase: error-management
---

# Invalid Token Errors

## Parsing an HS256-Signed ID Token Without an Access Token

**Error Message**: The ID Token cannot be validated because it was signed using the HS256 algorithm and public applications (such as a browser) can’t store secrets. Please read the associated doc for ways to fix this.

### Why this error occurred

Beginning with **auth0.js version 9** and **Lock version 11**, when ID Tokens are signed with HS256, they are discarded and a call to **/userinfo** is made to retrieve user information. 

Calling **/userinfo** requires an Access Token. If you don't ask for an Access Token when authenticating, you will receive the following error:

```
The id_token cannot be validated because it was signed with the HS256 algorithm
and public applications (like a browser) can’t store secrets.
Please read the associated doc for possible ways to fix this.
```

### Ways to fix this error

There are two ways to fix the error:

1. **(RECOMMENDED)** Change the application signature algorithm to RS256 instead of HS256.
2. Change the value of your **responseType** parameter to **token id_token** (instead of the default), so that you receive an Access Token in the response.

To change the application signature algorithm to RS256 instead of HS256:

    1. Go to [Dashboard > Applications]({$manage_url}/#/applications).
    1. Select your application.
    1. Scroll to the bottom of the **Settings** tab, and click **Show Advanced Settings**.
    1. Open up the **OAuth** tab. Change the value of **JsonWebToken Signature Algorithm** to **RS256**.
    1. Scroll to the bottom of the page and click **Save Changes**.

    If you proceed with this option and you are using the ID Token to call your APIs, be sure to change your server code so that it validates tokens using the RS256 algorithm instead of HS256. Note that using ID Tokens to call APIs [is not recommended](/tokens).

