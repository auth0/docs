---
description: How to get Hooks logs using the Auth0 Command-Line Interface
beta: true
---

# Get Log Information About Hooks Using the Auth0 Command-Line Interface

::: note
All of the examples on this page use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli` and can be obtained from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

You can use the Auth0 CLI to gather information about your Hooks:

* To get a list of Hooks for a specific extensibility point:
  `auth0 ls -t pre-user-registration -p auth0-default`
* To get a list of Hooks associated with your Auth0 account:
  `auth0 ls -p auth0-default`
* To access logs containing real-time data on your Hooks:
  `auth0 logs -p auth0-default`