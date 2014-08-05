# Using Auth0 with Salesforce APIs

As with any other add-on API enabled in the dahsboard, Auth0 will return a Salesforce token through the [Delegation](/auth-api#delegated) endpoint. This allows you to exchange an Auth0 token (the JWT issued when a user authenticates with Auth0 with any supported [Identity Provider](identityproviders)) for another one that you can then use to call the Saleforce API.

Auth0 supports both the __production__ connection to Salesforce and the __Sandbox__, the only difference being the endpoints hosted by Salesforce: `https://login.salesforce.com` and `https://test.salesforce.com` respectively.

> Under the hood, Auth0 uses [OAuth 2.0 JWT Bearer Token Flow](https://help.salesforce.com/HTViewHelpDoc?id=remoteaccess_oauth_jwt_flow.htm&language=en_US) to obtain an `access_token`. All details of construction of the right JWT are taken care of by Auth0.

![](https://docs.google.com/drawings/d/1aTHLCUPT4fCOXgX6fvUpxJdzd_rH_VzayBkLwLkwOBk/pub?w=784&amp;h=437)

To enable calling the `Salesforce API` from an app, just turn on the integration on the <a href="@@uiAppAddonsURL@@" target="_new">Application Add-ons</a> section and follow the instructions displayed.

