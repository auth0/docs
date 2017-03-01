# SAML

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

<% var acceptReqPath = '/samlp/YOUR_CLIENT_ID'; %>
<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": acceptReqPath,
  "link": "#accept-request"
}) %>

Use this endpoint to accept a SAML request to initiate a login.

Optionally, it accepts a connection parameter to login with a specific provider. If no connection is specified, the [Auth0 Login Page](/login_page) will be shown.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `connection`     | The connection to use. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


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

<% var getMetadataPath = '/samlp/metadata/YOUR_CLIENT_ID'; %>
<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": getMetadataPath,
  "link": "#get-metadata"
}) %>

This endpoint returns the SAML 2.0 metadata.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### More Information
- [SAML](/protocols/saml)


## IdP-Initiated SSO Flow

<h5 class="code-snippet-title">Examples</h5>

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
  "http_method": "POST",
  "path": idpInitPath,
  "link": "#idp-initiated-sso-flow"
}) %>

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a SAML Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `connection` <br/><span class="label label-danger">Required</span> | The name of an identity provider configured to your client. |
| `SAMLResponse` <br/><span class="label label-danger">Required</span> | An IdP-Initiated Sign On SAML Response. |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the field **Client** (select the client you want to use for the test) and **Connection** (the name of the configured identity provider).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *Other Flows* tab, click **SAML**.


### More Information
- [SAML](/protocols/saml)
