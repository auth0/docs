---
title: PHP
---

```php
use Auth0\SDK\JWTVerifier;

$verifier = new JWTVerifier([
    'valid_audiences' => ['<%= api.identifier %>'],
    'client_secret' => '<%= api.signing_secret %>'
]);

$decoded = $verifier->verifyAndDecode($token);
```
