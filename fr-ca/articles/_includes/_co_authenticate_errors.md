## Error Codes and Descriptions 

When ${library} is used for embedded login, it employs the /co/authenticate endpoint, which has the following errors.

::: warning
The error description is human readable. It **should not be parsed by any code** and it subject to change at any time.
:::

| Status | Code | Description |
| --- | --- | --- | --- | 
| 400 | invalid_request | Invalid request body. All and only of client_id, credential_type, username, otp, realm are required. |
| 401 | unauthorized_client | Cross origin login not allowed. |
| 400 | unsupported_credential_type | Unknown credential type parameter. |
| 400 | invalid_request | Unknown realm non-existent-connection. |
| 403 | access_denied | Wrong email or password. |
| 403 | access_denied | Authentication error |
| 403 | blocked_user | Blocked user |
| 401 | password_leaked | This login attempt has been blocked because the password you're using was previously disclosed through a data breach (not in this application). |
| 429 | too_many_attempts | Your account has been blocked after multiple consecutive login attempts. We’ve sent you an email with instructions on how to unblock it. |
| 429 | too_many_attempts | We have detected suspicious login behavior and further attempts will be blocked. Please contact the administrator. |

In addition, you can also get a generic 403 error without an `error` or `error_description` property. The response body would just include something similar to the following:

```text
Origin https://test.app is not allowed.
```
