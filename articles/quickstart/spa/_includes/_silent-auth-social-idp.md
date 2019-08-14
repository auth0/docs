### Restoring Login State with Social Providers

Users who are logged in with **username/password** will be silently reauthenticated automatically when the application reloads. No further action is needed for this type of login.

If you are using the [classic Universal Login experience](https://auth0.com/docs/universal-login/classic) and would like users to authenticate using **[social identity providers](https://auth0.com/docs/connections#social)** (such as Google, Apple, Facebook, etc.), then you will need to configure those connections in your [Auth0 Dashboard](https://manage.auth0.com/dashboard).

In the navigation menu, choose **Connections** - **Social**, and select the social connection you’d like to support. In the connection’s settings, click “How to obtain a Client ID?“  and follow the instructions to set up your own ID and secret.

If you are using the [new Universal Login experience](https://auth0.com/docs/universal-login/new), the default enabled social connections will silently reauthenticate without additional configuration. However, you should still set up your own keys and avoid using [default Auth0 development keys](https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys) in a production app.