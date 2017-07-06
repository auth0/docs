---
description: How to set up your Azure API Gateway
toc: true
---

# How to Set Up Your Azure API Gateway

::: note
To complete this, tutorial, you will need to have an account that grants you access to Microsoft's [Azure Portal](https://portal.azure.com).
:::

In this section, you'll begin by creating an API management instance, as well as the API to manage your cookies application.

## Create Your API Management Instance

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

## Create Your API

To fully create your API, you'll need to:

1. Create the API itself
2. Add operations to your API

### Step 1: Create Your Azure API

In the Azure Portal, you can find API Management services under the **All resources** tab or under **More services** > **Web + Mobile** > **API Management services. 

![](all-resources.png)

Click on and open the service you created in the previous section.

![](api-mgmt-service.png)

Click on **APIs**. If this is the first time you've used this feature, you'll see a service activation screen.

![](service-activation.png)