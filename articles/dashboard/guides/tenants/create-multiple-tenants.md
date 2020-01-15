---
description: Learn how to create an additional tenant using the Auth0 Management Dashboard.
topics:
  - dashboard
  - tenants
contentType:
  - how-to
useCase:
  - build-an-app
---
# Create Multiple Tenants

You can configure multiple [tenants](/getting-started/the-basics#account-and-tenants) in the Auth0 Dashboard to allow for more complex configurations. 

For instance, if you have two separate domains (for example, one internal and one public-facing) or would like to allow users to log in differently for different applications, the best solution is to create more than one Auth0 tenant. This will allow you to have separate sets of applications, connections, and users for the applications and groups of users you need to support.

1. Open the [Auth0 Dashboard](${manage_url}/), click your tenant name, and select **+ Create Tenant**.

![Create New Tenant](/media/articles/connections/dashboard-create-tenant.png)

2. Enter your desired domain name, select a region, and click **Create**.

![Save New Tenant](/media/articles/connections/tenant-create.png)

## Keep reading

* [Using Auth0 to Secure Your Multi-Tenant Applications](/design/using-auth0-with-multi-tenant-apps)
* [Delete or Reset Tenants](/support/delete-reset-tenant)
