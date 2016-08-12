---
section: apis
---

# Auth0 Management API Reference

### API endpoint

	https://${account.namespace}/api

### Authentication
Each API request must include an access token, either inside the query string:

	https://${account.namespace}/api/connections/?access_token={ACCESS-TOKEN}

or in an ```Authorization``` header:

	GET https://${account.namespace}/api/connections
	Authorization: bearer {ACCESS-TOKEN}

A token is obtained using the POST method:

	POST https://${account.namespace}/oauth/token
	Content-type: application/x-www-form-urlencoded
	client_id=${account.clientId}&client_secret=${account.clientSecret}&type=web_server&grant_type=client_credentials

The response body of this POST is a JSON object:

	{
		'access_token': TOKEN
		'token_type':'bearer'
	}

Here is a simple example using `curl`:

	curl https://${account.namespace}/oauth/token --data "client_id=${account.clientId}&client_secret=${account.clientSecret}&type=web_server&grant_type=client_credentials"

### Headers
The `Authorization` header is the only accepted header and is used in place of the query string to send the access_token. All content is  returned in JSON. The `Accept` header is ignored for now.

	Authorization: bearer {ACCESS-TOKEN}

## Connections

### Connection Methods
| Verb | URL |
|:-----|:----|
|`GET` | https://${account.namespace}/api/connections |
|`GET` | https://${account.namespace}/api/connections/{connectionName} |
|`POST` | https://${account.namespace}/api/connections |
|`DELETE`| https://${account.namespace}/api/connections/{connectionName} |
|`PUT` | https://${account.namespace}/api/connections/{connectionName} |

#### List all Connections

To return a list of all defined connections in Auth0, use this syntax:

	GET https://${account.namespace}/api/connections/?access_token={ACCESS-TOKEN}

The body of the response is a `connection` object formatted as follows:

	{
		"client_id": "${account.clientId}",
		"name": YOUR-CONNECTION-NAME,
		"options":
		{
			...
		},
		"status": 0,
		"strategy": STRATEGY
	}

#### Parameters
| Parameter  | Description |
|:-----------|:------------|
| `client_id`| Your client_id (${account.clientId}), used to obtain the authentication token.					 |
| `name` | The unique name you gave to the connection. 									  					 |
| `status` | Defines whether the connection is active `1` or not `0`. |
| `strategy` | The type of identity provider associated with this connection. See below for supported strategies.|
| `options` | An object with properties that are dependent on the strategy selected. |


#### Strategies

| Strategy | For Customers Using |
|:---------|:--------------------|
| `adfs` | On Premises Active Directory or any WS-Federation server |
| `google-apps` | Google Apps |
| `google-oauth2` |Google (through the OAuth2 protocol) |
| `office365` | Office 365 and Microsoft Azure Active Directory |
| `windowslive` | Microsoft Account (formerly LiveID) |

When implementing the `office365`, `google-apps` or `adfs` strategies, the following properties are added to the connection object:

 `provisioning_ticket`: TICKET

 `provisioning_ticket_url`: PROVISIONING-URL

The `provisioning_ticket_url` is sent to the identity provider administrator and contains information on how to complete the configuration on their side.

A GET on `connections` with a specified {connectionName} in the path will return the matching connection object only.

###### Here are two `curl` sample scripts:
This script returns a specific connection:

	curl https://${account.namespace}/api/connections/?access_token={YOUR ACCESS TOKEN}

This script returns all connections:

	curl https://${account.namespace}/api/connections/{YOUR-CONNECTION-NAME}?access_token={YOUR ACCESS TOKEN}

##### Options

The `options` object returned in the `connection` will be different for each strategy and will typically contain the same information that was entered on the [connections](${uiURL}/#/connections) screen.

###### ADFS Strategy

	{
		tenant_domain: A-DOMAIN,
		adfs_server: YOUR-FEDERATION-METADATA-ENDPOINT,
		thumbprints: [ '9b250aad7e4950604072ffaa60cde7795f23b52a',
		  'f97702a42c893a0fb1bc6dad21c79fb720473a85',
		  '9b250aad7e4955604072faca60cde7795f23b52a',
		  'f97702a42c893a0fb1bc6dad21c79fb720473a85',
		  '9b250aad7e4956704072ffaa60cde7795f23b52a',
		  'f97702a42c893a0fb1b546dad21c79fb720473a85',
		  '9b250aad7e4959804072ffaa60cde7795f23b52a' ],
		signInEndpoint: ADFS-LOGIN-PAGE
	}

| Parameter | Description |
|:----------|:------------|
| `tenant_domain` | The domain name of the company (If the user's email is _john @mycompany.com_, then _mycompany.com_ is the domain). |
| `adfs_server` | (for example: _the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml_). |
| `signInEndpoint`| The URL of the ADFS server where Auth0 will redirect users for login. (for example: _the-adfs-server.company.com/adfs/ls_). |

###### Google Apps Strategy

	{
		client_id: GOOG-CLIENT-ID,
		client_secret: GOOG-CLIENT-SECRET,
		tenant_domain: 'company.com',
		email: true/false,
		profile: true/false,
		ext_groups: true/false,
		ext_is_admin: true/false,
		ext_is_suspended: true/false,
		ext_agreed_terms: true/false,
		api_enable_users: true/false,
		scope: [ 'https://www.googleapis.com/auth/userinfo.email',
				 'https://www.googleapis.com/auth/userinfo.profile' ]
	}

To obtain `client_id` and `client_secret` for Google Apps connections, see [Google connections](/connections/social/google).

###### Google OAuth2 Strategy

	{
		client_id: 'GOOG-CLIENT-ID',
		client_secret: 'GOOG-CLIENT-SECRET',
		email: true/false,
		profile: true/false,
		contacts: true/false,
		blogger: true/false,
		calendar: true/false,
		gmail: true/false,
		google_plus: true/false,
		orkut: true/false,
		picasa_web: true/false,
		tasks: true/false,
		youtube: true/false,
		adsense_management: true/false,
		google_affiliate_network: true/false,
		analytics: true/false,
		google_books: true/false,
		google_cloud_storage: true/false,
		content_api_for_shopping: true/false,
		chrome_web_store: true/false,
		document_list: true/false,
		google_drive: true/false,
		google_drive_files: true/false,
		latitude_best: true/false,
		latitude_city: true/false,
		moderator: true/false,
		sites: true/false,
		spreadsheets: true/false,
		url_shortener: true/false,
		webmaster_tools: true/false,
		scope: []
	}

###### Office 365 Strategy

	{
		client_id: 'OFFICE-365-CLIENT-ID',
		client_secret: 'OFFICE-365-CLIENT-SECRET',
		tenant_domain: 'CONNECTION-DOMAIN-ON-OFFICE-365',
		basic_profile: true/false,
		ext_profile: true/false,
		ext_groups: true/false,
		ext_assigned_plans: true/false,
		api_enable_users: true/false,
		app_domain: '${account.namespace}',
		thumbprints: []
	}

To obtain `client_id` and `client_secret` for Office 365 connections, see [o365-clientid](/o365-clientid).


###### Microsoft Account Strategy

	{
		client_id: 'MSFT-ACCOUNT-CLIENT-ID',
		client_secret: 'MSFT-ACCOUNT-CLIENT-SECRET',
		signin: true/false,
		emails: true/false,
		postal_addresses: true/false,
		birthday: true/false,
		work_profile: true/false,
		basic: true/false,
		offline_access: true/false,
		calendars: true/false,
		calendars_update: true/false,
		contacts_birthday: true/false,
		contacts_create: true/false,
		contacts_calendar: true/false,
		contacts_photos: true/false,
		contacts_skydrive: true/false,
		events_create: true/false,
		messenger: true/false,
		phone_numbers: true/false,
		photos: true/false,
		share: true/false,
		skydrive: true/false,
		skydrive_update: true/false,
		applications: true/false,
		applications_create: true/false,
		scope: []
	}

To obtain `client_id` and `client_secret` for Microsoft Accounts, see [Microsoft Account Client ID](/ms-account-clientid).

#### Get a specific Connection

	GET https://${account.namespace}/api/connections/{A-CONNECTION-NAME}/?access_token=...


#### Delete a connection
A Delete operation on the `connections` object will eliminate the connection definition permanently. The parameter for this operation is the name of the connection to delete.

	DELETE https://${account.namespace}/api/connections/{A-CONNECTION-NAME}/?access_token=...


If successful, the response body will contain a confirmation object:

	{
		"removed": {id}
	}

__Note:__ Batch operations are not yet supported.

#### Create a new Connection

To create a new connection, POST a connection object to the `connections` resource:

	POST https://${account.namespace}/connections
	Content-Type: application/json

The body of the request is formatted as a `connection` object. For example, the following will create a new connection to Google Apps, initially inactive (status=0):

	{
	  "name": A-NAME-FOR-THIS-CONNECTION
	  "status": 0,
	  "options":
	  {
		"client_id": GOOG-APPS-CLIENT-ID,
		"client_secret": GOOG-APPS-CLIENT-SECRET,
		"tenant_domain": GOOG-APP-DOMAIN,
		"ext_groups":true //Optional
	  },
	  "strategy": "google-apps"
	};

Once again, the `options` object is dependent on the strategy specified.

If successful, the response body will contain a complete `connection` object. This will include additional fields (e.g. the entity `id`, etc.).

#### Updating a Connection

For updates, use the PUT method. A PUT works on a specific `connection`, therefore the connection `name` must be specified. All object parameters must be included, not only those which have changed.

### Users
| Verb | URL | Description |
|:-----|:----|:------------|
|`GET` |https://${account.namespace}/api/users |Gets all users who have logged in through any of your connections. |
|`GET` |https://${account.namespace}/api/connections/{connection}/users|Gets all users from an enterprise directory like Office365 / Microsoft Azure Active Directory or a Google Apps domain. *Note:* If the connection does not support querying for users (for instance: ADFS), this will return users who have logged in through that connection.|
|`GET` |https://${account.namespace}/api/socialconnections/users |Gets all users who have logged in through any of the enabled social connections. |

#### The User Object

	{
		_id: '7eb1ae32568910b0f46e981aa99b56556',
		email: 'john@fabrikam.com',
		family_name: 'Fabrikam',
		given_name: 'John',
		identities: [],
		issuer: 'https://the-adfs-server.fabrikam.com',
		lastLogin: '2013-01-15T01:54:30.578Z',
		loginsCount: 13,
		name: 'John Fabrikam',
		nickname: 'john',
		picture: 'https://secure.gravatar.com/avatar/5426f6b9d63ad92d60e6fe9fdf83aa21?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png',
		user_id: 'adfs|john@fabrikam.com'
	}

Most attributes in the `user` object are self-explanatory. Some comments are below:

|Parameter | Description |
|:---------|:------------|
|`issuer` | The name of the authentication server. In the example above it is the URL of Fabrikam's ADFS server used.|
|`user_id` | (for example: _the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml_). |
|`picture` | The URL of the user's gravatar, if available. |
|`user_id` | A "friendly" unique identifier composed of the strategy plus a unique identifier from the `issuer` (for example: e-mail, etc.). |

#### Other resources

* [Auth0 node module](/node-auth0client). A simple client library for Node.js apps.
