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

Auth0 is offered in four deployment models:

- As a **multi-tenant cloud service** running on Auth0's cloud
- As a **dedicated cloud service** running on Auth0's cloud
- As a **dedicated cloud service** running on Customer's cloud infrastructure
- As an **on-premises virtual Private SaaS (PSaaS) Appliance** running on Customer's data centers

::: note
PSaaS Appliance is a managed service that you can use if your organization's requirements prevent you from using a multi-tenant cloud service. To learn more refer to [Private SaaS (PSaaS) Appliance](/appliance).
:::

The following tables describe operational and feature differences between these models.

## Operational Differences

<table class="table">
    <thead>
        <tr>
            <th class="info"><strong>Where It Runs</strong></th>
            <th class="info" colspan="2"><strong>Auth0's Infrastructure</strong></th>
            <th class="info" colspan="2"><strong>Customer's Infrastructure</strong></th>
        </tr>
        <tr>
            <th class="info"><strong>How It Runs</strong></th>
            <th class="info">Multi-Tenant</th>
            <th class="info">Dedicated</th>
            <th class="info">Cloud</th>
            <th class="info">On-Premises</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th class="info"><strong>Public Facing</strong></th>
            <td>Yes</td>
            <td>Yes</td>
            <td>Configurable</td>
            <td>Configurable</td>
        </tr>
        <tr>
            <th class="info"><strong>Updates</strong></th>
            <td>Unscheduled. <br /> Multiple times per day. <br /><br />Staged in two zones.</td>
            <td>Scheduled with Customer. <br /><br />Monthly, bi-monthly, or quarterly, except critical updates (such as security updates).</td>
            <td>Scheduled with Customer. <br /><br />Monthly, bi-monthly, or quarterly, except critical updates (such as security updates)</td>
            <td>Scheduled with Customer. <br /><br />Monthly, bi-monthly, or quarterly, except critical updates (such as security updates)</td>
        </tr>
        <tr>
            <th class="info"><strong>Deployment Configurations</strong></th>
            <td>N/A</td>
            <td>High Availability (HA);<br />Geo HA;<br />High Capacity;<br />Geo HA and High Capacity</td>
            <td>High Availability (HA);<br />Geo HA;<br />High Capacity;<br />Geo HA and High Capacity</td>
            <td>High Availability (HA);<br />Geo HA;<br />High Capacity;<br />Geo HA and High Capacity</td>
        </tr>
        <tr>
            <th class="info"><strong>Service & Uptime Reporting</strong></th>
            <td><a href="https://status.auth0.com">https://status.auth0.com</a><br /><a href="http://uptime.auth0.com">http://uptime.auth0.com</a></td>
            <td>Monitored by Auth0</td>
            <td>Monitored by Customer</td>
            <td>Monitored by Customer</td>
        </tr>
        <tr>
            <th class="info"><strong>Uptime SLA Provided</strong></th>
            <td>Yes</td>
            <td>Yes</td>
            <td>Limited to PSaaS Appliance*</td>
            <td>Limited to PSaaS Appliance*</td>
        </tr>
        <tr>
            <th class="info"><strong>Support Channels & Levels</strong></th>
            <td colspan="4">Same across all models</td>
        </tr>
    </tbody>
</table>
<p>*See "PSaaS Appliance" section in <a href="https://auth0.com/legal">Service Level Description</a></p>

## Feature Differences

<table class="table">
    <thead>
        <tr>
            <th class="info"><strong>Where It Runs</strong></th>
            <th class="info" colspan="2"><strong>Auth0's Infrastructure</strong></th>
            <th class="info" colspan="2"><strong>Customer's Infrastructure</strong></th>
        </tr>
        <tr>
            <th class="info"><strong>How It Runs</strong></th>
            <th class="info">Multi-Tenant</th>
            <th class="info">Dedicated</th>
            <th class="info">Cloud</th>
            <th class="info">On-Premises</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th class="info"><strong>SSO Lifetime</strong></th>
            <td>Default Settings</td>
            <td>Configurable</td>
            <td>Configurable</td>
            <td>Configurable</td>
        </tr>
        <tr>
            <th class="info"><strong>User Search</strong></th>
            <td>Lucene queries</td>
            <td>Simple attribute search or Lucene queries</td>
            <td>Simple attribute search or Lucene queries</td>
            <td>Simple attribute search or Lucene queries</td>
        </tr>
        <tr>
            <th class="info"><strong>Tenant Log Search</strong></th>
            <td>Lucene queries</td>
            <td>Simple attribute search</td>
            <td>Simple attribute search</td>
            <td>Simple attribute search</td>
        </tr>
        <tr>
            <th class="info"><strong>Log Retention</strong></th>
            <td>Up to 30 days (depends on subscription plan)</td>
            <td>Limited to 30 days</td>
            <td>Limited to 30 days</td>
            <td>Limited to 30 days</td>
        </tr>
        <tr>
            <th class="info"><strong>Code Sandbox</strong></th>
            <td>Webtask (Javascript and C#)</td>
            <td>Webtask or in-process</td>
            <td>Webtask or in-process</td>
            <td>Webtask or in-process</td>
        </tr>
        <tr>
            <th class="info"><strong>Webtask</strong></th>
            <td>Multi-Tenant</td>
            <td>Dedicated (Fixed NPM modules)</td>
            <td>Dedicated (Fixed NPM modules)</td>
            <td>On-Premises (Fixed NPM modules)</td>
        </tr>
        <tr>
            <th class="info"><strong>Anomaly Detection</strong></th>
            <td>Brute Force and Breached Passwords</td>
            <td>Brute Force</td>
            <td>Brute Force</td>
            <td>Brute Force</td>
        </tr>
        <tr>
            <th class="info"><strong>Extensions</strong></th>
            <td>Yes</td>
            <td>Yes <sup>*</sup></td>
            <td>Yes <sup>*</sup></td>
            <td>Yes <sup>*</sup></td>
        </tr>
        <tr>
            <th class="info"><strong>Geolocation</strong></th>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th class="info"><strong>Connecting IP Address Filtering Restrictions</strong></th>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th class="info"><strong><a href="/custom-domains">Custom Domains</a></strong></th>
            <td>Yes</td>
            <td><a href="/appliance/custom-domains">Yes</a><sup>**</sup></td>
            <td><a href="/appliance/custom-domains">Yes</a><sup>**</sup></td>
            <td><a href="/appliance/custom-domains">Yes</a><sup>**</sup></td> 
        </tr>
        <tr>
            <th class="info"><strong>Shared Resources Among Multiple Customers</strong></th>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
        </tr>
        <tr>
          <th class="info"><strong>MFA</strong></th>
          <td>Yes</td>
          <td>Available using SMS, Google Authenticator, Duo over TOTP/HOTP, and Push Notification with Guardian SDK.</td>
          <td>Available using SMS, Google Authenticator, Duo over TOTP/HOTP, and Push Notification with Guardian SDK.</td>
          <td>Available using SMS, Google Authenticator, Duo over TOTP/HOTP, and Push Notification with Guardian SDK.</td>
        </tr>
        <tr>
          <th class="info"><strong>Lock</strong></th>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes <sup>***</sup></td>
        </tr>
        <tr>
          <th class="info"><strong>Internet Restricted</strong></th>
          <td>No</td>
          <td>No</td>
          <td>No</td>
          <td>Optional <sup>***</sup></td>
        </tr>
    </tbody>
</table>

<sup>*</sup>See the [PSaaS Appliance: Extensions page](/appliance/extensions) to learn more about configuring extensions with the PSaaS Appliance.

<sup>**</sup>See [PSaaS Appliance Custom Domains](/appliance/custom-domains) for details. If your PSaaS Appliance is hosted in the Auth0 Private Cloud, see [Private Cloud Requirements](/appliance/private-cloud-requirements).

<sup>***</sup>You may choose to [operate the PSaaS Appliance in an Internet-restricted environment](/appliance/infrastructure/internet-restricted-deployment) (except during [update periods](/appliance/infrastructure/ip-domain-port-list#external-connectivity)).
