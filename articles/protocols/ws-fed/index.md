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

You can also use the **samlConfiguration** object (available in [rules](/rules)) to configure claims sent via the <dfn data-key="security-assertion-markup-language"></dfn> token, as well as other lower-level WS-Fed and SAML-P settings.

When redirecting your users to your WS-Fed endpoint, you can use the following (optional) parameters:

* `wa=wsignin1.0`: whether Auth0 should issue a token for the relying party (this is the default action)
* `wa=wsignout1.0`: whether Auth0 should clear the user session/log the user out
* `wreply={callback_URL}`: specifies where the response should be sent
* `wctx={state}`: your application's state
* `whr={connection_name}`: connection to be used (allows users to skip the Auth0 login page)
* `wfresh=0`: whether the user must re-authenticate, even if there's a session in place (`0` requires re-authentication)

Here's a sample of what your URL with the optional parameters might look like:

```text
https://${account.namespace}/wsfed/${account.clientId}?whr=google-oauth2
```

## Identity Providers

If you're using Auth0 with an identity provider that utilizes the WS-Federation protocol (such as Active Directory Federation Services, Azure AppFabric Access Control Service, and IdentityServer), the easiest way to set up your integration is to create and use the **ADFS** connection type. When setting up an ADFS-based connection,  you can import the required parameters by providing Auth0 with the **Federation Metadata** endpoint *or* by importing uploading your Federation Metadata file.

![New Connection Configuration Screen](/media/articles/protocols/create-adfs-connection.png)

Click **Save** to proceed. You will then be presented with the instructions you need to finish configuring the integration.

The Federation Metadata file contains information about the identity provider's certificates. If you provide the Federation Metadata endpoint (typically of the form ending with `/FederationMetadata/2007-06/FederationMetadata.xml`), Auth0 can check daily for changes in the configuration, such as the addition of a new signing certificate that was added in preparation for a rollover.

Because of this, enabling the Federation Metadata endpoint is preferred to providing a standalone metadata file. If you provide a standalone metadata file, we will notify you via email when the certificates are close to their expiration date.

::: note
If the Federation Metadata contains both the primary **and** secondary certificates, you can use both in Auth0.
:::

To roll over certificates using the Federation Metadata endpoint, you must:

1. Generate a new certificate and add as the secondary in your ADFS environment at least two days before the certificate expiry of your current primary certificate.

1. Generate a new certificate, and add it as the **secondary certificate** for your ADFS environment. This should be **done at least two days before** the expiration of your active primary certificate.

1. Allow Auth0 to obtain your new certificate from the Federation Metadata endpoint. Auth0 checks your endpoints once a day, so be sure to allow sufficient time for Auth0 to complete this step. 
	
	Alternatively, you can manually complete this step by logging in to the Auth0 Dashboard, navigating to the appropriate ADFS connection, and click  **Save**. This action results in Auth0 downloading the certificates immediately.

1. Set the now-secondary certificate as the primary certificate **before** the existing primary certificate expires in your ADFS environment.
