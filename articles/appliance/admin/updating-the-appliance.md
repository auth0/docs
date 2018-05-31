---
section: appliance
description: How to update the PSaaS Appliance
toc: true
---
# Updating the PSaaS Appliance

To ensure that your PSaaS Appliance has the latest functionality, security, and bug fixes, Auth0 requires you to perform regular updates. While the Auth0 engineering team releases updates on a monthly basis, you should plan updates on a monthly, bi-monthly, and quarterly basis.

Appliances must be updated using a **major release** at least once every **90 days**.

## Releases

For more information about PSaaS Appliance Releases, please see the [Change Log](https://auth0.com/changelog/appliance).

## Types of updates

There are two types of updates: **major** and **minor** releases.

### Major releases

**Major releases** can be identified by changes in the PSaaS Appliance version number (i.e. from **14591.X** to **15838.X**). These updates include new features and/or changes in existing functionality.

### Minor releases

**Minor releases** (or patch releases) can be identified by changes in the *decimal* value of the version number (i.e. **15838.35** is a minor update to **15838.31**).

Patches are cumulative; that is, patch **15838.85** includes changes included in all prior patches (**15838.75**, **15838.43**, **15838.36**, **15838.35**, and **15838.31**).

You do *not* need to install all released patches, but we recommend doing so since patches typically include things like bug and security fixes.

## The update process

The update process will vary slightly depending on whether you have an **Auth0-hosted PSaaS Appliance** or a **self-hosted PSaaS Appliance**.

### Auth0-hosted PSaaS Appliance

When you are ready to update, submit a Support ticket indicating:

* That you are ready to update your Development environment
* When you would like Auth0 to perform the upgrade
* What version you would like to upgrade to

We will contact you to determine the specific time frame during which the update occurs.

Once we have updated your Development environment, we recommend you spend one week testing. If, at that point, everything is working, we will schedule a time frame for updates to the Production environment(s).

### Self-hosted PSaaS Appliance

You can apply **minor** updates without coordination with Auth0. However, we recommend updating your Development nodes and testing prior to applying the changes to your Production environment.

For **major** updates, please submit a Support ticket and Auth0 will reach out to confirm if manual intervention on the part of Auth0 is required.

To ensure the update process goes as smoothly as possible, we recommend following the best practices detailed below.

#### Prior to the Update

* Take a VM snapshot of each node you're updating.
* Ensure that you've enabled access to your nodes for the Auth0 Customer Success Engineer who will be assisting you with the update.
* Complete the pre-check test **one hour** prior the start of the update.
  * Please be sure that your infrastructure engineer has administrative access to the Dashboard (specifically the Root Tenant Authority).
  * Ensure that all [Health Checks](/appliance/dashboard/troubleshoot#health-check) are okay.
* For multi-node clusters, check the **Enable Sequential Updates** box if you want to reduce downtime during the update.

::: note
For additional information on gathering testing information, please see [PSaaS Appliance Monitoring](/appliance/monitoring).
:::

* Update the Development/Test environment prior to upgrading Production. This allows you to test the new version to identify any issues before you apply it to Production. We recommend performing this test for a one-week period.
* Ensure that the PSaaS Appliance is able to access the internet during the update process, as well as the outbound IP addresses listed in the ["Updates" column](/appliance/infrastructure/ip-domain-port-list#external-connectivity). The update is [triggered via the Management Dashboard](/appliance/dashboard/updates) and requires the downloading of the application itself, as well as any operating system updates.

#### After the update

::: note
For additional information on gathering testing information, please see [PSaaS Appliance Monitoring](/appliance/monitoring).
:::

* Perform the post-test check:
  * Check to see if all instances list the same update count and that they're currently running the latest version.
  * Check that all Health Checks are okay.
  * Run smoke tests to ensure that there are no issues with the update.

Please remember that you are responsible for testing and ensuring that all of your applications work as expected.

## Downtime

During an upgrade, we expect there to be some downtime. For single-node clusters, we expect there to be 3-5 minutes of downtime. For multi-node clusters, we can perform updates sequentially, preventing downtime. There will, however, be a period between 10-30 seconds where the node being updated will not process new requests (all other nodes remain active). 

Downtime occurs when we restart services. Because of this, we are willing to schedule updates to Production clusters during non-business hours. Please contact your Customer Success Manager to select a time that would be best for you.

If you require your Production update during non-business hours, we ask that you confirm the day prior during normal business hours.