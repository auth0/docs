## Ensure Your Application is Configured Correctly

Before using the Auth0 Application, you will need to ensure that you have set the __JsonWebToken Signature Algorithm__ to `RS256` and have enabled the __OIDC Conformant__ switch for your Application:

1. Go to [Dashboard > Applications](https://manage.auth0.com/#/applications)
1. Select your Application
1. Go to __Settings__
1. Click on __Show Advanced Settings__
1. Click on the __OAuth__ tab in Advanced Settings
1. Change the __JsonWebToken Signature Algorithm__ to `RS256`
1. Ensure that the __OIDC Conformant__ switch is enabled
1. Click __Save Changes__

::: warning
Please note that altering the signing algorithm for your application will immediately change the way your user's tokens are signed. This means that if you have already implemented JWT verification for your application somewhere, your tokens will not be verifiable until you update the logic to account for the new signing algorithm.
:::
