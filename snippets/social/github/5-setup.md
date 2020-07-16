### Set up your app in GitHub

Set up an app in GitHub. During this process, GitHub will generate a **Client ID** and **Client Secret** for your application; make note of these.

1. Log in to [GitHub](https://github.com/) and go to **OAuth applications** in your [developer settings](https://github.com/settings/developers). 
2. Click [Register a new application](https://github.com/settings/applications/new).
3. Complete the form including the information:

| Field | Description |
| - | - |
| Homepage URL | `https://${account.namespace}` |
| Authorization callback URL | `https://${account.namespace}/login/callback` |

<%= include('../../../articles/connections/_find-auth0-domain-redirects.md') %>

4. Click **Register application** to proceed. Your app's **Client ID** and **Client Secret** will be displayed.