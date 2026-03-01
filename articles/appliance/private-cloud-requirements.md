---
section: appliance
description: This document details the requirements for the Auth0 Dedicated Cloud Service.
toc: true
topics:
    - appliance
    - private-cloud
    - requirements
contentType: reference
useCase: appliance
applianceId: appliance61
sitemap: false
---
# Requirements for the Auth0 Dedicated Cloud Service

If your subscription agreement includes a Private SaaS (PSaaS) Appliance that is hosted in a dedicated area of Auth0's cloud, Auth0 will set up the PSaaS Appliance on your behalf.

## Support

Auth0 will provide you with an account to access the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}), where you can obtain information about your Auth0 environment and open support tickets. This account will be linked to your PSaaS Appliance and current [Support](/support) plan.

In general, the tenant name you'll use for support is formatted as follows: **customer_name**-support

You will also be asked to provide a list of tenant admins. Note that tenant admins can invite other support users.

## Preferred AWS Regions

You'll be asked for your preferred AWS regions, such as `AWS US-WEST-2`, `AWS US-East-1`, `AWS EU-Central-1`, and so on. You'll need to select:

* One region for your Development node
* One region (with at least three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure)) for your Production cluster

## DNS Records

::: warning
Please finalize  DNS names prior to PSaaS Appliance deployment.
:::

Auth0 provides the domain names needed for your DNS zones/certificates. If you have Development and Production environments, your domain names will typically be formatted as follows:

| Environment | Sample Domain Name          |
| ----------- | --------------------------- |
| Development | **company**-dev.auth0.com |
| Production  | **company**.auth0.com     |

You will also need names for the Management Dashboard, Webtask endpoints, Webtask dedicated domain, and App Tenant.

|   | Description |
| - | ----------- |
| Management Dashboard | The Management Dashboard is your web application's management interface. You'll typically choose the name **manage**, but you can use something else if needed |
| Webtask Endpoints | The Webtask DNS is used for web extensions and external use of Webtasks. You'll typically use the name **webtask**, but you can use something else if needed |
| Webtask Dedicated Domain | Beginning with Appliance version 13451, Webtask may now be configured on a dedicated domain. This enables safely using extensions in multi-tenant environments in the same manner as the Auth0 Public Cloud Service. Auth0 will set up a DNS zone to host the name entries for each tenant. Auth0 recommends `*.wt.<customer_env>.auth0.com`. |
| App Tenant | The App Tenant is the initial tenant where your applications reside. The is the tenant your users will interact with primarily, and you'll manage this using the Management Dashboard and API.

### Sample Domain Name Sets

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

The word `login` is reserved and **cannot** be used. Please also refer to the [full list of reserved words](/appliance/infrastructure/dns#hostnames).

The domain name you use for tenants hosted in the Dedicated Cloud Service **cannot** be the same as any you're using for tenants hosted in the Public Cloud Service. 

**If you want to use your domain name in use on the Public Cloud Service in the Dedicated Cloud Service, we will need to delete your Public Cloud Service account.**

## Administrator Email Addresses

We will need the email addresses for the administrators of the **Manage** and **App** tenants in both the Development and Production environments

### Group Email Address

Auth0 will provide a daily uptime report of your PSaaS Appliance service, which is sent to an email address (with a group alias) specified by you.

In the event that there is an issue, you can specify a group alias to receive alerts.

### SMTP Settings

::: note
This information is not required until the required environments are ready. Auth0 will work with you to update your settings. See the [SMTP section](/appliance/infrastructure/security#smtp) of the PSaaS Appliance infrastructure manual.
:::

We will need the following SMTP-related values:

* Host name
* Port number
* Username
* Password

## Custom Domain

::: note
A custom domain is optional, and Auth0 SLAs do **not** cover this portion of the PSaaS Appliance infrastructure.
:::

You can configure a single custom domain name for your app tenants' domains. 

If you choose to use a custom domain, you'll need to manage the DNS name record, [SSL Certificate](/appliance/infrastructure/security#ssl-certificates), and add the appropriate DNS entry that alias the Auth0 identity.

For example, you'll need to map `identity.<your_name>.auth0.com` to `identity.<your_name>.com`.

::: warning
Webtask does not support custom domains.
:::

### Keep Reading

::: next-steps
* [Custom Domains on the PSaaS Appliance](/appliance/custom-domains)
:::
