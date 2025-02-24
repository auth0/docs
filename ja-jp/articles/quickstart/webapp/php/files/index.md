---
name: index.php
language: php
---

```php
<?php

  declare(strict_types=1);

  require('vendor/autoload.php');

  use Auth0\SDK\Auth0;
  use Auth0\SDK\Configuration\SdkConfiguration;

  $configuration = new SdkConfiguration(
    domain: '${account.namespace}',
    clientId: '${account.clientId}',
    clientSecret: '${account.clientSecret}',
    redirectUri: 'http://' . $_SERVER['HTTP_HOST'] . '/callback',
    cookieSecret: '4f60eb5de6b5904ad4b8e31d9193e7ea4a3013b476ddb5c259ee9077c05e1457'
  );

  $sdk = new Auth0($configuration);

  require('router.php');
```
