## Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after the user has authenticated. 

You need to whitelist the callback URL for your app in the **Callback URLs** field in your [Client Settings](${manage_url}/#/applications/${account.clientId}/settings). If you don't set any callback URL, your users will see a mismatch error when they log in. 
