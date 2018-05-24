---
description: How to create new Hooks using the Management Dashboard
beta: true
tags:
    - hooks
    - dashboard
---

# Create a New Hook Using the Dashboard

You can create new Hooks using the Auth0 Management Dashboard.

![Management Dashboard Hooks Page](/media/articles/hooks/hooks-dashboard.png)

## Create a New Hook

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks). You can create new Hooks in one of two ways:

    * Clicking on the **+ Create New Hook** button at the top right of the Hooks page.
    * Finding the extensibility hook you want to work with and then clicking the **Create New Hook** link below.

2. On the *New Hook* pop-up window, provide the requested information:

  ![Create Hook Dialog](/media/articles/hooks/create-new-hook.png)

  * **Name**: The name for your new Hook
  * **Hook**: The extensibility point associated with your Hook

  Click **Create** to create your Hook.

  At this point, you will see your newly-created Hook listed under its associated extensibility point.

:::panel New Hooks
For any given extensibility point, you may create multiple Hooks. However, you may only have **one** Hook enabled per extensibility point at any given time.

Auth0 automatically enables the first Hook you create for an extensibility point, and any subsequent Hooks for that point are created in a disabled state. As such, you must explicitly activate subsequent Hooks.
:::

![List of Hooks](/media/articles/hooks/hooks-list.png)

## Delete an Existing Hook

1. In the Hooks page of the Management Dashboard, find the Hook you want to edit.
2. Click the **Gear** icon next to your Hook.
3. Click **Delete**.
4. Confirm that you want to delete your Hook by clicking **YES, DELETE HOOK**.

![Delete Hook Confirmation](/media/articles/hooks/delete-hook.png)