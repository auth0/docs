---
description: How to setup a custom error page for authorization error events.
---

# Custom Error Pages

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page.

This document begins by covering the configuration options available to you via the Management Portal and ends with information on performing the same actions by making the appropriate calls to the Management API. If you choose to make updates via the Management API, you may use the APIv2 Explorer Page to make test calls and help generate the required HTTP PATCH call.

## Customizing Error Pages via the Management Portal

To get to the error page settings:

1.	Go to the top right-hand side of the Auth0 Management Portal
2.	Click on your user name/icon
3.	Choose "Account Settings" in the menu the pops open.

![](/media/articles/error-pages/account-settings.png)

### The Auth0 Default Error Page

You can choose to display to your users the default Auth0 error page. This page can be minimally customized with the following pieces of information (all fields optional):

-	Friendly Name: a user-friendly version of your company's name;
-	Logo URL: the path to the logo you want to show to users;
-	Support Email: the email address for your Support team;
-	Support URL: the URL of your Support team's webpage.

![](/media/articles/error-pages/error-page-settings.png)

### Customized Error Pages

If you choose to display a custom error page, you have two options:

-	You may redirect the user to a custom error page;
-	You may configure Auth0 to render a custom error page on your behalf (please note that this feature is only available via the Management API).

#### Redirecting Users to a Custom Error Page

To redirect users to a custom error page:

1.	On the Account Settings page, scroll down to the Error Pages section.
2.	Select the option "redirect users to your own error page."
3.	Provide the URL of the error page you would like your users to see.

![](/media/articles/error-pages/redirect-error-page.png)

## Customizing Error Pages via the Management API

Instead of using the Management Portal, you may configure your error pages by making a `PATCH /api/v2/tenants/settings` call to the Management API.

To assist you in creating the appropriate request, you may use the [Update Tenant Settings](/api/v2#!/Tenants/patch_settings) section of the [Management APIv2 Explorer Page](/api/v2).

Prior to beginning, please ensure that you are logged in to an account that is permitted to make changes to your Auth0 configuration. This will allow the API Explorer to dynamically generate the required [API token](/api/v2/tokens) with the necessary API Key and Secret.

### Making a Test Call or Generating the cURL Command via the API Explorer Page

1.	Under Scopes, click on "update:tenant_settings" to add the scope required for this particular endpoint to the [API token](/api/v2/tokens).
2.	Populate the `body` field with the JSON snippet that contains the information that will be used to update your configuration.
3.	Click on "TRY" to get a test response to your input.
4.	If you are satisfied with the results of your test call to the API, click "get curl command" to get the constructed call.

Sample cURL command:

```text
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{REQUEST BODY}' https://${account.namespace}/api/v2/tenants/settings
```

To assist you in customizing the required JSON snippet that you would include as the `body` parameter, the "Show samples" link in the upper right corner of the API Explorer Window will display the following sample code:

```text
{
  "error_page": {
    "html": "",
    "show_log_link": false,
    "url": "https://www.example.com/error"
  },
  "friendly_name": "Example Company",
  "picture_url": "https://example.com/logo.png",
  "support_email": "support@example.com",
  "support_url": "https://example.com/support"
}
```

### The Auth0 Default Error Page

Even if you choose to display the default Auth0 error page, you may customize the following fields:

-	Friendly Name: a user-friendly version of your company's name;
-	Logo URL: the path to the logo you want to show to users;
-	Support Email: the email address for your Support team;
-	Support URL: the URL of your Support team's webpage.

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
    "postData" : {
        "mimeType": "application/json",
        "text": "{\"friendly_name\": \"My Company\", \"picture_url\": \"https://example.com/logo.png\", \"support_email\": \"support@example.com\", \"support_url\": \"https://example.com/support\"}}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

### Customized Error Pages

#### Redirecting Users to a Custom Error Page

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

#### Rendering a Custom Error Page

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
