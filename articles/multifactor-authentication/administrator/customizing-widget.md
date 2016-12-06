---
description: How to Customize the Guardian Widget
---
## Customizing the Guardian Screen

You may change the logo and the friendly name that is displayed to your users. To do so, make the appropriate setting changes from the Guardian page's link to [Account Settings](${manage_url}/#/account). You can also reach the Account Settings page by clicking on your user name on the top right of the page and then selecting **Account Settings** from the dropdown menu.

![](/media/articles/mfa/guardian-logo-and-name-settings.png)

 * **Friendly Name**: the name of the app that you want displayed to users
 * **Logo URL**: the URL that points to the logo image you want displayed to users

## Customizing the Guardian Landing Page

### Activate the Hosted Page

Customizing the content of the Guardian widget page is possible in the [Guardian Multifactor Hosted Page](${manage_url}/#/guardian_mfa_page) by toggling _Customize Guardian Page_. 

![](/media/articles/mfa/guardian-mfa-hosted-page.png)

### Theming Options
There are a few theming options for _mfa-widget_, namespaced under the `theme` property.

#### icon 
The value for `icon` is the URL for an image that will be used in the _mfa-widget_ header, which defaults to the Auth0 logo. It has a recommended max height of `58px` for a better user experience.

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

### Rendering in Enrollment vs. Authentication Scenarios
There are two different possible scenarios in which the page is rendered. If a user has been directed to this page for enrollment, for instance, from an email, then the property **ticket** will be available. Otherwise, the property **requestToken** will be available.

### HTML + Liquid syntax

The hosted page uses [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax for templating. 
The following parameters are available to assist in rendering your page: **userData.email**, **userData.friendlyUserId**, **userData.tenant**, **userData.tenantFriendlyName**, **iconUrl**.
Most of the parameters that are used in MFA-Widget need to be passed to Guardian as shown in the default template provided in the customization area.
If you need a higher level of customization you could use [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js/tree/master/example).
