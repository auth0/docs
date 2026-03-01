---
description: Configure Azure to accept Auth0 for use as an OAuth 2.0 server to authenticate users wanting access to an API managed by the Azure API Management service
toc: true
topics:
    - integrations
    - azure
    - api-management
contentType: tutorial
useCase:
  - secure-an-api
---
# Configure Azure

::: warning
To complete this tutorial you will need to have an account that grants you access to Microsoft's [Azure Portal](https://portal.azure.com).
:::

In this section, you'll:

* Create an API management instance
* Import the Basic Calculator API
* Configure an OAuth 2.0 Server
* Set Auth0 as the OAuth 2.0 Server handling authentication requests to the API
* Test the Auth0-Azure API integration

## Step 1: Create Your API Management Instance

To create a new API management service, click **Create a resource** in the left-hand navigation bar. Once redirected, click **Web** > **API Management**.

You'll be asked to provide the following configuration variables:

| Parameter | Description |
| --------- | ----------- |
| Name | The name for your service (which will also be used to create the URL you need to access the service) |
| Subscription | The Azure subscription plan with which you'll use with the service |
| Resource group | The collection of [resources](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-portal) sharing a lifecycle, permissions, and policies. You can use an existing resource group or you can create a new one (you'll need to provide a name for the group if you create a new one) |
| Location | Choose the location that services your API instance |
| Organization name | The name of your organization |
| Administrator email | The email address of the person who will be administering this instance |
| Pricing tier | The pricing tier you want, which determines the number of calls you can make to your API, as well as the maximum amount of data transfer allowed. You must opt for the [Developer plan](https://azure.microsoft.com/en-us/pricing/details/api-management/) or higher; the Consumption plan does not offer sufficient functionality for this integration to work. |

You can also choose to **Enable Application Insights**. If you do, select the **Application Insights instance** you would like to use.

Click **Create** to begin provisioning your service.

## Step 2: Import Your API

For this tutorial, we will be importing and using the Calculator API provided by Microsoft. You can, however, create your own API instead of using the Calculator API.

For detailed instructions on how to do so, see [Import and Publish Your First API](https://docs.microsoft.com/en-us/azure/api-management/import-and-publish#go-to-your-api-management-instance)

When done, click **Create** to import your API. You'll be redirected to the summary page for your API when it's fully imported.

## Step 3: Configure Your OAuth 2.0 Authorization Server

To use Auth0 to secure your API, you'll need to register Auth0 as an OAuth 2.0 Authorization Server. You can do so using the Azure Publisher Portal.

Find the **Security** area of your API Management service instance's near left navigation bar, and click **OAuth 2.0**.

Click on **Add**. You'll see the **Add OAuth2 service** configuration screen that lets you provide details about your Auth0 tenant.

For the purposes of this example, we'll use the **Authorization Code grant type**, but you're free to use whichever grant type is most appropriate for your use case. Azure currently supports the following grant types: [Authorization Code](/flows/concepts/auth-code), [Implicit](/flows/concepts/implicit), [Resource Owner Password](/api-auth/grant/password), [Client Credentials](/flows/concepts/client-credentials).

Set the following parameters:

| Parameter | Description |
| --------- | ----------- |
| Display name | A descriptive name for your authorization server, such as `Auth0` |
| Id | The identifying name for this Azure resource -- this field should auto-populate based on the display name you provide |
| Description | A description for your authorization server, such as `Auth0 API Authentication` |
| Client registration page URL | The page where users can create or manage their accounts; for the purposes of this example, we'll use `https://placeholder.contoso.com` as the placeholder |
| Authorization code grant types | The grant type used for authorization. Select `authorization code` |
| Authorization endpoint URL | The URL Azure uses to make the authorization request. See the [Auth0 docs on generating the URL](/flows/guides/auth-code/call-api-auth-code#authorize-the-user) |
| Authorization request method | The HTTP method used by Azure to make the authorization request. By default, this is `GET` |
| Token endpoint URL | The endpoint used to exchange authorization grants for <dfn data-key="access-token">Access Tokens</dfn>; Auth0's can be reached at `https://auth0user.auth0.com/oauth/token` |
| Client authentication methods | Method used to authenticate the application; Auth0's is `BASIC` |
| Access Token sending method | The location of the Access Token in the sending method (typically the **Authorization header**) |
| Default scope | Specify a default <dfn data-key="scope">scope</dfn> (if necessary) |

Because we're using the **authorization code** grant, we'll need to provide the **client ID** and **client secret** for the [Auth0 Application we previously registered](/integrations/azure-api-management/configure-auth0#step-1-create-an-api-and-machine-to-machine-application). You can find both values in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

Once you've provided both the client ID and client secret, you'll see an auto-generated **redirect URI**. Copy this URL, since you'll need to provide this URI in your Auth0 Application Settings page in the Allowed <dfn data-key="callback">Callback URLs</dfn> section.

::: note
If you're using the [resource owner password](/api-auth/grant/password) flow, you'll need to provide the **resource owner username** and **resource owner password** instead of the client ID and secret.
:::

When complete, click **Create** to persist your changes.

### Set the Allowed Callback URL

You'll need to provide the **redirect URI** that was auto-generated during the OAuth 2.0 authorization server setup process to Auth0. Log into the Management Dashboard, and navigate to **Applications**. Select your Application, and click **Settings**. Paste the URL into the **Allowed Callback URLs** field.

![](/media/articles/integrations/azure-api-mgmt/azure/set-callback-url.png)

Click **Save**.

## Step 4: Authorize Auth0 for Use with Your API

Before you can use Auth0 to secure your API, you'll need to set your API to use Auth0.

In the near-left navigation column, click **APIs**. Select the Basic Calculator API; this redirects you to the **Design** tab.

Click over to the **Settings** tab.

Scroll to the **Security** section, and under **User Authorization**, select **OAuth 2.0**. In the **Authorization Server** field that appears, select the server you configured in the previous step.

Click **Save**.

## Step 5: Test Your Integration

While logged in to the Azure Portal, open up your instance of the API Management Service. Click **Developer Console** to launch the developer-facing side of your APIs.

Go to APIs > Basic Calculator (or the API you've created for this tutorial). This opens up to the page where you can make a `GET` call that allows you to add two integers.

Click **Try It**. This will bring up the page where you can provide the parameters for your call.

Scroll down to the **Authorization** section. Next to the **Auth0** field, select **Authorization Code**.

At this point, you'll see the Auth0 login widget in a popup window (if you don't, disable your popup blocker). Provide the credentials for the Auth0 user you created earlier in the tutorial, and sign in.

If you were able to successfully sign in, you'll see a message appear with the expiration date of the Access Token you need to call the API.

Scroll to the bottom, and click **Send** to send your request. If successful, you'll see a message containing the `HTTP 200` response at the bottom of the page.

## Configure a JWT validation policy for Access Tokens

In the previous step, the user is prompted to sign in when they try to make a call from the Developer Console. The Developer Console attempts to obtain an Access Token on behalf of the user to be included in the API request. All Access Tokens will be passed to the API via the `Authorization` header.

If you want to validate the Access Token included with each request, you can do so by using the [Validate JWT](https://docs.microsoft.com/en-us/azure/api-management/api-management-access-restriction-policies#ValidateJWT) policy. Please refer to Microsoft's documentation on [setting an API Management policy](https://docs.microsoft.com/en-us/azure/api-management/set-edit-policies).

## Summary

In this tutorial, you:

1. Configured your Auth0 tenant to act as an OAuth 2.0 server.
2. Set up an API Management Service in Azure.
3. Imported an API that's managed by Azure's API Management Service.
4. Secured your API using Auth0 and (optionally) verified the Access Token.

<%= include('./_stepnav', {
 prev: ["1. Configure Auth0", "/integrations/azure-api-management/configure-auth0"]
}) %>