### Configure Allowed Web Origins

You need to whitelist the URL for your app in the **Allowed Web Origins** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If you don't whitelist your application URL, the application will be unable to automatically refresh the authentication tokens and your users will be logged out the next time they visit the application, or refresh the page.
