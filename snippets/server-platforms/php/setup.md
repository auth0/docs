```php
use Auth0SDK\Auth0;

$auth0 = new Auth0(array(
    'domain'        => '@@account.namespace@@',
    'client_id'     => '@@account.clientId@@',
    'client_secret' => '@@account.clientSecret@@',
    'redirect_uri'  => '@@account.callback@@'
));
```
