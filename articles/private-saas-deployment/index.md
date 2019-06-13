---
section: private-saas
description: Overview of the Private SaaS deployment options
classes: topic-page
topics:
    - private-saas
    - private-cloud
    - managed-private-cloud
contentType: concept
useCase: private-saas
---
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Private Saas Deployment Models</h1>
  <p>
    A low-friction, dedicated Auth0 deployment that exists in Auth0's Private Cloud.
  </p>
</div>

Users with requirements not met by the Auth0 Public Cloud may instead opt for a Private SaaS deployment option.

Auth0 currently offers two Private SaaS deployment models:

* [Private Cloud](/private-saas-deployment/private-cloud)
* [**Managed** Private Cloud](/private-saas-deployment/managed-private-cloud), either hosted by Auth0 or hosted by you on an AWS environment and operated by Auth0 as a managed service

Private SaaS deployments are single-subscriber, isolated instances where none of a customer's resources (software and infrastructure) are shared with any other tenants. This offers increased performance, stability, and availability.

## Private Cloud options and comparison

Here is how the two Private SaaS deployment options compare to each other, as well as how they compare to the Enterprise (Public Cloud) option.

| | Managed Private Cloud | Private Cloud | Public Cloud (Enterprise Subscription Plan) |
| - | - | - | - |
| Instance Type | **Dedicated** Cloud Instance | **Dedicated** Cloud Instance | **Shared** Cloud Instance |
| Deployment Location | Auth0 Private Cloud *or* Customer-Owned AWS Cloud | Auth0 Private Cloud | Auth0 Public Cloud |
| Pre-Production Environment | Includes fully-isolated and independently updated instance for development and testing | Additional tenants within the same instance as the production tenant available | Additional tenant within the shared environment |
| Updates | Choice of update frequency to be coordinated with Auth0. Update cycle begins with the Pre-Production Environment | Automatic Monthly Updates | Automatic Updates |
| Uptime Guarantee | 99.95% SLA with optional upgrade to 99.99% | 99.95% SLA with optional upgrade to 99.99% | 99.90% (no upgrade option available) |
| Requests per Second | 500 requests per second with optional upgrade to 1500 requests per second | 500 requests per second with optional upgrade to 1500 requests per second | No guaranteed rates |
| [Data Residency](#data-residency) | Region of Choice | Region of Choice | Not applicable |
| PCI Certified | Add-on available | Add-on available | No |
| Geographic High Availability (GEOHA) | Add-on available | No | No |

## Data residency

Private Cloud customers can choose the region where their data is stored. All data will remain in that region. This is crucial in instances where regulations prevent data from being sent outside the origin region.

If you are a **Private Cloud** customer with data sovereignty requirements, Auth0 supports Private Cloud deployments in the following regions: USA, Europe, Australia, Canada, and Japan. Otherwise, the Private Cloud can be supported in other regions (except China).

We are currently unable to offer deployments to China.