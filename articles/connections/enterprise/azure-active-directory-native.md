---
title: Native Azure Active Directory applications with Auth0
connection: Azure Active Directory
image: /media/connections/azure.png
alias:
  - azure-ad-native-resource-owner
  - waad-native-resource-owner
  - windows-azure-ad-native-resource-owner
  - windows-azure-active-directory-native-resource-owner
  - microsoft-azure-ad-native-resource-owner
  - microsoft-azure-active-directory-native-resource-owner
---

# Native Azure Active Directory applications with Auth0 (Resource Owner flow)

In addition to the WS-Federation and OpenID Connect flows it's also possible to use the Resource Owner flow with Azure AD. This flow allows you to capture the user's credentials (email and password) and validate them instead of showing the Azure AD login page. While this is not the recommended approach (for security and SSO reasons) it could be used from some Native mobile scenarios or when batch processes want to authenticate with Azure AD.

The setup will include 2 applications in this case, the "Web Application and/or Web API" and the "Native Client Application". From Azure AD's point of view, users will authenticate using the "Native Client Application" in order to get access to the "Web Application and/or Web API".

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-native-app.png)

## 1. Define a "Web Application and/or Web API" in Azure Active Directory

As a first step you'll need to define the "Web Application and/or Web API":

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-new-api.png)

During the creation you'll also need to specify the `App ID Uri` which you'll need later on to configure the connection in Auth0:

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-new-api-properties.png)

## 2. Define a "Native Client Application" in Azure Active Directory

After having created the first application you'll need to define a "Native Client Application":

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-new-native-app.png)

In this application you'll need to configure the following permissions to other applications:

 - Windows Azure Active Directory: `Read directory data` and `Enable sign-on and read users' profiles`
 - Your "Web Application and/or Web API": `Access the application`
 
![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-native-app-permissions.png)

## 3. Configure the connection in Auth0

After creating both applications in Azure Active Directory the Auth0 connection can be configured. The important part to note here is that the `App ID Uri` must be set to the Uri which has been configured in the "Web Application and/or Web API". The Client ID needs to be set to the Client ID of the "Native Client Application". In this case the Client Secret does not matter so you can set it to any value, like the Client Secret.
 
![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-create-native-connection.png)

## Testing the connection

To test if the complete setup works you can use the [Resource Owner endpoint](https://auth0.com/docs/auth-api#!#post--oauth-ro). Enter the username and password of the user and choose the right connection. Click the **Try Me!** button to sign in with that user:

![](/media/articles/connections/enterprise/azure-active-directory/azure-active-directory-login.png)