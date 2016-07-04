---
url: /appliance/custom-domains
---

# Custom Domains

Beginning with Appliance Build 5XXX, you may configure custom domains using the Management Dashboard.

Custom domains allow you to expose one or more arbitrary DNS names for a tenant. Conventionally, Auth0 uses a three-part domain name for access, and it is the third portion of the domain name that varies depending on the tenant.

The root tenant authority (RTA) is a special domain that is configured when the cluster is first set up. It is a privileged tenant from which certain manage operations for the cluster are available. The RTA is sometimes called the configuration domain, and all users that have access to the Management Dashboard belong to an application in the RTA.

> All tenant domain names derive from the root tenant authority, and any changes to this will result in the deletion of all tenants.

### Use Example

Suppose that your RTA is `config.example.com`. From this point on, all of your new tenants' domain names must derive from the base name, `example.com`:

```text
site1.example.com
site2.example.com
```

However, you might want to expose other domain names to your end users, such as:

* `auth.site2.com`
* `auth.site1.com`
* `auth.site1.example.com`

You may do so by utilizing the Appliance's custom domains feature, which sets the domain used for authentication endpoints.

## Certificates Required for Custom Domains

Custom domains map one or more external DNS to a tenant that follows the standard naming convention.

Suppose that we have a tenant with the following domain:

`auth.example.com`

Suppose that we want the following domains to map to `auth.example.com`:

```text
auth.site1.example.com
auth.site2.com
```

Each of the custom domains (in this example, there are two) has its own certificate, which is stored separately.

## Configuring Custom Domains

You may configure custom domains for your tenants via the [custom domains set-up area](/appliance/dashboard/tenants#custom-domains) of the [tenants page in the Appliance configuration area](/appliance/dashboard/tenants).
