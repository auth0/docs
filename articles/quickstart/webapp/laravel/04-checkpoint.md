---
title: Checkpoint
description: "Now that your application has functioning authentication, route protection, and the ability to retrieve and update user information, it's time to put it all together."
topics:
  - quickstarts
  - webapp
  - laravel
  - authentication
  - login
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

### Test the Application

- Open a browser to [http://localhost:8000](http://localhost:8000) to see the public route.
- Visit [/protected](http://localhost:8000/protected) to be redirected to login.
- Visit [/scoped](http://localhost:8000/scoped).<br />If you don't have the `read:messages` scope, you'll be denied access.
- Visit [/logout](http://localhost:8000/logout) to log out.

### Additional Reading

- [User Repositories and Models](https://github.com/auth0/laravel-auth0/blob/main/docs/User%20Models%20and%20Repositories.md) extends the Auth0 Laravel SDK to use your own user models, and how to store and retrieve users from a database.
- [Hooking Events](https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md) covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.
- [Management API](https://github.com/auth0/laravel-auth0/blob/main/docs/Management%20API.md) support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.

### Other Resources

- [Auth0 Laravel SDK GitHub Repository](https://github.com/auth0/laravel-auth0)
- [Auth0 Authentication API documentation](https://auth0.com/docs/api/authentication)
- [Auth0 Management API documentation](https://auth0.com/docs/api/management/v2)
- [Auth0 Community](https://community.auth0.com/)
