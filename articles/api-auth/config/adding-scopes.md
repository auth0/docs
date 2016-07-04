# API Authorization: Adding Scopes
<%=include('./_preview-warning') %>

Sometimes you want to handle more granular scopes on your API. For this scenario you will require you to work with the Auth0 Management API.

For this you will need the following items,
- The API Id (which you can get from the Settings tab of your API [in the API section](/api-auth/using-the-auth0-dashboard))
- A valid APIv2 token (which you can get from the API Explorer) with the following scopes
  - `update:resource_server`
  - `update:client_grants`
  - `read:client_grants`

## Updating the API scopes
`PATCH` `{your-tenant-name}.auth0.com/api/v2/resource-servers/YOUR_API_ID` with payload

```
{
  "scopes": [{ "value": "sample-scope"}, ... , {"value": "another-scope"}]
}
```

You can define any number of scopes here.

## Updating the Client Grants

Now that we defined the universe of possible scopes for your API, we are going to need to update the `client_grant` to actually contain a subset of these scopes. For this, we are first going to get the `client_grant` for the API, extract its ID and then submit a `PATCH` operation.

`GET` `{your-tenant-name}.auth0.com/api/v2/client-grants`

Sample Response:

```
[
  {
    "id": "cgr_JGa6ZckLjnt60rWe",
    "client_id": "YOUR_AUTHORIZED_CLIENT_ID",
    "audience": "YOUR_API_IDENTIFIER",
    "scope": ""
  }
]
```

`PATCH` `{your-tenant-name}.auth0.com/api/v2/client-grants/CLIENT_GRANT_ID` with payload

```
{
  "scope": ["sample-scope", ..., "another-scope"]
}
```

Again, here you can add any number of scopes.

## Further Reading

[Scopes](/scopes)
