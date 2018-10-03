---
description: Guide on how to use the hosted password reset page
topics:
  - password-reset
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# Password Reset Page

The Password Reset Page allows users to change their passwords in the event that they're unable to log in. Using this page, you can maintain consistency in the appearance of your pages (login, password reset, and so on), and your users can easily change their passwords as needed.

This article will help you learn how to configure the custom Password Reset page. If you are trying to reset your own password, see [Reset Your Auth0 Account Password](/support/reset-account-password).

## Enable the Password Reset Page

Using the [Auth0 Dashboard](${manage_url}/#/password_reset), you can enable your Hosted Password Reset Page by flipping the toggle switch.

![Hosted Password Reset Page](/media/articles/hosted-pages/password-reset.png)

## Edit the Password Reset Page

Once you've enabled the Password Reset Page for your tenant, you'll be able to use the text editor built into the Auth0 Dashboard to change your HTML, style your page using CSS, and alter the JavaScript used to retrieve custom variables. After you've made your changes, and make sure to click _Save_.

### Custom variables

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
| `password_policy` | The active connection's security policy. You can see what this is using `${manage_url}/#/connections/database/con_YOUR-CONNECTION-ID/security`. Be sure to provide your connection ID in the URL.) |
| `password_complexity_options` | Object containing settings for the password complexity requirements |
| `min_length` | The minimum length required for newly-created passwords. Can range from 1 to 128 characters in length | 

::: note
You can set/check the values for your `tenant` variables in the **Settings** area in [Tenant Settings](${manage_url}/#/tenant)
:::

::: note
It is currently not possible to conditionalize customizations based on Application ID (`client_id`).
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

## Set the minimum password length value

![](/media/articles/connections/database/password-strength/pw-manage.png)

Customers currently using a customized Password Reset Page who want to use the new password length parameter must:

1. Update their templates to include library version 1.5.1 or later
2. Add `password_complexity_options` to leverage the new parameter

If you do not update the Password Reset Page, Auth0 ignores any attempt to set the minimum password length.
 ### Step 1: Update the change password library version
 To use the new minimum password length feature, you should update the change password library used to version 1.5.1 (or later):
 ```text
<script src="https://cdn.auth0.com/js/change-password-1.4.0.min.js"></script>
```

### Step 2: Add `password_complexity_options` to leverage the new parameter

You'll need to add `password_complexity_options` to leverage the new parameter. Add this option to the page's script as follows:

```text
<script>
    //code omitted for brevity
    new Auth0ChangePassword({
    container:                    "change-password-widget-container",     // required
    email:                        '{{email}}',                            // DO NOT CHANGE THIS
    csrf_token:                   '{{csrf_token}}',                       // DO NOT CHANGE THIS
    ticket:                       '{{ticket}}',                           // DO NOT CHANGE THIS
    password_policy:              '{{password_policy}}',                  // DO NOT CHANGE THIS
    password_complexity_options:  '{{password_complexity_options}}'       // DO NOT CHANGE THIS
    
    //code omitted for brevity
  
  });
</script>
```

Scroll to the bottom and click **Save**.

## Revert Your Changes

If you'd like to revert to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.