#Auth0 API Reference

###API endpoint

	https://@@account.namespace@@/api

###Authentication
Each request to the API should include an access token, either in the query string or in an ```Authorization``` header.

	https://@@account.namespace@@/api/connections/?access_token={ACCESS-TOKEN}

is equivalent to:

	GET https://@@account.namespace@@/api/connections
	Authorization: bearer {ACCESS-TOKEN}	

A token can be obtained by POSTing this request to the token endpoint:

	POST https://@@account.namespace@@/oauth/token
	Content-type: application/x-www-form-urlencoded

	client_id=@@account.clientId@@&client_secret=@@account.clientSecret@@&type=web_server&grant_type=client_credentials

The response body of this POST will be this JSON object:

	{
		'access_token': TOKEN
		'token_type':'bearer'
	}

Here's a simple example using `curl`:

	curl https://@@account.namespace@@/oauth/token --data "client_id=@@account.clientId@@&client_secret=@@account.clientSecret@@&type=web_server&grant_type=client_credentials"

###Headers
The only accepted header is `Authorization` that can be used to send the access_token instead of using the query string. All content is always returned in JSON, the `Accept` header is ignored for now.

	Authorization: bearer {ACCESS-TOKEN}

###Connections
|Verb	 |URL 													 		 |
|========|===============================================================|
|`GET`	 |https://@@account.namespace@@/api/connections 				 |
|`GET`	 |https://@@account.namespace@@/api/connections/{connectionName} |
|`POST`	 |https://@@account.namespace@@/api/connections 				 |
|`DELETE`|https://@@account.namespace@@/api/connections/{connectionName} |
|`PUT`	 |https://@@account.namespace@@/api/connections/{connectionName} |

####List all Connections
	GET https://@@account.namespace@@/api/connections/?access_token={ACCESS-TOKEN}
	
Returns a list of all defined connections in Auth0. A `connection` object will look like this:

	{ 
		"client_id": "@@account.clientId@@",
		"name": YOUR-CONNECTION-NAME,
		"options": 
		{ 
			...
		},
		"status": 0,
		"strategy": STRATEGY
	}


| Parameter  | Description																	  					 |
|============|===================================================================================================|
| `client_id`| Your client_id (@@account.clientId@@), used to obtain the authentication token.					 |
| `name`	 | The unique name you gave to the connection. 									  					 |
| `status`	 | Defines whether the connection is active `1` or not `0`.      				  					 |
| `strategy` | The type of identity provider associated with this connection. See below for supported strategies |
| `options`  | An object with properties that are dependent on the strategy selected          					 | 

Auth0 supports the following strategies:

|Strategy           | Used when users are in                                        |   
|===================|===============================================================|
|office365          |Office 365 and Windows Azure Active Directory                  |
|adfs               |On Premises Active Directory or any WS-Federation server       |
|google-apps        |Google apps                                                    |
|windowslive        |Microsoft Account (formerly LiveID)                            |
|google-openid      |Google (through OpenID protocol)                               |
|google-oauth2      |Google (through the OAuth2 protocol)	                        |

> With __office365__, __google-apps__ and __adfs__ the following properties are added to the connection object:
 `provisioning_ticket`: TICKET
 `provisioning_ticket_url`: PROVISIONING-URL
 
A GET against `connections` with a name specified in the path will just return the matching connection object.

Here are two `curl` sample scripts to get a specific connection or all of them:

	curl https://@@account.namespace@@/api/connections/?access_token={YOUR ACCESS TOKEN} 

	curl https://@@account.namespace@@/api/connections/{YOUR-CONNECTION-NAME}?access_token={YOUR ACCESS TOKEN}

#####Options

The `options` object returned in the `connection` will be different for each strategy and will typically contain the same information you enter on the [connections](https://app.auth0.com/#/connections) screen.

######ADFS

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

|Parameter       | Description																 										  	    |
|================|==========================================================================================================================|
|`tenant_domain` | The domain name of the company (e.g.: if the users emails are john@mycompany.com, then mycompany.com would be the domain)|
|`adfs_server`   | This would be something like: the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml 				|
|`signInEndpoint`| The URL of the ADFS server where Auth0 will redirect users for login. (https://the-adfs-server.company.com/adfs/ls/)		|

######Google Apps

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

> In this example, all possible scopes are shown.

######Office 365

	{
		"client_id": OFFICE-365-CLIENT-ID,
		"client_secret": OFFICE-365-CLIENT-SECRET,
		"tenant_domain": CONNECTION-DOMAIN-ON-OFFICE-365,
		"sso":true/false,
		"directory_reader":true/false,
		"directory_writer":true/false,
		"user_id":true/false,
		"email":true/false,
		"given_name":true/false,
		"family_name":true/false,
		"nickname":true/false,
		"domain":true/false,
		"tou_accepted":true/false,
		"managed":true/false,
		"child":true/false,
		"cid":true/false,
		"ext_groups":true/false,
		"ext_account_enabled":true/false,
		"ext_street":true/false,
		"ext_state":true/false,
		"ext_postal_code":true/false,
		"ext_city":true/false,
		"ext_country":true/false,
		"ext_department":true/false,
		"ext_phone":true/false,
		"ext_mobile":true/false,
		"ext_fax":true/false,
		"ext_job_title":true/false,
		"ext_preferred_language":true/false,
		"ext_usage_location":true/false,
		"ext_upn":true/false,
		"ext_assigned_plans":true/false,
		"ext_dir_sync_enabled":false,
		"ext_last_sync":false,
		"appDomain": @@account.namespace@@,
		"thumbprints":[TH_1, TH_2, TH_3]
	}

######Google OAuth2

	{ 
		client_id: GOOG-OAUTH2-CLIENT-ID,
		client_secret: GOOG-OAUTH2-CLIENT-SECRET,
		email: true,
		profile: true,
		contacts: true,
		blogger: true,
		calendar: true,
		gmail: true,
		google_plus: true,
		orkut: true,
		picasa_web: true,
		tasks: true,
		youtube: true,
		adsense_management: true,
		google_affiliate_network: true,
		analytics: true,
		google_books: true,
		google_cloud_storage: true,
		content_api_for_shopping: true,
		chrome_web_store: true,
		document_list: true,
		google_drive: true,
		google_drive_files: true,
		latitude_best: true,
		latitude_city: true,
		moderator: true,
		sites: true,
		spreadsheets: true,
		url_shortener: true,
		webmaster_tools: true,
		scope: 
		[ 'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.google.com/m8/feeds/',
		'https://www.googleapis.com/auth/blogger',
		'https://www.googleapis.com/auth/calendar',
		'https://mail.google.com/mail/feed/atom',
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/orkut',
		'https://picasaweb.google.com/data/',
		'https://www.googleapis.com/auth/tasks',
		'https://gdata.youtube.com',
		'https://www.googleapis.com/auth/adsense',
		'https://www.googleapis.com/auth/gan',
		'https://www.googleapis.com/auth/analytics.readonly',
		'https://www.googleapis.com/auth/books',
		'https://www.googleapis.com/auth/devstorage.read_write',
		'https://www.googleapis.com/auth/structuredcontent',
		'https://www.googleapis.com/auth/chromewebstore.readonly',
		'https://docs.google.com/feeds/',
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/latitude.all.best',
		'https://www.googleapis.com/auth/latitude.all.city',
		'https://www.googleapis.com/auth/moderator',
		'https://sites.google.com/feeds/',
		'https://spreadsheets.google.com/feeds/',
		'https://www.googleapis.com/auth/urlshortener',
		'https://www.google.com/webmasters/tools/feeds/' ] 
	}	

> The example above shows all possible `scopes` with this strategy. That would be the result of checking all options on the configuration screen. `client_id` and `client_secret` are obtained through the Google API Console. See [here](goog-clientid) for instructions.

######Google OpenId

	{
		"email":true,
		"family_name":true,
		"name":true,
		"given_name":true,
		"nick_name":true
	}

> In a Google OpenID connection, these properties all always true

######Microsoft Account

	{
		"client_id": MSFT-ACCOUNT-CLIENT-ID,
		"client_secret":MSFT-ACCOUNT-CLIENT-SECRET,
		"basic":true/false,
		"signin":true/false,
		"offline_access":true/false,
		"birthday":true/false,
		"calendars":true/false,
		"calendars_update":true/false,
		"contacts_birthday":true/false,
		"contacts_create":true/false,
		"contacts_calendar":true/false,
		"contacts_photos":true/false,
		"contacts_skydrive":true/false,
		"emails":true/false,
		"events_create":true/false,
		"messenger":true/false,
		"phone_numbers":true/false,
		"photos":true/false,
		"postal_addresses":true/false,
		"share":true/false,
		"skydrive":true/false,
		"skydrive_update":true/false,
		"work_profile":true/false,
		"applications":true/false,
		"applications_create":true/false,
		"scope":["wl.basic","wl.signin","wl.offline_access","wl.birthday","wl.calendars","wl.calendars_update","wl.contacts_birthday","wl.contacts_create","wl.contacts_calendar","wl.contacts_photos","wl.contacts_skydrive","wl.emails","wl.events_create","wl.messenger","wl.phone_numbers","wl.photos","wl.postal_addresses","wl.share","wl.skydrive","wl.skydrive_update","wl.work_profile","wl.applications","wl.applications_create"]
	}

> In this example, all possible scopes are shown. That would be the result of checking all options on the configuration screen.

####Get a specific Connection

	GET https://@@account.namespace@@/api/connections/{A-CONNECTION-NAME}/?access_token=...


####Delete a connection
A DELETE operation against the `connections` resource will eliminate the connection definition permanently. The parameter for this operation is the name of the connection to delete.

	DELETE https://@@account.namespace@@/api/connections/{A-CONNECTION-NAME}/?access_token=...


If the operation is successful, you will get a confirmation object in the response body:

	{
		"removed": {id}
	}

> Notice that batch operations are not supported yet.

####Create a new Connection

To create a new connection, POST a connection object the the `connections` resource:

	POST https://@@account.namespace@@/connections
	Content-Type: application/json

The body of the request will in essence be a `connection` object. For example, this will create a new connection to Google Apps, initially inactive (notice the status=0):

	{
	  "name": A-NAME-FOR-THIS-CONNECTION
	  "status": 1,
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

####Updating a Connection

For updates, you need to use the PUT operation. PUTs also work on a specific `connection` and therefore they need the connection `name`. You will need to submit the entire entity as you intend it to be.

### Users
|Verb	 |URL 													 		  |Description																																																																   |
|========|================================================================|============================================================================================================================================================================================================================================================================|
|`GET`	 |https://@@account.namespace@@/api/users 						  |Gets all users who have logged in through any of your connections.																																																		   |
|`GET`	 |https://@@account.namespace@@/api/connections/{connection}/users|Gets all users from an enterprise directory like Office365 / Windows Azure Active Directory or a Google Apps domain. *Note:* If the connection does not support querying for users (for instance ADFS), it will return the users who have logged in through that connection.|
|`GET`	 |https://@@account.namespace@@/api/socialconnections/users       |Gets all users who have logged in through any of the enabled social connections.																																															   |

####User object

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

Most attributes in the `user` object are self-explanatory. Some comments below:

|Parameter       | Description																 										  	    |
|================|==========================================================================================================================|
|`issuer`		 | The name of the authentication server. In the example above it is the name of the ADFS server used by Fabrikam.			|
|`user_id`	     | This would be something like: the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml 				|
|`picture`		 | The URL to the user gravatar if available.																				|
|`user_id`		 | A "friendly" unique identifier = strategy + a unique identifier from the `issuer` (e.g. e-mail, etc.)		 			|

####Other resources

* [Auth0 node module](node-auth0client). A simple client library for Node.js apps.
