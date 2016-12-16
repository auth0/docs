# SAML Single Sign-On

The SAML protocol is used for 3rd party SaaS applications mostly, like Salesforce and Box. Auth0 supports SP and IDP Initiated Sign On. For more information refer to: [SAML](/protocols/saml).

## Accept Request

<h5 class="code-snippet-title">Examples</h5>

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

<% var acceptReqPath = '/samlp/{client_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": acceptReqPath,
  "link": "#accept-request"
}) %>

Use this endpoint to accept a SAML request to initiate a login.

Optionally, it accepts a connection parameter to login with a specific provider. If no connection is specified, the [Auth0 Login Page](/login_page) will be shown.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your client |
| `connection`     | The connection to use (optional) |


### Remarks

- All the parameters of the SAML response can be modified with [Rules](/rules).
- The SAML request `AssertionConsumerServiceURL` will be used to `POST` back the assertion. It must match the application's `callback_URL`.

### More Information
- [SAML](/protocols/saml)

## Get Metadata

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/samlp/metadata/${account.clientId}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/samlp/metadata/${account.clientId}'
```

<% var getMetadataPath = '/samlp/metadata/{client_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": getMetadataPath,
  "link": "#get-metadata"
}) %>

This endpoint returns the SAML 2.0 metadata.

### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your app |

### More Information
- [SAML](/protocols/saml)


## IdP-Initiated SSO Flow

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/login/callback?
  connection=CONNECTION&
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
  "http_method": "POST",
  "path": idpInitPath,
  "link": "#idp-initiated-sso-flow"
}) %>

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a SAML Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `connection`     | The name of an identity provider configured to your client |
| `SAMLResponse`   | An IdP-Initiated Sign On SAML Response |

### More Information
- [SAML](/protocols/saml)
