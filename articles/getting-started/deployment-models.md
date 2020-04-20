---
title: Auth0 Deployment Models
description: Read about the four different deployment models that Auth0 offers and the differences between them
toc: true
topics:
  - auth0-101
  - deployment-models
contentType:
    - concept
useCase:
    - development
    - get-started
---
# Auth0 Deployment Models

Auth0 is offered in the following deployment models:

<table class="table">
<tr>
    <th>Deployment</th>
    <th>Description</th>
</tr>
<tr>
    <td>Public Cloud</td>
    <td>A multi-tenant cloud service running on Auth0's cloud</td>
</tr>
<tr>
    <td>Standard Private Cloud</td>
    <td>A dedicated cloud service running on Auth0's cloud</td>
</tr>
<tr>
    <td>Managed Private Cloud</td>
    <td>A dedicated cloud service running on either Auth0's cloud or the customer's AWS cloud infrastructure</td>
</tr>
</table>

The [Standard and the Managed Private Cloud](/private-cloud) options are managed services that you can use if:

* Your organization's requirements prevent you from using the multi-tenant public cloud service
* You require an SLA guaranteeing higher uptimes
* You require a guaranteed level of requests per second

The following tables describe operational and feature differences between these models.

## Operational Differences

<table class="table">
    <thead>
        <tr>
            <th class="info"><strong>Where It Runs</strong></th>
            <th class="info"><strong>Auth0's Infrastructure</strong></th>
            <th class="info"><strong>Auth0's Infrastructure</strong></th>
            <th class="info"><strong>Auth0's Infrastructure or Customer's AWS Cloud</strong></th>
        </tr>
        <tr>
            <th class="info"><strong>How It Runs</strong></th>
            <th class="info">Public Cloud (Multi-Tenant)</th>
            <th class="info">Standard Private Cloud</th>
            <th class="info">Managed Private Cloud</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th class="info"><strong>Public Facing</strong></th>
            <td>Yes</td>
            <td>Yes</td>
            <td><i>Auth0's Cloud</i>: Yes <br /><i>Customer's AWS Cloud</i>: Configurable<sup>*</sup></td>
        </tr>
        <tr>
            <th class="info"><strong>Updates</strong></th>
            <td>Automatic Updates</td>
            <td>Automatic Monthly Updates</td>
            <td>Monthly, bi-monthly, or quarterly as coordinated with Auth0. Excludes critical updates (e.g., security patches), which will be applied as soon as possible</td>
        </tr>
        <tr>
            <th class="info"><strong>Deployment Configurations</strong></th>
            <td>N/A</td>
            <td>High Availability (HA);<br />High Capacity
            <td>High Availability (HA);<br />Geo HA;<br />High Capacity;<br />Geo HA and High Capacity</td>
        </tr>
        <tr>
            <th class="info"><strong>Isolated Non-Production Environment</strong></th>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th class="info"><strong>Service & Uptime Reporting</strong></th>
            <td><a href="https://status.auth0.com">https://status.auth0.com</a><br /><a href="http://uptime.auth0.com">http://uptime.auth0.com</a></td>
            <td>Monitored by Auth0</td>
            <td><i>Auth0's Cloud</i>: Auth0 <br /><i>Customer's AWS Cloud</i>: Customer</td>
        </tr>
        <tr>
            <th class="info"><strong>Infrastructure and Backup Responsibility</strong></th>
            <td>Auth0</td>
            <td>Auth0</td>
            <td><i>Auth0's Cloud</i>: Auth0 <br /><i>Customer's AWS Cloud</i>: Customer</td>
        </tr>
        <tr>
            <th class="info"><strong>Uptime SLA Provided</strong></th>
            <td>99.90% <br />No upgrade option available</td>
            <td>99.95% SLA with optional upgrade to 99.99%<sup>**</sup></td>
            <td>99.95% SLA with optional upgrade to 99.99%<sup>**</sup></td>
        </tr>
        <tr>
            <th class="info"><strong>Requests per Second</strong></th>
          <td>See <a href="https://auth0.com/docs/policies/rate-limits">Rate Limit Policy for Auth0 APIs</a></td>
            <td>500 requests per second with optional upgrade to 1500 requests per second</td>
            <td>500 requests per second with optional upgrade to 1500 requests per second</td>
        </tr>
        <tr>
            <th class="info"><strong>Data Residency</strong></th>
            <td>Not applicable</td>
            <td>Region of Choice<sup>***</sup> <sup>****</sup></td>
            <td>Region of Choice<sup>***</sup></td>
        </tr>
        <tr>
            <th class="info"><strong>PCI Compliance</strong></th>
            <td>No</td>
            <td>Add-on available</td>
            <td>Add-on available for Auth0-Hosted Private Cloud</td>
        </tr>
        <tr>
            <th class="info"><strong>Support Channels & Levels</strong></th>
            <td>Same across all models</td>
            <td>Same across all models</td>
            <td>Same across all models</td>
        </tr>
    </tbody>
</table>

<sup>*</sup>Access to the Managed Private Cloud can be restricted to customer's private subnets.

<sup>**</sup>See the **PSaaS Appliance** section the Auth0 [Service Level Description](https://auth0.com/legal) (located under **Support Program and Service Levels**).

<sup>***</sup>Deployments to China are currently unavailable.

<sup>****</sup>If you need to meet data sovereignty requirements, Auth0 supports Private Cloud deployments in the following regions USA, Europe, Australia, Canada, and Japan. Otherwise, the Private Cloud can be supported in other regions (excepting China).

## Feature Differences

<table class="table">
    <thead>
        <tr>
            <th class="info"><strong>Where It Runs</strong></th>
            <th class="info"><strong>Public Cloud (Multi-Tenant)</strong></th>
            <th class="info"><strong>Standard Private Cloud</strong></th>
            <th class="info"><strong>Managed Private Cloud</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th class="info"><strong>Tenant Log Search</strong></th>
            <td><a href="/logs/references/query-syntax">v3</a></td>
            <td><a href="/logs/references/query-syntax">v3</a></td>
        </tr>
        <tr>
            <th class="info"><strong>Code Sandbox</strong></th>
            <td>Webtask (Node.js version 8 and C#)</td>
            <td>Webtask (Node.js version 8)</td>
            <td>Webtask (Node.js version 8)</td>
        </tr>
        <tr>
            <th class="info"><strong>Webtask</strong></th>
            <td>Multi-Tenant</td>
            <td>Dedicated</td>
            <td>Dedicated</td>
        </tr>
        <tr>
            <th class="info"><strong>Anomaly Detection</strong></th>
            <td>Brute Force and Breached Passwords</td>
            <td>Brute Force and Breached Passwords</td>
            <td>Brute Force and Breached Passwords</td>
        </tr>
        <tr>
            <th class="info"><strong>Connecting IP Address Filtering Restrictions</strong></th>
            <td>No</td>
            <td>No</td>
            <td><i>Auth0's Cloud</i>: No <br /><i>Customer's AWS Cloud</i>: Yes</td>
        </tr>
        <tr>
            <th class="info"><strong><a href="/custom-domains">Custom Domains</a></strong></th>
            <td>Yes</td>
            <td>Yes<sup>*</sup></td>
            <td>Yes<sup>*</sup></td>
        <tr>
            <th class="info"><strong>Shared Resources Among Multiple Customers</strong></th>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
        </tr>
        <tr>
          <th class="info"><strong>MFA</strong></th>
          <td>Yes</td>
          <td>Available using SMS, Google Authenticator or similar apps, Duo over TOTP/HOTP, Email, and Push Notification with Guardian </td>
          <td>Available using SMS, Google Authenticator or similar apps, Duo over TOTP/HOTP, Email, and Push Notification with Guardian</td>
        </tr>
    </tbody>
</table>

<sup>*</sup>See [Custom Domains](/appliance/custom-domains) and [Private Cloud Requirements](/appliance/private-cloud-requirements) for details.
