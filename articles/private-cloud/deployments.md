---
title: Private Cloud Deployments
section: private-cloud
description: Overview of the Private Cloud deployment options
topics:
    - private-cloud
    - managed-private-cloud
contentType: reference
useCase: private-cloud
---

# Private Cloud Deployments

Auth0 offers the following Private Cloud deployment options:

* Standard Private Cloud
* Managed Private Cloud, hosted by Auth0 or self-hosted on Amazon Web Services (AWS).

What are the differences between Standard Private Cloud and Auth0-Hosted Managed Private Cloud?

* Auth0 Hosted Managed Private Cloud comes with a pre-production environment. 
* Auth0 Hosted Managed Private Cloud customers are allowed to choose the frequency of their updates. Standard Private Cloud receives automatic monthly updates to the environment.

Here is how the two Private Cloud deployment options compare to each other, as well as how they compare to the Enterprise (Public Cloud) option.

| | Managed | Standard |
| - | - | - |
| Instance Type | **Dedicated** Cloud Instance | **Dedicated** Cloud Instance |
| Deployment Location | Auth0 Private Cloud *or* Customer-Owned AWS Cloud | Auth0 Private Cloud |
| Pre-Production Environment | Includes fully-isolated and independently updated instance for development and testing | Additional tenants within the same instance as the production tenant available |
| Updates | Choice of update frequency to be coordinated with Auth0. Update cycle begins with the Pre-Production Environment | Automatic Monthly Updates |
| Uptime Guarantee | 99.95% SLA with optional upgrade to 99.99% | 99.95% SLA with optional upgrade to 99.99% |
| Requests per Second | 500 requests per second with optional upgrade to 1500 requests per second | 500 requests per second with optional upgrade to 1500 requests per second |
| [Data Residency](#data-residency) | Region of Choice | Region of Choice |
| PCI Certified | Add-on available | Add-on available |
| Geographic High Availability (GEOHA) | Add-on available | No |

## Standard

## Managed

Auth0's **Managed Private Cloud** (MPC) is a specially customized Auth0 deployment that gives you greater flexibility and increased input when it comes to day-to-day operations.

With a Managed Private Cloud, we work closely with you to make sure that all aspects of your Auth0 environment and deployment are tuned to best meet the needs of your business.

* On-Demand Balancing: If you're expecting a usage spike, contact us and we'll scale your environment so that you have the capacity you need to handle the your traffic load.
* Annual Load Testing: You may choose to load test your Auth0 environment if desired. While not required, Auth0 appreciates notification of such tests ahead of time.
* Scheduled Updates: Scheduled updates to create a release cadence to fit your team and your business' schedule
* Staging Environment: Dedicated environment to test new releases and changes
* GEO-HA: Optional. Add-on available for Geographic High Availability.
* Customer-Hosting: Optional. Can host your Auth0 deployment in an AWS cloud owned by you

### Auth0-hosted

### Self-hosted


Introduction - why there are separate models?

Data Isolation and/or Data Residency
Keep customer data separate from other Auth0 customers, or store data in a specific location. View available regions here: Restrictions / Limitations

Highest Level of Availability
Maximum uptime guarantees; backed by our highest Service Level Agreement (SLA).


High Demand Apps
Requires high requests per second (RPS). Any requirement over 200 logins per second should choose a Private Deployment.


PCI Certified
Only available through a Private Cloud deployment.


Minimum Exposure to Cloud Services
Eases hesitation to move core functionality out of a customer’s data centers.


## Compare

Focusing on “how to tell if you need managed pc or if you can do without it” - content comes from the above sources and the internal doc.

What are the differences between Standard Private Cloud and Auth0-Hosted Managed Private Cloud?

* Auth0 Hosted Managed Private Cloud comes with a pre-production environment. 
* Auth0 Hosted Managed Private Cloud customers are allowed to choose the frequency of their updates. Standard Private Cloud receives automatic monthly updates to the environment.

A separate DEV (Pre-Production) environment
Fully-isolated and independently updated instance for development and testing.*

Customer-hosted AWS deployment
More control over the environment

GEO-HA deployment option
Data center redundancy and automatic failure handling.

Choice of update frequency
Coordinated with Auth0; update cycle begins with the Pre-Production Environment.

On-demand scaling and additional load testing support
Scaling of environment if customer is expecting a traffic spike. Better support for large load tests.