---
description: How to get Hooks logs using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Get Log Information About Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to gather real-time logging information on Hooks.

<%= include('../_includes/set-up-webtask-cli') %>

Use the following Auth0 CLI commands to gather information about Hooks:

* To get a list of Hooks for a specific extensibility point:
  `auth0 ls -t pre-user-registration -p auth0-default`
* To get a list of Hooks associated with Auth0 account:
  `auth0 ls -p auth0-default`
* To access logs containing real-time data on Hooks:
  `auth0 logs -p auth0-default`
