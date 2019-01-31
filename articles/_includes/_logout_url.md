### Configure Logout URLs

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the `returnTo` query parameter.

You need to whitelist the logout URL for your app in the **Allowed Logout URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If you do not set a logout URL, your users will be unable to log out of the application and will be presented with an error.