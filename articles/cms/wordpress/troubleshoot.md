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
# Troubleshoot WordPress Plugin

Here are some common troubleshooting questions. If the items below do not solve your issue, then consider the following alternatives:

* If you're setting up the plugin for the first time or having problems with users logging in, please review the [configuration](/cms/wordpress/configuration) page in this section.
* If you found a bug in the plugin code [submit an issue](https://github.com/auth0/wp-auth0/issues) or [create a pull request](https://github.com/auth0/wp-auth0/pulls) on GitHub.
* If you have questions about how to use Auth0 or the plugin, please [post on our community site](https://community.auth0.com/) or create a [support forum request here](https://wordpress.org/support/plugin/auth0).
* You can also see additional documentation and answers on our [support site](https://support.auth0.com/). Customers on a paid Auth0 plan can [submit a trouble ticket](https://support.auth0.com/tickets) for a fast response.

## I'm seeing the error message "Invalid state" that prevents me from logging in

State validation is a security feature added in [version 3.6.0](https://github.com/auth0/wp-auth0/releases/tag/3.6.0). A cached callback URL usually causes this error message (see your Application settings for the callback URLs that should not be cached). If this is not the issue or you need more information, please see [Troubleshoot WordPress Plugin Invalid State Errors](/cms/wordpress/invalid-state).

## I'm having an issue logging in or changing email/password using a custom database

[Please see our specific troubleshooting page](/cms/wordpress/user-migration#troubleshooting).

## I'm seeing the error message "Invalid ID token" or "Expired ID token" that prevents me from logging in

This is typically caused by a server set to an incorrect time. If the error message includes "used too early," then your server time is set in the future. If it says that the token is expired, then the server time is set too far in the past. A difference in time between two servers is common. Output `echo date(DateTime::ISO8601)` in PHP on your server and compare that, including seconds, to the current UTC time. If your server's time is more than 30 seconds off from UTC time, then you’ll need to set a longer leeway to account for your server’s clock skew. You can paste the below code in your theme's `functions.php` or anywhere else that would run it after the plugin loads and before the login hook runs:

```
if ( class_exists( 'JWT' ) ) { \JWT::$leeway = 60; }
```

This would provide a 60 second leeway. You may need to adjust this depending upon how skewed your server's time is.

## I see the error message "This account does not have an email associated..." that prevents me from logging in

If you get this error, make sure you are requesting an email from each provider in the Auth0 Dashboard under Connections -> Social (expand each provider). Take into account that not all providers return email addresses for users (e.g., Twitter). If this happens, you can always add an Email address to any logged in user through the Auth0 Dashboard (or API). See Users -> Edit.

For Connections that don't provide an `email_verified` flag (some Enterprise connections will not include this) *or* to skip this validation for specific Social Connections, add the strategy for that Connection in the "Skip Strategies" field. This field is located below the **Require Verified Email** switch accessible via **wp-admin** > **Auth0** > **Settings** > **Advanced**.

**This field should only be used if necessary because it circumvents the security precautions recommended Auth0.**

## I see the error message "There is a user with the same email" that prevents me from logging in

This means that there is a user in WordPress that has the same email as the one being used to login associated with a different Auth0 user. If you're in the process of testing the plugin or want to associate the existing user with the new Auth user instead:

1. Log in as an admin
1. Go to wp-admin > Users and search for the email being used
1. View the user's profile and scroll down to the bottom
1. Click **Delete Auth0 Data** and confirm

## I see the error message "Failed cross origin authentication" or "No verifier returned from client" in my browser's console logs when trying to log in

Check your "Allowed Callback URLs" and "Allowed Origins (CORS)" fields in the [Application](${manage_url}/#/applications) settings for your WordPress site to make sure those are correct. If you're using a Chromium-based browser, see [Cross-Origin Authentication](/cross-origin-authentication#limitations) to make sure you don't have third-party cookies turned off.  

## I need to rerun the Setup Wizard, but I don't see that menu option anymore.

This means that the plugin is already configured with a Domain, Client ID, and Client Secret. Running the Setup Wizard a second time can have unpredictable results. If you're setting up WordPress for the first time and want to start over before any logins have occurred:

1. Go to **wp-admin** > **Auth0** > **Settings** > **Basic**.
1. Delete the Domain and Client ID. Scroll down and click **Save Changes**.
1. Go to [Auth0 Dashboard > Applications](${manage_url}/#/applications)
1. Find the Application that was created by WordPress (its name should be the site name of your WordPress site)
1. Click on the Application to view its settings. Scroll to the bottom of the screen and click the **Delete Application** button.
1. Go to the [Auth0 Dashboard > Connections > Database](${manage_url}/#/connections/database)
1. Find the Connection that was created by WordPress (its name should be the site name of your WordPress site prepended with "DB-")
1. Click on the Connection to view the settings. Scroll down to the bottom, and click **I Want To Delete This Connection*. ***Please note that this will delete the Connection and all users that were created within.***
1. Return to WordPress. You will now see the Setup Wizard option under Auth0 in the admin menu.

## I see an error about file types when trying to upload an exported settings file.

If you're uploading a settings JSON file and you see an error message "Sorry, this file type is not permitted for security reasons," this is caused by the JSON file type being blocked by WordPress. You can add `json` as an allowed type using the [`upload_mimes`](https://developer.wordpress.org/reference/hooks/upload_mimes/) filter in a custom plugin or you can click the **paste the entire json** link and paste the contents instead.

## How do I setup Passwordless login?

<dfn data-key="passwordless">Passwordless</dfn> login is possible any Auth0-enabled website using email or SMS. To make this work on your WordPress site:

1. Turn on "Passwordless Login" from the plugin settings' **Features** tab and save
2. In your Auth0 dashboard, go to **[Connections > Passwordless](${manage_url}/#/connections/passwordless)**
  - To use email, turn on the **Email** connection and modify the settings if desired. This will turn on email code login (users are emailed a code which is then typed into the login form on your site).
  - To use a "magic link" (emailed link will automatically log users in), add `{passwordlessMethod: 'code'}` to the "Extra Settings" field in the plugin settings' **Advanced** tab.
  - To use SMS login, turn on the **SMS** connection and follow the steps to set up a Twilio developer account (this will require a paid Twilio account depending on usage).

The Auth0 login form will select a Passwordless method depending on which connection is activated above. If you have both connections active, it will default to email. In this case, either turn off the email connection to show SMS or add `sms` to the **Connections** field in the plugin settings' **Advanced** tab.

## I have two accounts for the same user in WordPress

Under some situations, you may end up with a user with two accounts. WordPress allows you to merge users by deleting one of the accounts and attributing that account's content to another user. Go to wp-admin > Users, select the account you want to remove, and in the confirmation dialog select another user to transfer the content.

## My configuration is wrong, and I can't authenticate using Auth0. Is there another way to access the plugin?

The plugin can be accessed using valid WordPress credentials through the regular WordPress login by adding `?wle` to the login URL. For example: `http://yourdomain.com/wp-login.php?wle`.

## I am having problems when a user logs in. Where can I find a log of what is happening?

The plugin provides an error log where you can check what has happened. Access it through the **Error Log** sub-item of the **Auth0** plugin menu. The [logs](${manage_url}/#/logs) in your Auth0 dashboard can also provide additional information.

## How can I show the widget or shortcode in signup mode by default?

You can use the widget `Extra configuration` setting (or the `extra_conf` attribute in the shortcode) and add this JSON `{"mode":"signup" }` that will force the plugin to be shown in this mode.

## When using a plugin to force the login, the user is not logged in

This is typically caused by a cached page after login. Check with your host for strategies to mitigate this or try adding a cache-busting parameter to the URL ([see this Gist for instructions](https://gist.github.com/joshcanhelp/e3eb693749f0fe66aad097c3bbb3b415)).

### The user is not logged in when using the "Force Login" plugin

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

## How can I redirect the users to a specific URL after login?

### On the login page

This plugin leverages WordPress features to work seamlessly with default settings. To add a redirect, you can append the `redirect_to` query parameter to the URL when you direct the user to the login page. The plugin will redirect the user to this URL after a successful login.

You can also use the **Login redirection URL** setting in the Auth0 plugin settings page. This will URL be used to redirect the user when the `redirect_to` parameter is not provided.

### Using the widget

The widget will automatically redirect to the same page where the user was before authentication. You can override this using the `Redirect after login:` setting.

### Using the shortcode

The shortcode will automatically redirect to the same page where the user was before authentication. You can override this using the `redirect_to` attribute.

## How can I migrate my WordPress users to Auth0?

The current version of the plugin does not provide a way to migrate users to Auth0 automatically, but you have a few options:

- The plugin exposes two endpoints to mark your custom database connection for **import to Auth0** mode as described in [Import users to Auth0](/connections/database/migrating). You can use these [plugin scripts](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_CustomDBLib.php) to set up your connection.

- Export your user data to a JSON file and upload it for batch-import into Auth0. Initially, your users will have to reset their passwords when logging in using Auth0 because there is no way for Auth0 to decrypt the WordPress passwords during migration. To generate the JSON file, follow the instructions at [Mass-importing users to Auth0](/bulk-import). Then you will need to upload the file using the [Import users](/api/v2#!/Jobs/post_users_imports) endpoint.

- Use the [WordPress XML RPC](https://codex.wordpress.org/XML-RPC_Support) endpoint to setup the migration flow using a custom database connection as described in [Import users to Auth0](/connections/database/migrating) with [this script](https://gist.github.com/glena/b31716e3c8fe48927be2).

## The form_title setting is ignored when I set up the dict setting

Internally, the plugin uses the dict setting to change the Auth0 widget title. When you set up the dict field, it overrides the form_title one.

To change the form_title in this case, you need to add the following attribute to the dict JSON:

```json
{
    "signin": {
        "title": "The desired form title"
    }
}
```

## How can I modify the embedded Auth0 login form?

There are many options on the **Appearance** tab of the plugin settings page that can change the look and feel of the login form that is embedded on your site (`wp-login/php` page, shortcodes, or widgets). These options are covered on the [Configuration page](/cms/wordpress/configuration#appearance). This will not affect the the login form on the Auth0-hosted Universal Login Page.

There is also a field called "Extra Settings" on the **Advanced** tab that accepts a valid JSON object with all the settings you want to configure. This will override any changes made on the **Appearance** tab. For all the possible configuration options, please see our [documentation](/libraries/lock/v11/configuration).

To use custom styling or JavaScript with the embedded Auth0 login form, please see our [documentation here](https://auth0.com/docs/libraries/lock/v11/ui-customization#overriding-css). External style sheets and JS files should be loaded in your theme using the [`wp_enqueue_scripts`](https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/) hook for shortcodes/widgets and the [`login_enqueue_scripts`](https://developer.wordpress.org/reference/hooks/login_enqueue_scripts/) hook for `wp-login.php`.

## The session expires too soon

The Auth0 plugin does not handle sessions; it uses the WordPress settings. By default, user sessions are kept alive for two days. You can enable the `Remember users session` setting on the plugin settings' **Advanced** tab to allow sessions to remain live for up to 14 hours.

## How do I implement a Refresh Token?

We implemented additional parameters in the login methods used by the plugin to allow for <dfn data-key="refresh-token">Refresh Tokens</dfn>. Use the [`auth0_auth_scope`](/cms/wordpress/extending#auth0_auth_scope) filter combined with the [`auth0_user_login`](/cms/wordpress/extending#auth0_user_login) action to accomplish this.

## Profile data saved in WordPress is not being synced to the Auth0 user account.

This is a current limitation of the plugin but something we're looking at in a future release. The one exception to this is the user password. If the password is changed in WordPress and it passes the security policy set for the database connection being used, then that password will update for the Auth0 user as well. We'll be adding an error message in a future release to stop the process if the password is not strong enough.

## How do I migrate from "Social Login with Auth0" to "Login by Auth0"?

Historically, Auth0 has maintained two WordPress plugins:

- [Login by Auth0](https://wordpress.org/plugins/auth0/)
- [Social Login with Auth0](https://wordpress.org/plugins/social-login-with-auth0/)

These two plugins are effectively the same, but **Social Login with Auth** will not receive any updates past version 3.7.0 (released 13 August 2018). Migrating from **Social Login with Auth** to **Login by Auth0** is simple and won't result in any Auth0 or WordPress data loss.

::: note
Moving from **Social Login with Auth** to **Login by Auth0** will update the version number you see, so make sure to test this change out on a staging or development server first (just as you would if you were updating the plugin in wp-admin). Furthermore, logins may not work during the migration process, so be sure to use a maintenance mode plugin or complete the migration during off-peak hours.
:::

The easiest way to migrate is via (S)FTP:

1. Log in to the WordPress site as an administrator.
1. [Download Login by Auth0](https://downloads.wordpress.org/plugin/auth0.zip) and unzip it locally.
1. Deactivate the **Social Login with Auth0** plugin from the WordPress admin > Plugins screen.
1. Log in to the server you want to migrate to and navigate to `wp-content/plugins`.
1. Move the `social-login-with-auth0` folder out of the plugins folder to back up the contents.
1. Upload the new `auth0` plugin folder to the plugins directory.
1. Activate the new "Login by Auth0" plugin from the WordPress **Admin** > **Plugins** screen.

If you're unable to access the site via FTP, you can also run the process directly from the WordPress admin:

1. Log in to the WordPress site as an administrator.
1. Go to **Auth0** > **Import-Export Settings**.
1. Click **Export Settings**, then **Export**.
1. Deactivate the **Social Login with Auth0** plugin from the WordPress **Admin** > **Plugins** screen.
1. Delete the **Social Login with Auth0** plugin and confirm.
1. Go to **Plugins** > **Add New** and search for "Auth0".
1. For the **Login by Auth0** plugin (make sure to check the name), click **Install Now**.
1. When this completes, click **Activate**.
1. Check **Auth0** > **Settings** and make sure the previous settings remain. If not:
    1. Go to **Auth0** > **Import-Export Settings**.
    1. Click **Choose File**, select the previously-exported JSON file, and click **Import**.
1. Completely delete the settings file export JSON (it contains sensitive information).

Everything should now be working as expected with the new plugin and updates will resume as usual.

## Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Install the plugin](/cms/wordpress/installation)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Extend the plugin](/cms/wordpress/extending)
:::
