<!-- markdownlint-disable MD041 -->

A callback URL is a URL in your application where Auth0 redirects the user after they have been authenticated. Auth0 adds parameters to the callback URL, including a token. 

Callback URLs can be manipulated by attackers. For security, add your application's URL to the **Allowed Callback URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). 

If you do not add your application's URL to the list of Allowed Callback URLs, your users will see a mismatch error when they try to log in.

![Callback error](/media/articles/angularjs/callback_error.png)