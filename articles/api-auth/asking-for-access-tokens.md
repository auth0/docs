#### Asking for Access Tokens
1. Consumers should perform a `POST` operation to:

  Endpoint:
  ```
  {your-tenant-name}.auth0.com/oauth/token
  ```

  Payload:
  ```
  {
	audience: "{YOUR_API_IDENTIFIER}",
	grant_type: "client_credentials",
	client_id: "{APP_CLIENT_ID}",
	client_secret: "{APP_CLIENT_SECRET}"
  }
  ```
  The response will be a signed JWT token with

  ```
  {
    "iss": "https://{your-tenant-name}.auth0.com/",
    "sub": "{APP_CLIENT_ID}@clients",
    "aud": "{YOUR_API_IDENTIFIER}",
	  ...
    "scope": ""
  }
  ```

  > *NOTE:* If you executed the setup steps in the Auth0 Dashboard you will notice that the `scope` property is blank. At this point we don't provide support for custom scopes in the Auth0 Dashboard. You can still use this token to authorize access to the the parts of your API that don't require elevated permissions. If you would like to add scopes for your API you can follow [a few extra steps](#adding-scopes).
