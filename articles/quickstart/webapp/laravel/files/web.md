---
name: routes/web.php
language: php
---

```php
<?php

use Illuminate\Support\Facades\{Auth, Route};
use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};

Auth::shouldUse('myAuth0Guard');

Route::get('/login', Login::class)->name('login');
Route::get('/logout', Logout::class)->name('logout');
Route::get('/callback', Callback::class)->name('callback');

Route::get('/', function () {
    return view('auth0.user');
})->middleware(['auth0.authenticate.optional']);

// Require an authenticated session to access this route.
Route::get('/required', function () {
    return view('auth0.user');
})->middleware(['auth0.authenticate']);
```
