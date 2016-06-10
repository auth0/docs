# Auth0 Appliance Administration: Disabling Sign-Ups

The Appliance, when running in multi-tenancy mode, behaves just like the Auth0 cloud environment. Users will be able to sign up and create new accounts in the cluster, and this ability is *not* limited to internal users. For this reason, Auth0 suggests that you disable sign-ups for the `Initial-Connection` database connection prior to go live of your production environments.

Disabling signups will prevent users from signing up for an account in your Appliance. Therefore, if you want to invite co-administrators to a specific tenant, you will need to do the following:

* create the user manually using the Dashboard;
* send the newly-created user's credentials to your co-administrator;
* invite the user to the appropriate account.
