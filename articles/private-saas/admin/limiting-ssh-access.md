---
section: private-saas
description: When and why you should grant SSH access to Private SaaS
---

# Auth0 Private SaaS Administration: Limiting SSH Access

Auth0 requires SSH access in order to connect to Private SaaS to perform updates or troubleshooting/accessing required logs. These are the only instances where SSH (by default, port 22) should be exposed on the nodes.

In all other instances, Auth0 recommends restricting SSH access to Private SaaS instances. For Private SaaS deployments in the cloud, you would *not* enable the SSH endpoint for your virtual machines. For on-premise Private SaaS deployments, you would deny SSH to to the virtual machines in your corporate firewall.
