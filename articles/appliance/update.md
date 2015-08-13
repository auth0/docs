# Updating an Auth0 Cluster

Download the package provided by Auth0 to your local machine and verify its integrity by comparing the checksum provided by Auth0 with a computed one as explained [here](/checksum).

Open the dashboard and navigate to **Configuration**:

![go to the configuration menu](/media/articles/appliance/update/offline-update-01.png)

Go to the **Offline Update** section and click on **Update from Package** and select the package from the file system:

![click on the update from package button](/media/articles/appliance/update/offline-update-02.png)

Upload progress will be displayed inside the button:

![percentage completed inside the button](/media/articles/appliance/update/offline-update-03.gif)

Every node in the cluster will be automatically updated with no downtime.

Patches are thoroughly tested by Auth0, but we recommend that you test patches in non-production environments to verify that your applications continue to works as expected.

> Patches cannot be reverted. Taking __VM snapshots__ is an easy way of undoing any changes.
