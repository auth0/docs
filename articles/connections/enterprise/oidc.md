---
title: Connecting to OpenID Connect Identity Providers
connection: OpenId Connect
seo_alias: oidc
description: Connecting to OpenID Connect Identity Providers
crews: crew-2
beta: true
toc: true
topics:
    - connections
    - enterprise
    - oidc
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect to an OpenID Connect Identity Providers

Auth0 provides an OpenID Connect Connection, that enables you to connect to OIDC compliant Identity Providers. 

The Open ID Identity Provider needs to provide an OpenID Configuration document and support the `id_token` response type. 

To create a new OpenID Connect Connection, you'll need to complete the following fields:

![](/media/articles/connections/enterprise/oidc/oidc-small.png)

* **Connection Name**: The logical identifier for your Connection. It cannot be changed and needs to be unique for the tenant.

* **Issuer URL**: The [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) specification defines an **OpenID Provider Configuration Document** that should be available in the OpenID Connect Identity Provider at the `/.well-known/openid-configuration` endpoint. In this field you can enter the full path to the configuration document, or just the Issuer URL. Auth0 will add the rest of the path and validate if it exists. You'll see a green check mark if Auth0 can find it, a red mark if it cannot, or an error message if it can't find the required information in the configuration file.

* **Client ID**: The Client ID for the client that is defined in the target Identity Provider. It's different for each provider, so please check the provider's documentation.

You need to make sure that the **Callback URL** referenced is added as a valid callback URL in the client application that's referenced with the `client_id` specified above.

Click __Save__.

Next you will see a list of your registered [applications](${manage_url}/#/applications) with the option to enable the new connection for any of them.

That's it! You are now ready to test and start using your connection.

## Additional Customization Options

If you edit the OIDC Connect Connection, you'll see additional configuration options:

![](/media/articles/connections/enterprise/oidc/oidc-details.png)

* **Display Name**: The name that will be used in the Login screen for the New Universal Login Experience to identify the connection. In the Classic Universal Login Experience, the Connection Name will be used

* **Icon URL**: The icon that will be used in the Login screen for the New Universal Login Experience to identify the connection. In the Classic Universal Login Experience, a default icon will be used

* **Domain**: The list of email domains that will be routed to this Identity Provider. This is only applicable when using the Classic Login Experience.

* **Scopes**: The list of OAuth scopes that will be requested when connecting to the Identity Provider. This will affect the data stored in the user profile.

## Federating with Auth0

The OpenID Connect connection is very useful when federating to another Auth0 tenant. Just enter your Auth0 tenant url in the 'Issuer' field (e.g. https://<tenant>.auth0.com), and the client_id for any application in that tenant in the 'Client ID' field.

