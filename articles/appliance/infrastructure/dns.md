---
section: appliance
description: Appliance infrastructure information about DNS
---

# DNS

The following document details the requirements of DNS records used for Appliance instances.

> **Important**: DNS records must be finalized for all of the tenants prior to Appliance deployment. They cannot be changed afterwards.

### Sample DNS Naming Scheme

<table class="table">
    <tr>
        <th>Management Dashboard</th>
        <td>manage-project.yourdomain.com</td>
    </tr>
    <tr>
        <th>Root Tenant Authority</th>
        <td>rta-project.yourdomain.com</td>
    </tr>
    <tr>
        <th>App Tenant(s)</th>
        <td>app1-project.yourdomain.com; <br /> app2-project.yourdomain.com <br />...etc.</td>
    </tr>
</table>

For a dev/test non-production Appliance a common practice is to append “-dev” to the hostname component in the domain name:

<table class="table">
    <tr>
        <th>Management Dashboard (Dev)</th>
        <td>manage-dev-project.yourdomain.com</td>
    </tr>
    <tr>
        <th>Root Tenant Authority (Dev)</th>
        <td>rta-dev-project.yourdomain.com</td>
    </tr>
    <tr>
        <th>App Tenant(s) (Dev)</th>
        <td>app1-dev-project.yourdomain.com; <br /> app2-dev-project.yourdomain.com <br />...etc.</td>
    </tr>
</table>

#### Definitions of Terms Used in the DNS Naming Scheme

* **Root Tenant Authority (RTA)**: highly-privileged tenant used to do the Appliance baseline configuration and for managing the security of other tenants;
* **App**: the name of your application;
* **Project**: the name of the overarching project or department;
* **yourdomain.com**: your organization's domain name.

![](/media/articles/appliance/infrastructure/appliance-dns.png)

### Multi-Tenancy

The Auth0 Appliance is capable of supporting multi-tenancy (that is, each tenant may have one or more associated apps). Auth0 may recommend this deployment model when multiple groups within your company share the Appliance for different projects. If a customer decides to create multiple app tenants, each app tenant must have its own DNS entry.

### DNS Configuration Requirements

#### IP Addresses and DNS Records

In a standard multi-node cluster deployment, the DNS records will point to the IP address of the [load balancer in front of the cluster](/appliance/infrastructure/infrastructure-overview).

For a single-node Appliance instance, the DNS record(s) will point to the IP address of the virtual machine itself (this is often the case for the development/test node).

> Auth0 does not recommend using the same wildcard certificate(s) for Production **and** non-Production (Test/Development) environments **or** mapping the DNS for both environments to the same servers.

#### Hostnames

The hostname (e.g. **manage-project**.yourdomain.com) must be at least three characters long and must **not** contain any underscores(_).

The following are reserved tenant names and **may not** be used for the **app** tenant.

<table>
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
        <td></td>
        <td></td>
    </tr>
</table>

The Management Dashboard, Configuration Tenant, and App Tenant(s) must all be a part of the same parent domain (e.g. yourdomain.com).

Three- or four-part domain names are supported (e.g. manage.project.yourdomain.com).

#### Custom Domains

In the Appliance, you may map any arbitrary domain name to a tenant using the Custom Domains feature. You may also map multiple custom domains to a single tenant.

Suppose these were your standard domains:

<table>
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
</table>

Please note that all tenant names are derived from the base RTA. However, you may set your custom domain to point toward any of your tenants (in the example above, `new-name.not-example.com` maps to `auth.example.com`, and the latter may be used by your clients).
