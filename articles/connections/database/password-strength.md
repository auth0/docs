---
title: Password Strength in Auth0 Database Connections
description: Auth0's Password Strength feature allows you to customize the level of enforced complexity for passwords entered during user sign-up. Auth0 offers 5 levels of security to match OWASP password recommendations.
topics:
    - connections
    - database
    - db-connections
    - passwords
contentType: concept
useCase: customize-connections
---
# Password Strength in Auth0 Database Connections

::: warning
The **Password Strength** feature is only available for Database connections. The password complexity in Social and Enterprise connections is enforced by each provider.
:::

An important concern when using passwords for authentication is password strength. A strong password policy will make it difficult, if not improbable, for someone to guess a password through either manual or automated means.

The following characteristics define a strong password:

* **Password Length**: Longer passwords include a greater combination of characters making it more difficult to guess. Passwords shorter than 10 characters are considered weak.
* **Password Complexity**: Passwords containing a combination of upper-case and lower-case letters, numbers, and special characters are recommended.
* **Passphrases**: Sentences or combinations of words can be much longer than typical passwords yet much easier to remember.

## Password policies

Auth0's Password Strength feature allows you to customize the level of enforced complexity for passwords entered during user sign-up. Auth0 offers 5 levels of security to match [OWASP password recommendations](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md).

At each level, new passwords must meet the following criteria:

* **None** (default): at least 1 character of any type.
* **Low**: at least 6 characters.
* **Fair**: at least 8 characters including a lower-case letter, an upper-case letter, and a number.
* **Good**: at least 8 characters including at least 3 of the following 4 types of characters: a lower-case letter, an upper-case letter, a number, a special character (such as !@#$%^&*).
* **Excellent**: at least 10 characters including at least 3 of the following 4 types of characters: a lower-case letter, an upper-case letter, a number, a special character (such as `!@#$%^&*`). Not more than 2 identical characters in a row (such as `111` is not allowed).

::: note
The password policy for Auth0 Dashboard Admins will mirror the criteria set for the **Fair** level.
:::

## Minimum password length

You can set a minimum length requirement for passwords that is independent of the policy strength requirements described in the [section immediately above](#password-policies). 

The minimum password length you can set is **1**, while the maximum is **128**.

If you opt for a higher-level password policy, but you do not specify a minimum length value, the minimum password length for the policy level will automatically be used:

| Password Policy Level | Minimum Password Length |
| - | - |
| None | 1 |
| Low | 6 |
| Fair | 8 |
| Good | 8 |
| Excellent | 10 |

If you provide a minimum password length, this value supercedes that indicated by the password policy.

### Minimum password length when using Hosted Pages

If you are using either the [Hosted Login Page](/hosted-pages/login) or the [Hosted Password Reset Page](/universal-login/password-reset), and you want to set the minimum password length value, you will need to complete a few additional configuration steps using the [Dashboard](${manage_url}).

#### Set minimum password length when using Hosted Password Reset Pages

If you're using a customized [Password Reset Page](/universal-login/password-reset) and you want to set the password length parameter, you must:

1. Update your templates to include library version 1.5.1 or later
2. Add `password_complexity_options` to leverage the new parameter

If you do not [update the Password Reset Page](/universal-login/password-reset#edit-the-password-reset-page), Auth0 ignores any attempt to set the minimum password length.

##### Step 1: Update the change password library version

To use the new minimum password length feature, you should update the change password library used to version 1.5.1 (or later):

```text
<script src="https://cdn.auth0.com/js/change-password-1.5.1.min.js"></script>
```

##### Step 2: Add `password_complexity_options` to leverage the new parameter

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
    password_complexity_options:  {{password_complexity_options}}         // DO NOT CHANGE THIS
    
    //code omitted for brevity
  
  });
</script>
```

Scroll to the bottom and click **Save**.

#### Set minimum password length when using Hosted Login Pages

If you're using a customized [Login Page](/hosted-pages/login) and you want to set the password length parameter, you must [update the page to use Lock version 11.9 or later](/hosted-pages/login/lock#customize-lock-in-the-login-page).

```text
<script src="https://cdn.auth0.com/js/lock/11.9/lock.min.js"></script>
```

Scroll to the bottom and click **Save**.

## Change Your Policy

To change the password strength policy, go to [Database connections](${manage_url}/#/connections/database). Select the database connection you want to change and click on the **Password Strength** tab:

![Password Strength Panel in Auth0](/media/articles/connections/database/password-strength/pw-manage.png)

The new policy will be enforced on all subsequent user sign-ups and password changes. If the user enters a password that does not match the required criteria, the password will be rejected by Auth0 and the user will be asked to create one that complies with these requirements.

::: note
Existing passwords that were created prior to the change in policy will continue to validate.
:::

### Lock

After password policies have been enabled, users will be notified on sign-up and reset password <dfn data-key="lock">Lock</dfn> modes if their password does not meet the required criteria.

This is how Lock will appear on the desktop:

![Auth0 Lock Password Strength checks on Desktop](/media/articles/connections/database/password-strength/7cmjQFY45M.png)

and on mobile:

![Auth0 Lock Password Strength checks on Mobile](/media/articles/connections/database/password-strength/moUbn4XXxR.png)


::: note
If Auth0 rejects a provided password, the notification will display in English. If you would like to display notifications in another language, you will need to do so via client-side translation.
:::

## Custom signup errors

Sign-up errors will return a 400 HTTP status code. The JSON response will contain `code: invalid_password` when the password does not meet the selected password policy criteria.

The response will also contain additional information that can be used to guide the user to what is incorrect in the selected password:

* A `message` is ready to be formatted using the `printf` function (or Node.js `util.format`).
* `format` is an array with values to be used in the `message`. (`message` is separate from the `format` to allow easier i18n of error messages in custom UIs.)
* `verified` can be either `true` or `false`. Returns `false` if the rule has been violated.

::: note
Some rules are composites. A rule may contain an `items` field that specifies which sub-rules have failed. Each sub-rule will have a `message` and may have a `format`, if required.
:::

### Examples

This is a sample `description` error report from a `good` policy with `hello` as the password:

```json
  {
    "rules":[
      {"message":"At least %d characters in length","format":[8],"verified":false},
      {"message":"Contain at least %d of the following %d types of characters:","format":[3,4],
        "items":[
          {"message":"lower case letters (a-z)","verified":true},
          {"message":"upper case letters (A-Z)","verified":false},
          {"message":"numbers (such as 0-9)","verified":false},
          {"message":"special characters (such as !@#$%^&*)","verified":false}
        ],"verified":false}
      ],"
      verified":false
    }
```

This is a sample `description` error report from a `good` policy with `hello1234` as the password:

```json
  {
    "rules":[
      {"message":"At least %d characters in length","format":[8],"verified":true},
      {"message":"Contain at least %d of the following %d types of characters:","format":[3,4],
        "items":[
          {"message":"lower case letters (a-z)","verified":true},
          {"message":"upper case letters (A-Z)","verified":false},
          {"message":"numbers (such as 0-9)","verified":true},
          {"message":"special characters (such as !@#$%^&*)","verified":false}
        ],"verified":false}
      ],"
      verified":false
    }
```

## Password options

In addition to the Password Strength feature explained here, the Password Policy settings for a database connection also include various Password Options that can further enhance your connection's password policy and ensure that your users have more secure passwords. Take a look at the [Password Options](/connections/database/password-options) documentation for more information.
