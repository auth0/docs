If the call was successful, you'll receive a response in the below format, containing the <dfn data-key="access-token">Access Token</dfn>:

```
{
  "access_token": "eyJ...i",
  "expires_in": 600,
  "scope": "enroll read:authenticators remove:authenticators",
  "token_type": "Bearer"
}
```

At this point, the authenticator is fully associated and ready to be used, and you have an Access Token for the user.

You can check at any point to verify whether an authenticator has been confirmed by calling the [`mfa/authenticators` endpoint](/multifactor-authentication/api/manage#list-authenticators). If the authenticator is confirmed, the value returned for `active` is `true`.