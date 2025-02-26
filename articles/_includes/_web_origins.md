<!-- markdownlint-disable MD002 MD041 -->

### Configure Allowed Web Origins

You need to add the URL for your app to the **Allowed Web Origins** field in your <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a>. If you don't register your application URL here, the application will be unable to silently refresh the authentication tokens and your users will be logged out the next time they visit the application, or refresh the page.