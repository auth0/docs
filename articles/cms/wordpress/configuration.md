#WordPress Configuration

### Set up your *Auth0 Domain*, *Client Id* and *Client Secret*

Copy the *Auth0 Domain*, *Client Id* and *Client Secret* settings from your app's *Application Settings* page on Auth0 to the *Auth0 Settings* page of your WordPress account.

#### Existing App
1. While logged in as an administrator of your WordPress installation, in the **Plugins** section of the dashboard, click *Settings* under *WordPress Auth0 Integration* to open the *Auth0 Settings* page.
So, go to your account and under the [Apps section](${uiURL}/#/applications) and access to the setting of the app you want to use (or create a new one). If you don't have an account, create one [here](https://auth0.com) and the create a new app.
3. From the *Application Settings* page on Auth0, copy the *Auth0 Domain*, *Client Id* and *Client Secret* to the *Auth0 Settings* page of the WordPress dashboard.

#### New App
1. While logged in as an administrator of your WordPress installation, in the **Plugins** section of the dashboard, click *Settings* under *WordPress Auth0 Integration* to open the *Auth0 Settings* page. (If you don't already have an Auth0 account, you can [create one](https://auth0.com).)
2. On the *Auth0 Settings* page, click *create an application*.
3. In the new browser window select *+ New App / API*.
4. On the *Apps / APIs* page, name the new app and click *Save*.
5. On the new app's *Quick Settings* page, click *Settings*.
6. From the *Application Settings* page on Auth0, copy the *Auth0 Domain*, *Client Id* and *Client Secret* to the *Auth0 Settings* page of the WordPress dashboard.
7. Click *Save Changes* at the bottom of the page.

 <img src="https://cdn.auth0.com/docs/cms/wordpress/wp-auth0-initial-config.gif" alt="WP Auth0 initial configuration">

## Settings

### Basic

- **Domain:** The app domain copied from the app settings in your dashboard.
- **Client Id:** The app client id copied from the app settings in your dashboard.
- **Client Secret:** The app client secret copied from the app settings in your dashboard.
- **WordPress login enabled:** Displays a link on the login page to access the regular WordPress login.

### Appearance

- **Form Title:** Sets the Lock title.
- **Show big social buttons:** Toggles the social buttons size between big and small.
- **Icon URL:** Sets the Lock icon.
- **Enable Gravatar integration:** When user enters their email, their associated gravatar picture is displayed in the Lock header.
- **Customize the Login Widget CSS:** A valid CSS applied to the login page. For more information on customizing Lock, see [Can I customize the Login Widget?](https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget)

### Advanced

- **Single Sign On (SSO):** Enables SSO on your WordPress, allowing users to log in once and be automatically logged into any of your sites which use Auth0.
- **Translation:** A valid JSON object representing the Lock's dict parameter. If set, will override the Title setting. For more info see [dict {String|Object}](/libraries/lock/customization#dict-string-object-).
- **Username style:** Set this to *username* if you don't wish to force a username to be a valid email.
- **Remember last login:** Requests SSO data and enables *Last time you signed in with[...]* message. For more info see [rememberLastLogin {Boolean}](/libraries/lock/customization#rememberlastlogin-boolean-).
- **Login redirection URL:** If set, forces redirection to the specified URL after the user logs in.
- **Requires verified email:** If set, requires the user to have a verified email to login.
- **Allow signup:** User signup will be available only if WordPress' *Anyone can register* setting is enabled. You can find this setting under *Settings > General > Membership, Anyone can register*.
- **Auto Login (no widget):** Skips the login page (a single login provider must be selected).
- **Extra settings:** A valid JSON object that includes options to call Lock with. This overrides all other options set above. For a list of available options, see [Lock: User configurable options](/libraries/lock/customization) (e.g.: `{"disableResetAction": true }`).
- **Widget URL:** The URL of to the latest available widget in the CDN.
- **Auth0 Implicit Flow:** If enabled, uses the [Implicit Flow](/protocols#oauth-for-native-clients-and-javascript-in-the-browser) protocol for authorization in cases where the server is without internet access or behind a firewall. If this setting is enabled with **SSO**, you must add `http://your-domain/wp-login.php` as a valid callback in your Auth0 app.
- **Customize the Login Widget with custom JS:** Allows you to add custom JS to Lock, which is useful for adding custom buttons to the Login Widget. See [Add custom buttons to Lock](/hrd#option-3-adding-custom-buttons-to-lock). The following code adds a *Fabrikam Azure AD* button to the widget:

```
lock.once('signin ready', function() {
    var link = $('<a class="a0-zocial a0-waad" href="#">' +
        '<span>Login with Fabrikam Azure AD</span></a>');
    link.on('click', function () {
        lock.getClient().login({
            connection: 'fabrikamdirectory.onmicrosoft.com' });
    });

    var iconList = $(this.$container).find('.a0-iconlist');
    iconList.append(link);
});
```

**Note:** The variable `lock` refers to an instance of the Login Widget.

## Integrate the plugin

The plugin provides the `auth0_user_login` action to get notified each time a user logs in or is created in WordPress. This action accepts five parameters:
1. $user_id (int): The id of the user logged in.
2. $user_profile (stdClass): The Auth0 profile of the user.
3. $is_new (boolean): If the user has created a new WordPress login, this is set to `true`, otherwise `false`. Not to be confused with Auth0 registration, this flag is `true` only if a new user is created in the WordPress database.
4. $id_token (string): The user's JWT.
5. $access_token (string): The user's access token. **Note:** An access token is not provided when using **Implicit Flow**.

To hook to this action, include the following code:
```
    add_action( 'auth0_user_login', 'auth0UserLoginAction', 0,5 );

    function auth0UserLoginAction($user_id, $user_profile, $is_new, $id_token, $access_token) {
        ...
    }
```
