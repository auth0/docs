---
  description: A description of the /login/callback Authentication API v2 endpoint listing its parameters.
---

# POST /login/callback

This endpoint accepts an IDP Initiated SignOn SAMLResponse from a SAML Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IDP Initiated Sign On section.

```JSON
POST https://${account.namespace}/login/callback?connection=
Content-Type: 'application/x-www-form-urlencoded'

SAMLResponse=
```

## Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `connection `    | string     | the name of the identity provider |
| `SAMLResponse `  | string     | an IDP Initiated SignOn SAMLResponse |
