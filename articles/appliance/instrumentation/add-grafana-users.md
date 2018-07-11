---
section: appliance
description: This document covers how to add new users to Grafana.
topics:
    - appliance
    - instrumentation
contentType: how-to
useCase: appliance
applianceId: appliance42
---

# PSaaS Appliance: Adding Users to Grafana


By default, each Grafana instance (every PSaaS Appliance node comes with its own instance of Grafana) includes the following users:

* `admin`
* `root@auth0.com`

To visualize the instrumentation page with an PSaaS Appliance administrative user *other* than `root@auth0.com`, you will need to add that user to the Grafana instances for **each** PSaaS Appliance node.

1. Navigate to the PSaaS Appliance node's instance of Grafana (`https://<appliance_manage_domain>.com/grafana/<private_ip>`), and log in using a set of valid credentials.
2. Click the **Grafana icon** located in the top left corner. Select **Admin** and then **Global Users**.

  ![Grafana Admin Menu](/media/articles/appliance/instrumentation/grafana-users-1.png)

3. To add the user, click **+ Add new user**.

  ![Grafana Add New User Button](/media/articles/appliance/instrumentation/grafana-users-2.png)

3. Add the user's *email address* to the **Name**, **Email**, and **Username** fields, and set the user's password. This can be any complex password of the user's choosing. Note that the user will have to enter their password only if they try to access Grafana using Basic Authentication. If the user logs in using OAuth, Grafana will select the user based on the provided email address.

  ![Grafana Add New User Screen](/media/articles/appliance/instrumentation/grafana-users-3.png)

  You can use one of two authentication methods with Grafana:

  ::: panel Grafana Authentication
  * **Basic Authentication**: used by configuration scripts launched by Puppet
  * **OAuth Authentication**: used by when pages when users either:
    * Visualize the instrumentation page;
    * Navigate to Grafana's website.
  :::

4. Click **Create**. You will now see the user reflected in the *Users* list.

  ![Grafana Users List](/media/articles/appliance/instrumentation/grafana-users-4.png)
