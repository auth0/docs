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
---

# Native Azure Active Directory applications with Auth0 (Resource Owner flow)

In addition to the **WS-Federation** and **OpenID Connect** flows, it's also possible to use the **Resource Owner** flow with Azure AD. This flow allows you to capture and validate a user's credentials (email and password) instead of showing the Azure AD login page. While this is not the recommended approach for security and SSO reasons, **Resource Owner** flow could be used in Native mobile scenarios or to batch process authentication with Azure AD.

This setup will require two applications, a *Web Application and/or Web API* and a *Native Client Application*. From Azure AD's point of view, users will be authenticated using the *Native Client Application* to gain access to the *Web Application and/or Web API*.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-native-app.png)

## 1. Define a *Web Application and/or Web API* in Azure Active Directory

The first step is to define the "Web Application and/or Web API".

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-new-api.png)

During setup, you'll need to specify the `App ID Uri` which will be needed later to configure the connection in Auth0.

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-new-api-properties.png)

## 2. Define a *Native Client Application* in Azure Active Directory

After creating the first application, you'll need to define a *Native Client Application*.

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-new-native-app.png)

In this application, you'll need to configure the following permissions to other applications:

 - **Windows Azure Active Directory**: *Read directory data* and *Enable sign-on and read users' profiles*
 - Your **Web Application and/or Web API**: *Access your API*

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-native-app-permissions.png)

## 3. Configure the connection in Auth0

After creating both applications in Azure Active Directory, the Auth0 connection can be configured. The `App ID Uri` must be set to the Uri which was configured previously in the *Web Application and/or Web API* and the `Client ID` must be set to the `Client ID` of the *Native Client Application*. In this setup, the `Client Secret` does not matter and can be set to any value.

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-create-native-connection.png)

## 4. Test the connection

To test the complete setup, you can use the [Resource Owner endpoint](/auth-api#!#post--oauth-ro). Enter the username and password of a user and choose the connection. Click **Try Me!** to sign in as that user.

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-login.png)

## Group Memberships and Advanced Profile Information

In this native flow Auth0 will receive an access token from Azure AD which has been issued for your **Web Application and/or Web API**. Because of that features like loading group memberships and advanced profile information will no longer work. This is because the access token received by Azure AD can no longer be used to query the Azure AD Graph API for this additional information.

If you depend on group memberships and advanced profile information you can however change your configure. First you will need to configure the **Native** application with additional read permissions for Azure AD:

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-native-permissions.png)

Then in Auth0 instead of specifying the `App ID Uri` of your "Web Application and/or Web API" you will need to use the Azure AD Graph API instead:

```
https://graph.windows.net
```
