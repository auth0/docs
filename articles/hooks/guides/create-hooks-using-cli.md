---
description: How to create Hooks using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Create Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to create Hooks associated with specific extensibility points within the Auth0 platform.

::: warning
Tenants created after **July 16, 2018** will not have access to the underlying Webtask Sandbox via the Webtask CLI. Please contact [Auth0](https://auth0.com/?contact=true) to request access.
:::

## Prerequisite: set up the CLI

Before proceeding, you'll need to set up the Webtask CLI. You can find instructions for installing and configuring the Webtask CLI in the [Dashboard > Webtask page](${manage_url}/#/account/webtasks). 

The `wt-cli` package also includes the `auth0` binary, allowing you to use the Auth0 CLI.

![Install Webtasks Instructions](/media/articles/hooks/mgmt-dashboard-webtasks.png)

::: note
The Auth0 CLI examples use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli`, and you can obtain it from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

## Create a new Hook

Rather than beginning from scratch, you can scaffold the sample code for an Auth0 hook.

`auth0 scaffold -t pre-user-registration > file.js`

Create the hook:

`auth0 create -t pre-user-registration --name my-extension-1 -p auth0-default file.js`

### Provision secrets to new Hooks

Optionally, you can add provision secrets (such as Twilio Keys or database connection strings) to your new Hook by adding `--secret KEY=VALUE` to your *Create* command. The information you attach will be encrypted, and it can only be decrypted by the Webtask server.

At this point, you have created a new, disabled Hook using the `pre-user-registration` [extensibility point](/hooks/concepts/overview-extensibility-points). You can repeat this process and create Hooks for any of the other extensibility points.