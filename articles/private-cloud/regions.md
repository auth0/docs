---
section: private-cloud
title: Private Cloud Deployable Regions
description: Overview of where Private Cloud can be deployed.
topics:
    - deploy
    - regions
    - private-cloud
    - managed-private-cloud
contentType: reference
useCase: private-cloud
---

# Private Cloud Deployable Regions

With Private Cloud you can choose the region where your data is stored -- any region with three (3) [availability zones](https://aws.amazon.com/about-aws/global-infrastructure) can be used for the Private Cloud. All data will remain and be stored in the chosen region. This is crucial in instances where regulations prevent data from being sent outside the origin region.

## Backups and logs

For Auth0-hosted Private Cloud customers, backups will be processed and stored in the United States (USA). Service logs will be processed in the region closest to where Private Cloud is hosted, currently this includes:

* Australia
* Canada
* Germany
* India
* Ireland
* Japan
* United States

## Data sovereignty

If you are a Private Cloud customer with data sovereignty requirements, Auth0 supports Private Cloud deployments in the following regions: USA, Europe, Australia, Canada, and Japan. Otherwise, the Private Cloud can be supported in other regions (except China). Furthermore, Auth0 can:

* Deploy backups to AWS' S3 service in the same region that hosts the Private Cloud
* Send service logs to Japan, Germany, United Kingdom, United States, Canada, or Australia (regardless of which region you've chosen to host the Private Cloud). You may also opt to not send any service logs.