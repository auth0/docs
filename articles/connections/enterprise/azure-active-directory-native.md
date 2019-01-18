---
title: Native Azure Active Directory applications with Auth0
connection: Azure Active Directory Native
image: /media/connections/azure.png
alias:
  - azure-ad-native-resource-owner
  - waad-native-resource-owner
  - windows-azure-ad-native-resource-owner
  - windows-azure-active-directory-native-resource-owner
  - microsoft-azure-ad-native-resource-owner
  - microsoft-azure-active-directory-native-resource-owner
seo_alias: azure-active-directory-native
description: How to setup native Azure Active Directory applications with Auth0 for a Resource Owner.
crews: crew-2
topics:
    - connections
    - enterprise
    - azure
    - active-directory
    - microsoft
    - native-apps
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Native Applications to Azure Active Directory

In this article, you'll learn how to connect native applications that use the [Resource Owner Password](/docs/api-auth/grant/password) flow to [Azure Active Directory (Azure AD)](https://docs.microsoft.com/en-us/azure/active-directory/).

The steps below apply to applications implementing the Resource Owner Password flow through the [/oauth/token endpoint](/api/authentication?http#resource-owner-password)as well as the legacy [/oauth/ro endpoint](/api/authentication?http#resource-owner).

## Before you begin

This setup requires two applications configured in Azure AD, a **Web app/API** and a **Native** application. Why two applications? From Azure AD's point of view, users authenticate using the **Native Client Application** to get access to the **Web Application and/or Web API**.



## 1. Configure applications with Web app/API and Native types in Azure AD

To start, you'll need to configure two applications in Azure AD. The first with the type **Web app/API** and second with the **Native** type. For instructions on adding applications to Azure AD, check out the [Register an app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app) Azure AD documentation.

When creating the **Web app/API** application in Azure AD, make a note of the `App ID Uri`. You'll need this value later when configuring the connection in Auth0.

For the **Native** application, configure the following permissions to other applications:

- **Windows Azure Active Directory**: *Read directory data* and *Enable sign-on and read users' profiles*
- Your **Web app/API**: *Access your API*

## 2. Configure the connection in Auth0

After creating both applications in Azure Active Directory, you can configure the Auth0 connection.

Login to your [Auth0 Dashboard](${manage_url}), and select the **Connections > Enterprise** menu option. 

![Add connection](/media/articles/connections/enterprise/azure-active-directory/enterprise-connections.png)

Create a new **Microsoft Azure AD** connection and enter the appropriate settings.

Set the `App ID Uri` to the Uri previously configured for the **Web app/API** in Azure AD. The `Client ID` must be set to the `Client ID` of the **Native** application in Azure AD. In this setup, the `Client Secret` does not matter and can be set to any value.

![Dashboard Config](/media/articles/connections/enterprise/azure-active-directory/create-azure-ad-connection.png)

### H3 TITLE

To let users log in to the same Azure AD from both web applications and native applications that use the Resource Owner Password flow, you'll need to set up two connections in Auth0.

One meant to be used by the traditional flow with UI. This will inherit the client id and secret from the global configuration settings, and should match the values from the "web app" registration in Azure AD
Another connection that overrides the client_id (and has any client_secret), using the values from a "Native" app registration in Azure AD.
Since you are going to have two connections pointing to the same Azure AD domain, the Auth0 dashboard will not let you do this (because the name is automatically assigned to match the name of the domain), so the second connection (the one used for the native app) for Azure will have to be created using the Management API v2 , with a payload like this:

```
{
"name" : "the_connection_name",
"strategy" : "waad",
"options" :

{ "tenant_domain" : "your_azure_ad_domain", "app_id":"the_app_id_of_the_regular_webapp", "client_id": "the_client_id_of_the_native_azure_app", "client_secret": "any_value" }
```


## 4. Test the connection

To test the complete setup, you can use the [Resource Owner endpoint](/api/authentication/reference#resource-owner). Enter the username and password of a user and choose the connection. Click **Try Me!** to sign in as that user.

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-login.png)

## Group Memberships and Advanced Profile Information

In this native flow Auth0 will receive an Access Token from Azure AD which has been issued for your **Web Application and/or Web API**. Because of that features like loading group memberships and advanced profile information will no longer work. This is because the Access Token received by Azure AD can no longer be used to query the Azure AD Graph API for this additional information.

If you depend on group memberships and advanced profile information you can however change your configure. First you will need to configure the **Native** application with additional read permissions for Azure AD:

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-native-permissions.png)

Then in Auth0 instead of specifying the `App ID Uri` of your "Web Application and/or Web API" you will need to use the Azure AD Graph API instead:

```
https://graph.windows.net
```

<%= include('../_quickstart-links.md') %>
