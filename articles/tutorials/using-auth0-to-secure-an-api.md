---
description: How to use Auth0 to secure a CLI
---

# Use Auth0 to Secure a CLI

To secure CLI programs, Auth0 requires [Proof Key for Code Exchange (PKCE) by OAuth Public Clients](https://tools.ietf.org/html/rfc7636).

## Implicit Flow vs. PKCE by OAuth Public Clients

Traditionally, public clients, such as mobile and single page apps and CLIs, used the [implicit flow](/api-auth/grant/implicit) to obtain a token. The implicit flow doesn't require __client authentication__, which is fitting for public clients (represented in Auth0 as a [native client](/clients) because there's no easy way to store a `client_secret`.

Requiring [PKCE](/protocols) increases security by adding a cryptographic challenge in the token exchange. This prevents unauthorized apps from intercepting the response from the authorization server and getting the token.

## Configuration

To secure a CLI program by requiring PKCE, the CLI program needs to:

1. Initiate the authorization request;
2. Obtain an authorization code;
3. Exchange the authorization code for a token.

### Step 1: Initiate the Authorization Request

Begin by making an OAuth 2.0 authorization request. Include the [`code_challenge` you created](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier), along with the `code_challenge_method` in your call.

The authorization URL will look like the following:

```text
https://${account.namespace}/authorize?
  response_type=CODE&
  scope=OpenID&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  code_challenge=YOUR_CODE_CHALLENGE&
  code_challenge_method=S256
```

### Step 2: Obtain an Authorization Code

If authorization is successful, Auth0 redirects the browser to the callback URL with the authorization code appended to the end:

```${account.callback}/?code=123```

### 3. Exchange the Authorization Code for a Token

Using the authorization code, the CLI program needs to make a `POST` call to the `/token` endpoint to obtain the access token. Be sure to include the `code_verifier` that corresponds to the `code_challenge` you used in step 1. Auth0 uses these values to verify that the requests originated from the same source.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"com.myclientapp://myclientapp.com/callback\", }"
  }
}
```

If successful, the CLI program receives a JSON response containing the access, refresh, and ID tokens, as well as the token type:

```json
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

At this point, the CLI program has the necessary access token and can proceed to calling APIs.
