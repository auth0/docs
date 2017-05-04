---
description: How to use token introspection to get information about a token's authorization context
toc: true
---

# Token Introspection

In OAuth 2.0, the clients don't need to know anything about the content or structure of the token. However, there may be metadata attached to the token the client would find useful, such as the token's validity, the approved scopes, and the context in which the token was issued.

Protected resources, such as an API, can use token metadata to make authorization decisions. One protocol that allows protected resources to query an authorization server to determine the set of metadata for a given token is *token introspection*.

Auth0 supports [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662), which allows a protected resource to query an Authorization Server (Auth0) to request the status of an OAuth 2.0 token (whether it is active or not).

Additionally, the protected resource can also obtain information such as the token's scopes and the context in which it was issued (such as who issued the token and to whom the token was issued). This is especially useful for Application Specific Passwords (ASPs), which utilizes non-JWT tokens.

Because token instrospection is a means by which an API can verify a token, you do not need to configure any addition verification flows performed by the API. Additionally, for any existing authorization flows involving JWT access tokens, you do not need to update your processes to use token introspection.

## Create an API Record with Auth0

To use token introspection, you must set up an [API](/apis) that represents your protected resource(s).

For assistance, please see [How to Configure an API in Auth0](/apis#how-to-configure-an-api-in-auth0). Alternatively, you can do this by making the appropriate `POST` call to the Management API's [Create a Resource Server endpoint](/api/management/v2#!/Resource_Servers/post_resource_servers).

### Provide the Public Key to Auth0

Because token introspection requires Auth0 to validate the signature of your access token, you'll need to create a key pair for your API and update your API's Auth0 record with the public key.

There are three ways by which Auth0 can obtain the public key:

1. You can define the `verificationKey` on the API's Auth0 record. This is a JSON Web Key (JWK) or PEM-encoded certificate.
2. You can define the `verificationLocation` on the API's Auth0 record. This is a URI from which Auth0 fetches JSON Web Keys (JWK).
3. If the API's `identifier` is `http:`- or `https:`-based (such as `https://example.com/foo`), then Auth0 attempts to fetch the key from the well-known JWK registry of the host (for the provided URI example, Auth0 attempts to fetch from `https://example.com/.well-known/jwks.json`).

If you choose to provide `verificationKey` or `verificationLocation` values, you can provide update your API's Auth0 record by making the appropriate `POST` call to the [Management API](/api/management/v2#!/Resource_Servers/patch_resource_servers_by_id).

#### Example: Set the Auth0 API's `verificationKey` Property

The following is a sample call where we set the API's `verificationKey` property on the API defined in Auth0.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/resource-servers/RESOURCE_SERVER_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"verificationKey\": \"YOUR_PUBLIC_KEY\" }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

Please see [this doc on getting an access token](/api/management/v2/tokens) for the Management API.

## Calling the Authentication API's Token Introspection Endpoint

To use token introspection, make a `POST` call to the [Authorization API](/api/authentication) where the content type is `application/x-www-form-urlencoded` and you've included the following parameter value pairs as part of the payload:

* **Token**: The literal value of the token;
* **Client Assertion**: A JWT signed with your API's private key so that Auth0 can validate its signature using the associated public key;
* **Client Assertion Type**: The specific type of client assertion used (in this case, it's a JWT). Set this to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

Note that we're using assertions (instead of secrets) for client authentication.

<div class="alert alert-info">
  <strong>Client Authentication</strong> </br>Note that we're using assertions (instead of secrets) for client authentication.
</div>

```curl
curl --request POST \
	--url 'https://${account.namespace}/oauth/introspect' \
	--header 'authorization: Bearer MGMT_API_ACCESS_TOKEN' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'token=TOKEN_VALUE&client_assertion_type=ASSERTION_TYPE&client_assertion=ASSERTION'
```

Please see [this doc on getting an access token](/api/management/v2/tokens) for the Management API.

You can use token introspection to request information for [**JWT access** tokens](/tokens/access-token), non-JWT access tokens, and [**refresh** tokens](/tokens/preview/refresh-token).
