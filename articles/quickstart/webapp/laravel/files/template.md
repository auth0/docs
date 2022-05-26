---
name: resources/views/auth0/user.blade.php
language: php
---

```php
<!DOCTYPE html>
<html>
    <body>
        @auth
            <p>Welcome! You are authenticated. <a href="{{ route('logout') }}">Log out</a></p>

            <div>
                <pre><?php print_r(Auth::user()) ?></pre>
            </div>
        @endauth

        @guest
            <p>Welcome, guest! <a href="{{ route('login') }}">Log in</a></p>
        @endguest
    </body>
</html>
```
