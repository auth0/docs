---
section: appliance
---

# Auth0 Appliance Dashboard: Nodes

> For additional information on navigating to and using the Appliance Dashboard, please see the section on [Appliance Controls](/appliance/dashboard#appliance-controls).

The Nodes page located under the Appliance configuration area provides a high-level overview of the nodes you have running as part of your Appliance setup. Each instance that you have with your web service provider is considered a node and is listed individually on this page.

![](/media/articles/appliance/dashboard/nodes.png)

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
