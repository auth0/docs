---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Symfony SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-symfony-php-web-app/tree/master/00-Starter-Seed',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-symfony-php-web-app',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* PHP 5.3.9
* Symfony 2.8
:::



If you have used [Symfony](http://symfony.com) before, you are probably already familiar with the [HWIOAuth Bundle](https://github.com/hwi/HWIOAuthBundle). We'll be using it to integrate a Symfony WebApp with [Auth0](https://auth0.com/) and achieve Single Sign On with a few simple steps.

## Add HWIOAuthBundle to `composer.json`

${snippet(meta.snippets.dependencies)}

and run `composer update`

## Enable the Bundle

${snippet(meta.snippets.setup)}

## Configure the Routes

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

## Configure Auth0

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/auth0/callback
```

## Configure the Resource Owner

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

## User Provider

You can create a user provider that implements `OAuthAwareUserProviderInterface` and set it up in step 7, or you
can use one of the predefined services that `HWIOAuthBundle` provides.

## Configure the OAuth Firewall

This is where you set the filters to select which pages are protected (aka, needs login). You can read more on how to configure this at the Symfony [security](http://symfony.com/doc/current/book/security.html) docs.

This is a basic example that allows anonymous users and then restricts access to the `/demo/hello/` route. It doesn't store the users in a DB.

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

## Triggering Login Manually or Integrating Lock

<%= include('../../_includes/_lock-sdk') %>

### Troubleshooting

#### SSL certificate problem: self signed certificate in certificate chain

There is an issue with CAs database on your computer. Need to download this [CAs database](https://curl.haxx.se/ca/cacert.pem) to c:\cacert.pem for example and point it in php.ini with `openssl.cafile=c:/cacert.pem`.
