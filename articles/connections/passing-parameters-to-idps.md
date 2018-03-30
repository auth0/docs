# Passing Parameters to Identity Providers

For Identity Providers that support parameters, you can pass provider-specific parameters to the Authorization endpoint by configuring either static values per connection or dynamic values per user.

Only [valid OAuth 2.0/OIDC parameters](http://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint) are accepted.

Some Identity Providers do not support parameters. Check your desired Identity Provider's documentation to see if parameters are supported.

## Passing Static Parameters

To pass static parameters per connection, you can use the `upstream_params` element of the `options` attribute when configuring a connection via the Management API. Each time your connection is used, the specified parameters will be sent to the Identity Provider.

As an example, let's use WordPress, which allows you to pass an optional `blog` parameter to its OAuth 2.0 authorization endpoint (for more information, see [WordPress's OAuth 2.0 documentation](https://developer.wordpress.com/docs/oauth2/)). Let's assume that you want to always request that users have access to the `myblog.wordpress.com` blog when logging in using WordPress.

To accomplish this, you will map WordPress's `blog` parameter to the existing accepted parameter of `access_type` and assign it a default value of `myblog.wordpress.com`:

```
{
  "name": "WordPressConn",
  "strategy": "wordpress",
  "options": {
    "upstream_params": {
      "blog": {
        "alias": "access_type",
        "value": "myblog.wordpress.com"
      }
    }
  }
}
```

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ 
      \"options\": { 
        \"client_id\": \"...\", 
        \"client_secret\": \"...\", 
        \"upstream_params\": { 
          \"blog\": { 
            \"alias\": \"access_type\",
            \"value\": \"myblog.wordpress.com\"
          }
        }, 
        \"authorizationURL\": \"https://public-api.wordpress.com/oauth2/authorize\", 
        \"tokenURL\": \"https://public-api.wordpress.com/oauth2/token\",
        \"scope\": \"auth\" 
      } 
    }"
  }
}
```

You can test out your code and see other available attributes in our [Management API Explorer](https://auth0.com/docs/api/management/v2#!/Connections/post_connections).


## Passing Dynamic Parameters

Sometimes you may want to configure parameters per user. To do this, use the `upstream_params` element of the `options` attribute to specify a mapping between one of the existing accepted parameters to the parameter accepted by the Identity Provider. Then, when authorizing the user, dynamically add parameters to the authorization query.

As an example, let's use Twitter, which allows you to pass an optional `screen_name` parameter to its OAuth authorization endpoint (for more information, see [Twitter's API reference](https://developer.twitter.com/en/docs/basics/authentication/api-reference/authorize)). Twitter's `screen_name` parameter pre-fills the username input box of the login screen with the given value, so we want to map it to the existing accepted parameter of `login_hint`.

```
{
  "name": "TwitterConn",
  "strategy": "twitter",
  "options": {
    "upstream_params": {
      "screen_name": {
        "alias": "login_hint"
      }
    }
  }
}
```

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ 
      \"options\": { 
        \"client_id\": \"...\", 
        \"client_secret\": \"...\", 
        \"upstream_params\": { 
          \"screen_name\": { 
            \"alias\": \"login_hint\" 
          } 
        },  
        \"authorizationURL\": \"https://api.twitter.com/oauth/authorize\",
        \"tokenURL\": \"https://api.twitter.com/oauth/request_token\" 
      } 
    }"
  }
}
```

Now, when calling the /authorize endpoint for a specific user, you can pass their email address in the `login_hint` parameter:

```text
https://customer0.myauth0.com/authorize
  ?client_id=CLIENT_ID
  &response_type=token
  &redirect_uri=http://URI
  &scope=openid%20name%20email
  &login_hint=john@gmail.com
```

And that value will in turn be passed along to the Twitter authorization endpoint in the `screen_name` parameter:

```text
https://api.twitter.com/oauth/authorize
  ?oauth_token=TOKEN
  &screen_name=john@gmail.com
```

