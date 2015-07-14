```php
// Controllers API

$router->get('/ping', function() {
  echo "All good. You don't need to be authenticated to call this";
});

$router->get('/secured/ping', function() {
  echo "All good. You only get this message if you're authenticated";
});

// Run the Router
$router->run();
```
