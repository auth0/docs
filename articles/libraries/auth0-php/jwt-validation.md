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

Auth0-PHP includes an interface to the [Firebase PHP JWT library](https://github.com/firebase/php-jwt), used to validate and decode <dfn data-key="json-web-token">JSON Web Tokens (JWT)</dfn>. The `JWTVerifier` class has a single method, `verifyAndDecode()`, which accepts a JWT and either returns a decoded token or throws an error. More information on JWTs and how to build and decode them can be found [jwt.io](https://jwt.io/).

The decoder can work with both HS256 and RS256 tokens. Both types require the algorithm and valid <dfn data-key="audience">audiences</dfn> to be indicated before processing. Additionally, HS256 tokens require the client secret while RS256 tokens require an authorized issuer. The issuer is used to fetch a JWKs file during the decoding process as well. ([More about signing algorithms here](https://auth0.com/blog/navigating-rs256-and-jwks/).)

Here is an example of a small, URL-based JWT decoder:

```php
use Auth0\SDK\JWTVerifier;
use Auth0\SDK\Exception\InvalidTokenException;
use Auth0\SDK\Exception\CoreException;

if (empty($_GET['id_token'])) {
    die( 'No `id_token` URL parameter' );
}

if (empty($_GET['token_alg']) || ! in_array($_GET['token_alg'], [ 'HS256', 'RS256' ])) {
    die( 'Missing or invalid `token_alg` URL parameter' );
}

$idToken  = rawurldecode($_GET['id_token']);
$tokenAlg = rawurldecode($_GET['token_alg']);

$config = [
    // Array of allowed algorithms; never pass more than what is expected.
    'supported_algs' => [ $tokenAlg ],
    // Array of allowed "aud" values.
    'valid_audiences' => [ getenv('AUTH0_CLIENT_ID') ],
];

if ('HS256' === $tokenAlg) {
    // HS256 tokens require the Client Secret to decode.
    $config['client_secret']         = getenv('AUTH0_CLIENT_SECRET');
    $config['secret_base64_encoded'] = false;
} else {
    // RS256 tokens require a valid issuer.
    $config['authorized_iss'] = [ 'https://'.getenv('AUTH0_DOMAIN').'/' ];
}

try {
    $verifier      = new JWTVerifier($config);
    $decoded_token = $verifier->verifyAndDecode($idToken);
    echo '<pre>'.print_r($decoded_token, true).'</pre>';
} catch (InvalidTokenException $e) {
    echo 'Caught: InvalidTokenException - '.$e->getMessage();
} catch (CoreException $e) {
    echo 'Caught: CoreException - '.$e->getMessage();
} catch (\Exception $e) {
    echo 'Caught: Exception - '.$e->getMessage();
}
```

Additional parameters for the `JWTVerifier` configuration array are:

- **cache**: Receives an instance of `Auth0\SDK\Helpers\Cache\CacheHandler` (Supported `FileSystemCacheHandler` and `NoCacheHandler`). Defaults to `NoCacheHandler` (RS256 only).
- **guzzle_options**: Configuration propagated to Guzzle when fetching the JWKs (RS256 only). These options are [documented here](http://docs.guzzlephp.org/en/stable/request-options.html).
- **secret\_base64\_encoded**: When `true`, it will decode the secret used to verify the token signature. This is only used for HS256 tokens and defaults to `true`. Your Application settings will say whether the Client Secret provided is encoded or not.

### Read more

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
