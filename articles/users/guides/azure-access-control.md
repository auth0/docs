---
title: Migrate from Azure Access Control Service to Auth0
description: How to migrate from Azure Access Control Service to Auth0.
toc: true
topics:
  - users
  - user-management
  - migrations
  - azure
contentType:
  - concept
  - how-to
useCase:
  - manage-users
  - migrate
---

# Migrate from Azure Access Control Service to Auth0

::: note
Azure Access Control Service will be [retired in November 2018](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-acs-migration).
:::

In this article, you'll learn how to migrate from Azure Access Control (ACS) to Auth0, and connect to a [WS-Federation](/protocols/ws-fed) identity provider such as Azure Active Directory, Active Directory Federation Services, or IdentityServer.

## Before you start

* WS-Federation identity provider connections in Auth0 return tokens in <dfn data-key="security-assertion-markup-language">SAML2</dfn> format. If your ACS configuration uses WS-Federation protocol with JWT tokens, you'll need to update your applications when migrating to Auth0.
* Auth0 offers both [cloud and on-premises deployments](/getting-started/deployment-models).
* Review the [Getting Started](/getting-started) documentation for an overview of Auth0.

## Set up your account

Start by [signing up for Auth0](https://auth0.com/signup). After creating your account, you'll be prompted to create a new [tenant](/getting-started/the-basics#account-and-tenants). Tenants in Auth0 are like namespaces in ACS: `${account.namespace}`.

## Create an application

In order for an application to use Auth0 it must be registered as a [application](/applications). Create a new application on the [Dashboard](https://manage.auth0.com/#/applications).

![Create Application window](/media/articles/applications/create-client-popup.png)

## Add Auth0 to your identity provider

Next add Auth0 as a relying party to your identity provider using the following information:

* Realm Identifier: `urn:auth0:${account.tenant}`
* Return URL: `https://${account.namespace}/login/callback`

## Create a WS-Federation connection

To create a connection between Auth0 and your identity provider, navigate to [Dashboard > Connections > Enterprise](${manage_url}/#/connections/enterprise). For WS-Federation identity providers, create a new **ADFS** connection and provide the following information:

* __Connection Name__: A descriptive name for the connection.
* __Email Domains__: (Optional) A comma-separated list of valid domains. Only needed if you want to use the [Lock login widget](/libraries/lock).

Next, either enter your WS-Federation server URL in the __ADFS URL__ field or upload a Federation Metadata file. 

If you set a WS-Federation server URL, Auth0 will retrieve the Federation Metadata endpoint and import the required parameters, certificates, and URLs. You must make sure that the URL is publicly accessible and the SSL certificate on your ADFS installation is valid.

![New Connection](/media/articles/connections/enterprise/ws-fed/new.png)

After saving the new connection you'll see a list of your registered [applications](${manage_url}/#/applications). Enable the connection for your application.

## Update your application

Depending on your application and use case, you'll have to update your application to use Auth0 for authentication instead of ACS. There are several ways to integrate Auth0 with your application:

- Configure the [Lock](/libraries#lock) authentication widget.
- Use [Auth0 SDKs](/libraries#auth0-sdks) such as [Auth0.NET](https://github.com/auth0/Auth0.net).
- Connect to the [Authentication API](/api/authentication).

## Next Steps

::: next-steps
* [Add Rules to customize user authentication](/rules/current)
* [Set up the Hosted Login Page](/hosted-pages/login)
* [Manage user access with groups, roles, and permissions](/extensions/authorization-extension)
:::
