---
section: private-cloud
description: Overview of the Private Cloud deployment options
classes: topic-page
topics:
    - private-cloud
    - managed-private-cloud
contentType: concept
useCase: private-cloud
title: Private Cloud Deployment
---
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Private Cloud Deployment</h1>
  <p>
    A low-friction, dedicated Auth0 deployment that exists in Auth0's Private Cloud or a Customer-Hosted Cloud.
  </p>
</div>

Users with requirements not met by the Auth0 Public Cloud may instead opt for a Private Cloud deployment option.

Auth0 currently offers two Private Cloud deployment models:

* [**Standard** Private Cloud](/private-cloud/standard-private-cloud)
* [**Managed** Private Cloud](/private-cloud/managed-private-cloud), either hosted by Auth0 or hosted by you on an AWS environment and operated by Auth0 as a managed service

Private Cloud deployments are single-subscriber, isolated instances where none of a customer's resources (software and infrastructure) are shared with any other tenants. This offers increased performance, stability, and availability.

## Private Cloud options and comparison

Here is how the two Private Cloud deployment options compare to each other, as well as how they compare to the Enterprise (Public Cloud) option.

| | Managed | Standard | Public Cloud (Enterprise Subscription Plan) |
| - | - | - | - |
| Instance Type | **Dedicated** Cloud Instance | **Dedicated** Cloud Instance | **Shared** Cloud Instance |
| Deployment Location | Auth0 Private Cloud *or* Customer-Owned AWS Cloud | Auth0 Private Cloud | Auth0 Public Cloud |
| Pre-Production Environment | Includes fully-isolated and independently updated instance for development and testing | Additional tenants within the same instance as the production tenant available | Additional tenant within the shared environment |
| Updates | Choice of update frequency to be coordinated with Auth0. Update cycle begins with the Pre-Production Environment | Automatic Monthly Updates | Automatic Updates |
| Uptime Guarantee | 99.95% SLA with optional upgrade to 99.99% | 99.95% SLA with optional upgrade to 99.99% | 99.90% (no upgrade option available) |
| Requests per Second | 500 requests per second with optional upgrade to 1500 requests per second | 500 requests per second with optional upgrade to 1500 requests per second | See [Rate Limit Policy for Auth0 APIs](/policies/rate-limits) |
| [Data Residency](#data-residency) | Region of Choice | Region of Choice | Varies based on tenant location |
| PCI Certified | Add-on available | Add-on available | No |
| Geographic High Availability (GEOHA) | Add-on available | No | No |

## Data residency

Private Cloud customers can choose the region where their data is stored -- any region with three (3) availability zones can be used for the Private Cloud. All data will remain and be stored in the chosen region. This is crucial in instances where regulations prevent data from being sent outside the origin region.

For Auth0-hosted Private Cloud customers:

* Backups will be processed and stored in the US
* Service logs will be processed in the region closest to where the customer hosts their Private Cloud; the current options include Japan, Germany, United Kingdom, United States, Canada, or Australia.

If you are a **Private Cloud** customer with data sovereignty requirements, Auth0 supports Private Cloud deployments in the following regions: USA, Europe, Australia, Canada, and Japan. Otherwise, the Private Cloud can be supported in other regions (except China). Furthermore, Auth0 can:

* Deploy backups to AWS' S3 service in the same region that hosts the Private Cloud
* Send service logs to Japan, Germany, United Kingdom, United States, Canada, or Australia (regardless of which region you've chosen to host the Private Cloud). You may also opt to not send any service logs

We are currently unable to offer deployments to China.

## Additional information

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i>
    <a href="/private-cloud/add-ons">Add-Ons for Private Cloud Deployments</a>
    <p>Add-on options available to customers with Private Cloud Deployments.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i>
    <a href="/private-cloud/custom-domain-migration">Custom Domain Migration</a>
    <p>Information on how to migrate custom domains using the Private Cloud Custom Domains feature to the Auth0 Custom Domains feature.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i>
    <a href="/private-cloud/onboarding">Private Cloud Onboarding</a>
    <p>Onboarding information, including timelines and expectations, for Private Cloud Deployments.</p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i>
        <a href="/private-cloud/onboarding/private-cloud">Private Cloud Onboarding</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i>
        <a href="/private-cloud/onboarding/managed-private-cloud">Managed Private Cloud Onboarding</a>
      </li>
    </ul>
  </li>
    <li>
    <i class="icon icon-budicon-715"></i>
    <a href="/private-cloud/managed-private-cloud/zones">Zones</a>
    <p>How to create and configure zones to group together multiple Managed Private Cloud nodes</p>
  </li>
</ul>