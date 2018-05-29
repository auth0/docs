---
description: Configure Azure to accept Auth0 for use as an OAuth 2.0 server to authenticate users wanting access to an API managed by the Azure API Management service
toc: true
tags:
    - integrations
    - azure
    - api-management
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

To create a new API management service, click on **New** > **Web + Mobile** > **API management**.

![](/media/articles/integrations/azure-api-mgmt/azure/azure-portal-api-management.png)

You'll be asked to provide the following configuration variables:

| Parameter | Description |
| --------- | ----------- |
| Name | The name for your service (which will also be used to create the URL you need to access the service) |
| Subscription | The Azure subscription plan with which you'll use with the service |
| Resource group | The collection of [resources](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-portal) sharing a lifecycle, permissions, and policies. You can use an existing resource group or you can create a new one (you'll need to provide a name for the group if you create a new one) |
| Location | Choose the location that services your API instance |
| Organization name | The name of your organization |
| Administrator email | The email address of the person who will be administering this instance |
| Pricing tier | The pricing tier you want, which determines the number of calls you can make to your API, as well as the maximum amount of data transfer allowed |

![](/media/articles/integrations/azure-api-mgmt/azure/api-mgmt-service-config.png)

Click **Create** to begin provisioning your service.

![](/media/articles/integrations/azure-api-mgmt/azure/deployment-in-progress.png)

## Step 2: Import Your API

For this tutorial, we will be importing and using the Calculator API provided by Microsoft. You can, however, create your own API instead of using the Calculator API.

Launch the API Management service that you created in the previous step. 

![](/media/articles/integrations/azure-api-mgmt/azure/api-mgmt-service-home.png)

Open up the Publisher Portal, and click on **Import API**.

![](/media/articles/integrations/azure-api-mgmt/azure/publisher-portal.png)

You'll be importing an API **from URL**. 

![](/media/articles/integrations/azure-api-mgmt/azure/import-api.png)

Set the following parameters:

| Parameter | Description |
| --------- | ----------- |
| Specification document URL | The URL Azure will use to retrieve your API's specification. For this example, use `http://calcapi.cloudapp.net/calcapi.json`. |
| Specification format | The API specification format. Use `Swagger`. |
| New/Existing API | set this to **New** |
| Web API URL suffix | The value appended to the base URL of your API management service that uniquely identifies the API you're currently creating, such as `calc` |
| Web API URL scheme | The protocol used to access your API (for this example, set this to `HTTPs`) |
| Products | Add this API to the `Starter` product. This is a basic, getting-started-with-Azure container that holds your sample products and applies entry-level rate limits to your calls. |

![](/media/articles/integrations/azure-api-mgmt/azure/import-api-config.png)

When done, click **Save** to import your API. You'll be redirected to the summary page for your API when it's fully imported.

![](/media/articles/integrations/azure-api-mgmt/azure/basic-calc-api.png)

## Step 3: Configure Your OAuth 2.0 Authorization Server

To use Auth0 to secure your API, you'll need to register Auth0 as an OAuth 2.0 Authorization Server. You can do so using the Azure Publisher Portal.

Navigate to **Security** > **OAuth 2.0**.

![](/media/articles/integrations/azure-api-mgmt/azure/oauth2-servers.png)

Click on **Add Authorization Server**. You'll see the configuration screen that lets you provide details about your Auth0 tenant.

![](/media/articles/integrations/azure-api-mgmt/azure/new-oauth2-server-config.png)

For the purposes of this example, we'll use the **Authorization Code grant type**, but you're free to use whichever grant type is most appropriate for your use case. Azure currently supports the following grant types: [Authorization Code](/api-auth/grant/authorization-code), [Implicit](/api-auth/grant/implicit), [Resource Owner Password](/api-auth/grant/password), [Client Credentials](/api-auth/grant/client-credentials).

Set the following parameters:

| Parameter | Description |
| --------- | ----------- |
| Name | A descriptive name for your authorization server, such as `Auth0` |
| Description | A description for your authorization server, such as `Auth0 API Authentication` |
| Application registration page URL | The page where users can create or manage their accounts; for the purposes of this example, we'll use `https://placeholder.contoso.com` as the placeholder |
| Authorization code grant types | The grant type used for authorization. Select `authorization code` |
| Authorization endpoint URL | The URL Azure uses to make the authorization request. See the [Auth0 docs on generating the URL](/api-auth/tutorials/authorization-code-grant#1-get-the-user-s-authorization) |
| Authorization request method | The HTTP method used by Azure to make the authorization request. By default, this is `GET` |
| Token endpoint URL | The endpoint used to exchange authorization grants for Access Tokens; Auth0's can be reached at `https://auth0user.auth0.com/oauth/token` |
| Application authentication methods | Method used to authenticate the application; Auth0's is `BASIC` |
| Access Token sending method | The location of the Access Token in the sending method (typically the **Authorization header**) |
| Default scope | Specify a default scope (if necessary) |

Because we're using the **authorization code** grant, we'll need to provide the **client ID** and **client secret** for the [Auth0 Application we previously registered](/integrations/azure-api-management/configure-auth0#step-1-create-an-api-and-machine-to-machine-application). You can find both values in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

Once you've provided both the client ID and client secret, you'll see an auto-generated **redirect URI**. Copy this URL, since you'll need to provide this URI in your Auth0 Application Settings page in the Allowed Callback URLs section.

::: note
If you're using the [resource owner password](/api-auth/grant/password) flow, you'll need to provide the **resource owner username** and **resource owner password** instead of the client ID and secret.
:::

When complete, click **Save** to persist your changes.

![](/media/articles/integrations/azure-api-mgmt/azure/new-server-saved.png)

### Set the Allowed Callback URL

You'll need to provide the **redirect URI** that was auto-generated during the OAuth 2.0 authorization server setup process to Auth0. Log into the Management Dashboard, and navigate to **Applications**. Select your Application, and click **Settings**. Paste the URL into the **Allowed Callback URLs** field.

![](/media/articles/integrations/azure-api-mgmt/azure/set-callback-url.png)

Click **Save**.

## Step 4: Authorize Auth0 for Use with Your API

Before you can use Auth0 to secure your API, you'll need to set your API to use Auth0. You can do so using the Azure Publisher Portal.

Begin by navigating to the APIs tab, and select the Basic Calculator API.

![](/media/articles/integrations/azure-api-mgmt/azure/api-list.png)

Click over to the **Security** tab.

![](/media/articles/integrations/azure-api-mgmt/azure/security.png)

Under **User Authorization**, select **OAuth 2.0**. In the new **Authorization Server** field that appears, select the server you configured in the previous step.

![](/media/articles/integrations/azure-api-mgmt/azure/set-auth0-as-authserver.png)

Click **Save**.

## Step 5: Test Your Integration

While logged in to the Azure Portal, open up your instance of the API Management Service. Click **Developer Portal** to launch the developer-facing side of your APIs.

![](/media/articles/integrations/azure-api-mgmt/azure/developer-portal.png)

Go to APIs > Basic Calculator (or the API you've created for this tutorial). 

![](/media/articles/integrations/azure-api-mgmt/azure/dev-portal-apis.png)

This opens up to the page where you can make a `GET` call that allows you to add two integers.

![](/media/articles/integrations/azure-api-mgmt/azure/dev-portal-calculator.png)

Click Try It. This will bring up the page where you can provide the parameters for your call.

Scroll down to the **Authorization** section. Next to the **Auth0** field, select **Authorization Code**.

![](/media/articles/integrations/azure-api-mgmt/azure/dev-portal-try-it.png)

At this point, you'll see the Auth0 login widget in a popup window (if you don't, disable your popup blocker). Provide the credentials for the Auth0 user you created earlier in the tutorial, and sign in.

![](/media/articles/integrations/azure-api-mgmt/azure/dev-portal-auth.png)

If you were able to successfully sign in, you'll see a message appear with the expiration date of the Access Token you need to call the API.

![](/media/articles/integrations/azure-api-mgmt/azure/dev-portal-token.png)

Scroll to the bottom, and click **Send** to send your request. If successful, you'll see a message containing the `HTTP 200` response at the bottom of the page.

![](/media/articles/integrations/azure-api-mgmt/azure/dev-portal-200-response.png)

## Summary

In this tutorial, you:

1. Configured your Auth0 tenant to act as an OAuth 2.0 server.
2. Set up an API Management Service in Azure.
3. Imported an API that's managed by Azure's API Management Service.
4. Secured your API using Auth0.

<%= include('./_stepnav', {
 prev: ["1. Configure Auth0", "/integrations/azure-api-management/configure-auth0"]
}) %>