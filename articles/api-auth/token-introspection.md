---
description: How to use token introspection to get information about a token's authorization context
toc: true
---

# Token Introspection

Auth0 supports [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662), which allows you to ask Auth0 for details about any access tokens presented to your API. In addition to asking Auth0 about the *state* of the access token (whether it is active/expired/revoked), you can request information about the token's scopes and the context in which it was issued (such as who issued the token and to whom the token was issued).


### Provide the Public Key to Auth0

Because token introspection requires Auth0 to validate the signature of your access token, you'll need to create a key pair for your API and update your API's Auth0 record with the public key.

There are three ways by which Auth0 can obtain the public key:

1. You can define the `verificationKey` on the API's Auth0 record. This is a JSON Web Key (JWK) or PEM-encoded certificate.
2. You can define the `verificationLocation` on the API's Auth0 record. This is a URI from which Auth0 fetches JSON Web Keys (JWK) .
3. You can provide an URI-formatted identifier (such as `https://foo.com`) that Auth0 attempts to load (`http://foo.com/.well-known/jwks.json`).

Regardless of which method you choose, you can provide update your API's Auth0 record by making the appropriate `POST` call to the [Management API](/api/management/v2#!/Resource_Servers/patch_resource_servers_by_id).

The following is a sample call where we set the API's `verificationKey` property on the API defined in Auth0.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/resource-servers/RESOURCE_SERVER_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
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

## Calling the Authorization API

To use token introspection, make a `POST` call to the [Authorization API](/api/authentication) where the content type is `application/x-www-form-urlencoded` and you've included the following parameter value pairs as part of the payload:

* **Client Assertion Type**: Set this to `client_assertion_type: urn:ietf:params:oauth:client-assertion-type:jwt-bearer`;
* **Client Assertion**: a JWT signed with your API's private key so that Auth0 can validate its signature using the associated public key.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}.auth0.com/oauth/introspect",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/x-www-form-urlencoded",
		"text": "{ \"token\": \"FOOBAR\", \"client_assertion_type\": \"urn:ietf:params:oauth:client-assertion-type:jwt-bearer\", \"client_assertion\": \"ey....\" }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
