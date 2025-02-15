---
toc: true
title: Migration Process
description: Learn about the migration process at Auth0, including End of Life announcements, migration windows, and migration guides.
topics:
  - migrations
  - product-lifecycle
  - breaking-changes
contentType:
  - reference
useCase:
  - migrate
---

# Migration Process

To keep our platform stable and secure, we must occasionally modify or remove features or behaviors. These changes will sometimes result in a <dfn data-key="breaking-change">breaking change</dfn>.

When we must introduce a breaking change, we first deprecate the affected feature or behavior and announce the <dfn data-key="deprecation">Deprecation</dfn> to our customers. When a new Deprecation is announced, customers should engage in a <dfn data-key="migration">Migration</dfn> to move away from the deprecated feature or behavior.

For a list of all Deprecations with active Migrations, see [Active Migrations](/product-lifecycle/migrations).

To learn more about Auth0 product release stages, see [Product Release Stages](/product-lifecycle/product-release-stages).

## End of Life announcement

 When we announce a <dfn data-key="deprecation">Deprecation</dfn>, we typically include the date that the feature or behavior will be moved into the <dfn data-key="end-of-life">End of Life</dfn> product release stage and removed from the platform. In some cases, we will immediately deprecate a feature to prevent further adoption and will determine the End of Life date at a later time. End of Life dates can vary between plan types.

## Migration window

When we make an <dfn data-key="end-of-life">End Of Life</dfn> announcement, we will also open a migration window to allow customers to prepare for the <dfn data-key="end-of-life-date">End of Life date</dfn>.

Whenever possible, we provide at least a six-month migration window between the End Of Life announcement and the End Of Life date. In case of emergency (for example, critical vulnerabilities that require remediation or changes required by applicable law or third-party certification standards), we may accelerate this time frame. In such cases, we will provide as much prior notice as is reasonable under the circumstances.

## Migration guides

Auth0 <dfn data-key="deprecation">Deprecations</dfn> usually involve replacing deprecated behavior with substantially comparable functionality (although at times, we may elect to discontinue support for some functionality entirely).

To help you migrate to the new functionality and determine the impact on your <dfn data-key="tenant">tenants</dfn>, we will publish a migration guide, which will detail any necessary modifications to your application's code, inform you of any other required actions, and instruct you about how you opt in to the new behavior prior to the <dfn data-key="end-of-life-date">End of Life date</dfn>.

 Once the End of Life date is reached, the new behavior will automatically be enabled for tenants that did not opt in during the migration window.