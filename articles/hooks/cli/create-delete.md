---
description: How to create/delete Hooks using the Auth0 Command-Line Interfance
beta: true
---

# Create/Delete Hooks Using the Auth0 Command-Line Interface

::: note
The Auth0 CLI examples use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli`, and you can obtain it from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

Using the Auth0 CLI, you can create new Hooks, as well as manage or delete existing Hooks. You can also gather real-time data about your Hooks.

## Create a New Hook

Rather than beginning from scratch, you can scaffold the sample code for an Auth0 hook.

`auth0 scaffold -t pre-user-registration > file.js`

Create the hook:

`auth0 create -t pre-user-registration --name my-extension-1 -p auth0-default file.js`

### Provision Secrets to New Hooks

Optionally, you can add provision secrets (such as Twilio Keys or database connection strings) to your new Hook by adding `--secret KEY=VALUE` to your *Create* command. The information you attach will be encrypted, and it can only be decrypted by the Webtask server.

At this point, you have created a new, disabled Hook using the `pre-user-registration` [extensibility point](/hooks/extensibility-points). You can repeat this process and create Hooks for any of the other extensibility points.

## Delete an Existing Hook

If you need to delete an existing Hook, you can do so using the following command:

`auth0 rm my-extension-1 -p auth0-default`