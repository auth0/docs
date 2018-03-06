### Configure Your Custom Domain

::: note
Make sure that your application changes are made prior to setting up Custom Domains in your application, as the older versions of ${library} will not work with a custom domain set at initialization, and will return a 404 error.
:::

Set up your [Custom Domain](/custom-domains). Once the custom domain is set up, remember to make the following changes in your Lock instantiation:

1. Use the custom domain when instantiating Lock.

```
var lock = new Auth0Lock('your-client-id', 'login.northwind.com', options);
```

2. Set the `configurationBaseUrl` option to `https://cdn.auth0.com`.

```
var options = {
	configurationBaseUrl: 'https://cdn.auth0.com'
}
```

::: note
The CDN URL varies by region. For regions outside of the US, use `https://cdn.{region}.auth0.com`.
:::

#### Management Client

If you intend to use the Auth0.js `auth0.Management` to get user information or perform account linking operations (see the Auth0.js documentation on [user management](/libraries/auth0js/v9#user-management) for more information on using the Management API in Auth0.js), you will need to instantiate a new Auth0 object with the Auth0 domain rather than your custom domain. The Management API only accepts Auth0 domains.