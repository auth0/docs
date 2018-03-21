```php
use Auth0\SDK\Auth0;

$auth0 = new Auth0(array(
    'domain'        => '${account.namespace}',
    'client_id'     => '${account.clientId}',
    'client_secret' => 'YOUR_CLIENT_SECRET',
    'redirect_uri'  => '${account.callback}'
));
```
