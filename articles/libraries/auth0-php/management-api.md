---
section: libraries
toc: true
description: Using Auth0's Management API with your PHP applications.
topics:
  - libraries
  - php
contentType:
  - how-to
  - reference
---
# PHP: Using the Management API

The Auth0 PHP SDK provides a `Auth0\SDK\API\Management` class, which houses the methods you can use to access the [Management API](/api/management/v2) and perform operations on your Auth0 tenant. Using this interface, you can easily:

- Search for and create users
- Create and update Applications
- Retrieve log entries
- Manage rules

... and much more. See our [APi reference](/api/management/v2) for information on what's possible!

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
// 👆 We're continuing from the "getting started" guide linked in "Prerequisites" above. Append this to the index.php file you created there.

if (isset($env['AUTH0_MANAGEMENT_API_TOKEN'])) {
    $auth0->configuration()->setManagementToken($env['AUTH0_MANAGEMENT_API_TOKEN']);
}

// Create a configured instance of the `Auth0\SDK\API\Management` class, based on the configuration we setup the SDK ($auth0) using.
// If no AUTH0_MANAGEMENT_API_TOKEN is configured, this will automatically perform a client credentials exchange to generate one for you, so long as a client secret is configured.
$management = $auth0->management();
```

The `Management` class stores access to endpoints as factory methods of its instances, for example `$management->users()` returns an instance of `Auth0\SDK\API\Management\Users` that you can use to interact with the /users Management API endpoints.

### Example: Search Users

This endpoint is documented [here](/api/management/v2#!/Users/get_users).

```php
// 👆 We're continuing from the code above. Append this to your source code file.

$response = $management->users()->getAll(['q' => 'josh']);

// Does the status code of the response indicate failure?
if ($response->getStatusCode() !== 200) {
    die("API request failed.");
}

// Decode the JSON response into a PHP array:
$response = json_decode(response->getBody()->__toString(), true, 512, JSON_THROW_ON_ERROR);

if (! empty($response)) {
    echo '<h2>User Results</h2>';

    foreach ($response as $result) {
        printf(
            '<p><strong>%s</strong> &lt;%s&gt; - %s</p>',
            !empty($result['nickname']) ? $result['nickname'] : 'No nickname',
            !empty($result['email']) ? $result['email'] : 'No email',
            $result['user_id']
        );
    }
}
```

### Example: Get All Clients

This endpoint is documented [here](/api/management/v2#!/Clients/get_clients).

```php
// 👆 We're continuing from the code above. Append this to your source code file.

$response = $management->clients()->getAll(['q' => 'josh']);

// Does the status code of the response indicate failure?
if ($response->getStatusCode() !== 200) {
    die("API request failed.");
}

// Decode the JSON response into a PHP array:
$response = json_decode(response->getBody()->__toString(), true, 512, JSON_THROW_ON_ERROR);

if (! empty($response)) {
    echo '<h2>Get All Clients</h2>';

    foreach ($response as $result) {
        printf(
            '<p><strong>%s</strong> - %s</p>',
            $result['name'],
            $result['client_id']
        );
    }
}
```

### Read more

::: next-steps
* [PHP Introduction](/libraries/auth0-php)
* [PHP Basic Use](/libraries/auth0-php/basic-use)
* [PHP Authentication API](/libraries/auth0-php/authentication-api)
* [PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
