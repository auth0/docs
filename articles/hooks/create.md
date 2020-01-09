---
description: Learn how to create new Hooks using the Dashboard or Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Create a New Hook

You can create multiple Hooks for any given extensibility point. However, you may only have **one** Hook enabled per extensibility point at a time.

## Create Hooks using the Dashboard

::: note
Hooks utilize the Webtask Editor. For additional information on how to work with the Webtask Editor, you can review its docs [here](https://webtask.io/docs/editor/).
:::

Auth0 automatically enables the first Hook you create for an extensibility point. Any subsequent Hooks created for that point are in a disabled state. As such, you must explicitly enable subsequent Hooks. 

To create new Hooks on the Dashboard:

1. Navigate to [the Hooks page of the Dashboard](${manage_url}/#/hooks). Create new Hooks in one of two ways:

    * Clicking on the **+ Create New Hook** button at the top right of the Hooks page.
    * Finding the extensibility hook you want to work with and then clicking the **Create New Hook** link below.

2. On the *New Hook* pop-up window, provide the requested information:

  ![Create Hook Dialog](/media/articles/hooks/create-new-hook.png)

  * **Name**: The name for the new Hook
  * **Hook**: The extensibility point associated with the Hook

  Click **Create** to create the Hook.

  At this point, you will see the newly-created Hook listed under its associated extensibility point.

![List of Hooks](/media/articles/hooks/hooks-list.png)

## Create Hooks using the command-line interface

The Auth0 Command-Line Interface (CLI) allows you to create Hooks associated with specific extensibility points within the Auth0 platform. By default, the Auth0 CLI creates new Hooks in a disabled state.

<%= include('./_includes/set-up-webtask-cli') %>

Rather than beginning from scratch, scaffold the sample code for an Auth0 hook.

```bash
auth0 scaffold -t pre-user-registration > file.js
```

Create the hook:

```bash
auth0 create -t pre-user-registration --name my-extension-1 -p auth0-default file.js`
```

### Provision secrets to new Hooks

Optionally, you can add secrets (such as Twilio Keys or database connection strings) to new Hooks by adding `--secret KEY=VALUE` to the *Create* command. The information you attach will be encrypted, and it can only be decrypted by the Webtask server.

At this point, you have created a new, disabled Hook using the `pre-user-registration` [extensibility point](/hooks/concepts/overview-extensibility-points). You can repeat this process and create Hooks for any of the other extensibility points.