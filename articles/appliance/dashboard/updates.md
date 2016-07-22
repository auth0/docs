# Auth0 Appliance Dashboard: Updates

> For additional information on navigating to and using the Appliance Dashboard, please see the section on [Appliance Controls](/appliance/dashboard#appliance-controls).

The Updates page of the Appliance configuration area allows you to make the required/selected updates to your Appliance instance.

> Updates cannot be rolled back/undone, so take VM snapshots and make backups as needed.

![](/media/articles/appliance/dashboard/updates.png)

## Online Update
The Online Update section allows you to download and install updates from the Auth0 mirror site. This is the recommended way of updating.

You will be asked to provide the *build number* you would like to apply in the **Update To** field. You may select a provided version, or you may provide a custom *build number*.

Once you have selected the appropriate build, any **release notes** applicable will display on the screen.

To begin the update, click on "Update from Internet." You will be prompted once more to confirm to ensure that the appropriate backups have been made, since Appliance updates cannot be undone.

## Offline Update (Deprecated)

If you possess an updater package from Auth0, use the "Update from Package" button to select the package and begin the updates.
