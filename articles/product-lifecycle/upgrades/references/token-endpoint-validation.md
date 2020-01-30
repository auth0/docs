---
description: Describes how when calling the TokenInfo endpoint, the URL of the API call must match the value of the iss attribute of the ID Token being validated. 
topics:
  - upgrades
  - email
contentType:
  - reference
useCase:
  - email-delivery
---
# Upgrade Notice: TokenInfo endpoint validation

| Severity | Mandatory Opt-In|
| --- | --- |
| Low | 2016-06-01 |

When calling the [TokenInfo](/api/authentication/reference#get-token-info) endpoint, the URL of the API call (for example `https://${account.namespace}/`) must match the value of the `iss` attribute of the ID Token being validated.

If these values do not match, the response will be `HTTP 400 - Bad Request`.

## Am I affected by the change?

If you are calling the [tokeninfo](/api/authentication#get-token-info) endpoint directly, make sure that the value of the `iss` attribute of the ID Token being validated matches your Auth0 tenant namespace: `https://${account.namespace}/`.

::: note
You can use [jwt.io](https://jwt.io/) to decode the token to confirm the `iss` attribute value.
:::
