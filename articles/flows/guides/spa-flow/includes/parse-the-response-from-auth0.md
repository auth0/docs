## Parse the response from Auth0

If your call to the `/authorize` endpoint is successful, Auth0 redirects you to a URL similar to the following:

```text
https://YOUR_REDIRECT_URI
  /#access_token=ey...MhPw
  &expires_in=7200
  &token_type=Bearer
  &code=AUTHORIZATION_CODE
  &id_token=ey...qk
```

The URL contains the following components:

* The redirect URI you provided for this application
* The Authorization Code provided by Auth0
* The ID Token
* The Access Token

If you've returned an Access Token, you'll also receive `expires_in` and `token_type` values.

More specifically, here's what you will get back (depending on the value provided in `response_type`):

| Response Type | Components |
| - | - |
| code id_token | Authorization Code, ID Token |
| code token | Authorization Code, Access Token |
| code id_token token | Authorization Code, ID Token, Access Token |