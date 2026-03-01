When enabled, the system will enforce password expiration for this connection.

Properties include:

- `enable` (boolean): Whether or not to enable password expiration.
- `warn_after` (integer): The timeframe (in days) after which the user will be warned that their password will expire. Maximum: 365. Default: 90.
- `expire_after` (integer): The timeframe (in days) after which a password will expire. Maximum: 365. Default: 90.