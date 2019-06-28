---
description: How to edit Hooks using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Edit Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to edit existing Hooks associated with specific extensibility points within the Auth0 platform.

<%= include('../_includes/set-up-webtask-cli') %>

Edit the code of the Hook using the [Webtask Editor](https://webtask.io/docs/editor). The following command will open up the code for the Hook in the Webtask Editor window:

  `auth0 edit my-extension-1`

  ![Webtask Editor](/media/articles/hooks/webtask-editor.png)

If the CLI cannot open the Editor window automatically, copy and paste the provided link into a web browser.

::: note
Please see the [Webtask docs](https://webtask.io/docs/editor) for detailed information on using the Webtask Editor.
:::

## Test Hooks

The Webtask Editor allows you to test the Hook using the Runner. By default, the Runner is hidden until you choose to display it by clicking its icon in the top left of the Editor.

![](/media/articles/hooks/webtask-runner.png)

The Runner allows you to simulate an Auth0 call to the Hook and provides the basic parameters needed to complete the call. Edit the provided schema as necessary.

![](/media/articles/hooks/webtask-runner2.png)

When you're ready, click **Run** to proceed. You will be presented with the results of the call.

![](/media/articles/hooks/webtask-runner3.png)

If you run multiple tests, the Runner keeps track of the calls you've made in its *History* section. For each result, See specific details about the call by clicking **>** to the right of the call result.

![](/media/articles/hooks/webtask-runner4.png)

:::panel Test Runner Schema
If you created the Hook early on during the beta testing period, the Webtask Editor/Test Runner window might not populate with the schema required to successfully use the Test Runner. If that is the case, you'll need to save the Hook's code, delete the Hook, and create a new Hook using the existing code.
:::

## Manipulate secrets

If you [provisioned a secret to the Hook](/hooks/cli/create-delete#provision-secrets-to-new-hooks) during creation, manipulate the secret by clicking on the **wrench** at the top left of the Webtask Editor window and selecting **Secrets** from the dropdown menu.

  ![Webtask Editor Secrets pane](/media/articles/hooks/webtask-editor-secrets.png)

To the right, you will see a Secrets window where you can add key/value pairs. These pairs can then be accessed in the code in the `context.webtask.secrets` object (e.g., context.webtask.secrets.SECRET_NAME).