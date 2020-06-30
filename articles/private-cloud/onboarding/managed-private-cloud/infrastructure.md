---
section: private-cloud
description: Infrastructure requirements for the customer-hosted Managed Private Cloud
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Infrastructure Requirements for the Customer-Hosted Managed Private Cloud

If you are a Managed Private Cloud customer hosting Auth0 using Amazon Web Services, the following are the requirements you should be aware of when setting up your cloud environment.

## Choosing your AWS regions

The AWS Region(s) in which your deployments are hosted must support:

* At least **three (3)** availability zones
* Cross-LAN availability zones
* M4 or M4 instance types
* RDS for PostgreSQL

## AWS instance types

The size of your AWS instance must be, at minimum, **M4.2xlarge**, though the **M5.2xlarge** size is preferred.

We ask that the individual volumes have the following resource allocation:

<table class="table">
    <tr>
        <td></td>
        <td><b>System / Operating System<b></td>
        <td><b>Database<b></td>
        <td><b>User Search<b></td>
        <td><b>Backup<b></td>
    </tr>
    <tr>
        <td><b>a0-1 (PROD)<b></td>
        <td>60 GB</td>
        <td>100 GB</td>
        <td>100 GB</td>
        <td>--</td>
    </tr>
    <tr>
        <td><b>a0-2 (PROD)<b></td>
        <td>60 GB</td>
        <td>100 GB</td>
        <td>100 GB</td>
        <td>--</td>
    </tr>
    <tr>
        <td><b>a0-3 (PROD)<b></td>
        <td>60 GB</td>
        <td>100 GB</td>
        <td>100 GB</td>
        <td>100 GB</td>
    </tr>
    <tr>
        <td><b>DEV (non-PROD)<b></td>
        <td>60 GB</td>
        <td>50 GB</td>
        <td>50 GB</td>
        <td>50 GB</td>
    </tr>
</table>

Please note that you may have a different number of instances based on your specific deployment type.

## Network

All servers in the cluster must:

* Have outbound access
* Be on the same subnet
* Be able to communicate over ports 7777, 27017, 8721, and 8701
* Listen for and accept traffic from the load balancer over ports 443 and 4443

For a complete listing of IP addresses and ports used, see the [IP/Domain and Port List](/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list).

## Internet connectivity

Internet connectivity is required for all servers in the cluster.

All servers in the cluster require outbound access to:
* **docker.it.auth0.com** (**52.9.124.234**) on port 443.
* **cdn.auth0.com** on port 443.
* Social providers and third-party APIs (as needed)

## DNS records

Each environment (e.g., Development, Staging, Production), which are represented by `<env-name>`, requires a separate namespace when it comes to DNS records.

You will need DNS records for the following namespaces:

| **Namespace/Environment | Notes |
| - | - |
| **Auth0 environment Namespace** (e.g., `*.<env-name>.customer.com`)| You can choose to use a catch-all CNAME record that represents all of your tenants and Dashboard endpoints **or** individual CNAME records for each tenant. The following `env-names` cannot be used: **manage** (reserved for the Dashboard), **config** (reserved for the root tenant authority), **webtask** (reserved for extensibility) |
| **Auth0 Webtask with Dedicated Domains Namespace** (e.g., `*.wt.<env-name>.customer.com`) | You can choose to use a catch-all CNAME record to represent all of your tenants **or** you can use an individual CNAME record for each tenant pointing to the balanced endpoint |
| **Custom Domains Namespace** | Requires a catch-all CNAME record redirecting custom domains to the custom domains balanced endpoint **and** an alias record using `edge.<env-name>.customer.com ` that points to the custom domains balanced endpoint |

## Load balancers

You must use either an ALB or ELB. For HTTP health check monitoring, you can use the `testall` endpoint provided by Auth0.

### Software Load Balancers

You can use either NGINX or HA Proxy as the software load balancer in front of the Auth0 environment or for IP whitelisting and/or endpoint filtering (only authentication endpoints are publicly available). If you are using NGINX or HA Proxy as the software load balancer, you must:

* Use TCP mode with Proxy Protocol or HTTPS mode (SSL offloading). In HTTPS mode the connector will not work.
* Forward the incoming hostname to the nodes

## SSL Certificates

Your SSL certificates must:

* Be signed by a public certificate authority
* Contain all of the required DNS names (if the certificate is not a wildcard certificate)
* Be in the PFX or PKCS12 formats
* Contain the full chain

## TLS

Auth0 requires TLS 1.1 or later.

## SMTP

You must set up and configure a SMTP provider (or a global default email provider) to send emails. Optionally,, you can set up transactional email providers (e.g., SendGrid, Amazon SES, Mandrill) for individual tenants.

STARTTLS is supported by Auth0, but is not required.

## Amazon RDS for PostgreSQL

Amazon RDS for PostgreSQL is currently used to support the Authorization Roles-Based Access Control functionality, but it will be used to support other functionality in the future.

We ask that, at minimum, you use **postgres10, db.r3.xlarge** with 10 GB of storage. You should also allow automated snapshots with seven-day snapshot retention and multi-AZ deployments with automated failover.

## Remote Access

Forthcoming.