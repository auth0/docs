---
description: How to work with Hooks using the Auth0 CLI
---

# Create New Hooks Using the Auth0 Command-Line Interface (CLI)

Using the Auth0 CLI, you can create new Hooks, as well as manage or delete existing Hooks. You can also gather real-time data about your Hooks.

## Create a New Hook

1. Rather than beginning from scratch, you can scaffold the sample code for an Auth0 hook.

  `auth0 scaffold -t pre-user-registration > file.js`

2. Create the hook:

  `auth0 create -t pre-user-registration --name my-extension-1 -p tj-default file.js`

At this point, you have created a new, disabled Hook using the `pre-user-registration` [extensibility point](/auth0-hooks/extensibility-points). You can repeat this process and create Hooks for any of the other extensibility points.

## Manage Existing Hooks

In addition to using the Auth0 CLI to create your Hooks, you can use it to edit, enable/disable, or delete your Hooks.

### Edit Your Hook

The following command will open up the code for your Hook in the Webtask Editor window, where you can make changes.

  `auth0 edit my-extension-1`

  ![Webtask Editor](/media/articles/auth0-hooks/cli/webtask-editor.png)

  If the CLI cannot open the Editor window automatically, you can copy and paste the provided link into your web browser.

### Enable Your Hook

By default, the Auth0 CLI creates new Hooks in a disabled state. The following command will enable your Hook:

  `auth0 enable my-extension-1 -p tj-default`

By enabling a given Hook, the Auth0 CLI disables all other Hooks associated with the same extensibility point.

### Disable Your Hook

The following command disables your Hook:

  `auth0 disable my-extension-1 -p tj-default`

### Delete Your Hook

The following command deletes your Hook:

  `auth0 rm my-extension-1 -p tj-default`

## Gather Information About Your Hooks

You can use the Auth0 CLI to gather information about your Hooks:

* To get a list of Hooks for a specific extensibility point:
  `auth0 ls -t pre-user-registration -p tj-default`
* To get a list of Hooks associated with your Auth0 account:
  `auth0 ls -p tj-default`
* To access logs containing real-time data on your Hooks:
  `auth0 logs -p tj-default`
