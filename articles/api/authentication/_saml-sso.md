# SAML

The <dfn data-key="security-assertion-markup-language">SAML</dfn> protocol is used for 3rd party SaaS applications mostly, like Salesforce and Box. Auth0 supports SP and IDP Initiated Sign On. For more information, see [SAML](/protocols/saml).

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

Optionally, it accepts a connection parameter to login with a specific provider. If no connection is specified, the [Auth0 Login Page](/login_page) will be shown.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `connection`     | The connection to use. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Remarks

- All the parameters of the SAML response can be modified with [Rules](/rules).
- The SAML request `AssertionConsumerServiceURL` will be used to `POST` back the assertion. It must match the application's <dfn data-key="callback">`callback_URL`</dfn>.

### More Information
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


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### More Information
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

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `connection` <br/><span class="label label-danger">Required</span> | The name of an identity provider configured to your application. |
| `SAMLResponse` <br/><span class="label label-danger">Required</span> | An IdP-Initiated Sign On SAML Response. |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the field **Application** (select the application you want to use for the test) and **Connection** (the name of the configured identity provider).

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *Other Flows* tab, click **SAML**.


### More Information
- [SAML](/protocols/saml)
