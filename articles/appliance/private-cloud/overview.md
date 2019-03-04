---
url: /enterprise/private-cloud/overview
section: enterprise
description: Overview of the Private Cloud deployment option
classes: topic-page
topics:
    - enterprise
    - private-cloud
contentType: concept
useCase: enterprise
---
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Private Cloud Deployment Models</h1>
  <p>
    A low-friction, dedicated Auth0 deployment that exists in Auth0's Private Cloud.
  </p>
</div>

Users with requirements not met by the Auth0 Public Cloud may instead opt for a Private Cloud option.

Auth0 currently offers two Private Cloud deployment models:

* Private Cloud
* **Managed** Private Cloud, either hosted by Auth0 or hosted by you on an AWS environment and operated by Auth0 as a managed service

This overview covers specifically the **Private Cloud** option.

## What is the Private Cloud deployment model?

The Private Cloud provides you with a dedicated (or single-tenant) environment. You'll get enhanced performance, security, and compliance over what we include in our standard Public Cloud offering.

With the Private Cloud, Auth0 will handle a majority of the requirements for initial setup and maintenance. Afterward, you'll be on a set update pattern, typically no more frequent than every 30 days.

You'll get the ease of management that comes with using our Public Cloud combined with the power and security of our Managed Private Cloud.

## Private Cloud options and comparison

Auth0 offers two Private Cloud options to those for whom the Public Cloud is not an appropriate deployment option. Here is how the two Private Cloud deployment options compare to each other, as well as how they compare to the Enterprise (Public Cloud) option.

| | Managed Private Cloud | Private Cloud | Public Cloud (Enterprise Subscription Plan) |
| - | - | - | - |
| Instance Type | **Dedicated** Cloud Instance | **Dedicated** Cloud Instance | **Shared** Cloud Instance |
| Deployment Location | Auth0 Private Cloud *or* Customer-Owned AWS Cloud | Auth0 Private Cloud | Auth0 Public Cloud |
| Pre-Production Environment | Includes fully-isolated and independently updated instance for development and testing | Additional tenants within the same instance as the production tenant available | Additional tenant within the shared environment |
| Updates | Choice of update frequency to be coordinated with Auth0. Update cycle begins with the Pre-Production Environment | Automatic Monthly Updates | Automatic Updates |
| Uptime Guarantee | 99.95% SLA with optional upgrade to 99.99% | 99.95% SLA with optional upgrade to 99.99% | 99.90% (no upgrade option available) |
| Requests per Second | 500 requests per second with optional upgrade to 1500 requests per second | 500 requests per second with optional upgrade to 1500 requests per second | No guaranteed rates |
| Data Residency | Region of Choice<sup>*</sup> | Region of Choice<sup>*</sup> <sup>**</sup> | Not applicable |
| PCI Compliance | Add-on available | Add-on available | No |
| Geographic High Availability (GEOHA) | Add-on available | No | No |

<sup>*</sup>Deployments to China are currently unavailable.

<sup>**</sup>If you need to meet data sovereignty requirements, Auth0 supports Private Cloud deployments in the following regions USA, Europe, Australia, Canada, and Japan. Otherwise, the Private Cloud can be supported in other regions (excepting China).

## Frequently Asked Questions

**Can you tell me more about "data residency?"**

Private Cloud customers can choose the region in which their data is stored. All data will remain within that region, which is crucial especially in instances where regulations prevent data from being sent outside the origin region.

**What is a single-tenancy deployment?**

Private Cloud deployments are isolated instances where none of a customer's resources (software and infrastructure) are shared with any other tenants. This offers increased performance, stability, and availability.

**What is the uptime guarantee upgrade?**

The standard SLA for the Private Cloud is 99.95%, but for those who need the highest level of uptime for their customers and applications, Auth0 offers an upgrade to 99.99% uptime.