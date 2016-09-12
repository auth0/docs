---
description: How to add scopes to your IdP connection.
---

# Add scopes/permissions to call  Identity Provider's APIs

Once user is logged in, you can get the user profile and then the associated `accessToken` to call the Identity Provider APIs as described in: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api)

However, if you are receiving `Access Denied` when calling the IdP API, you probably have not requested the correct permissions for the user during login.

To configure the scopes/permissions needed from the user, go to the [Connections > Social](${manage_url}/#/connections/social) section of Auth0 Dashboard. There, you can click on an IdP to select the particular scopes required. 

For example, if you click the Facebook connection, you can select the required scopes listed in the configuration pop-up:

![Scopes for Facebook](/media/articles/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp/scopes.png)
