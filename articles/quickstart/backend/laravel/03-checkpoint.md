---
title: Checkpoint
description: "Now that your application has functioning authentication, route protection, and the ability to retrieve and update user information, it's time to put it all together."
topics:
  - quickstart
  - webapp
  - laravel
  - authentication
  - login
  - user profile
  - logout
  - php
  - laravel
contentType: tutorial
useCase: quickstart
github:
  path: app
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

### Run the Application

You are now ready to start your new Laravel application, so it can accept requests:

```shell
php artisan serve
```

### Prepare an Access Token

This demonstration backend API authorizes requests using access tokens provided as a header with each request. The requesting client (such as a single-page application or native client) handles the retrieval and storage of access tokens. The backend API doesn't need to maintain any state information for clients. You can learn more about [retrieving access tokens here.](https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens)

To test this application, you can use an access token from [your API settings' "test" view](https://manage.auth0.com/#/apis).

### Send a Network Request

Run the following command to request the public route:

```shell
curl --request GET \
  --url http://localhost:8000/api
```

Next, use your access token in an `Authorization` header to request a protected route:

```shell
curl --request GET \
  --url http://localhost:8000/api/protected \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Finally, try requesting the scope-protected route, which will only succeed if your access token has the  `read:messages` scope granted:

```shell
curl --request GET \
  --url http://localhost:8000/api/scoped \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

### Additional Reading

- [User Repositories and Models](https://github.com/auth0/laravel-auth0/blob/main/docs/User%20Models%20and%20Repositories.md) extends the Auth0 Laravel SDK to use your own user models, and how to store and retrieve users from a database.
- [Hooking Events](https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md) covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.
- [Management API](https://github.com/auth0/laravel-auth0/blob/main/docs/Management%20API.md) support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.

### Other Resources

- [Auth0 Laravel SDK GitHub Repository](https://github.com/auth0/laravel-auth0)
- [Auth0 Authentication API documentation](https://auth0.com/docs/api/authentication)
- [Auth0 Management API documentation](https://auth0.com/docs/api/management/v2)
- [Auth0 Community](https://community.auth0.com/)
