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

<%= include('../_includes/set-up-webtask-cli') %>

Rather than beginning from scratch, scaffold the sample code for an Auth0 hook.

`auth0 scaffold -t pre-user-registration > file.js`

Create the hook:

`auth0 create -t pre-user-registration --name my-extension-1 -p auth0-default file.js`

### Provision secrets to new Hooks

Optionally, you can add secrets (such as Twilio Keys or database connection strings) to new Hooks by adding `--secret KEY=VALUE` to the *Create* command. The information you attach will be encrypted, and it can only be decrypted by the Webtask server.

At this point, you have created a new, disabled Hook using the `pre-user-registration` [extensibility point](/hooks/concepts/overview-extensibility-points). You can repeat this process and create Hooks for any of the other extensibility points.