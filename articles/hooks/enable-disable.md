---
description: Learn how to enable and disable Hooks using the Dashboard or Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Enable/Disable Hooks

For each extensibility point, you may have either no associated Hooks enabled or **one** associated Hook enabled.

## Enable/Disable Hooks using the Dashboard

The Auth0 Management Dashboard provides a visual interface for working with Hooks. With the Dashboard, you can enable/disable Hooks that you've created.

Each extensibility point may be associated with **zero** or **one** active Hook.

::: note
Hooks utilize the Webtask Editor. For additional information on how to work with the Webtask Editor, you can review its docs [here](https://webtask.io/docs/editor/).
:::

When creating new Hooks, Auth0 enables the Hook for that extensibility point if there are no other Hooks associated with that point. In any other circumstance, Auth0 does *not* enable the new Hook.

### Enable Hooks

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks) and find the extensibility point for which you want an enabled Hook.
2. Immediately under the name and description of the extensibility point, click on the dropdown box that lists all of the point's associated Hooks.

  ![List of Hooks for a Point](/media/articles/hooks/select-hook-to-enable.png)

3. Select the Hook you want to enable.
4. Confirm your selection by clicking **YES, ENABLE HOOK**.

  ![Confirm Hook to Enable](/media/articles/hooks/confirm-enable-hook.png)

You will now see a green dot next to the name of the Hook, indicating that it's enabled.

### Disable Hooks

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks) and find the extensibility point for which you want an enabled Hook.
2. Immediately under the name and description of the extensibility point, click on the dropdown box that lists all of the point's associated Hooks.

  ![List of Hooks for a Point](/media/articles/hooks/select-hook-to-enable.png)

3. Select **None**.
4. Confirm your selection by clicking **YES, DISABLE HOOK**.

  ![Confirm Hook to Disable](/media/articles/hooks/disable-hook.png)

## Enable/Disable Hooks using the command-line interface

The Auth0 Command-Line Interface (CLI) allows you to enable or disable existing Hooks associated with specific extensibility points within the Auth0 platform. By default, the Auth0 CLI creates new Hooks in a disabled state.

<%= include('./_includes/set-up-webtask-cli') %>

### Enable Hooks

The following command enables the Hook:

```bash
auth0 enable my-extension-1 -p auth0-default
```

By enabling a given Hook, the Auth0 CLI disables all other Hooks associated with the same extensibility point.

### Disable Hooks

The following command disables the Hook:

```bash
auth0 disable my-extension-1 -p auth0-default
```
