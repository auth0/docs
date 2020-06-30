If the call was successful, you'll receive a response in the below format, containing the <dfn data-key="access-token">Access Token</dfn>:

```
{
  "id_token": "eyJ...i",
  "access_token": "eyJ...i",
  "expires_in": 600,
  "scope": "openid profile",
  "token_type": "Bearer"
}
```

At this point, the authenticator is fully associated and ready to be used, and you have the authentication tokens for the user.

You can check at any point to verify whether an authenticator has been confirmed by calling the [`mfa/authenticators` endpoint](/mfa/guides/mfa-api/manage#list-authenticators). If the authenticator is confirmed, the value returned for `active` is `true`.