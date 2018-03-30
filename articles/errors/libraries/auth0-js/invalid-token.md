---
public: false
---
# HS256-Signed Tokens

Error: calls made to the **/userInfo** return the following:

```
accessToken parameter is not valid
```

## Cause

Calls made to the **/userInfo** endpoint using Access Tokens validated using the HS256 algorithm cannot be validated.

## Affected Versions

* auth0.js version 9
* Lock version 11

## Troubleshooting

Change the value of your **responseType** parameter to **token id_token**. This will allow you to use an Access Token with the **/userInfo** endpoint.