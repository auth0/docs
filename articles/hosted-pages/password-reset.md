---
description: Guide on how to use the hosted password reset page
crews: crew-2
tags:
  - password-reset
  - hosted-pages
---

# Password Reset Page

The Password Reset Page allows users to change their passwords in the event that they're unable to log in. Using this page, you can maintain consistency in the appearance of your pages (login, password reset, and so on), and your users can easily change their passwords as needed.

## Enable the Custom Password Reset Page

Using the [Auth0 Dashboard](${manage_url}/#/password_reset), you can enable your Hosted Password Reset Page by flipping the toggle switch.

![Hosted Password Reset Page](/media/articles/hosted-pages/password-reset.png)

## Edit the Custom Password Reset Page

Once you've enabled the Password Reset Page for your tenant, you'll be able to use the text editor built into the Auth0 Dashboard to change your HTML, style your page using CSS, and alter the JavaScript used to retrieve custom variables. After you've made your changes, and make sure to click _Save_.

### Custom Variables

You can use JavaScript to retrieve the following custom variables:

| Variable | Description |
| - | - |
| `email` | The email address of the user requesting the password change | 
| `ticket` | The ticket representing the given password reset request | 
| `csrf_token` | Token used to prevent CSRF activity | 
| `tenant.name` | The name associated with your Auth0 tenant | 
| `tenant.friendly_name` | The name displayed for your Auth0 tenant | 
| `tenant.picture_url` | The URL leading to the logo representing you in Auth0 | 
| `tenant.support_email` | The support email address for your company displayed to your Auth0 users | 
| `tenant.support_url` | The support URL for your company displayed to your Auth0 users | 
| `lang` | The user's language | 
| `password_policy` | The active connection's security policy You can see what this is using `${manage_url}/#/connections/database/con_YOUR-CONNECTION-ID/security`. Be sure to provide your connection ID in the URL.) | 

::: note
You can set/check the values for your `tenant` variables in the **Settings** area in [Tenant Settings](${manage_url}/#/tenant)
:::

Within the Password Reset Page Editor, you'll see the following JavaScript embedded:

```js
  <script>
    new Auth0ChangePassword({
      container:         "change-password-widget-container",     // required
      email:             "{{email}}",                            // DO NOT CHANGE THIS
      csrf_token:        '{{csrf_token}}',                       // DO NOT CHANGE THIS
      ticket:            '{{ticket}}',                           // DO NOT CHANGE THIS
      password_policy:   '{{password_policy}}',                  // DO NOT CHANGE THIS
      theme: {
        icon: "{{tenant.picture_url | default: '//cdn.auth0.com/styleguide/1.0.0/img/badge.png'}}",
        primaryColor: "#ea5323"
      },
      dict: {
        // passwordPlaceholder: "your new password",
        // passwordConfirmationPlaceholder: "confirm your new password",
        // passwordConfirmationMatchError: "Please ensure the password and the confirmation are the same.",
        // passwordStrength: {
        //   containsAtLeast: "Contain at least %d of the following %d types of characters:",
        //   identicalChars: "No more than %d identical characters in a row (such as, \"%s\" not allowed)",
        //   nonEmpty: "Non-empty password required",
        //   numbers: "Numbers (such as 0-9)",
        //   lengthAtLeast: "At least %d characters in length",
        //   lowerCase: "Lower case letters (a-z)",
        //   shouldContain: "Should contain:",
        //   specialCharacters: "Special characters (such as !@#$%^&*)",
        //   upperCase: "Upper case letters (A-Z)"
        // },
        // successMessage: "Your password has been reset successfully.",
        // configurationError: "An error ocurred. There appears to be a misconfiguration in the form.",
        // networkError: "The server cannot be reached, there is a problem with the network.",
        // timeoutError: "The server cannot be reached, please try again.",
        // serverError: "There was an error processing the password reset.",
        // headerText: "Enter a new password for<br />{email}",
        // title: "Change Password",
        // weakPasswordError: "Password is too weak."
        // passwordHistoryError: "Password has previously been used."
      }
    });
  </script>
```

Notice that the sample template uses the `tenant.picture_url` variable to return the value entered in the **Logo URL** field of the **Settings** area in [Tenant Settings](${manage_url}/#/tenant). Auth0 will retrieve the logo at that URL and display it on the password reset widget. If Auth0 cannot resolve the URL, it'll display a default image (note that the sample snippet below has all unrelated content removed, including mandatory fields):

```js
  <script>
    new Auth0ChangePassword({
      theme: {
        icon: "{{tenant.picture_url | default: '//cdn.auth0.com/styleguide/1.0.0/img/badge.png'}}",
      }
    });
  </script>
```

## Revert Your Changes

If you'd like to revert to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.
