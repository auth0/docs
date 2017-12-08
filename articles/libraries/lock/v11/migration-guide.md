---
section: libraries
title: Migrating to Lock v11
description: How to migrate to Lock v11
toc: true
---
# Migrating to Lock v11

Lock 11 is designed for embedded login scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

We recommend that instead of using Lock embedded in your application, you use **Centralized Login**, as it is the [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded).

# Migration Instructions

If you decide to keep using Lock you will need to migrate to Lock 11.

This document links to all the changes that you should be aware of between different versions of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation. Make sure you go through them before upgrading.

[Migrating from Lock.js v8](/libraries/lock/11/migration-v8-v11)

[Migrating from Lock.js v9](/libraries/lock/11/migration-v9-v11)

[Migrating from Lock.js v10](/libraries/lock/11/migration-v10-v11)

[Migrating to Lock.js v11 in Angular.js Applications](/libraries/lock/11/migration-angularjs)

[Migrating to Lock.js v11 in Angular Applications](/libraries/lock/11/migration-angular)

:::note
If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 
:::
