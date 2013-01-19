---
title: Auth0 | API Reference
url: /api-reference
---
# Auth0 API Reference

### API endpoint

	https://@@account.namespace@@/api

### Authentication
Each request to the API should include an access token, either in the query string or in an ```Authorization``` header.

	https://@@account.namespace@@/api/connections/?access_token=TOKEN

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

### Headers
The only accepted header is ```Authorization``` that can be used to send the access_token instead of using the query string. All content is returned in JSON.

### Connections

|Verb	 |URL 													 		 |
|========|===============================================================|
|`GET`	 |https://@@account.namespace@@/api/connections 				 |
|`GET`	 |https://@@account.namespace@@/api/connections/{connectionName} |
|`POST`	 |https://@@account.namespace@@/api/connections 				 |
|`DELETE`|https://@@account.namespace@@/api/connections/{connectionName} |

#### List Connections

Returns a list of all defined connections in Auth0. A connection object will look like this:

	{ 
		"client_id": "@@account.clientId@@",
	    "name": YOUR-CONNECTION-NAME,
	    "options": 
     	{ 
     		...
       	},
    	status: 0,
    	strategy: STRATEGY
    }


| Parameter  | Description																	  |
|============|================================================================================|
| `client_id`| Your client_id (@@account.clientId@@), used to obtain the authentication token.|
| `name`	 | The unique name you gave to the connection. 									  |
| `status`	 | Defines whether the connection is active `1` or not `0`.      				  |
| `strategy` | The type of identity provider associated with this connection. See below for supported strategies 				  |
| `options`  | An object with properties that are dependent on the strategy selected          | 

Auth0 supports the  following strategies:

|Strategy           | Used when users are in                                        |   
|===================|===============================================================|
|office365          |Office 365 and Windows Azure Active Directory                  |
|adfs               |On-Premises Active Directory or any WS-Federation server       |
|google-apps        |Google apps                                                    |
|windowslive        |Microsoft Account (formerly LiveID)                            |
|google-openid      |Google (through OpenID protocol)                               |
|google-oauth2      |Google (through the OAuth2 protocol)	                        |

> With __office365__, __google-apps__ and __adfs__ the following properties are added to the connection object:
> `provisioning_ticket`: TICKET
> `provisioning_ticket_url`: PROVISIONING-URL

A GET against `connections` with an name specified in the path will just return the matching connection object.

---

Here are two `curl` sample scripts to get connections:

	curl https://@@account.namespace@@/api/connections/?access_token={YOUR ACCESS TOKEN} 

	curl https://@@account.namespace@@/api/connections/{YOUR-CONNECTION-NAME}?access_token={YOUR ACCESS TOKEN}

##### Options

The `options` object returned in the `connection` will be different for each strategy and will typically contain the same information you enter on the [connections](https://app.auth0.com/#/connections) screen.

###### ADFS

  	{
  		tenant_domain: A-DOMAIN,
    	adfs_server: YOUR-FEDERATION-METADATA-ENDPOINT,
    	thumbprints: 
      	[ '9b250aad7e4950604072ffaa60cde7795f23b52a',
          'f97702a42c893a0fb1bc6dad21c79fb720473a85',
          '9b250aad7e4950604072ffaa60cde7795f23b52a',
          'f97702a42c893a0fb1bc6dad21c79fb720473a85',
          '9b250aad7e4950604072ffaa60cde7795f23b52a',
          'f97702a42c893a0fb1bc6dad21c79fb720473a85',
          '9b250aad7e4950604072ffaa60cde7795f23b52a' ],
     	signInEndpoint: ADFS-LOGIN-PAGE 
    }

|Parameter       | Description																 										  	    |
|================|==========================================================================================================================|
|`tenant_domain` | The domain name of the company (e.g.: if the users emails are john@mycompany.com, then mycompany.com would be the domain)|
|`adfs_server`   | This would be something like: the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml 				|
|`signInEndpoint`| The URL of the ADFS server where Auth0 will redirect users for login. (https://the-adfs-server.company.com/adfs/ls/)		|

---

###### Google Apps

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
		scope: 
		[ 'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile' ] 
	}

> In this example, all possible scopes are shown.

---

###### Office 365

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

###### Google OAuth2

	{
		"client_id": GOOG-CLIENT-ID,
		"client_secret": GOOG-CLIENT-SECRET,
		"email":true/false,
		"profile":true/false,
		"contacts":true/false,
		"blogger":true/false,
		"calendar":true/false,
		"gmail":true/false,
		"google_plus":true/false,
		"orkut":true/false,
		"picasa_web":true/false,
		"tasks":true/false,
		"youtube":true/false,
		"adsense_management":true/false,
		"google_affiliate_network":true/false,
		"analytics":true/false,
		"google_books":true/false,
		"google_cloud_storage":true/false,
		"content_api_for_shopping":true/false,
		"chrome_web_store":true/false,
		"document_list":true/false,
		"google_drive":true/false,
		"google_drive_files":true/false,
		"latitude_best":true/false,
		"latitude_city":true/false,
		"moderator":true/false,
		"sites":true/false,
		"spreadsheets":true/false,
		"url_shortener":true/false,
		"webmaster_tools":true/false,
		"scope":["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"]
	}	

###### Google OpenId

	{
		"email":true,
		"family_name":true,
		"name":true,
		"given_name":true,
		"nick_name":true
	}

> In a Google OpenID connection, these properties all always true

###### Microsoft Account

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

#### Deleting connections
A DELETE operation against the `connections` resource will eliminate the connection definition permanently. The parameter for this operation is the name of the connection to delete.

If the operation is successful, you will get a confirmation object in the response body:

	{
		"removed": {id}
	}

> Notice that batch operations are not supported yet.

#### Creating a new Connection

To create a new connection, POST a connection object the the `connections` resource:

	https://@@account.namespace@@/connections

The body of the request will in essence be a `connection` object. For example, this will create a new connection to Google Apps, initially inactive (notice the status=0):

    var connection = {
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

#### Updating a Connection

For updates, you need to use the PUT operation. PUTs also work on a specific `connection` and therefore they need the connection `name`. You will need to submit the entire entity as you intend it to be.

#### Other resources

* [Auth0 node module](node-auth0client). A simple client library for Node.js apps.
