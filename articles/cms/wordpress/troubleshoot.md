# WordPress Troubleshooting

### My configuration is wrong and I can't authenticate using Auth0. Is there another way to access the plugin?

The plugin can be accessed using valid WordPress credentials through the regular WordPress login by adding `?wle` to the login url. For example: `http://yourdomain.com/wp-login.php?wle`.

### I am having problems when a user logs in. Where can I find a log of what is happening?

The plugin provides an error log where you can check what has happened. Access it through the **Error Log** sub-item of the **Auth0** plugin menu.

### When using a plugin to force the login, the user is not logged in.

Be sure to **whitelist** the Auth0 `callback_url`.

### How can I redirect the users to a certain URL after login?

#### On the login page

This plugin leverages WordPress features to work seamless with default settings. To add a redirect, you can append the `redirect_to` query parameter to the URL when you direct the user to the login page. The plugin will redirect the user to this URL after a successful login.

You can also use the **Login redirection URL** setting in the Auth0 plugin settings page. This will URL be used to redirect the user when the `redirect_to` parameter is not provided.

#### Using the widget

The widget does not provide a specific setting for redirection but you can use the `extra_conf` setting. This field allows you to set a JSON that will be sent to Lock. In this case, the JSON needs to look like this:

```txt
{
	"state":"{\"redirect_to\":\"http://...\"}"
} 
```

**NOTE:** The state attribute expects to receive a string, so you need to escape the quotes.

#### Using the shortcode

As with the widget, the way to set the redirection URL in the shortcode is by using the `extra_conf` setting. In this case like this:

```txt
[auth0 extra_conf="{ \"state\" : \"{\\\"redirect_to\\\":\\\"http://...\\\"}\" }" ]
``` 

**NOTE:** You must double escape the state value, since the JSON is now enclosed in the shortcode quotes.

### How can I migrate my WordPress users to Auth0?

The current version of the plugin does not provide a way to automatically migrate users to Auth0, but you have a few options:

- Export your user data to a JSON file and upload it for batch-import into Auth0. Initially, your users will have to reset their passwords when logging in using Auth0 because there is no way for Auth0 to decrypt the WordPress passwords during migration. To generate the JSON file, follow the instructions at [Mass-importing users to Auth0](/bulk-import). Then you will need to upload the file using the [Import users](/api/v2#!/Jobs/post_users_imports) endpoint.

- Use the [WordPress XML RPC](https://codex.wordpress.org/XML-RPC_Support) endpoint and set up the migration flow using a custom db connection (as decribed in [Import users to Auth0](/connections/database/migrating)) with [this script](https://gist.github.com/glena/b31716e3c8fe48927be2).

- Implement the [beta version](https://github.com/auth0/wp-auth0/archive/dev.zip) of the plugin.


### Database migration does not work.

Your server needs to allow inbound connections from Auth0.

### The session expires too soon.

The Auth0 plugin does not handle sessions, it uses the WordPress settings. By default, user sessions are kept alive for 2 hours. You can change your WordPress settings to allow sessions to remain live for up to 14 hours.

To change your WordPress session settings, you must edit the `WP_Auth0.php` file (located in the plugin root directory). 

Add a second parameter to each `wp_set_auth_cookie` call with a value of `true`:

`wp_set_auth_cookie( $user_id, true );`

**NOTE:** You should find two instances of this call: at [line 573](https://github.com/auth0/wp-auth0/blob/master/WP_Auth0.php#L573) and [line 584](https://github.com/auth0/wp-auth0/blob/master/WP_Auth0.php#L584) of the `WP_Auth0.php` file. 

You can find more about this function at [wp_set_auth_cookie()](https://developer.wordpress.org/reference/functions/wp_set_auth_cookie/).

**NOTE:** The upcoming version of the plugin will provide a setting to handle session expiration.
