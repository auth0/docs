### Configure Auth0 for Embedded Login

<% if (library  == 'lock') { %>
Lock v11 use cross-origin calls inside hidden iframes to perform authentication. To make sure this can be done securely, Auth0 needs to know the domains where you will be hosting your applications.
<% } else { %>
If you implement a custom login dialog with Auth0.js v9, it will use cross-origin calls inside hidden iframes to perform authentication. To make sure this can be done securely, Auth0 needs to know the domains where you will be hosting your applications.
<% } %>

 { library: 'jQuery', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-jquery-samples/tree/embedded-login/01-Embedded-Login'})


Add the domain to the **Allowed Web Origins** field. You can find this field in the [Client Settings](${manage_url}/#/clients/${account.clientId}/settings). 

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)

If you enable [Custom Domain Names](/custom-domains) and the top level domain for your website is the same as the custom domain for the Auth0 tenant, Lock will work without any further configuration. Otherwise, you will need to configure your Auth0 client to use [Cross Origin Authentication](/cross-origin-authentication). 
