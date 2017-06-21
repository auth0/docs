## Ensure Your Client is Configured Correctly

Before using the Auth0 OIDC Client, you will need to ensure that you have set the __JsonWebToken Signature Algorithm__ to `RS256` and have enabled the __OIDC Conformant__ switch for your Client:

1. Go to [Dashboard > Clients](https://manage.auth0.com/#/clients)
1. Select your Client
1. Go to __Settings__
1. Click on __Show Advanced Settings__
1. Click on the __OAuth__ tab in Advanced Settings
1. Change the __JsonWebToken Signature Algorithm__ to `RS256`
1. Ensure that the __OIDC Conformant__ switch is enabled
1. Click __Save Changes__

::: warning
Please note that altering the signing algorithm for your client will immediately change the way your user's tokens are signed. This means that if you have already implemented JWT verification for your client somewhere, your tokens will not be verifiable until you update the logic to account for the new signing algorithm.
:::
