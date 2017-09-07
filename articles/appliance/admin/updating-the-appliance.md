---
section: appliance
description: How to update the PSaaS Appliance
---

# Updating the PSaaS Appliance

To ensure that your PSaaS Appliance has the latest functionality, security, and bug fixes, Auth0 requires you to perform regular updates. While the Auth0 engineering team releases updates on a monthly basis, you should plan updates on a monthly, bi-monthly, and quarterly basis. You should not exceed **90 days** without updating the PSaaS Appliance.

::: note
For more information about PSaaS Appliance Releases, please see the [Change Log](https://auth0.com/changelog/appliance).
:::

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

* Update the Development and Test nodes prior to upgrading Production. This allows you to test the new version to identify any issues before you apply it to Production. We recommend performing this test for a one-week period.
* Ensure that the PSaaS Appliance is able to access the internet during the update process. The update is [trigged via the Management Dashboard](/appliance/dashboard/updates) and requires the downloading of the application itself, as well as any operating system updates. This takes between 60 minutes (for a single Development node) to 90 minutes (for a three-node Production cluster).

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

During an upgrade, we expect there to be 2-3 minute window of downtime. This occurs when we restart services. Because of this, we are willing to schedule updates to Production clusters during non-business hours. Please contact your Customer Success Manager to select a time that would be best for you.

If you require your Production update during non-business hours, we ask that you confirm the day prior during normal business hours.

## Automatic Updates

Auth0 is currently to provide an automatic update option for PSaaS Appliance customers where you can select the frequence and time window during which an update occurs.
