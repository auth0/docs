---
name: routes/web.php
language: php
---

```php
<?php

use Illuminate\Support\Facades\{Auth, Route};
use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};

Auth::shouldUse('my-example-guard');

Route::get('/login', Login::class)->name('login');
Route::get('/logout', Logout::class)->name('logout');
Route::get('/callback', Callback::class)->name('callback');

Route::get('/', function () {
    if (auth()?->check()) {
        $user = json_encode(auth()?->user()?->getAttributes(), JSON_PRETTY_PRINT);

        return response(<<<"HTML"
            <h1>Welcome! You are logged in.</h1>
            <div><pre>{$user}</pre></div>
            <p>Would you like to <a href="/logout">logout</a>?</p>
        HTML);
    }

    return response(<<<'HTML'
        <h1>Hello, Guest!</h1>
        <p>Would you like to <a href="/login">login</a>?</p>
    HTML);
})->middleware('auth0.authenticate.optional');

Route::get('/protected', function () {
    return response(<<<'HTML'
        <h1>Hello! This is a protected route.</h1>
        <p>Any logged in users can see this.</p>

        <p>Would you like to <a href="/">go home</a>?</p>
    HTML);
})->middleware('auth0.authenticate');

Route::get('/scoped', function () {
    return response(<<<'HTML'
        <h1>This is a protected route with a scope requirement.</h1>
        <p>Only logged in users granted with the `read:messages` scope can see this.</p>

        <p>Would you like to <a href="/">go home</a>?</p>
    HTML);
})->middleware('auth0.authenticate:read:messages');

Route::get('/update', function () {
    $colors = ['black', 'white', 'red', 'blue', 'yellow', 'green'];

    app('auth0')
    ->management()
    ->users()
    ->update(
        id: auth()->id(),
        body: [
            'user_metadata' => [
                'favorite_color' => $colors[rand(0, count($colors))],
            ],
        ]
    );

    auth()->refreshUser();

    $user = json_encode(auth()?->user()?->getAttributes(), JSON_PRETTY_PRINT);

    return response(<<<"HTML"
        <h1>Welcome! Your favorite color has been updated.</h1>
        <div><pre>{$user}</pre></div>
        <p>Would you like to <a href="/logout">logout</a>?</p>
    HTML);
})->middleware('auth0.authenticate');
