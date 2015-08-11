# Update an Auth0 Cluster

To update an Auth0 cluster and all its nodes, follow these steps:

1. Download the package provided by Auth0 to your local machine.
2. Verify its integrity by comparing the checksum provided by Auth0 to a computed one as explained in [Verify Update Package Integrity](/checksum).
3. Open the dashboard and navigate to **Configuration**, then click on **Update from Package** and select the package from the file system:

![](/media/articles/appliance/update/ss-2014-12-03T12-29-18.png)

Every node in the cluster will be automatically updated with no downtime.

Although all patches are thoroughly tested by Auth0, we recommend that you first test every patch in a non-production environment to verify that your applications continue to function as expected.

__Note:__ Patches cannot be reverted. An easy method for allowing the undoing of any changes from an update is to take a VM snapshot before applying a patch.
