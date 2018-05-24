---
description: How to enable or disable Hooks using the Management Dashboard
beta: true
tags:
    - hooks
    - dashboard
---

# Enable or Disable Existing Hooks Using the Dashboard

You can use the Management Dashboard to enable/disable Hooks. Each extensibility point may be associated with **zero** or **one** active Hook.

::: note
When creating new Hooks, Auth0 enables your Hook for that extensibility point if there are no other Hooks associated with that point. In any other circumstance, Auth0 does *not* enable your new Hook.
:::

## Enable a Hook

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks) and find the extensibility point for which you want an enabled Hook.
2. Immediately under the name and description of the extensibility point, click on the dropdown box that lists all of the point's associated Hooks.

  ![List of Hooks for a Point](/media/articles/hooks/select-hook-to-enable.png)

3. Select the Hook you want to enable.
4. Confirm your selection by clicking **YES, ENABLE HOOK**.

  ![Confirm Hook to Enable](/media/articles/hooks/confirm-enable-hook.png)

You will now see a green dot next to the name of the Hook, indicating that it's enabled.

## Disable a Hook

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks) and find the extensibility point for which you want an enabled Hook.
2. Immediately under the name and description of the extensibility point, click on the dropdown box that lists all of the point's associated Hooks.

  ![List of Hooks for a Point](/media/articles/hooks/select-hook-to-enable.png)

3. Select **None**.
4. Confirm your selection by clicking **YES, DISABLE HOOK**.

  ![Confirm Hook to Disable](/media/articles/hooks/disable-hook.png)