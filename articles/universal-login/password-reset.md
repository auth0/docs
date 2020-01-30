---
description: Learn how to customize a hosted password reset page.
topics:
  - password-reset
  - hosted-pages
contentType: how-to
toc: true
useCase: customize-hosted-pages
---
# Customize Hosted Password Reset Page

::: note
If you are:

* An administrator trying to reset a user's password, see [Change Users' Passwords](/connections/database/password-change)
* A user trying to reset your own password, see [Reset Auth0 Account Password](/support/reset-account-password)
:::

The Password Reset Page provides your applications' users with a way to change their passwords if they can't log in.

With the Password Reset Page, Auth0 handles all required functionality, including:

* Hosting the page itself
* Redirecting the user wanting to reset their password as necessary (there is no URL to which the user can point their browsers)
* Ensuring that the user's password meets your stated requirements and is updated accordingly
* Automatically redirecting the user after they reset their password

The Password Reset Page includes use of the Password Reset Widget. You can, however, [customize the page](/universal-login/advanced-customization) to display the personalized information you deem appropriate and to maintain consistency in the appearance of your Auth0 pages (e.g., Login, Password Reset, and MFA).

## Enable Customization of the Password Reset Page

By default, the Password Reset Page is enabled for all Auth0 users. The Password Reset Page **works as is *without* customization**. However, if you want to change the page to match your other pages and present your branding, you can enable customization of the Password Reset Page.

To do so, log in to the [Dashboard](${manage_url}/#/password_reset). Go to **Universal Login** > **Password Reset**. Toggle **Customize Password Reset Page** to enable customization. 

![Hosted Password Reset Page](/media/articles/universal-login/password-reset.png)

## Edit the Password Reset Page

Once you've enabled the customization toggle for the Password Reset Page, you can use the built-in text editor to change its HTML, style the page using CSS, and change the JavaScript used to retrieve and display custom variables. Be sure to **Save** any changes you make.

### Display custom information on the Password Reset Page

You can display personalized information on the Password Reset Page. This is done by editing the embedded JavaScript using the Password Reset Page Editor:

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

For example, the sample template snippet below shows the variable `tenant.picture_url`. This variable returns the **Logo URL** value defined in [Tenant Settings](${manage_url}/#/tenant).

```js
  <script>
    new Auth0ChangePassword({
      theme: {
        icon: "{{tenant.picture_url | default: '//cdn.auth0.com/styleguide/1.0.0/img/badge.png'}}",
      }
    });
  </script>
```

Auth0 retrieves the logo at the URL and displays it on the Password Reset Widget. If Auth0 can't resolve the URL, it'll display that the default image.

#### Custom variables

The following custom variables can be used to display personalized information on the Password Reset Page:

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

**Notes:**

* You can set/check the values for your `tenant` variables in the **Settings** area in [Tenant Settings](${manage_url}/#/tenant)
* You cannot conditionalize customizations based on the Application ID (`client_id`).

## Update the Password Reset Widget

 If you **do not enable customization of the Password Reset Page**, Auth0 will handle updates necessary for the script, including changes to the version number of the included Password Reset Widget.

**Once you have enabled customization of the Password Reset Page, it is your responsibility to update and maintain the script**. This includes updating the version number for the Password Reset Widget. With customization enabled, Auth0 cannot update your script automatically without potentially interfering with changes you've made. 

## Revert your changes

If you'd like to revert the Password Reset Page to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.
