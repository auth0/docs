::: panel Upgrading to Deploy CLI Tool v4
Upgrading to Deploy CLI Tool v4 requires that the **auth0-deploy-cli-extension** application be granted the following additional permissions (scopes) for the Auth0 Management API: `create:hooks`, `read:hooks`, `update:hooks`, and `delete:hooks`. Upgrading the **Auth0 Deploy CLI** extension will take care of this automatically. To upgrade the extension:

1. Navigate to the [Extensions](${manage_url}/#/extensions) page in the [Auth0 Dashboard](${manage_url}), and click the **Installed Extensions** tab. 

2. Locate **Auth0 Deploy CLI**, click **Upgrade**, and confirm. Wait for the upgrade to complete.

If necessary, you can check and [manually modify required scopes](/extensions/deploy-cli/guides/create-deploy-cli-application-manually#modify-deploy-cli-application-scopes).
:::