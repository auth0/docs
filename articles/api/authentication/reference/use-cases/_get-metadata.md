# Get Metadata

## SAML

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/samlp/metadata/${account.client_id}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/samlp/metadata/${account.client_id}'
```

```javascript
```

This endpoint returns the SAML 2.0 metadata.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |

## Ws-Fed

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/wsfed/{client-id}/FederationMetadata/2007-06/FederationMetadata.xml
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/wsfed/{client-id}/FederationMetadata/2007-06/FederationMetadata.xml'
```

```javascript
```

This endpoint returns the WS-Federation metadata.
