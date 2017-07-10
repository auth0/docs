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

When the service is ready, you'll see a screen offering you the option of adding a new API.

![](add-a-new-api.png)

Currently, you can use the Azure Portal to create a new API by clicking on **Blank API**. However, we will be using the **Publisher portal**. Eventually, Microsoft will deprecate the Publisher portal in favor of the Azure portal, but for now, we will use the former since not all of the features we need are available in the latter just yet.

![](mgmt-service-overview.png)

Launch the Publisher profile using the appropriate link in the navigation bar.

![](publisher-profile.png)

Near the top, click **Add API**. Provide values for the following settings in the *Create a blank API* pop-up:

* **Web API Name**: a descriptive name for the API

* **Web service URL**: URL referencing the service implementing the API and to which API management forwards requests

* **Web API URL suffix**: the final portion of the API's publicly-available URL, this distinguishes the APIs for a given management service instance

* **URL scheme**: the protocols by which the API can be accessed

* **Products** (optional): the Azure products to which you want this API added

As you populate the above values, Azure will automatically generate your **Base URL**, which you see at the bottom of the configuration pop-up window.

Click **Save** to proceed.

At this point, Azure creates your new API. When ready, you'll see the API's *Operations* page.

![](api-operations.png)

### Step 2: Add Operations to Your API

At this point, you'll need to add operations to your API before you can use it.

Using your API's Operations page, click **Add Operation**. You'll see the *New Operation* page displayed, with the *Signature* tab selected.

![](new-operation.png)

To define the action, you'll need to provide values for the following fields:

* **HTTP verb**: the HTTP action for this operation. You can choose from `GET`, `POST`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`, `PATCH`, or `TRACE`.
* **URL template**: the URL fragment that gets appended to the API's base URL and identifies the HTTP operation
* **Rewrite URL template**: used in conjunction with the URL template, Rewrite URL template allows you to use a standard URL template for incoming requests while calling the back-end with a converted URL

    For example, calls to the operation use `/stars?starid=STAR1`, which is then mapped to `Stars('STAR1')` when the invoking the back-end service.

* **Display name**: the descriptive name for your operation
* **Description**: a description of what the operations does

![](new-op-signature.png)

Next, switch over the the *Parameters* tab under the REQUESTS section. Notice that there's already a parameter listed; parameters specified in the **URL template** in the *Signature* tab are automatically added. 

![](new-op-default-param.png)

You can add additional parameters manually. For the purposes of this example, we'll add `name` parameter.

![](new-op-param.png)