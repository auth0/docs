# Auth0 Appliance Overview

The Auth0 Appliance offers an option for your organization when compliance or other policy requirements prevent you from using a multi-tenant cloud service. The Auth0 Appliance can be deployed in one of three places:

* a dedicated cloud environment hosted by Auth0.
* your cloud environment using *Amazon AWS*, *Microsoft Azure*, and/or *Google Cloud Platform*. For other cloud environments, please contact us for additional information;
* your own datacenter (as a managed service) using *VMWare* and *Microsoft Hyper-V*. For other virtualization environments contact us.

If you opt to use a dedicated cloud environment hosted by Auth0, Auth0 is responsible for installation, maintenance, patching and updates. If you choose to deploy to your own cloud environment or data center, you supply and monitor the infrastructure Auth0 runs on. This includes the VM host, storage, network resources (such as the load balancer, internet access, etc.), and other required dependencies (such as the SMTP, NTP, etc.).

You may deploy the Appliance in several different configurations and use several different deployment models. The configurations support different levels of scale and high availability, and they are available in any of the Appliance deployment models. The following table shows the configuration options:

![](/media/articles/appliance/ha-options.png)

[Auth0 Deployment Models](/deployment) provides additional details and explains the differences between each of the Appliance deployment models and the standard multi-tenant cloud deployment.

## Maintenance and Connectivity

As a managed service, Auth0 performs the initial setup and configuration and ongoing maintenance operations like security patching, troubleshooting, and updating. Auth0 will closely coordinate access to your Appliance instances with your operations team, since these activities will often run on your infrastructure (such as your network, servers, etc.). Depending on the time it takes to prepare the required infrastructure and the deployment complexity, the Appliance project typically takes between 1-5 weeks.

If Auth0 is managing a dedicated environment for you, Auth0 will still obtain your consent prior to applying any updates or configuration changes. Auth0 will not access any Appliances without your consent, and no information will be transferred off of the Appliances without your consent.

During maintenance operations the appliance instances contact external Auth0 endpoints for updating the appliance under your consent and supervision. After maintenance completes you can block internet access. For normal maintenance Auth0 will access the management dashboard (either over a temporary SSH connection or through remote control software)to apply the update. SSH access is also needed during updates in case there are any . If you expose API endpoints used for monitoring then Auth0 will access basic operational information to proactively monitor Auth0 Appliance behavior for you.

Depending on which features are implemented, you may need to permit access to certain websites on the internet from each appliance instance. For example, if Facebook logins are needed, you must open connectivity from the Auth0 servers to `facebook.com`. If users will be logging in from the internet (and not through a VPN), authentication endpoints must be published.

The typical update cycle is once per month. You can control and which version is applied. Occasionally, lower-level actions may be performed on the nodes. You will be notified in advance on the nature of activities to be performed, and will be provided instructions on any actions you may need to execute on your side.

The diagram below details a few of these dependencies:

![](/media/articles/appliance/overview.png)

## Monitoring and Support

You are responsible for monitoring all the dependencies the Auth0 Service relies on within your environment (e.g. network load balancer, VM hosts, SMTP gateways, etc.). Auth0 will monitor the nodes health and notify you of any conditions that require an action if you provide access to monitoring endpoints. If Auth0 hosts the appliance for you, then we will monitor the related services.

Auth0 provides specific monitoring endpoints that you can attach to your own monitoring tools (e.g. Microsoft System Center, IBM Tivoli, HP OpenView, etc.) for audit, load balancing, performance or in cases where the transaction under test includes application specific functionality (e.g. a `rule` that integrates Auth0 with your own CRM). Detailed guidance is available at [Monitoring Auth0](/monitoring). In addition the appliance has authenticated monitoring endpoints for metrics like CPU, memory, and disk space that you query for more detailed alerting.

If the Auth0 appliance does not perform as expected, you will contact Auth0 support. Auth0 provides an incident escalation procedure during the onboarding process that explains the steps to be followed when an incident occurs. Auth0 has a 24 x 7 support staff.

## Server requirements

You will need to set up a Dev/Test non-production infrastructure as well as a production infrastructure. The number of virtual machines required to host the Auth0 Appliance depends on the expected traffic and the desired availability. In some scenarios, a single node is sufficient. For highly available a minimum of three network load balanced appliance instances are deployed for the production infrastructure and a 1 node for the dev/test non-production infrastructure. No special load balancing logic is needed (no sticky sessions).
