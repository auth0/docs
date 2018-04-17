---
title: Migration Guide - Extensibility and Node 8
description: This article covers the Auth0 PSaaS Appliance features/modules affected, as well as recommendations to ensure a smooth migration process.
---
# PSaaS Appliance Migration Guide: Extensibility and Node 8

Auth0 announced that it will be making the Webtask Node 8 runtime available for Public Cloud customers beginning 2018 April 17.

The Auth0 PSaaS Appliance team is working to port these changes to the Appliance environment, and we expect to have the work completed and ready for deployment in early May.

We will notify all PSaaS Appliance customers once the PSaaS Appliance Node 8 release is available.

## Background

The Webtask engine powering Auth0 extensibility points currently utilizes Node.js v4. On 30 April 2018, Node.js v4 will be going out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team will no longer be back-porting critical security fixes to this version.

Continuing to use this version of Node.js could potentially expose your extensibility code to security vulnerabilities.

## Changes to expect