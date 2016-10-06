---
description: How to use Auth0 to secure a CLI.
---

# Using Auth0 to secure a CLI

Authentication in CLI programs is straightforward if the identity provider supports sending credentials, like database connections, SMS passwordless and AD. If the identity provider requires a browser redirect, then the process is slightly more complicated.

Auth0 implements the [Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636). This flow makes it easy to add authentication to a CLI while keeping higher standards of security.

## How it works

Traditionally, public clients (e.g. mobile apps, SPAs and CLIs) have used the [implicit flow](/protocols#oauth-for-native-clients-and-javascript-in-the-browser) to obtain a token. In this flow, there's no __client authentication__ because there's no easy way of storing a `client_secret`.

The [PKCE flow](/protocols) ('pixy' for friends), increases security by adding a cryptographic challenge in the token exchange. This prevents rogue apps to intercept the response from the authorization server, and get hold of the token.

For this exchange to work without secret, you will have to set the `token_endpoint_auth_method` to `none`.

```bash
curl -H "Authorization: Bearer API2_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{"token_endpoint_auth_method":"none"}' https://yours.auth0.com/api/v2/clients/CLIENT_ID
```

A CLI program just needs to:

### 1. Initiate the authorization request:

This is the regular OAuth2 authorization request, with the caveat that now it includes two parameters:

* A `code_challenge` consisting of a randomly generated value (called the `verifier`), hashed (SHA256), and base64Url encoded.
* A `code_challenge_method: S256`

```
https://${account.namespace}/authorize?response_type=code&scope=openid&client_id=${account.clientId}&redirect_uri=${account.callback}&code_challenge={Base64UrlEncode(SHA256(THE VERIFIER))}&code_challenge_method=S256
```

### 2. Get an __authorization code__:

If authentication is successful, then Auth0 will redirect the browser to the callback with a `code` query parameter.

  ${account.callback}/?code=123

### 3. Exchange __code__ for __token__:

With the `code`, the program then uses the `/token` endpoint to obtain a `token`. In this second step, the CLI program adds a `verifier` parameter with the exact same random secret generated in step 1. Auth0 uses this to correlate and verify that the request originates from the same client.

```
POST /token HTTP/1.1
Host: ${account.namespace}
Content-type: application/json
{
  "code": {THE CODE},
  "code_verifier": {THE VERIFIER},
  "client_id": "${account.clientId}",
  "grant_type": "authorization_code",
  "redirect_uri": "${account.callback}"
}
``` 

If successful the response is another JSON object, with an `id_token`, and `access_token`. 

> Note that if the `verifier` doesn't match with what was sent in the `/authorize` endpoint, the request will fail.

## Simple CLI example

This simple project shows how the above would work in a nodejs CLI app. It uses the `opn` module to open a browser to perform the authentication. It expects a simple web app running on the ${account.callback} address that can display the `code` so the user can copy, and enter it in the CLI:

```js
var opn = require('opn');
var request = require('request');
var crypto = require('crypto');
var readline = require('readline');
var dotenv = require('dotenv');

dotenv.load();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_URL: process.env.AUTH0_URL,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000',
  AUTH0_CONNECTION: process.env.AUTH0_CONNECTION || 'Username-Password-Authentication'
};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Generate the verifier, and the corresponding challenge
var verifier = base64url(crypto.randomBytes(32));
var verifier_challenge = base64url(crypto.createHash('sha256').update(verifier).digest());

var authorize_url = env.AUTH0_URL + '/authorize?response_type=code&scope=openid%20profile&' + 
                                    'client_id=' + env.AUTH0_CLIENT_ID + 
                                    '&redirect_uri=' + env.AUTH0_CALLBACK_URL + 
                                    '&code_challenge=' + verifier_challenge + '&code_challenge_method=S256' +
                                    '&connection=' + env.AUTH0_CONNECTION;

//Open a browser and initiate the authentication process with Auth0
//The callback URL is a simple website that simply displays the OAuth2 authz code
//User will copy the value and then paste it here for the process to complete.
opn(authorize_url);

rl.question('Please enter the authorization code: ', function(code) {
  request.post(env.AUTH0_URL + '/oauth/token',{
    json:{
      code: code,
      code_verifier: verifier,
      client_id: env.AUTH0_CLIENT_ID,
      grant_type: 'authorization_code',
      redirect_uri: env.AUTH0_CALLBACK_URL
  }},function(err,status,body){
    //TODO: do something useful with the token (in body)
    //CLI is ready to call APIs, etc.
  });

  rl.close();
});

function base64url(b) {
  return b.toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
}
```
