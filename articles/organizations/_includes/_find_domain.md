::: panel Find your Auth0 domain
If your Auth0 domain is your tenant name, your regional subdomain (unless your tenant is in the US region and was created before June 2020), plus `.auth0.com`. For example, if your tenant name were `travel0`, your Auth0 domain name would be `travel0.us.auth0.com` and your callback URL would be `https://travel0.us.auth0.com/login/callback`. (If your tenant is in the US and was created before June 2020, then your domain name would be `https://travel0.auth0.com`.)

If you are using custom domains, your redirect URI will have the following format: `https://<YOUR CUSTOM DOMAIN>/login/callback`.
:::
