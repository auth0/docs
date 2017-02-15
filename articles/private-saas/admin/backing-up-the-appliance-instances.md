---
section: private-saas
description: Recommendations on when to back up Private SaaS
---

# Auth0 Private SaaS Administration: Private SaaS Backups

If the Auth0 Private SaaS is used in a stateless way (e.g. authentication, SSO), Auth0 recommends that you take **weekly** backups of all nodes using virtual machine snapshots.

If the Auth0 Private SaaS is only used to store data (e.g. database connections, user metadata), Auth0 recommends that you take **daily** backups of all nodes using virtual machine snapshots.

## For More Information:
-  [How to Back Up Private SaaS Instances Using the CLI](/private-saas/cli/backing-up-private-saas)
