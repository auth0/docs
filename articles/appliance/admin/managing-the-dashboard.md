---
section: appliance
description: How to access and restrict access to the PSaaS Appliance Management Dashboard
topics:
    - appliance
    - dashboard
contentType: how-to
useCase: appliance
applianceId: appliance7
sitemap: false
---

# PSaaS Appliance Administration: Manage the Dashboard

## Access the Dashboard

::: panel-warning Connections for the Auth0 Application
The **Auth0** application in the Root Tenant Authority (RTA) controls access to the Management Dashboard, and the only Connections that you should enable for this application is the built-in Database Connection (the default Connection for this application is a Database Connection called *Initial-Connection*) or an enterprise connection like the AD-LDAP Connector. You should **never** enable a Social Connection for the **Auth0** application.

Additionally, please [disable signups](/appliance/admin/disabling-sign-ups) for the **Auth0** application.
:::


The [Auth0 Dashboard](/appliance/dashboard) uses the PSaaS Appliance to authenticate its users.

Within the list of applications, you will see the Auth0 Application, which represents the Dashboard itself. It uses a connection called `Initial-Connection`, which stores the credentials of the administrators that have access to the Dashboard.

::: note
Changes to the Auth0 Application or `Initial-Connection` may result in unexpected Dashboard behavior. Please makes changes with caution.
:::

Because the Dashboard uses the PSaaS Appliance for authentication, any configured rules will run whenever a user accesses the Dashboard. Because errors in one or more of your rules may result in you losing access to the Dashboard, Auth0 suggests writing rules that exclude the Auth0 application:

```js

function (user, context, callback) {
    if (context.clientName === 'Auth0') {
      return callback(null, user, context);
    }

    // Your code.

    callback(null, user, context);
}

```

::: note
The default user `root@auth0.com` has access to the PSaaS Appliance and its configuration area. To prevent unauthorized access with this account, you should block this user via the Auth0 Dashboard.
:::

To block the user, click *Actions*. Then, in the drop-down menu that appears, click *Block User*.

## Restrict Access to the Dashboard

Because the Dashboard uses the PSaaS Appliance to authenticate users, the Dashboard is using Connections, [Rules](/rules), and so on, just like any other application you might add in the future.

As a result, you have several options for restricting access to the dashboard, including, but not limited to:

* Writing rules to allow users only from a specific IP address;
* Writing rules to allow only co-administrators of the PSaaS Appliance to authenticate using their Active Directory (via either ADFS or AD Connector).
