---
url: /appliance
---

## Auth0 Appliance Deployment and Maintenance

The Auth0 appliance can be deployed in either Auth0's cloud, your cloud, or your own datacenter. If deploying on-premises in your own datacenter, you are responsible for the operation and monitoring of the servers that host the Auth0 service.

See [Auth0 Deployment Models](/deployment) for details on the main differences between each of the four deployment models.

###Who installs Auth0?

The initial deployment, setup, configuration, security patches, software upgrades, and overall maintenance of the Auth0 appliance are the responsibilities of Auth0. Since all these activities run on your infrastructure (e.g. your network, servers, etc.), Auth0 must closely coordinate access with your operations team.

###How many servers are needed?

The number of servers required to host the Auth0 appliance depends on the expected traffic and the desired availability. In some scenarios, a single node is sufficient. The minimum requirement for a highly available deployment is three load balanced network nodes. No special load balancing logic is needed (no sticky sessions).

###What kind of network access does Auth0 need?

Depending on which features are implemented, you may need to permit access to certain websites on the internet from each node. For example, if Facebook logins are needed, you must open connectivity from the Auth0 servers to `facebook.com`. If users will be logging in from the internet (and not through a VPN), authentication endpoints must be published.

The diagram below details a few of these dependencies:

![](/media/articles/appliance/overview.png)

###Will Auth0 nodes deployed on-premises "call home"?

No information will be transferred outside the Auth0 nodes without consent from you. For maintenance purposes, nodes will contact external endpoints only with your consent and supervision (e.g. in order to download a new version of the software or apply an security patch).

###Does Auth0 staff have access to the nodes?

The Auth0 staff does not have access to any nodes without your consent.

###How often is maintenance performed?

The typical update cycle is once per month. You can also customize the update schedule.

###What does maintenance consist of?

Auth0 will remotely access your nodes (either through a temporary SSH or through remote control software) and refer to the configuration dashboard to manage the nodes. Occasionally, lower-level actions may be performed on the nodes. All events will occur under your observation. You will be notified in advance on the nature of activities to be performed, and provided instructions on any actions you may need to execute on your side.

###How are nodes monitored?

Because nodes are running under your control behind your firewall and therefore beyond our reach, you are responsible for monitoring service performance. We recommend VM level monitoring (e.g. CPU utilization) as well as service level monitoring. Auth0 provides specific monitoring endpoints that you can attach to your own monitoring tools (e.g. Microsoft System Center, IBM Tivoli, HP OpenView, etc.). Detailed guidance is available at [Monitoring Auth0](/monitoring).

###What happens if the service doesn't perform?

Contact Auth0 support immediately if you are experiencing performance issues.

##Additional information:

-  [Updating an Auth0 Cluster](/appliance/update)
-  [Verify the integrity of an update package](/appliance/checksum)
-  [Time synchronization](/appliance/clock)
-  [Auth0 Proxy Updater](/appliance/proxy-updater)
-  [Node.js modules available in Rules and Custom Database Connections](/appliance/modules)

