# Auth0 Appliance Administration: Managing the Dashboard

### Accessing the Dashboard

The [Auth0 Dashboard](/appliance/dashboard) uses the Auth0 Appliance to authenticate its users.

Within the list of applications, you will see the Auth0 Application, which represents the Dashboard itself. It uses a connection called `Initial-Connection`, which stores the credentials of the administrators that have access to the Dashboard.

> Changes to the Auth0 application or `Initial-Connection` may result in unexpected Dashboard behavior. Please makes changes with caution.

Because the Dashboard uses the Appliance for authentication, any configured rules will run whenever a user accesses the Dashboard. Because errors in one or more of your rules may result in you losing access to the Dashboard, Auth0 suggests writing rules that exclude the Auth0 application:

```js

function (user, context, callback) {
    if (context.clientName === 'Auth0') {
      return callback(null, user, context);
    }

    // Your code.

    callback(null, user, context);
}

```

> The default user `root@auth0.com` has access to the Appliance and its configuration area. Please remember to reset this user's default password or disable the user via the Auth0 Dashboard.

### Restricting Access to the Dashboard

Because the Dashboard uses the Appliance to authenticate users, the Dashboard is using Connections, [Rules](/rules), and so on, just like any other application you might add in the future.

As a result, you have several options for restricting access to the dashboard, including, but not limited to:

* writing rules to allow users only from a specific IP address;
* writing rules to allow only co-administrators of the Appliance to authenticate using their Active Directory (via either ADFS or AD Connector).

### Disabling Sign-Ups

The Appliance, when running in multi-tenancy mode, behaves just like the Auth0 cloud environment. Users will be able to sign up and create new accounts in the cluster, and this ability is *not* limited to internal users. For this reason, Auth0 suggests that you disable sign-ups for the `Initial-Connection` database connection prior to go live of your production environments.

Disabling signups will prevent users from signing up for an account in your Appliance. Therefore, if you want to invite co-administrators to a specific tenant, you will need to do the following:

* create the user manually using the Dashboard;
* send the newly-created user's credentials to your co-administrator;
* invite the user to the appropriate account.
