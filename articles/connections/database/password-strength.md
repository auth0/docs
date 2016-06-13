---
description: Auth0's Password Strength feature allows you to customize the level of enforced complexity for passwords entered during user sign-up. Auth0 offers 5 levels of security to match OWASP password recommendations.
---

# Password Strength in Auth0 Database Connections

:::panel-warning Notice
The **Password Strength** feature is only available for Database connections. The password complexity in Social and Enterprise connections is enforced by each provider.
:::

An important concern when using passwords for authentication is password strength. A strong password policy will make it difficult, if not improbable, for someone to guess a password through either manual or automated means. 

The following characteristics define a strong password:

* **Password Length**: Longer passwords include a greater combination of characters making it more difficult to guess. Passwords shorter than 10 characters are considered weak.
* **Password Complexity**: Passwords containing a combination of upper-case and lower-case letters, numbers, and special characters are recommended.
* **Passphrases**: Sentences or combinations of words can be much longer than typical passwords yet much easier to remember.

## Password policies

Auth0's Password Strength feature allows you to customize the level of enforced complexity for passwords entered during user sign-up. Auth0 offers 5 levels of security to match [OWASP password recommendations](https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls).

At each level, new passwords must meet the following criteria:

 * **None** (default): at least 1 character of any type.
 * **Low**: at least 6 characters.
 * **Fair**: at least 8 characters including a lower-case letter, an upper-case letter, and a number.
 * **Good**: at least 8 characters including at least 3 of the following 4 types of characters: a lower-case letter, an upper-case letter, a number, a special character (e.g. !@#$%^&*)
 * **Excellent**: at least 10 characters including at least 3 of the following 4 types of characters: a lower-case letter, an upper-case letter, a number, a special character (e.g. `!@#$%^&*`). Not more than 2 identical characters in a row (e.g. `111` is not allowed) and not more than 128 characters.


## Changing your policy

To change the password strength policy, go to [Database connections](${uiURL}/#/connections/database). Select the database connection you want to change and click on the **Password Strength** tab:

![Password Strength Panel in Auth0](/media/articles/connections/database/password-strength/jH0kabJPoi.png)

The new policy will be enforced on all subsequent user sign-ups and password changes. If the user enters a password that does not match the required criteria, the password will be rejected by Auth0 and the user will be asked to create one that complies with these requirements.

**NOTE**: Existing passwords that were created prior to the change in policy will continue to validate.

### Lock

After password policies have been enabled, users will be notified on sign-up and reset password Lock modes if their password does not meet the required criteria.

This is how Lock will appear on the desktop:

![Auth0 Lock Password Strength checks on Desktop](/media/articles/connections/database/password-strength/7cmjQFY45M.png)

and on mobile:

![Auth0 Lock Password Strength checks on Mobile](/media/articles/connections/database/password-strength/moUbn4XXxR.png)

## Custom Signup Errors

Sign-up errors will return a 400 HTTP status code. The JSON response will contain `code: invalid_password` when the password does not meet the selected password policy criteria.

The response will also contain additional information that can be used to guide the user to what is incorrect in the selected password:

* A `message` is ready to be formated using the `printf` function (or Node.js `util.format`).
* `format` is an array with values to be used in the `message`. (`message` is separate from the `format` to allow easier i18n of error messages in custom UIs.)
* `verified` can be either `true` or `false`. Returns `false` if the rule has been violated.

**NOTE**: Some rules are composites. A rule may contain an `items` field that specifies which sub-rules have failed. Each sub-rule will have a `message` and may have a `format`, if required.

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
          {"message":"numbers (i.e. 0-9)","verified":false},
          {"message":"special characters (e.g. !@#$%^&*)","verified":false}
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
          {"message":"numbers (i.e. 0-9)","verified":true},
          {"message":"special characters (e.g. !@#$%^&*)","verified":false}
        ],"verified":false}
      ],"
      verified":false
    }
```
