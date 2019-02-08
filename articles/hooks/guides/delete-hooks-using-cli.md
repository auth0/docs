---
description: How to delete Hooks using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Delete Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to delete Hooks associated with specific extensibility points within the Auth0 platform if you no longer need them.

<%= include('../_includes/set-up-webtask-cli') %>

If you need to delete an existing Hook, use the following command:

`auth0 rm my-extension-1 -p auth0-default`
