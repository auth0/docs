---
section: appliance
title: Configure Webtask with Dedicated Domains
description: How to use dedicated domains with your PSaaS Appliance Webtask
---
# PSaaS Appliance: Webtask with Dedicated Domains

Some extensions, such as the [Authorization Extension](/extensions/authorization-extension/v2), required us to enable full trust in your PSaaS environment to run correctly.

Beginning with PSaaS Appliance version `13451`, you may now configure Webtask on a dedicated domain. This mirrors how the Auth0 Public Cloud handles Webtask domains and enables you to use extensions with ease in multi-tenant environments.

To configure Webtask on a dedicated domain, you will need to set up a DNS zone to host the name entries for *each* tenant. As with the authentication domain, the Webtask dedicated domain requires a valid certificate issued by a public certificate authority (CA). If you're not certain how many tenants you'll be hosting, we recommend using a wildcard certificate such as `*.your-webtask-dedicated-domain`.

This will give to each container a URL of the form:

```text
tenant-name.webtask-dedicated-domain/container-name
```

For example, let's say that your tenant name is **acme** and your Webtask dedicated domain is **wt.example.com**. If you create a container named **hello**, your Webtask URL will be **acme.wt.example.com/hello**.

## Requirements

For each environment (such as Development, Testing, or Production), you will need:

* A certificate for your Webtask's dedicated domain
* A DNS zone for each domain to manage the name records of your tenants

### Sample Architecture

To clarify the requirements, let's look at a sample setup.

What You Have:

* Your Production environment is accessible via **example.com**
* Your primary Auth0 tenant is **identity.example.com**
* Your current certificate is **identity.example.com** (or similar)


* You want your Webtask dedicated domain to be **wt.example.com**
*