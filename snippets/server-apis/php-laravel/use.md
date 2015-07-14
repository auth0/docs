```php
Route::get('/api/protected', array('middleware' => 'auth0.jwt', function() {
    return "Hello " . Auth0::jwtuser()->name;
}));
```
