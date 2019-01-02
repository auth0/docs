---
description: Guide on how to use the hosted Guardian MFA page
topics:
  - mfa
  - guardian
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# Guardian Multi-factor Login Page

In the [Auth0 Dashboard](${manage_url}/#/guardian_mfa_page), you can enable 2nd factor authentication, using Guardian Multi-factor. You can customize the page that Auth0 displays to your users, allowing you to require MFA on logins which meet certain criteria, or just across the board. For more information on the MFA page, refer to [Hosted Pages > MFA](/hosted-pages/guardian).

![Hosted Guardian MFA Page](/media/articles/hosted-pages/guardian.png)

## Guardian Login Page HTML Editor

To customize the Guardian Login page, go to [Dashboard > Hosted Pages > Guardian Multi-factor](${manage_url}/#/guardian_mfa_page) and enable the __Customize Guardian Page__ switch.

Once you do that, you'll be able to use the text editor built into the Auth0 Dashboard to change your HTML, style your page using CSS, and alter the JavaScript used to retrieve custom variables. Once you've made your changes, and make sure to click __Save__.

If you'd like to revert to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.

## Theming Options

There are a few theming options for MFA-Widget, namespaced under the `theme` property.

### icon

The value for `icon` is the URL for an image that will be used in the MFA-Widget header, which defaults to the Auth0 logo. It has a recommended max height of `58px` for a better user experience.

```js
      theme: {
        icon: 'https://example.com/assets/logo.png'
      },
```

### primaryColor

The `primaryColor` property defines the primary color of the MFA-Widget. This option is useful when providing a custom `icon`, to ensure all colors go well together with the `icon`'s color palette. Defaults to `#ea5323`.

```js
      theme: {
        icon: 'https://example.com/assets/logo.png',
        primaryColor: 'blue'
      },
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

Most of the parameters that are used in MFA-Widget need to be passed to Guardian as shown in the default template provided in the customization area.
If you need a higher level of customization you could use [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js/tree/master/example).
