---
description: How to extend the Login by Auth0 WordPress Plugin with hooks, filters, and functions.
toc: true
---

# Extending the Login by Auth0 WordPress Plugin

WordPress plugins can be extended to fit your specific requirements by using actions and filters to run custom code at specific points during runtime. This document outlines the existing hooks in the Login by Auth0 plugin. We're happy to review and approve new filters and actions that help you integrate even further in this plugin. Please
 see the Contributing section on the [GitHub repo readme for this plugin](https://github.com/auth0/wp-auth0/blob/master/README.md).

## Actions

Actions in WordPress run custom code at specific points during processing. [Learn more about actions here](https://developer.wordpress.org/plugins/hooks/actions/). 

`auth0_before_login`

This action runs in `WP_Auth0_LoginManager` after a user has been authenticated successfully but before they have been logged into WordPress. It can be used to stop the login process if needed using `wp_die()` or throwing an exception.

**Example:**

```php
/**
 * @param WP_User $user - WordPress user ID
 */
function a0_docs_ex_auth0_before_login ( $user ) {
 // ... do something before logging in
}
add_action( 'auth0_before_login', 'a0_docs_ex_auth0_before_login' );
``` 

`auth0_user_login` 

This action runs in `WP_Auth0_LoginManager` after a user has been authenticated successfully and logged into 
WordPress. It can be used to set specific meta values, send notifications, or ping other services. 

**Example:**

```php
/**
 * @param integer $user_id - WordPress user ID
 * @param stdClass $userinfo - user information object from Auth0
 * @param boolean $is_new - true if the user was created in WordPress, false if not
 * @param string $id_token - ID token for the user from Auth0 (not used in code flow)
 * @param string $access_token - bearer access token from Auth0 (not used in implicit flow)
 */
function a0_docs_ex_auth0_user_login ( $user_id, $userinfo, $is_new, $id_token, $access_token ) {
  // ... do something after logging in
}
add_action( 'auth0_user_login', 'a0_docs_ex_auth0_user_login', 10, 5 );
``` 

`wpa0_user_created` 

This action runs in `WP_Auth0_Users` just after a WordPress user is successfully created. It can be used to change 
user values, set additional user metas, or trigger other new user actions. 

**Example:**

```php
/**
 * @param integer $user_id - WordPress user ID for created user
 * @param string $email - email address for created user
 * @param string $password - password used for created user
 * @param string $f_name - first name for created user
 * @param string $l_name - last name for created user
 */
function a0_docs_ex_wpa0_user_created ( $user_id, $email, $password, $f_name, $l_name ) {
	// ... do something once a user has been created
}

add_action( 'wpa0_user_created', 'a0_docs_ex_wpa0_user_created', 10, 5 );
```

## Filters

Filters in WordPress also run custom code at specific points during processing but always return a modified value of the same type that was passed in. [Learn more about filters here](https://developer.wordpress.org/plugins/hooks/filters/). 

`auth0_get_wp_user`

This filter is called after the plugin finds the related user to login (based on the auth0 `user_id`) and is used to override the default behaviour with custom matching rules (for example, always match by email).

If the filter returns null, it will lookup by email as described in the [How does it work?](/cms/wordpress/how-does-it-work) document.

**Example:**

```php
/**
 * @param WP_User|null $user - found WordPress user, null if no user was found
 * @param stdClass $userinfo - user information from Auth0
 *
 * @return WP_User|null
 */
function auth0_theme_hook_auth0_get_wp_user( $user, $userinfo ) {
	// ... try to match another way, decide to replace $user
	return $user;
}
add_filter( 'auth0_get_wp_user', 'auth0_theme_hook_auth0_get_wp_user', 1, 2 );
```

`auth0_verify_email_page`

This filter runs in `WP_Auth0_Email_Verification` to change the HTML rendered when a user who is logging in needs to verify their email before gaining access to the site. Note that this HTML is passed to `wp_die()` where it is modified before being displayed (see the `_default_wp_die_handler()` definition in core for more information). 

**Example:**

```php
/**
 * @param string $html - HTML to modify, echoed out within wp_die()
 * @param stdClass $userinfo - user info object from Auth0
 * @param string $id_token - DEPRECATED, do not use
 *
 * @return string
 */
function a0_docs_ex_auth0_verify_email_page ( $html, $userinfo, $id_token ) {
	// ... modify $html by replacing or concatenating
	return $html;
}
add_filter( 'auth0_verify_email_page', 'a0_docs_ex_auth0_verify_email_page', 10, 3 );
```

`auth0_get_auto_login_connection`

This filter is used in `WP_Auth0_LoginManager` to modify what connection is used for the auto-login process. The 
setting in wp-admin is pulled and then passed through this filter. 

**Example:**

```php
/**
 * @param string $connection - name of the connection, initially pulled from Auth0 plugin settings
 *
 * @return string mixed
 */
function a0_docs_ex_auth0_get_auto_login_connection( $connection ) {
	// ... modify $connection
	return $connection;
}
add_filter( 'auth0_get_auto_login_connection', 'a0_docs_ex_auth0_get_auto_login_connection');
```

`wp_auth0_get_option`

This filter is used by option-getting functions and methods to modify the output value.  

**Example:**

```php
/**
 * @param mixed $value - value of the option, initially pulled from the database
 * @param string $key - key of the settings array
 *
 * @return mixed
 */
function a0_docs_ex_wp_auth0_get_option( $value, $key ) {
	// ... modify $value
	return $value;
}
add_filter( 'wp_auth0_get_option', 'a0_docs_ex_wp_auth0_get_option', 10, 2 );
```

`auth0_migration_ws_authenticated`

This filter is used in `WP_Auth0_Routes` to alter the WP_User object that is JSON-encoded and returned to Auth0 
during a user migration. 

**Example:**

```php
/**
 * @param WP_User $user - WordPress user object found during migration and authenticated
 *
 * @return WP_User
 */
function a0_docs_ex_auth0_migration_ws_authenticated( $user ) {
	// ... modify $user
	return $user;
}
add_filter( 'auth0_migration_ws_authenticated', 'a0_docs_ex_auth0_migration_ws_authenticated' );
```

`wpa0_should_create_user`

This filter is used in `WP_Auth0_Users` when deciding whether a user should be created. The initial value passed in 
is `TRUE`. If `FALSE` is returned for any reason, registration will be rejected and the registering user will see an 
error message (see `WP_Auth0_UsersRepo::create()`).

**Example:**

```php
/**
 * @param bool $should_create - should the user be created, initialized as TRUE
 * @param stdClass $userinfo - Auth0 user information
 *
 * @return bool
 */
function a0_docs_ex_wpa0_should_create_user( $should_create, $userinfo ) {
	// ... modify $should_create
	return $should_create;
}
add_filter( 'wpa0_should_create_user', 'a0_docs_ex_wpa0_should_create_user' );
```

`auth0_login_css`

This filter is used to modify the CSS on the login page, including the login widget itself. This filter runs before 
CSS is retrieved from the wp-admin settings page.

**Example:**

```php
/**
 * @param string $css, initialized as empty
 *
 * @return string
 */
function a0_docs_ex_auth0_login_css( $css ) {
	// ... modify $css by replacing or concatenating
	return $css;
}
add_filter( 'auth0_login_css', 'a0_docs_ex_auth0_login_css' );
```

## Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Install the plugin](/cms/wordpress/installation)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Troubleshooting](/cms/wordpress/troubleshoot)
:::