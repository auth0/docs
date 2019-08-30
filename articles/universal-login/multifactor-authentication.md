---
description: Guide on how to customize the MFA page
topics:
  - mfa
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# Multi-factor Authentication Page

You can enable [Multi-factor authentication](/multifactor-authentication) from the [Dashboard > Multifactor Auth](${manage_url}/#/mfa) section.


![Universal Login MFA Page](/media/articles/multifactor-authentication/mfa-dashboard-1.png)

## Customizing the MFA Pages

You can customize the MFA pages using the Universal Login's [basic customization features](universal-login#simple-customization). 

If you need further customizations, you can provide your own HTML for the MFA page. Note that this will use the Auth0 MFA Widget, which has the following limitations:
- It does not support MFA with Email.
- If users enrolled more than one factor, they cannot select which one to use, the MFA widget will ask them to login with the most secure factor.
- It does not use Universal Login's [internationalization](/universal-login/i18n) features

## Customizing the HTML for the MFA page

To customize the MFA page, go to [Dashboard > Universal Login > Guardian Multi-factor](${manage_url}/#/guardian_mfa_page) and enable the __Customize Guardian Page__ switch.

Once you do that, you'll be able to use the text editor built into the Auth0 Dashboard to change your HTML, style your page using CSS, and alter the JavaScript used to retrieve custom variables. Once you've made your changes, and make sure to click __Save__.

If you'd like to revert to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.

Please note that MFA page works without customization (Auth0 will also update the included scripts as required). However, once you toggle the customization to **on**, you are responsible for the updating and maintaining the script (including changing version numbers, such as that for the MFA widget), since Auth0 can no longer update it automatically.

## Configuration Options

### defaultLocation

```js
return new Auth0MFAWidget({

...

  defaultLocation : ['United Kingdom', 'GB', '+44'],
  
...

})
```

## Theming Options

There are a few theming options for the MFA Widget, namespaced under the `theme` property.

### icon

The value for `icon` is the URL for an image that will be used in the MFA Widget header, which defaults to the Auth0 logo. It has a recommended max height of `58px` for a better user experience.

```js
return new Auth0MFAWidget({

...

  theme: {
    icon: 'https://example.com/assets/logo.png'
  },
  
...

})
```

### primaryColor

The `primaryColor` property defines the primary color of the MFA Widget. This option is useful when providing a custom `icon`, to ensure all colors go well together with the `icon`'s color palette. Defaults to `#ea5323`.

```js
return new Auth0MFAWidget({

...

  theme: {
    icon: 'https://example.com/assets/logo.png',
    primaryColor: 'blue'
  },
  
...  
  
})
```

## Rendering "Invited Enrollments" vs. Standard Scenarios

There are two different possible scenarios in which the page is rendered. If a user has been directed to this page specifically for enrollment (for instance, from an email with an enrollment link) then the property **ticket** will be available. Otherwise, the property **requestToken** will be available.

## HTML + Liquid syntax

The hosted page uses [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax for templating.
The following parameters are available to assist in rendering your page:

* `userData.email` 
* `userData.friendlyUserId`
* `userData.tenant`
* `userData.tenantFriendlyName`
* `iconUrl`

Most of the parameters that are used in the MFA Widget need to be passed to Guardian as shown in the default template provided in the customization area.
If you need a higher level of customization you could use [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js/tree/master/example).
