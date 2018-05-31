---
title: Migration Guide - Extensibility and Node 8
description: This article covers the Auth0 PSaaS Appliance features/modules affected, as well as recommendations to ensure a smooth migration process.
toc: true
---
# PSaaS Appliance Migration Guide: Extensibility and Node 8

Auth0 announced that it will be making the Webtask Node 8 runtime available for Public Cloud customers beginning 2018 April 17.

The Auth0 PSaaS Appliance team is working to port these changes to the Appliance environment, and we expect to have the work completed and ready for deployment in early June.

We will notify all PSaaS Appliance customers once the PSaaS Appliance Node 8 release is available.

## Background

The Webtask engine powering Auth0 extensibility currently utilizes Node.js v4. On 30 April 2018, Node.js v4 went out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team will no longer be back-porting critical security fixes to this version.

Continuing to use this version of Node.js could potentially expose your extensibility code to security vulnerabilities.

## Changes to expect

Migrating from Node.js v4 to Node.js v8 will impact all Auth0 extensibility solutions, including:

* Rules
* Hooks
* Custom Database Connections
* Custom Social Connections

While much of your existing scripts will run in Node 8 without modification, there is a subset of scripts that will require your action to convert to Node 8.

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

The Auth0 Sandbox should be updated to Node.js v8 to complete the migration of Rules, Hooks, and Webtask from Node.js v4.

1. Navigate to the [Sandbox configuration page](${manage_url}/configuration#/sandbox).

![](/media/articles/appliance/migrations/sandbox.png)

2. Switch the value for **Node Version** from **4** to **8**. 

![](/media/articles/appliance/migrations/node-version.png)

3. Scroll to the bottom and click **Save**.

After you save, the PSaaS Appliance will take some time to reconfigure itself to use Node.js v8.

Be sure to test your existing Rules, Hooks, and Webtask to ensure they function correctly.