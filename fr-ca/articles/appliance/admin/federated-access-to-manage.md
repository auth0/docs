---
description: How to set up federated login to the Manage Dashboard
section: appliance
topics:
    - appliance
    - admin
    - signups
contentType: how-to
useCase: appliance
applianceId: appliance76
sitemap: false
---
# Set Up Federated Login to the Manage Dashboard

If you use an Identity Provider (IdP) to handle your staff logins, you can use the IdP with your root tenant authority (otherwise known as the RTA or your config tenant) to provide federated access to your Dashboard.

By using your IdP, this eliminates the need for you to:

* *For customer-hosted PSaaS Appliance:* Manually create users in the root tenant authority (RTA)
* *For Auth0-hosted PSaaS Appliance:* Open a support case requesting the addition of a Dashboard administrator.

::: note
If you have an Auth0-hosted PSaaS Appliance, but you do not have access to the root tenant, please submit a [Support Ticket](${env.DOMAIN_URL_SUPPORT}) and the Appliance Services staff will help you set this up.
:::

## Setting Up Federated Access

The Auth0 root tenant acts as an identity provider (IdP) for the Manage Dashboard. As such, you will need to add a Service Provider (SP) to your existing IdP to federate access to the Manage Dashboard. 

This process requires the following three steps:

1. Set up the Auth0 Service Provider (SP)
    *For customers with Auth0-hosted PSaaS Appliance: Auth0 will create the Connection for you after you provide the necessary setup information.*
2. Provide your Service Provider metadata to the Identity Provider (IdP)
3. Test the Identity Provider

Please note that how you complete the three steps above differ slightly based on whether you're working with a customer-hosted PSaaS Appliance or an Auth0-hosted PSaaS Appliance.

### Customer-hosted PSaaS Appliance

[Configure Auth0 as the Service Provider (SP)](/protocols/saml/saml-configuration/auth0-as-service-provider) and use both the root tenant authority and the new Service Provider Connection to access Auth0.

### Auth0-hosted PSaaS Appliance

[Configure Auth0 as the Service Provider (SP)](/protocols/saml/saml-configuration/auth0-as-service-provider). Follow the tutorial up through the section where you identify the Identity Provider (IdP) and Connection protocol (you will be stopping at the section where you're shown how to Configure Auth0).

Please be sure to configure your mappings between Auth0 (as the SP) and your IdP in the form of Assertions. You can do so in the Dashboard by going to **Connections** > **Enterprise** > **SAMLP Identity Provider**. Find your connection, and click the cog icon to launch the **Settings** tab. Switch to the **Mappings** view, and provide mappings for **name**, the **name format** (optional), and **value**. The specifics will vary based on the IdP you're using, so please contact Auth0 if you have any questions.

At this point, send Auth0 the information you've collected in a [Support Ticket](${env.DOMAIN_URL_SUPPORT}) and request that you be granted federated access to the config tenant/RTA.

In your Support ticket, you should include:

* The **email domain(s)** that will be redirected to your Identity Provider
* The Identity Provider's **single sign-on URL**
* The Identity Provider's **public key** (encoded in PEM or CER format)
* The **sign out URL** (optional)

You can find most of this information in the XML metadata file provided by your Identity Provider. If you'd prefer, you can send Auth0 this file, along with the email domains that you will be redirecting to the IdP.

Once Auth0 receives all of the information we need, we will:

* Create a Connection in your root tenant
* Provide you with the metadata link containing the information you need to provide to your Identity Provider

Once you provide this information (as well as the callback URL and the Entity ID) to your IdP, you will be able to test your federated Login to the Dashboard.