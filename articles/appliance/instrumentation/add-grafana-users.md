---
section: appliance
description: This document covers how to add new users to Grafana.
---

# Auth0 Appliance: Adding Users to Grafana


You can use one of two authentication methods with Grafana:

* **Basic Authentication**: used by configuration scripts launched by Puppet
* **OAuth Authentication**: used by when pages when users either:
  * Visualize the instrumentation page;
  * Navigate to Grafana's website.

By default, each Grafana instance (every Appliance node comes with its own instance of Grafana) includes the following users:

* `admin`
* `root@auth0.com`

To visualize the instrumentation page with a user *other* than `root@auth0.com`, you will need to add that user to the Grafana instances for **each** Appliance node.

1. Navigate to the Appliance node's instance of Grafana (`https://<appliance_manage_domain>.com/grafana/<private_ip>`), and log in using a set of valid credentials.
2. Click the **Grafana icon** located in the top left corner. Select **Admin** and tehn **Global Users**.
3. To add the user, add the user's *email address* to the following fields:
  * `Name`
  * `Email`
  * `Username`
4. Set the user's password. This can be any complex password of the user's choosing. Note that the user will have to enter their password only if they try to access Grafana using Basic Authentication. If the user logs in using OAuth, Grafana will select the user based on the provided email address.
