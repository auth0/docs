When enabled, the system will maintain a password history for each user and prevent the reuse of passwords included in the history. Any existing users in the connection will be unaffected; the system will maintain their password history going forward.

Properties include:

- `enable` (boolean): Whether or not to enable password history tracking.
- `size` (integer): The number of passwords to track. Maximum: 24.