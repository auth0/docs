### Restoring Login State with Social Providers

Users who are logged in with **username/password** will be silently reauthenticated automatically when the application reloads. No further action is needed for this type of login.

If you are using the <a href="https://auth0.com/docs/universal-login/classic" target="_blank" rel="noreferrer">classic Universal Login experience</a> and would like users to authenticate using <a href="https://auth0.com/docs/connections#social" target="_blank" rel="noreferrer">**social identity providers**</a> (such as Google, Apple, Facebook, etc.), then you will need to configure those connections in your <a href="https://manage.auth0.com/dashboard" target="_blank" rel="noreferrer">Auth0 Dashboard</a>.

In the navigation menu, choose **Connections** - **Social**, and select the social connection you’d like to support. In the connection’s settings, click “How to obtain a Client ID?“  and follow the instructions to set up your own ID and secret.

If you are using the <a href="https://auth0.com/docs/universal-login/new" target="_blank" rel="noreferrer">new Universal Login experience</a>, the default enabled social connections will silently reauthenticate without additional configuration. However, you should still set up your own keys and avoid using <a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys" target="_blank" rel="noreferrer">default Auth0 development keys</a> in a production app.