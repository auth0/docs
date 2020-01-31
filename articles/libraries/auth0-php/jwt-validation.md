---
section: libraries
toc: true
description: Validating JWTs with Auth0-PHP
topics:
  - libraries
  - php
contentType: how-to
---

# Validating JWTs with Auth0-PHP

Auth0-PHP includes an interface to the [lcobucci/jwt library](https://github.com/lcobucci/jwt), used to validate and decode <dfn data-key="json-web-token">JSON Web Tokens (JWT)</dfn>. More information on JWTs and how to build and decode them can be found [jwt.io](https://jwt.io/).

The decoder can work with both HS256 and RS256 tokens. Both types require the algorithm and valid <dfn data-key="audience">audiences</dfn> to be indicated before processing. Additionally, HS256 tokens require the client secret while RS256 tokens require an authorized issuer. The issuer is used to fetch a JWKs file during the decoding process as well. ([More about signing algorithms here](https://auth0.com/blog/navigating-rs256-and-jwks/).)

Here is an example of a small, URL-based JWT decoder:

```php
// decode-jwt.php
use Auth0\SDK\Helpers\JWKFetcher;
use Auth0\SDK\Helpers\Tokens\AsymmetricVerifier;
use Auth0\SDK\Helpers\Tokens\SymmetricVerifier;
use Auth0\SDK\Helpers\Tokens\IdTokenVerifier;

if (empty($_GET['id_token'])) {
    die( 'No `id_token` URL parameter' );
}

if (empty($_GET['token_alg']) || ! in_array($_GET['token_alg'], [ 'HS256', 'RS256' ])) {
    die( 'Missing or invalid `token_alg` URL parameter' );
}

$id_token  = rawurldecode($_GET['id_token']);

$token_issuer  = 'https://'.getenv('AUTH0_DOMAIN').'/';
$signature_verifier = null;

if ('RS256' === $_GET['token_alg']) {
    $jwks_fetcher = new JWKFetcher();
    $jwks        = $jwks_fetcher->getKeys($token_issuer.'.well-known/jwks.json');
    $signature_verifier = new AsymmetricVerifier($jwks);
} else if ('HS256' === $_GET['token_alg']) {
    $signature_verifier = new SymmetricVerifier(getenv('AUTH0_CLIENT_SECRET'));
}

$token_verifier = new IdTokenVerifier(
    $token_issuer,
    getenv('AUTH0_CLIENT_ID'),
    $signature_verifier
);

try {
    $decoded_token = $token_verifier->verify($id_token);
    echo '<pre>'.print_r($decoded_token, true).'</pre>';
} catch (\Exception $e) {
    echo 'Caught: Exception - '.$e->getMessage();
}
```

The second parameter of `IdTokenVerifier->verify()` is an optional array of options:

* `nonce` to check the nonce contained in the token (recommended for OIDC-compliant tokens).
* `max_age` to check the auth_time of the token.
* `leeway` clock tolerance in seconds for the current check only (60 seconds default).

## Read More

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
