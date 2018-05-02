---
url: /addons
description: How to setup Application Addons, like Amazon Web Services and Azure Blob Storage, with your Auth0 app.
tags:
    - addons
---

# Auth0 Application Addons

Addons are plugins associated with an Application in Auth0. Usually, they are 3rd party APIs used by the application that Auth0 generates Access Tokens for (such as Salesforce, Azure Service Bus, Azure Mobile Services, SAP, and so on).

## How to configure an Addon

Go to [Dashboard > Applications > Settings > Addons](${manage_url}/#/applications/${account.clientId}/addons) page and use the toggle to enable the add-on you want to configure.

![Application Addons](/media/addons/manage-addons.png)

Each integration is different and requires different parameters and configuration. Once the addon is activated, you will see tailored instructions with details on how to integrate with it in the dashboard.

## Additional information for specific Addons

- Amazon Web Services: For more info on how to use delegation with the AWS API Gateway, see the [AWS API Gateway](/integrations/aws-api-gateway/delegation) Tutorial
- [Azure Blob Storage](/addons/azure-blob-storage)
- [Azure Mobile Services](/addons/azure-mobile-services)
- [Azure Service Bus](/addons/azure-sb)
- [Salesforce (sandbox)](/addons/salesforce-sandbox)
- [Salesforce](/addons/salesforce)
- [SAP OData](/addons/sap-odata)
