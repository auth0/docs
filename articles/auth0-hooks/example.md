---
description: Auth0 Hook example using the `pre-user-registration` extensibility point
---

# Auth0 Hook: Example

The script used in this example assumes that you are creating an Auth0 Hook using the `pre-user-registration` extensibility point using `auth0-default` as the profile name.

:::panel-info Profile Name

You can find your profile name at the end of step 2 of the instructions for setting up the Webtask CLI:

```text
wt init
--container "auth0user"
--url "https://sandbox.it.auth0.com"
--token "TOKEN"
-p "auth0-default"
```
:::

## Create an Auth0 Hook

1. Scaffold the sample code for an Auth0 Hook. The following code scaffolds the sample code for the `pre-user-registration` extensibility point into a file called `file.js`.

  `auth0 scaffold -t pre-user-registration > file.js`

2. Create a new, disabled Auth0 Hook named `my-extension-1`:

  `auth0 create -t pre-user-registration --name my-extension-1 -p auth0-default file.js`

3. Edit the `my-extension-1` code.

  `auth0 edit my-extension-1`

  Running this command opens up the Webtask Editor so that you can edit your Hook.

4. Enable the newly-created Hook.

  `auth0 enable my-extension-1 -p auth0-default`

  By enabling the `my-extension-1` Hook, you disable all other Hooks associated with the `pre-user-registration` extensibility point.

## List Your Hooks

The following command lists all Hooks associated with a specific extensibility point:

`auth0 ls -t pre-user-registration -p auth0-default`

The following command lists all Hooks associated with your Auth0 account:

`auth0 ls -p auth0-default`

## Get Real-Time Information About Your Hooks

The following command allows you to streaming, real-time logs for your Hooks:

`auth0 logs -p auth0-default`

## Disable/Delete Your Hooks

The following command disables your Hook:

`auth0 disable my-extension-1 -p auth0-default`

The following command delete a hook:

`auth0 rm my-extension-1 -p auth0-default`
