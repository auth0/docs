---
description: Guide on how to use the hosted password reset page
crews: crew-2
---

# Password Reset Page

The Password Reset Page allows users to change their passwords in the event that they're unable to log in. Using this page, you can maintain consistency in the appearance of your pages (login, password reset, and so on), and your users can easily change their passwords as needed.

## Enable the Custom Password Reset Page

Using the [Auth0 Dashboard](${manage_url}/#/password_reset), you can enable your Hosted Password Reset Page by flipping the toggle switch.

![Hosted Password Reset Page](/media/articles/hosted-pages/password-reset.png)

## Edit the Custom Password Reset Page

Once you've enabled the Password Reset Page for your account, you'll be able to use the text editor built into the Auth0 Dashboard to change your HTML, style your page using CSS, and alter the JavaScript used to retrieve custom variables. After you've made your changes, and make sure to click _Save_.

### Custom Variables

You can use JavaScript to retrieve the following custom variables:

* `email`
* `ticket`
* `csrf_token`
* `tenant.name`
* `tenant.friendly_name`
* `tenant.picture_url`
* `tenant.support_email`
* `tenant.support_url`
* `lang`
* `password_policy`

## Revert Your Changes

If you'd like to revert to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.
