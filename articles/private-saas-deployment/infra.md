# Private SaaS (PSaaS) Appliance Infrastructure Requirements

The following basic steps are required to get the infrastructure up and running and the PSaaS Appliance deployed:

1. Understand the PSaaS Appliance infrastructure requirements as detailed in this document
2. Set up the infrastructure after Auth0 has shared the required AMI file with you
3. Complete and submit the [PSaaS Appliance Install Checklist](https://docs.google.com/forms/d/e/1FAIpQLSckWRi2MWpzhBkUXoqjaEzMPGUsyL4ICbOetcGvSnn64dSM-A/viewform?c=0&w=1) to notify Auth0 that you have the required infrastructure in place and that you're ready for Auth0 to begin configuring the PSaaS Appliance
4. Meet with Auth0 to deploy the Development and Production environments

## Development/Test/Production Lifecycle

::: note
Production and non-Production (test/development) must be on completely isolated networks.
:::

All PSaaS Appliance multi-node cluster subscription agreements require the deployment of a single-node Development/Test (non-Production) instance.

This node is used to verify that the PSaaS Appliance is working as expected with your applications prior to deployment to Production. It also allows for a thorough PSaaS Appliance update and testing cadence. Lastly, this improves any possible support experiences, since Auth0 engineers prefer testing or reviewing planned changes/fixes to your implementation in a non-Production environment.

## Virtual machine requirements

Auth0 recommends the following specifications for the Virtual Machine infrastructure. For multi-node clusters, each node requires a separate VM that meet the specifications.

* **Memory**: 32 GB RAM (minimum);
* **CPU**: 8 vCPU (minimum);
* **Storage**:
    * *For Non-Production Nodes*: 4 drives: 60 GB for system/operating system storage, 50 GB for data storage, 50 GB for User Search, and 50 GB for backup purposes (if you want to test the backup process).
    * *For three-node, high availability Production clusters*:
        * Two of the virtual machines with 3 drives: 60 GB for system/operating system storage, 100 GB for data storage, and 100 GB for User Search;
        * One virtual machine with 4 drives: 60 GB for system/operating system storage, 100 GB for data storage, 100 GB for User Search, and 100 GB for backup purposes.
        * If you anticipate more than 10 million users, please let us know for additional storage requirements and considerations.
        * Drives should be thick provisioned.

::: note
  Large installations will require higher IO performance. Auth0 will work with you to determine the required storage performance levels.
:::

For multi-node clusters, Auth0 recommends deploying the PSaaS Appliance virtual machines across more than one physical host server/blade.

The *recommended* [instance type](https://aws.amazon.com/ec2/instance-types/) is **M4.2xlarge** (minimum).

### Provisioning the virtual machine

Auth0 provides the Private Cloud via an [Amazon Machine Image](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/AMIs.html) (AMI) for you to provision on to your infrastructure.

Auth0 will need the following pieces of information to share the AMI with you:
    * AWS account number;
    * AWS region name. The region should have at least three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure) for your Production cluster.

If your production and development/test environments are within separate AWS accounts/regions, Auth0 will require the account number for both environments.

## Network

::: note
Auth0 PSaaS Appliance can only be deployed in 1 NIC.
:::

Auth0 supports and recommends cross-LAN availability zones.

### IP Addresses

Each PSaaS Appliance virtual machine (VM) must have its own private static IP address and outbound access. This can be accomplished through:

* a public IP address;
* NAT or transparent proxy.

For **multi-node** clusters, all virtual machines must be:
* on the same segment of the internal network;
* able to communicate between each other via ports `7777`, `27017`, `8721`, and `8701`.
* able to reach the load balancer via port `443`.

::: note
  Production and non-Production (test/development) must be on completely isolated networks.
:::

For a full list of IP addresses, domains, and ports used by the PSaaS Appliance clusters, as well as what they are used for, please see [Appliance Infrastructure: IP/Domain and Port List](/appliance/infrastructure/ip-domain-port-list).

### Internet Connectivity

Each PSaaS Appliance VM needs connectivity to the Internet. At a minimum, the VM needs access during Appliance configuration, maintenance windows, and troubleshooting. For implementations requiring integration with social providers and/or third-party API calls, the VM will need Internet access at all times.

Since the PSaaS Appliance is delivered as a subscription-based managed service, Auth0 will need access to specified endpoints to provide proactive monitoring.

Your server also needs to be able to access **cdn.auth0.com** if you run web extensions. The browsers used by your admins will also need to access the CDN if they navigate to the Management Dashboard.

## DNS Records

DNS records are required for all PSaaS Appliance instances (development/test *and* production). A standard single-node or cluster deployment requires four DNS entries for the following:

* **Management Dashboard**: the Management Dashboard is the web interface that acts as an application for the configuration and application tenants on the PSaaS Appliance;
* **Root Tenant Authority**: the tenant on the PSaaS Appliance that controls PSaaS Appliance settings, configuration, and local Dashboard Admin users;
* **webtask**: webtask DNS is used for web extensions and to use Webtasks externally;
* **App Tenant**: the tenant on the PSaaS Appliance created for your apps. It manages settings for your apps, user profiles, rules, and so on. This is the tenant you will interact with primarily through the Management Dashboard and the API.

Each additional DNS zone requires an additional certificate. Please refer to the [DNS page](/appliance/infrastructure/dns) for specific requirements.

## Load Balancers (for Multi-Node Clusters only)

You must include a round-robin load balancer in your infrastructure when implementing a multi-node cluster PSaaS Appliance with high-availability.

We recommend a layer 7/application layer load balancer that supports:

* HTTP health monitoring. The [testall](/appliance/monitoring/testall) endpoint is an unauthenticated endpoint that will be used for monitoring by load balancers;
* Awareness of websockets (this is required if using the Auth0 AD/LDAP Connector);
* TCP/IP:
    * If your deployment requires geo-location data for users authenticating with Auth0, support for `proxy_protocols` (which append the remote UP address when opening a connection to the backend) will be exposed to the nodes. If `proxy_protocols` is not supported, the IP address information captured for individual logins will always appear as the Load Balancer IP address;

#### Software Load Balancers

You may use NGINX or HA Proxy as a software load balancer in front of the PSaaS Appliance. The reverse proxy must be configured with:

* TCP mode with Proxy Protocol or HTTPS mode (SSL offloading)
* the incoming hostname forwarded to the PSaaS Appliance nodes

In addition to load balancing, you may use this for **IP address whitelisting** and **endpoint filtering** (only authentication endpoints are publicly available).

#### SSL Offloading

The PSaaS Appliance supports the use of SSL offloading at the load balancer if your IT standards require the use of HTTP within the local network. The load balancer must add a `X-Forwarded-Proto` header with the value `https`.

Please note that the use of SSL offloading is not required to achieve high throughput.

## IP/Domain and Port List

The PSaaS Appliance requires certain ports within the cluster to be open and able to access each other, as well as selected external sites.

### Between Cluster Nodes

When possible, instances within a cluster should have full connectivity to each other so that you do not need to introduce new firewall rules if Auth0 adds new features. However, since this isn't possible in every environment, the following table lists the ports that are required to be open and accessible to other PSaaS Appliance instances in the same cluster:

<table class="table">
  <thead>
  <tr>
    <th>Port</th>
    <th>Use</th>
    <th>Required?</th>
    <th>Notes</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>27017</td>
    <td>Database</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>7777</td>
    <td>Control</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>9001</td>
    <td>Rate Limiting</td>
    <td>Yes</td>
    <td>Required if rate limiting is used</td>
  </tr>
  <tr>
    <td>8721</td>
    <td>Webtask Logging/Control</td>
    <td>Yes</td>
    <td>Required for logging and debugging</td>
  </tr>
  <tr>
    <td>8701</td>
    <td>Webtask Logging/Control</td>
    <td>Yes</td>
    <td>Required for logging and debugging</td>
  </tr>
  <tr>
    <td>9200, 9300-9400</td>
    <td>Elastic Search</td>
    <td>Yes</td>
    <td>Required for Elastic Search</td>
  </tr> 
   <tr>
    <td>3000</td>
    <td>Grafana instrumentation</td>
    <td>No</td>
    <td>Required if you are using Grafana instrumentation</td>
  </tr>  
  <tr>
    <td>22</td>
    <td>Maintenance</td>
    <td>No</td>
    <td>Enables maintenance tasks to be done between nodes</td>
  </tr>
  <tr>
    <td>ICMP</td>
    <td>Healthcheck</td>
    <td>No</td>
    <td>Allows healthchecks between nodes</td>
  </tr>
  </tbody>
</table>

### External Connectivity

Auth0 strives to keep these IP addresses stable, though this is not a given. From time to time, Auth0 may add IP addresses or additional servers. During updates and metrics, you must allow your PSaaS Appliance instances to connect to these addresses.

<table class="table">
  <thead>
  <tr>
    <th>Use</th>
    <th>Direction</th>
    <th>IP/DNS</th>
    <th>Port</th>
    <th>Notes</th>
    <th>Required?</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>Inbound</td>
    <td>Your load balancer IP address (often on internal network)</td>
    <td>80/(443 or 4443)</td>
    <td>For clusters with more than one node, a load balancer is required for resiliency and performance</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Webtask</td>
    <td>Outbound</td>
    <td>Your load balancer IP address (often on internal network)</td>
    <td>443</td>
    <td>Allows rules, webtasks, and extensions to call back to Auth0 endpoints</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Command Line Interface</td>
    <td>Inbound <b>and</b> Outbound</td>
    <td>CLI Applications (often on the internal network)</td>
    <td>10121</td>
    <td>Allows use of the PSaaS Appliance Command Line Interface</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>apt-mirror.it.auth0.com (52.8.153.197)</td>
    <td>443</td>
    <td>Provides update packages for PSaaS Appliance instances</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>docker.it.auth0.com (52.9.124.234)</td>
    <td>443</td>
    <td>Provides updates for PSaaS Appliance Docker Packages</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Web extensions, Hooks, and Management Dashboard</td>
    <td>Outbound</td>
    <td>cdn.auth0.com</td>
    <td>443</td>
    <td>Required to run web extensions and Hooks; also required for admins to browse to the Management Dashboard</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Examples</td>
    <td>Outbound</td>
    <td>github.com</td>
    <td>443</td>
    <td>Source to download and repackage example applications</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Usage & Telemetry</td>
    <td>Outbound</td>
    <td>app-gateway.it.auth0.com (52.40.103.203)</td>
    <td>443</td>
    <td>Provides usage and telemetry statistics</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Maintenance</td>
    <td>Inbound</td>
    <td>Jump Host</td>
    <td>22</td>
    <td>Allows access to PSaaS Appliance instances for support purposes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Healthcheck  </td>
    <td>Inbound</td>
    <td>Monitoring Endpoint</td>
    <td>9110</td>
    <td>Allows access to Healthcheck endpoints</td>
    <td>No</td>
  </tr>
  <tr>
    <td>DNS</td>
    <td>Inbound <b>and</b> Outbound</td>
    <td>Local domain servers</td>
    <td>53</td>
    <td>Required by the PSaaS Appliance to resolve host names internal and external to your environment</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>SMTP</td>
    <td>Outbound</td>
    <td>SMTP Server(s)</td>
    <td>25/587</td>
    <td>Allows sending of emails from the Appliance</td>
    <td>No</td>
  </tr>
  </tbody>
</table>

### Notes

* If you are using social providers for logins, the cluster must be able to connect to the social providers' endpoints.
* The Jump Host IP is stable and provided at the time of setup.

## DNS

::: note
DNS records must be finalized for all of the tenants prior to PSaaS Appliance deployment. They cannot be changed afterwards.
:::

You’ll need one certificate per environment (such as if you have a Dev/Test environment and a Prod environment, you’ll need two certs).

If you’d like to use a [Webtask Dedicated Domain](/appliance/webtasks/dedicated-domains), you’ll need an additional DNS zone and certificate for each environment. If you have a Dev/Test environment and a Prod environment, you’ll need a two total of two certificates per environment.

Dedicated and non-dedicated host names must be unique.

### Sample DNS Naming Scheme

<table class="table">
  <tbody>
    <tr>
        <th>Management Dashboard</th>
        <td>manage.yourdomain.com</td>
    </tr>
    <tr>
        <th>Configuration</th>
        <td>config.yourdomain.com</td>
    </tr>
    <tr>
        <th>Webtask</th>
        <td>webtask.yourdomain.com</td>
    </tr>
    <tr>
        <th>App Tenant(s)</th>
        <td>identity.yourdomain.com (for example); <br /> app-project.yourdomain.com (if you want more than 1 App tenant) <br />...and so on</td>
    </tr>
  </tbody>
</table>

For a dev/test non-production PSaaS Appliance a common practice is to include "dev” in the domain name:

<table class="table">
  <tbody>
    <tr>
        <th>Management Dashboard (Dev)</th>
        <td>manage.dev.yourdomain.com</td>
    </tr>
    <tr>
        <th>Configuration (Dev)</th>
        <td>config.dev.yourdomain.com</td>
    </tr>
    <tr>
        <th>Webtask (Dev)</th>
        <td>webtask.dev.yourdomain.com</td>
    </tr>
    <tr>
        <th>App Tenant(s) (Dev)</th>
        <td>identity.dev.yourdomain.com (for example); <br /> app-name.dev.yourdomain.com (if you want more than 1 App tenant)<br />...and so on</td>
    </tr>
  </tbody>
</table>

#### Definitions of Terms Used in the DNS Naming Scheme

* **Configuration**: highly-privileged tenant used to do the PSaaS Appliance baseline configuration and for managing the security of other tenants;
* **App**: the name of your application;
* **yourdomain.com**: your organization's domain name.

![](/media/articles/appliance/infrastructure/appliance-dns.png)

### Multi-Tenancy

The Auth0 PSaaS Appliance is capable of supporting multi-tenancy (that is, each tenant may have one or more associated apps). Auth0 may recommend this deployment model when multiple groups within your company share the PSaaS Appliance for different projects. If a customer decides to create multiple app tenants, each app tenant must have its own DNS entry.

### DNS Configuration Requirements

In a standard multi-node cluster deployment, the DNS records will point to the IP address of the [load balancer in front of the cluster](/appliance/infrastructure/infrastructure-overview).

#### IP Addresses and DNS Records

For a single-node PSaaS Appliance instance, the DNS record(s) will point to the IP address of the virtual machine itself (this is often the case for the development/test node).

::: note
  Auth0 does not recommend using the same wildcard certificate(s) for Production **and** non-Production (Test/Development) environments **or** mapping the DNS for both environments to the same servers.
:::

#### Hostnames

The hostname (such as **manage-project**.yourdomain.com) must be at least three characters long and must **not** contain any underscores(_).

The following are reserved tenant names and **may not** be used for the **app** tenant.

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

To see if your tenant name meets this requirement, you can validate your selections using a [Levenshtein Distance calculator](http://www.unit-conversion.info/texttools/levenshtein-distance/).
:::

The Management Dashboard, Configuration Tenant, and App Tenant(s) must all be a part of the same parent domain (such as yourdomain.com).

Three- or four-part domain names are supported (such as manage.project.yourdomain.com).

#### Custom Domains

In the PSaaS Appliance, you may map any arbitrary domain name to a tenant using the Custom Domains feature. You may also map multiple custom domains to a single tenant.

Suppose these were your standard domains:

<table class="table">
  <tbody>
    <tr>
        <td>Root Tenant Authority</td>
        <td>Sample Tenant</td>
        <td>Custom Domain for the Sample Tenant</td>
    </tr>
    <tr>
        <td>config.example.com</td>
        <td>auth.example.com</td>
        <td>new-name.not-example.com</td>
    </tr>
  </tbody>
</table>

Please note that all tenant names are derived from the base Configuration Tenant. However, you may set your custom domain to point toward any of your tenants (in the example above, `new-name.not-example.com` maps to `auth.example.com`, and the latter may be used by your applications).

## Webtasks and Web Extensions

The PSaaS Appliance supports:

* Extensions
* [Webtasks](appliance/webtasks)
* User search using Elasticsearch

### Extensions

You can find a list of extensions available to you [on the Dashboard]({$manage_url}/#/extensions).

Some of the [Extensions available to users of the Auth0 public cloud](/extensions) are unavailable in the PSaaS Appliance. As such, these do not appear as options in the PSaaS Appliance's Dashboard.

### Webtasks Requirements 

Your Development and Production environments must meet the following requirements before you can enable Webtasks:

* All nodes in the cluster have outbound access using **Port 443** to:
  * `docker.it.auth0.com` (or `52.9.124.234`)
  * `cdn.auth0.com`
* All nodes can communicate with other nodes in the same cluster using ports **8721** and **8701**.
* All [SSL certificates](/appliance/infrastructure/security#ssl-certificates) have the appropriate Webtask DNS entry. Examples:
  * `webtask.<yourdomain>.com`
  * `webtask-dev.<yourdomain>.com`

### Enable Webtasks

Once you have met the requirements for enabling Webtasks, submit a Support ticket to request that Auth0 configure Webtasks on your behalf.

### Dedicated Domains

You may configure Webtasks on a [dedicated domain](/appliance/webtasks/dedicated-domains). Using dedicated domains enables you to safely use extensions in multi-tenant environments (the behavior is akin to that of the Auth0 Public Cloud Service).

If you are planning on using Extensions, you **must** implement Webtask dedicated domains.

### User search

The PSaaS Appliance supports User Search using Elasticsearch. This allows you to use extensions that require user search functionality, including the [Delegated Administration extension](/extensions/delegated-admin).

#### Requirements for enabling user search

To enable User Search, you must increase the amount of storage available in your Development and Production environments.

* If you have a *single non-Production/Development node*, you need an additional **50 GB** drive;
* If you have a *three-node Production cluster*, you need an extra **100 GB** drive on *each* of your three Virtual Machines;
* If you have a *Geographic High-Availability implementation*, you need an additional **100 GB** drive on *each* of your data nodes in the primary and secondary data centers.

For all other configuration types, please consult with your Customer Success Engineer.

#### Enabling User Search

Once you have added the additional drive(s), submit a Support ticket to request that Auth0 enable User Search.

## Security and Access

The following are the security and access requirements for your Managed Private Cloud.

### SSL Certificates

When using the PSaaS Appliance, you will need to provide several SSL certificates. You must create and install a unique SSL certificate for:

* Each PSaaS Appliance (e.g., your production cluster, your development node, your QA environment)
* [Extensions](/appliance/extensions)
* [Custom Domains](/appliance/custom-domains)
* [Webtasks](/appliance/webtasks) (with or without [Dedicated Domains](/appliance/webtasks/dedicated-domains))

 ::: note
   If you are unsure of where to get SSL Certificates, please contact your network security team. They are usually the ones familiar with the required processes and working with the appropriate certificate authorities (CA) to generate new certificates.
 :::

The SSL Certificate:

* must be created by a public certificate authority. They cannot be self-signed;
* can be a wildcard *or* a multi-domain (SAN) certificate;
* must contain all required DNS/domain names, including those for the:
    * Management Dashboard;
    * Configuration Tenant;
    * webtask;
    * App Tenant(s) (current *and* future) specific to that particular PSaaS Appliance instance.

Auth0 accepts the following certificate format:

* PFX/PKCS12

If you are using CER / PEM format, you should [convert to PFX format](http://stackoverflow.com/questions/2957742/how-to-convert-pkcs8-formatted-pem-private-key-to-the-traditional-format).

::: note
  The PFX certificate must contain the full chain (all intermediate certificates must be included in the public key).
:::

```text
-----BEGIN CERTIFICATE-----
MY-PUBLIC-KEY
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
PARENT
-----END CERTIFICATE-----
```

If you're uploading the public and private keys separately, convert the private key to RSA as follows:

```text
-----BEGIN RSA PRIVATE KEY-----
PRIVATE-KEY
-----END RSA PRIVATE KEY-----
```

### Transparent Proxies

If you are behind a transparent proxy, you will need to:

* obtain certificate(s) for your proxy created by a public certificate authority.
* add an exception so that the PSaaS Appliance instance(s) may get through the proxy unauthenticated.

### HTTPS or TLS

Users must connect to the PSaaS Appliance using secure protocols (HTTPS or TLS). Depending on your network design, you could terminate the Secure Channel at the load balancer or the PSaaS Appliance. In both cases, your SSL/TLS certificate must be locally installed on the PSaaS Appliance.

### SMTP

You must configure an SMTP server for the PSaaS Appliance to send emails. The PSaaS Appliance requires an authentication SMTP server that has been configured with SMTP PLAIN authentication.

**AWS SES Users**: If your domain is not validated, you will not be able to send email with AWS SES.

Optionally, you may use a Transactional Email Provider (such as SendGrid, Amazon SES, Mandrill).

The PSaaS Appliance supports STARTTLS, but it is not required.

### Auth0 Remote Access

Auth0 requires [remote access](/appliance/remote-access-options) to your PSaaS Appliance instances to perform updates, maintenance, or troubleshooting.

#### Initial Configuration

Auth0's remote access method for initial configuration requires SSH access via Jumphost. After the initial setup, please feel free to disable this connection. 

#### Updates, Maintenance, and Troubleshooting

Typically, updates are performed via the Auth0 Dashboard. If Auth0 needs to remote in to identify and troubleshoot issues, an Auth0 Customer Success Engineer will need access to the PSaaS Appliance through SSH access via Jumphost. This connection can be enabled for and disabled after the agreed-upon time frames for work.

## Deployments with Limited Internet Connectivity

While we make an effort to create PSaaS Appliances that are encapsulated for normal operation, there are several features that require access to external resources for normal functionality. These resources are primarily located on the Auth0 Content Delivery Network (CDN), which is accessed via **cdn.auth0.com**.

::: warning
The PSaaS Appliance **must** have access to the internet during [update periods](https://auth0.com/docs/appliance/infrastructure/ip-domain-port-list#external-connectivity).
:::

Operating the PSaaS Appliance in an internet-restricted environment results in the loss of the following features/functionality:

* Analytics (including usage statistics)
* Authentication API Explorer
* [Extensions](/extensions)
* [Hooks](/hooks)
* Lock
* Management API Explorer
* Management Dashboard
* Quickstarts
* Social Connections

### Management Dashboard

The browser that you are using to manage your PSaaS Appliance requires internet access to navigate to the Management Dashboard (located at **manage.your-domain**). 

You may, however, restrict server-side access to the Management Dashboard.

To properly render the Dashboard, it accesses the following sites:

* **cdn.auth0.com**: resources loaded from this CDN are well-known and include CSS, JavaScript, and images.
* **fonts.googleapis.com**: resources loaded include CSS and font files.
* **s.gravatar.com** and **i2.wp.com**: resources include user profile images loaded from WordPress' Gravatar service.
* **fast.fonts.net**: resources include CSS files for font support.

### Multi-factor Authentication (MFA)

When using multi-factor authentication (MFA), you will need internet access for Guardian MFA (both SMS and push notifications require internet connectivity).

For limited connectivity options, you may choose from:

* Guardian MFA TOTP
* Google Authenticator
* A custom MFA implementation using redirect rules
* Duo (on-premise versions only)

## FAQ

#### Are there any functional differences between the Auth0 Cloud and the Auth0 PSaaS Appliance?
If you have been developing applications with Auth0 in the cloud environment, please review the [differences between the two environments](/deployment).  Please speak to your Auth0 pre-sales engineer or customer success engineer if you’re unsure as to how this may impact your project.

#### Can I configure an HTTP proxy for outbound Internet access in the PSaaS Appliance?
While proxies are currently unsupported, please speak to your Auth0 Customer Success Engineer if your needs require the user of a transparent proxy or NAT.

#### Can I have SSH access to the machines?
No, the PSaaS Appliance is a managed service that runs within your AWS network. You are responsible for managing the infrastructure around the PSaaS Appliance. Auth0 will manage the PSaaS Appliance internals.

#### Can I install a monitoring agent in the PSaaS Appliance?
No, the PSaaS Appliance is a managed service that runs within your AWS network. You are responsible for managing the infrastructure around the PSaaS Appliance. Auth0 will manage the PSaaS Appliance internals. The PSaaS Appliance [exposes monitoring information](/appliance/monitoring) in the Dashboard for common metrics (CPU/memory/and so on) or through the API, which can be used by your operations team and monitoring tools to determine how the PSaaS Appliance is performing.

[Testall](/appliance/monitoring/testall) is an unauthenticated endpoint that can be used by load balancers. There are also additional authenticated endpoints that provide detailed information.

#### Can I install anti-virus software on the PSaaS Appliance?
While this is currently not supported, preinstalled anti-virus software may be included in future updates.

#### Will Auth0 provide me with a CSR file for my SSL Certificate?
No. The details of generating certificates, such as a CSR, vary among public certificate providers. Please work with your public certificate authority for these requirements.

If Auth0 hosts the PSaaS Appliance, Auth0 will provide the required `*.auth0.com` SSL certificates.

#### Why do both the DEV (non-prod) node and PROD cluster require unique certificates signed by a public Certificate Authority?
Webtasks and web extensions require this due to Node.js security requirements.

#### Can I whitelist specific IP addresses on my firewall to the Internet sites the PSaaS Appliance requires outbound access to?

For Auth0 PSaaS Appliance updates, we can provide you with specific addresses that are required.

For certain protocols, [Internet connectivity is required during operation](/appliance/infrastructure/internet-restricted-deployment) (such as social connections or emails).

Your server also needs to be able to access **cdn.auth0.com** if you run web extensions. The browsers used by your admins will also need to access the CDN if they navigate to the Management Dashboard.

#### Can I use Lock with my PSaaS Appliance implementation?

Yes, you can use Lock with your PSaaS Appliance implementation.

However, if you choose to operate your applications connected to the [PSaaS Appliance in an Internet-restricted environment](/appliance/infrastructure/internet-restricted-deployment), you will need to copy the library files to your network (you won't be able to access the CDN that hosts Lock).

If you choose this option, you are responsible for ensuring that your copy of the Lock source code stays up-to-date.

#### How is the Auth0 software installed? 

The PSaaS Appliance is a managed service that is deployed as [virtual machines](/appliance/infrastructure/virtual-machines) and runs on your network, so there is no traditional software installation involved.

Deployment of each PSaaS Appliance node is a manual process that must be performed by Auth0 Managed Service Engineers.

#### Can the PSaaS Appliance deployment be automated through Chef scripts?

Deployment of each PSaaS Appliance node is a manual process that must be performed by Auth0 Managed Service Engineers. 

While the images could be deployed via automation, configuration of the Appliance requires the services of an Auth0 Managed Service Engineer.

#### Can we deploy the PSaaS Appliance using Docker?

No, the Auth0 services cannot be deployed using Docker containers.

#### Does the PSaaS Appliance environment autoscale (that is, does it automatically spin up new nodes or remove nodes as load and demand requires)?

While the PSaaS Appliance can scale out its service layer, it is not currently designed to automatically scale up (or down) from the number of initial nodes deployed. 

Auth0 will work with you during the Sales/Onboarding process to ensure you are deploying the appropriate PSaaS Appliance architecture for your use case.

Our Professional Services team offers [Performance and Scalability](https://auth0.com/docs/services/performance-scalability) engagements to performance test and subsequently tune the PSaaS Appliance to your specific requirements.

#### How does Auth0 access customer-hosted PSaaS Appliance VMs?

Auth0 requires [remote access](/appliance/remote-access-options) to your PSaaS Appliance instances to configure, perform updates, perform maintenance, or troubleshoot. The remote access options are:

1. Jumphost + Firewall Whitelist
2. Two Jumphosts

We do not support other methods, such as VDI or Screen Sharing mechanisms.

#### We occasionally tear-down and rebuild environments, and we maintain our data by backing it up first. Is this a problem?

The Auth0 Appliance is not designed to be torn down and rebuilt easily, and such actions always requires Auth0 involvement. We therefore ask that you not tear down the environment on purpose.

To assist in the rebuilding of the environment, we would need to have an active Professional Services engagement in place with you, unless there has been a disaster situation.

#### What are the legal terms of the Private SaaS Appliance?

You can read the PSaaS Appliance terms [here](https://auth0.com/legal/baseline/PSaaS).

#### Does the PSaaS Appliance require internet access?

Please refer to [our documentation on the internet-related requirements](/appliance/infrastructure/internet-restricted-deployment) for the PSaaS Appliance.
