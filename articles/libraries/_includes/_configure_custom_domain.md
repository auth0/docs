### Configure your custom domain

1. Ensure that your application updates are made prior to setting up custom domains in your application, as the older versions of ${library} will not work when configured with a custom domain.

2. Set up your [custom domain](/custom-domains) in the Auth0 [Dashboard](${manage_url}/#/tenant).

3. Use the custom domain when instantiating Lock.

```
var lock = new Auth0Lock('${account.clientId}', 'login.your-domain.com', options);
```

4. Set the `configurationBaseUrl` option to `https://cdn.us.auth0.com`.

```
var options = {
  configurationBaseUrl: 'https://cdn.us.auth0.com'
};
```

::: note
The CDN URL varies by region. Tenants created before 11 June 2020 should use `https://cdn.auth0.com` if the region is the United States, or add `eu` or `au` for Europe or Australia. If your tenant was created after 11 June 2020, use `https://cdn.us.auth0.com` if the region is the United States. 
:::

#### Management Application

If you intend to use the Auth0.js `auth0.Management` to get user information or perform account linking operations, you will need to instantiate a new Auth0 object with the Auth0 domain rather than your custom domain. The Management API only accepts Auth0 domains. 

See the Auth0.js documentation on [user management](/libraries/auth0js/v9#user-management) for more information on using the Management API in Auth0.js.