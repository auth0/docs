---
description: How to setup a custom error page for authorization error events.
crews: crew-2
---

# Custom Error Pages

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page. This doc will show you how to enable the use of a customized error page.

:::panel-info Default Error Pages
You can choose to display to your users the default Auth0 error page. For additional information, see [Error Pages](/hosted-pages/error-pages)
:::

## Customize Error Pages via the Management Dashboard

You can select the type of error page Auth0 displays to your users in the event of an authorization error using the Management Dashboard.

To get to the error page settings:

1.  Go to the top right-hand side of the Auth0 Management Portal
2.  Click on your user name/icon
3.  Choose "Account Settings" in the menu the pops open.

![Account Settings](/media/articles/error-pages/account-settings.png)

### Customized Error Pages

If you choose to display a custom error page, you have two options:

-  You may redirect the user to a custom error page;
-  You may configure Auth0 to render a custom error page on your behalf (please note that this feature is only available via the Management API).

#### Redirecting Users to a Custom Error Page

To redirect users to a custom error page:

1.  On the Account Settings page, scroll down to the Error Pages section.
2.  Select the option "redirect users to your own error page."
3.  Provide the URL of the error page you would like your users to see.

![Error Page Redirect Option](/media/articles/error-pages/redirect-error-page.png)

## Customizing Error Pages via the Management API

Instead of using the Management Portal, you may configure your error pages by making the appropriate `PATCH /api/v2/tenants/settings` call to the Management API.

### Redirecting Users to a Custom Error Page

To redirect users to a custom error page, update the "url" field of your JSON body to point to the location of the error page.

HTTP Request:

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/tenants/settings",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer YOUR_TOKEN" }
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

### Rendering a Custom Error Page

To provide the appropriate HTML, pass in a string containing the appropriate Liquid syntax to the "html" element:

HTTP Request:

```har
{
    "method": "PATCH",
    "url": "https://login.auth0.com/api/v2/tenants/settings",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer YOUR_TOKEN" }
    ],
    "queryString" : [],
    "postData": {
        "mimeType": "application/json",
    "text": "{\"error page\": {\"html\": \"<h1>Hello {{name}}. This error was generated {{'now' | date: '%Y %h'}}.<\\h1>\"}, \"show_log_link\": false, \"url\": \"\"}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```
