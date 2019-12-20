<!-- markdownlint-disable MD002 MD041 -->

### Verify JWT Token Signature setting

Json Web Tokens should be signed using the RS256 signing algorithm where possible, as [it provides enchanced security over HS256](https://auth0.com/docs/tokens/concepts/signing-algorithms#our-recommendation).

This setting is the default, but if you are [running into errors](https://auth0.com/docs/errors/libraries/auth0-js/invalid-token#parsing-an-hs256-signed-id-token-without-an-access-token) you can verify your settings by clicking on **Show Advanced Settings** at the bottom of your Auth0 client configuration. Then, click the **OAuth** link to show the signature algorithm configuration. **JsonWebToken Signature Algorithm** should be set to **RS256**, and the **OIDC Conformant** setting should be enabled.

![Token Signature Algorithm configuration](/media/articles/applications/token-signature-algorithm.png)
