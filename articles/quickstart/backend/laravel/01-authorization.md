---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Laravel API.
topics:
    - quickstart
    - backend
    - laravel
github:
   path: 01-Authorization-RS256
contentType: tutorial
useCase: quickstart
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

Protecting your Laravel API requires a middleware which will check for and verify a Bearer token in the `Authorization` header of an incoming HTTP request. We'll do that using tools provided by the [laravel-auth0](https://github.com/auth0/laravel-auth0) package.

Install `laravel-auth0` using **Composer**.

::: note
**[Composer](https://getcomposer.org/)** is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. See Composer's [getting started](https://getcomposer.org/doc/00-intro.md) doc for information on how to use it.
:::

```bash
$ composer require auth0/login
```

### Configure the plugin

The **laravel-auth0** plugin comes with a configuration file that can be generated using [Artisan](https://laravel.com/docs/5.7/artisan). First, generate the configuration file from the command line:

```bash
$ php artisan vendor:publish
```

Select the `Auth0\Login\LoginServiceProvider` option. After the file is generated, it will be located at `config/laravel-auth0.php`. Edit this file to add the configuration values needed to verify incoming tokens:

```php
// config/laravel-auth0.php
return [
	// ...
	'authorized_issuers' => [ 'https://your-tenant.auth0.com/' ],
	// ...
	'api_identifier' => 'https://quickstarts/api',
	// ...
	'supported_algs' => [ 'RS256' ],
	// ...
];
```

In more detail:

* `authorized_issuers` is an array of allowed token issuers. In this case it would simply be your tenant domain as a URL.
* `api_identifier` is the **Identifier** field of the API [created above](#configure-auth0-apis).
* `supported_algs` is the **Signing Algorithm** field of the API [created above](#configure-auth0-apis). This value should be an array but only have a single value, in this case `RS256`.

### Configure Apache

By default, Apache does not parse `Authorization` headers from incoming HTTP requests. You may need to add the following to the `.htaccess` file for your application:

```bash
RewriteEngine On
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

For the two `private` API routes, we'll need a middleware to check for a Bearer token in an Authorization header for the request and then verify that the token is valid. We'll create that middleware using the `make:middleware` Artisan command:

```bash
php artisan make:middleware CheckJWT
```

Now, let's implement the `handle()` method that Laravel will call to look for the token and verify that it came from the right place and was intended for this API:

```php
<?php
// app/Http/Middleware/CheckJWT.php
// ...
use Auth0\SDK\JWTVerifier;

class CheckJWT {

    public function handle($request, Closure $next) {
        $accessToken = $request->bearerToken();
        if ( empty( $accessToken ) ) {
            return response()->json(['message' => 'Bearer token missing'], 401);
        }

        $laravelConfig = config('laravel-auth0');
        $jwtConfig = [
            'authorized_iss' => $laravelConfig['authorized_issuers'],
            'valid_audiences' => [ $laravelConfig['api_identifier'] ],
            'supported_algs' => $laravelConfig['supported_algs'],
        ];

        try {
            $jwtVerifier = new JWTVerifier( $jwtConfig );
            $decodedToken = $jwtVerifier->verifyAndDecode( $accessToken );
        } catch ( \Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }

        return $next($request);
    }
}
```

The `handle()` method does the following:

* Checks that there is a Bearer token and stops the request if one was not found.
* Pulls in the configuration values needed to verify the token.
* Attempts to decode the token, catching any exceptions thrown if it is expired, malformed, or otherwise invalid.

Next, we register this middleware we in the HTTP Kernel with the name `jwt`:

```php
// app/Http/Kernel.php
// ...
class Kernel extends HttpKernel {
	// ...
	protected $routeMiddleware = [
	    // ...
	    'jwt' => \App\Http\Middleware\CheckJWT::class,
	    // ...
	];
	// ...
}
```

We are now able to protect individual API endpoints by applying the `jwt` middleware:

```php
// routes/api.php

// This endpoint does not need authentication.
Route::get('/public', function (Request $request) {
    return response()->json(['message' => 'Hello from a public endpoint!']);
});

// These endpoints require a valid access token.
Route::middleware(['jwt'])->group(function () {
	Route::get('/private', function (Request $request) {
		return response()->json([
			'message' => 'Hello from a private endpoint!'
		]);
	});
});

```

The `/api/private` route is now only accessible if a valid access token is included in the `Authorization` header of the incoming request. We can test this by manually generating an access token for the API and using a tool like Postman to test the routes.

In the Auth0 Dashboard:

1. Go to the **Machine to Machine Applications** tab for the API created above.
2. Authorize the **API Explorer Application** but leave all scopes unchecked.
3. Click the **Test** tab, then **COPY TOKEN**.

Now, let's turn on the Laravel test server:

```bash
$ php artisan serve --port=3000
```

Send a `GET` request to the public route  - `http://localhost:3000/api/public` - and you should receive back:

```json
{ "message": "Hello from a public endpoint!" }
```

Now send a `GET` request to the private route  - `http://localhost:3000/api/private` - and you should get a 401 status and the following message:

```json
{ "message": "Bearer token missing" }
```

Add an `Authorization` header set to `Bearer API_TOKEN_HERE` using the token generated above. Send the `GET` request to the prviate route again and you should see:

```json
{ "message": "Hello from a private endpoint!" }
```

### Configure the Scopes

The middleware we created above checks for the existence and validity of an access token but does not check the **scope** of the token. In this section, we will modify the middleware created above to check for specific scopes.

Here are the changes to make to the `CheckJWT` middleware created above:

```php
// app/Http/Middleware/CheckJWT.php
// ...
class CheckJWT {

    public function handle ($request, Closure $next, $scopeRequired = null) {
        // ...
        if ( $scopeRequired && ! $this->tokenHasScope( $decodedToken, $scopeRequired ) ) {
            return response()->json(['message' => 'Insufficient scope'], 403);
        }

        return $next($request);
    }

    protected function tokenHasScope( $token, $scopeRequired ) {
        if ( empty( $token->scope ) ) {
            return false;
        }

        $tokenScopes = explode( ' ', $token->scope );
        return in_array( $scopeRequired, $tokenScopes );
    }
}
```

In summary:

* We added a `$scopeRequired` parameter to the `handle()` method with a default value of `null`. This will allow us to still handle private routes that do not need to check scope.
* At the end of `handle()`, we check if the route requires a scope and, if so, that the token includes it.
* We added a `tokenHasScope()` method to look for a specific scope within a decoded token.

Now, we can create a new middleware group that will check for both a valid token and a specific scope:

```php
// routes/api.php
// ...

// These endpoints require a valid access token with a "read:messages" scope.
Route::middleware(['jwt:read:messages'])->group(function () {
    Route::get('/private-scoped', function (Request $request) {
        return response()->json([
            'message' => 'Hello from a private, scoped endpoint!'
        ]);
    });
});
```

This route is now only accessible if an access token used in the request has a scope of `read:messages`.

To test this route, first send a `GET` request with no token to the private, scoped route  - `http://localhost:3000/api/private-scoped` - and you should get a 401 status and the following message:

```json
{ "message": "Bearer token missing" }
```

Add an `Authorization` header set to `Bearer API_TOKEN_HERE` using the same token from the previous section. Send the `GET` request to the prviate, scoped route again and you should get a 403 status and the following message:

```json
{ "message": "Insufficient scope" }
```

Back in the Auth0 Dashboard:

1. Go to the **Machine to Machine Applications** tab for the API created above.
2. Expand the **API Explorer Application**, check the `read:messages` scope,and click **Update**
3. Click the **Test** tab, then **COPY TOKEN**.

Change the `Authorization` header to use the new token and send the `GET` request again. You should get a 200 status and the following message:

```json
{ "message": "Hello from a private, scoped endpoint!" }
```

## Generating Access Tokens

The example above uses manually-generated tokens which are not long-lived. Once your API is live on the web and ready to accept requests, the applications making the requests will need to create their own tokens using a [machine-to-machine flow](https://auth0.com/docs/flows/guides/m2m-flow/call-api-using-m2m-flow). In short, for each application or group of applications, you must:

1. Create a new Machine-to-Machine Application in Auth0
2. Authorize that Application for this API with the correct scopes
3. Securely store the required credentials (Client ID, Client Secret, and API Identifier)
4. Generate a token using the [machine-to-machine flow](https://auth0.com/docs/flows/guides/m2m-flow/call-api-using-m2m-flow)

## Configure CORS (optional)

To configure CORS, you should add the `laravel-cors` dependency. You can [check it out here](https://github.com/barryvdh/laravel-cors).

After installation, add `HandleCors` middleware in the application's global middleware stack:

```php
// app/Http/Kernel.php
protected $middleware = [
    // ...
    \Barryvdh\Cors\HandleCors::class,
];
```

Add the following to the configuration file for `CORS`:

```php
<?php
// config/cors.php
return [
    'supportsCredentials' => true,
    'allowedOrigins' => ['http://localhost:3000'],
    'allowedOriginsPatterns' => [],
    'allowedHeaders' => ['*'],
    'allowedMethods' => ['*'],
    'exposedHeaders' => [],
    'maxAge' => 0,
];
```
