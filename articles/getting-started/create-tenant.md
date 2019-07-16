---
title: Create a Tenant
description: Learn how to create a tenant in the Auth0 Dashboard. 
topics:
  - tenants
contentType: how-to
useCase:
  - create-tenant
  - get-started
---
# Create a Tenant

If you haven't already [signed up](https://auth0.com/signup) for an Auth0 **account**, do so (it's free). You can either use username/password or log in with a social provider (GitHub, Google, or Microsoft).

Once you create your account you will be asked to create a **Tenant**. This is a **logical isolation unit**.

The term is borrowed from "software multitenancy". This refers to an architecture where a single instance of the software serves multiple tenants. No tenant can access the instance of another tenant, even though the software might be running on the same machine (hence the logical isolation).

Some characteristics:

- The tenant name has to be unique (we will see in the next paragraph that it is used to create your own personal domain).
- The tenant name must be all lowercase.
- The tenant name cannot be changed after creation.
- You can create more than one tenant; in fact, you are encouraged to do so for each environment you have (such as Development, Staging, or Production).
- If you chose to host your data in Europe or Australia, then your tenant will have a suffix (`eu` or `au`). In our example, if `Example-Co` picked the name `example-co`, then depending on where the data is stored, the tenant name would be `example-co-eu` or `example-co-au`.

You can create additional tenants at any time. To do so, go to the upper-right corner of the Dashboard and click on your tenant name to display the pulldown menu. Click **Create Tenant**.

## Keep reading

* [Set Up Multiple Environments](/dev-lifecycle/setting-up-env)
