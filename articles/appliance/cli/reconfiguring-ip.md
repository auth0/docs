---
section: appliance
description: How to reconfigure PSaaS Appliance IP Addresses using the CLI
topics:
    - appliance
    - cli
    - ip-addresses
contentType: how-to
useCase: appliance
applianceId: appliance15
sitemap: false
---

# How to Reconfigure IP Addresses Using the Command Line Interface

When running in a cluster, the PSaaS Appliance nodes need to know the IP addresses of the other nodes within the same cluster (they do not automatically detect each other). Whenever you move the network of the cluster, the IP addresses of the individual nodes need to be re-set to match the original node names.

Beginning with PSaaS Appliance build **14591**, reconfiguring of IP addresses using the PSaaS Appliance's Command Line Interface (CLI) is no longer possible. Please open a support ticket when you're ready to reconfigure your VMs' IP addresses, as this operation will be carried out by an Auth0 MSE.
