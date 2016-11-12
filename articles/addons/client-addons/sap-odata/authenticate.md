---
title: Authenticate
description: This tutorial will show you how to use the Auth0 to authenticate and authorize your SAP OData services.
---
> This integration is in __experimental mode__. Contact us if you have questions.



${include('../_thirdPartyApi')}

### Additional Information

> Under the hood, Auth0 uses [SAML 2.0 Bearer Assertion Flow for OAuth 2.0](http://help.sap.com/saphelp_nw74/helpdata/en/12/41087770d9441682e3e02958997846/content.htm) to obtain an `access_token`. All details of construction of the right SAML token are taken care of by Auth0.

![](/media/articles/server-apis/sap-data-flow.png)
