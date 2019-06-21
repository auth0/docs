---
section: libraries
toc: true
description: Using the Management API with Auth0-PHP
topics:
  - libraries
  - php
contentType: how-to
---
# Using the Management API with Auth0-PHP

Auht0-PHP provides a wrapper for the Management API, which is used to perform operations on your Auth0 tenant. Using this API, you can:

- Search for and create users
- Create and update Applications
- Retrieve log entries
- Manage rules

... and much more. See our [documentation](/api/management/v2) for information on what's possible and the examples below for how to authenticate and access this API.

## Authentication

To use the Management API, you must authenticate one of two ways:

- For temporary access or testing, you can [manually generate an API token](/api/management/v2/tokens#get-a-token-manually) and save it in your `.env` file.
- For extended access, you must create and execute and Client Credentials grant when access is required. This process is detailed on the [Authentication API page](/libraries/auth0-php/authentication-api#regular-web-app-login-flow).

Regardless of the method, the token generated must have the <dfn data-key="scope">scopes</dfn> required for the operations your app wants to execute. Consult the [API documentation](/api/management/v2) for the scopes required for the specific endpoint you're trying to access.

To grant the scopes needed:

1. Go to [APIs](https://manage.auth0.com/#/apis) > Auth0 Management API > **Machine to Machine Applications** tab.
2. Find your Application and authorize it.
3. Click the arrow to expand the row and select the scopes required.

Now you can authenticate one of the two ways above and use that token to perform operations:

```php
use Auth0\SDK\API\Management;

if ( 'test' === getenv('APPLICATION_ENVIRONMENT') ) {
    // Use a temporary testing token.
    $access_token = getenv('AUTH0_MANAGEMENT_API_TOKEN');
} else {
    // See Authentication API page to implement this function.
    $access_token = getManagementAccessToken();
}
$mgmt_api = new Management( $access_token, getenv('AUTH0_DOMAIN') );
```

The `Management` class stores access to endpoints as properties of its instances. The best way to see what endpoints are covered is to read through the `\Auth0\SDK\API\Management` constructor method.

### Example - Search Users by Email

This endpoint is documented [here](/api/management/v2#!/Users/get_users).

```php
$results = $mgmt_api->users->search([
    'q' => 'josh'
]);

if (! empty($results)) {
    echo '<h2>User Search</h2>';
    foreach ($results as $datum) {
        printf(
            '<p><strong>%s</strong> &lt;%s&gt; - %s</p>',
            !empty($datum['nickname']) ? $datum['nickname'] : 'No nickname',
            !empty($datum['email']) ? $datum['email'] : 'No email',
            $datum['user_id']
        );
    }
}
```

### Example - Get All Clients

This endpoint is documented [here](/api/management/v2#!/Clients/get_clients).

```php
$results = $mgmt_api->clients->getAll();

if (! empty($results)) {
    echo '<h2>Get All Clients</h2>';
    foreach ($results as $datum) {
        printf(
            '<p><strong>%s</strong> - %s</p>',
            $datum['name'],
            $datum['client_id']
        );
    }
}
```

### Read more

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
