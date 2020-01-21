---
description: Learn how to update Hooks using the Dashboard or Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Update Hooks

You can update existing Hooks using either the Dashboard or the command-line interface.

## Update Hooks using the Dashboard

With the Dashboard, update the code for the existing Hooks using the [Webtask Editor](https://webtask.io/docs/editor): 

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks) and find the Hook you want to edit.
2. Click the **Pencil and Paper** icon to the right of the Hook to open the Webtask Editor.

  ![List of Hooks](/media/articles/hooks/hooks-list.png)

3. Edit the Hook using the Webtask Editor.

  ![Webtask Editor](/media/articles/hooks/webtask-editor.png)

### Rename Hooks

To rename a Hook using the Dashboard:

1. On [the Hooks page of the Dashboard](${manage_url}/#/hooks), find the Hook you want to edit.
2. Click the **Gear** icon next to the Hook.
3. Click **Rename**. You will see a dialog pop up, asking you for the **Current Name** of the Hook, as well as the **New Name** you want to use. Click **Rename** when you have populated both values.

![Rename Hooks prompt](/media/articles/hooks/rename-hook.png)

## Update Hooks using the command-line interface

The Auth0 Command-Line Interface (CLI) allows you to update existing Hooks associated with specific extensibility points within the Auth0 platform.

<%= include('./_includes/set-up-webtask-cli') %>

Edit the code of the Hook using the [Webtask Editor](https://webtask.io/docs/editor). The following command will open up the code for the Hook in the Webtask Editor window:

```bash
auth0 edit my-extension-1
```

![Webtask Editor](/media/articles/hooks/webtask-editor.png)

If the CLI cannot open the Editor window automatically, copy and paste the provided link into a web browser.

### Update secrets

If you [provisioned a secret to the Hook](/hooks/create#provision-secrets-to-new-hooks) during creation, you can update the secret by clicking on the **wrench** at the top left of the Webtask Editor window and selecting **Secrets** from the dropdown menu.

![Webtask Editor Secrets pane](/media/articles/hooks/webtask-editor-secrets.png)

To the right, you will see a Secrets window where you can add key/value pairs. These pairs can then be accessed in the code in the `context.webtask.secrets` object (e.g., `context.webtask.secrets.SECRET_NAME`).
