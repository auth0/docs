---
title: Custom development
description: Learn to use Rules and SDKs for Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
toc: true
---

# Custom development

You can extend Auth0 capabilities using organization metadata and Rules, or use our APIs and SDKs to build organization administration dashboards for your users.

## Extensibility

Organizations supports our extensibility points, so you can define properties within organization metadata and expose that data to rules. This allows you to customize capabilities for individual customers; for example, you can execute custom logic in Rules for certain customers based on their subscription plan by storing that information in organization metadata.

### Rules Context Object

The rule `context` object stores contextual information about the current authentication transaction, such as the user's IP address, application, or location.

If you change token content using the `context` object within a rule, your changes will be available in tokens after all rules have finished running. If your application also requires multi-factor authentication (MFA) or user consent, the user will be prompted before changes in the token are available.

#### Properties

The following properties are available for organizations in the `context` object. For a list of additional available properties, see [Rules Context Object](/rules/context-object).

| Property | Description |
| - | - |
| `organization` | Object containing information related to the organization. Includes the following properties:<ul><li><code>id</code>: String containing the ID of the organization with which the user is logging in.</li><li><code>name</code>: String containing the name of the organization (as defined in the Auth0 Dashboard).</li><li><code>metadata</code>: Dictionary of string key/value pairs containing other organization properties.</li></ul> |
 