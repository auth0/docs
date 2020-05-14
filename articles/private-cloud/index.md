---
section: private-cloud
description: Overview of the Private Cloud offerings
classes: topic-page
topics:
    - private-cloud
    - managed-private-cloud
contentType: concept
useCase: private-cloud
title: Private Cloud
---
# Private Cloud

Users with requirements not met by the Auth0 Public Cloud may instead opt for a Private Cloud deployment option.

Auth0 currently offers two Private Cloud deployment models:

* [**Standard** Private Cloud](/private-cloud/standard-private-cloud)
* [**Managed** Private Cloud](/private-cloud/managed-private-cloud) (which is either hosted by Auth0 or hosted by you on an AWS environment, and in either case, operated by Auth0 as a managed service).

Private Cloud deployments are single-subscriber, isolated instances where none of a customer's resources (software and infrastructure) are shared with any other tenants. This offers increased performance, stability, and availability.

You may be interested in considering the Private Cloud offering if you have any of the following concerns:

* [Data residency and isolation](#data-residency-and-isolation)
* [Maximum availability SLA](#maximum-availability)
* [High demand apps](#high-demand-apps)
* [PCI Certification](#pci-compliance-certification)
* [Minimum cloud exposure](#minimum-cloud-exposure)

## Data Residency and Isolation

Data isolation is one of the main facets of the Private Cloud. Your resources, be those software or other infrastructure, are not shared amongst other tenants. Private Cloud intends to, as its name signifies, keep your data isolated and private, and help mitigate the potential risks of a cloud deployment by not sharing resources with other tenants.

Private Cloud customers can choose the region where their data is stored. Any [available region](/private-cloud/deployable-regions) with three availability zones can be used for the Private Cloud. All data will remain in and be stored in the chosen region. This is crucial in instances where regulations prevent data from being sent outside the origin region.

For Auth0-hosted Private Cloud customers:

* Backups will be processed and stored in the US.
* Service logs will be processed in the region closest to where the customer hosts their Private Cloud.

If you are a **Private Cloud** customer with data sovereignty requirements, Auth0 supports Private Cloud deployments in the following regions: USA, Europe, Australia, Canada, and Japan. If you do not have data sovereignty requirements, the Private Cloud can be supported in most other regions (other than China). Furthermore, Auth0 can:

* Deploy backups to the AWS S3 service in the same region that hosts the Private Cloud.
* Send service logs to Japan, Germany, United Kingdom, United States, Canada, or Australia (regardless of which region you've chosen to host the Private Cloud). You may also opt to not send any service logs.

::: note
We are currently unable to offer deployments of any kind to China.
:::

## Maximum Availability

Auth0's Private Cloud instances have the highest Service Level Agreement (SLA) for availability of all other deployment options. In both the Standard and Managed Private Cloud instances, there is a 99.95% SLA with an optional upgrade to 99.99%. If SLA uptime is your primary concern, an upgraded Private Cloud deployment is the maximum that can be acquired. 

## High Demand Apps

If your application requires a significantly high amount of requests per second (RPS), you may also wish to consider Private Cloud. Any requirement over 100 logins per second should choose a Private Deployment. Take a look at the [rate limits policies](/policies/rate-limits) for more information about the standard rate limits. For Private Cloud deployments, the limit is 500 RPS with optional upgrade to 1500 RPS.

## PCI Compliance Certification

If your application is PCI Compliant, or striving to be, and your requirements indicate that your identity provider also needs to be PCI compliant, this is only available as a Private Cloud addon. Public cloud tenants cannot acquire this benefit.

## Minimum Cloud Exposure

Although it seems that everything lives in one public cloud or another, the fact remains that many businesses are reluctant to bring their intellectual property, and worse, their customers' data, into a cloud that they do not control. Moving core functionality out of your own data centers can be difficult. Private Cloud can help ease this burden by providing the agility and flexibility of cloud infrastructure without the perceived dangers of sharing the resources with others. It also gives you a larger degree of control over your Auth0 tenants than the public cloud does.