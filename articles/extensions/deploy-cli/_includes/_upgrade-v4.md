::: panel Upgrading to Deploy CLI Tool v4
Upgrading to Deploy CLI Tool v4 requires you to update your Deploy CLI Tool Application to grant the following permissions (scopes) to the Auth0 Management API: `create:hooks`, `read:hooks`, `update:hooks`, and `delete:hooks`. To do so:

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}), and click the **auth0-deploy-cli-extension** application name. 
2. Click the **APIs** tab, and expand the **Auth0 Management API** section.
3. In **Permissions**, select `create:hooks`, `read:hooks`, `update:hooks`, and `delete:hooks`, then click **Update**.
:::