---
title: PHP
---

```php
use Auth0\SDK\Auth0JWT;

$decodedToken = Auth0JWT::decode( $token, ['<%= api.identifier %>'], '<%= api.signing_secret %>');
```
