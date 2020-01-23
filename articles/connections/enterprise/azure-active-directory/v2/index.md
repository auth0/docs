---
title: Connect Your App to Microsoft Azure Active Directory
connection: Azure Active Directory
image: /media/connections/azure.png
public: true
alias:
  - azure-ad
  - waad
  - windows-azure-ad
  - windows-azure-active-directory
  - microsoft-azure-ad
  - microsoft-azure-active-directory
seo_alias: azure-active-directory
description: Learn how to connect your app to Microsoft Azure Active Directory using an enterprise connection.
crews: crew-2
toc: true
topics:
    - connections
    - enterprise
    - azure
    - active-directory
    - microsoft
contentType: 
    - how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Your App to Microsoft Azure Active Directory

You may want to integrate with Microsoft Azure Active Directory (AD) if:

* you want to let users (such as employees in your company) into your application from an Azure AD controlled by you or your organization.
* you want to let users coming from other companies' Azure ADs into your application. (You may want to set up those external directories as different connections.)

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application to Microsoft Azure AD, you must:

1. [Set up your app in the Microsoft Azure portal](#set-up-your-app-in-the-microsoft-azure-portal).
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

::: panel Microsoft Azure Account
Before proceeding, you will need a valid Microsoft Azure account and must have **your own** Microsoft Azure AD directory for which you are a Global administrator. 

If you don't have a Microsoft Azure account, you can [sign up](https://azure.microsoft.com/en-us/free) for free; then, if necessary, set up an Azure AD directory by following Microsoft's [Quickstart: Create a new tenant in Azure Active Directory - Create a new tenant for your organization](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant#create-a-new-tenant-for-your-organization).

Alternatively, if you have an Office 365 account, you can use the account's Azure AD instance instead of creating a new one. To access your Office 365 account's Azure AD instance:

1. [Sign in to Office 365](https://portal.office.com), and navigate to the [Office 365 Admin Center](https://portal.office.com/adminportal/home#/homepage).
2. Open the **Admin centers** menu drawer located in the left menu, and click on **Azure AD**.
:::

## Set up your app in the Microsoft Azure portal

To allow users to log in using a Microsoft Azure Active Directory account, you must register your application in the Microsoft Azure portal.

::: warning
Before proceeding, you must have already set up **your own** Microsoft Azure AD directory for which you are a Global administrator. To learn how, follow Microsoft's [Quickstart: Create a new tenant in Azure Active Directory - Create a new tenant for your organization](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant#create-a-new-tenant-for-your-organization).
:::

### Register a new application

To learn how to register your application with Azure AD, follow Microsoft's [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) doc. 

::: warning
If you have more than one Azure AD directory, make sure you are in the correct directory when you register your app.
:::

While setting up your app, make sure you use the following settings:

* If you want to allow users from external organizations (like other Azure AD directories), then when asked to choose **Supported account types**, choose the appropriate multitenant option. Multitenant options include the following: **Accounts in any organizational directory (Any Azure AD directory - Multitenant)**.
* When asked to set a **Redirect URI**, enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`.

<%= include('../../../_find-auth0-domain-redirects.md') %>

During this process, Microsoft will generate an **Application (client) ID** for your application; you can find this on the app's **Overview** screen. Make note of this value.

### Create a client secret

To learn how to create a client secret, follow Microsoft's [Quickstart: Configure a client application to access web APIs - Add Credentials to your web application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application). You want to generate a **Client secret**. Once generated, make note of this value.

::: note
If you configure an expiring secret, make sure to record the expiration date; you will need to renew the key before that day to avoid a service interruption.
:::

### Add permissions

To learn how to add permissions, follow Microsoft's [Quickstart: Configure a client application to access web APIs - Add permissions to access web APIs](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-web-apis). You want to configure permissions for the **Microsoft Graph API**.

While setting up your permissions, make sure you use the following settings:

* When asked for a permission type, choose **Delegated permissions**. Under **User**, select **User.Read** so your app can sign in users and read the signed-in user's profile. Under **Directory**, select **Directory.Read.All** so your app can read directory data on the signed-in user's behalf.

::: note
If you want to enable extended attributes (like *Extended Profile* or *Security Groups*), then you also must enable the following: 

* **Delegated permissions**: Under **Directory**, select **Directory.AccessAsUser.All** so your app can access the directory as the signed-in user.
* **Application Permissions**: Under **Directory**, select **Directory.Read.All** so your app can read directory data.
:::

## Create an enterprise connection in Auth0

Next, you will need to create and configure a Microsoft Azure AD Enterprise Connection in Auth0. Make sure you have the **Application (client) ID** and the **Client secret** generated when you set up your app in the Microsoft Azure portal.

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) page in the [Auth0 Dashboard](${manage_url}/), and click the `+` next to **Microsoft Azure AD**.

![Create Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Enter general information for your connection:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Display name** (optional) | Text used to customize the login button for Universal Login. When set, the Universal Login login button reads: "Continue with {Display name}". |
| **Logo URL** (optional) | URL of image used to customize the login button for Universal Login. When set, the Universal Login login button displays the image as a 20px by 20px square. |
| **Microsoft Azure AD Domain** | Your Azure AD domain name. You can find this on your Azure AD directory's overview page in the Microsoft Azure portal. |
| **Domain aliases (optional)** | Comma-separated list of domains registered as an alias of the primary one. These may include any email domains that correspond to the connection. |

![Configure General Microsoft Azure AD Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-ms-azure-ad-settings-1.png)

3. Enter credentials, select attributes, and configure advanced settings for your connection, then click **Create**:

| Field | Description |
| ----- | ----------- |
| **Client ID** | Unique identifier for your registered Azure AD application. Enter the saved value of the **Application (client) ID** for the app you just registered in Azure AD. |
| **Client Secret** | String used to gain access to your registered Azure AD application. Enter the saved value of the **Client secret** for the app you just registered in Azure AD. |
| **Use common endpoint** (optional) | When enabled, your application will dynamically accept users from new directories. Typically enabled if you selected a multitenant option for **Supported account types** for the application you just registered in Azure AD. When enabled, Auth0 will redirect users to Azure's common login endpoint, and Azure will perform *Home Realm Discovery* based on the domain of the user's email address. |
| **Identity API** | API used by Auth0 to interact with Azure AD endpoints. Learn about the differences in behavior in Microsoft's [Why update to Microsoft identity platform (v2.0)](https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison) doc. |
| **Attributes** | Basic attributes for the signed-in user that your app can access. Indicates how much information you want stored in the Auth0 User Profile. |
| **Extended Attributes** (optional) | Extended attributes for the signed-in user that your app can access. |
| **Auth0 APIs** (optional) | When selected, indicates that you require the ability to make calls to the Azure AD API. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Configure Advanced Microsoft Azure AD Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-ms-azure-ad-settings-2.png)

4. If you have appropriate Azure AD administrative permissions to *give consent* to the application so users can log in, then click **Continue**; you will be asked to [log in to your Azure AD account](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#requesting-consent-for-an-entire-tenant) and give consent. Otherwise, provide the given URL to your administrator so that they can give consent.

## Enable the enterprise connection for your Auth0 application

To use your new Azure AD enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

## Troubleshooting

**I registered my application with Azure AD, but when I go back to my Azure Active Directory App registrations, I can't see my application.**

You may have accidentally registered your app in the wrong Azure AD directory (or not have created an Azure AD directory at all before registering your app). It's likely easiest to re-register your app in Azure AD. Make sure you are in the correct directory when you register the app. If you need to create an Azure AD directory, follow Microsoft's [Quickstart: Create a new tenant in Azure Active Directory - Create a new tenant for your organization](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant#create-a-new-tenant-for-your-organization).

**I receive the following error message: "Access cannot be granted to this service because the service listing is not properly configured by the publisher".**

To resolve this, try changing the **Supported account types** for your registered Azure AD app. Make sure you have chosen an appropriate multitenant option in the Azure AD app's Authentication settings. Multitenant options include the following: **Accounts in any organizational directory (Any Azure AD directory - Multitenant)**.

**When users try to log in, we receive the following error message: "invalid_request; failed to obtain access token".**

The most likely reason for this error is an invalid or expired Azure AD **Client secret**. To resolve this, generate a new **Client secret** for your app in Azure AD, then update the **Client Secret** in the enterprise connection configured with Auth0.

## Signing Key Rollover in Azure AD

Signing keys are used by the identity provider to sign the authentication token it issues, and by the consumer application (Auth0 in this case) to validate the authenticity of the generated token.

For security purposes, Azure AD’s signing key [rolls on a periodic basis](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-signing-key-rollover). If this happens, **you do not need to take any action**. Auth0 will use the new key automatically.

<%= include('../../../_quickstart-links.md') %>
