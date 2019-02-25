An object containing information related to the authentication transaction with the following properties:
- `methods`: an array of objects containing the authentication methods a user has completed during their session. For example, a user that has completed a password-based authentication followed by MFA may have the following methods:

```json
[
  {
    name: 'pwd',
    timestamp: 1434454643024
  },
  {
    name: 'mfa',
    timestamp: 1534454643881
  }
]
```

The method objects will contain the following properties:

- `name`: a string containing the name of the authentication method that has been completed
- `timestamp`: an integer indicating the time at which the authentication method took place in Unix Epoch time
