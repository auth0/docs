---
section: appliance
description: How to update the PSaaS Appliance
---

# Updating the PSaaS Appliance

To ensure that your PSaaS Appliance has the latest functionality, security, and bug fixes, Auth0 requires you to perform regular updates. While the Auth0 engineering team releases updates on a monthly basis, you should plan updates on a monthly, bi-monthly, and quarterly basis. You should not exceed **90 days** without updating the PSaaS Appliance.

## Releases

For more information about PSaaS Appliance Releases, please see the [Change Log](https://auth0.com/changelog/appliance).

## Types of Updates

There are two types of updates: **major** and **minor** releases.

**Major releases** can be identified by changes in the PSaaS Appliance version number (i.e. from **14591.X** to **15838.X**). These updates include new features and/or changes in existing functionality.

**Minor releases** (or patch releases) can be identified by changes in the *decimal* value of the version number (i.e. **15838.35** is a minor update to **15838.31**). Patches are cumulative; that is, patch **15838.85** includes changes included in all prior patches (**15838.75**, **15838.43**, **15838.36**, **15838.35**, and **15838.31**). You do *not* need to install all released patches, but we recommend doing so since patches typically include things like bug and security fixes.

## Best Practices

To ensure the update process goes as smoothly as possible, we recommend following the best practices detailed below.

### Prior to the Update

* Take a VM snapshot of each node you're updating.
* Ensure that you've enabled access to your nodes for the Auth0 Customer Success Engineer who will be assisting you with the update.
* Complete the pre-check test **one hour** prior the start of the update.
  * Please be sure that your infrastructure engineer has administrative access to the Dashboard (specifically the Root Tenant Authority).
  * Ensure that all [Health Checks](/appliance/dashboard/troubleshoot#health-check) are okay.

::: note
For additional information on gathering testing information, please see [PSaaS Appliance Monitoring](/appliance/monitoring).
:::

* Update the Development/Test environment prior to upgrading Production. This allows you to test the new version to identify any issues before you apply it to Production. We recommend performing this test for a one-week period.
* Ensure that the PSaaS Appliance is able to access the internet during the update process, as well as the outbound IP addresses listed in the ["Updates" column](/appliance/infrastructure/ip-domain-port-list#external-connectivity). The update is [trigged via the Management Dashboard](/appliance/dashboard/updates) and requires the downloading of the application itself, as well as any operating system updates. The update takes between 60 minutes (for a single Development node) to 90 minutes (for a three-node Production cluster).

### After the Update

::: note
For additional information on gathering testing information, please see [PSaaS Appliance Monitoring](/appliance/monitoring).
:::

* Perform the post-test check:
  * Check to see if all instances list the same update count and that they're currently running the latest version.
  * Check that all Health Checks are okay.
  * Run smoke tests to ensure that there are no issues with the update.

Please remember that you are responsible for testing and ensuring that all of your applications work as expected.

## Coordination with Auth0

While most updates require manual installation of patches by an Auth0 Customer Success Engineering, some updates are self-service and can be performed using the [Updates page](/appliance/dashboard/updates).

We recommend that you let Auth0 known when you plan on upgrading your Development node.

Production upgrades should **always** be performed in conjunction with an Auth0 Customer Success Engineer. We will schedule these updates so that an Auth0 Customer Success Engineer is on the call with your operations team during the entire process.

## Downtime

During an upgrade, we expect there to be 3-5 minute window of downtime. This occurs when we restart services. Because of this, we are willing to schedule updates to Production clusters during non-business hours. Please contact your Customer Success Manager to select a time that would be best for you.

If you require your Production update during non-business hours, we ask that you confirm the day prior during normal business hours.
