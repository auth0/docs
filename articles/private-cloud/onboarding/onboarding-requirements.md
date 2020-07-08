---
section: private-cloud
description: Learn about onboarding requirements for the Auth0 Private Cloud deployment option.
toc: true
topics:
    - appliance
    - private-cloud
    - requirements
contentType: reference
useCase: 
    - private-saas-deployment
    - private-cloud
    - appliance
applianceId: appliance61
sitemap: false
---
# Private Cloud Onboarding Requirements

For Standard and Auth0-hosted Private Cloud deployment options, we will set up Private Cloud on your behalf. Upon contract signing, we will ask you to provide key information regarding your onboarding requirements through an onboarding form, which we will then validate.

<table>
  <tr>
    <td>Requirement</td>
    <td>Standard Private Cloud</td>
    <td colspan=2>Managed Private Cloud</td>
  </tr>
 <tr>
    <td></td>
    <td></td>
    <td>Auth0-hosted</td>
    <td>Customer-hosted</td>
  </tr>
  <tr>
    <td>Tenant names</td>
    <td>Yes (Prod only)</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>DNS records and SSL certificates</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Tenant administrators</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Communication group email</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>SSO setup needs</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  <tr>
    <td>Preferred production region</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes (AWS region)</td>
  </tr>
  <tr>
    <td>Preferred development region</td>
    <td>N/A</td>
    <td>Yes</td>
    <td>Yes (AWS region)</td>
  </tr>
  <tr>
    <td>GeoHA needs</td>
    <td>N/A</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Data sovereignty needs</td>
    <td>N/A</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
</table>

## Tenant names

You will need to provide tenant names for your App Tenant, Auth0 Dashboard, Support Tenant, Webtask endpoints, and Webtask dedicaed domain.

::: warning
The domain name you use for tenants hosted in the Private Cloud cannot be the same as any you're using for tenants hosted in the Public Cloud. If you want to use your domain name in use on the Public Cloud in the Private Cloud, we will need to delete your Public Cloud account.
:::

|   | Description |
| - | ----------- |
| App Tenant | The App Tenant is the initial tenant where your applications reside. The is the primary tenant your users will interact with, and you'll manage this using the Auth0 Dashboard and API. |
| Auth0 Dashboard | The Dashboard is your web application's management interface. You'll typically choose the name **manage**, but you can use something else if needed. |
| Support Tenant | We will provide you with an account to access the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}), where you can get information about your Auth0 environment and open support tickets. This account will be linked to your Private Cloud deployment and current [Support](/support) plan. In general, the tenant name you use for support is formatted as follows: **customer_name**-support. |
| Webtask Endpoints | The Webtask DNS is used for web extensions and external use of Webtasks. You'll typically use the name **webtask**, but you can use something else if needed |
| Webtask Dedicated Domain | Webtask may be configured on a dedicated domain, which enables you to safely using extensions in multi-tenant environments in the same manner as the Auth0 Public Cloud deployment option. We will set up a DNS zone to host the name entries for each tenant and recommend the following format: `*.wt.<customer_env>.auth0.com`. |

### Sample domain name sets

The following is a sample set of domain names for a typical Development and Production environment setup where the App Tenant's name is **identity**:

**Development**

* **identity**.mycompany-dev.auth0.com
* **manage**.mycompany-dev.auth0.com
* **identity-support**.mycompany-dev.auth0.com
* **webtask**.mycompany-dev.auth0.com
* *.wt.mycompany-dev.auth0.com

**Production**

* **identity**.mycompany.auth0.com
* **manage**.mycompany.auth0.com
* **identity-support**.mycompany.auth0.com
* **webtask**.mycompany.auth0.com
* *.wt.mycompany.auth0.com

### Domain name requirements

::: warning
Please finalize DNS names prior to Private Cloud deployment.
:::

The following requirements must be met when selecting tenant and domain names:

* The domain name you use for tenants hosted in the Private Cloud cannot be the same as any you're using for tenants hosted in the Public Cloud. If you want to use your domain name in use on the Public Cloud in the Private Cloud, we will need to delete your Public Cloud account.
* Each domain name will end in `auth0.com`.
* The App Tenant, Auth0 Dashboard, and Webtask must be a part of the same parent domain (such as `mycompany.auth0.com`).
* The tenant name (such as **identity**.yourdomain.auth0.com) must be at least three characters long and must not contain any underscores(_).

In addition, reserved words cannot be used in tenant names. These include:

<table class="table">
  <tbody>
    <tr>
        <td>login</td>
        <td>admin</td>
        <td>app</td>
        <td>manage</td>
        <td>blog</td>
    </tr>
    <tr>
        <td>ftp</td>
        <td>mail</td>
        <td>pop</td>
        <td>pop3</td>
        <td>imap</td>
    </tr>
    <tr>
        <td>smtp</td>
        <td>stage</td>
        <td>stats</td>
        <td>status</td>
        <td>dev</td>
    </tr>
    <tr>
        <td>logs</td>
        <td>www</td>
        <td>docs</td>
        <td>sdk</td>
        <td>ci</td>
    </tr>
    <tr>
        <td>docker</td>
        <td>styleguide</td>
        <td>ask</td>
        <td>it</td>
        <td>cdn</td>
    </tr>
    <tr>
        <td>api</td>
        <td>releases</td>
        <td>release</td>
        <td>spf</td>
        <td>feedback</td>
    </tr>
    <tr>
        <td>help</td>
        <td>support</td>
        <td>int</td>
        <td>auth</td>
        <td></td>
    </tr>
  </tbody>
</table>

::: warning
Please note that the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) from **auth0** to the supplied name *must be greater than two*. This means that tenant names like **auth** or **authy** (and other similar names) cannot be used.

To find out if your tenant name meets this requirement, you can validate your selections using a [Levenshtein Distance calculator](http://www.unit-conversion.info/texttools/levenshtein-distance/).
:::

### Custom Domains

::: note
Because a custom domain is optional, Auth0 SLAs do not cover this portion of the Private Cloud infrastructure.
:::

You can configure a single custom domain name for your app tenants' domains. 

If you choose to use a custom domain, you'll need to manage the DNS name record, SSL Certificate, and add the appropriate DNS entry that aliases the Auth0 identity.

For example, you'll need to map `identity.<your_name>.auth0.com` to `identity.<your_name>.com`.

::: warning
Webtask does not support custom domains.
:::

## DNS records and SSL certificates

We will ask whether you control the requested DNS zone and whether you will able to issue wildcard SSL certificates for the domain names.

## Tenant administrators

We will request a list of email addresses for your tenant administrators for you App Tenant and Auth0 Dashboard. Note that tenant administrators can invite other administrators. If you have a Development environment, these can be different for Development and Production.

## Group email address

We will provide a daily uptime report of your Private Cloud deployment that will be sent to an email address (with a group alias) that you specify. You can also specify a group alias that will receive alerts if there is an issue.

## SSO setup

We will ask whether you would like to set up Single Sign-On, and if so, whether you would like to use a specific [connection](/connections).

## Preferred region

We will ask for your preferred region. For Standard and Auth0-hosted Managed Private Cloud, these will correspond to a preferred Auth0 region. For Customer-hosted Managed Private Cloud, this will correspond to a preferred AWS region. If you have a Development environemnt, these can be different for Development and Production. For Customer-hosted Managed Private Cloud, the selected AWS region for the Production cluster must have at least three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure)).

## Geographic High Availability needs

We will ask whether you require a high availability geo cluster (Geo HA), which provides regional data center redundancy and rapid failure response.

## Data sovereignty needs

We will ask you to provide details about any requirements you have regarding data sovereignty.