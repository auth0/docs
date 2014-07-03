# Symfony Tutorial

If you have used symfony before you are probably aware of the [HWIOAuth Bundle](https://github.com/hwi/HWIOAuthBundle). We use it to provide symfony users access to auth0 functionality.

Here is a tutorial on what you need to do, to make it work in your existing symfony project.

## Tutorial

### 1. Configure Auth0
Create a PHP application in the [auth0 dashboard](https://app.auth0.com/#/), and keep at hand the domain, client id and client secret.

Also add `http://<your-domain>/login/check-auth0` to the valid callbacks

### 2. Add HWIOAuthBundle to your composer.json

    {
        "require": {
            "hwi/oauth-bundle": "0.4.*@dev"
        }
    }

and run `composer update`


### 3. Enable the bundle

    // app/AppKernel.php

    public function registerBundles()
    {
        $bundles = array(
            // ...
            new HWI\Bundle\OAuthBundle\HWIOAuthBundle(),
        );
    }

### 4. Configure the routes

Add the following routes at the begining of `app/config/routing.yml`

    hwi_oauth_redirect:
        resource: "@HWIOAuthBundle/Resources/config/routing/redirect.xml"
        prefix:   /connect

    hwi_oauth_login:
        resource: "@HWIOAuthBundle/Resources/config/routing/login.xml"
        prefix:   /login

    auth0_login:
        pattern: /login/check-auth0


### 5. Configure the resource owner

Add this to app/config/config.yml


    hwi_oauth:
        firewall_name: secured_area
        resource_owners:
            auth0:
                type:                auth0
                base_url:            https://@@account.namespace@@
                client_id:           @@account.clientId@@
                client_secret:       @@account.clientSecret@@

### 6. User provider

You can create a user provider that implements `OAuthAwareUserProviderInterface` and set it up in step 7, or you
can use one of the predefined services that `HWIOAuthBundle` provides.

### 7. Configure the oauth firewall

This is where you set the filters to select which pages are protected (aka, needs login). You can read more on
how to configure this page here:

http://symfony.com/doc/current/book/security.html

This is a basic example that allows anonymus users and that restrict access to the `/demo/hello/` url. It doesn't store the users in a db
This file is `app/config/security.yml`

    security:
        providers:
            hwi:
                id: hwi_oauth.user.provider

        firewalls:
            secured_area:
                anonymous: ~
                oauth:
                    resource_owners:
                        auth0: "/login/check-auth0"
                    login_path:        /login
                    use_forward:       false
                    failure_path:      /login

                    oauth_user_provider:
                        service: hwi_oauth.user.provider

        access_control:
            - { path: ^/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
            - { path: ^/demo/hello, roles: ROLE_OAUTH_USER }

Notice that we need to identify the user provided selected in step 6 both in the firewall and in the providers.

