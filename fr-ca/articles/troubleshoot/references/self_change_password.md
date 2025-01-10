---
description: Error messages for the self change password API.
public: false
topics:
  - errors
  - passwords
contentType: reference
useCase: error-management
---
# Self Change Password Errors

Below you will find the errors codes and possible solutions to various errors that can occur with the self change password api.

## Error Format

Error messages are returned in the standard format:

```json
{
  "error": "error_code",
  "error_description": "the description of the error.",
  "error_uri": "https://auth0.com/docs/troubleshoot/references/errors/self_change_password"
}
```

## Error Codes

### `invalid_request`

This error results when you supply invalid parameters. Error messages will describe the issue such as a required parameter or invalid format.


### `invalid_user_password`

This error results from a bad `username`/`email` and `old_password` combination being sent. Retry the request with the correct username and `old_password`.


### `change_password_error`

This error results from various conditions with the underlying identity provider. Generally, this happens when you are using a custom database and have not implemented the change password script.
