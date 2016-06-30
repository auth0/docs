---
description: How to call an Identity Provider API.
---

# Call an Identity Provider API

Identity Providers commonly expose their own API that you can call with the access token granted to each user upon successful authentication with their service.

Information on how to obtain an IdP access tokenis detailed at: [Identity Provider Access Tokens](/tokens/idp).

Once you have the access token from the IdP for the user, you can call the IdP API.

For example, to return a list of contacts for the user from Google:
  
`getGoogleContactsWithToken(googleToken);`

**NOTE:** You may need to specific scopes/permissions to call an Idp API, see: [Add scopes/permissions to call Identity Provider's APIs](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp). 

### Third-party libraries

When you need to call an external IdP that uses OAuth, you can use a third-party library that does the work for you. A non-exhaustive list of such libraries is available at [OAuth 1 and 2 Libraries](http://oauth.net/code/).
