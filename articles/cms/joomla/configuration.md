---
description: How to configure your Joomla instance for use with Auth0.
topics:
    - joomla
    - cms
contentType: how-to
useCase:
  - add-login
---

# Joomla Integration

Before you can use Auth0 to handle authentication and authorization requests for your Joomla users, you'll need to do some configuration from both sides of the integration.

## Configure Application Values

To use Auth0 with Joomla, be sure you have a valid [Application](/applications). You'll need to provide information about your application to the Auth0-Joomla extension you [installed](/cms/joomla/installation).

1. Log in to the Joomla Control Panel using an admin account. Using the top navigation bar, go to **Components > Auth0 > Auth0**. Click **Options** (located in the top right of the window). 

    ![](/media/articles/cms/joomla/configuration/joomla-1.png)

2. Provide the requested values for your Auth0 application. You can find the **Domain**, **Client ID**, and **Client Secret** values using the [Application Settings page](${manage_url}/#/applications/${account.clientId}/settings). Click **Save & Close** to proceed.

    ![](/media/articles/cms/joomla/configuration/joomla-2.png)

3. On the left-hand side, select **Test** (if you're not automatically redirected to the page). Make sure that the **Auth0 App Data** setting indicates **Complete**.

    ![](/media/articles/cms/joomla/configuration/joomla-3.png)

## Configure the Joomla Module

1. Log in to the Joomla Control Panel using an admin account. Using the top navigation bar, go to **Extensions > Modules**.

    ![](/media/articles/cms/joomla/configuration/joomla-4.png)

2. Publish the module but clicking on the small, red icon located immediately to the left of the module name.

    ![](/media/articles/cms/joomla/configuration/joomla-5.png)

3. Click on the name of the module `Auth0` to launch the settings page. On the right-hand side, use the **Position** drop-down menu to indicate [where the Auth0 Login button will be located](https://docs.joomla.org/Module_Position) on your site.

    ![](/media/articles/cms/joomla/configuration/joomla-6.png)

4. Switch over the **Menu Assignment** tab, and using the **Module Assignment** drop-down menu, select **On all pages**.

![](/media/articles/cms/joomla/configuration/joomla-7.png)

5. Click **Save & Close**. The Auth0 Login button will now appear in the location you selected on your Joomla pages. Whenever a user clicks **Login**, they will see the [Auth0 Lock widget](/libraries/lock).

![](/media/articles/cms/joomla/configuration/joomla-8.png)

## Module Settings

You can configure your Auth0-Joomla Extension by adjusting the **Module** and **Advanced** Settings.

### Settings Located Under the Module Tab

| Parameter | Description |
| - | - |
| Show login form | Toggles Lock visibility. Deselect to disable login through the Auth0 extension |
| Show as modal | If enabled, displays a *Login* button that triggers Lock to appear as a modal form; if disabled, Lock is embedded in your page. |
| Form title | Title displayed in Lock |
| Show big social buttons | Sets the size of the Social buttons in Lock |
| Icon URL | Sets the Lock icon |
| Enable Gravatar integration | Displays the user's gravatar picture when they enter their email address |
| Customize the Login Widget CSS | CSS snippet that will [apply custom styles to the login widget](https://github.com/auth0/wp-auth0#can-i-customize-the-login-widget) |

### Settings Located Under the Advanced Settings Tab

| Parameter | Description |
| - | - |
| Translation | A valid JSON object representing the [Lock's `dict` parameter](/libraries/lock/customization#dict-string-object-). If set, this overrides the Title setting |
| Username style | Toggles whether the username should be a value selected by the user or their email address |
| Remember last login | Requests <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> data and [enables SSO](/libraries/lock/customization#rememberlastlogin-boolean-) |
| Widget URL | The URL of the [latest Lock version](https://github.com/auth0/lock#install) |
