---
description: How to set up and use the Auth0 Webtask Command-Line Interface.
---

# Webtask Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to create, enable, disable, list, edit, and remove Auth0 Hooks associated with specific extensibility points within the Auth0 platform. You can also use the CLI to gather real-time logging information.

## Installing the Webtask Command-Line Interface

You can find instructions for installing the Webtask Command-Line Interface in the [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).

## Supported Extensibility Points

You can create Hooks for the following extensibility points:

- client-credentials-exchange
- password-exchange
- pre-user-registration
- post-user-registration

You can create multiple Hooks for each of the extensibility points, but you can enable **one** Hook at a time. Disabled hooks are useful for staging new functionality.
