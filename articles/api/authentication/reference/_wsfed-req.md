# WS-Federation Request

## Accept Request

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/wsfed/${account.clientId}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/wsfed/${account.clientId}'
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/wsfed",
  "link": "#accept-request20"
}) %>

This endpoint accepts a WS-Federation request to initiate a login.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client-id`      | the `client-id` of your client (optional) |
| `wtrealm`        | can be used in place of `client-id` |
| `whr`            | the name of the connection (to skip the login page, optional) |
| `wctx`           | your application's state (optional) |
| `wreply`         | the callback URL (optional) |


### Remarks

- The `wtrealm` parameter must be in one of these formats:
  - `urn:clientID` (e.g. urn:${account.clientId})
  - If this parameter does not begin with a urn, the `client.clientAliases` array is used for look-up. This can only be set with the [/api/v2/clients](/api/management/v2#!/Clients/get_clients) Management API.
- The `whr` parameter is mapped to the connection like this: `urn:{connection_name}`. For example, `urn:google-oauth2` indicates login with Google. If there is no `whr` parameter included, the user will be directed to the [Auth0 Login Page](/login_page).


### More Information
- [WS-Federation](/protocols/ws-fed)

## Get Metadata

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/wsfed/${account.clientId}/FederationMetadata/2007-06/FederationMetadata.xml
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/wsfed/${account.clientId}/FederationMetadata/2007-06/FederationMetadata.xml'
```

<% var getMetadataPath = '/wsfed/{client_id}/FederationMetadata/2007-06/FederationMetadata.xml'; %>
<%=
include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": getMetadataPath,
  "link": "#get-metadata21"
}) %>

This endpoint returns the WS-Federation metadata.

### More Information
- [WS-Federation](/protocols/ws-fed)
