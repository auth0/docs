### Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. 

You need to whitelist the callback URL for your app in the **Allowed Callback URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If you do not set any callback URL, your users will see a mismatch error when they log in. 