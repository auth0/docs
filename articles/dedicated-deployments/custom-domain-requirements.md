# Custom Domains

::: warning
PSaaS environments deployed with release 1906 or later share the Custom Domains implementation with Auth0 Public Cloud. Refer to the Custom Domains documentation for guidance on how to setup a Custom Domain
:::

If you are using PSaaS Appliance Build 5XXX or later, you may configure Custom Domains using the Management Dashboard.

Custom Domains allow you to expose one arbitrary DNS name for a tenant. Conventionally, the PSaaS Appliance uses a three-part domain name for access, and it is the first portion of the domain name that varies depending on the tenant.

The root tenant authority (RTA) is a special domain that is configured when the PSaaS Appliance cluster(s) are first set up. It is a privileged tenant from which certain manage operations for the cluster are available. The RTA is sometimes called the configuration domain, and all users that have access to the Management Dashboard belong to an application in the RTA.

::: note All tenant domain names derive from the root tenant authority, and any changes to this will result in the deletion of all tenants. :::

## Custom Domains Features

The follow is a list of Custom Domain features that differ in behavior from their implementation in the Auth0 Public Cloud or have yet to be released to PSaaS Appliance implementations.

| Feature | Currently Supported in the PSaaS Appliance? |
| - | - |
| Use of Custom Domain in emails | No |
| Custom Domain protection via API keys | No |
| Custom Domain registration | Yes; accessible via PSaaS Appliance Dashboard |
| Token issuer used as Custom Domain | No |
| Auth0-managed certificates | No |

!!! warning
Starting wth PSaaS Appliance release 1906 old customers can migrate their existing Custom Domain to have all the features available in Auth0 Public Cloud
!!!

## Use Example

Suppose that your RTA is `config.example.com`. From this point on, all of your new tenants' domain names must derive from the base name, `example.com`:

```text
site1.example.com
site2.example.com
```

However, you might want to expose other domain names to your end users, such as:

* `auth.site2.com`
* `auth.site1.com`
* `auth.site1.example.com`

You may do so by utilizing the PSaaS Appliance's Custom Domains feature, which sets the domain used for authentication endpoints.

## Certificates Required for Custom Domains

In the PSaaS Appliance, you may map any arbitrary domain name to a tenant using the Custom Domains feature. Custom Domains map one external DNS to a tenant that follows the standard naming convention.

Suppose these were your standard domains:

<table class="table">
  <tbody>
    <tr>
        <td>Sample Tenant</td>
        <td>Custom Domain for the Sample Tenant</td>
    </tr>
    <tr>
        <td>auth.example.com</td>
        <td>new-name.not-example.com</td>
    </tr>
  </tbody>
</table>

You’ll need an additional DNS zone and certificate for each environment. If you have a Dev/Test environment and a Prod environment, you’ll need a two total of three certificates per environment.

### Definitions of Terms Used in the DNS Naming Scheme

::: note
This functionality is available in appliance release [1906](https://auth0.com/releases/1906). If you are running an older version reach to you contact to update your environment.
:::

* **auth**: the name of your tenant.
* **example.com**: your organization's domain name.
* **cname.example.com**: This is the Cname hostname. This is a DNS hostname that will be used to verify custom domains when using Auth0 managed certificates.
* **edge.example.com**: The edge domain is a DNS zone used to create the endpoints that will be used to give access to custom domain request. This can be a sub zone of the main domain name or a completely different one.

### DNS Configuration requirements

In a standard multi-node cluster deployment

- The Cname hostname ( _cname.example.com_ ) will point to the IP address of the [load balancer in front of the cluster](/appliance/infrastructure/infrastructure-overview).
- The complete edge domain ( _*.edge.example.com_ ) should be a CNAME DNS record with the target set to Cname hostname ( _cname.example.com_ )

For a single-node PSaaS Appliance instance, the DNS record(s) will point to the IP address of the virtual machine itself (this is often the case for the development/test node).

### Edge domain names

The SSL Certificate for the edge domain used in Custom Domains:

* must be created by a public certificate authority. They cannot be self-signed;
* must be a wildcard because the hostnames will be created dynamically during the creation of new custom domains.

#### Auth0 managed certificates

During the creation of a Custom Domain with Auth0 managed certificates Auth0 will create use a unique hostname in the edge domain, for example: _cd_123456789.edge.example.com_. This hostname will be used to:

- Verify the custom domain ownership by being the target of the CNAME DNS record you create for your custom domain ( _new-name.not-example.com_ ).
- Serve as the permanent link between your custom domain and the Auth0 infrastructure.

::: note
THe DNS verification peformed by Auth0 checks that the custom domain is a CNAME record that targets an edge domain host, and that the edge domaint host is a CNAME record that targest the Cname hostname.
:::

#### Self-managed certificates

During the creation of a Custom Domain with certificatesi managed by you Auth0 will create use a unique hostname in the edge domain, for example: _cd_987654321.edge.example.com_. This hostname will be used to:

- Serve the Auth0 content to your reverse proxy, as long as the right API key is provided.

## Add a Custom Domain

Beginning with PSaaS release [1906](https://auth0.com/releases/1906), tenant administrators can add a Custom Domain using the PSaaS configuration area. 

To do so:

1. Go to **Tenants** in the PSaaS configuration area. 
2. Click ****Add Domain. You will be prompted for the following information:

| Parameter | Description |
| - | - |
| Domain | The Custom Domain for your tenant |
| SSL Available | The SSL certificate format (either *PFX/PKCS12* or *Standard PEM*) |
| SSL PFX Cert | If using a PFX/PKCS12 certificate, the password associated with your PFX/PKCS12 certificate|
| PFX Certificate | If using a PFX/PKCS12 certificate, clicking this button enables you to upload your PFX Certificate |
| Upload Public Key... | If using a Standard PEM certificate, clicking this button enables you to upload the file containing your public key |
| Upload Private Key... | If using a Standard PEM certificate, clicking this button enables you to upload the file containing your private key |

::: note
The private key cannot be password protected
:::

When done, click **Add** to save your changes and add the Custom Domain. A green banner will appear at the top of your screen that says:

`Updating configuration... check Activity section for progress.`

Once the change has been implemented and you have refreshed the Custom Domains page, you will see the following overview information about your newly-created domain:

| Parameter | Description |
| - | - |
| Domain | The Custom Domain URL |
| SSL Available | Indicator of successful application of the SSL certificate |
| Certificate Subject | The subject of the certificate, or the target of the certificate (such as what is being secured) |
| Certificate Expiration | The date and time when the certificate expires |

## Configuring Custom Domains

You may configure Custom Domains for your tenants via the [Custom Domains set-up area](/appliance/dashboard/tenants#custom-domains) of the [tenants page in the PSaaS Appliance configuration area](/appliance/dashboard/tenants).

## Remove Custom Domain

You can remove a custom domain used for your PSaaS deployment at any time by clicking **X** located to the right of your domain information in the tenant configuraiton area.

## Custom Domains for PSaaS Appliance's Hosted in Auth0’s Private Cloud

If your PSaaS deployment is hosted in Auth0’s private cloud, your domains will end in *auth0.com*. If you want to use a Custom Domain with your customer-facing applications, see [Information Requirements for Setting Up the PSaaS Appliance in Auth0's Private Cloud](/appliance/private-cloud-requirements).

## External Connectivity

You must allow your PSaaS deployment infrastructure to connect to the following IP addresses when using Custom Domains.

  <table class="table">
  <thead>
    <tr>
    <td>All</td>
    <td>Inbound</td>
    <td>Your load balancer IP address (often on internal network)</td>
    <td>80/(443 or 4443)/1443</td>
    <td>For clusters with more than one node, a load balancer is required for resiliency and performance</td>
    <td>Yes</td>
  </tr>
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
    <td>Custom Domains</td>
    <td>Outbound</td>
    <td>acme-v02.api.letsencrypt.org</td>
    <td>443</td>
    <td>Required to request managed certificates from Let's Encrypt</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Custom Domains</td>
    <td>Outbound</td>
    <td>acme-v01.api.letsencrypt.org</td>
    <td>443</td>
    <td>Required to request managed certificates from Let's Encrypt</td>
    <td>Yes</td>
  </tr>
  </tbody>
</table>