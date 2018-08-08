### Configure your Auth0 application for embedded login

When implementing embedded login, ${library} will use cross-origin calls inside hidden iframes to perform authentication. To make sure this can be done securely, Auth0 needs to know the domains where you will be hosting your applications.

Add the domain to the **Allowed Web Origins** field. You can find this field in the [Application Settings](${manage_url}/#/application/${account.clientId}/settings) area of your Dashboard.

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)
