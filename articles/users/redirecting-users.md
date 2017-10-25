---
description: How to handle returning users after authentication.
---
# Redirect Users After Login

To make your login process as easy-to-use and seamless as possible, you'll need to keep track of where you want to route users inside your application once Auth0  redirects users back to your application after authentication.

When implementing Auth0, please note that the `redirect_uri` field is used as a callback URL. Auth0 invokes callback URLs after the authentication process and are where your application gets routed. Because callback URLs can be manipulated by unauthorized parties, Auth0 recognizes only whitelisted URLs set in the `Allowed Callback URLs` field of a [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings) as valid.

The callback URL is not necessarily the same URL to which you want users redirected after authentication.

## Redirect Users to a Non-Callback URL

If you want to redirect authenticated users to a URL that is *not* the callback URL, you can do so using one of the following methods.

### Store the Desired URL in Web Storage

You can store the desired URL in web storage to be used after authentication. Storing a URL using this method is similar to [storing a JWT](/security/store-tokens#where-to-store-your-jwts).  You can then create the necessary logic to obtain the stored URL to redirect your users after successful authentication.

### Use Rules

You can [configure redirection using Rules](/rules/redirect) so that Auth0 redirects users *before* the authentication translation completes. This option has the added benefit of allowing you to implement custom authentication flows that require the user's input.
