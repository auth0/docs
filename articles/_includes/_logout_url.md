### Configure Logout URL

A logout URL is a URL in your application from where Auth0 will accept requests to log the user out of the authorization server.

You need to whitelist the logout URL for your app in the **Allowed Logout URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If you do not set any logout URL, your users will be unable to log out of the application and will be presented with an error.