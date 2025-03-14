---
url: /appliance/monitoring
section: appliance
description: Ways to monitor the PSaaS Appliance
topics:
    - appliance
    - monitoring
contentType:
- index
- concept
useCase: appliance
applianceId: appliance48
sitemap: false
---

# Monitoring the Private SaaS (PSaaS) Appliance

The PSaaS Appliance is a managed service, which means that Auth0 is responsible for:

* Installation
* Updates
* General maintenance tasks

However, the deployment option you choose affects the scope of what Auth0 can do when it comes to *monitoring* the PSaaS Appliance. Currently, Auth0 supports the following deployment options:

* The subscriber's Amazon Web Services cloud environment
* An Auth0-controlled data center

If you choose to deploy the PSaaS Appliance to an Auth0-controlled data center, we have control over every aspect involved (DNS, certificates, infrastructure, Auth0 software stack). This level of control allows us to assist you in monitoring the health of the PSaaS Appliance and acting to prevent or remediate issues.

However, if you choose to deploy the PSaaS Appliance to AWS, **you are responsible for monitoring the deployment. Auth0 is unable to monitor such environments.**

::: note
Please review [PSaaS Appliance: Roles and Responsibilities](https://auth0.com/docs/appliance/raci) for information on who is responsible for various activities related to managing and monitoring the PSaaS Appliance.
:::

## Features Aiding Monitoring

The PSaaS Appliance offers a number of tools to help you monitor the software that is running, as well as the infrastructure on which it runs. You can find additional information on these monitoring tools in the chart that follows:

| Tool | Description |
| - | - |
| Service Status Check | The [`/testall` endpoint](/appliance/monitoring/testall) reports the overall status of core Auth0 services. You can call this endpoint from the load balancer or from an individual node. If called from the load balancer, you can determine if there's a system-wide service outage. If called from a specific node, you'll receive information on the status of core services running on that node alone. |
| System Health Checks | The [authenticated endpoints](/appliance/monitoring/authenticated-endpoints) provide a more granular health check than the `/testall` endpoint, allowing you to see the status of lower level system resources. With these endpoints, you can monitor the status of the PSaaS Appliance as it relates to memory, disk, network, internet, email, database, replica set, services, and the cluster. <br /> <br /> The authenticated endpoints return status codes indicating whether the system resource in question is healthy or not. |
| [Instrumentation](/appliance/instrumentation) | The PSaaS Appliance offers instrumentation data, which is a vital component of monitoring and detecting anomalies or problems *before* they occur. To review your PSaaS Appliance instrumentation data, you can send it to DataDog. With DataDog,  you can set up robust monitoring and alerts strategies to review the health of your PSaaS Appliance. |
| Dashboards | The PSaaS Appliance's [Troubleshooting](/appliance/dashboard/troubleshoot) dashboard allows you to view [Health Check](/appliance/dashboard/troubleshoot#health-check) results for the past 29 days. Please note that this dashboard does not provide any alerts functionality and should not be used as your only monitoring strategy. |
| Audit and Tenant Events | The [Tenant Logs](https://auth0.com/docs/logs) track processed transactions and provide an overview of application activity in your tenant. |
| Synthetic Transactions | You can use any third-party service that supports synthetic transaction to monitor PSaaS Appliance service availability. |

## Recommended Monitoring Strategy

Because each subscriber's implementation is different, the monitoring strategy you employ should match the needs of your use case.

With that said, Auth0 suggests the following as a starting point for monitoring the PSaaS Appliance. The signals mentioned are indicators that there might be an unhealthy scenario occurring and provide information on the appropriate action for you to take:

| Signal | Trigger | Action |
| - | - | - |
| [/testall at load balancer level](/appliance/monitoring/testall) | Does not return 200 with body OK | [Submit a support ticket](/support/tickets) with a severity of **Urgent** |
| [/testall at node level](/appliance/monitoring/testall#monitoring-individual-nodes) | Does not return 200 with body OK | [Submit a support ticket](/support/tickets) with a severity of **High** |
| [GET /status/memory](/appliance/monitoring/authenticated-endpoints#get-status-memory) at node level | Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| [GET /status/disk](/appliance/monitoring/authenticated-endpoints#get-status-disk) at node level  | Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| [GET /status/network](/appliance/monitoring/authenticated-endpoints#get-status-network) at node level	| Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| [GET /status/internet](/appliance/monitoring/authenticated-endpoints#get-status-internet) at node level | Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| [GET /status/email](/appliance/monitoring/authenticated-endpoints#get-status-email) at node level | Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| [GET /status/db](/appliance/monitoring/authenticated-endpoints#get-status-db) at node level | Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| [GET /status/replicaset](/appliance/monitoring/authenticated-endpoints#get-status-replicaset) at node level | Returns a 520 status code | [Submit a support ticket](/support/tickets) with a severity of **Normal** |
| Synthetic Transaction: Login | Synthetic login failed | [Submit a support ticket](/support/tickets) with a severity of **Normal** |

When building your monitoring strategy for a PSaaS Appliance implementation hosted on an environment you own or control, remember that you are responsible for using the instrumentation and tenant log data to watch for anomalies.

## Your Responsibilities in Monitoring the Auth0-Hosted PSaaS Appliance

If Auth0 hosts your PSaaS Appliance, you won't have access to instrumentation data. However, you are still expected to monitor your tenant logs for anomalies, since this provides you information on the health of your PSaaS Appliance-dependent applications.

If Auth0 hosts your PSaaS Appliance implementation, Auth0's Managed Service Engineering (MSE) team is responsible for monitoring. However, the MSE team is focused on the health of the PSaaS Appliance – you are responsible for tracking the health of your applications, as well as its usage of Auth0.

If you provide Auth0 with the appropriate email addresses, Auth0 can send a daily uptime report of your hosted PSaaS Appliance service to those email addresses. You can also specify one or more email addresses to which Auth0 will send alerts in the event that there is an issue.
