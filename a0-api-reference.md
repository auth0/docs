# Auth0 API Reference

### API endpoint

		https://@{account.namespace}/api

### Authentication
API calls should include a token in the query string for authentication. 

		https://@{account.namespace}/api/RESOURCE/?access_token=TOKEN

A token can be obtained by POSTing:

      'client_id':     @{account.clientID},
      'client_secret': @{account.clientSecret},
      'type':          'web_server',
      'grant_type':    'client_credentials'

to the OAuth token endpoint:

		https://@{account.namespace}/oauth/token

The response body of this POST will be a JSON object with the following content:

		{
			'access_token': TOKEN
			'token_type':'bearer'
		}

###Resources

		/api/connections
		/api/connections/{connection_id}

####GET
A GET against the ``connections`` resource returns a list of connection objects:

		{
			"_id":ID,
			"client_id": @{account.clientId}
			"name": YOUR CONNECTION NAME,
			"options": { ... },
			"status":1,
			"strategy": STRATEGY,
			"tenant": @{account.tenant}
		}

* `_id`: is a unique identifier for this connection

* `client_id` is your client_id (@{account.clientId}, used to obtain the authentication token)

* `name` is the name you gave to the connection

* `status` defines whether the connection is active (1) or not (0)

* `strategy` defines what type of identity provider is associated with this connection. Auth0 supports the following strategies:
	* office365
	* windowslive
	* google-apps
	* google-openid
	* google-oauth2
	* facebook

> With __office365__ and __google-apps__ the following properties are added to the connection object:

>		provisioning_ticket: TICKET
>		provisioning_ticket_url: PROVISIONING URL

* `tenant` is the name you defined when you subscribed to Auth0 (@account.tenant).

* `options` is an object with properties that are dependent on the strategy selected. 

A GET against `connections`` with an ID specified in the path will just return the matching connection object.

### Options

#### Office 365

		{
			"client_id": OFFICE 365 CLIENT ID,
			"client_secret": OFFICE 365 CLIENT SECRET,
			"tenant_domain": CONNECTION DOMAIN ON OFFICE 365,
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
			"appDomain": @{account.namespace},
			"thumbprints":[TH_1, TH_2, TH_3]
		}

#### Google OAuth2

		{
			"client_id": GOOG CLIENT ID,
			"client_secret": GOOG CLIENT SECRET,
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

#### Google OpenId

		{
			"email":true,
			"family_name":true,
			"name":true,
			"given_name":true,
			"nick_name":true
		}

> These properties all always true

#### Microsoft Account

		{
			"client_id": MSFT ACCOUNT CLIENT ID,
			"client_secret":MSFT ACCOUNT CLIENT SECRET,
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
> In this example, all possible scopes are shown.

#### Google Apps

		{
			"client_id": GOOG APPS CLIENT_ID,
			"client_secret": GOOG APPS CLIENT_SECRET,
			"tenant_domain": CONNECTION DOMAIN IN GOOG APPS,
			"email":true/false,
			"profile":true/false,
			"ext_groups":true/false,
			"ext_is_admin":true/false,
			"ext_is_suspended":true/false,
			"ext_agreed_terms":true/false,
			"user_provisioning":true/false,
			"groups_provisioning":true/false,
			"nicknames_provisioning":true/false,
			"scope":["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile","https://apps-apis.google.com/a/feeds/user/","https://apps-apis.google.com/a/feeds/groups/","https://apps-apis.google.com/a/feeds/alias/"]
		}

> In this example, all possible scopes are shown.

#### Facebook

		{
			"app_id": FB APP ID,
			"app_secret": FB APP SECRET,
			"email":true,
			"user_about_me":true/false,
			"user_likes":true/false,
			"user_activities":true/false,
			"user_birthday":true/false,
			"user_checkins":true/false,
			"user_education_history":true/false,
			"user_events":true/false,
			"user_groups":true/false,
			"user_hometown":true/false,
			"user_interests":true/false,
			"user_location":true/false,
			"user_notes":true/false,
			"user_photos":true/false,
			"user_questions":true/false,
			"user_relationships":true/false,
			"user_relationship_details":true/false,
			"user_religion_politics":true/false,
			"user_status":true/false,
			"user_subscription":true/false,
			"user_videos":true/false,
			"user_website":true/false,
			"user_work_history":true/false,
			"friends_about_me":true/false,
			"friends_likes":true/false,
			"friends_activities":true/false,
			"friends_birthday":true/false,
			"friends_checkins":true/false,
			"friends_education_history":true/false,
			"friends_events":true/false,
			"friends_groups":true/false,
			"friends_hometown":true/false,
			"friends_interests":true/false,
			"friends_location":true/false,
			"friends_notes":true/false,
			"friends_photos":true/false,
			"friends_questions":true/false,
			"friends_relationships":true/false,
			"friends_relationship_details":true/false,
			"friends_religion_politics":true/false,
			"friends_status":true/false,
			"friends_subscription":true/false,
			"friends_videos":true/false,
			"friends_website":true/false,
			"friends_work_history":true/false,
			"publish_actions":true/false,
			"user_actions_music":true/false,
			"user_actions_news":true/false,
			"user_actions_video":true/false,
			"user_games_activity":true/false,
			"friends_actions_music":true/false,
			"friends_actions_news":true/false,
			"friends_actions_video":true/false,
			"friends_games_activity":true/false,
			"read_friendlists":true/false,
			"read_insights":true/false,
			"read_mailbox":true/false,
			"read_requests":true/false,
			"read_stream":true/false,
			"xmpp_login":true/false,
			"ads_management":true/false,
			"create_event":true/false,
			"manage_friendlists":true/false,
			"manage_notifications":true/false,
			"user_online_presence":true/false,
			"friends_online_presence":true/false,
			"publish_checkins":true/false,
			"publish_stream":true/false,
			"rsvp_event":true/false,
			"scope":"email,user_about_me,user_likes,user_activities,user_birthday,user_checkins,user_education_history,user_events,user_groups,user_hometown,user_interests,user_location,user_notes,user_photos,user_questions,user_relationships,user_relationship_details,user_religion_politics,user_status,user_subscription,user_videos,user_website,user_work_history,friends_about_me,friends_likes,friends_activities,friends_birthday,friends_checkins,friends_education_history,friends_events,friends_groups,friends_hometown,friends_interests,friends_location,friends_notes,friends_photos,friends_questions,friends_relationships,friends_relationship_details,friends_religion_politics,friends_status,friends_subscription,friends_videos,friends_website,friends_work_history,publish_actions,user_actions_music,user_actions_news,user_actions_video,user_games_activity,friends_actions_music,friends_actions_news,friends_actions_video,friends_games_activity,read_friendlists,read_insights,read_mailbox,read_requests,read_stream,xmpp_login,ads_management,create_event,manage_friendlists,manage_notifications,user_online_presence,friends_online_presence,publish_checkins,publish_stream,rsvp_event"}
		}

> In this example, all possible scopes are shown.

