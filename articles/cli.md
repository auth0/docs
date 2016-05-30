# Using Auth0 to secure a CLI

Authentication in CLI programs is straightforward if the identity provider supports sending credentials, like database connections, SMS passwordless and AD. 

But it is a little bit more complex, if the identity provider requires a browser redirect.

Auth0 implements the [Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636). This flow makes it easy to add authentication to a CLI while keeping higher standards of security.

## How it works
Traditionally, public clients (e.g. mobile apps, SPAs and CLIs) have used the [implicit flow](/protocols#oauth-for-native-clients-and-javascript-in-the-browser) to obtain a token. In this flow, there's no __client authentication__ because there's no easy way of storing a `client_secret`.

The PKCE flow ('pixy' for friends), increases security by adding a cryptographic challenge in the token exchange. This prevents rogue apps to intercept the response from the authorization server, and get hold of the token.

A CLI program just needs to:

* Initiate the authorization request, including the parameters for PKCE: the `code_challenge` and the `code_challenge_method`. Usually using a browser.
* When the `authorization code` is received, use the `/token` endpoint to exchange the `code` for a `token`. In this second step, the CLI program adds a `verifier` parameter that the server uses to correlate the first call.

In summary:

First, the program starts the transaction with:

```
https://${account.namespace}/authorize?response_type=code&scope=openid&client_id=${account.clientId}&redirect_uri=${account.callback}&code_challenge={Base64UrlEncode(SHA256(THE VERIFIER))}&code_challenge_method=S256
```

The `code_challenge` is a random secret, hashed (using SHA256), finally base64Url-encoded. The random secret is called the `verifier`.

The above request starts the authentication process in Auth0. After user authenticates (with any supported Auth0 [connection](/identityproviders)), Auth0 will issue a response with a code:

```
${account.callback}?code={THE CODE}
```

Then the program calls the token endpoint, passing the `verifier` from first step and the `code` returned by Auth0:

```
POST /token HTTP/1.1
Host: ${account.namespace}
Content-type: application-json
{
  "code": {THE CODE},
  "code_verifier": {THE VERIFIER},
  "client_id": "${account.clientId}",
  "grant_type": "authorization_code",
  "redirect_uri": "${account.callback}"
}
``` 

If successful the response is another JSON object, with an `id_token`, and `access_token`. 

> Note that if the `verifier` doesn't match what is sent in the `/authorize` endpoint, the request will fail.

## Simple example

This simple project shows how the above would work in a nodejs app. It uses the `opn` module to open a browser to perform the authentication. It expects a simple web app running on the ${account.callback} address that can display the `code`:

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

//Generate the secret and the corresponding challenge
var verifier = randomValueHex(16);
var verifier_challenge = base64url(crypto.createHash('sha256').update(verifier).digest());


var authorize_url = env.AUTH0_URL + '/authorize?response_type=code&scope=openid%20profile&' + 
                                    'client_id=' + env.AUTH0_CLIENT_ID + 
                                    '&redirect_uri=' + env.AUTH0_CALLBACK_URL + 
                                    '&code_challenge=' + verifier_challenge + '&code_challenge_method=S256' +
                                    '&connection=' + env.AUTH0_CONNECTION;

//Open a browser and initiate the authentication process with Auth0
//The callback URL is a website that simply displays the OAuth2 authz code
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
  });

  rl.close();
});

//Some helper functions to generate the verifier challenge
function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0,len);
}

function base64url(b) {
  return b.toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
}

```