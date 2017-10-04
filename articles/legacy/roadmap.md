---
description: Auth0 roadmap of the features that are planned for deprecation and when this will be done
toc: true
---
# Legacy Feature Deprecation Roadmap

As part of our efforts to simplify our product and improve standards-based interoperability, we are deprecating some features and replacing them with improved alternatives. 

In this document you can see which features are planned for deprecation and when this will be done. You should also expect to receive emails notifications if you are using any of these features.

::: note
Auth0 tenants created on TBD 2017, or later will not have any legacy features available, and will not need to take action regarding this notice.
:::

Each deprecated feature has a migration guide which includes info on what is changing and why, details on the new features that replace the deprecated ones, and instructions on how you can migrate your implementation. In some cases, migration guides will be made available at a later date. 

Impacted customers will receive a separate notice for each legacy feature migration at least 90 days prior to the removal date.

Deprecated Feature | Removal date | Documentation
-- | -- | --
Using the /delegation endpoint for ID Token and Refresh Token Exchange | January 31, 2018 | [Migration Guide]()
Management API v1 | Q1 2018 | [Migration Guide](/api/management/v2/changes)

As with any software engineering effort, all deadlines are subject to change, and subscribers should plan accordingly. Auth0 will publish any and all related updates to this page, and we will send out a notification to subscribers if there are material changes.

If you would like to disable any of these features prior to the removal date, you can do so at the tenant level or at the client level:

- To disable the legacy features for **all** the Clients under a tenant, enable the **Legacy Migration** toggle in the [Dashboard](${manage_url}), under **Account Settings > Advanced**
- To disable the legacy features for a specific Client, enable the **Disable Legacy Features** toggle in the [Dashboard](${manage_url}),under **Client > Advanced Settings > OAuth**

Please submit all questions and concerns via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

Thank you for your patience as we work to make Auth0 even better and more secure.