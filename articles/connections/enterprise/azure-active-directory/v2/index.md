---
title: Connect your app to Microsoft Azure Active Directory
connection: Azure Active Directory
image: /media/connections/azure.png
alias:
  - azure-ad
  - waad
  - windows-azure-ad
  - windows-azure-active-directory
  - microsoft-azure-ad
  - microsoft-azure-active-directory
seo_alias: azure-active-directory
description: How to obtain a ClientId and Client Secret for Microsoft Azure Active Directory.
crews: crew-2
toc: true
tags:
    - connections
    - enterprise
    - azure
    - active-directory
    - microsoft
---

# Connect your app to Microsoft Azure Active Directory

There are different scenarios in which you might want to integrate with Microsoft Azure AD:

* You want to let users into your application from an Azure AD you or your organization controls (such as employees in your company).

* You want to let users coming from other companies' Azure ADs into your application. You may want to set up those external directories as different connections.

If you plan on allowing users to log in using a Microsoft Azure Active Directory account, either from your company or from external directories, you must register your application through the Microsoft Azure portal. If you don't have a Microsoft Azure account, you can [signup](https://azure.microsoft.com/en-us/free) for free.

You can access the Azure management portal from your Microsoft service, or visit [https://manage.windowsazure.com](https://manage.windowsazure.com) and sign in to Azure using the global administrator account used to create the Office 365 organization.

::: note
There is no way to create an application that integrates with Microsoft Azure AD without having **your own** Microsoft Azure AD instance.
:::

If you have an Office 365 account, you can use the account's Azure AD instance instead of creating a new one. To find your Office 365 account's Azure AD instance:

1. [Sign in](https://portal.office.com) to Office 365.
2. Navigate to the [Office 365 Admin Center](https://portal.office.com/adminportal/home#/homepage).
3. Open the **Admin centers** menu drawer located in the left menu.
4. Click on **Azure AD**.

This will bring you to the admin center of the Azure AD instance backing your Office 365 account.

## 1. Create a new application

Login to Microsoft Azure and choose **Azure Active Directory** from the sidebar.

![Select Active Directory](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-1.png)

Then under **MANAGE**, select **App registrations**.

![Select App registrations](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-2.png)

Then click on the **+ ADD** button to add a new application.

Enter a name for the application, select **Web app/API** as the **Application Type**, and for **Sign-on URL** enter your application URL.

![Create application form](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-3.png)

## 2. Configure the permissions

Once the application has been created, you will have to configure the permissions. Click on the name of the application to open the **Settings** section.

![Created application list](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-3b.png)

Click **Required permissions**.

![Choose Required Permissions](/media/articles/connections/enterprise/azure-active-directory/azure-ad-3-1.png)

Then click on **Windows Azure Active Directory** to change the access levels.

![Required Permissions](/media/articles/connections/enterprise/azure-active-directory/azure-ad-3-2.png)

The next step is to modify permissions so your app can read the directory. Under **DELEGATED PERMISSIONS** check next to **Sign in and read user profile** and **Read directory data**.

![Check access levels](/media/articles/connections/enterprise/azure-active-directory/azure-ad-3-3.png)

::: note
If you want to enable extended attributes (like *Extended Profile* or *Security Groups*) you will also need to enable the following permissions: **Application Permissions:** *Read directory data*, **Delegated Permissions:** *Access the directory as the signed-in user*.
:::

Click the **SAVE** button at the top to save these changes.

## 3. Allowing access from external organizations (optional)

If you want to allow users from external organizations (such as other Azure directories) to log in, you will need to enable the **Multi-Tenant** flag for this application. In the **Settings** section, click **Properties**. Locate the **Multi-tenanted** toggle at the bottom and select **Yes**. Finally click the **SAVE** button at the top to save these changes.

![Enable Multi-tenanted](/media/articles/connections/enterprise/azure-active-directory/enable-multi-tenanted.png)

## 4. Create the key

Next you will need to create a key which will be used as the **Client Secret** in the Auth0 connection. Click on **Keys** from the **Settings** menu.

![Select Keys](/media/articles/connections/enterprise/azure-active-directory/azure-ad-4-1.png)

Enter a name for the key and choose the desired duration.

::: note
If you choose an expiring key, make sure to record the expiration date in your calendar, as you will need to renew the key (get a new one) before that day in order to ensure users don't experience a service interruption.
:::

![Creating a Key](/media/articles/connections/enterprise/azure-active-directory/azure-ad-4-2.png)

Click on **Save** and the key will be displayed. **Make sure to copy the value of this key before leaving this screen**, otherwise you may need to create a new key. This value is used as the **Client Secret** in the next step.

![Creating a Key](/media/articles/connections/enterprise/azure-active-directory/azure-ad-4-2b.png)

## 5. Configure Reply URLs

 Next you need to ensure that your Auth0 callback URL is listed in allowed reply URLs for the created application. Navigate to **Azure Active Directory** -> **Apps registrations** and select your app. Then click **Settings** -> **Reply URLs** and add:

 `https://${account.namespace}/login/callback`

 ![Add Reply URL](/media/articles/connections/enterprise/azure-active-directory/azure-ad-5-1.png)

 It has the following format `https://<domain>.<region>.auth0.com/login/callback` (`region` is omitted if the Auth0 tenant was created in the US).

 ::: note
 If you are using the [custom domains](/custom-domains) feature, your Reply URL will instead be in the following format: `https://<YOUR CUSTOM DOMAIN>/login/callback`.
 :::

 Without this step the App consent page will return a "Bad request" error. The fine print in the footer of this error page can be used to identify the exact tenant name and missing callback url.

## 6. Create Connections

Login to your [Auth0 Dashboard](${manage_url}), and select the **Connections > Enterprise** menu option. 

![Add connection](/media/articles/connections/enterprise/azure-active-directory/enterprise-connections.png)

Select **Microsoft Azure AD**. You will be asked to provide the appropriate settings, including data about the app registration you just created in Auth0.

![Dashboard Config](/media/articles/connections/enterprise/azure-active-directory/create-azure-ad-connection.png)

For the **Client ID**, this value is stored as the **Application ID** in Azure AD.

![Application ID](/media/articles/connections/enterprise/azure-active-directory/azure-ad-6-2.png)

For the **Client Secret** use the value that was shown for the key when you created it in the previous step.

Set the name of the **Microsoft Azure AD Domain** and under **Domain Aliases** put any email domain that corresponds to the connection.

![Connection settings](/media/articles/connections/enterprise/azure-active-directory/connection-settings.png)

**Multi-tenant applications**: if you are creating multi-tenant applications where you want to dynamically accept users from new directories, you will setup only one connection and enable the **Use Common Endpoint** toggle. By enabling this flag, Auth0 will redirect users to Azure's common login endpoint, and Azure itself will be doing *Home Realm Discovery* based on the domain of the email address.

Then choose the protocol. **Open ID Connect** is the default, and should be selected in the majority of cases. This is independent of the protocol that your application will use to connect to Auth0.

Next complete the **App ID Uri** field if you intend to use [active authentication](/api/authentication#database-ad-ldap-active-), as explained in [Native Azure AD applications with Auth0](/connections/enterprise/azure-active-directory-native).

Click the **SAVE** button. Auth0 will provide you with a URL that you will need to give to the Azure AD administrator. This URL will allow the administrator to *give consent* to the application so that users can log in.

**Congratulations!** You are now ready to accept Microsoft Azure AD users.

## Troubleshooting

* Make sure you are in the desired directory to add you application. If you do not have an existing directory you will need to create one.

* When granting access, make sure to use an *Incognito/InPrivate* window  and a Global Administrator user.

* If you get *Access cannot be granted to this service because the service listing is not properly configured by the publisher*, try enabling **Multi Tenanted** in the Windows Azure AD application under **Settings** -> **Properties**.

## Signing Key Rollover in Azure Active Directory

Signing keys are used by the identity provider to sign the authentication token it issues, and by the consumer application (Auth0 in this case) to validate the authenticity of the generated token.

For security purposes, Azure AD’s signing key [rolls on a periodic basis](https://azure.microsoft.com/en-us/documentation/articles/active-directory-signing-key-rollover/). If this happens, **you do not need to take any action**. Auth0 will use the new key automatically.

<%= include('../../../_quickstart-links.md') %>
