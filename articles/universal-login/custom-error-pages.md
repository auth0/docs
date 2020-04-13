---
title: Custom Error Pages
description: How to setup a custom error page for authorization error events.
toc: true
crews: crew-2
topics:
  - custom-error-pages
  - hosted-pages
contentType:
    - how-to
useCase: customize-hosted-pages
---
# Custom Error Pages

In the event of an authorization error, you may choose to display to your users either [the default Auth0 error page](/hosted-pages/error-pages) or a customized error page.

This article will show you how to use a customized error page. For details on the default Auth0 error page see [Error Pages](/hosted-pages/error-pages).

## How to customize the error page

If you choose to display a custom error page, you have two options:

-  [Redirect the user to a custom error page](#redirect-users-to-a-custom-error-page)
-  [Configure Auth0 to render a custom error page on your behalf](#render-a-custom-error-page). This feature is only available via the Management API.

### Redirect users to a custom error page

You can configure Auth0 to redirect users to a custom error page, using the Dashboard or the Management API.

If you use the Dashboard, follow these steps:

1. Log in to the [Dashboard](${manage_url}).
1. Click on your tenant name in the top right corner to bring up the associated dropdown box.
1. Select **Settings** to open the [Tenant Settings](${manage_url}/#/tenant/) page.
1. Scroll down to the Error Pages section.
1. Select the option **Redirect users to your own error page**.
1. Provide the URL of the error page you would like your users to see.

## Customize error pages via the Management API

Instead of using the Management Portal, you may configure your error pages by making the appropriate `PATCH /api/v2/tenants/settings` call to the Management API.

### Redirect users to a custom error page

To redirect users to a custom error page, update the `url` field of your JSON body to point to the location of the error page.

![Error Page Redirect Option](/media/articles/error-pages/redirect-error-page.png)

If you use the API instead, use the `PATCH /api/v2/tenants/settings` endpoint. Update the `url` field of your JSON body to point to the location of the error page.

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/tenants/settings",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer YOUR_TOKEN"},
      { "name": "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData": {
        "mimeType": "application/json",
        "text": "{\"error_page\": {\"html\": \"\", \"show_log_link\":false, \"url\": \"http://www.example.com\"}}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

### Render a custom error page

You can render your custom error page with Liquid syntax using the following variables:

* `{client_id}`
* `{connection}`
* `{lang}`
* `{error}`
* `{error_description}`
* `{tracking}`
* `{log_url}`

To provide the appropriate HTML, pass in a string containing the appropriate Liquid syntax to the `html` element:

```har
{
    "method": "PATCH",
    "url": "https://login.auth0.com/api/v2/tenants/settings",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer YOUR_TOKEN"},
      { "name": "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData": {
        "mimeType": "application/json",
    "text": "{\"error_page\": {\"html\": \"<h1>{{error}} {{error_description}} This error was generated {{'now' | date: '%Y %h'}}.</h1>\", \"show_log_link\": false, \"url\": \"\"}}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```
