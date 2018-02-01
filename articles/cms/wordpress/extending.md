---
description: How to extend the Login by Auth0 WordPress Plugin with hooks, filters, and functions.
---

# Extending Login by Auth0 WordPress Plugin

## Actions

Actions in WordPress run custom code at specific points during processing. [More about actions here](https://developer.wordpress.org/plugins/hooks/actions/). 

## `auth0_before_login` 

## `auth0_user_login` 

## `wpa0_user_created` 

`do_action( 'auth0_before_login', $user );`

`do_action( 'auth0_user_login' , $user->ID, $userinfo, $is_new, $id_token, $access_token );`

`do_action( 'wpa0_user_created', $user_id, $email, $password, $firstname, $lastname );`

## Filters

Filters in WordPress also run custom code at specific points during processing but typically return a modified value of some kind. [More about filters here](https://developer.wordpress.org/plugins/hooks/filters/). 

`apply_filters( 'auth0_verify_email_page', $html, $userinfo, '' );`
`apply_filters( 'auth0_get_auto_login_connection', $this->a0_options->get( 'auto_login_method' ) );`
`apply_filters( 'auth0_get_wp_user', $user, $userinfo );`
`apply_filters( 'auth0_get_wp_user' , $user, $userinfo );`
`apply_filters( 'wp_auth0_get_option', $default, $key );`
`apply_filters( 'auth0_migration_ws_authenticated', $user );`
`apply_filters( 'wpa0_should_create_user', true, $userinfo );`
`apply_filters( 'auth0_login_css', '' );`

