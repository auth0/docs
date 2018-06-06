---
title: SAML
description: SAML Identity Provider Configuration
tags:
  - saml
  - samlp
---

# SAML Identity Provider Configuration

## Common settings:

These are the parameters used to configure a SAML Identity Provider:

* The __post-back URL__ (also called __Assertion Consumer Service URL__) is: `https://${account.namespace}/login/callback?connection=YOUR_CONNECTION_NAME`
* The __Entity ID__ of the Service Provider is: `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME` (default value). Use `connection.options.entityId` if available. You can obtain this value using the [Get a connection by its id APIv2 endpoint](/api/management/v2#!/Connections/get_connections_by_id):

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/connections/CONNECTION_ID",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "name": "Authorization",
        "value": "Bearer ACCESS_TOKEN"
    }]
}
```

::: note
You need to replace the `ACCESS_TOKEN` header value, with a Management APIv2 Token. For information on how to do that refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).
:::

* The __SAML Request Binding__ (also called the __Protocol Binding__): sent to the IdP from Auth0. If possible, dynamically set the value based on `connection.options.protocolBinding`:

| `connection.options.protocolBinding` value           | SAML Request Binding value |
| ---------------------------------------------------- | -------------------------- |
| Empty value ("") or not present                      | `HTTP-Redirect`            |
| `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect` | `HTTP-Redirect`            |
| `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`     | `HTTP-POST`                |

If dynamically setting the value isn't possible, then set as either `HTTP-Redirect` (default) or `HTTP-Post` if you selected this option in **Protocol Binding**

* The __SAML Response Binding__ : how the SAML token is received by Auth0 from IdP, set as `HTTP-Post`
* The __NameID format__: `unspecified`
* The SAML assertion, and the SAML response can be individually or simultaneously signed.
* The __SingleLogout service URL__, where the SAML Identity Provider will send logout requests and responses, is: `https://${account.namespace}/logout`. SAML logout requests must be signed by the Identity Provider.

## Encrypted Assertions:

Optionally, assertions can be encrypted. Use this public key to configure the IdP: [CER](https://${account.namespace}/cer) | [PEM](https://${account.namespace}/pem) | [PKCS#7](https://${account.namespace}/pb7)

## IdP-Initiated SSO

[Click here to learn more about IdP-Initiated SSO](/protocols/saml/idp-initiated-sso)

## Metadata

Some SAML Identity Providers can accept importing metadata directly with all the required information. You can access the metadata for your connection in Auth0 here:

```text
https://${account.namespace}/samlp/metadata?connection=YOUR_CONNECTION_NAME
```
