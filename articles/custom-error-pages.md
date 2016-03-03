# Customizing Error Pages

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page.

This document begins by covering the configuration options available to you via the Management Portal and ends with information on performing the same actions by making the appropriate calls to the Management API.

## Customizing Error Pages via the Management Portal

To get to the error page settings:

1. Go to the top right-hand side of the Auth0 Management Portal
2. Click on your user name/icon
3. Choose "Account Settings" in the menu the pops open.

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
1. On the Account Settings page, scroll down to the Error Pages section.
2. Select the option "redirect users to your own error page."
3. Provide the URL of the error page you would like your users to see.

![](/media/articles/error-pages/redirect-error-page.png)

## Customizing Error Pages via the Management API
Instead of using the Management Portal, you may configure your error pages by making the appropriate PATCH call to the Management API.

![](/media/articles/error-pages/patch-tenant-settings.png)

1. Ensure that you are logged in to an account that is permitted to make changes to your Auth0 configuration.
2. Navigate to the [APIv2 Explorer Page](/api/v2).
3. Go to the [Update Tenant Settings](api/v2#!/Tenants/patch_settings) section of the [APIv2 Explorer Page](/api/v2).
4. Under Scopes, click on "update:tenant_settings" to add the scope required for this particular endpoint to the [API token](api/v2/tokens).
5. Populate the "body" field with the JSON snippet containing the changes you would like to make. Further details on what to include in this snippet is included below.

Please note that the "Show samples" link in the upper right corner of the API Explorer Window will display the following sample code to assist you.

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

The following JSON will set the appropriate fields when included in your call to the API:

```
"friendly_name": "My Company",
"picture_url": "https://mycompany.org/logo.png",
"support_email": "support@mycompany.org",
"support_url": "https://mycompany.org/support"
```

### Customized Error Pages

#### Redirecting Users to a Custom Error Page
To redirect users to a custom error page, update the "url" field to point to the location of the error page:

```
"error_page": {
  "html": "",
  "show_log_link": false,
  "url": "http://www.example.com"
}
```

#### Rendering a Custom Error Page

To provide the appropriate HTML, pass in a string containing the appropriate Liquid syntax to the "html" element:

```
"error_page": {
  "html": "<h1>Hello {{name}}. This error was generated {{ 'now' | date: "%Y %h" }}.</h1>",
  "show_log_link": false,
  "url": ""
}
```
