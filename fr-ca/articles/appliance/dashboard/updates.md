---
section: appliance
description: Overview of the PSaaS Appliance Dashboard Updates page
topics:
    - appliance
    - dashboard
    - updates
contentType: reference
useCase: appliance
applianceId: appliance27
sitemap: false
---

# PSaaS Appliance Dashboard: Updates

::: note
  For additional information on navigating to and using the PSaaS Appliance Dashboard, please see the section on [PSaaS Appliance Controls](/appliance/dashboard#appliance-controls).
:::

The Updates page of the PSaaS Appliance configuration area allows you to make the required/selected updates to your PSaaS Appliance instance.

Auth0 recommends taking VM snapshots and backups prior to beginning an upgrade. If there are issues with you upgrade, it might be possible to roll back the PSaaS Appliance to the version used immediately prior to the upgrade (this is the preferred option, since there would not be any data loss).

However, if the option of rolling back to the existing version is not possible, Auth0 will need to restore your environment using the VM snapshots created prior to the update (there will be some data loss in this instance).

![](/media/articles/appliance/dashboard/updates.png)

## Online Update
The Online Update section allows you to download and install updates from the Auth0 mirror site. This is the recommended way of updating.

You will be asked to provide the *build number* you would like to apply in the **Update To** field. You may select a provided version, or you may provide a custom *build number*.

Once you have selected the appropriate build, any **release notes** applicable will display on the screen.

To begin the update, click on "Update from Internet." You will be prompted once more to confirm to ensure that the appropriate backups have been made, since PSaaS Appliance updates cannot be undone.

::: note
You should schedule Production updates with your Auth0 Technical Account Manager so that there is an Auth0 Customer Success Engineer available in case any patches need to be manually applied. For more information on updates, see [Updating the PSaaS Appliance](/appliance/admin/updating-the-appliance).
:::
