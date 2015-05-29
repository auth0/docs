# Joomla Configuration

## Component configuration
The first thing you will need to do, is to set up your *Auth0 Domain*, *Client Id* and *Client Secret* in your content configuration.

So, go to your account and under the [Apps section](https://@@uiURL@@/#/applications) and access to the setting of the app you want to use (or create a new one). If you don't have an account, create one [here](https://auth0.com) and the create a new app.

1. Access the Auth0 component page.
2. Complete your *Auth0 Domain*, *Client Id* and *Client Secret*.
3. Click on *Save & Close*.
4. Click on the *Test* menu option to check it everything is ok.

<img src="https://cdn.auth0.com/docs/cms/joomla/joomla-auth0-component-setup.gif" alt="Joomla Auth0 component configuration">

## Module configuration

1. Access to the *Module Manager*.
2. Publish the module (click on the litle red icon on the left of the Module name).
3. Click on the Module name to access to the Module setup.
4. Select the module position you want it to be shown.
5. Under the *Menu Assignment* tab, select to show it in all pages.
6. Click on *Save*
7. If you check, now you will see the login button on your Joomla that shows the Lock login form.

<img src="https://cdn.auth0.com/docs/cms/joomla/joomla-auth0-module-setup.gif" alt="Joomla Auth0 module configuration">

### Settings

#### Module

- **Show login form**: this will hide Lock so no one will be able to login through the Auth0 extension.
- **Show as modal**: when active, will show a button that triggers Lock to show in a modal. When disabled, will show Lock embed on your page.
- **Form Title:** will change the Lock title
- **Show big social buttons:** will toggle the social buttons format between big and small buttons
- **Icon URL:** will change the Lock title
- **Enable Gravatar integration:** when user types their email, their associated gravatar picture is displayed in the Lock header.
- **Customize the Login Widget CSS:** should be a valid CSS that will be injected in the login page. For more info customizing Lock [click here] (https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget)

#### Advanced Settings

- **Translation:** this represents the Lock's dict parameter, should be a valid JSON object. When this setting is in use, will override the Title setting. For more info [click here] (/libraries/lock/customization#dict-stringobject).
- **Username style:** If you don't want to force the username to be a valid email, you can set this setting to username.
- **Remember last login:** Request for SSO data and enable Last time you signed in with[...] message. For more info [click here](/libraries/lock/customization#rememberlastlogin-boolean).
- **Widget URL:** Point this to the latest widget available in the CDN.
