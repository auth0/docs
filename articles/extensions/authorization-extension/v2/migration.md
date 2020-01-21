---
title: Installing the Authorization Extension v2
description: How to install the Authorization Extension v2
topics:
  - extensions
  - authorization_v2
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---

# Authorization Extension: Migrate from Version 1 to Version 2

::: note
<%= include('../../../_includes/_rbac_methods') %>
:::

::: warning
Migrating from Version 1 to Version 2 is a breaking change
:::

One of the major changes between versions 1 and 2 of the Authorization Extension is the removal of the **Applications** section. This section was removed to simplify its inherent complexity, such as when it was used to define a policy for access control. The desired approach for such use cases is to use [rules](/extensions/authorization-extension/v2/rules#controlling-application-access).

## Upgrade the Extension Version

To upgrade the Authorization Extension, go to [Extensions](${manage_url}/#/extensions) section of the dashboard and click **Installed Extensions**. 

On the Authorization Extension row, you'll see a link that will begin the upgrade process to the latest version.