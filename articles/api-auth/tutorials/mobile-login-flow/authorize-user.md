


# Authorize the User

Once you've created the `code_verifier` and the `code_challenge`, you'll need to get the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions.

To authorize the user, your application must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) (which includes the `code_challenge` you generated in the previous step, as well as the method you used to generate the `code_challenge`). Your URL should follow this format:

```text
https://${account.namespace}/authorize?
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile
```

Note that the sample Authorization URL doesn't include an `audience` parameter. In this scenario, your app needs to authenticate only the user, not access an API, so we omit `audience`.

For details on the request parameters, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#3-get-the-user-s-authorization).

As an example, your HTML snippet for your authorization URL might look like the following:

```html
<a href="https://${account.namespace}/authorize?
  scope=openid%20profile&
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=https://${account.namespace}/mobile">
  Sign In
</a>
```

If all goes well, you'll receive an `HTTP 302` response:

```text
HTTP/1.1 302 Found
Location: https://${account.namespace}/mobile?code=AUTHORIZATION_CODE
```

Note the authorization code included at the end of the included URL.
