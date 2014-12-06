# Salesforce Community Auth

Authenticating users in a Salesforce community uses different endpoints that the regular Salesforce app.

The authorization URL for a Community site will be:

	https://{name of your community}.force.com/{community path}/oauth2/authorize

For example, if your community is names __contoso__ and it is for __customers__:

	https://contoso.force.com/customers/oauth2/authorize?
response_type=token&client_id=your_app_id&redirect_uri=your_redirect_uri

Notice that Auth0 will automatically pass all required OAuth2 parameters (e.g. `response_type`, `client_id`, etc) and concatenate other elements to the path (e.g. `oauth2/authorize`). All that is required is that you configure the __base__ community site URL:

	https://contoso.force.com/customers

For full details see this [Salesforce article](http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickstart_communities.htm).