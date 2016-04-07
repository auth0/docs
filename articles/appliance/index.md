---
url: /appliance
---

## Auth0 Appliance Deployment and Maintenance

The Auth0 Appliance can be deployed in either Auth0's cloud, your cloud, or your own datacenter. If deploying in your own cloud or datacenter, you are responsible for supplying the infrastructure Auth0 runs on. This includes: VM host, storage, network resources (e.g. load balancer, internet access, etc.), and other required dependencies (e.g. SMTP, NTP, etc.). As a managed service, Auth0 is responsible for the maintenance, patching and updates.

See [Auth0 Deployment Models](/deployment) for details on the main differences between each of the four deployment models.

### Auth0 installation and setup

The initial deployment, setup, configuration, security patches, software upgrades, and overall maintenance of the Auth0 Appliance are the responsibilities of Auth0. Since all these activities run on your infrastructure (e.g. your network, servers, etc.), Auth0 must closely coordinate access with your operations team. Depending on your team’s ability to prepare the infrastructure and its complexity, the Appliance project will typically take between 1-5 weeks.

### Server requirements

You will need to set up a Dev/Test non-production infrastructure as well as a production infrastructure. The number of VMs required to host the Auth0 Appliance depends on the expected traffic and the desired availability. In some scenarios, a single node is sufficient. The minimum requirement for a highly available deployment is three network load balanced nodes for the production infrastructure, in addition to 1 node for the dev/test non-production infrastructure. No special load balancing logic is needed (no sticky sessions). 

### Internet access

Depending on which features are implemented, you may need to permit access to certain websites on the internet from each node. For example, if Facebook logins are needed, you must open connectivity from the Auth0 servers to `facebook.com`. If users will be logging in from the internet (and not through a VPN), authentication endpoints must be published.

The diagram below details a few of these dependencies:

![](/media/articles/appliance/overview.png)

### Communication with Auth0

No information will be transferred outside the Auth0 nodes without consent from you. For maintenance purposes, nodes will contact external endpoints only with your consent and supervision (e.g. in order to download a new version of the software or apply an security patch).

### Access to nodes by Auth0

The Auth0 staff does not have access to any nodes without your consent. API endpoints used for monitoring must be exposed, but these only provide operational information, not user data.

### Scheduled maintenance

The typical update cycle is once per month. You can control the schedule when available updates are applied.

### Maintenance access

To perform maintenance, Auth0 will remotely access your nodes (either through a temporary SSH or through remote control software), and refer to the configuration dashboard to manage the nodes. Occasionally, lower-level actions may be performed on the nodes. You will be notified in advance on the nature of activities to be performed, and will be provided instructions on any actions you may need to execute on your side.

### Nodes monitoring

Since nodes are running under your control behind your firewall and on your infrastructure; you are responsible for monitoring all the dependencies the Auth0 Service relies on (e.g. network load balancer, VM hosts, SMTP gateways, etc.). Auth0 will monitor the nodes health and notify you of any conditions that require an action. 

In addition to that, Auth0 provides specific monitoring endpoints that you can attach to your own monitoring tools (e.g. Microsoft System Center, IBM Tivoli, HP OpenView, etc.) for audit, performance or in cases where the transaction under test includes application specific functionality (e.g. a `rule` that integrates Auth0 with your own CRM). Detailed guidance is available at [Monitoring Auth0](/monitoring).

### Support

If the Auth0 appliance does not perform as expected, you will contact Auth0 support. As part of the onboarding process Auth0 will provide an incident escalation procedure that explains the steps to be followed when an incident occurs.

## Additional information:

-  [Update an Auth0 Cluster](/appliance/update)
-  [Verify Update Package Integrity](/appliance/checksum)
-  [Time synchronization](/appliance/clock)
-  [Auth0 Proxy Updater](/appliance/proxy-updater)
-  [Node.js modules available in Rules and Custom Database Connections](/appliance/modules)
