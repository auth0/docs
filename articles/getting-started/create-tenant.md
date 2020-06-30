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

Once you create your account, you will be asked to create a **tenant**. No tenant can access the data of another tenant, even though multiple tenants might be running on the same machine. 

Tenant characteristics include:

- The tenant name has to be unique. It will be used to create your personal domain.
- The tenant name can contain only lowercase alphanumeric characters and hyphens ("-"). It cannot begin or end with a hyphen.
- The tenant name must be a minimum of 3 characters and maximum of 64 characters.
- The tenant name cannot be changed after creation.
- You can create more than one tenant; in fact you are encouraged to do so for each environment you may have, such as development, staging, or production. For details, see [Set Up Multiple Environments](/dev-lifecycle/setting-up-env). 

When you name your tenant, that name becomes your Auth0 domain. (Or you can create a custom domain.) This domain is the base URL that you will use to access our API and the URL where your users are redirected to authenticate.

Auth0 supports three regional subdomains: 
- `us.auth0.com` for US
- `eu.auth0.com` for Europe
- `au.auth0.com` for Australia

When you you are asked for the region you want to use, your choice affects which regional subdomain will be assigned to you and where your data will be hosted. If you pick US, then the name format will be `YOUR-TENANT-NAME.us.auth0.com`; for Europe, it will be `YOUR-TENANT-NAME.eu.auth0.com`; and so forth.

In our example, Example-Co chose the name `example-co` and **Americas** as their region. So their domain is `example-co.us.auth0.com`.

## Keep reading

* [Set Up Multiple Environments](/dev-lifecycle/setting-up-env)
