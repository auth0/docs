---
title: Connect Apps to Goodreads
connection: Goodreads
image: /media/connections/goodreads.png
seo_alias: goodreads
index: 17
description: How to obtain a Consumer Key and Consumer Secret for Goodreads.
topics:
  - connections
  - social
  - goodreads
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to Goodreads

You can add functionality to your web app that allows your users to log in with Goodreads. 

## Prerequisites

Before you connect your Auth0 app to Goodreads, you must have a [Goodreads Developer](https://www.goodreads.com/api) account.

## Steps

To connect your app to Goodreads, you will:

1. [Set up your app in Goodreads](#set-up-your-app-in-Goodreads)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Goodreads

1. Log in to the [Goodreads developer portal](https://www.goodreads.com/api) and select *developer key*.

2. Complete the form then click **Apply for a Developer Key**. 
3. Enter your <dfn data-key="callback">callback URL</dfn> in the `Callback URL` field: 

  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

Once the application is registered, the **Key** and **Secret** for your new app will be displayed.

### Create and enable a connection in Auth0

Use the [/post_connections endpoint](/api/management/v2#!/Connections/post_connections) to create a custom `oauth1` connection for Goodreads.

See [Add Generic OAuth1 Connections](/tutorials/adding-generic-oauth1-connection) for more information on the individual fields used in the sample payload to follow. For Goodreads, this is a sample payload to create the connection:

```har
 {
     "method": "POST",
     "url": "https://${account.namespace}/api/v2/connections",
     "httpVersion": "HTTP/1.1",
     "headers": [
       {
         "name": "Authorization",
         "value": "Bearer YOUR_API_V2_TOKEN_HERE"
       }
     ],
     "postData": {
       "mimeType": "application/json",
       "text": "{\"name\": \"custom-goodreads\",\"strategy\": \"oauth1\",\"enabled_clients\": [\"YOUR_ENABLED_CLIENT_ID\"],\"options\": {\"client_id\": \"YOUR_GOODREADS_KEY\",\"client_secret\": \"YOUR_GOODREADS_SECRET\",\"requestTokenURL\": \"http://www.goodreads.com/oauth/request_token\",\"accessTokenURL\": \"http://www.goodreads.com/oauth/access_token\",\"userAuthorizationURL\": \"http://www.goodreads.com/oauth/authorize\",\"scripts\": {\"fetchUserProfile\": \"function(token, tokenSecret, ctx, cb) {var OAuth = new require(\\\"oauth\\\").OAuth; var parser = require('xml2json'); var oauth = new OAuth(ctx.requestTokenURL, ctx.accessTokenURL, ctx.client_id, ctx.client_secret, \\\"1.0\\\", null, \\\"HMAC-SHA1\\\"); oauth.get(\\\"https://www.goodreads.com/api/auth_user\\\", token, tokenSecret, function(e, xml, r) { console.log(xml); if (e) return cb(e); if (r.statusCode !== 200) return cb(new Error(\\\"StatusCode: \\\" + r.statusCode)); try { var jsonResp = JSON.parse(parser.toJson(xml)); var user = jsonResp.GoodreadsResponse.user; cb(null, user); } catch (e) { console.log(e); cb(new UnauthorizedError(\\\"[+] fetchUserProfile: Goodreads fetch script failed. Check Webtask logs\\\")); } });}\"}}}"
     }
   }
 ```

::: note
Replace `YOUR_API_V2_TOKEN_HERE` with a Management API v2 access token. For more information on how to get one see [Access Tokens for the Management API](/api/management/v2/tokens).
:::

This sample uses the following `fetchUserProfile` script, you can change it as you please:

```js
function(token, tokenSecret, ctx, cb) {
    var OAuth = new require("oauth").OAuth;
    var parser = require('xml2json');
    var oauth = new OAuth(ctx.requestTokenURL, ctx.accessTokenURL, ctx.client_id, ctx.client_secret, "1.0", null, "HMAC-SHA1");
    oauth.get("https://www.goodreads.com/api/auth_user", token, tokenSecret, function(e, xml, r) {
        console.log(xml);
        if (e) return cb(e);
        if (r.statusCode !== 200) return cb(new Error("StatusCode: " + r.statusCode));
        try {
            var jsonResp = JSON.parse(parser.toJson(xml));
            var user = jsonResp.GoodreadsResponse.user;
            cb(null, user);
        }
        catch (e) {
            console.log(e);
            cb(new UnauthorizedError("[+] fetchUserProfile: Goodreads fetch script failed. Check Webtask logs"));
        }
    });
}
```

::: panel-warning Goodreads returns limited user profile data
If you have any [Rules](/rules) configured that rely on `user.email` for example, user authentication will likely fail - the sample Rule above currently only returns `user.id`, `user.name`, and `user.link` properties [from Goodreads' API](https://www.goodreads.com/api/index#auth.user). Please add appropriate error handling to any Rules or Hooks that may rely on other user-profile data that may be missing. You may use [our Real-time Webtask Logs extension](/extensions/realtime-webtask-logs) to help debug these sorts of issues further.
:::

If you do change the `fetchUserProfile` script, you can stringify the function easily for use in your `POST /api/v2/connections` payload as follows:

```js
JSON.stringify(`function(token, tokenSecret, ctx, cb) {
    // fetch user profile
}`);
```

### Test the connection

Use the [/authorize endpoint](/api/authentication?shell#authorize-application) with custom `client_id` and `connection` parameters to test your connection. For example:

```text
https://${account.namespace}/authorize?
  scope=YOUR_SCOPE&
  response_type=YOUR_RESPONSE_TYPE&
  client_id=YOUR_ENABLED_CLIENT_ID&
  redirect_uri=${account.callback}&
  connection=custom-goodreads&
  nonce=YOUR_NONCE
```

<%= include('../_quickstart-links.md') %>
