---
title: Internet-Restricted PSaaS Appliance Deployments
description: Operating the PSaaS Appliance in an Internet-Restricted Environment
---
# PSaaS Appliace Deployments with Limited Internet Connectivity

The Auth0 PSaaS Appliance is delivered as a managed service that can run in:

* A data center that you own
* A cloud-based environment that you own
* Auth0's private cloud

The PSaaS Appliance is designed to mirror the solutions offered via the Auth0 Public Cloud as closely as possible to ensure that features *and* issue fixes can be readily applied to PSaaS Appliance. Though there are differences between the Public Cloud product and the PSaaS Appliance, these are primarily due to technical limitations posed by the PSaaS Appliance environments.

## Internet-Restricted Environments

While we make an effort to create PSaaS Appliances that are encapsulated for normal operation, there are several features that require access to external resources for normal functionality. These resources are primarily located on the Auth0 Content Delivery Network (CDN).

::: warning
The PSaaS Appliance must have access to the internet during [update periods](https://auth0.com/docs/appliance/infrastructure/ip-domain-port-list#external-connectivity).
:::

If you choose to operate the PSaaS Appliance in an internet-restricted environment, you will not have acess to the following features/functionality:

* Management Dashboard
* Lock
* Management API Explorer
* Authentication API Explorer
* Quickstarts

## Summary

While the PSaaS Appliance is somewhat encapsulated for normal operation, it requires access to specific external resources for normal functionality. These resources are primarily located on the Auth0 CDN.

Currently, there are no plans to reduce the reliance of the PSaaS Appliance on the Auth0 CDN.