---
description: How to enable API Authorization using the Auth0 Management API.  
---

# API Authorization: Using the Management API

If you do not want to use the Auth0 Dashboard to enable API Authorization, you can achieve the same results using the Auth0 Management API.

You will need the following:

- Management APIv2 token with the following scopes:
  - `create:resource_server`
  - `create:client_grant`
- `Client_Id` and `Client_Secret` for the client application which must already be created and visible in your [Auth0 dashboard](${uiURL}).

## Register your Resource Server

The **Resource Server** entity represents the API that you want to issue access tokens for, identified by a friendly name and a URN identifier.

The following restrictions that apply for the identifier:

- It must be a valid URN.
- It cannot be modified after creation.
- It must be unique throughout your tenant.

**NOTE:** Using your public API endpoint as an identifier is recommended.

The following example uses _"My Sample API"_ as the name and _"https://my-api-uri"_ as the identifier.

`POST` to `${account.tenant}.auth0.com/api/v2/resource-servers` with payload:

```
{
  "name": "My Sample API",
  "identifier": "https://my-api-urn",
  "signing_alg": "HS256",
  "scopes": [{ "value": "sample-scope", "description": "Description for Sample Scope"}]
}
```

**NOTE:** You can include multiple scopes. This array represents the universe of scopes your API will support. You can modify this later by issuing a `PATCH` operation.

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

## Authorize the consumer Client

Now that the API and the Client are represented in Auth0, you can create a trust relationship between them.

`POST` to `${account.tenant}.auth0.com/api/v2/client-grants` with payload:

```
{
  "client_id": "N99orgWBg8WDHOOfL4p6LXT7wEAliSik",
  "audience": "https://my-api-urn",
  "scope": ["sample-scope"]
}
```

The `client_id` is the id of the consumer application, `audience` will be the identifier of the API, and `scope` is an array of strings, which must be a subset of those defined in the API.

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

Next, update your API to parse the token from the request and validate it. You will need to use the `signing_secret` of the API, which was used for signing the access tokens with the HS256 algorithm.

## Request access tokens

Now that all the elements are in place, you can request access tokens for your API from Auth0.

For details on generating access tokens, see: [API Authorization: Asking for Access Tokens](/api-auth#using-the-auth0-dashboard-for-setting-up-an-api-authorization-scenario)
