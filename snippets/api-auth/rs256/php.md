---
title: PHP
---

```php
use Auth0\SDK\JWTVerifier;
use Auth0\SDK\Helpers\Cache\FileSystemCacheHandler;

$verifier = new JWTVerifier([
    'valid_audiences' => ['<%= api.identifier %>'],
    'authorized_iss' => ['https://<%= tenantDomain %>'],
    'cache' => new FileSystemCacheHandler() // This parameter is optional. By default no cache is used to fetch the Json Web Keys.
]);

$decoded = $verifier->verifyAndDecode($token);
```
