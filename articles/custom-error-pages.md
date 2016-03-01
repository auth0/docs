<<<<<<< c12ef8e55bb0712ca1b656a6c4ba302e83ccf245
<<<<<<< fb3311ac924102cdcb2c9bb5d2b08d5ab8b817ea
<<<<<<< 1a0c851189b7344cc4ad6bbe6e3617101c8deda3
Customizing Error Pages
=======================

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page.

This document begins by covering the configuration options available to you via the Management Portal and ends with information on performing the same actions by making the appropriate calls to the Management API. If you choose to make updates via the Management API, you may use the APIv2 Explorer Page to make test calls and help generate the required HTTP PATCH call.

Customizing Error Pages via the Management Portal
-------------------------------------------------

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
=======
# Customizing Error Pages
=======
Customizing Error Pages
=======================
>>>>>>> [edit] Add API call info

<<<<<<< a60fb28285cb39f3fecdd78f9f8e2a6248c9d55e
In the event of an authorization error, you may display to your users a customized error page, rather than the generic Auth0 error page.
>>>>>>> [new] Add article Custom Error Pages
=======
In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page.

This document begins by covering the configuration options available to you via the Management Portal and ends with information on performing the same actions by making the appropriate calls to the Management API. If you choose to make updates via the Management API, you may use the APIv2 Explorer Page to make test calls and help generate the required HTTP PATCH call.

Customizing Error Pages via the Management Portal
-------------------------------------------------

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

<<<<<<< 18b4ffec44eef37c21a0a0ad9211dfdd5ae4b97c
## Customized Error Pages
>>>>>>> [edit] Add screenshots to Error Pages
=======
### Customized Error Pages
>>>>>>> [update] Add sections on updates made via API
=======
# Customizing Error Pages

In the event of an authorization error, you may display to your users a customized error page, rather than the generic Auth0 error page.
>>>>>>> [new] Add article Custom Error Pages

If you choose to display a custom error page, you have two options:

-	You may redirect the user to a custom error page;
<<<<<<< c12ef8e55bb0712ca1b656a6c4ba302e83ccf245
<<<<<<< 18b4ffec44eef37c21a0a0ad9211dfdd5ae4b97c
<<<<<<< 1a0c851189b7344cc4ad6bbe6e3617101c8deda3
-	You may configure Auth0 to render a custom error page on your behalf (please note that this feature is only available via the Management API).

#### Redirecting Users to a Custom Error Page

To redirect users to a custom error page:

1.	On the Account Settings page, scroll down to the Error Pages section.
2.	Select the option "redirect users to your own error page."
3.	Provide the URL of the error page you would like your users to see.

![](/media/articles/error-pages/redirect-error-page.png)

Customizing Error Pages via the Management API
----------------------------------------------

Instead of using the Management Portal, you may configure your error pages by making a `PATCH /api/v2/tenants/settings` call to the Management API.

To assist you in creating the appropriate request, you may use the [Update Tenant Settings](api/v2#!/Tenants/patch_settings) section of the [APIv2 Explorer Page](/api/v2).

![](/media/articles/error-pages/patch-tenant-settings.png)

Prior to beginning, please ensure that you are logged in to an account that is permitted to make changes to your Auth0 configuration. This will allow the API Explorer to dynamically generate the required [API token](api/v2/tokens) with the necessary API Key and Secret.

### Making a Test Call or Generating the cURL Command via the API Explorer Page

1.	Under Scopes, click on "update:tenant_settings" to add the scope required for this particular endpoint to the [API token](api/v2/tokens).
2.	Populate the "body" field with the JSON snippet that contains the information that will be used to update your configuration.
3.	Click on "TRY" to get a test response to your input.
4.	If you are satisfied with the results of your test call to the API, click "get curl command" to get the constructed call.

Sample cURL command:

```
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{REQUEST BODY}' https://login0.myauth0.com/api/v2/tenants/settings
```

To assist you in customizing the required JSON snippet that you would include as the body parameter, the "Show samples" link in the upper right corner of the API Explorer Window will display the following sample code:

```
{
  "error_page": {
    "html": "",
    "show_log_link": false,
    "url": "https://mycompany.org/error"
  },
  "friendly_name": "My Company",
  "picture_url": "https://mycompany.org/logo.png",
  "support_email": "support@mycompany.org",
  "support_url": "https://mycompany.org/support"
}
```

### The Auth0 Default Error Page

Even if you choose to display the default Auth0 error page, you may customize the following fields:

-	Friendly Name: a user-friendly version of your company's name;
-	Logo URL: the path to the logo you want to show to users;
-	Support Email: the email address for your Support team;
-	Support URL: the URL of your Support team's webpage.

METHOD === PATCH

```
PATCH https://login.auth0.com/api/v2/tenants/settings
```

Request Body:

```
{
  "friendly_name": "My Company",
  "picture_url": "https://mycompany.org/logo.png",
  "support_email": "support@mycompany.org",
  "support_url": "https://mycompany.org/support"
}
```

Sample cURL Command:

```
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{"friendly_name":"My Company","picture_url":"https://mycompany.org/logo.png","support_email":"support@mycompany.org","support_url":"https://mycompany.org/support"}' https://login0.myauth0.com/api/v2/tenants/settings
```

### Customized Error Pages

#### Redirecting Users to a Custom Error Page

To redirect users to a custom error page, update the "url" field of your JSON body to point to the location of the error page.

METHOD === PATCH

```
PATCH https://login.auth0.com/api/v2/tenants/settings
```

Request Body:

```
{
  "error_page": {
    "html": "",
    "show_log_link": false,
    "url": "http://www.example.com"
  }
}
```

cURL Example:

```
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{"error_page":{"html":"","show_log_link":false,"url":"http://www.example.com"}}' https://login.auth0.com/api/v2/tenants/settings
```

#### Rendering a Custom Error Page

To provide the appropriate HTML, pass in a string containing the appropriate Liquid syntax to the "html" element:

METHOD === PATCH

```
PATCH https://login.auth0.com/api/v2/tenants/settings
```

Request Body:

```
{
  "error_page": {
    "html": "<h1>Hello {{name}}. This error was generated {{ 'now' | date: "%Y %h" }}.</h1>",
    "show_log_link": false,
    "url": ""
  }
}
```

cURL Example

```

```
=======
-	You may configure Auth0 to render a custom error page on your behalf.
=======
-	You may configure Auth0 to render a custom error page on your behalf (please note that this feature is only available via the Management API).
>>>>>>> [update] Add sections on updates made via API

#### Redirecting Users to a Custom Error Page

To redirect users to a custom error page:

1.	On the Account Settings page, scroll down to the Error Pages section.
2.	Select the option "redirect users to your own error page."
3.	Provide the URL of the error page you would like your users to see.

![](/media/articles/error-pages/redirect-error-page.png)

<<<<<<< fb3311ac924102cdcb2c9bb5d2b08d5ab8b817ea
<<<<<<< 18b4ffec44eef37c21a0a0ad9211dfdd5ae4b97c
<<<<<<< a60fb28285cb39f3fecdd78f9f8e2a6248c9d55e
## Rendering a Custom Error Page
>>>>>>> [new] Add article Custom Error Pages
=======
### Rendering a Custom Error Page
>>>>>>> [edit] Add screenshots to Error Pages
=======
## Customizing Error Pages via the Management API
Instead of using the Management Portal, you may configure your error pages by making the appropriate PATCH call to the Management API.
=======
Customizing Error Pages via the Management API
----------------------------------------------

Instead of using the Management Portal, you may configure your error pages by making a `PATCH /api/v2/tenants/settings` call to the Management API.

To assist you in creating the appropriate request, you may use the [Update Tenant Settings](api/v2#!/Tenants/patch_settings) section of the [APIv2 Explorer Page](/api/v2).
>>>>>>> [edit] Add API call info

![](/media/articles/error-pages/patch-tenant-settings.png)

Prior to beginning, please ensure that you are logged in to an account that is permitted to make changes to your Auth0 configuration. This will allow the API Explorer to dynamically generate the required [API token](api/v2/tokens) with the necessary API Key and Secret.

### Making a Test Call or Generating the cURL Command via the API Explorer Page

1.	Under Scopes, click on "update:tenant_settings" to add the scope required for this particular endpoint to the [API token](api/v2/tokens).
2.	Populate the "body" field with the JSON snippet that contains the information that will be used to update your configuration.
3.	Click on "TRY" to get a test response to your input.
4.	If you are satisfied with the results of your test call to the API, click "get curl command" to get the constructed call.

Sample cURL command:

```
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{REQUEST BODY}' https://login0.myauth0.com/api/v2/tenants/settings
```

To assist you in customizing the required JSON snippet that you would include as the body parameter, the "Show samples" link in the upper right corner of the API Explorer Window will display the following sample code:

```
{
  "error_page": {
    "html": "",
    "show_log_link": false,
    "url": "https://mycompany.org/error"
  },
  "friendly_name": "My Company",
  "picture_url": "https://mycompany.org/logo.png",
  "support_email": "support@mycompany.org",
  "support_url": "https://mycompany.org/support"
}
```

### The Auth0 Default Error Page

Even if you choose to display the default Auth0 error page, you may customize the following fields:

-	Friendly Name: a user-friendly version of your company's name;
-	Logo URL: the path to the logo you want to show to users;
-	Support Email: the email address for your Support team;
-	Support URL: the URL of your Support team's webpage.

METHOD === PATCH

```
PATCH https://login.auth0.com/api/v2/tenants/settings
```

Request Body:

```
{
  "friendly_name": "My Company",
  "picture_url": "https://mycompany.org/logo.png",
  "support_email": "support@mycompany.org",
  "support_url": "https://mycompany.org/support"
}
```

Sample cURL Command:

```
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{"friendly_name":"My Company","picture_url":"https://mycompany.org/logo.png","support_email":"support@mycompany.org","support_url":"https://mycompany.org/support"}' https://login0.myauth0.com/api/v2/tenants/settings
```

### Customized Error Pages

#### Redirecting Users to a Custom Error Page

To redirect users to a custom error page, update the "url" field of your JSON body to point to the location of the error page.

METHOD === PATCH

```
PATCH https://login.auth0.com/api/v2/tenants/settings
```

Request Body:

```
{
  "error_page": {
    "html": "",
    "show_log_link": false,
    "url": "http://www.example.com"
  }
}
```

cURL Example:

```
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{"error_page":{"html":"","show_log_link":false,"url":"http://www.example.com"}}' https://login.auth0.com/api/v2/tenants/settings
```

#### Rendering a Custom Error Page

To provide the appropriate HTML, pass in a string containing the appropriate Liquid syntax to the "html" element:

METHOD === PATCH

```
PATCH https://login.auth0.com/api/v2/tenants/settings
```

Request Body:

```
{
  "error_page": {
    "html": "<h1>Hello {{name}}. This error was generated {{ 'now' | date: "%Y %h" }}.</h1>",
    "show_log_link": false,
    "url": ""
  }
}
```
<<<<<<< fb3311ac924102cdcb2c9bb5d2b08d5ab8b817ea
>>>>>>> [update] Add sections on updates made via API
=======

cURL Example

```

```
>>>>>>> [edit] Add API call info
=======
-	You may configure Auth0 to render a custom error page on your behalf.

## Redirecting Users to a Custom Error Page

1.	On the top right-hand side of the Auth0 Management Portal, click on your user name/icon. Choose "Account Settings" in the menu the pops open.
2.	Scroll down to the section called "Settings."
3.	Populate the following fields:
	-	Friendly Name:
	-	Logo URL:
	-	Support Email:
	-	Support URL:
4.	Scroll down past the "Settings" section to the "Error Pages" section. Select the option "redirect users to your own error page."
5.	If, in the previous step, you opted to redirect users to your own error page, please provide the Error Page URL of the page to be displayed instead of the default error page.

## Rendering a Custom Error Page
>>>>>>> [new] Add article Custom Error Pages
