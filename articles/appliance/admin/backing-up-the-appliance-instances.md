---
section: appliance
description: Recommendations on when to back up PSaaS Appliance instances
tags:
    - appliance
    - backups
---

# PSaaS Appliance Administration: Appliance Backups

If the PSaaS Appliance is used in a stateless way (such as authentication, SSO), Auth0 recommends that you take **weekly** backups of all nodes using virtual machine snapshots.

If the PSaaS Appliance is only used to store data (such as database connections, user metadata), Auth0 recommends that you take **daily** backups of all nodes using virtual machine snapshots.

## For More Information:
-  [How to Back Up the PSaaS Appliance Using the CLI](/appliance/cli/backing-up-the-appliance)
