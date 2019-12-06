---
title: PingFederate
description: How to configure PingFederate as an identity provider.
topics:
    - saml
    - identity-providers
    - pingfederate
contentType:
  - how-to
useCase:
  - add-idp
---
# Configure PingFederate as an Identity Provider

In this article, we will cover how you can configure PingFederate for use with Auth0 as a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider.

PingFederate is a federation server that provides identity management, single sign-on, and API security for the enterprise. To configure Auth0 to use PingFederate as an identity provider, you will use primarily the default values and your Auth0 tenant metadata file to upload the required configuration parameter values for your Auth0 tenant. If the metadata upload fails for some reason, these are the most important configuration parameters:

* __EntityID:__ `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME`
* __Assertion Consumer Service URL:__ `https://${account.namespace}/login/callback`
* __Logout URL:__ `https://${account.namespace}/logout`
* __HTTP-Redirect__ binding for <dfn data-key="security-assertion-markup-language">SAML</dfn> Request
* __HTTP-POST__ binding for SAML Response

::: panel IdP-Initiated SSO
If you want to use **IdP-Initiated SSO**, make sure to include the `connection` parameter in the Assertion Consumer Service URL: `https://${account.namespace}/login/callback?connection=YOUR_CONNECTION_NAME`.
:::

1. Download your Auth0 metadata file from `https://YOUR_DOMAIN/saml/metadata?connection=YOUR_CONNECTION_NAME`. Make sure that you use your custom domain if you have one configured. You will upload this file to import your Auth0 tenant information into the PingFederate configuration.

2. Sign on to your PingFederated account and select **Create New** from the **SP Connections** section.

3. Configure the __SP Connection__. 

    - Select the __Browser SSO Profiles__ as the __Connection Type__.
    - Select __Browser SSO__ as the __Connection Options__.

4. Upload the metadata file that you downloaded in step 1. The __Entity ID__, __Connection Name__ and the __Base URL__ will be automatically populated based on the information from the metadata file. 

5. Configure __Browser SSO__. 

    - Select __SP-Initiated SSO__ and __SP-Initiated SLO__ in __SAML Profiles__.
    - Go to the __Assertion Creation__ section and click __Configure Assertion__. Accept all defaults for the next two screens. 

6. Go to the __IdP Adapter Mapping__ section. This is where users will be authenticated. Likely, you already have one configured in your PingFederate installation. Select one, or add a new one.

    ::: note
    Auth0 only requires the __NameIdentifier__ claim. All other  attributes will be passed further to the end application.
    :::

7. Configure __Protocol Settings__. Values for __Protocol Settings__ are imported from the metadata file. Next, you will see the __Assertion Consumer Service URL__ and the Sign-Out URLs. Click __Next__ to the __Allowable SAML Bindings__ section.

8. Leave __POST__ and __Redirect__ enabled. Make sure __SAML Assertion__ is always signed.

9. Configure __Credentials__. On __Digital Signature Settings__, select your signing certificate and make sure you check the option to include it in the `<KeyInfo>` element.

10. Configure the certificate used to sign incoming requests. You can download the Auth0 certificate (use `https://YOUR_TENANT.auth0.com/pem`) and upload it here. 

    ::: note
    Auth0 signs `SAMLRequests` by default; you can change that when you configure the connection. 
    :::

11. Review your settings and set as __Active__ or __Inactive__. 

12. Click __Save__ at the bottom of the screen. You should see the new SP Connection on the __Main__ screen.

## Keep reading

* See the complete PingFederate instructions to [configure PingFederate as an identity provider](https://docs.pivotal.io/p-identity/1-5/pingfederate/config-pingfederate.html). 