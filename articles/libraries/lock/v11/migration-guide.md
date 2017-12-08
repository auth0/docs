---
section: libraries
title: Migrating to Lock v11
description: How to migrate to Lock v11
toc: true
---
# Migrating to Lock v11

Lock 11 is designed for embedded login scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

We recommend that instead of using Lock embedded in your application, you use **Centralized Login**, as it is the [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded).

If you decide to keep using Lock, this document lists all the changes that you should be aware of between versions 10 and 11 of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

# Migration Instructions

If you decide to keep using Embedded Login, you will need to migrate to v11. Before you update your code, make sure that you have reviewed these documents and made any necessary changes in your implementation. 

[Migrating from Lock.js v8](migration-v8-v11.md)

[Migrating from Lock.js v9](migration-v9-v11.md)

[Migrating from Lock.js v10](migration-v10-v11.md)

[Migrating to Lock.js v11 in Angular.js Applications]()

[Migrating to Lock.js v11 in Angular Applications]()

:::note
If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 
:::
