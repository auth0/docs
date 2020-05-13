---
title: Private Cloud Deployments
section: private-cloud
description: Learn about the Private Cloud deployment options.
topics:
    - private-cloud
    - managed-private-cloud
contentType: reference
useCase: private-cloud
---

# Private Cloud Deployments

Private Cloud deployments are single-subscriber, isolated cloud instances where none of your resources (software and infrastructure) are shared with any other tenants. This offers increased performance, stability, and availability.

Auth0 offers two Private Cloud deployment options:

* Standard Private Cloud
* Managed Private Cloud (MPC), hosted by Auth0 or self-hosted on Amazon Web Services (AWS)

Each of these options provide:

* Data isolation: Keep your data separate from other Auth0 customers.
* Highest level of availability: Private Cloud instances offer a higher SLA of 99.95%. For an additional cost, you can request the highest SLA of 99.99% uptime.
* Requests per second: 500 requests per second with optional upgrade to 1500 requests per second.
* PCI certification: Only available through a Private Cloud deployment.

## Compare options

Here's how the Standard and Managed Private Cloud deployment options compare to each other:

| | Managed | Standard |
| - | - | - |
| Instance Type | **Dedicated** Cloud Instance | **Dedicated** Cloud Instance |
| Deployment Location | Auth0 Private Cloud *or* Customer-Owned AWS Cloud | Auth0 Private Cloud |
| Pre-Production Environment | Includes fully-isolated and independently-updated instance for development and testing | Additional tenants within the same instance as the production tenant available |
| Updates | Choice of update frequency to be coordinated with Auth0. Update cycle begins with the Pre-Production Environment | Automatic Monthly Updates |
| Uptime Guarantee | 99.95% SLA with optional upgrade to 99.99% | 99.95% SLA with optional upgrade to 99.99% |
| Requests per Second | 500 requests per second with optional upgrade to 1500 requests per second | 500 requests per second with optional upgrade to 1500 requests per second |
| Data Residency | Region of Choice | Region of Choice |
| PCI Certified | Add-on available | Add-on available |
| Geographic High Availability (GEOHA) | Add-on available | No |

## Standard

The Standard Private Cloud option provides you with a dedicated (or single-subscriber) environment. You'll get enhanced performance, security, and compliance versus our standard Public Cloud offering.

With the Standard Private Cloud, Auth0 will handle a majority of the requirements for initial setup and maintenance. Afterward, you'll be on a set update pattern, typically no more frequent than every 30 days.

You'll get the ease of management that comes with using our Public Cloud combined with the power and security of our Managed Private Cloud.

## Managed

Managed Private Cloud is a specially-customized Auth0 deployment that gives you greater flexibility and increased input when it comes to day-to-day operations.

With a Managed Private Cloud, we work closely with you to make sure that all aspects of your Auth0 environment and deployment are tuned to best meet the needs of your business:

* On-demand balancing: If you're expecting a usage spike, contact us and we'll scale your environment so that you have the capacity you need to handle your traffic load.
* Annual load testing: You may choose to load test your Auth0 environment, if desired. While not required, Auth0 appreciates notification of such tests ahead of time.
* Scheduled updates: Schedule updates to create a release cadence to fit your team and your business's schedule.
* Staging environment: Fully-isolated and independently-updated instance for development and testing.
* Geographic high availability: Optional. Add-on available for GEO-HA.
* Customer hosting: Optional. You can host your Auth0 deployment in your own AWS environment.

### Differences between Auth0-Hosted and Self-Hosted

Here's how the Auth0-Hosted and Self-Hosted Managed Private Cloud deployment options differ from each other:

* Auth0-Hosted MPC is public facing, while Self-Hosted MPC can be configured to be public facing or not.
* Auth0 monitors Auth0-Hosted MPC deployment. If you have a Self-Hosted MPC, you're responsible for monitoring the deployment. This includes, but is not limited to, EC2 hosts, storage, network resources, and required dependencies.
* Auth0 performs backups for Auth0-Hosted MPC deployments. For Self-Hosted MPC deployments, you'll need to perform backups yourself.
* The PCI Compliance add-on is not available for Self-Hosted MPC deployments.

## Should I choose a Standard or Managed deployment?

Some features are only available to Managed Private Cloud deployments. The following questions will help you determine if you need Managed Private Cloud or if Standard Private Cloud fits your business requirements.

* Do you need a separate, independently-updated pre-production environment?
* Do you need more control over the environment?
* Do you need data center redundancy and automatic failure handling?
* Do you need to set your own update schedule?
* Do you need on-demand scaling?
* Do you need more support for large load tests?

If the answer is “YES” to any of the above questions, then Managed Private Cloud is the best choice.
