---
title: Changes to Facebook Graph API
description: The latest version of the Facebook Graph API changes what permissions and fields can be requested.
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Changes to Facebook Login and Graph API
 
The latest version of the Facebook Graph API changes what permissions and fields can be requested. We've updated Facebook Connections to reflect these changes and tweaked the connection interface for clarity.

::: note
[Facebook Login Changelog: Recent Changes to Facebook Login](https://developers.facebook.com/docs/facebook-login/changelog#2018-07-02)
:::

This update may not require changes to your code or configuration, but your application might receive additional profile data if the existing permissions allow it. But keep in mind that:

* If your Facebook connection is configured to request one of the removed permissions, your <dfn data-key="access-token">Access Token</dfn> will not get them in <dfn data-key="scope">scope</dfn>.
* If your Facebook application is marked as "development" then you may still see an error temporarily while trying the connection.
* If you add new permissions to the connection, end users will be prompted for consent next time they log in. See the Facebook documentation for how to handle actions for users that don't have a specific permission.
 
## Facebook Login Permissions
 
[Facebook Login permissions](https://developers.facebook.com/docs/facebook-login/permissions) are requested by your application when a user logs in using Facebook. If the user is logging in for the first time or if the permissions have changed, they will be shown a consent window in Facebook showing the new permissions requested. Once those permissions are granted, your application can then act on behalf of that user with a Facebook access token.
 
The Facebook Connection interface has been updated to show both the regular name as well as the machine name for all permissions displayed. This makes it easier to find the permissions you need and map that to any code you might be running using these permission names.

![Facebook Connection Permissions](/media/articles/connections/social/facebook/facebook-connection-permissions.png)
 
### Permissions added
 
The following permissions were added to the Facebook connection interface:

- business_management
- groups_access_member_info
- leads_retrieval
- pages_manage_instant_articles
- publish_to_groups
- publish_to_groups
- user_age_range
- user_gender
- user_link
 
### Permissions removed
 
The following permissions were removed from the Facebook connection interface:
 
- read_custom_friendlists
- rsvp_event
- user_about_me
- user_actions-books
- user_actions-fitness
- user_actions-music
- user_actions-news
- user_actions-video
- user_education_history
- user_games_activity
- user_relationship_details
- user_relationships
- user_religion_politics
- user_website
- user_work_history
 
### Permissions moved to deprecated
 
The following permissions were moved to the **Deprecated** section and should not be used with the latest version of the Graph API:
 
- publish_actions
- user_managed_groups
 
## Facebook Graph API Fields
 
The [Facebook Graph API](https://developers.facebook.com/docs/graph-api/reference/v3.2/user) is used after a user logs in to retrieve profile data for the Auth0 user. The user data permissions requested determine what information is retrieved from the Graph API. The fields that are returned depend on the permissions requested and the existence of those fields in the Facebook user profile.
 
This change upgraded the Graph API from v2.8 to v3.2 and will ask for the following user data fields on login:
 
- address (added)
- age_range
- birthday
- context
- cover
- currency (added)
- devices
- email
- favorite_athletes
- favorite_teams
- first_name
- gender
- hometown
- id
- inspirational_people
- install_type (added)
- installed
- is_verified
- languages
- last_name
- link
- locale
- location
- meeting_for (added)
- middle_name
- name
- name_format
- picture
- public_key (added)
- quotes
- security_settings (added)
- short_name (added)
- significant_other
- sports (added)
- third_party_id
- timezone
- updated_time
- verified
- video_upload_limits (added)
- viewer_can_send_gift (added)
