---
section: private-saas
description: Overview of the Private SaaS Dashboard Nodes page
---

# Auth0 Private SaaS Dashboard: Nodes

::: panel-info Private SaaS Dashboard Navigation

For additional information on navigating to and using the Private SaaS Dashboard, please see the section on [Private SaaS Controls](/private-saas/dashboard#private-saas-controls).

:::

The Nodes page located under the Private SaaS configuration area provides a high-level overview of the nodes you have running as part of your Private SaaS setup. Each instance that you have with your web service provider is considered a node and is listed individually on this page.

![](/media/articles/private-saas/dashboard/nodes.png)

The Nodes page displays the following pieces of information for each of your nodes:

* **Hostname**: the name of the node;
* **IP**: the IP address used to reach that particular node;
* **Memory**: the amount of memory allocated to that node;
* **CPUs**: the number of CPUs allocated to that node;
* **App Update**: the number of times the node has been updated with application-related updates;
* **Setting Update**: the number of times the node's settings have been updated;
* **Heartbeat**: the amount of time elapsed since the Dashboard received communication from the node;
* **Uptime**: the amount of time the node has been continuously running.

At the end of each row detailing a Node instance are two buttons:

* **Reboot**: if clicked, Auth0 reboots the node;
* **Remove**: if clicked, Auth0 removes the node from the status list. If the node is still running, the configuration area will publish a new status.
