::: panel best practice
What you need to do when provisioning an organization will depend on how organizations are represented in your system. This can take some time to step back and consider how users of those organizations will be interacting with your applications. See [Multiple Organization Architecture](/media/articles/architecture-scenarios/planning/Multiple-Organization-Architecture-Multitenancy-Overview.pdf) to determine how to configure organizations for your IAM system.
:::

When provisioning organizations you need to consider the following:

* You will need to add the organization to your own application configuration and/or database
* You will need to make changes to your Auth0 configuration.  This will include doing some or all of the following:
    * Create a unique tenant
    * Add a database connection (if you have isolated users per organization)
    * Add an enterprise connection for this organization
        * This will include working with the organization to either update their existing configuration or add configuration for your Auth0 tenant if they are not a legacy organization.
    * Provision an administrator for the organization
* To avoid mistakes, you may want to create an [Organization Admin Portal](#organization-admin-portal) to make it easier to provision new organizations.

### Organization Admin Portal
An organization admin portal is a portal that allows your administrators to create, modify, and remove organizations. There are multiple activities that need to be done both in your own system and your Auth0 tenant.  This portal will likely need to exist in your own system so it has access to your datastores and configuration.  However, Auth0 provides the [**Auth0 Management API**](/api/management/v2) so that you can incorporate changes to your Auth0 tenant at the same time that you create the changes in your own system.

There are two main approaches that can be taken for creating a new organization.  The one you choose depends highly on your tolerance for how long it would take to deploy a new organization.
* **Live Updates to your Auth0 Tenant**: If you want to be able to create new organizations in real-time, then you will likely want to make the changes directly to your Auth0 tenant using the Auth0 Management API.  This allows the changes to take place in real-time and allow the addition of a new organization to take effect immediately.

::: warning
  Live Updates do come with some things to consider.  There are certain operations that must be done in serial to avoid issues.  Enabling clients on a connection, adding callback URL's to an Application are two examples.  Any operation in the Management API where you must retrieve an entire list and re-submit the entire list with the new value added to it are operations that must be done in serial to avoid two parallel operations overwriting one of the values.
:::

* **Change the Repository and Re-deploy**: If you are taking advantage of the Deploy CLI (or a custom CLI) as part of your [CI/CD pipeline]( /architecture-scenarios/implementation/${platform}}/${platform}-deployment), you may prefer to push your changes directly to your repository and then kickoff a new deployment instead.  This can take a little more time, but it has benefits associated with version history and the ability to backout a change by re-deploying the previous version.

::: panel Best Practice
You may want to have a separate repository just for the items that the organizations need so that you don't have to re-deploy other common components and risk making an error.
:::
