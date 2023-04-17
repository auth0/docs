---
name: config/auth.php
language: php
---

```php
<?php

return [
  /**
   * Update the default guard to use the Auth0 guard.
   * Don't change any other values in this array.
   */
  'defaults' => [
    'guard' => 'myAuth0Guard',
  ],

  /**
   * Add a new Auth0 guard to your application.
   * Do not remove any other guards from this array.
   */
  'guards' => [
    'myAuth0Guard' => [
      'driver' => 'auth0.driver',
      'provider' => 'myAuth0Provider',
    ],
  ],

  /**
   * Add a new Auth0 provider to your application.
   * Do not remove any other providers from this array.
   */
  'myAuth0Provider' => [
    'myAuth0Provider' => [
      'driver' => 'auth0.provider',
      'repository' => \Auth0\Laravel\Auth\User\Repository::class
    ],
  ],
];
```
