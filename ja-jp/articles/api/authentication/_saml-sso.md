# SAML

The <dfn data-key="security-assertion-markup-language">SAML</dfn> protocol is used mostly for third-party SaaS applications, like Salesforce and Box. Auth0 supports Service Provider (SP) and Identity Provider (IDP) initiated Sign On. To learn more, see [SAML](/protocols/saml).

## Accept Request

```http
GET https://${account.namespace}/samlp/${account.clientId}?
  connection=CONNECTION
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/samlp/${account.clientId}' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data '"connection"="CONNECTION"'
```

<% var acceptReqPath = '/samlp/YOUR_CLIENT_ID'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": acceptReqPath,
  "link": "#accept-request"
}) %>

Use this endpoint to accept a <dfn data-key="security-assertion-markup-language">SAML</dfn> request to initiate a login.

Optionally, you can include a `connection` parameter to log in with a specific provider. If no connection is specified, the [Auth0 Login Page](/authenticate/login/auth0-universal-login) will be shown.

Optionally, SP-initiated login requests can include an `organization` parameter to authenticate users in the context of an organization. To learn more, see [Organizations](/organizations).


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Client ID of your application. |
| `connection`     | Connection to use during login. |
| `organization`   | Organization ID, if authenticating in the context of an organization. |


### Remarks

- All the parameters of the SAML response can be modified with [Rules](/rules).
- The SAML request `AssertionConsumerServiceURL` will be used to `POST` back the assertion. It must match one of the application's <dfn data-key="callback">`callback_URLs`</dfn>.

### Learn More
- [SAML](/protocols/saml)

## Get Metadata

```http
GET https://${account.namespace}/samlp/metadata/${account.clientId}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/samlp/metadata/${account.clientId}'
```

<% var getMetadataPath = '/samlp/metadata/YOUR_CLIENT_ID'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": getMetadataPath,
  "link": "#get-metadata"
}) %>

This endpoint returns the <dfn data-key="security-assertion-markup-language">SAML</dfn> 2.0 metadata.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |


### Learn More
- [SAML](/protocols/saml)


## IdP-Initiated Single Sign-On (SSO) Flow

```http
POST https://${account.namespace}/login/callback?connection=CONNECTION
Content-Type: 'application/x-www-form-urlencoded'
  SAMLResponse=SAML_RESPONSE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/login/callback' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data '"connection":"CONNECTION", "SAMLResponse":"SAML_RESPONSE"'
```

<% var idpInitPath = '/login/callback'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": idpInitPath,
  "link": "#idp-initiated-sso-flow"
}) %>

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider. The connection corresponding to the identity provider is specified in the query string. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `connection` <br/><span class="label label-danger">Required</span> | The name of an identity provider configured to your application. |
| `SAMLResponse` <br/><span class="label label-danger">Required</span> | An IdP-Initiated Sign On SAML Response. |

### Learn More
- [SAML](/protocols/saml)
