---
title: Authenticate
description: This tutorial will show you how to use the Auth0 PHP Symfony SDK to add authentication and authorization to your API.
---


<%= include('../../_includes/_package2', {
  org: 'auth0',
  repo: 'd',
  path: 'example',
  requirements: [
    'PHP 5.3.9',
    'Symfony 2.8'
  ]
}) %>

**Otherwise, please follow the steps below to configure your existing PHP (Symfony) API app to use it with Auth0.**

This bundle helps you integrate your Symfony WebApp with [Auth0](https://auth0.com/) to achieve Single Sign On with a few simple steps. You can see an example of usage [here](https://github.com/auth0/jwt-auth-bundle/tree/master/example)

## Tutorial

### 1. Install dependencies

We need to add **jwt-auth-bundle** dependency to your composer.json.

Once that's done, just run the following:

${snippet(meta.snippets.dependencies)}

> This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

### 2. Add the bundle to your AppKernel.php file

```php

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(

            ...

            new \Auth0\JWTAuthBundle\JWTAuthBundle(),

            ...

        );

        ...

        return $bundles;
    }

```

### 3. Configure your Auth0 app data

Modify the file /app/config/config.yml

${snippet(meta.snippets.setup)}

### 4. Setup your User and UserProvider

Create your User and UserProvider.

The UserProvider must implement the JWTUserProviderInterface (see /source/AppBundle/Security/A0UserProvider). This class should implement 2 methods:

- loadUserByJWT: This method receives the decoded JWT (but overloaded with the encoded token on the token attribute) and should return a User.

- getAnonymousUser: This method should return an anonymous user that represents an unauthenticated one (usually represented by the role *IS_AUTHENTICATED_ANONYMOUSLY*).
*Both methods can throw an AuthenticationException exception in case that the user is not found, in the case of the loadUserByJWT method, or you don't want to handle unauthenticated users on your app, in the case of the getAnonymousUser method.*

Then configure your UserProvider on /app/config/services.yml

```yml
services:
    a0_user_provider:
        class: AppBundle\Security\A0UserProvider
        arguments: ["@jwt_auth.auth0_service"]
```

### 5. Setup the SecurityProvider

Modify the file /app/config/security.yml:

- define your user provider
- define the secured area that you want to authenticate using JWT
- define the access_control section with the roles needed for each route

${snippet(meta.snippets.use)}

### 6. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.
```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.
