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
    strategy: SdkConfiguration::STRATEGY_API,
    domain: '${account.namespace}',
    clientId: '${account.clientId}',
    clientSecret: '${account.clientSecret}',
    audience: ['YOUR_API_IDENTIFIER']
  );

  $sdk = new Auth0($configuration);

  $token = $sdk->getBearerToken(
    get: ['token'],
    server: ['Authorization']
  );

  require('router.php');
```
