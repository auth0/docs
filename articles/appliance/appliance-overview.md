---
section: appliance
description: The PSaaS Appliance is an option for your organization when compliance or other policy requirements prevent you from using a multi-tenant cloud service.
topics:
    - appliance
contentType: concept
useCase: appliance
applianceId: appliance52
sitemap: false
---

# PSaaS Appliance Overview

The PSaaS Appliance is an option for your organization when compliance or other policy requirements prevent you from using a multi-tenant cloud service. The PSaaS Appliance can be deployed in one of three places:

* a dedicated cloud environment hosted by Auth0 (you may opt for a shared cloud environment or an environment where resources are allocated only to your company).
* your cloud environment using **Amazon AWS**

## Infrastructure

If you opt to use a dedicated cloud environment hosted by Auth0, Auth0 is responsible for installation, maintenance, patching and updates.

If you choose to deploy to your own cloud environment or data center, you supply and monitor the infrastructure Auth0 runs on. This includes the VM host, storage, network resources (such as the load balancer, internet access, and so on), and other required dependencies (such as the SMTP, NTP, and so on).

## Deployment

You may deploy the PSaaS Appliance in several different configurations and use several different deployment models. The configurations support different levels of scale and high availability, and they are available in any of the PSaaS Appliance deployment models. The following table shows the configuration options:

<img src="/media/articles/appliance/Appliance-HA-Options.svg" alt="PSaaS Appliance HA Options" data-zoomable>

<!-- markdownlint-disable MD033 -->
<table class="table">
<thead>
    <tr>
        <th></th>
        <th>Single Node</th>
        <th>High Availability</th>
        <th>High Capacity</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th>Description</th>
        <td>Intended for development and testing environments.</td>
        <td><ul><li>Three-node redundant cluster</li> <li>Tolerates a single-node outage</li> <li>Recommended for most Production environments</li> <li>Includes a single node for Dev/QA</ul></td>
        <td><ul><li>Highly scalable capacity for the most demanding applications</li> <li>Tolerates multi-node outages</li> <li>Recommended for large-scale Production environments</li> <li>Includes a single node for Dev/QA</li></ul></td>
    </tr>
    <tr>
        <th>Geo HA</th>
        <td>Not Available</td>
        <td colspan="2"><ul><li>Multiple data center with active-passive clustering and automated failover</li> <li>Auth0 continues to operate if a data center becomes unavailable</li> <li>If the primary data center fails, traffic can quickly be routed to the secondary cluster</li> <li>Cluster topology is replicated in each environment. Requires a global load balancing solution like AWS Route 53 or F5 Global Traffic Manager.</li></ul></td>
    </tr>
    <tr>
        <th>Backup and Recovery</th>
        <td><ul><li>Virtual Machine Snapshot</li><li>Data backup with cluster restore</li></ul></td>
        <td><ul><li>Virtual Machine Snapshot</li><li>Virtual Machine shipping with scripted restore (if using VMWare)</li><li>Data backup with cluster restore</li></ul></td>
        <td></td>
    </tr>
</tbody>
</table>
<!-- markdownlint-enable MD033 -->

[Auth0 Deployment Models](/overview/deployment-models) provides additional details and explains the differences between each of the PSaaS Appliance deployment models and the standard multi-tenant cloud deployment.

## Maintenance and Connectivity

As a managed service, Auth0 performs:

* initial setup and configuration;
*  ongoing maintenance operations (security patching, troubleshooting, and updating).

Auth0 will closely coordinate access to your PSaaS Appliance instances with your operations team, since these activities will often run on your infrastructure (such as your network, servers, and so on). Depending on the time it takes to prepare the required infrastructure and the deployment complexity, the PSaaS Appliance implementation project typically takes between 1-5 weeks.

If Auth0 is managing a dedicated environment for you, Auth0 will obtain your consent prior to applying any updates or configuration changes. Auth0 will not access any PSaaS Appliance, nor will any information be transferred off of the PSaaS Appliance without your consent.

### Connectivity

During maintenance operations, the PSaaS Appliance instances contact external Auth0 endpoints for updating under your consent and supervision. After maintenance completes, you can [continue to operate with limited internet access](/appliance/infrastructure/internet-restricted-deployment).

For normal maintenance, Auth0 will access the Management Dashboard (either over a temporary SSH connection or through remote control software) to apply the update. Auth0 will also need SSH access in the event that updates to the PSaaS Appliance are necessary. If you expose API endpoints to be used for monitoring, Auth0 will collect this information to proactively monitor PSaaS Appliance behavior for you.

Depending on which features are implemented, you may need to permit access to certain websites on the Internet from each PSaaS Appliance instance. For example, if Facebook logins are needed, you must open connectivity from the Auth0 servers to `facebook.com`. If users will be logging in from the Internet (and not through a VPN), you must publish the authentication endpoints.

### Update Cycle

The typical update cycle is once per month. You can control and which version is applied. Occasionally, lower-level actions may be performed on the nodes. You will be notified in advance on the nature of activities to be performed, and will be provided instructions on any actions you may need to execute on your side.

The diagram below details a few of these dependencies:

<img src="/media/articles/appliance/overview.svg" alt="Appliance Overview" data-zoomable>

## Monitoring and Support

You are responsible for monitoring all the dependencies the Auth0 Service relies on within your environment, such as the network load balancer, VM hosts, SMTP gateways, and so on.

If you provide access to the appropriate monitoring endpoints, Auth0 will monitor the nodes' health and notify you of any conditions that require action.

If Auth0 hosts the PSaaS Appliance for you, then Auth0 will monitor the related services.

### Monitoring Endpoints
Auth0 provides specific monitoring endpoints that you can attach to your own monitoring tools (such as Microsoft System Center, IBM Tivoli, HP OpenView, and so on) for auditing, load balancing, and performance monitoring, such as in cases where the transaction under test includes application specific functionality (for example, a [rule](/rules) that integrates Auth0 with your own CRM).

You may find detailed guidance at [Monitoring Auth0](/monitoring).

In addition, the PSaaS Appliance has authenticated monitoring endpoints for metrics like CPU, memory, and disk space that you can query for more detailed information.

If the PSaaS Appliance does not perform as expected, you can contact your Auth0 Customer Success Engineer. Auth0 provides an incident escalation procedure during the onboarding process that explains the steps to be followed when an incident occurs. Auth0 has a 24 x 7, around-the-clock support staff.

## Server Requirements

You will be asked to set up a Dev/Test (non-Production) environment, as well as a Production environment.

For the Production environment, the number of virtual machines required to host the PSaaS Appliance depends on the expected traffic and the desired availability. For a highly-available configuration, the Production environment requires a minimum of three network load-balanced PSaaS Appliance instances and one for the Dev/Test (non-Production) environment (which also does *not* required any special load balancing logic/sticky sessions).
