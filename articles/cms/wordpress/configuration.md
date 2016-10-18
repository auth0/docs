---
description: How to configure WordPress as a client with Auth0.
---

# WordPress Configuration

To configure the *Auth0 for WordPress* plugin, you will need to copy the *Domain*, *Client Id* and *Client Secret* from the *Settings* page of your app in the Auth0 dashboard to the *Basic* settings page of the Auth0 plugin in WordPress.

### Create New App

You must first create an app in the Auth0 dashboard before you can configure the *Auth0 for WordPress* plugin. If you already have created the app you want to connect to WordPress, you can skip to the next section.

1. Log in to the [Auth0 dashboard](${manage_url}). (If you don't already have an Auth0 account, you can [create one](https://auth0.com).
2. Navigate to the *Clients* page and click **+ Create Client**.

  ![Listing of Auth0 Clients in the Management Dashboard](/media/articles/cms/wordpress/management-dashboard.png)

3. In the *Create Client* window, name your Client and select your Client type, and click **Save**.

  ![Creating the Client in the Management Dashboard](/media/articles/cms/wordpress/create-client.png)

### Get your *Domain*, *Client Id* and *Client Secret*

1. Go to the [Clients](${manage_url}/#/clients) of the Auth0 dashboard and select the app you want to connect to WordPress.

  ![Client Settings in the Management Dashboard](/media/articles/cms/wordpress/auth0-client-settings.png)

2. Leave this browser window open.

### Copy your *Domain*, *Client Id* and *Client Secret*

1. Log in as an administrator of your WordPress installation.
2. Click on **Plugins** in the left menu of the WordPress dashboard and select the **Settings** link associated with the Auth0 plugin.

  ![Navigating to Settings Page in WordPress](/media/articles/cms/wordpress/plugin-settings.png)

3. Copy the *Domain*, *Client Id* and *Client Secret* settings from the *Settings* page of your app in the Auth0 dashboard to the *Auth0 Settings > Basic* page of your WordPress account.

  ![Providing Auth0 Client Settings to WordPress](/media/articles/cms/wordpress/auth0-plugin-settings-page.png)

4. Click **Save Changes** at the bottom of the page.

## *Auth0 for WordPress* Plugin Settings

### Basic

* **Domain:** The app domain copied from the app settings in your dashboard.
* **Client Id:** The app client id copied from the app settings in your dashboard.
* **Client Secret:** The app client secret copied from the app settings in your dashboard.
* **Client token:** The token required to allow the plugin to communicate with Auth0 to update your account settings. If the token has been set, this field will display "Not Visible". If blank, no token has been provided and you will have to [generate a token](/api/v2) with the appropriate scopes listed here.
* **WordPress login enabled:** If enabled, displays a link on the login page to access the regular WordPress login.
* **Allow signup:** User signup will be available only if the WordPress *Anyone can register* option is enabled. You can find this setting under **Settings > General > Membership**.

### Features

* **Password Policy:** Select the level of complexity you want to enforce for user passwords. For more information on password policies, see [Password Strength in Auth0 Database Connections](/password-strength).
* **Single Sign On (SSO):** Enables SSO on your WordPress, allowing users to log in once and be automatically logged into any of your sites which use Auth0. For more information, see [What is SSO?](/sso).
* **Single Logout:** Enable this option for Single Logout. For more information, see [What is Single Log Out?](/sso/single-sign-on#what-is-single-log-out-).
* **Multifactor Authentication (MFA):** Enable this option for multifactor authentication with Google Authenticator. (See [Multifactor Authentication in Auth0](/multifactor-authentication) for more information.) You can enable other MFA providers on the [Auth0 dashboard](${manage_url}/#/multifactor).
* **FullContact integration:** Enable this option to fill your user profiles with the data provided by FullContact. A valid API key is required. For more information, see [Augment User Profile with FullContact](/scenarios/mixpanel-fullcontact-salesforce#2-augment-user-profile-with-fullcontact-).
* **Store geolocation:** Enable this option to store geolocation information based on the IP addresses saved in `user_metadata`.
* **Store zip-code income:** Enable this option to store income data based on the zip-code calculated from each user's IP address.

### Connections

Enable the supported social identity providers you want to allow users to login with. You can configure your own app keys and settings for these connections in the [Auth0 Dashboard](${manage_url}/#/connections/social).

### Appearance

* **Form Title:** Sets the title of the Lock widget.
* **Show big social buttons:** Toggles the social buttons size between big and small.
* **Icon URL:** Sets the Lock display icon.
* **Enable Gravatar integration:** When user enters their email, their associated gravatar picture is displayed in the Lock header.
* **Customize the Login Widget CSS:** A valid CSS that will be applied to the login page. For more information on customizing Lock, see [Can I customize the Login Widget?](https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget)
* **Username style:** Selecting **Email** will require users to enter their email address to login. Set this to *username* if you do not want to force a username to be a valid email address.
* **Remember last login:** Requests SSO data and enables the *Last time you signed in with[...]* option. For more information,  see [rememberLastLogin {Boolean}](/libraries/lock/customization#rememberlastlogin-boolean-).
* **Translation:** A valid JSON object representing the Lock's dict parameter. The 'dict' parameter can be a string matching any supported language ('en', 'es', 'it', etc...) or an object containing customized label text. If set, this will override the Title setting. For more info see [dict {String|Object}](/libraries/lock/customization#dict-string-object-).

### Advanced

* **Use passwordless login:** Enable this option to replace the login widget with Lock Passwordless.
* **Widget URL:** The URL of to the latest available widget in the CDN.
* **Connections:** List here each of the identity providers you want to allow users to login with. If left blank, all enabled providers will be allowed. (See [connections {Array}](/libraries/lock/customization#connections-array-) for more information.)
**NOTE:** If you have enabled Passwordless login, you must list here all allowed social identity providers. (See [.social(options, callback)](https://github.com/auth0/lock-passwordless#socialoptions-callback) for more information.)
* **Remember users session:** By default, user sessions live for two days. Enable this setting to keep user sessions live for 14 days.
* **Link users with same email:** This option enables the linking of accounts with the same verified e-mail address.
* **Twitter consumer key and consumer secret:** The credentials from your Twitter app. For instructions on creating an app on Twitter, see [Obtain Consumer and Secret Keys for Twitter](/connections/social/twitter).
* **Facebook app key and app secret:** The credentials from your Facebook app. For instructions on creating an app on Facebook, see [Obtain an App ID and App Secret for Facebook](/connections/social/facebook).
* **User Migration:** Enabling this option will expose the Auth0 migration web services. However, the connection will need to be manually configured in the [Auth0 dashboard](${manage_url}). For more information on the migration process, see [Import users to Auth0](/connections/database/migrating).
* **Migration IPs whitelist:** Only requests from listed IPs will be allowed access to the migration webservice.
* **Auth0 Implicit Flow:** If enabled, uses the [Implicit Flow](/protocols#oauth-for-native-clients-and-javascript-in-the-browser) protocol for authorization in cases where the server is without internet access or behind a firewall.
* **Login redirection URL:** If set, redirects users to the specified URL after login.
* **Requires verified email:** If set, requires the user to have a verified email to login.
* **Auto Login (no widget):** Skips the login page (a single login provider must be selected).
* **Enable on IP Ranges:** Select to enable the Auth0 plugin only for the IP ranges you specify in the **IP Ranges** textbox.
* **IP Ranges:** Enter one range per line. Range format should be: `xx.xx.xx.xx - yy.yy.yy.y`
* **Valid Proxy IP:** List the IP address of your proxy or load balancer to enable IP checks for logins and migration web services.
* **Extra settings:** A valid JSON object that includes options to call Lock with. This overrides all other options set above. For a list of available options, see [Lock: User configurable options](/libraries/lock/customization) (e.g.: `{"disableResetAction": true }`).
* **Anonymous data:** The plugin tracks anonymous usage data by default. Click to disable.
* **Enable JWT Auth integration:** This enables JWT Auth integration.

### Dashboard

Here you can customize the dashboard's display and segmentation of data.

## Integrate the Plugin

The plugin includes an `auth0_user_login` action to provide notification for each time a user logs in or is created in WordPress.

This action accepts five parameters:

1. $user_id (int): The id of the user logged in.
2. $user_profile (stdClass): The Auth0 profile of the user.
3. $is_new (boolean): If the user has created a new WordPress login, this is set to `true`, otherwise `false`. Not to be confused with Auth0 registration, this flag is `true` only if a new user is created in the WordPress database.
4. $id_token (string): The user's JWT.
5. $access_token (string): The user's access token.

  **Note:** An access token is not provided when using *Implicit Flow*.

To hook to this action, include the following code:

```js
// php
add_action( 'auth0_user_login', 'auth0UserLoginAction', 0,5 );

function auth0UserLoginAction($user_id, $user_profile, $is_new, $id_token, $access_token) {
    ...
}
```
