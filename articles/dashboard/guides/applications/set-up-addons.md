---
title: Set Up Add-ons
description: Learn how to set up add-ons, like Amazon Web Services and Azure Blob Storage, for an application registered with Auth0 using the Auth0 Management Dashboard.
topics:
    - applications
    - add-ons
    - dashboard
contentType:
    - how-to
useCase: 
    - integrate-third-party-apps
---
# Set Up Add-ons

<%= include('../../../_includes/_uses-delegation') %>

This guide will show you how to set up an [add-on](/addons) for an application using Auth0's Dashboard.

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Click **Add-ons**, and enable the toggle for the add-on you want to set up.

![View Add-ons](/media/articles/applications/addons-dashboard-list.png)

Each integration is different and requires different parameters and configuration. Once the add-on is activated, you will see tailored instructions with details on how to integrate with it.

For more info about using Auth0 to authenticate and authorize add-ons, see:
- [Azure Blob Storage](/addons/azure-blob-storage)
- [Azure Mobile Services](/addons/azure-mobile-services)
- [Azure Service Bus](/addons/azure-sb)
- [Salesforce (sandbox)](/addons/salesforce-sandbox)
- [Salesforce](/addons/salesforce)
- [SAP OData](/addons/sap-odata)

For more info on how to use delegation with the Amazon Web Services (AWS) API Gateway, see the [AWS API Gateway Tutorial](/integrations/aws-api-gateway/delegation).