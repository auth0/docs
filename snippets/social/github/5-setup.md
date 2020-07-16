### Set up your app in GitHub

Set up an app in GitHub. During this process, GitHub will generate a **Client ID** and **Client Secret** for your application; make note of these.

1. Log in to [GitHub](https://github.com/) and go to **OAuth applications** in your [developer settings](https://github.com/settings/developers). 
2. Click [Register a new application](https://github.com/settings/applications/new).
3. Complete the form including the information:

| Field | Description |
| - | - |
| Homepage URL | `https://${account.namespace}` |
| Authorization callback URL | `https://${account.namespace}/login/callback` |

::: panel Find your Auth0 domain name for redirects
If your Auth0 domain name is not shown above and you are not using our custom domains feature, your domain name is your tenant name, plus `.auth0.com`. For example, if your tenant name were `exampleco-enterprises`, your Auth0 domain name would be `exampleco-enterprises.auth0.com` and your redirect URI would be `https://exampleco-enterprises.auth0.com/login/callback`.

If you are using [custom domains](/custom-domains), your <dfn data-key="callback">redirect URI</dfn> will have the following format: `https://<YOUR CUSTOM DOMAIN>/login/callback`.
:::

4. Click **Register application** to proceed. Your app's **Client ID** and **Client Secret** will be displayed.