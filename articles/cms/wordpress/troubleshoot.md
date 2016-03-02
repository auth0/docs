# WordPress Troubleshooting

### The settings page shows me this warning `The current user is not authorized to manage the Auth0 account...`

If you upgraded your plugin to the v2 or configured the plugin without the initial setup wizard, you might missed to setup the api token used by the plugin to update your account settings. You can create a new one [here](https://auth0.com/docs/api/v2) and enter this in the basic settings section (check there which scopes are required). You can also ignore this, some operations will not be available (like enabling rules or updating your auth0 application to enable sso and you will need to do it manually in the [auth0 dashboard](https://manage.auth0.com)).

### My configuration is wrong and I can't authenticate using Auth0. Is there another way to access the plugin?

The plugin can be accessed using valid WordPress credentials through the regular WordPress login by adding `?wle` to the login url. For example: `http://yourdomain.com/wp-login.php?wle`.

### I am having problems when a user logs in. Where can I find a log of what is happening?

The plugin provides an error log where you can check what has happened. Access it through the **Error Log** sub-item of the **Auth0** plugin menu.

### How can I show the widget or shortcode in signup mode as default?

You can use the widget `Extra configuration` setting (or the `extra_conf` attribute in the shortcode) and add this json `{"mode":"signup" }` that will force the plugin to be shown in this mode.

### When using a plugin to force the login, the user is not logged in.

Be sure to **whitelist** the Auth0 `callback_url`.

#### The user is not logged in when using the `wp-force-login` plugin

This is because the callback url is not being whitelisted, try adding this to the `my_forcelogin_whitelist`filter: 

```php
function my_forcelogin_whitelist( $whitelist ) {

...

  if( $_GET['auth0'] == 1 ) {
    $whitelist[] = site_url($_SERVER['REQUEST_URI']);
  }

...

  return $whitelist;
}
add_filter('v_forcelogin_whitelist', 'my_forcelogin_whitelist', 10, 1);
```

### How can I redirect the users to a certain URL after login?

#### On the login page

This plugin leverages WordPress features to work seamless with default settings. To add a redirect, you can append the `redirect_to` query parameter to the URL when you direct the user to the login page. The plugin will redirect the user to this URL after a successful login.

You can also use the **Login redirection URL** setting in the Auth0 plugin settings page. This will URL be used to redirect the user when the `redirect_to` parameter is not provided.

#### Using the widget

The widget will automatically redirect to the same page where the user was before authentication. You can override this using the `Redirect after login:` setting.

#### Using the shortcode

The shortcode will automatically redirect to the same page where the user was before authentication. You can override this using the `redirect_to` attribute.

### How can I migrate my WordPress users to Auth0?

The current version of the plugin does not provide a way to automatically migrate users to Auth0, but you have a few options:

- The plugin exposes two endpoints to set up your custom db connection with import mode as decribed in [this doc](/connections/database/migrating). You can use the [plugin scripts](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_CustomDBLib.php) to set up your connection.

- Export your user data to a JSON file and upload it for batch-import into Auth0. Initially, your users will have to reset their passwords when logging in using Auth0 because there is no way for Auth0 to decrypt the WordPress passwords during migration. To generate the JSON file, follow the instructions at [Mass-importing users to Auth0](/bulk-import). Then you will need to upload the file using the [Import users](/api/v2#!/Jobs/post_users_imports) endpoint.

- Use the [WordPress XML RPC](https://codex.wordpress.org/XML-RPC_Support) endpoint and set up the migration flow using a custom db connection (as decribed in [Import users to Auth0](/connections/database/migrating)) with [this script](https://gist.github.com/glena/b31716e3c8fe48927be2).


### Database migration does not work.

Your server needs to allow inbound connections from Auth0.

### The session expires too soon.

The Auth0 plugin does not handle sessions, it uses the WordPress settings. By default, user sessions are kept alive for 2 hours. You enable the `Remember users session` setting to allow sessions to remain live for up to 14 hours.

> This plugins leverages WordPress session handling and uses [wp_set_auth_cookie()](https://developer.wordpress.org/reference/functions/wp_set_auth_cookie/) to create the session cookie. This setting will send a `true` as a second parameter to make the session last longer.
