---
description: How to edit Hooks using the Auth0 Command-Line Interfance
---

# Edit Existing Hooks Using the Auth0 Command-Line Interface

:::panel-info Profile Name
All of the examples on this page use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli` and can be obtained from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

You can edit the code of your Hook using the Webtask Editor. The following command will open up the code for your Hook in the Webtask Editor window:

  `auth0 edit my-extension-1`

  ![Webtask Editor](/media/articles/hooks/webtask-editor.png)

If the CLI cannot open the Editor window automatically, you can copy and paste the provided link into your web browser.

## Manipulate Secrets

If you [provisioned a secret to your Hook](/hooks/cli/create-delete#provision-secrets-to-new-hooks) during creation, you can manipulate it by clicking on the **wrench** at the top left of the Webtask Editor window and selecting **Secrets** from the dropdown menu.

  ![Webtask Editor Secrets pane](/media/articles/hooks/webtask-editor-secrets.png)
