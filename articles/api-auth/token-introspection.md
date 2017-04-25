---
description: How to use token introspection to get information about a token's authorization context
toc: true
---

# Token Introspection

Auth0 supports [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662), which allows you to ask Auth0 for details about any access tokens presented to your API. In addition to asking Auth0 about the *state* of the access token (whether it is active/expired/revoked), you can request information about the token's scopes and the context in which it was issued (such as who issued the token and to whom the token was issued).

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
