---
title: Pass Parameters to Identity Providers
description: How to pass parameters to an Identity Provider API
contentType: how-to
useCase:
  - customize-connections
  - add-idp
---
# Pass Parameters to Identity Providers

You can pass provider-specific parameters to an Identity Provider during authentication. The values can either be static per connection or dynamic per user. Note the following restrictions:

- Only [valid OAuth 2.0/OIDC parameters](http://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint) are accepted.
- Not all Identity Providers support upstream parameters. Check with the specific Identity Provider before you proceed with your implementation.
- SAML identity providers, in particular, do not support upstream parameters.

## Static parameters

You can configure static parameters per connection with the Connections endpoints of our [Management API](/api/management/v2). Each time your connection is used, the specified parameters will be sent to the Identity Provider.

When you [create](/api/management/v2#!/Connections/post_connections) or [update](/api/management/v2#!/Connections/patch_connections_by_id) a connection, use the `upstream_params` element of the `options` attribute.

### Example: WordPress
As an example, let's use WordPress, which allows you to pass an optional `blog` parameter to its OAuth 2.0 authorization endpoint (for more information, see [WordPress's OAuth 2.0 documentation](https://developer.wordpress.com/docs/oauth2/)).

Let's assume that you have a working WordPress connection and you want to always request that users have access to the `myblog.wordpress.com` blog when logging in with it. To do this, assign WordPress's `blog` parameter a default value of `myblog.wordpress.com`.

First, we will use the [Get Connection](/api/management/v2#!/Connections/get_connections_by_id) endpoint, to retrieve the existing values of the `options` object. This is mandatory since the [Update Connection](/api/management/v2#!/Connections/patch_connections_by_id) endpoint, which we will use next, overrides this object will be overridden, so if parameters are missing they will be lost after the update.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/connections/YOUR-WORDPRESS-CONNECTION-ID",
  "headers": [
    {
      "name": "Authorization",
      "value": "Bearer YOUR_ACCESS_TOKEN"
    },
    {
      "name": "Content-Type",
      "value": "application/json"
    }
  ]
}
```

Let's say that the `options` contents for our wordpress connection are the following:

```text
{
  "options": {
    "client_id": "", 
    "profile": true, 
    "scope": ["profile"]
  }
}
```

Now we can send the update request, copying the existing `options` contents and adding also the `blog` parameter.

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/YOUR-WORDPRESS-CONNECTION-ID",
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
    "text": "{\"options\":{\"client_id\":\"\",\"profile\":true,\"scope\":[\"profile\"],\"upstream_params\":{\"blog\":{\"value\":\"myblog.wordpress.com\"}}}}"
  }
}
```

Now every time a user authenticates with this connection the request to Wordpress will include the query parameter `blog=myblog.wordpress.com`.

## Dynamic parameters

You can configure upstream parameters per user. This way when a user authenticates, the parameters will be dynamically added to the authorization query.

To do this, use the `upstream_params` element of the `options` attribute to specify a mapping between one of the existing accepted parameters to the parameter accepted by the Identity Provider.

### Field list

Here are fields available for the `enum` parameter:

* `acr_values`
* `audience`
* `client_id`
* `display`
* `id_token_hint`
* `login_hint`
* `max_age`
* `prompt`
* `resource`
* `response_mode`
* `response_type`
* `ui_locales`

### Example: Twitter

As an example, let's use Twitter, which allows you to pass an optional `screen_name` parameter to its OAuth authorization endpoint (for more information, see [Twitter's API reference](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authorize)). 

To continue, you should already have a working Twitter connection; to learn how to configure one, see [Connect Your App to Twitter](/connections/social/twitter).

Twitter's `screen_name` parameter pre-fills the username input box of the login screen with the given value, so we want to map it to the existing accepted parameter of `login_hint`.

Let's assume that you already retrieved the contents of the `options` object (like we did in the previous paragraph) and they are the following:

```text
"options": {
  "client_id": "thisismyid",
  "client_secret": "thisismysecret",
  "profile": true
}
```

Send the update request, copying the existing `options` contents and adding also the `screen_name` parameter.

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/YOUR-TWITTER-CONNECTION-ID",
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
    "text": "{\"options\": {\"client_id\": \"thisismyid\", \"client_secret\": \"thisismysecret\", \"profile\": true, \"upstream_params\": {\"screen_name\": {\"alias\": \"login_hint\"}}}}"
  }
}
```

Now, when you call the [Authorize endpoint](/api/authentication#authorize-application) for a specific user, you can pass their email address in the `login_hint` parameter.

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
