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

| Error | Description |
| - | - |
| `new WrongUsernameOrPasswordError(<email or user_id>, <message>)` | an error that occurs when you know who the user is and want to keep track of a wrong password being used |
| `new ValidationError(<error code>, <message>)` | a generic error with an error code |
| `new Error(<message>)` | a simple error (no error code included) |

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

