---
section: appliance
description: When and why you should grant SSH access to the PSaaS Appliance
topics:
    - appliance
    - ssh
    - security
contentType: concept
useCase: appliance
applianceId: appliance6
---

# PSaaS Appliance Administration: Limiting SSH Access

Auth0 requires SSH access in order to connect to the PSaaS Appliance to perform updates or troubleshooting/accessing required logs. These are the only instances where SSH (by default, port 22) should be exposed on the nodes.

In all other instances, Auth0 recommends restricting SSH access to the PSaaS Appliance. For Appliance deployments in the cloud, you would *not* enable the SSH endpoint for your virtual machines. For on-premise PSaaS Appliance deployments, you would deny SSH to to the virtual machines in your corporate firewall.
