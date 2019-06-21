An object containing information related to the authentication transaction with the following properties:

- `methods`: an array of objects containing the authentication methods a user has completed during their session. For example, a user that has completed a password-based authentication followed by MFA may have the following methods:

```json
[
  {
    "name": "pwd",
    "timestamp": 1434454643024
  },
  {
    "name": "mfa",
    "timestamp": 1534454643881
  }
]
```

The method objects will contain the following properties:

- `name`: a string representing the name of the authentication method that has been completed. It can be one of the following values (additional values may be supported in the future):
  - `federated`: a social or enterprise connection was used to authenticate the user
  - `pwd`: a database connection was used to authenticate the user
  - `sms`: a <dfn data-key="passwordless">Passwordless</dfn> SMS connection was used to authenticate the user
  - `email`: a Passwordless Email connection was used to authenticate the user
  - `mfa`: the user completed a mulifactor authentication
- `timestamp`: an integer indicating the time in seconds at which the authentication method took place in Unix Epoch time

You can see a sample use case of the `context.authentication.methods` property in the [Require MFA once per session Rule](https://github.com/auth0/rules/blob/master/src/rules/require-mfa-once-per-session.js).
