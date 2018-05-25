---
title: Pass Parameters to Identity Providers
description: How to pass parameters to an Identity Provider API
---
# Pass Parameters to Identity Providers

You can pass provider-specific parameters to an Identity Provider, during authentication.

The values can either be static per connection or dynamic per user.

Note the following restrictions:
- Only [valid OAuth 2.0/OIDC parameters](http://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint) are accepted.
- Not all Identity Providers support upstream parameters. Check with the specific Identity Provider before you proceed with your implementation.

## Static parameters

You can configure static parameters per connection with the Connections endpoints of our [Management API](/api/management/v2). Each time your connection is used, the specified parameters will be sent to the Identity Provider.

When you [create](/api/management/v2#!/Connections/post_connections) or [update](/api/management/v2#!/Connections/patch_connections_by_id) a connection, use the `upstream_params` element of the `options` attribute.

As an example, let's use WordPress, which allows you to pass an optional `blog` parameter to its OAuth 2.0 authorization endpoint (for more information, see [WordPress's OAuth 2.0 documentation](https://developer.wordpress.com/docs/oauth2/)). 

To continue, you should already have a working Wordpress connection; to learn how to configure one, see [Connect Your App to WordPress](/connections/social/wordpress).

Let's assume that you want to always request that users have access to the `myblog.wordpress.com` blog when logging in using WordPress. To accomplish this, you will assign WordPress's `blog` parameter a default value of `myblog.wordpress.com`.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/connections/",
  "headers": [
    {
      "name": "Authorization",
      "value": "Bearer YOUR_ACCESS_TOKEN"
    },
    {
      "name": "Content-Type",
      "value": "application/json"
    }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"name\": \"WPConn\",\"strategy\": \"wordpress\",\"options\": {\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"upstream_params\": {\"blog\": {\"value\": \"myblog.wordpress.com\"}},\"authorizationURL\": \"https://public-api.wordpress.com/oauth2/authorize\",\"tokenURL\": \"https://public-api.wordpress.com/oauth2/token\"}}"
  }
}
```

You can test out your code and see other available attributes in our [Management API Explorer](/api/management/v2#!/Connections/post_connections).

## Dynamic parameters

You can configure upstream parameters per user. This way when a user authenticates, the parameters will be dynamically added to the authorization query.

To do this, use the `upstream_params` element of the `options` attribute to specify a mapping between one of the existing accepted parameters to the parameter accepted by the Identity Provider.

As an example, let's use Twitter, which allows you to pass an optional `screen_name` parameter to its OAuth authorization endpoint (for more information, see [Twitter's API reference](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authorize)). 

To continue, you should already have a working Twitter connection; to learn how to configure one, see [Connect Your App to Twitter](/connections/social/twitter).

Twitter's `screen_name` parameter pre-fills the username input box of the login screen with the given value, so we want to map it to the existing accepted parameter of `login_hint`.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/connections/",
  "headers": [
    {
      "name": "Authorization",
      "value": "Bearer YOUR_ACCESS_TOKEN"
    },
    {
      "name": "Content-Type",
      "value": "application/json"
    }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"name\": \"TwitterConn\",\"strategy\": \"twitter\",\"options\": {\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"upstream_params\": {\"screen_name\": {\"alias\": \"login_hint\"}},\"authorizationURL\": \"https://api.twitter.com/oauth/authorize\",\"tokenURL\": \"https://api.twitter.com/oauth/request_token\"}}"
  }
}
```

Now, when you call the [/authorize endpoint](/api/authentication#authorize-client) for a specific user, you can pass their email address in the `login_hint` parameter.

```text
https://${account.namespace}/authorize
  ?client_id=${account.clientId}
  &response_type=token
  &redirect_uri=${account.callback}
  &scope=openid%20name%20email
  &login_hint=john@gmail.com
```

And that value will in turn be passed along to the Twitter authorization endpoint in the `screen_name` parameter.

```text
https://api.twitter.com/oauth/authorize
  ?oauth_token=YOUR_TOKEN
  &screen_name=john@gmail.com
```
