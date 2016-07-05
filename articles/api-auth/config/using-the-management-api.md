# API Authorization: Using the Management API

<%=include('../_preview-warning') %>

In case you don't want to use the Auth0 Dashboard you can perform all the same operations using Auth0's Management API.

Keep in mind that you will need the following items:
- APIv2 token with the following scopes
  - create:resource_server
  - create:client_grant
- Client Id and Secret for the client application which has to be already created and visible in your [Auth0 dashboard](${uiURL})

## Registering your Resource Server

The Resource Server entity is going to represent the API that you want to issue `access_tokens` for. It is represented by a friendly name and by a URN identifier. Keep in mind the following restrictions that apply for the identifier:
- It must be a valid urn
- It cannot be modified after creation
- It must be unique throughout your tenant

We recommend using your public API endpoint as an identifier.

For this example, we are going to use _"My Sample API"_ for name and _"https://my-api-uri"_ as identifier.

`POST` to `{your-tenant-name}.auth0.com/api/v2/resource-servers` with payload:

  ```
{
  "name": "My Sample API",
  "identifier": "https://my-api-urn",
  "signing_alg": "HS256",
  "scopes": [{ "value": "sample-scope", "description": "Description for Sample Scope"}]
}
```

You can include multiple scopes if you desire. This array represent the universe of scopes your API will support. You can later modify this in any way by issuing a `PATCH` operation.

Response:

```
{
    "id": "56f0131ffdf1c311694f4cc7",
    "name": "My Sample API",
    "identifier": "https://my-api-urn",
    "scopes": [
        {
            "value": "sample-scope",
            "description": "Description for Sample Scope"
        }
    ],
    "signing_alg": "HS256",
    "signing_secret": "FF1prn9UxZotnFEfPVwEJhqqyRmwdSu5",
    "token_lifetime": 86400
}
```

## Authorizing the consumer Client

Now that the API and the Client are represented in Auth0, we are going to create the trust relationship between them.

`POST` to `{your-tenant-name}.auth0.com/api/v2/client-grants` with payload

```
{
  "client_id": "N99orgWBg8WDHOOfL4p6LXT7wEAliSik",
  "audience": "https://my-api-urn",
  "scope": ["sample-scope"]
}
```

The `client_id` is the id of the consumer application. `audience` will be the identifier of the API and `scope` is and array of string which should be a subset of those defined at the API.

Response:

```
{
    "id": "cgr_JGa6ZckLjnt60rWe",
    "client_id": "N99orgWBg8WDHOOfL4p6LXT7wEAliSik",
    "audience": "https://test-api",
    "scope": [
        "sample-scope"
    ]
}
```

Now that we have all the elements in place we can now start asking for authorization to the API to Auth0.

Update your API to parse this token out of the requests and validate them. For this you will need to use the **signing_secret** of the API, which is the one used for signing the `access_tokens` using the HS256 algorithm.

You are now ready to ask Auth0 for `access_tokens` for you API. Navigate [here](/api-auth/config/asking-for-access-tokens) for details on generating access tokens.
