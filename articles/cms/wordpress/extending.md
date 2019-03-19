---
description: How to extend the Login by Auth0 WordPress Plugin with hooks, filters, and functions.
toc: true
topics:
    - wordpress
    - cms
---
# Extending the Login by Auth0 WordPress Plugin

WordPress plugins can be extended to fit your specific requirements by using actions and filters to run custom code at specific points during runtime. This document outlines the existing hooks in the Login by Auth0 plugin. We're happy to review and approve new filters and actions that help you integrate even further in this plugin. Please see the Contributing section on the [GitHub repo readme for this plugin](https://github.com/auth0/wp-auth0/blob/master/README.md).

## Actions

Actions in WordPress run custom code at specific points during processing. [Learn more about actions here](https://developer.wordpress.org/plugins/hooks/actions/). These examples are maintained [here](https://github.com/joshcanhelp/auth0-wp-test/blob/master/inc/hooks-core-actions.php).

### auth0_before_login

This action runs in `WP_Auth0_LoginManager` after a user has been authenticated successfully but before they have been logged into WordPress. It can be used to stop the login process if needed using `wp_die()` or throwing an exception.

**Example:**

```php
/**
 * Stop login process before logging in and output the current $user object.
 * NOTE: The example below will break the user login process.
 *
 * @see WP_Auth0_LoginManager::do_login()
 *
 * @param WP_User $user - WordPress user object.
 */
function auth0_docs_hook_auth0_before_login( $user ) {
	echo '<strong>WP user</strong>:<br><pre>' . print_r( $user, true ) . '</pre><hr>';
	wp_die( 'Login process started!' );
}
add_action( 'auth0_before_login', 'auth0_docs_hook_auth0_before_login', 10, 1 );
```

### auth0_user_login

This action runs in `WP_Auth0_LoginManager` after a user has been authenticated successfully and logged into WordPress. It can be used to set specific meta values, send notifications, or ping other services.

**Example:**

```php
/**
 * Stop the login process after WP login.
 * NOTE: The example below will break the user login process.
 *
 * @see WP_Auth0_LoginManager::do_login()
 *
 * @param integer  $user_id       - WordPress user ID for logged-in user
 * @param stdClass $userinfo      - user information object from Auth0
 * @param boolean  $is_new        - true if the user was created in WordPress, false if not
 * @param string   $id_token      - ID Token for the user from Auth0
 * @param string   $access_token  - Bearer Access Token from Auth0 (not used in implicit flow)
 * @param string   $refresh_token - Refresh Token from Auth0 (not used in implicit flow)
 */
function auth0_docs_hook_auth0_user_login( $user_id, $userinfo, $is_new, $id_token, $access_token, $refresh_token ) {
	echo '<strong>WP user ID</strong>:<br>' . $user_id . '<hr>';
	echo '<strong>Auth0 user info</strong>:<br><pre>' . print_r( $userinfo, true ) . '</pre><hr>';
	echo '<strong>Added to WP DB?</strong>:<br>' . ( $is_new ? 'yep' : 'nope' ) . '<hr>';
	echo '<strong>ID Token</strong>:<br>' . ( $id_token ? $id_token : 'not provided' ) . '<hr>';
	echo '<strong>Access Token</strong>:<br>' . ( $access_token ? $access_token : 'not provided' ) . '<hr>';
	echo '<strong>Refresh Token</strong>:<br>' . ( $refresh_token ? $refresh_token : 'not provided' ) . '<hr>';
	wp_die( 'Login successful! <a href="' . home_url() . '">Home</a>' );
}
add_action( 'auth0_user_login', 'auth0_docs_hook_auth0_user_login', 10, 6 );
```

### wpa0_user_created

This action runs in `WP_Auth0_Users` just after a WordPress user is successfully created. It can be used to change user values, set additional user metas, or trigger other new user actions.

**Example:**

```php
/**
 * Stop the login process after a new user has been created.
 * NOTE: The example below will break the user login process.
 *
 * @see WP_Auth0_Users::create_user()
 *
 * @param integer $user_id  - WordPress user ID for created user
 * @param string  $email    - email address for created user
 * @param string  $password - password used for created user
 * @param string  $f_name   - first name for created user
 * @param string  $l_name   - last name for created user
 */
function auth0_docs_hook_wpa0_user_created( $user_id, $email, $password, $f_name, $l_name ) {
	echo '<strong>User ID</strong>:<br>' . $user_id . '<hr>';
	echo '<strong>Email</strong>:<br>' . $email . '<hr>';
	echo '<strong>Password</strong>:<br>' . $password . '<hr>';
	echo '<strong>First name</strong>:<br>' . $f_name . '<hr>';
	echo '<strong>Last name</strong>:<br>' . $l_name . '<hr>';
	wp_die( 'User created!' );
}
add_action( 'wpa0_user_created', 'auth0_docs_hook_wpa0_user_created', 10, 5 );
```

## Filters

Filters in WordPress also run custom code at specific points during processing but always return a modified value of the same type that was passed in. [Learn more about filters here](https://developer.wordpress.org/plugins/hooks/filters/). These examples are maintained [here](https://github.com/joshcanhelp/auth0-wp-test/blob/master/inc/hooks-core-filters.php).

### auth0_get_wp_user

This filter is called after the plugin finds the related user to login (based on the auth0 `user_id`) and is used to override the default behavior with custom matching rules (for example, always match by email).

If the filter returns null, it will lookup by email as described in the [How does it work?](/cms/wordpress/how-does-it-work) document.

**Example:**

```php
/**
 * Filter the WordPress user found during login.
 *
 * @see WP_Auth0_LoginManager::login_user()
 *
 * @param WP_User|null $user     - found WordPress user, null if no user was found.
 * @param stdClass     $userinfo - user information from Auth0.
 *
 * @return WP_User|null
 */
function auth0_docs_hook_auth0_get_wp_user( $user, $userinfo ) {
	$found_user = get_user_by( 'email', $userinfo->email );
	$user       = $found_user instanceof WP_User ? $user : null;
	return $user;
}
add_filter( 'auth0_get_wp_user', 'auth0_docs_hook_auth0_get_wp_user', 1, 2 );
```

### auth0_verify_email_page

This filter runs in `WP_Auth0_Email_Verification` to change the HTML rendered when a user who is logging in needs to verify their email before gaining access to the site. Note that this HTML is passed to `wp_die()` where it is modified before being displayed (see the `_default_wp_die_handler()` definition in core for more information).

**Example:**

```php
/**
 * Filter the HTML used on the email verification wp_die page.
 *
 * @see WP_Auth0_Email_Verification::render_die()
 *
 * @param string   $html     - HTML to modify, echoed out within wp_die().
 * @param stdClass $userinfo - user info object from Auth0.
 * @param string   $id_token - DEPRECATED, do not use.
 *
 * @return string
 */
function auth0_docs_hook_auth0_verify_email_page( $html, $userinfo, $id_token ) {
	$html = 'Hi ' . $userinfo->email . '!<br>' . $html;
	$html = str_replace( 'email', 'banana', $html );
	return $html;
}
add_filter( 'auth0_verify_email_page', 'auth0_docs_hook_auth0_verify_email_page', 10, 3 );
```

### auth0_get_auto_login_connection

This filter is used in `WP_Auth0_LoginManager` to modify what connection is used for the auto-login process. The setting in wp-admin is pulled and then passed through this filter.

**Example:**

```php
/**
 * Filter the auto-login connection used by looking for a URL parameter.
 *
 * @param string $connection - name of the connection, initially pulled from Auth0 plugin settings.
 *
 * @return string mixed
 */
function auth0_docs_hook_auth0_get_auto_login_connection( $connection ) {
	return ! empty( $_GET['connection'] ) ? rawurlencode( $_GET['connection'] ) : $connection;
}
add_filter( 'auth0_get_auto_login_connection', 'auth0_docs_hook_auth0_get_auto_login_connection' );
```

### wp_auth0_get_option

This filter is used by option-getting functions and methods to modify the output value.  

**Example:**

```php
/**
 * Adjust an options value before use.
 *
 * @param mixed  $value - value of the option, initially pulled from the database.
 * @param string $key   - key of the settings array.
 *
 * @return mixed
 */
function auth0_docs_hook_wp_auth0_get_option( $value, $key ) {
	$value = 'bad_key' === $key ? 'That is a bad key and you know it' : $value;
	return $value;
}
add_filter( 'wp_auth0_get_option', 'auth0_docs_hook_wp_auth0_get_option', 10, 2 );
```

### auth0_migration_ws_authenticated

This filter is used in `WP_Auth0_Routes` to alter the WP_User object that is JSON-encoded and returned to Auth0 during a user migration.

**Example:**

```php
/**
 * Filter the WP user object before sending back to Auth0 during migration.
 *
 * @param WP_User $user - WordPress user object found during migration and authenticated.
 *
 * @return WP_User
 */
function auth0_docs_hook_auth0_migration_ws_authenticated( $user ) {
	$user->data->display_name = 'Sir ' . $user->data->display_name . ', Esquire';
	return $user;
}
add_filter( 'auth0_migration_ws_authenticated', 'auth0_docs_hook_auth0_migration_ws_authenticated' );
```

### wpa0_should_create_user

This filter is used in `WP_Auth0_Users` when deciding whether a user should be created. The initial value passed in
is `TRUE`. If `FALSE` is returned for any reason, registration will be rejected and the registering user will see an
error message (see `WP_Auth0_UsersRepo::create()`).

**Example:**

```php
/**
 * Should a new user be created?
 *
 * @param bool     $should_create - should the user be created, initialized as TRUE
 * @param stdClass $userinfo      - Auth0 user information
 *
 * @return bool
 */
function auth0_docs_hook_wpa0_should_create_user( $should_create, $userinfo ) {
	$should_create = false === strpos( 'josh', $userinfo->email );
	return $should_create;
}
add_filter( 'wpa0_should_create_user', 'auth0_docs_hook_wpa0_should_create_user' );
```

### auth0_login_css

This filter is used to modify the CSS on the login page, including the login widget itself. This filter runs before
CSS is retrieved from the wp-admin settings page.

**Example:**

```php
/**
 * Add CSS to the Auth0 login form.
 *
 * @param string $css - initialized as empty.
 *
 * @return string
 */
function auth0_docs_hook_auth0_login_css( $css ) {
	$css .= '
		body {background: radial-gradient(#01B48F, #16214D)}
		#login h1 {display: none}
		.login form.auth0-lock-widget {box-shadow: none}
	';
	return $css;
}
add_filter( 'auth0_login_css', 'auth0_docs_hook_auth0_login_css' );
```

### auth0_login_form_tpl

Filters the template used for the Auth0 login form. This should return a path to a file containing HTML that replaces what is in `wp-content/plugins/auth0/templates/auth0-login-form.php`. The standard Lock initiation JS looks for an ID attribute of `auth0-login-form` to instantiate the login form so make sure that's present or replace the `wp-content/plugins/auth0/assets/js/lock-init.js` file with your own.

```php
/**
 * Override the Lock login form template.
 *
 * @param string  $tpl_path - original template path.
 * @param array   $lock_options - Lock options.
 * @param boolean $show_legacy_login - Should the template include a link to the standard WP login?
 *
 * @return string
 */
function auth0_docs_hook_auth0_login_form_tpl( $tpl_path, $lock_options, $show_legacy_login ) {
	return get_stylesheet_directory_uri() . '/templates/auth0-login-form.html';
}
add_filter( 'auth0_login_form_tpl', 'auth0_docs_hook_auth0_login_form_tpl', 10, 3 );
```

### auth0_settings_fields

This filter is used to modify an existing form field or to add a new one. This should return a modified `$options` array with your changes or additions. New fields must have a field callback, as shown below.

```php
/**
 * Modify existing or add new settings fields.
 *
 * @param array  $options - array of options for a specific settings tab.
 * @param string $id      - settings tab id.
 *
 * @return array
 *
 * @see WP_Auth0_Admin_Generic::init_option_section()
 */
function auth0_docs_hook_auth0_settings_fields( $options, $id ) {
	switch ( $id ) {
		case 'basic':
			$options[] = array(
				'name'     => __( 'A Custom Basic Setting' ),
				'opt'      => 'custom_basic_opt_name',
				'id'       => 'wpa0_custom_basic_opt_name',
				'function' => 'auth0_docs_render_custom_basic_opt_name',
			);
			break;
		case 'features':
			break;
		case 'appearance':
			break;
		case 'advanced':
			break;
	}
	return $options;
}
add_filter( 'auth0_settings_fields', 'auth0_docs_hook_auth0_settings_fields', 10, 2 );

/**
 * Callback for add_settings_field
 *
 * @param array $args - 'label_for' = id attr, 'opt_name' = option name
 *
 * @see auth0_docs_hook_auth0_settings_fields()
 */
function auth0_docs_render_custom_basic_opt_name( $args ) {
	$options = WP_Auth0_Options::Instance();
	printf(
		'<input type="text" name="%s[%s]" id="%s" value="%s">',
		esc_attr( $options->get_options_name() ),
		esc_attr( $args['opt_name'] ),
		esc_attr( $args['label_for'] ),
		esc_attr( $options->get( $args['opt_name'] ) )
	);
}
```

### auth0_auth_scope

This filter allows developers to add or change the scope requested during login. This can be used to add [custom claims](/api-auth/tutorials/adoption/scope-custom-claims#custom-claims) or request a Refresh Token.

```php
/**
 * Add or modify requested Access Token scopes during login.
 *
 * @param array $scopes - current array of scopes to add/delete/modify
 *
 * @return array
 */
function auth0_docs_hook_auth0_auth_scope( $scopes ) {
	// Add offline_access to include a Refresh Token.
	// See auth0_docs_hook_auth0_user_login() for how this token can be used.
	$scopes[] = 'offline_access';
	return $scopes;
}
add_filter( 'auth0_auth_scope', 'auth0_docs_hook_auth0_auth_scope' );
```

### auth0_nonce_cookie_name

Use this filter to modify the cookie name used for nonce validation. See the `auth0_state_cookie_name` filter below for an example.

### auth0_state_cookie_name

Use this filter to modify the cookie name used for the [state](/protocols/oauth2/oauth-state) parameter value. This can add a prefix or suffix or replace the string entirely. Make sure to use valid characters in any modifications made:

> A `<cookie-name>` can be any US-ASCII characters except control characters (CTLs), spaces, or tabs. It also must not contain a separator character like the following: ( ) < > @ , ; : \ " /  [ ] ? = { }.

Read more about the `Set-Cookie` HTTP response header at the [MDN's Set-Cookie documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).

```php
/**
 * Prefix state and nonce cookie names.
 *
 * @param string $cookie_name - Cookie name to modify.
 *
 * @return string
 */
function auth0_docs_hook_prefix_cookie_name( $cookie_name ) {
	return 'prefix_' . $cookie_name;
}
add_filter( 'auth0_state_cookie_name', 'auth0_docs_hook_prefix_cookie_name' );
add_filter( 'auth0_nonce_cookie_name', 'auth0_docs_hook_prefix_cookie_name' );
```

### auth0_settings_constant_prefix

Use this filter to change the prefix for the constant used to override plugin settings. Please note that this filter **must** run before `WP_Auth0::init()` so it should be located in an [MU plugin](https://codex.wordpress.org/Must_Use_Plugins).

```php
/**
 * Prefix used for constant-based options.
 *
 * @param string $prefix - Constant prefix to modify or replace.
 *
 * @return string
 */
function auth0_docs_hook_settings_constant_prefix( $prefix ) {
	// Replace the prefix with something else.
	// return 'AUTH_ENV_';

	// Prefix the prefix.
	return 'PREFIX_' . $prefix;
}
add_filter( 'auth0_settings_constant_prefix', 'auth0_docs_hook_settings_constant_prefix' );
```

### auth0_authorize_url_params

This filter allows developers to adjust the `/authorize` endpoint parameters as needed. The function must return a dictionary-type array of URL parameters. See the [Login section of the Authentication API docs](/api/authentication#login) for more information on how these parameters are used.

```php
/**
 * Adjust the authorize URL parameters used for auto-login and universal login page.
 *
 * @param array $params - Existing URL parameters.
 * @param string $connection - Connection for auto-login, optional.
 * @param string $redirect_to - URL to redirect to after logging in.
 *
 * @return mixed
 */
function auth0_docs_hook_authorize_url_params( $params, $connection, $redirect_to ) {
	if ( 'twitter' === $connection ) {
		$params[ 'param1' ] = 'value1';
	}

	if ( FALSE !== strpos( 'twitter', $redirect_to ) ) {
		$params[ 'param2' ] = 'value2';
	}

	return $params;
}
add_filter( 'auth0_authorize_url_params', 'auth0_docs_hook_authorize_url_params', 10, 3 );
```

### auth0_authorize_url

This filter allows developers to adjust the complete `/authorize` URL before use. The function must return a valid URL as a string. See the [Login section of the Authentication API docs](/api/authentication#login) for more information on how this URL is used.

```php
/**
 * Adjust the authorize URL before redirecting.
 *
 * @param string $auth_url - Built authorize URL.
 * @param array $auth_params - Existing URL parameters.
 *
 * @return mixed
 */
function auth0_docs_hook_authorize_url( $auth_url, $auth_params ) {

	if ( 'twitter' === $auth_params['connection'] ) {
		$auth_url .= '&param1=value1';
	}

	if ( ! empty( $auth_params['display'] ) ) {
		$auth_url .= '&param2=value2';
	}

	$auth_url .= '&param3=value3';
	return $auth_url;
}
add_filter( 'auth0_authorize_url', 'auth0_docs_hook_authorize_url', 10, 2 );
```

### auth0_die_on_login_output

This filter lets you modify or replace the HTML content passed to `wp_die()` when there is an error during login. This filter does not affect the verify email content (see [auth0_verify_email_page](#auth0_verify_email_page)).

```php
/**
 * Filter the output of the wp_die() screen when the login callback fails.
 *
 * @see \WP_Auth0_LoginManager::die_on_login()
 *
 * @param string $html - Original HTML; modify and return or return something different.
 * @param string $msg - Error message.
 * @param string|integer $code - Error code.
 * @param boolean $login_link - True to link to login, false to link to logout.
 *
 * @return string
 */
function auth0_docs_hook_die_on_login_output( $html, $msg, $code, $login_link ) {
	return sprintf(
		'Original: <code style="display: block; background: #f1f1f1; padding: 1em; margin: 1em 0">%s</code>
		<strong>Message: </strong> %s<br><strong>Code: </strong> %s<br><strong>Link: </strong> <code>%s</code><br>',
		esc_html( $html ),
		sanitize_text_field( $msg ),
		sanitize_text_field( $code ),
		$login_link ? 'TRUE' : 'FALSE'
	);
}
add_filter( 'auth0_die_on_login_output', 'auth0_docs_hook_die_on_login_output', 10, 4 );
```

### auth0_sso_auth0js_url

This filter lets you override the default CDN URL for Auth0.js when doing an SSO check on the `wp-login.php` page.

### auth0_coo_auth0js_url

This filter lets you override the default CDN URL for Auth0.js when loading the COO fallback page.

## Additional Extensions

Additional examples can be found [here](https://github.com/joshcanhelp/auth0-wp-test/blob/master/inc/hooks-other.php).

## Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Install the plugin](/cms/wordpress/installation)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Troubleshooting](/cms/wordpress/troubleshoot)
:::
