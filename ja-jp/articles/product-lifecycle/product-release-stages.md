---
toc: true
title: Product Release Stages
description: Learn how we stage, release, and retire product functionality.
topics:
  - migrations
  - product-lifecycle
contentType:
  - reference
useCase:
  - migrate
---

# Product Release Stages

Product release stages describe how we stage, release, and retire product functionality. Product features may not progress through all release stages, and the time in each stage will vary depending on the scope and impact of the feature.

## Early Access (Alpha)

Early access offerings give a limited number of subscribers or customer development partners (CDPs) the opportunity to test and provide feedback on future functionality. At this stage, functionality may not be complete, but is ready for validation. 

During this stage, we work with participants to

* confirm that functionality aligns with the intended goal
* validate that the solution is usable in practice
* elicit suggested improvement

During this stage, our goal is to ensure that the eventual release provides the maximum value to our customers.

When participating in an early access program, you should understand the following:

* Functionality is under active development, so we do not yet support it for production use.
* We expect breaking changes, but will do our best to communicate them.
* The program provides a private preview available to only a limited number of select subscribers.
* Your feedback may help shape the General Availability (GA) or a subsequent release.

Early Access offerings are subject to our Beta Service Terms, which you can view at [Legal](https://auth0.com/legal).

## Beta (Private or Public)

Beta releases give subscribers time to explore and adopt new product capabilities while providing final feedback prior to a General Availability (GA) release. Functionality is code-complete, stable, useful in a variety of scenarios, and believed to meet or almost meet quality expectations for a GA release. Beta releases may be restricted to a select number of subscribers (private) or open to all subscribers (public).

When participating in a beta release, you should understand the following:

* Functionality is feature complete, but we do not yet support it for production use.
* Breaking changes may occur, and we will do our best to communicate them.
* Your feedback may help prioritize improvements and fixes in a subsequent release.

Beta releases are subject to our Beta Service Terms, which you can view at [Legal](https://auth0.com/legal).

## General Availability

General Availability (GA) releases are fully functional and available to all subscribers (limited by pricing tier) for production use. If a new release replaces an existing feature, we provide a period of backward compatibility in accordance with our deprecation policy and inform customers so they have time to adopt the new release.

## Deprecation

Deprecated features are not supported for use by new subscribers, are not actively being enhanced, and are being only minimally maintained. <dfn data-key="tenant">Tenants</dfn> using the feature at the time of deprecation will continue to have access. 

Deprecation begins when we introduce new behavior that customers would experience as a <dfn data-key="migration">breaking change</dfn> without mediation and ends when the old behavior moves into the End of Life product release stage. During Deprecation, customers should engage in a <dfn data-key="migration">migration</dfn> to move away from the deprecated feature or behavior. To learn more, see [Migration Process](/product-lifecycle/migration-process).

Although we know that deprecations can be disruptive, they are necessary to allow us to upgrade technology, improve security and quality, and continue to invest in resources that provide the most value for our customers.

We are committed to transparency, so we try to proactively notify subscribers when deprecations result in breaking changes or cause altered use of Auth0. Additionally, we try to provide end-of-life notices with accompanying recommendations for migration and replacement capabilities where available.

For self-service subscribers, Deprecation is subject to our [Identity Platform Terms of Service](https://auth0.com/legal/ss-tos). For enterprise customers, Deprecation is subject to the Subscription Agreement, which you can view at [Legal](https://auth0.com/legal). 

## End Of Life

Features that reach this stage are removed from the platform. Continued use of these features will likely result in errors.

For self-service subscribers, End of Life is subject to our [Identity Platform Terms of Service](https://auth0.com/legal/ss-tos). For enterprise customers, End of Life is subject to the Subscription Agreement, which you can view at [Legal](https://auth0.com/legal). 