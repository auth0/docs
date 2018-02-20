---
title: Authorization
description: This tutorial demonstrates how to add authentication and authorization to a Symfony API.
github:
    path: 01-Authorization-RS256
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Install the Dependencies

Protecting a Symfony API with Auth0 requires the **jwt-auth-bundle** package. Install it using **composer**.

::: note
**[Composer](https://getcomposer.org/)** is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. See Composer's [getting started](https://getcomposer.org/doc/00-intro.md) doc for information on how to use it.
:::

${snippet(meta.snippets.dependencies)}

::: note
`v3.x.x` of the **jwt-auth-bundle** provides compatibility with Symfony 3. For Symfony 2.x support, use the v1 branch.
:::

## Add the Bundle to AppKernel.php

```php
// app/AppKernel.php

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(

            // ...
            new \Auth0\JWTAuthBundle\JWTAuthBundle(),

        );

        // ...
        return $bundles;
    }
```

## Add Configuration Values

Add your Auth0 domain and API audience to the `config.yml` file located in `app/config`.

${snippet(meta.snippets.setup)}

## Set Up the User and UserProvider

Create your `User` and `UserProvider`.

The `UserProvider` must implement the `JWTUserProviderInterface` (see `/source/AppBundle/Security/A0UserProvider`). This class should implement two methods:

- `loadUserByJWT`: receives the decoded JWT `access_token` and returns a User.

- `getAnonymousUser`: returns an anonymous user that represents an unauthenticated one (usually represented by the role `IS_AUTHENTICATED_ANONYMOUSLY`).

::: note
Both of the above methods can throw an `AuthenticationException`. If this exception is thrown by `loadUserByJWT`, the it will treat the user as being anonymous. If `getAnonymousUser` throw this exception, a `401 Unauthorized` will be returned.
:::

Provide configuration for the `UserProvider` in the `services.yml` file located in `app/config`.

```yml
services:
    a0_user_provider:
        class: AppBundle\Security\A0UserProvider
        arguments: ["@jwt_auth.auth0_service"]
```

## Set Up the SecurityProvider

Modify the `security.yml` file located in `app/config` such that it contains the following:

- The `UserProvider`
- The secured area that you want to authenticate using an `access_token`
- The `access_control` section with the roles needed for each route

${snippet(meta.snippets.use)}

## Set Up a Protected Route

```php
// src/AppBundle/Controller/SecuredController.php

// ...
class SecuredController extends Controller
{
    /**
     * @Route("/api/public", name="public")
     */
    // This route doesn't need authentication
    public function publicAction()
    {
        return new JsonResponse(array(
          'message' => "Hello from a public endpoint! You don't need to be authenticated to see this."
        ));
    }
    /**
     * @Route("/api/private", name="private")
     */
    public function privateAction()
    {
        return new JsonResponse(array(
          'message' => "Hello from a private endpoint! You need to be authenticated to see this."
        ));
    }
    /**
     * @Route("/api/private-scoped", name="privatescoped")
     */
    public function privateScopedAction()
    {
        return new JsonResponse(array(
          'message' => "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
        ));
    }
}
```

## Configuring Scopes

Scopes provide a way for you to define which resources should be accessible by the user holding a given `access_token`. For example, you might choose to permit `read` access to a `messages` resource if a user has a **manager** access level, or a `write` access to that resource if they are an **administrator**. The route defined above expects a scope of `read:messages` to be present in the payload of the `access_token`.

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and choose the **Scopes** tab. In this area you can apply any scopes you wish, including one called `read:messages`, which will be used in this example.

With this configuration in place, only `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.
