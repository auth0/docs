---
description: Custom database action script for changing a user's email.
toc: true
topics:
    - connections
    - custom-database
contentType: reference
useCase:
    - customize-connections
---
# Change Email Script

The **Change Email** script implements the function executed when a change in the email address, or the email address verification status, for a user occurs. We recommend naming this function `changeEmail`. Typically the script is executed when a change in either email address and/or email address verification status is actioned via the Auth0 Dashboard or the Auth0 Management API. The script is only used in a legacy authentication scenario, and must be implemented if support is required for email address/status change via Auth0.

The change email script is not configurable via the Auth0 Dashboard. There are no script templates available. You can use either the Auth0 [Deploy CLI Tool](/extensions/deploy-cli) or the Auth0 [Management API](/api/management/v2#!/Connections) to create or update the change email script. 

The changeEmail function should be defined as follows:

```js
function changeEmail(email, newEmail, verified, callback) {
  // TODO: implement your script
  return callback(null);
}
```

::: warning
If you change any aspect of a connection via the Dashboard in Auth0, and that connection makes use of a **Change Email** script, then the script will be deleted. 
:::

| **Parameter** | **Description** |
| --- | --- |
| `email` | The email address for the user as the user identifying credential. |
| `newEmail` | The new email address for the user. |
| `verified` | The verified state of the new email address, passed as either a true or false value. Email verification status information is typically returned via `email_verified` as part of any user profile information returned (see `login` and `get user` for further details), so email verification state should be preserved in the legacy data store for future reference. |
| `callback` | Executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter of `true` indicates that the operation executed successfully; a `null` first parameter with no corresponding second parameter (or one with a value of `false`) indicates that no password change was performed (possibly due to the user not being found). A non `null` first parameter value indicates that some error condition occurred.  |

<%= include('../_includes/_bp-error-object') %>

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
