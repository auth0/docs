---
lodash: true
---

##PHP

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-PHP/master/create-package?path=examples/basic-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing PHP app to use it with Auth0.**

### 1. Add the needed dependencies

We need 2 dependencies to make this work:

* **php-jwt**: This will take care of checking the JWT
* **router**: We'll use this for creating simple routes

````json
{
    "name": "your/app",
    "description": "Basic sample for securing an API",
    "require": {
        "bramus/router": "dev-master",
        "firebase/php-jwt": "dev-master"
    },
    "license": "MIT"
}
```

### 2. Create the JWT Validation filter

Now, you need to validate the [JWT](https://docs.auth0.com/jwt). For that, we'll create a filter that will run in the routes we need.

````php
  // Require composer autoloader
  require __DIR__ . '/vendor/autoload.php';

  // Create Router instance
  $router = new \Bramus\Router\Router();

  // Check JWT on /secured routes. This can be any route you like
  $router->before('GET', '/secured/.*', function() {

    // This method will exist if you're using apache
    // If you're not, please go to the extras for a defintion of it.
    $requestHeaders = apache_request_headers();
    $authorizationHeader = $requestHeaders['AUTHORIZATION'];

    if ($authorizationHeader == null) {
      header('HTTP/1.0 401 Unauthorized');
      echo "No authorization header sent";
      exit();
    }

    // // validate the token
    $token = str_replace('Bearer ', '', $authorizationHeader);
    $secret = '@@account.clientSecret@@';
    $decoded_token = null;
    try {
      $decoded_token = JWT::decode($token, base64_decode(strtr($secret, '-_', '+/')) );
    } catch(UnexpectedValueException $ex) {
      header('HTTP/1.0 401 Unauthorized');
      echo "Invalid token";
      exit();
    }


    // // validate that this token was made for us
    if ($decoded_token->aud != '@@account.clientId@@0') {
      header('HTTP/1.0 401 Unauthorized');
      echo "Invalid token";
      exit();
    }

  });
```

### 3. Create a /secured route that will use this filter

Now, you can just create routes under /secured route which will check the JWT

````php
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

### 4. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Options Steps
#### Configure CORS

You can configure CORS, by just adding [this lines](https://github.com/auth0/auth0-PHP/blob/master/examples/basic-api/index.php#L45-L54) to your `index.php`

#### Define `apache_request_headers` if not available

If the function is not available, just [copy this lines](https://github.com/auth0/auth0-PHP/blob/master/examples/basic-api/index.php#L8-L29) to your `index.php`
