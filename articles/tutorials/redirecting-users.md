---
description: How to handle returning users after authentication.
---

# Redirect Users After Login

To make your login process as easy-to-use and seamless as possible, you'll need provide Auth0 with explicit information on redirecting users back to your application after authentication.

When implementing Auth0, please note that the `redirect_uri` field is actually used as a callback URL. Auth0 invokes callback URLs after the authentication process and are where your application gets routed. Because callback URLs can be manipulated by unauthorized parties, Auth0 recognizes only whitelisted URLs set in the `Allowed Callback URLs` field of a [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings) as valid.

The callback URL is not necessarily the same URL to which you want users redirected after authentication.

## Redirect Users to a Non-Callback URL

If you want to redirect authenticated users to a URL that is *not* the callback URL, you can do so using one of the following methods.

### Store the Desired URL in the `state` Parameter

The [`state` parameter](/protocols/oauth-state) is one of the supported Auth0 [Authentication Parameters](/libraries/lock/v10/sending-authentication-parameters). You can use this field to hold multiple values such as a JSON object that holds the URL you want to bring the user to.

```
state = {
   "auth0_authorize": "xyzABC123",
   "return_url": "https://yoursite.com/home"
}
```

To send the `state` parameter, [add it to the `options` object](/libraries/lock/v10/sending-authentication-parameters). For additonal information on where to modify `options`, please see the doc on [Getting Started with Lock](/libraries/lock/v10#start-using-lock).

After a successful request, you can used the `return_url` encapsulated in the returned `state` value to redirect users to the appropriate URL.

### Store the Desired URL in Web Storage

You can store the desired URL in web storage to be used after authentication. Storing a URL using this method is similar to [storing a JWT](/security/store-tokens#where-to-store-your-jwts).  You can then create the necessary logic to obtain the stored URL to redirect your users after successful authentication.

### Use Rules

You can [configure redirection using Rules](/rules/redirect) so that Auth0 redirects users *before* the authentication translation completes. This option has the added benefit of allowing you to implement custom authentication flows that require the user's input.
