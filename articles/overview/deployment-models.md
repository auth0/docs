---
description: This page explains the differences of the four different deployment models in which Auth0 is offered.
toc: true
---

# Auth0 Deployment Models

Auth0 is offered in 4 deployment models:

1. As a __multi-tenant cloud service__ running on Auth0's cloud.
2. As a __dedicated cloud service__ running on Auth0's cloud.
3. As a __dedicated cloud service__ running on Customer's cloud infrastructure.
4. As an __on-premises virtual appliance__ running on Customer's data centers.

The following table describes operational and feature differences between each of these models.

## Operational Differences

<table class="table">
    <thead>
        <tr>
            <th class="info">Where It Runs</th>
            <th class="info" colspan="2">Auth0's Infrastructure</th>
            <th class="info" colspan="2">Customer's Infrastructure</th>
        </tr>
        <tr>
            <th>How It Runs</th>
            <th>Multi-Tenant</th>
            <th>Dedicated</th>
            <th>Cloud</th>
            <th>On-Premises</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Public Facing</th>
            <td>Yes</td>
            <td>Yes</td>
            <td>Configurable</td>
            <td>Configurable</td>
        </tr>
        <tr>
            <th>Updates</th>
            <td>Unscheduled. <br /> Multiple times per day. <br /><br />Staged in two zones.</td>
            <td>Cumulative. Deployed post multi-tenant update after coordination with Customer.</td>
            <td>Scheduled with Customer. <br /><br />Minimum 1/month, except critical updates (e.g. vulnerabilities, security updates)</td>
            <td>Scheduled with Customer. <br /><br />Minimum 1/month, except critical updates (e.g. vulnerabilities, security updates)</td>
        </tr>
        <tr>
            <th>Deployment Configurations</th>
            <td>N/A</td>
            <td>High Availability;<br />Geo High Availability;<br />High Capacity</td>
            <td>Single Node;<br />High Availability;<br />Geo High Availability;<br />High Capacity</td>
            <td>Single Node;<br />High Availability;<br />Geo High Availability;<br />High Capacity</td>
        </tr>
        <tr>
            <th>Service & Uptime Reporting</th>
            <td>http://status.auth0.com<br />http://uptime.auth0.com</td>
            <td>Monitored by Auth0</td>
            <td>Monitored by Auth0 and Customer's tools</td>
            <td>Monitored by Auth0 and Customer's tools</td>
        </tr>
        <tr>
            <th>Uptime SLA Provided</th>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
        </tr>
        <tr>
            <th>Support Channels & Levels</th>
            <td colspan="4">Same across all models</td>
        </tr>
    </tbody>
</table>

## Feature Differences

<table class="table">
    <thead>
        <tr>
            <th class="info">Where It Runs</th>
            <th class="info" colspan="2">Auth0's Infrastructure</th>
            <th class="info" colspan="2">Customer's Infrastructure</th>
        </tr>
        <tr>
            <th>How It Runs</th>
            <th>Multi-Tenant</th>
            <th>Dedicated</th>
            <th>Cloud</th>
            <th>On-Premises</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>SSO Lifetime</th>
            <td>Default Settings</td>
            <td>Configurable</td>
            <td>Configurable</td>
            <td>Configurable</td>
        </tr>
        <tr>
            <th>User Search</th>
            <td>Lucene queries</td>
            <td>Simple attribute search or Lucene queries</td>
            <td>Simple attribute search or Lucene queries</td>
            <td>Simple attribute search or Lucene queries</td>
        </tr>
        <tr>
            <th>Tenant Log Search</th>
            <td>Lucene queries</td>
            <td>Simple attribute search</td>
            <td>Simple attribute search</td>
            <td>Simple attribute search</td>
        </tr>
        <tr>
            <th>Log Retention</th>
            <td>Up to 30 days (depends on subscription plan)</td>
            <td>Limited to 30 days</td>
            <td>Limited to 30 days</td>
            <td>Limited to 30 days</td>
        </tr>
        <tr>
            <th>Code Sandbox</th>
            <td>Webtask (Javascript and C#)</td>
            <td>Webtask or in-process</td>
            <td>Webtask or in-process</td>
            <td>Webtask or in-process</td>
        </tr>
        <tr>
            <th>Webtask</th>
            <td>Multi-Tenant</td>
            <td>Dedicated (Fixed NPM modules)</td>
            <td>Dedicated (Fixed NPM modules)</td>
            <td>On-Premises (Fixed NPM modules)</td>
        </tr>
        <tr>
            <th>Anomaly Detection</th>
            <td>Brute Force and Breached Passwords</td>
            <td>Brute Force</td>
            <td>Brute Force</td>
            <td>Brute Force</td>
        </tr>
        <tr>
            <th>Extensions</th>
            <td>Yes</td>
            <td>Yes <sup>*</sup></td>
            <td>Yes <sup>*</sup></td>
            <td>Yes <sup>*</sup></td>
        </tr>
        <tr>
            <th>Geolocation</th>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th>Connecting IP Address Filtering Restrictions</th>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th>Custom Domains</th>
            <td>No</td>
            <td>Yes <sup>**</sup></td>
            <td>Yes <sup>**</sup></td>
            <td>Yes <sup>**</sup></td>
        </tr>
        <tr>
            <th>Shared Resources Among Multiple Customers</th>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
        </tr>
        <tr>
          <th>MFA</th>
          <td>Yes</td>
          <td>Available using SMS, Google Authenticator, Duo over TOTP/HOTP, and Push Notification with Guardian SDK.</td>
          <td>Available using SMS, Google Authenticator, Duo over TOTP/HOTP, and Push Notification with Guardian SDK.</td>
          <td>Available using SMS, Google Authenticator, Duo over TOTP/HOTP, and Push Notification with Guardian SDK.</td>
        </tr>
        <tr>
          <th>Internet Restricted</th>
          <td>No</td>
          <td>No</td>
          <td>No</td>
          <td>Optional <sup>***</sup></td>
        </tr>
    </tbody>
</table>

<sup>*</sup>See the [Auth0 Appliance: Extensions page](/appliance/extensions) to learn more about configuring extensions with the Appliance.

<sup>**</sup>See [Appliance Custom Domains](/appliance/custom-domains) for details. If your Appliance is hosted in the Auth0 Private Cloud, see [Private Cloud Requirements](/appliance/private-cloud-requirements).

<sup>***</sup>You may choose to operate the Appliance in an Internet-restricted environment. If you do so, you will *not* have access to:

* Extensions;
* Lock (requires access to the CDN hosting Lock);
* Management/Authentication API Explorers (requires access to the CDN hosting the API Explorers);
* Quickstarts (requires access to GitHub).
