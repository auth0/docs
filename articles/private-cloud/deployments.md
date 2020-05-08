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

# Private Cloud Deployments

Auth0 offers the following Private Cloud deployment options:

* Standard Private Cloud
* Managed Private Cloud
    * hosted by Auth0
    * hosted by you on an Amazon Web Services (AWS) environment and operated by Auth0 as a managed service.

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

## What standard one is



## What managed one is

Auth0's **Managed Private Cloud** (MPC) is a specially customized Auth0 deployment that gives you greater flexibility and increased input when it comes to day-to-day operations.

With a Managed Private Cloud, we work closely with you to make sure that all aspects of your Auth0 environment and deployment are tuned to best meet the needs of your business.

* On-Demand Balancing: If you're expecting a usage spike, contact us and we'll scale your environment so that you have the capacity you need to handle the your traffic load.
* Annual Load Testing: You may choose to load test your Auth0 environment if desired. While not required, Auth0 appreciates notification of such tests ahead of time.
* Scheduled Updates: Scheduled updates to create a release cadence to fit your team and your business' schedule
* Staging Environment: Dedicated environment to test new releases and changes
* GEO-HA: Optional. Add-on available for Geographic High Availability.
* Customer-Hosting: Optional. Can host your Auth0 deployment in an AWS cloud owned by you

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