#WordPress Configuration

The first thing you will need to do, is to set up your *Auth0 Domain*, *Client Id* and *Client Secret*.

So, go to your account and under the [Apps section](https://manage.auth0.com/#/applications) and access to the setting of the app you want to use (or create a new one). If you don't have an account, create one [here](https://auth0.com) and the create a new app.

Then copy the *Auth0 Domain*, *Client Id* and *Client Secret* to the plugin settings.

<img src="https://cdn.auth0.com/docs/cms/wordpress/wp-auth0-initial-config.gif" alt="WP Auth0 initial configuration">


## Settings

### Basic

- Domain: the app domain. You can get it from your app settings in your dashboard.
- Client Id: the app client id. You can get it from your app settings in your dashboard.
- Client Secret: the app client secret. You can get it from your app settings in your dashboard.
- WordPress login enabled: will enable a link on the login page to access the regular WordPress login.

### Appearance

- Form Title: will change the Lock title
- Show big social buttons: will toggle the social buttons format between big and small buttons
- Icon URL: will change the Lock title
- Enable Gravatar integration: when user types their email, their associated gravatar picture is displayed in the Lock header.
- Customize the Login Widget CSS: should be a valid CSS that will be injected in the login page. For more info customizing Lock [click here] (https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget)

### Advanced

- Translation: this represents the Lock's dict parameter, should be a valid JSON object. When this setting is in use, will override the Title setting. For more info [click here] (https://github.com/auth0/lock/wiki/Auth0Lock-customization#dict-stringobject).
- Username style: If you don't want to force the username to be a valid email, you can set this setting to username.
- Remember last login: Request for SSO data and enable Last time you signed in with[...] message. For more info [click here](https://github.com/auth0/lock/wiki/Auth0Lock-customization#rememberlastlogin-boolean).
- Login redirection URL: use this setting if you want to force the redirection after the user logs in.
- Requires verified email: Mark this if you require the user to have a verified email to login.
- Allow signup: The user signup will be enabled only it it enabled the WordPress' *Anyone can register* setting. You can manage this setting on *Settings > General > Membership, Anyone can register*.
- Auto Login (no widget): Mark this to avoid the login page (you will have to select a single login provider).
- Extra settings: This field is the JSon that describes the options to call Lock with. It'll override any other option set here. See all the posible options [here](https://github.com/auth0/lock/wiki/Auth0Lock-customization). (IE: `{"disableResetAction": true }`)
- Widget URL: Point this to the latest widget available in the CDN.
