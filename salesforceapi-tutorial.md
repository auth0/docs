# Using Auth0 with Salesforce APIs

As with any other add-on API enabled in the dahsboard, Auth0 will return a Salesforce token through the [Delegation](/auth-api#delegated) endpoint. This allows you to exchange an Auth0 token (the JWT issued when a user authenticates with Auth0 with any supported [Identity Provider](identityproviders)) for another one that you can then use to call the Saleforce API.

Auth0 supports both the __production__ connection to Salesforce and the __Sandbox__, the only difference being the endpoints hosted by Salesforce: https://login.salesforce.com and https://test.salesforce.com respectively.

> Under the hood, Auth0 uses [OAuth 2.0 JWT Bearer Token Flow](https://help.salesforce.com/HTViewHelpDoc?id=remoteaccess_oauth_jwt_flow.htm&language=en_US) to obtain an `access_token`. All details of construction of the right JWT are taken care by Auth0.

To configure this extension you will need to register a __Connected App__ in Salesforce and enable OAuth. Registering Auth0 This will give you back a `Consumer Key`


