# Updating an Auth0 Cluster

Download the package provided by Auth0 to your local machine and verify its integrity by comparing the checksum provided by Auth0 with a computed one as explained [here](/appliance/update_checksum).

Open the dashboard and navigate to **Configuration**, then click on **Update from Package** and select the package from the file system:

![ss-2014-12-03T12-29-18.png](https://s3.amazonaws.com/blog.auth0.com/ss-2014-12-03T12-29-18.png)

Every node in the cluster will be automatically updated with no downtime.

Patches are thoroughly tested by Auth0, but we recommend that you test patches in non-production environments to verify that your applications continue to works as expected. 

> Patches cannot be reverted. Taking __VM snapshots__ is an easy way of undoing any changes.




