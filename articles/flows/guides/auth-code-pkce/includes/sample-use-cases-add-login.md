## Sample Use Cases

### Basic Authentication Request

This example shows the most basic request you can make when authorizing the user in step 1. It displays the Auth0 login screen and allows the user to sign in with any of your configured connections:

```text
https://${account.namespace}/authorize?
    response_type=code&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    client_id=${account.clientId}&
    redirect_uri=YOUR_CALLBACK_URL&
    scope=openid
```

Now, when you [request tokens](/flows/guides/auth-code-pkce/add-login-auth-code-pkce#request-tokens), your ID Token will contain the most basic claims. When you [decode the ID Token](/tokens/id-tokens#id-token-payload), it will look similar to:

```json
{
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt9...",
  "exp": 1478112929,
  "iat": 1478076929
}
```

### Request the User's Name and Profile Picture

In addition to the usual user authentication, this example shows how to request additional user details, such as name and picture.

To request the user's name and picture, you need to add the appropriate scopes when authorizing the user in step 3:

```text
https://${account.namespace}/authorize?
    response_type=code&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    client_id=${account.clientId}&
    redirect_uri=YOUR_CALLBACK_URL&
    scope=openid%20name%20picture&
    state=STATE
```

Now, when you [request tokens](/flows/guides/auth-code-pkce/add-login-auth-code-pkce#request-tokens), your ID Token will contain the requested name and picture claims. When you [decode the ID Token](/tokens/id-tokens#id-token-payload), it will look similar to:

```json
{
  "name": "auth0user@...",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

### Request a User Log In with GitHub

In addition to the usual user authentication, this example shows how to send users directly to a social identity provider, such as GitHub. For this example to work, you will first need to [configure the appropriate connection in the Auth0 Dashboard](${manage_url}/#/connections/social) and get the connection name from the **Settings** tab.

To send users directly to the GitHub login screen, you need to pass the `connection` parameter and set its value to the connection name (in this case, `github`) when authorizing the user in step 3:

```text
https://${account.namespace}/authorize?
    response_type=code&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    client_id=${account.clientId}&
    redirect_uri=YOUR_CALLBACK_URL&
    scope=openid%20name%20picture&
    state=STATE&
    connection=github
```

Now, when you [request tokens](/flows/guides/auth-code-pkce/add-login-auth-code-pkce#request-tokens), your ID Token will contain a `sub` claim with the user's unique ID returned from GitHub. When you [decode the ID Token](/tokens/id-tokens#id-token-payload), it will look similar to:

```json
{
  "name": "John Smith",
  "picture": "https://avatars.example.com",
  "email": "jsmith@...",
  "email_verified": true,
  "iss": "https://auth0user.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
```

For a list of possible connections, see [Identity Providers Supported by Auth0](/identityproviders).
