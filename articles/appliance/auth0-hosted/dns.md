---
section: appliance
description: DNS records and domain name requirements for Auth0-Hosted PSaaS Appliance
toc: false
topics:
    - appliance
    - private-cloud
contentType: reference
useCase: appliance
applianceId: appliance68
---
# DNS Records and Domain Names

Auth0 provides the domain names needed for your DNS zones/certificates. If you have Development and Production environments, your domain names will typically be formatted as follows:

| Environment | Sample Domain Name          |
| ----------- | --------------------------- |
| Development | **company**-dev.auth0.com |
| Production  | **company**.auth0.com     |

::: warning
Please finalize DNS names prior to PSaaS Appliance deployment.
:::

You will also need names for the Management Dashboard, Webtask endpoints, Webtask dedicated domain, and App Tenant.

|   | Description |
| - | ----------- |
| Management Dashboard | The Management Dashboard is your web application's management interface. You'll typically choose the name **manage**, but you can use something else if needed |
| Webtask Endpoints | The Webtask DNS is used for web extensions and external use of Webtasks. You'll typically use the name **webtask**, but you can use something else if needed |
| Webtask Dedicated Domain | Beginning with Appliance version 13451, Webtask may now be configured on a dedicated domain. This enables safely using extensions in multi-tenant environments in the same manner as the Auth0 Public Cloud Service. Auth0 will set up a DNS zone to host the name entries for each tenant. Auth0 recommends `*.wt.<customer_env>.auth0.com`. |
| App Tenant | The App Tenant is the initial tenant where your applications reside. The is the tenant your users will interact with primarily, and you'll manage this using the Management Dashboard and API.

## Sample Domain Name Sets

The following is a sample set of domain names for a typical Development and Production environment setup where the App Tenant's name is **identity**.

**Development**

* **manage**.mycompany-dev.auth0.com
* **webtask**.mycompany-dev.auth0.com
* *.wt.mycompany-dev.auth0.com
* **identity**.mycompany-dev.auth0.com

**Production**

* **manage**.mycompany.auth0.com
* **webtask**.mycompany.auth0.com
* *.wt.mycompany.auth0.com
* **identity**.mycompany.auth0.com

### Domain Name Patterns

Each domain name will end in `auth0.com`.

The Management Dashboard, Webtask, and App Tenant(s) **must** be a part of the same parent domain (such as `yourdomain.auth0.com`).

The hostname (such as **manage-project**.yourdomain.auth0.com) must be at least three characters long and must **not** contain any underscores(_).

The word `login` is reserved and **cannot** be used.

The domain name you use for tenants hosted in the Dedicated Cloud Service **cannot** be the same as any you're using for tenants hosted in the Public Cloud Service. 

**If you want to use your domain name in use on the Public Cloud Service in the Dedicated Cloud Service, we will need to delete your Public Cloud Service account.**