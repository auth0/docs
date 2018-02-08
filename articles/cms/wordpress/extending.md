---
description: How to extend the Login by Auth0 WordPress Plugin with hooks, filters, and functions.
---

# Extending Login by Auth0 WordPress Plugin

## Actions

Actions in WordPress run custom code at specific points during processing. [Learn more about actions here](https://developer.wordpress.org/plugins/hooks/actions/). 

#### `auth0_before_login`

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

#### `auth0_user_login` 

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

#### `wpa0_user_created` 

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
	echo '<strong>User ID</strong>:<br>' . $user_id . '<hr>';
	echo '<strong>Email</strong>:<br>' . $email . '<hr>';
	echo '<strong>Password</strong>:<br>' . $password . '<hr>';
	echo '<strong>First name</strong>:<br>' . $f_name . '<hr>';
	echo '<strong>Last name</strong>:<br>' . $l_name . '<hr>';
	wp_die( 'User created!' );
}

add_action( 'wpa0_user_created', 'a0_docs_ex_wpa0_user_created', 10, 5 );
```

## Filters

Filters in WordPress also run custom code at specific points during processing but typically return a modified value of some kind. [Learn more about filters here](https://developer.wordpress.org/plugins/hooks/filters/). 

#### `auth0_verify_email_page`

This filter runs in `WP_Auth0_Email_Verification` to change the HTML rendered when a logging-in user needs to verify 
their email before gaining access to the site. This HTML is 

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
	// ... modify $html
	return $html;
}
add_filter( 'auth0_verify_email_page', 'a0_docs_ex_auth0_verify_email_page', 10, 3 );
```

#### `auth0_get_auto_login_connection`

**Example:**

```php
```

#### `auth0_get_wp_user`

**Example:**

```php
```

#### `wp_auth0_get_option`

**Example:**

```php
```

#### `auth0_migration_ws_authenticated`

**Example:**

```php
```

#### `wpa0_should_create_user`

**Example:**

```php
```

#### `auth0_login_css`

**Example:**

```php
```