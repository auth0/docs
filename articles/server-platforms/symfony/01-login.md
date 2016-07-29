---
title: Login
description: This tutorial will show you how to use the Auth0 Symfony SDK to add authentication and authorization to your web app.
---

# Symfony Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* PHP 5.3.9
* Symfony 2.8
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-symfony-php-web-app/tree/master/00-Starter-Seed',
  pkgRepo: 'auth0-symfony-php-web-app',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'null'
}) %>

If you have used [Symfony](http://symfony.com) before, you are probably already familiar with the [HWIOAuth Bundle](https://github.com/hwi/HWIOAuthBundle). We'll be using it to integrate a Symfony WebApp with [Auth0](https://auth0.com/) and achieve Single Sign On with a few simple steps.

## Tutorial

### 1. Add HWIOAuthBundle to your composer.json

${snippet(meta.snippets.dependencies)}

and run `composer update`


### 2. Enable the bundle

${snippet(meta.snippets.setup)}

### 3. Configure the routes

Add the following routes at the beginning of `app/config/routing.yml`

```yml
hwi_oauth_redirect:
    resource: "@HWIOAuthBundle/Resources/config/routing/redirect.xml"
    prefix:   /connect

hwi_oauth_login:
    resource: "@HWIOAuthBundle/Resources/config/routing/login.xml"
    prefix:   /login

auth0_login:
    pattern: /auth0/callback
```


### 4. Configure Auth0

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/auth0/callback
```

### 5. Configure the resource owner

Add this to your `app/config/config.yml`

```yml
hwi_oauth:
    firewall_name: secured_area
    resource_owners:
        auth0:
            type:                auth0
            base_url:            https://${account.namespace}
            client_id:           ${account.clientId}
            client_secret:       ${account.clientSecret}
```

### 6. User provider

You can create a user provider that implements `OAuthAwareUserProviderInterface` and set it up in step 7, or you
can use one of the predefined services that `HWIOAuthBundle` provides.

### 7. Configure the oauth firewall

This is where you set the filters to select which pages are protected (aka, needs login). You can read more on how to configure this at the Symfony [security](http://symfony.com/doc/current/book/security.html) docs.

This is a basic example that allows anonymous users and then restricts access to the `/demo/hello/` route. It doesn't store the users in a db.

This file is `app/config/security.yml`:

```yml
security:
    providers:
        hwi:
            id: hwi_oauth.user.provider

    firewalls:
        secured_area:
            anonymous: ~
            oauth:
                resource_owners:
                    auth0: "/auth0/callback"
                login_path:        /login
                use_forward:       false
                failure_path:      /login

                oauth_user_provider:
                    service: hwi_oauth.user.provider

    access_control:
        - { path: ^/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/demo/hello, roles: ROLE_OAUTH_USER }
```

Notice that we need to identify the user provided selected in step 6 both in the firewall and in the providers.

### 8. Triggering login manually or integrating the Auth0Lock

${lockSDK}

### Troubleshooting

#### SSL certificate problem: self signed certificate in certificate chain

There is an issue with CAs database in your computer. Need to download this [CAs database](https://curl.haxx.se/ca/cacert.pem) to c:\cacert.pem for example and point it in php.ini with `openssl.cafile=c:/cacert.pem`.
