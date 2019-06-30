---
description: How to edit Hooks using the Management Dashboard
beta: true
topics:
    - hooks
    - dashboard
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Edit Hooks Using the Dashboard

The Auth0 Management Dashboard provides a visual interface for working with Hooks. With the Dashboard, edit the code for the existing Hooks using the [Webtask Editor](https://webtask.io/docs/editor). 

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks) and find the Hook you want to edit.
2. Click the **Pencil and Paper** icon to the right of the Hook to open the Webtask Editor.

  ![List of Hooks](/media/articles/hooks/hooks-list.png)

3. Edit the Hook using the Webtask Editor.

  ![Webtask Editor](/media/articles/hooks/webtask-editor.png)

## Test Hooks

The Webtask Editor allows you to test the Hook using the Runner. By default, the Runner is hidden until you choose to display it by clicking its icon in the top left of the Editor.

![](/media/articles/hooks/webtask-runner.png)

The Runner allows you to simulate an Auth0 call to the Hook and provides the basic parameters needed to complete the call. Edit the provided schema as necessary.

![](/media/articles/hooks/webtask-runner2.png)

When you're ready, click **Run** to proceed. You will be presented with the results of the call.

![](/media/articles/hooks/webtask-runner3.png)

If you run multiple tests, the Runner keeps track of the calls you've made in its *History* section. For each result, click **>** to the right of the call result to see specific details about the call.

![](/media/articles/hooks/webtask-runner4.png)

:::panel Test Runner Schema
If you created the Hook early on during the beta testing period, the Webtask Editor/Test Runner window might not populate with the schema required to successfully use the Test Runner. If that is the case, you'll need to save the Hook's code, delete the Hook, and create a new Hook using the existing code.
:::

## Rename Hooks

You can rename the Hook using the Management Dashboard.

1. In [the Hooks page of the Dashboard](${manage_url}/#/hooks), find the Hook you want to edit.
2. Click the **Gear** icon next to the Hook.
3. Click **Rename**. You will see a dialog pop up, asking you for the **Current Name** of the Hook, as well as the **New Name** you want to use. Click **Rename** when you have populated both values.

![Rename Hooks prompt](/media/articles/hooks/rename-hook.png)