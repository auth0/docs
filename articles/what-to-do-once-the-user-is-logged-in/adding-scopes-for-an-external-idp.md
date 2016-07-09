# Adding scopes/permissions to call an external IdP's APIs

The user is logged in. This means we can get the user's profile and his `accessToken` so that we can call the IdP (Facebook, Github, etc.) APIs.

> You can read [this article](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) If you don't know how to get the `accessToken` or how to call an IdP's API

However, when we try to call the API, we're getting Access Denied. This is probably because we haven't asked for the right permissions to the user when they were logging in.

In order to configure what scopes/permissions we need from the user, we must go to the [Connections](${uiURL}/#/connections/social) section in Auth0 Dashboard. In there, we can expand any of the Identity Providers and then choose the particular scopes we need. For example, for facebook, we can add new scopes as follows:

![Scopes for facebook](/media/articles/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp/scopes.gif)
