---
description: How to redirect users to URLs that have not been whitelisted
topics:
  - users
  - user-management
  - redirection
contentType:
  - how-to
useCase:
  - manage-users
---
# Redirect Users After Login

To make your login process as easy-to-use and seamless as possible, you'll need to keep track of where you want to route users inside your application once Auth0 redirects users back to your application after authentication. There are two types of URLs:

* **Callback URLs**: During a user's authentication, the `redirect_uri` request parameter is used as a callback URL. This is where your application will receive and process the response from Auth0, and where the users will be redirected, once the authentication is complete.

  ::: note
  For more information on how the `redirect_uri` works, see [OAuth 2.0](/protocols/oauth2).
  :::

  Because callback URLs can be manipulated by unauthorized parties, Auth0 recognizes only whitelisted URLs set in the **Allowed Callback URLs** field of an [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings) as valid.

  However, the callback URL is not necessarily the same URL to which you want users redirected after authentication.

* **Non-callback URLs**: To redirect authenticated users to a URL that is *not* the callback URL, you can store the desired URL using the following methods:

  * For regular web apps, use a cookie or session
  * For a single-page app, use local storage in the browser
  * For a native app, use memory or local storage

  You can then create the necessary logic in your application to retrieve the stored URL and redirect your users where you want.

You can [redirect users from rules](/rules/current/redirect) or you can [redirect users with state parameters](/protocols/oauth2/redirect-users). Choose the option that works best for your application type and the flow you are using.

## Keep reading

* [Rules](/rules)
* [OAuth 2.0 Authorization Framework](/protocols/oauth2)
* [State Parameter](/protocols/oauth2/oauth-state)
* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [Redirect Users After Logout](/logout#redirect-users-after-logout)
