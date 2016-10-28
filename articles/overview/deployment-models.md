---
description: This page explains the differences of the four different deployment models in which Auth0 is offered.
---

# Auth0 Deployment Models

Auth0 is offered in 4 deployment models:

1. As a __multi-tenant cloud service__ running on Auth0's cloud.
2. As a __dedicated cloud service__ running on Auth0's cloud.
3. As a __dedicated cloud service__ running on Customer's cloud infrastructure.
4. As an __on-premises virtual appliance__ running on Customer's data centers.

The following table describes operational and feature differences between each of these models.

<table class="table">
    <thead>
        <tr>
            <th class="info">Where It Runs</th>
            <th class="info">Auth0's Infrastructure</th>
            <th class="info"></th>
            <th class="info">Customer's Infrastructure</th>
            <th class="info"></th>
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
            <td>High Availibility;<br />High Capacity</td>
            <td>Single Node;<br />High Availibility;<br />High Capacity</td>
            <td>Single Node;<br />High Availibility;<br />Geo High Availibility;<br />High Capacity</td>
        </tr>
        <tr>
            <th>Service & Uptime Reporting</th>
            <td>http://status.auth0.com<br />http://uptime.auth0.com</td>
            <td>Dedicated uptime URL</td>
            <td>Monitored by Auth0 and Customer's tools</td>
            <td>Monitored by Auth0 and Customer's tools</td>
        </tr>
        <tr>
            <th>Uptime SLA Provided</th>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
            <td class="danger">No</td>
            <td class="danger">No</td>
        </tr>
        <tr>
            <th>Support Channels & Levels</th>
            <td>Same across all models</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th class="info">Features</th>
            <td class="info"></td>
            <td class="info"></td>
            <td class="info"></td>
            <td class="info"></td>
        </tr>
        <tr>
            <th>SSO Lifetime</th>
            <td>Default Settings</td>
            <td>Configurable</td>
            <td>Configurable</td>
            <td>Configurable</td>
        </tr>
        <tr>
            <th>Search</th>
            <td>Lucene queries</td>
            <td>Simple attribute search</td>
            <td>Simple attribute search</td>
            <td>Simple attribute search</td>
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
            <td>Dedicated</td>
            <td>Cloud</td>
            <td>On-Premises</td>
        </tr>
        <tr>
            <th>Anomaly Detection</th>
            <td class="success">Brute Force and Breached Passwords</td>
            <td class="success">Brute Force</td>
            <td class="success">Brute Force</td>
            <td class="success">Brute Force</td>
        </tr>
        <tr>
            <th>Extensions</th>
            <td class="success">Yes</td>
            <td class="success">Yes <sup>*</sup></td>
            <td class="success">Yes <sup>*</sup></td>
            <td class="success">Yes <sup>*</sup></td>
        </tr>
        <tr>
            <th>Geolocation</th>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
        </tr>
        <tr>
            <th>Connecting IP Address Filtering Restrictions</th>
            <td class="danger">No</td>
            <td class="danger">No</td>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
        </tr>
        <tr>
            <th>Custom Domains</th>
            <td class="danger">No</td>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
            <td class="success">Yes</td>
        </tr>
        <tr>
            <th>Shared Resources Among Multiple Customers</th>
            <td class="success">Yes</td>
            <td class="danger">No</td>
            <td class="danger">No</td>
            <td class="danger">No</td>
        </tr>
    </tbody>
</table>

<sup>*</sup>__NOTE:__ The [Delegated Administration](/extensions/delegated-admin) extension is currently available only for the public cloud.
