# Auth0 Appliance Overview

The Auth0 Appliance offers an option for your organization when compliance or other policy requirements prevent you from using a multi-tenant cloud service. The Auth0 Appliance can be deployed in one of three places:

* a dedicated cloud environment hosted by Auth0.
* your cloud environment using **Amazon AWS**, **Microsoft Azure**, and/or **Google Cloud Platform**;
* your own datacenter (as a managed service) using **VMWare** or **Microsoft Hyper-V**.

**Note**: Please contact us for additional information if you are interested in using cloud environments and/or virtualization environments not listed above.

If you opt to use a dedicated cloud environment hosted by Auth0, Auth0 is responsible for installation, maintenance, patching and updates.

If you choose to deploy to your own cloud environment or data center, you supply and monitor the infrastructure Auth0 runs on. This includes the VM host, storage, network resources (such as the load balancer, internet access, etc.), and other required dependencies (such as the SMTP, NTP, etc.).

You may deploy the Appliance in several different configurations and use several different deployment models. The configurations support different levels of scale and high availability, and they are available in any of the Appliance deployment models. The following table shows the configuration options:

![](/media/articles/appliance/ha-options.png)

[Auth0 Deployment Models](/deployment) provides additional details and explains the differences between each of the Appliance deployment models and the standard multi-tenant cloud deployment.

## Maintenance and Connectivity

As a managed service, Auth0 performs:

* initial setup and configuration;
*  ongoing maintenance operations (security patching, troubleshooting, and updating).

Auth0 will closely coordinate access to your Appliance instances with your operations team, since these activities will often run on your infrastructure (such as your network, servers, and so on). Depending on the time it takes to prepare the required infrastructure and the deployment complexity, the Appliance implementation project typically takes between 1-5 weeks.

If Auth0 is managing a dedicated environment for you, Auth0 will obtain your consent prior to applying any updates or configuration changes. Auth0 will not access any Appliances, nor will any information be transferred off of the Appliances without your consent.

### Connectivity

During maintenance operations, the Appliance instances contact external Auth0 endpoints for updating under your consent and supervision. After maintenance completes, you can block Internet access to the Appliance.

For normal maintenance, Auth0 will access the Management Dashboard (either over a temporary SSH connection or through remote control software) to apply the update. Auth0 will also need SSH access in the event that updates to the Appliance are necessary. If you expose API endpoints to be used for monitoring, Auth0 will collect this information to proactively monitor Appliance behavior for you.

Depending on which features are implemented, you may need to permit access to certain websites on the Internet from each Appliance instance. For example, if Facebook logins are needed, you must open connectivity from the Auth0 servers to `facebook.com`. If users will be logging in from the Internet (and not through a VPN), you must publish the authentication endpoints.

### Update Cycle

The typical update cycle is once per month. You can control and which version is applied. Occasionally, lower-level actions may be performed on the nodes. You will be notified in advance on the nature of activities to be performed, and will be provided instructions on any actions you may need to execute on your side.

The diagram below details a few of these dependencies:

![](/media/articles/appliance/overview.png)

## Monitoring and Support

You are responsible for monitoring all the dependencies the Auth0 Service relies on within your environment, such as the network load balancer, VM hosts, SMTP gateways, and so on.

If you provide access to the appropriate monitoring endpoints, Auth0 will monitor the nodes' health and notify you of any conditions that require action.

If Auth0 hosts the Appliance for you, then Auth0 will monitor the related services.

### Monitoring Endpoints
Auth0 provides specific monitoring endpoints that you can attach to your own monitoring tools (such as Microsoft System Center, IBM Tivoli, HP OpenView, and so on) for auditing, load balancing, and performance monitoring, such as in cases where the transaction under test includes application specific functionality (for example, a `rule` that integrates Auth0 with your own CRM).

You may find detailed guidance at [Monitoring Auth0](/monitoring).

In addition, the Appliance has authenticated monitoring endpoints for metrics like CPU, memory, and disk space that you can query for more detailed information.

If the Auth0 appliance does not perform as expected, you can contact your Auth0 Customer Success Engineer. Auth0 provides an incident escalation procedure during the onboarding process that explains the steps to be followed when an incident occurs. Auth0 has a 24 x 7, around-the-clock support staff.

## Server Requirements

You will be asked to set up a Dev/Test (non-Production) environment, as well as a Production environment.

For the Production environment, the number of virtual machines required to host the Auth0 Appliance depends on the expected traffic and the desired availability. In some scenarios, a single node is sufficient. For a highly-available configuration, the Production environment requires a minimum of three network load-balanced Appliance instances and one for the Dev/Test (non-Production) environment (which also does *not* required any special load balancing logic/sticky sessions).
