---
description: How to edit Hooks using the Auth0 Command-Line Interfance
beta: true
---

# Edit Existing Hooks Using the Auth0 Command-Line Interface

::: note
All of the examples on this page use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli` and can be obtained from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

You can edit the code of your Hook using the [Webtask Editor](https://webtask.io/docs/editor). The following command will open up the code for your Hook in the Webtask Editor window:

  `auth0 edit my-extension-1`

  ![Webtask Editor](/media/articles/hooks/webtask-editor.png)

If the CLI cannot open the Editor window automatically, you can copy and paste the provided link into your web browser.

::: note
Please see the [Webtask docs](https://webtask.io/docs/editor) for detailed information on using the Webtask Editor.
:::

## Test Your Hook

The Webtask Editor allows you to test your Hook using the Runner. By default, the Runner is hidden until you choose to display it by clicking its icon in the top left of the Editor.

![](/media/articles/hooks/webtask-runner.png)

The Runner allows you to simulate an Auth0 call to your Hook and provides the basic parameters needed to complete the call. You can edit the provided schema as necessary.

![](/media/articles/hooks/webtask-runner2.png)

When you're ready, click **Run** to proceed. You will be presented with the results of the call.

![](/media/articles/hooks/webtask-runner3.png)

If you run multiple tests, the Runner keeps track of the calls you've made in its *History* section. For each result, you can see specific details about the call by clicking **>** to the right of the call result.

![](/media/articles/hooks/webtask-runner4.png)

:::panel Test Runner Schema
If you created your Hook early on during the beta testing period, your Webtask Editor/Test Runner window might not populate with the schema required to successfully use the Test Runner. If that is the case, you'll need to save the Hook's code, delete the Hook, and create a new Hook using your existing code.
:::

## Manipulate Secrets

If you [provisioned a secret to your Hook](/hooks/cli/create-delete#provision-secrets-to-new-hooks) during creation, you can manipulate it by clicking on the **wrench** at the top left of the Webtask Editor window and selecting **Secrets** from the dropdown menu.

  ![Webtask Editor Secrets pane](/media/articles/hooks/webtask-editor-secrets.png)