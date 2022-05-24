---
name: config/auth.php
language: php
---

```php
'defaults' => [
    'guard' => 'auth0',
    // 📝 Leave any other settings in this section alone.
],

'guards' => [
    // 📝 Any additional guards you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'provider' => 'auth0',
    ],
],

'providers' => [
    // 📝 Any additional providers you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'repository' => \Auth0\Laravel\Auth\User\Repository::class
    ],
],
```
