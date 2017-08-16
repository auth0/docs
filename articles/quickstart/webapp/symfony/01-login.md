---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Symfony SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-symfony-php-web-app',
  path: '00-Starter-Seed',
  requirements: [
    'PHP 5.3.9',
    'Symfony 3.*'
  ]
}) %>

If you have used [Symfony](http://symfony.com) before, you are probably already familiar with the [HWIOAuth Bundle](https://github.com/hwi/HWIOAuthBundle). We'll be using it to integrate a Symfony WebApp with [Auth0](https://auth0.com/) and achieve Single Sign On with a few simple steps.

## Add HWIOAuthBundle to `composer.json`

${snippet(meta.snippets.dependencies)}

and run `composer update`

::: note
This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.
:::

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
    path:    /auth0/callback

auth0_logout:
    path: /auth0/logout
```

## Configure Auth0

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```text
http://yourUrl/auth0/callback
```

## Configure the Resource Owner

Add this to your `app/config/config.yml`

```yml
hwi_oauth:
    firewall_names: [secured_area]
    resource_owners:
        auth0:
            type:                auth0
            base_url:            https://${account.namespace}
            client_id:           ${account.clientId}
            client_secret:       ${account.clientSecret}
            scope: "openid profile"
```

## User Provider

You can create a user provider that implements `OAuthAwareUserProviderInterface` and set it up in the next step, or you
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
            logout:
                path:   /auth0/logout
                target: /

    access_control:
        - { path: ^/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/secured, roles: ROLE_OAUTH_USER }
```

Notice that we need to identify the user provided selected in the step before both in the providers and in the firewall.

## Triggering Login and accessing user information

Set the following in `app/resources/views/index.html.twig`

```html
{% if app.user %}
    Welcome, {{ app.user.username }}!<br/>
    {{ dump(app.user) }}
    <a href="{{ logout_url("secured_area") }}">
        <button>Logout</button>
    </a>
{% else %}
    <h1>Symfony Auth0 Quickstart</h1>
    <script src="${auth0js_urlv8}"></script>
    <script type="text/javascript">
        var webAuth = new auth0.WebAuth({
            domain: '${account.namespace}',
            clientID: '${account.clientId}',
            redirectUri: 'http://localhost:8000/auth0/callback',
            audience: `https://${account.namespace}/userinfo`,
            responseType: 'code',
            scope: 'openid profile'
        });

        function signin() {
            webAuth.authorize();
        }
    </script>
    <button onclick="window.signin();">Login</button>
{% endif %}
```

### Troubleshooting

#### SSL certificate problem: self signed certificate in certificate chain

If there is an issue with CAs database on your computer, you may need to download this [CAs database](https://curl.haxx.se/ca/cacert.pem). To use it on Windows for example, place it in `c:\cacert.pem` and point to it in `php.ini` with `openssl.cafile=c:/cacert.pem`.
