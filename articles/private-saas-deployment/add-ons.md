---
section: private-cloud
description: Overview of the add-on options available to Private Cloud customers
topics: private-cloud
contentType: concept
useCase: private-cloud
sitemap: false
---
# Private Cloud Add-On Options

The follow add-on options are available to Private SaaS customers:

<table class="table">
    <thead>
        <tr>
            <th></th>
            <th>Customer-Hosted MPC</th>
            <th>Auth0-Hosted MPC</th>
            <th>Private Cloud</th>
            <th>Public Cloud</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><a href="#enhanced-uptime-guarantee-sla-">Enhanced Uptime Guarantee (SLA)</a></th>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-warning">No</td>
        </tr>
        <tr>
            <th><a href="#high-capacity">High Capacity</a></td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-warning">No</td>
        </tr>
        <tr>
            <th><a href="#pci-certified">PCI Certified</a></td>
            <td><div class="label label-warning">No</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-warning">No</td>
        </tr>
        <tr>
            <th><a href="#geo-ha">GEO-HA</a></th>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-warning">No</td>
            <td><div class="label label-warning">No</td>
        </tr>
        <tr>
            <th><a href="#additional-pre-production-environment">Additional Pre-Production Environment</a></th>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-primary">Yes</td>
            <td><div class="label label-warning">No</td>
            <td><div class="label label-warning">No</td>
        </tr>
    </tbody>
</table>

## Enhanced Uptime Guarantee (SLA)

The Enhanced Uptime Guarantee (SLA) increases the Private Cloud standard SLA of 99.95% to 99.99%.

While Auth0's Public Cloud offers a 99.9% uptime guarantee, the Private Cloud's single tenant instances with dedicated resources can offer a higher SLA of 99.95%. For an additional cost, you can request the highest SLA of 99.99% uptime.

## High Capacity

The High Capacity add-on increases the maximum requests per second (RPS) the Private Cloud can handle from 500 RPS to 1500 RPS.

Auth0 guarantees that the Private Cloud can handle up to 500 requests per second (RPS), but if you are looking for greater scalability for the most demanding applications, the High Capacity add-on increases this number to 1500 RPS. This is recommended for large-scale production operations supporting over 1 million users or to support your business requirements.

## PCI Certified

Auth0's dedicated deployments are ISO27001, SOC 2 Type II, ISO27018 and HIPAA BAA compliant, but the PCI Certified add-on ensures that your deployment is compliant with PCI-DSS requirements as well.

## GEO-HA

With the Geographic High Availability (GEO-HA) add-on, you will have the highest form of dedicated deployment availability offered by Auth0.

The standard dedicated deployment is a single-region, high availability solution, but the GEO-HA add-on extends the cluster with a geographically-distributed region where the maximum round-trip latency does not exceed 100 milliseconds. This is referred to as a *high-availability GEO cluster*, which is an active hot standby configuration with automated failure handling that can survive a regional outage.

## Additional Pre-Production Environment

The Managed Private Cloud includes a fully-isolated and independently-updated instance for development and testing. You can add additional Pre-Production Environments to meet your business requirements. 

::: note
Guaranteed Requests per Second and SLA do not apply to Pre-Production Environments.
:::