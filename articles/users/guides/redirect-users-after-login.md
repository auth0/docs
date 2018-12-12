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

To make your login process as easy-to-use and seamless as possible, you'll need to keep track of where you want to route users inside your application once Auth0 redirects users back to your application after authentication.

## How callback URLs work

During a user's authentication, the `redirect_uri` request parameter is used as a callback URL. This is where your application will receive and process the response from Auth0, and where the users will be redirected, once the authentication is complete.

::: note
For more info on how the `redirect_uri` works, see [OAuth 2.0](/protocols/oauth2).
:::

Because callback URLs can be manipulated by unauthorized parties, Auth0 recognizes only whitelisted URLs set in the **Allowed Callback URLs** field of an [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings) as valid.

However the callback URL is not necessarily the same URL to which you want users redirected after authentication.

## How to redirect to a non-callback URL

To redirect authenticated users to a URL that is *not* the callback URL, you can store the desired URL:

- In web storage (for single page apps, running on the browser), or
- In a cookie (for regular web apps, running on the server)

You can then create the necessary logic in your application to retrieve the stored URL and redirect your users where you want.

## Keep reading

* [Redirect Users from Rules](/rules/current/redirect)
* [Redirect Users After Logout](/logout#redirect-users-after-logout)