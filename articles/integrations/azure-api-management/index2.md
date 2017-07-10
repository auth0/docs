---
description: Using Auth0 as an OAuth 2.0 server to authenticate users wanting access to an API managed by the Azure API Management service
---

# Integrate Azure API Management Service with Auth0

If you have an API that you want published and secured, you can do so using Azure API Management in conjunction with Auth0. 

Azure API Management allows you to implement new APIs or import existing API definitions and publish them for use by the approved audiences. Auth0 makes authorizing users of your API using OAuth 2.0 standards easy.

In this example, we will show you how to create an Azure API Management service, import an existing API, and secure it using Auth0.

## Configure Auth0

Here's what you need to do...

### Step 1: Create an API 

### Step 2: Make Note of Info from Associated Client

## Configure Azure

1. Create an Azure Portal account
2. Create an API Management Service
3. Import/Create Your API
4. Set up your OAuth 2.0 Service - AUTH0 CALLBACK
5. Change your API's permissions so that authentication via OAuth 2.0 is allowed
6. DEMO TIME

::: note
To complete this, tutorial, you will need to have an account that grants you access to Microsoft's [Azure Portal](https://portal.azure.com).
:::

In this section, you'll begin by creating an API management instance, as well as the API to manage your cookies application.

### Create Your API Management Instance

To create your API management instance, log into the Azure Portal.

![](azure-portal-home.png)

To create a new API management service, click on **New** > **Web + Mobile** > **API management**.

![](azure-portal-api-management.png)

You'll be asked to provide the following configuration variables:

* **Name**: The name for your service (which will also be used to create the URL you need to access the service)

* **Subscription**: The Azure subscription plan with which you'll use with the service

* **Resource group**: The collection of [resources](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-portal) sharing a lifecycle, permissions, and policies. You can use an existing resource group or you can create a new one (you'll need to provide a name for the group if you create a new one)

* **Location**: Choose the location that services your API instance

* **Organization name**: The name of your organization

* **Administrator email**: The email address of the person who will be administering this instance

* **Pricing tier**: The pricing tier you want, which determines the number of calls you can make to your API, as well as the maximum amount of data transfer allowed

![](api-mgmt-service-config.png)

Click **Create** to begin provisioning your service.

![](deployment-in-progress.png)

### Import Your API

::: note
For this tutorial, we will be importing and using the Calculator API provided by Microsoft. You can, however, create your own API instead of using the Calculator API.
:::

Open up the Publisher Portal, and click on **Import API**.

![](publisher-profile.png)

You'll be importing an API **from URL**. To do so, provide values for the following parameters:

* **Specification document URL**:
* **Specification format**:
* **New/Existing API**:
* **Web API URL suffix**:
* **Web API URL scheme**:
* **Products** (optional):

