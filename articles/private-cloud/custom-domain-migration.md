# Custom Domain Migration

Beginning with Private Cloud release 1906, dedicated deployments will include the ability to fully utilize the [Auth0 Custom Domains](/custom-domains) feature.

Existing Private Cloud customers using Custom Domains must complete a migration of their Private Cloud Custom Domains to the Auth0 Custom Domains features. New customers/deployments will automatically use the Auth0 Custom Domains features.

::: note
The Auth0 Custom Domains feature will be available in release 1905 for those who wish to opt-in early.
:::

## Background

Auth0 added support for custom domains in the Private Cloud platform in January 2016. This implementation allowed Private Cloud administrators to create one or more custom domains per tenant and invoke the Authentication API endpoints using those domains.

In March 2018, Auth0 added support for custom domains for those deploying on the Public Cloud. However, the feature included additional capabilities not included on the Private Cloud implementation. The following table summarizes the differences.

| Feature | New Custom Domains | Legacy Custom Domains |
| - | - | - |
| Use of custom domain in emails | Yes | No |
| Custom domain protection via API keys | Yes | No |
| Custom domain registration | Yes | Yes |
| Token issuer used as custom domain | Yes | No |
| Auth0-managed certificates | Yes | No |
| Use of multiple domains | No | Yes |

## Requirements

* A new DNS domain dedicated to the Custom Domain's origin server hostname. This could be a subdomain of your existing Auth0 Domain (i.e., if your domain name is `*.auth.mydomain.com`, the new subdomain would be `*.cd.auth.mydomain.com`).
* A wildcard public SSL certificate for the new DNS domain.
* A layer 4 network load balancer. This could be the existing one used by your Private Cloud deployment. Please note that if you are using a layer 7 load balancer, you **must** add a layer 4 load balancer.
* A DNS record pointing to the layer 4 load balancer.

## Migration

Current Private Cloud customers using the existing Private Cloud Custom Domains functionality **must migrate to the Auth0 Custom Domains** feature to fully benefit from the features available.

## Migration process

The Custom Domains migration process involves three phases, each of which requires several steps.

### Communication Phase

Before beginning the migration process, Auth0 will reach out to you to explain the migration process and discuss the following:

* The certificate management model you would like to use

  Auth0 offers [two certificate management models](/custom-domains/#certificate-management). To simplify the migration process, we suggest using one model for all of your tenants (though you can use a different certificate model for each tenant if necessary).

* The type of load balancer you're using (i.e. network (layer 4) or application (layer 7))

  If your dedicated deployment is AWS-hosted, we will need to confirm the type of load balanced you're using. If you are using an application load balancer, you will need to provision an additional network load balancer.

* Allocating new DNS resources to meet stated requirements (if necessary)

  You will need to have ready the **edge domain name** and accompanying **SSL certificate**, the **CNAME host name**, and the **email address** to be used as the Let's Encrypt contact.

### Infrastructure preparation phase

::: note
If your Private Cloud deployment resides in an Auth0-hosted environment, Auth0 will prepare your environment for migration on your behalf.
:::

During this stage, you will need to:

1. Set up the network load balancer
2. Set up your new DNS records
3. Validate and verify that your set up is correct

### Migration phase

The goal of the migration phase is to create custom domains that have all the new functionality and to update all dependencies to function correctly with your newly-created domain names.

The first step is to create new domains using the Auth0 [Custom Domains](/custom-domains) feature.

Once done, you may have [additional configuration steps](/custom-domains/additional-configuration#configure-social-identity-providers), depending on the Auth0 features you use.

#### Final configuration

One you have completed all of the required modifications on your applications, a Managed Services Engineer will assist you in completing the migration process.
