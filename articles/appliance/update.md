# Update an Auth0 Cluster

To update an Auth0 cluster, follow these steps:

1. Download the package provided by Auth0 to your local machine.
2. Verify its integrity by comparing the checksum provided by Auth0 with a computed one as explained in [Verify Update Package Integrity](/checksum).
3. Open the dashboard and navigate to **Configuration**:
![go to the configuration menu](/media/articles/appliance/update/offline-update-01.png)

4. Go to the **Offline Update** section and click on *Update from Package* and select the package you downloaded from the file system:
![click on the update from package button](/media/articles/appliance/update/offline-update-02.png)
Upload progress will be displayed inside the button:
![percentage completed inside the button](/media/articles/appliance/update/offline-update-03.gif)

Every node in the cluster will be automatically updated with no downtime.

Although patches are thoroughly tested by Auth0, we recommend that you first test patches in a non-production environment to verify that your applications continue to function as expected.

__Note:__ Patches cannot be reverted. Take a VM snapshot before applying a patch to allow for the undoing of changes from an update.
