# WS-Federation

## Accept Request

```http
GET https://${account.namespace}/wsfed/${account.clientId}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/wsfed/${account.clientId}'
```

<% var acceptWSReqPath = '/wsfed/YOUR_CLIENT_ID'; %>
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": acceptWSReqPath,
  "link": "#accept-request20"
}) %>

This endpoint accepts a WS-Federation request to initiate a login.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client-id`      | The `client-id` of your application. |
| `wtrealm`        | Can be used in place of `client-id`. |
| `whr`            | The name of the connection (used to skip the login page). |
| `wctx`           | Your application's state. |
| `wreply`         | The <dfn data-key="callback">callback URL</dfn>. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the field **Application** (select the application you want to use for the test) and **Connection** (the name of the configured identity provider).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *Other Flows* tab, click **WS-Federation**.


### Remarks

- The `wtrealm` parameter must be in one of these formats:
  - `urn:clientID` (for example, urn:${account.clientId})
  - If this parameter does not begin with a urn, the `client.clientAliases` array is used for look-up. This can only be set with the [/api/v2/clients](/api/management/v2#!/Clients/get_clients) Management API.
- The `whr` parameter is mapped to the connection like this: `urn:CONNECTION_NAME`. For example, `urn:google-oauth2` indicates login with Google. If there is no `whr` parameter included, the user will be directed to the [Auth0 Login Page](/login_page).


### More Information
- [WS-Federation](/protocols/ws-fed)


## Get Metadata

```http
GET https://${account.namespace}/wsfed/FederationMetadata/2007-06/FederationMetadata.xml
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/wsfed/FederationMetadata/2007-06/FederationMetadata.xml'
```

<% var getMetadataPath = '/wsfed/FederationMetadata/2007-06/FederationMetadata.xml'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": getMetadataPath,
  "link": "#get-metadata21"
}) %>

This endpoint returns the WS-Federation metadata.


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### More Information

- [WS-Federation](/protocols/ws-fed)
