# Salesforce Community Auth

Authenticating users in a Salesforce Community uses different endpoints than the regular Salesforce app.

The authorization URL for a Community site will be:

	https://{name of your community}.force.com/{community path}/oauth2/authorize

For example, if your Community is named __contoso__ and it is for __customers__:

	https://contoso.force.com/customers/oauth2/authorize?response_type=token&client_id=your_app_id&redirect_uri=your_redirect_uri

Auth0 will automatically construct much of the URL. This includes the required OAuth2 parameters like `response_type`, `client_id`, etc., and other elements like the `oauth2/authorize` path. All you have to supply is the __base__ URL of the Community site:

	https://contoso.force.com/customers

For full details see [this Salesforce article](http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickstart_communities.htm).

It is common to customize the login page for __Community__ sites. Auth0's authentication will work fine with these customized pages long as they remain a part of the login transaction and honor the OAuth2 flow. [This sample](https://github.com/salesforceidentity/basic-custom-login) provides details on how to properly make customized login pages.
