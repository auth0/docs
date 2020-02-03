---
addon: SAP OData
title: SAP OData Add-on
alias:
  - sap
url: /addons/sap-odata
image: /media/addons/sap_api.svg
description: Learn how to use Auth0 to authenticate and authorize your SAP OData services.
topics:
  - sap
  - addons
  - odata
useCase: integrate-third-party-apps
contentType: how-to
---

# SAP OData Add-on

<%= include('../_includes/_uses-delegation') %>

::: warning
This integration is in <strong>experimental mode</strong>. Contact us if you have questions.
:::

::: note
  Under the hood, Auth0 uses <a href="http://help.sap.com/saphelp_nw74/helpdata/en/12/41087770d9441682e3e02958997846/content.htm"><dfn data-key="security-assertion-markup-language">SAML</dfn> 2.0 Bearer Assertion Flow for OAuth 2.0</a> to obtain an Access Token. All details of construction of the right SAML token are taken care of by Auth0.
:::

![](/media/articles/server-apis/sap-data-flow.png)
