---
url: /appliance
---

## Auth0 Appliance

The Auth0 appliance can be deployed in Auth0's cloud, in your cloud or in your own datacenter. When deploying on-premises, you are responsible for monitoring and operating the servers that make the Auth0 service.

[This article](/deployment) details the main differences between the 4 deployment models.

###Who installs Auth0?

Initial deployment, setup, configuration, security patches, software upgrades, and overall maintenance are responsibilities of Auth0. These activities happen on your infrastructure (e.g. your network, servers, etc.), therefore Auth0 closely coordinates access to it with your operations teams.

###How many servers are needed?

This depends on the expected traffic and availability required. In some scenarios, a single node is sufficient. The minimum highly available deployment requires three network load balanced nodes. No special load balancing logic is needed (e.g. no sticky sessions).

###What kind of network access does Auth0 need?

Depending on the features used in the platform, you might need to permit access to certain websites on the Internet from each of nodes. For example, if Facebook logins are needed, you will have to open connectivity from the Auth0 servers to `facebook.com`. If users are expected to login from the Internet with no VPN, then the authentication endpoints must be published.

The diagram below details some of these dependencies:

![](/media/articles/appliance/overview.png)

###Will Auth0 nodes deployed on-premises "call home"?

No information is transferred outside the Auth0 nodes without consent from you. Nodes will contact external endpoints for maintenance only with your consent and supervision (e.g. to download a new version of the software, or apply an security patch).

###Does Auth0 staff have access to the nodes?

Not without your consent.

###How often is maintenance performed?

The typical update cycle is once per month. You can control the schedule of updates applied.

###What does maintenance consist of?

We will remotely access your nodes (e.g. via temporary SSH or through remote control software) and use the configuration dashboard to manage the nodes. Occasionally we might perform lower level actions on the nodes. All these happen under your observation. We will notify in advance the nature of the activities we will perform, and provide instructions on actions you might need to perform on your side.

###How are nodes monitored?

Because nodes are running behind your firewall, under your control, and frequently beyond our reach, you are responsible for monitoring that the service is performing to expected levels. We recommend VM level monitoring (e.g. CPU utilization) as well as service level monitoring. Auth0 provides specific monitoring endpoints you can attach to your own monitoring tools (e.g. Microsoft System Center, IBM Tivoli, HP OpenView, etc.). Detailed guidance is available [here](/monitoring).

###What happens if the service doesn't perform?

You would contact Auth0 support immediately.

##More information:

-  [Updating Auth0 nodes in a cluster](/appliance/update)
-  [Checking integrity of an update package](/appliance/checksum)
-  [Configuring time synchronization](/appliance/clock)
-  [Auth0 Proxy Updater](/appliance/proxy-updater)
-  [Node.js modules available in Rules and Custom Database Connections](/appliance/modules)

