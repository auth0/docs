---
description: How to create new Hooks using the Management Dashboard
beta: true
topics:
    - hooks
    - dashboard
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Create a New Hook Using the Dashboard

The Auth0 Management Dashboard provides a visual interface for working with Hooks. With the Dashboard, you can create new Hooks.

![Management Dashboard Hooks Page](/media/articles/hooks/hooks-dashboard.png)

::: note
Hooks utilize the Webtask Editor. For additional information on how to work with the Webtask Editor, you can review its docs [here](https://webtask.io/docs/editor/).
:::

## Create a new Hook

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks). Create new Hooks in one of two ways:

    * Clicking on the **+ Create New Hook** button at the top right of the Hooks page.
    * Finding the extensibility hook you want to work with and then clicking the **Create New Hook** link below.

2. On the *New Hook* pop-up window, provide the requested information:

  ![Create Hook Dialog](/media/articles/hooks/create-new-hook.png)

  * **Name**: The name for the new Hook
  * **Hook**: The extensibility point associated with the Hook

  Click **Create** to create the Hook.

  At this point, you will see the newly-created Hook listed under its associated extensibility point.

:::panel New Hooks
For any given extensibility point, you may create multiple Hooks. However, you may only have **one** Hook enabled per extensibility point at any given time.

Auth0 automatically enables the first Hook you create for an extensibility point, and any subsequent Hooks for that point are created in a disabled state. As such, you must explicitly activate subsequent Hooks.
:::

![List of Hooks](/media/articles/hooks/hooks-list.png)