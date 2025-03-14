---
title: Custom Database Action Script Size Best Practices
description: Learn about best practices for custom database action script size.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Action Script Size Best Practices

As a best practice, we recommend that the total size of any action script not exceed 100 kB. The larger the size, the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any `npm` modules that may be referenced as part of any `require` statements.

## Keep reading

<%= include('../../_includes/_topic-links', { links: [
  'best-practices/custom-db-connections/environment',
  'best-practices/custom-db-connections/execution',
  'best-practices/error-handling',
  'best-practices/debugging',
  'best-practices/testing',
  'best-practices/deployment',
  'best-practices/performance',
  'best-practices/custom-db-connections/security'
] }) %>