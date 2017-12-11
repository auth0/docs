
### Configure Auth0 for Embedded Login

Lock v11 and Auth0.js v9 use cross-origin calls inside hidden iframes to perform authentication. To make sure this can be done securely, the Auth0 sever needs to know the domains where you will be hosting your applications.

Add the domain to the **Allowed Web Origins** field. You can find this field in the [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)

If you enable [Custom Domain Names](/custom-domains) and the top level domain for your website is the same as the custom domain for the Auth0 tenant, Lock will work without any further configuration. Otherwise, you will need to configure your Auth0 client to use [Cross Origin Authentication](/cross-origin-authentication). 
