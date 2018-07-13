---
description: Learn how to work with metadata when using your database as an identity provider.
crews: crew-2
---
# Metadata and Custom Databases

Depending on your custom database script, you may return a user profile to Auth0 apps. This profile includes the user metadata fields. The **app_metadata** field(s) should be [referred to as **metadata** in scripts for custom databases](/metadata#metadata-and-custom-databases).

<%= include('../../../_includes/_ip_whitelist') %>