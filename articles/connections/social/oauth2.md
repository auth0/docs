---
title: Add a generic OAuth2 Authorization Server to Auth0
connection: Generic OAuth2 Provider
image: /media/connections/oauth2.png
seo_alias: oauth2
toc: true
index: 13
description: You can add any OAuth2 provider using the Auth0 Custom Social Connections extension.
topics:
  - connections
  - social
  - oauth2
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Add a generic OAuth2 Authorization Server to Auth0

The most common [identity providers](/identityproviders) are readily available on Auth0's dashboard. However, you can add any other OAuth2 provider using the **Custom Social Connections** [extension](${manage_url}/#/extensions). For details on how to install and configure the extension, refer to [Auth0 Extension: Custom Social Connections](/extensions/custom-social-extensions).

## The fetch user profile script

A custom fetch user profile script is called after the user has logged in with the OAuth2 provider. Auth0 executes this script to call the OAuth2 provider API and get the user profile:

```js
function(access_token, ctx, callback){
  // call the oauth2 provider and return a profile
  // here we are returning a "mock" profile, you can use this to start with to test the flow.
  var profile = {
    user_id: '123',
    given_name: 'Eugenio',
    family_name: 'Pace',
    email: 'eugenio@mail.com'
  };

  callback(null, profile);
}
```

The `access_token` parameter is used for authenticating requests to the provider's API.

::: note
We recommend using the field names from the [normalized profile](/users/normalized).
:::

For example, the following code will retrieve the user profile from the **GitHub** API:

```js
function(access_token, ctx, callback) {
    request.get('https://api.github.com/user', {
        'headers': {
            'Authorization': 'Bearer ' + access_token,
            'User-Agent': 'Auth0'
        }
    }, function (e, r, b) {
        if (e) {
            return callback(e);
        }
        if (r.statusCode !== 200) {
            return callback(new Error('StatusCode:' + r.statusCode));
        }
        callback(null, JSON.parse(b));
    });
}
```

You can filter, add or remove anything from the profile returned from the provider. However, it is recommended that you keep this script as simple as possible. More sophisticated manipulation of user information can be achieved through the use of [Rules](/rules). One advantage of using Rules is that they apply to *any* connection.

### Fetch user profile for OIDC-conformant OAuth2 providers

If the OAuth2 provider is OIDC-conformant, such as another Auth0 tenant, you can extract the user profile from the ID Token. The `ctx` object in the fetch user profile script will have the ID Token. You can then decode the token and map its fields to the user object. For example:

```js
function(access_token, ctx, callback) {
  var jwt = require("jsonwebtoken");
  const idToken = jwt.decode(ctx.id_token);
  const profile = {
    "user_id": idToken.sub,
    "name": idToken.name,
    "given_name": idToken.given_name,
    "family_name": idToken.family_name,
    "middle_name": idToken.middle_name,
    "nickname": idToken.nickname,
    "preferred_username": idToken.preferred_username,
    "profile": idToken.profile,
    "picture": idToken.picture,
    "website": idToken.website,
    "email": idToken.email,
    "email_verified": idToken.email_verified,
    "gender": idToken.gender,
    "birthdate": idToken.birthdate,
    "zoneinfo": idToken.zoneinfo,
    "locale": idToken.locale,
    "phone_number": idToken.phone_number,
    "phone_number_verified": idToken.phone_number_verified,
    "address": idToken.address,
    "updated_at": idToken.updated_at
  };
  console.log(JSON.stringify(profile, null, 2));
  callback(null, profile);
}
```

## Log in using the custom connection

You can use any of the Auth0 standard mechanisms (such as direct links, <dfn data-key="lock">[Auth0 Lock](/libraries/lock)</dfn>, [auth0.js](/libraries/auth0js), and so on.) to login a user with the your custom connection.

A direct link would look like:

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
  &connection=THE_NAME_OF_THE_CONNECTION
  &state=OPAQUE_VALUE
```

To add a custom connection in Lock, you can add a custom button by following the instructions at [Adding custom connections to lock](/libraries/lock/v9/ui-customization#adding-a-new-ui-element-using-javascript) and using this link as the button `href`.

## Pass provider-specific parameters

You can pass provider-specific parameters to the Authorization endpoint of an OAuth 2.0 providers. These can be either static or dynamic.

### Pass static parameters

To pass any static parameters, you can use the `authParams` element of the `options` when configuring an OAuth 2.0 connection via the [Management API](/api/management/v2#!/Connections/patch_connections_by_id).

Let's use WordPress as an example, which allows you to pass an optional `blog` parameter to their OAuth 2.0 authorization endpoint (see their [OAuth 2.0 documentation](https://developer.wordpress.com/docs/oauth2/) for more information). Let's assume that you want to always request a user to grant access to the `myblog.wordpress.com` blog when logging in using WordPress. 

Using the Management API, you can configure the WordPress connection to always pass this value in the `blog` parameter when authorizing a user via WordPress.

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"options\": { \"client_id\": \"...\", \"client_secret\": \"...\", \"authParams\": { \"blog\": \"myblog.wordpress.com\" }, \"scripts\": { \"fetchUserProfile\": \"...\" }, \"authorizationURL\": \"https://public-api.wordpress.com/oauth2/authorize\", \"tokenURL\": \"https://public-api.wordpress.com/oauth2/token\", \"scope\": \"auth\" }, \"enabled_clients\": [ \"...\" ] }"
  }
}
```

### Pass dynamic parameters

There are certain circumstances where you may want to pass a dynamic value to OAuth 2.0 Identity Provider. In this case you can use the `authParamsMap` element of the `options` to specify a mapping between one of the existing additional parameters accepted by [the Auth0 `/authorize` endpoint](/api/authentication#social) to the parameter accepted by the Identity Provider.

Using the same example of WordPress above, let's assume that you want to pass the `blog` parameter to WordPress, but you want to specify the actual value of the parameter when calling the Auth0 `/authorize` endpoint.

In this case you can use one of the existing addition parameters accepted by the `/authorize` endpoint, such as `access_type`, and map that to the `blog` parameter being passed to WordPress:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"options\": { \"client_id\": \"...\", \"client_secret\": \"...\", \"authParamsMap\": { \"blog\": \"access_type\" }, \"scripts\": { \"fetchUserProfile\": \"...\" }, \"authorizationURL\": \"https://public-api.wordpress.com/oauth2/authorize\", \"tokenURL\": \"https://public-api.wordpress.com/oauth2/token\", \"scope\": \"auth\" }, \"enabled_clients\": [ \"...\" ] }"
  }
}
```

Now when calling the `/authorize` endpoint you can pass the name of the blog in the `access_type` parameter, and that value will in turn be passed along to the WordPress authorization endpoint in the `blog` parameter:

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
  &connection=wordpress
  &access_type=myblog.wordpress.com
  &state=OPAQUE_VALUE
```

## Pass Extra Headers

In some instances you will need to pass extra headers to the Token endpoint of an OAuth 2.0 provider. To configure extra headers, open the Settings for the Connection and in the **Custom Headers** field, specify a JSON object with the custom headers as key-value pairs:

```json
{
    "Header1" : "Value",
    "Header2" : "Value"
    // ...
}
```

Let us use an example where an Identity Provider may require you to pass an `Authorization` header with [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) credentials. In this scenario you can specify the following JSON object in the **Custom Headers** field:

```json
{
  "Authorization": "Basic [your credentials]"
}
```

Where `[your credentials]` is the actual credentials which you need to send to the Identity Provider.

## Keep Reading

::: next-steps
* [Customizing buttons for connections in Lock](/libraries/lock/v11/ui-customization#authbuttons-object-)
* [Generic OAuth2 or OAuth1 examples](/oauth2-examples)
* [Identity Providers supported by Auth0](/identityproviders)
* [Identity Protocols supported by Auth0](/protocols)
* [Add a generic OAuth1 Authorization Server to Auth0](/oauth1)
:::
