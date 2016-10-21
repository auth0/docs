---
title: Connect Azure Active Directory with Auth0
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
---

# Obtain a *ClientId* and *Client Secret* for Microsoft Azure Active Directory

::: panel-info Notice
This page uses the current portal of the Azure Active Directory, for information on using the classic portal, [click here.](/connections/enterprise/azure-active-directory-classic)
:::

To allow users to login using a Microsoft Azure Active Directory account, you must register your application through the Microsoft Azure portal. If you don't have a Microsoft Azure account, you can [signup](https://azure.microsoft.com/en-us/free) for free. You can access the Azure management portal from your Microsoft service, or visit [https://manage.windowsazure.com](https://manage.windowsazure.com) and sign in to Azure using the global administrator account that was used to create the Office 365 organization.

**NOTE:** There is no way to create an application that integrates with Microsoft Azure AD without having **your own** Microsoft Azure AD instance.

## 1. Create a new Microsoft Azure Active Directory instance

Login to Microsoft Azure and click on **Active Directory** on the Dashboard.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-1.png)

Then go to **DIRECTORY** -> **CUSTOM CREATE**

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-2.png)

Enter a *domain*, e.g.: **${account.tenant}**. This can be any text. (It does not have to match the Auth0 subdomain and it will be used in the next step.) Also enter your country and a friendly name for your organization.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-1-3.png)

## 2. Create a new application

Click on **App registrations** under **MANAGE**, then click the **Add** button.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-2-1.png)
![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-2-2.png)

Enter a friendly name for the application, select **WEB APPLICATION AND/OR WEB API**, and for Sign-ON URL enter your application URL (completely arbitrary).

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-2-3.png)

## 3. Configuring the permissions

Once the application has been created, you will have to configure the permissions. Click on the name of the application to open the **Settings** section, then click **Required permissions**.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-3-1.png)

Then click on **Windows Azure Active Directory** to change the access levels.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-3-2.png)

The next step is to modify permissions so your app can read the directory. Under **DELEGATED PERMISSIONS** check next to **Sign in and read user profile** and **Read directory data**.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-3-3.png)

**NOTE:** If you want to enable extended attributes (like *Extended Profile* or *Security Groups*) you will also need to enable the following permissions: **Application Permissions:** *Read directory data*, **Delegated Permissions:** *Access the directory as the signed-in user*.

Click the **SAVE** button at the top to save these changes.

### 4. Creating the key

Next you will need to create a key which will be used as the **Client Secret** in the Auth0 connection. Click on **Keys** from the **Settings** menu.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-4-1.png)

Enter a name for the key and for the duration of the key select 1 or 2 years.

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-4-2.png)

Click on **Save** and the key will be displayed. Make sure to copy the value of this key before leaving this screen, this is your **Client Secret** used in the next step.

## 5. Copy the Client ID and Client Secret to Auth0

Login to your [Auth0 Dashboard](${manage_url}), and select the **Connections > Enterprise** menu option. Select **Windows Azure AD**.

For the **Client ID**, this value is stored as the **Application ID** in Azure AD. 

![](/media/articles/connections/enterprise/azure-active-directory/azure-ad-5-1.png)

For the **Client Secret** use the value that was shown for the key when you created it in the previous step.

**Congratulations!** You are now ready to accept Microsoft Azure AD users.

## Troubleshooting

* When granting access, make sure to use an *Incognito/InPrivate* window  and a Global Administrator user.

* If you get *Access cannot be granted to this service because the service listing is not properly configured by the publisher*, try enabling **Multi Tenanted** in the Windows Azure AD application under **Settings** -> **Properties**.

## Signing Key Rollover in Azure Active Directory

Signing keys are used by the identity provider to sign the authentication token it issues, and by the consumer application (Auth0 in this case) to validate the authenticity of the generated token.

For security purposes, Azure AD’s signing key [rolls on a periodic basis](https://azure.microsoft.com/en-us/documentation/articles/active-directory-signing-key-rollover/). If this happens, **you do not need to take any action**. Auth0 will use the new key automatically.


