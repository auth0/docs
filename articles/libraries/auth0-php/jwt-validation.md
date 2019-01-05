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

This SDK also includes an interface to the [Firebase PHP JWT library](https://github.com/firebase/php-jwt), used to decode and verify JSON web tokens (JWT). The `JWTVerifier` class has a single method, `verifyAndDecode()`, which accepts a JWT and either returns a decoded token or throws an error. More information on JWTs and how to build and decode them can be found [here on jwt.io](https://jwt.io/).

The decoder can work with both HS256 and RS256 tokens. Both types require the algorithm and valid audiences to be indicated before processing. Additionally, HS256 tokens require the client secret while RS256 tokens require an authorized issuer. The issuer is used to fetch a JWKs file during the decoding process as well. ([More about signing algorithms here](https://auth0.com/blog/navigating-rs256-and-jwks/).)

Here is an example of a small, URL-based JWT decoder:


```php
// Example #4
// decode-jwt.php
use Auth0\SDK\JWTVerifier;
use Auth0\SDK\Exception\InvalidTokenException;
use Auth0\SDK\Exception\CoreException;

// Do we have an ID token?
if (empty($_GET[ 'id_token' ])) {
    echo '<code>No "id_token" URL parameter!</code> ';
    exit;
}

// Do we have a valid algorithm?
if (empty($_GET[ 'token_alg' ]) || ! in_array($_GET[ 'token_alg' ], [ 'HS256', 'RS256' ])) {
    echo '<code>Missing or invalid "token_alg" URL parameter!</code> ';
    exit;
}

$config = [
    'supported_algs' => [ $_GET[ 'token_alg' ] ],
    'client_secret' => getenv('AUTH0_CLIENT_SECRET'),
];

if ('HS256' === $_GET[ 'token_alg' ]) {
    $config['client_secret'] = getenv('AUTH0_CLIENT_SECRET');
} else {
    $config['authorized_iss'] = [ 'https://' . getenv('AUTH0_DOMAIN') . '/' ];
}

try {
    $verifier = new JWTVerifier($config);
    $decoded_token = $verifier->verifyAndDecode($_GET[ 'id_token' ]);
    echo '<pre>' . print_r($decoded_token, true) . '</pre>';
} catch (InvalidTokenException $e) {
    echo 'Caught: InvalidTokenException - ' . $e->getMessage();
} catch (CoreException $e) {
    echo 'Caught: CoreException - ' . $e->getMessage();
} catch (\Exception $e) {
    echo 'Caught: Exception - ' . $e->getMessage();
}
```

Additional parameters for the `JWTVerifier` configuration array are:

- **cache**: Receives an instance of `Auth0\SDK\Helpers\Cache\CacheHandler` (Supported `FileSystemCacheHandler` and `NoCacheHandler`). Defaults to `NoCacheHandler` (RS256 only).
- **guzzle_options**: Configuration propagated to Guzzle when fetching the JWKs (RS256 only). These options are [documented here](http://docs.guzzlephp.org/en/stable/request-options.html).
- **secret\_base64\_encoded**: When `true`, it will decode the secret used to verify the token signature. This is only used for HS256 tokens and defaults to `true`. Your Application settings will say whether the Client Secret provided is encoded or not.

**Read More**

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
