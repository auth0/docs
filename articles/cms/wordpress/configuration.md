#WordPress Configuration

The first thing you will need to do, is to set up your *Auth0 Domain*, *Client Id* and *Client Secret*.

So, go to your account and under the [Apps section](@@uiURL@@/#/applications) and access to the setting of the app you want to use (or create a new one). If you don't have an account, create one [here](https://auth0.com) and the create a new app.

Then copy the *Auth0 Domain*, *Client Id* and *Client Secret* to the plugin settings.

<img src="https://cdn.auth0.com/docs/cms/wordpress/wp-auth0-initial-config.gif" alt="WP Auth0 initial configuration">


## Settings

### Basic

- **Domain:** the app domain. You can get it from your app settings in your dashboard.
- **Client Id:** the app client id. You can get it from your app settings in your dashboard.
- **Client Secret:** the app client secret. You can get it from your app settings in your dashboard.
- **WordPress login enabled:** will enable a link on the login page to access the regular WordPress login.

### Appearance

- **Form Title:** will change the Lock title
- **Show big social buttons:** will toggle the social buttons format between big and small buttons
- **Icon URL:** will change the Lock title
- **Enable Gravatar integration:** when user types their email, their associated gravatar picture is displayed in the Lock header.
- **Customize the Login Widget CSS:** should be a valid CSS that will be injected in the login page. For more info customizing Lock [click here] (https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget)

### Advanced

- **Single Sign On (SSO):** this will enable SSO on your WordPress, allowing users login one time and automatically being loged in to any of your sites using Auth0.
- **Translation:** this represents the Lock's dict parameter, should be a valid JSON object. When this setting is in use, will override the Title setting. For more info [click here] (/libraries/lock/customization#dict-stringobject).
- **Username style:** If you don't want to force the username to be a valid email, you can set this setting to username.
- **Remember last login:** Request for SSO data and enable Last time you signed in with[...] message. For more info [click here](/libraries/lock/customization#rememberlastlogin-boolean).
- **Login redirection URL:** use this setting if you want to force the redirection after the user logs in.
- **Requires verified email:** Mark this if you require the user to have a verified email to login.
- **Allow signup:** The user signup will be enabled only it it enabled the WordPress' *Anyone can register* setting. You can manage this setting on *Settings > General > Membership, Anyone can register*.
- **Auto Login (no widget):** Mark this to avoid the login page (you will have to select a single login provider).
- **Extra settings:** This field is the JSon that describes the options to call Lock with. It'll override any other option set here. See all the posible options [here](/libraries/lock/customization). (IE: `{"disableResetAction": true }`)
- **Widget URL:** Point this to the latest widget available in the CDN.
- **Auth0 Implicit flow:** If it is enabled, it will make Lock use the [implicit workflow](/protocols#5) retrieving in the browser and sending back to the server with the needed user data. It is useful in cases where the server is behind a firewal without internet access. If this setting is enabled with **SSO**, you will need to add `http://your-domain/wp-login.php` as a valid callback on your Auth0 app.
- **Customize the Login Widget with custom JS:** This allows you to add custom JS to customize Lock. This is useful in cases you need to add custom buttons ([more info here](/hrd#3)). Following this example, you can add the *Fabrikam Azure AD* button with the following code:

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

>**Note:** Have in mind that the variable `lock` is where has the instance to the Lock widget.

## Integrating with the plugin

The plugin provides an action to get notified each time a user logs in or is created in WordPress. This action is called `auth0_user_login` and receives 4 params:
1. $user_id (int): the id of the user logged in
2. $user_profile (stdClass): the Auth0 profile of the user
3. $is_new (boolean): `true` if the user was created on WordPress, `false` if doesn't. Don't get confused with Auth0 registrations, this flag will tell you if a new user was created on the WordPress database.
4. $id_token (string): the user's JWT.
5. $access_token (string): the user's access token. It is not provided when using the **Implicit flow**.

To hook to this action, you will need to do the following:
```
    add_action( 'auth0_user_login', 'auth0UserLoginAction', 0,5 ); 

    function auth0UserLoginAction($user_id, $user_profile, $is_new, $id_token, $access_token) {
        ...
    }
```

