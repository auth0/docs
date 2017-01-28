---
url: /examples
section: oauth
description: This document covers generic OAuth 1.0/2.0 examples.
---

# Add Additional OAuth Providers to Your Management Dashboard

Adding [OAuth 1.0](/oauth1) and [OAuth 2.0](/oauth2) providers as Connections allow you to support providers that are not currently built-in to the [Auth0 Management Dashboard](${manage_url}).

This document covers examples of OAuth 1.0/2.0 Connections that you can create by making the appropriate `POST` call to the [Auth0 APIv2's Connections endpoint](/api/v2#!/Connections/post_connections). Please note that doing so requires an [APIv2 token](/api/v2/tokens) with `create:connections` scope.

```har
{
    "method": "POST",
    "url": "https://YOURACCOUNT.auth0.com/api/v2/connections",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer ABCD" }
    ],
    "queryString" : [],
    "postData": {
      "mimeType": "application/json",
      "text" : "{ \"name\": \"\", \"strategy\": \"\", \"options\": { \"\" }, \"enabled_clients\": [\"\"] }"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

Please see the following docs for information on creating specific OAuth providers:

* [DigitalOcean](/oauth/examples/digitalocean)
* [Dribble](/oauth/examples/dribbble)
* [Imgur](/oauth/examples/imgur)
* [JIRA](/oauth/examples/jira)
* [Tumblr](/oauth/examples/tumblr)
* [Twitch](/oauth/examples/twitch)
* [Uber](/oauth/examples/uber)
* [Vimeo](/oauth/examples/vimeo)
* [Xing](/oauth/examples/xing)
