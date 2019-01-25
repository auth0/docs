---
description: The WS-Federation protocol and how it is used in Auth0.
topics:
  - saml
  - ws-federation
contentType:
  - how-to
useCase:
  - add-idp
---
# WS-Federation

WS-Federation (which is short for Web Services Federation) is a protocol that can be used to negotiate the issuance of a token. You can use this protocol for your applications (such as a Windows Identity Foundation-based app) and for identity providers (such as Active Directory Federation Services or Azure AppFabric Access Control Service).

## For Applications (Clients)

By registering your application as an [application](/applications) in Auth0, it will automatically be assigned a WS-Fed endpoint of the form:

```text
https://${account.namespace}/wsfed/${account.clientId}
```

You can find all available options for configuring WS-Federation under the [advanced settings](${manage_url}/#/applications/${account.clientId}/settings) area for your application.

![WS-Fed Endpoints](/media/articles/protocols/ws-fed-endpoints.png)

You will need to configure the **Relying Party**, which can be done using the following metadata endpoint:

```text
https://${account.namespace}/wsfed/FederationMetadata/2007-06/FederationMetadata.xml
```

You can also use the **samlConfiguration** object (available in [rules](/rules)) to configure claims sent via the SAML token, as well as other lower-level WS-Fed and SAML-P settings.

When redirecting your users to your WS-Fed endpoint, you can use the following (optional) parameters:

* **wreply**: Callback URL
* **wctx**: Your application's state
* **whr**: The name of the connection (to skip the login page)

Here's a sample of what your URL with the optional parameters might look like:

```text
https://${account.namespace}/wsfed/${account.clientId}?whr=google-oauth2
```

## Identity Providers

If you're using Auth0 with an identity provider that utilizes the WD-Federation protocol (such as Active Directory Federation Services, Azure AppFabric Access Control Service, and IdentityServer), the easiest way to set up your integration is to create and use the **ADFS** connection type. When setting up an ADFS-based connection,  you can import the required parameters by providing Auth0 with the **Federation Metadata** endpoint *or* by importing uploading your Federation Metadata file.

![New Connection Configuration Screen](/media/articles/protocols/create-adfs-connection.png)

Click **Save** to proceed. You will then be presented with the instructions you need to finish configuring the integration.

The Federation Metadata file contains information about the identity provider's certificates. If you provide the Federation Metadata endpoint (typically of the form ending with `/FederationMetadata/2007-06/FederationMetadata.xml`), Auth0 can check daily for changes in the configuration, such as the addition of a new signing certificate that was added in preparation for a rollover.

Because of this, enabling the Federation Metadata endpoint is preferred to providing a standalone metadata file. If you provide a standalone metadata file, we will notify you via email when the certificates are close to their expiration date.

::: note
If the Federation Metadata contains both the primary **and** secondary certificates, you can use both in Auth0.
:::

For the certificate rollover with the federation metadata endpoint you may follow the steps outlined below:

1. Generate a new certificate and add as the secondary in your ADFS environment at least two days prior to the certificate expiry of your active primary certificate.
1. Allow Auth0 to grab the new certificate from the metadata endpoint. Auth0 checks the metadata endpoints once per day, so make sure that you allow enough time for this step to be completed. Alternatively, you could navigate to the relevant ADFS connection on the management dashboard and click on the **SAVE** button. This will download the certificates from the configured metadata endpoint immediately.
1. Set the secondary certificate as the primary before the old certificate expires in your ADFS environment.
