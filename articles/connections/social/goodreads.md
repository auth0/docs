---
title: Connect your app to Goodreads
connection: Goodreads
image: /media/connections/goodreads.png
seo_alias: goodreads
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
# Connect your app to Goodreads

This doc refers to the steps required to configure a Goodreads social connection in your Auth0 [dashboard](${manage_url}). If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

To configure a Goodreads connection with Auth0, you will need to register your app on the Goodreads developers site.

## 1. Apply for a developer key

Log into the [Goodreads developer site](https://www.goodreads.com/api), and select *developer key*:

![Apply for a developer key](/media/articles/connections/social/goodreads/goodreads-register-1.png)

## 2. Enter information about your app

Complete the form then click **Apply for a Developer Key**. Enter your <dfn data-key="callback">callback URL</dfn> in the `Callback URL` field:

```text
https://${account.namespace}/login/callback
```

<%= include('../_find-auth0-domain-redirects') %>

![Enter information about your app](/media/articles/connections/social/goodreads/goodreads-register-2.png)

## 3. Get your Consumer Key and Consumer Secret

Once the application is registered, the **Key** and **Secret** for your new app will be displayed on the following page:

![Get your Consumer Key and Consumer Secret](/media/articles/connections/social/goodreads/goodreads-register-3.png)

## 4. Create the Goodreads connection

You will need to use [this endpoint of our Management API v2](/api/management/v2#!/Connections/post_connections) to create a custom `oauth1` connection for Goodreads.

[Read our documentation on creating generic OAuth1 connections](/tutorials/adding-generic-oauth1-connection) for more information on the individual fields used in the sample payload to follow. For Goodreads, this is a sample payload to create the connection:

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
You have to replace `YOUR_API_V2_TOKEN_HERE` with a Management API v2 token. For more information on how to get one see [Access Tokens for the Management API](/api/management/v2/tokens).
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

## 5. Test the connection

You can use the [/authorize endpoint](/api/authentication?shell#authorize-application) with custom `client_id` and `connection` parameters to test your connection. For example:

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
