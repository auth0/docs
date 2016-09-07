```php
  // Require composer autoloader
  require __DIR__ . '/vendor/autoload.php';

  // Create Router instance
  $router = new \Bramus\Router\Router();

  // Check JWT on /secured routes. This can be any route you like
  $router->before('GET', '/secured/.*', function() {

    // This method will exist if you're using apache
    // If you're not, please go to the extras for a defintion of it.
    $requestHeaders = apache_request_headers();
    $authorizationHeader = $requestHeaders['Authorization'];

    if ($authorizationHeader == null) {
      header('HTTP/1.0 401 Unauthorized');
      echo "No authorization header sent";
      exit();
    }

    // validate the token
    $token = str_replace('Bearer ', '', $authorizationHeader);
    $secret = '${account.clientSecret}';
    $client_id = '${account.clientId}';
    $decoded_token = null;
    try {
      $decoded_token = \Auth0\SDK\Auth0JWT::decode($token,$client_id,$secret );
    } catch(\Auth0\SDK\Exception\CoreException $e) {
      header('HTTP/1.0 401 Unauthorized');
      echo "Invalid token";
      exit();
    }

  });
```
