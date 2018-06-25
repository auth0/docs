---
description: Learn how to handle errors when using your database as an identity provider.
crews: crew-2
---
# Custom Database Error Handling

In this article, we will show you how you can handle errors resulting from your custom database connection.

## Types of errors

There are three different errors you can return from a database connection:

* `new WrongUsernameOrPasswordError(<email or user_id>, <message>)`: an error that occurs when you know who the user is and want to keep track of a wrong password being used
* `new ValidationError(<error code>, <message>)`: a generic error with an error code.
* `new Error(<message>)`: a simple error (no error code included).

To return an error, call the **callback** function while passing **error** as the first parameter:

```js
callback(error);
```

**Example:**

```js
callback(new ValidationError('email-too-long', 'Email is too long.'));
```

If you use [Lock](/libraries/lock), you can [customize the error messages](libraries/lock/customizing-error-messages) that will be displayed by adding them to the dictionary.