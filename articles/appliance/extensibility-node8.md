---
title: Migration Guide - Extensibility and Node 8
description: This article covers the Auth0 PSaaS Appliance features/modules affected, as well as recommendations to ensure a smooth migration process.
section: appliance
topics:
    - appliance
    - extensibility
    - migration
contentType: 
    - how-to
    - concept
toc: true
useCase: appliance
---
# PSaaS Appliance Migration Guide: Extensibility and Node 8

Auth0 announced that it will be making the Webtask Node 8 runtime available for Public Cloud customers beginning 2018 April 17.

The Auth0 PSaaS Appliance team has ported these changes to the Appliance environment, and the changes are [available in **release #16257**](https://auth0.com/changelog/appliance).

Auth0 has notified all PSaaS Appliance customers that this release is available.

## Background

The Webtask engine powering Auth0 extensibility currently utilizes Node.js v4. On 30 April 2018, [Node.js v4 went out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team will no longer be back-porting critical security fixes to this version.

Continuing to use this version of Node.js could potentially expose your extensibility code to security vulnerabilities.

## Changes to expect

Migrating from Node.js v4 to Node.js v8 will impact all Auth0 extensibility solutions, including:

* Rules
* Hooks
* Custom Database Connections
* Custom Social Connections

Many of your existing scripts will continue to run without any modifications required, though some will require changes.

## Scheduling your update

Beginning June 4th, 2018, our Appliance Services PM or your Customer Success Manager will begin working with you to schedule upgrades for your environments.

While we are not aware of any security vulnerabilities resulting from the continued use of Node.js v4, we strongly recommend that you schedule updates to your Development and Production PSaaS Appliance environments as soon as possible.

## Am I affected?

During the process of introducing Node.js v8 to our Webtask runtime, we ran tests to determine if there are modules that are not forward-compatible with Node.js v8.

Based on the results of our tests in the Cloud environment, most customers should see no issues when upgrading to Node.js v8.

### Built-in modules

Some built-in modules (that is, modules that you do not explicitly `require()`) were not forward-compatible with Node.js v8. If you are using such modules, please be aware that there are new versions available.

The full list of affected modules can be found [here](/migrations/guides/extensibility-node8#affected-modules).

### Auth0 Extensions

All officially-supported Auth0 Extensions will be updated to run on Node.js v8 prior to the rollout of new PSaaS Appliance deployments.

## Enable Node.js v8 in the PSaaS Appliance

::: panel Auth0-Hosted PSaaS Appliance
For those with PSaaS Appliance in the Auth0 Dedicated Cloud Service, please open a ticket with [Support](${env.DOMAIN_URL_SUPPORT}) so that Auth0 can enable Node.js v8 on your behalf.

Please indicate:

* The environment (DEV or PROD) for which you want Node.js v8 enabled
* Timing restrictions/the time frame during which you would like Auth0 to make the switch
:::

The Auth0 Sandbox should be updated to Node.js v8 to complete the migration of Rules, Hooks, and Webtask from Node.js v4.

This change will affect **all** tenants on the PSaaS Appliance.

Please ensure that the VMs have internet access when enabling Node.js v8 for the first time.

1. Navigate to the Sandbox configuration page (the URL will be of the following format: **https://CustomerManageDomain/configuration#/sandbox**).

![](/media/articles/appliance/migrations/sandbox.png)

2. Switch the value for **Node Version** from **4** to **8**. 

![](/media/articles/appliance/migrations/node-version.png)

3. Scroll to the bottom and click **Save**.

**At this point, the PSaaS Appliance will take some time to reconfigure and begin using Node.js v8. You can check the status of this process using the *Activity* section of the Appliance dashboard.**

Be sure to test your existing Rules, Hooks, and Webtask to ensure they function correctly.
