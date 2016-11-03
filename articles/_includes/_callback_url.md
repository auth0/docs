## Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects to after the user has authenticated. You can whitelist callback URLs for your app in the **Callback URL** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If no callback URLs are set, a mismatch error will be displayed when a user logs in.