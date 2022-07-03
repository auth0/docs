---
description: Describes how to handle errors and troubleshoot when using your database as an identity provider.
topics:
    - connections
    - custom-database
    - troubleshooting
contentType: reference
useCase:
    - customize-connections
    - troubleshooting
---
# Troubleshoot Custom Databases

You can use return errors resulting from your custom database connection for troubleshooting purposes. We will also cover some basic troubleshooting steps for your scripts.

## Types of errors

There are three different errors you can return from a database connection:

| Error | Login Script | Description |
| - | - | - |
| `new WrongUsernameOrPasswordError(<email or user_id>, <message>)` | Login | Occurs when the user's credentials are invalid |
| `new ValidationError(<user_exists>, <message>)` | Create | Occurs when a user already exists in your database |
| `callback(<null>,<false>)` | Change Password | Occurs when the user's password was not updated|
| `callback(<null>)` | Get User | Occurs when the user is not found|
| `new Error(<message>)` | All Login Scripts | Occurs when something went wrong while trying to reach the database |

## Return errors

To return an error, call the **callback** function while passing **error** as the first parameter:

```js
callback(error);
```

**Example:**

```js
callback(new ValidationError('email-too-long', 'Email is too long.'));
```

### Returning errors when using Lock

If you use <dfn data-key="lock">Lock</dfn>, you can [customize the error messages](libraries/lock/customizing-error-messages) that will be displayed by adding them to the dictionary.

## Troubleshooting Errors

Test the script using the **TRY** button. 

If you do not get the expected result or you receive an error, install the [Real-time Webtask Logs extension](/extensions/realtime-webtask-logs) and use `console.log()` statements in your script and try the connection again. The output of `console.log()` will print to the Real-time Webtask Logs window.

