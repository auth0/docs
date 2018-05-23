---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Symfony SDK to add authentication and authorization to your web app.
budicon: 448
github:
    path: 00-Starter-Seed
---

<%= include('../_includes/_getting_started', { library: 'Symfony', callback: 'http://localhost:3000/callback' }) %>


## Using HWIOAuthBundle for Authentication

If you have used [Symfony](http://symfony.com) before, you are probably already familiar with the [HWIOAuth Bundle](https://github.com/hwi/HWIOAuthBundle). We'll be using it to integrate the Symfony WebApp with [Auth0](https://auth0.com/) and achieve Single Sign On with a few simple steps.

Add HWIOAuthBundle to `composer.json`.

${snippet(meta.snippets.dependencies)}

and run `composer update`.

::: note
This sample is using [`curl-client`](https://github.com/php-http/curl-client) as PHP HTTP client implementation for [`httplug-bundle`](https://github.com/php-http/HttplugBundle), you can use the PHP HTTP [client implementation](http://docs.php-http.org/en/latest/clients.html) you want.
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

## Create an Auth0 Resource Owner

You need to create an Auth0 resource owner to enable HWIOAuthBundle to connect to Auth0.

Add this to your `src/AppBundle/Auth0ResourceOwner.php`

```php
<?php

namespace AppBundle;

use Dotenv\Dotenv;

use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\GenericOAuth2ResourceOwner;

class Auth0ResourceOwner extends GenericOAuth2ResourceOwner
{
    /**
     * {@inheritdoc}
     */
    protected $paths = array(
        'identifier' => 'user_id',
        'nickname' => 'nickname',
        'realname' => 'name',
        'email' => 'email',
        'profilepicture' => 'picture',
    );

    /**
     * {@inheritdoc}
     */
    public function getAuthorizationUrl($redirectUri, array $extraParameters = array())
    {
        return parent::getAuthorizationUrl($redirectUri, array_merge(array(
            'audience' => $this->options['audience'],
        ), $extraParameters));
    }

    /**
     * {@inheritdoc}
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $dotenv = new Dotenv();

        if (!getenv('AUTH0_DOMAIN')) {
            $dotenv->load(__DIR__ . '/../../.env');
        }

        $resolver->setDefaults(array(
            'authorization_url' => '{base_url}/authorize',
            'access_token_url' => '{base_url}/oauth/token',
            'infos_url' => '{base_url}/userinfo',
            'audience' => 'https://'.getenv('AUTH0_DOMAIN').'/userinfo',
        ));

        $resolver->setRequired(array(
            'base_url',
        ));

        $normalizer = function (Options $options, $value) {
            return str_replace('{base_url}', $options['base_url'], $value);
        };

        $resolver->setNormalizer('authorization_url', $normalizer);
        $resolver->setNormalizer('access_token_url', $normalizer);
        $resolver->setNormalizer('infos_url', $normalizer);
    }
}
```

## Configure the Resource Owner

Add this to your `app/config/config.yml`

```yml
hwi_oauth:
    firewall_names: [secured_area]
    resource_owners:
        auth0:
            type:                oauth2
            class:               'AppBundle\Auth0ResourceOwner'
            base_url:            https://${account.namespace}
            client_id:           ${account.clientId}
            client_secret:       YOUR_CLIENT_SECRET
            redirect_uri:        http://yourUrl/auth0/callback
            scope: "openid profile"
```

## User Provider

You can create a user provider that implements `OAuthAwareUserProviderInterface` and set it up in the next step, or you
can use one of the predefined services that `HWIOAuthBundle` provides.

## Configure the OAuth Firewall

This is where you set the filters to select which pages require authentication or authorization. You can read more on how to configure this at the Symfony [security](http://symfony.com/doc/current/book/security.html) docs.

This is a basic example that allows anonymous users and then restricts access to the `/secured` route. It doesn't store the users in a DB.

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
    <a href="{{ url('secured') }}">Protected route</a>
    <a href="{{ logout_url("secured_area") }}">
        <button>Logout</button>
    </a>
{% else %}
    <h1>Symfony Auth0 Quickstart</h1>
    <a href="/connect/auth0"><button>Login</button></a>
{% endif %}
```

