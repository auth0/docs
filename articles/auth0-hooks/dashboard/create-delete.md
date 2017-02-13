---
description: How to create new Hooks using the Management Dashboard
---

# Create a New Hook Using the Management Dashboard

You can create new Hooks using the Auth0 Management Dashboard.

![Management Dashboard Hooks Page](/media/articles/auth0-hooks/hooks-dashboard.png)

## Create a New Hook

1. Navigate to the Hooks page of the Management Dashboard. You can create new Hooks in one of two ways:

    * Clicking on the **+ Create New Hook** button at the top right of the Hooks page.
    * Finding the extensibility hook you want to work with and then clicking the **Create New Hook** link below.

2. On the *New Hook* pop-up window, provide the requested information:

  ![Create Hook Dialog](/media/articles/auth0-hooks/create-new-hook.png)

  * **Name**: The name for your new Hook
  * **Hook**: The extensibility point associated with your Hook

  Click **Create** to create your Hook.

  At this point, you will see your newly-created Hook listed under its associated extensibility point.

**Note**: Auth0 enables your Hook for that extensibility point if there are no other Hooks associated with that point. In any other circumstance, Auth0 does *not* enable your new Hook.

![List of Hooks](/media/articles/auth0-hooks/hooks-list.png)

## Delete an Existing Hook

1. In the Hooks page of the Management Dashboard, find the Hook you want to edit.
2. Click the **Gear** icon next to your Hook.
3. Click **Delete**.
4. Confirm that you want to delete your Hook by clicking **YES, DELETE HOOK**.

![Delete Hook Confirmation](/media/articles/auth0-hooks/delete-hook.png)
