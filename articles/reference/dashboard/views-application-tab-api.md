---
title: Auth0 Dashboard - Application Views - APIs Tab
description: Learn about the APIs tab available for applications registered through the Auth0 Dashboard.
topics:
  - api-authentication
  - oidc
  - applications
  - apis
  - dashboard
contentType: reference
useCase:
  - secure-api
  - call-api
  - add-login
---

# Application Views: API Tab

:::note
This tab is only available for applications with an application type of **Machine-to-Machine**.
:::

The **APIs** tab:

* Lists all available APIs for the tenant
* Shows the ones that the Machine-to-Machine Application is authorized to call
* Lets you authorize additional APIs

![M2M APIs](/media/articles/applications/m2m-apis.png)

For example, you can authorize the same Machine-to-Machine Application to call both your own API and the Auth0 Management API.

::: note
Customers can see their [Machine-to-Machine usage report in the Support Center](${env.DOMAIN_URL_SUPPORT}/reports/quota). Please note that this is not a *user* count, but the number of Access Tokens issued by Auth0 for the Client Credentials grant per calendar month for a given tenant.
:::
