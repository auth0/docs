---
section: appliance
description: Overview of the PSaaS Appliance Dashboard Updates page
tags:
    - appliance
    - dashboard
    - updates
---

# PSaaS Appliance Dashboard: Updates

::: note
  For additional information on navigating to and using the PSaaS Appliance Dashboard, please see the section on [PSaaS Appliance Controls](/appliance/dashboard#appliance-controls).
:::

The Updates page of the PSaaS Appliance configuration area allows you to make the required/selected updates to your PSaaS Appliance instance.

In certain circumstances, you may not be able to roll back an update. Auth0 recommends taking VM snapshots and backups in the event that you need to revert to an earlier version.

![](/media/articles/appliance/dashboard/updates.png)

## Online Update
The Online Update section allows you to download and install updates from the Auth0 mirror site. This is the recommended way of updating.

You will be asked to provide the *build number* you would like to apply in the **Update To** field. You may select a provided version, or you may provide a custom *build number*.

Once you have selected the appropriate build, any **release notes** applicable will display on the screen.

To begin the update, click on "Update from Internet." You will be prompted once more to confirm to ensure that the appropriate backups have been made, since PSaaS Appliance updates cannot be undone.

::: note
You should schedule Production updates with your Auth0 Customer Success Manager so that there is an Auth0 Customer Success Engineer available in case any patches need to be manually applied. For more information on updates, see [Updating the PSaaS Appliance](/appliance/admin/updating-the-appliance).
:::
