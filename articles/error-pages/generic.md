---
description: How use Auth0's built-in generic error pages.
---

# Auth0's Generic Error Pages

Throughout the authentication process, your users may encounter errors. Auth0 provides you the option of using [custom error pages](/custom-error-pages), but you may also choose instead to use the generic error page that Auth0 provides to alert the user of said errors.

![](/media/articles/error-pages/generic-error-page-settings.png)

By going into the Account Settings page of the Management Dashboard, you may customize your Auth0 error page with the following fields:

* **Friendly Name**: the name of your company;
* **Logo URL**: the URL to your company logo;
* **Support Email**: the email address of your company's support team;
* **Support URL**: the URL to your company's support page.

In addition to these fields, the error page returns the follow information to assist you in troubleshooting the error:

* **Client ID**: the identifier for the client;
* **Connection**: the Connection used at the time of error;
* **Language**: the language set to be used at the time of error;
* **Error**: the code corresponding to the error that occurred;
* **Error Description**: a description of the error that occurred;
* **Show Log URL**: the link to the error logs, if available;
* **Title**: the friendly name of the tenant;
* **Tenant**: the tenant information (the friendly name, logo URL, support email, and support URL fields that you may customize).
