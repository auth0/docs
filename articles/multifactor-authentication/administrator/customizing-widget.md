---
description: How to Customize the Guardian Widget
---
## Customizing the Guardian Screen

You may change the logo and the friendly name that is displayed to your users. To do so, make the appropriate setting changes from the Guardian page's link to [Account Settings](${manage_url}/#/account). You can also reach the Account Settings page by clicking on your user name on the top right of the page and then selecting **Account Settings** from the dropdown menu.

![](/media/articles/mfa/guardian-logo-and-name-settings.png)

 * **Friendly Name**: the name of the app that you want displayed to users
 * **Logo URL**: the URL that points to the logo image you want displayed to users

Auth0 recommends using a logo image that is at least 100x100 pixels, although an image that is 200x200 pixels ensures quality viewing in devices with Retina or high DPI displays.

## Customizing Guardian landing page

### Activate hosted page 

In order to achieve a fine grained control of whats gets rendered when Guardian widget is displayed you could change the actual HTML page for that step, this changes are made in [Guardian Multifactor Hosted Page](${manage_url}/#/guardian_mfa_page), that is found under **Hosted Pages** in the **Guardian Multifactor** tab. To active it is presice to click in _Customize Guardian Page_. 

![](/media/articles/mfa/guardian-mfa-hosted-page.png)

### Theming Options
Theres a few theming options for _mfa-widget_, namespaced under the `theme` property.

#### icon 
The value for `icon` is an URL for an image that will be used in the _mfa-widget_ header, and defaults to Auth0's logo. It has a recommended max height of `58px` for a better user experience.

```js
      theme: {
        icon: 'https://example.com/assets/logo.png'
      },
```

#### primaryColor
The `primaryColor` property defines the primary color of the _mfa-widget_. This option is useful when providing a custom `icon`, to ensure all colors go well together with the `icon`'s color palette. Defaults to `#ea5323`.

```js
      theme: {
        icon: 'https://example.com/assets/logo.png',
        primaryColor: 'blue'
      },
```

### HTML + Liquid syntax

This hosted page uses [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax for templating, you can use this, combined with exposed parameter values to rendered your landing page. 
You may use the following parameters, **userData.email**, **userData.friendlyUserId**, **userData.tenant**, **userData.tenantFriendlyName**, **iconUrl**.
Most of the parameters that are used in MFA-Widget need to be passed to guardian as shown in the default template provided in the customization area.
If you need a higher level of customization you could use [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js/tree/master/example).