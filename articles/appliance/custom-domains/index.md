---
url: /appliance/custom-domains
---

# Custom Domains

Beginning with Appliance Build 5XXX, you may configure custom domains using the Management Dashboard.

Custom domains allow you to expose one or more arbitrary DNS names for a tenant. Conventionally, Auth0 uses a three-part domain name for access, and it is the third portion of the domain name that varies depending on the tenant.

Auth0 uses two domain names: the **primary** domain name (often `login.example.com` or `config.example.com`), which is associated with the Management Dashboard, and the **management** domain, which is used to *access* the Management Dashboard.

> All tenant domain names derive from the **primary** domain name, and any changes to this will result in the deletion of all tenants.

### Use Example

Suppose that your primary tenant is `config.bedrock.com`. From this point on, all of your new tenants' domain names must derive from the base name, `bedrock.com`:

```text
flintstone.bedrock.com
rubble.bedrock.com
```

However, you might want to expose other domain names to your end users, such as:

* `auth.rubble.com`
* `auth.flintstone.com`
* `auth.flintstone.bedrock.com`

You may do so by utilizing the Appliance's custom domains feature, which sets the domain used for authentication endpoints.

## Certificates Required for Custom Domains

Custom domains map one or more external DNS to a tenant that follows the standard naming convention.

Suppose that we have a tenant with the following domain:

`auth.bedrock.com`

Suppose that we want the following domains to map to `auth.bedrock.com`:

```text
auth.flintstone.bedrock.com
auth.rubble.com
```

Each of the custom domains (in this example, there are two) has its own certificate, which is stored separately. You may, however, choose to use a SAN certificate for *all* custom domains, though this certificate must be added/updated individually for each domain.

## Configuring Custom Domains

You may configure custom domains for your tenants via the [custom domains set-up area](/appliance/dashboard/tenants#custom-domains) of the [tenants page in the Appliance configuration area](/appliance/dashboard/tenants).
