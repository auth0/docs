---
title: Connect Your Native App to Microsoft Azure Active Directory Using Resource Owner Flow
connection: Azure Active Directory Native
image: /media/connections/azure.png
public: true
alias:
  - azure-ad-native-resource-owner
  - waad-native-resource-owner
  - windows-azure-ad-native-resource-owner
  - windows-azure-active-directory-native-resource-owner
  - microsoft-azure-ad-native-resource-owner
  - microsoft-azure-active-directory-native-resource-owner
seo_alias: azure-active-directory-native
description: Learn how to connect your app to Microsoft Azure Active Directory using an enterprise connection with the Resource Owner flow.
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
# Connect Your Native App to Microsoft Azure Active Directory Using Resource Owner Flow

In addition to the **WS-Federation** and **OpenID Connect** flows, it's also possible to use the **Resource Owner** flow with Azure AD. This flow allows you to capture and validate a user's credentials (email and password) instead of showing the Azure AD login page. For security and <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> reasons, this is not the recommended approach; still, **Resource Owner** flow can be useful in Native mobile scenarios or to batch-process authentication with Azure AD.

This configuration requires two applications: a *Web Application and/or Web API* and a *Native Client Application*. From Azure AD's point of view, users will be authenticated using the *Native Client Application* to gain access to the *Web Application and/or Web API*.

![Overview Diagram of Azure AD Apps using Resource Owner flow](/media/articles/connections/enterprise/azure-active-directory/azure-ad-native-app.png)

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an **Application Type** of **Native**.
  * Add an **Allowed Callback URL**. Your callback URL format will vary depending on your platform. For details about the format for your platform, see our [Native Quickstarts](/quickstart/native).
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application using Resource Owner flow, you must:

1. [Set up your applications in the Microsoft Azure portal](#set-up-your-applications-in-the-microsoft-azure-portal).
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

## Set up your applications in the Microsoft Azure portal

::: warning
Before proceeding, you must have already set up **your own** Microsoft Azure AD directory for which you are a Global administrator. To learn how, follow Microsoft's [Quickstart: Create a new tenant in Azure Active Directory - Create a new tenant for your organization](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant#create-a-new-tenant-for-your-organization).
:::

### Register a new web application

To learn how to register your application with Azure AD, follow Microsoft's [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) doc. 

::: warning
If you have more than one Azure AD directory, make sure you are in the correct directory when you register your app.
:::

While setting up your app, make sure you use the following settings:

* If you want to allow users from external organizations (like other Azure AD directories), then when asked to choose **Supported account types**, choose the appropriate multitenant option. Multitenant options include the following: **Accounts in any organizational directory (Any Azure AD directory - Multitenant)**.
* When asked to set a **Redirect URI**, make sure `Web` is selected and enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects.md') %>

During this process, Microsoft will generate an **Application (client) ID** for your application; you can find this on the app's **Overview** screen. Make note of this value.

### Configure your web application to expose an API

To learn how to configure your **Web** application to expose an API with Azure AD, follow Microsoft's [Quickstart: Configure an application to expose web APIs](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-expose-web-apis).

While configuring your app, make sure you use the following settings:

* When asked to set a **Scope name**, enter `API.Access`.

During this process, Microsoft will generate an **Application ID URI**. Make note of this value.

### Register a new native application

Again, follow Microsoft's [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) doc. 

::: warning
If you have more than one Azure AD directory, make sure you are in the correct directory when you register your app.
:::

While setting up your app, make sure you use the following settings:

* If you want to allow users from external organizations (like other Azure AD directories), then when asked to choose **Supported account types**, choose the appropriate multitenant option. Multitenant options include the following: **Accounts in any organizational directory (Any Azure AD directory - Multitenant)**.
* When asked to set a **Redirect URI**, make sure `Public client/native (mobile & desktop)` is selected and enter your <dfn data-key="callback">callback URL</dfn>. Your callback URL format will vary depending on your platform. For details about the format for your platform, see our [Native Quickstarts](/quickstart/native).

During this process, Microsoft will generate an **Application (client) ID** for your application; you can find this on the app's **Overview** screen. Make note of this value.

### Create a client secret for your native application

To learn how to create a client secret, follow Microsoft's [Quickstart: Configure a client application to access web APIs - Add Credentials to your web application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application). You want to generate a **Client secret**. Once generated, make note of this value.

::: note
If you configure an expiring secret, make sure to record the expiration date; you will need to renew the key before that day to avoid a service interruption.
:::

### Add permissions for your native application

To learn how to add permissions for your **Native** application, follow Microsoft's [Quickstart: Configure a client application to access web APIs - Add permissions to access web APIs](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-web-apis). You want to configure permissions for the **Microsoft Graph API** and for the **Web** application you configured to expose an API.

While setting up your permissions, make sure you use the following settings for **Microsoft Graph API**:

* When asked for a permission type, choose **Delegated permissions**. Under **User**, select **User.Read** so your app can sign in users and read the signed-in user's profile. Under **Directory**, select **Directory.Read.All** so your app can read directory data on the signed-in user's behalf.

For your **Web** app that you configured to expose an API, make sure you use the following settings:

* When asked for a permission type, choose **Delegated permissions**. Under **API**, select **API.Access** so your app can access your API on the user's behalf.

## Configure the connection in Auth0

After creating both applications in Azure AD, you can configure the Auth0 connection.

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
| **Client ID** | Unique identifier for your registered Azure AD application. Enter the saved value of the **Application (client) ID** for the **Native** application you registered in Azure AD. |
| **Client Secret** | String used to gain access to your registered Azure AD application. Enter the saved value of the **Client secret** for the **Native** app you registered in Azure AD. |
| **Use common endpoint** (optional) | When enabled, your application will dynamically accept users from new directories. Typically enabled if you selected a multitenant option for **Supported account types** for the application you registered in Azure AD. When enabled, Auth0 will redirect users to Azure's common login endpoint, and Azure will perform *Home Realm Discovery* based on the domain of the user's email address. |
| **Identity API** | API used by Auth0 to interact with Azure AD endpoints. Learn about the differences in behavior in Microsoft's [Why update to Microsoft identity platform (v2.0)](https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison) doc. Select `Azure Active Directory (v1)`, and for **App ID URI**, enter the saved value of the **Application ID URI** that was created when you configured your **Web** application to expose an API. |
| **Attributes** | Basic attributes for the signed-in user that your app can access. Indicates how much information you want stored in the Auth0 User Profile. |
| **Extended Attributes** (optional) | Extended attributes for the signed-in user that your app can access. |
| **Auth0 APIs** (optional) | When selected, indicates that you require the ability to make calls to the Azure AD API. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Configure Advanced Microsoft Azure AD Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-ms-azure-ad-settings-2.png)

## Enable the enterprise connection for your Auth0 application

To use your new Azure AD enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

## Group Memberships and Advanced Profile Information

In this native flow, Auth0 will receive an <dfn data-key="access-token">Access Token</dfn> from Azure AD which has been issued for your Azure AD **Web** application. As a result, features like loading group memberships and advanced profile information will no longer work because the Access Token received by Azure AD can no longer be used to query the Azure AD Graph API for this additional information.

However, if you depend on group memberships and advanced profile information, you can change your configuration to accommodate your needs. 

1. Configure your **Native** application with additional permissions for the **Microsoft Graph API**:

    * When asked for a permission type, choose **Delegated permissions**. Under **Directory**, select **Directory.AccessAsUser.All**, so your app can access the directory as the signed-in user.

2. In Auth0, modify your Azure AD enterprise connection as follows, then **Save Changes**:

    * In **Identity API**, select `Azure Active Directory (v1)`, and for **App ID URI**, enter the URI of the Azure AD Graph API:

```
https://graph.windows.net
```

<%= include('../_quickstart-links.md') %>
