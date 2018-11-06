---
description: This page explains common troubleshooting issues with the Login by Auth0 WordPress plugin.
toc: true
topics:
    - wordpress
    - cms
contentType: reference
useCase:
  - add-login
  - build-an-app
  - customize-connections
  - secure-an-api
  - manage-users  
---

# WordPress Troubleshooting

In this page, we have collected some of the common troubleshooting questions we encounter. If the questions below do not solve your issue, then consider the following alternatives:

* If you're setting up the plugin for the first time or having issues with users logging in, please review the [configuration](/cms/wordpress/configuration) page in this section.
* If you found a bug in the plugin code [submit an issue](https://github.com/auth0/wp-auth0/issues) or [create a pull request](https://github.com/auth0/wp-auth0/pulls) on GitHub.
* If you have questions about how to use Auth0 or the plugin, please [post on our community site](https://community.auth0.com/) or create a [support forum request here](https://wordpress.org/support/plugin/auth0).
* You can also see additional documentation and answers on our [support site](https://support.auth0.com/). Customers on a paid Auth0 plan can [submit a trouble ticket](https://support.auth0.com/tickets) for a fast response.

### I'm seeing the error message "Invalid state" that prevents me from logging in

State validation is a security feature added in [version 3.6.0](https://github.com/auth0/wp-auth0/releases/tag/3.6.0). This error message is usually caused by a cached callback URL (see your Application settings for the callback URLs that should not be cached). If this is not the issue or you need more information, please see our detailed [troubleshooting guide](/cms/wordpress/invalid-state). 

### I'm seeing the error message "Invalid ID token" or "Expired ID token" that prevents me from logging in

This is typically caused by a server set to an incorrect time. If the error message includes "used too early," then your server time is set in the future. If it says that the token is expired, then the server time is set too far in the past. Check what `echo current_time( 'c' )` outputs on your server for a clue as to what time is being used.

### I'm seeing the error message "This account does not have an email associated..." that prevents me from logging in

If you get this error, make sure you are requesting an email from each provider in the Auth0 Dashboard under Connections -> Social (expand each provider). Take into account that not all providers return email addresses for users (e.g. Twitter). If this happens, you can always add an Email address to any logged in user through the Auth0 Dashboard (or API). See Users -> Edit.

### I'm seeing the error message "Failed cross origin authentication" or "No verifier returned from client" in my browser's console logs when trying to log in

Check your "Allowed Callback URLs" and "Allowed Origins (CORS)" fields in the [Application](${manage_url}/#/applications) settings for your WordPress site to make sure those are correct. If you're using a Chromium-based browser, review our [docs page on cross-origin authentication](/cross-origin-authentication#limitations-of-cross-origin-authentication) to make sure you don't have third-party cookies turned off.  

### How do I setup Passwordless login?

Passwordless login is possible any Auth0-enabled website using email or SMS. To make this work on your WordPress site:

1. Turn on "Passwordless Login" from the plugin settings' **Features** tab and save
2. In your Auth0 dashboard, go to **[Connections > Passwordless](${manage_url}/#/connections/passwordless)**
  - To use email, turn on the **Email** connection and modify the settings, if desired. This will turn on email code login (users are emailed a code which is then typed into the login form on your site).
  - To use a "magic link" (emailed link will automatically log users in), add `{passwordlessMethod: 'code'}` to the "Extra Settings" field in the plugin settings' **Advanced** tab.
  - To use SMS login, turn on the **SMS** connection and follow the steps to setup a Twilio developer account (this will require a paid Twilio account depending on usage).

The Auth0 login form will select a Passwordless method depending on which connection is activated above. If you have both connections active, it will default to email. In this case, either turn off the email connection to show SMS or add `sms` to the **Connections** field in the plugin settings' **Advanced** tab.

### I have two accounts for the same user in WordPress

Under some situations, you may end up with a user with two accounts. WordPress allows you to merge users by deleting one of the accounts and attributing that account's content to another user. Go to wp-admin > Users, select the account you want to delete, and in the confirmation dialog select another user to transfer the content.

### My configuration is wrong and I can't authenticate using Auth0. Is there another way to access the plugin?

The plugin can be accessed using valid WordPress credentials through the regular WordPress login by adding `?wle` to the login url. For example: `http://yourdomain.com/wp-login.php?wle`.

### I am having problems when a user logs in. Where can I find a log of what is happening?

The plugin provides an error log where you can check what has happened. Access it through the **Error Log** sub-item of the **Auth0** plugin menu. The [logs](${manage_url}/#/logs) in your Auth0 dashboard can also provide additional information.

### How can I show the widget or shortcode in signup mode as default?

You can use the widget `Extra configuration` setting (or the `extra_conf` attribute in the shortcode) and add this json `{"mode":"signup" }` that will force the plugin to be shown in this mode.

### When using a plugin to force the login, the user is not logged in

This is typically caused by a cached page after login. Check with your host for strategies to mitigate this or try adding a cache-busting parameter to the URL ([see this Gist for instructions](https://gist.github.com/joshcanhelp/e3eb693749f0fe66aad097c3bbb3b415)).

#### The user is not logged in when using the "Force Login" plugin

This is because the callback URL has not been whitelisted. Try adding this code to the `my_forcelogin_whitelist` filter:

```php
function wp_auth0_forcelogin_whitelist( $whitelist ) {
  if ( ! empty( $_GET['auth0'] ) ) {
    $whitelist[] = site_url($_SERVER['REQUEST_URI']);
  }
  return $whitelist;
}
add_filter('v_forcelogin_whitelist', 'wp_auth0_forcelogin_whitelist', 10, 1);
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

- The plugin exposes two endpoints to mark your custom database connection for **import to Auth0** mode as described in [Import users to Auth0](/connections/database/migrating). You can use these [plugin scripts](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_CustomDBLib.php) to setup your connection.

- Export your user data to a JSON file and upload it for batch-import into Auth0. Initially, your users will have to reset their passwords when logging in using Auth0 because there is no way for Auth0 to decrypt the WordPress passwords during migration. To generate the JSON file, follow the instructions at [Mass-importing users to Auth0](/bulk-import). Then you will need to upload the file using the [Import users](/api/v2#!/Jobs/post_users_imports) endpoint.

- Use the [WordPress XML RPC](https://codex.wordpress.org/XML-RPC_Support) endpoint to setup the migration flow using a custom database connection as described in [Import users to Auth0](/connections/database/migrating) with [this script](https://gist.github.com/glena/b31716e3c8fe48927be2).

### The form_title setting is ignored when I set up the dict setting

Internally, the plugin uses the dict setting to change the Auth0 widget title. When you set up the dict field it overrides the form_title one.

To change the form_title in this case, you need to add the following attribute to the dict json:

```json
{
    "signin": {
        "title": "The desired form title"
    }
}
```

### How can I configure Lock settings that are not provided in the settings page?

There is a field called "Extra settings" that allows you to add a json object with all the settings you want to configure. Please note that all the "Extra settings" that we allow to set up in the plugin settings page will be overridden.

### Database migration does not work

Your server needs to allow inbound connections from Auth0.

### The session expires too soon

The Auth0 plugin does not handle sessions, it uses the WordPress settings. By default, user sessions are kept alive for 2 days. You can enable the `Remember users session` setting on the plugin settings' **Advanced** tab to allow sessions to remain live for up to 14 hours.

### How do I implement a refresh token?

We implemented additional parameters in the login methods used by the plugin to allow for refresh tokens. Use the [`auth0_auth_scope`](/cms/wordpress/extending#auth0_auth_scope) filter combined with the [`auth0_user_login`](/cms/wordpress/extending#auth0_user_login) action to accomplish this.

### Profile data saved in WordPress is not being synced to the Auth0 user account.

This is a current limitation of the plugin but something we're looking at in a future release. The one exception to this is the user password. If the password is changed in WordPress and it passes the security policy set for the database connection being used then that password will update for the Auth0 user as well. We'll be adding an error message in a future release to stop the process if the password is not strong enough.

### Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Install the plugin](/cms/wordpress/installation)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Extend the plugin](/cms/wordpress/extending)
:::
