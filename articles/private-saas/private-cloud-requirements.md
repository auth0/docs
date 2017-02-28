---
section: private-saas
description: >
  If you have decided to purchase hosting for your Private SaaS implementation in a dedicated area of Auth0's cloud, Auth0 will set up Private SaaS on your behalf. This document describes the necessary information.
---

# Information Requirements for Setting Up Private SaaS in Auth0's Private Cloud

If you have decided to purchase hosting for your Private SaaS implementation in a dedicated area of Auth0's cloud, Auth0 will set up Private SaaS on your behalf. To do so, Auth0 asks that you provide the following information:

* **Preferred AWS region** such as AWS US-West-2, AWS US-East-1, AWS EU-Central-1, etc;
* **Six (6) DNS names**:
    * Three (3) will be used for the non-Production node, and three (3) will be used for the Production cluster;
    * **Important**: Please finalize DNS names prior to Private SaaS deployment.
* **SMTP Settings** (including the hostname, port number, username, and password). Auth0 will work with you to enter your settings. For additional details, please see the [SMTP section of Private SaaS infrastructure manual](/private-saas/infrastructure/security#smtp).

## Further Reading

* [DNS](/private-saas/infrastructure/dns)
* [DNS Records](/private-saas/infrastructure/network#dns-records)
