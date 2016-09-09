# Joomla Configuration

## Component configuration

### Set up your *Auth0 Domain*, *Client Id* and *Client Secret*

Copy the *Auth0 Domain*, *Client Id* and *Client Secret* settings from your app's *Application Settings* page on Auth0 to the *Auth0 Setup* page of your Joomla installation.

#### Existing App
1. From the Joomla administrator interface, select *Auth0 > Auth0* from the **Components** dropdown menu.
2. Click on the *Options* button on the upper right of the *Auth0 Setup* page.
So, go to your account and under the [Apps section](${uiURL}/#/applications) and access to the setting of the app you want to use (or create a new one). If you don't have an account, create one [here](https://auth0.com) and the create a new app.
4. From the *Application Settings* page on Auth0, copy the *Auth0 Domain*, *Client Id* and *Client Secret* to the *Auth0 Setup* page of the Joomla interface.
5. Click on *Save & Close*.
6. Select the *Test* menu option to check that the Auth0 app data is complete.

#### New App
1. From the Joomla administrator interface, select *Auth0 > Auth0* from the **Components** drop-down menu.
2. On the *Auth0 Setup* page, click *Create a free Auth0* or *Create an  Auth0 App*.
3. In the new browser window, login to Auth0. (If you don't already have an Auth0 account, you can [create one](https://auth0.com).)
4. Select the **Apps / APIs** menu item then click on *+ New App / API*.
5. On the *Apps / APIs* page, name the new app and click *Save*.
6. On the new app's *Quick Settings* page, click *Settings*.
7. From the *Application Settings* page on Auth0, copy the *Auth0 Domain*, *Client Id* and *Client Secret* to the *Auth0 Setup* page of the Joomla interface.
8. Click on *Save & Close*.
9. Select the *Test* menu option to check that the Auth0 app data is complete.

## Module configuration

1. From the Joomla administrator interface, select *Module Manager* from the **Extensions** drop-down menu.
2. To publish the Auth0 module, click on the small red icon to the left of the module name.
3. Click on the module name to access the settings page.
4. Select from the *Position* drop-down menu a location where the module will be displayed.
5. Under the *Menu Assignment* tab, select *On all pages* from the drop-down.
6. Click on *Save & Close*.
7. The Auth0 *Login* button will now appear on your Joomla homepage.

## Settings

### Module

- **Show login form**: Toggles Lock visibility. Deselect to disable login through the Auth0 extension.
- **Show as modal**: If enabled, displays a *Login* button that triggers Lock to appear as a modal form. If disabled, Lock is embedded in your page.
- **Form Title:** Sets the Lock title.
- **Show big social buttons:** Toggles the social buttons size between big and small
- **Icon URL:** Sets the Lock icon.
- **Enable Gravatar integration:** When user enters their email, their associated gravatar picture is displayed in the Lock header.
- **Customize the Login Widget CSS:** A valid CSS applied to the login page. For more information on customizing Lock, see [Can I customize the Login Widget?](https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget)

### Advanced Settings

- **Translation:** A valid JSON object representing the Lock's dict parameter. If set, will override the Title setting. For more info see [dict {String|Object}](/libraries/lock/customization#dict-string-object-).
- **Username style:** Set this to *username* if you don't wish to force a username to be a valid email.
- **Remember last login:** Requests SSO data and enables *Last time you signed in with[...]* message. For more info see [rememberLastLogin {Boolean}](/libraries/lock/customization#rememberlastlogin-boolean-).
- **Widget URL:** The URL of to the latest available widget in the CDN.
