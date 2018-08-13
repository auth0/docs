---
addon: Salesforce (sandbox)
thirdParty: true
url: /addons/salesforce-sandbox
alias:
  - salesforce
image: /media/addons/salesforce_sandbox_api.svg
description: Use Auth0 to authenticate and authorize your Salesforce (Sandbox) services.
topics:
  - salesforce
  - addons
useCase: integrate-third-party-apps
contentType: reference
---

# Salesforce (Sandbox) Addon

Auth0 supports both the __production__ connection to Salesforce and the __Sandbox__, the only difference being the endpoints hosted by Salesforce: `https://login.salesforce.com` and `https://test.salesforce.com` respectively.

::: note
  Under the hood, Auth0 uses <a href="https://help.salesforce.com/HTViewHelpDoc?id=remoteaccess_oauth_jwt_flow.htm&language=en_US">OAuth 2.0 JWT Bearer Token Flow</a> to obtain an Access Token. All details of construction of the right JWT are taken care of by Auth0.
:::

![](/media/articles/server-apis/salesforce-data-flow.png)
