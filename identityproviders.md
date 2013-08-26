# Identity Providers supported by Auth0

Auth0 is an "identity hub" that supports a number of authentication providers using different protocols: OAuth2, WS-Federation, etc. 

Out of the box, Auth0 supports:

1. Enterprise: 
	* __Active Directory__ 
	* __ADFS__
	* __LDAP__
	* __Google Apps__
	* __Office365__
	* __SQL__
	* Any __SAML-P__ or __WS-Federation__ system

2. Social: 
	* __Amazon__
	* __Facebook__
	* __LinkedIn__
	* __Twitter__
	* __Microsoft Account__ (formerly LiveID)
	* __Google__
	* __PayPal__
	* __GitHub__
	* __vKontakte__
	* __37Signals__
	* __Box__
	* __Salesforce__
	* __Fitbit__


Auth0 sits in between your app and the system that authenticate your users (any of the above). Through this level of abstraction, Auth0 keeps your app isolated from changes in each provider's implementation and idiosyncracies. An additional benefit is the [normalized user profile](user-profile) that simpifies user management.

> The relationship between Auth0 and each of these authentication providers is called a 'connection'

Auth0 is a multi-tenant service. When you register in Auth0 you get your own namespace (@@account.namespace@@). Many of these identity providers require registration and you will need to configure a `return url`. This will always be:

	https://@@account.namespace@@/login/callback

---
