---
description: Learn how to delete Hooks using the Dashboard or Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Delete a Hook

You can delete existing Hooks using either the Dashboard or the command-line interface.

## Delete Hooks using the Dashboard

1. In the Hooks page of the Management Dashboard, find the Hook you want to edit.
2. Click the **Gear** icon next to overview Hook.
3. Click **Delete**.
4. Confirm that you want to delete overview Hook by clicking **YES, DELETE HOOK**.

![Delete Hook Confirmation](/media/articles/hooks/delete-hook.png)

## Delete Hooks using the command-line interface

The Auth0 Command-Line Interface (CLI) allows you to delete Hooks associated with specific extensibility points within the Auth0 platform if you no longer need them.

<%= include('./_includes/set-up-webtask-cli') %>

If you need to delete an existing Hook, use the following command:

```bash
auth0 rm my-extension-1 -p auth0-default
```
