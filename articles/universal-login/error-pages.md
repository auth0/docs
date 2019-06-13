---
description: Guide on how to use the hosted error pages for authorization error events
crews: crew-2
topics:
  - error-pages
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---

# Error Pages

## Generic Error Page

Throughout the authentication process, your users may encounter errors. Auth0 provides you the option of using [custom error pages](/hosted-pages/custom-error-pages), but you may also choose to use the generic error page that Auth0 provides.

![Hosted Error Page](/media/articles/hosted-pages/error-pages.png)

To find the default page name for the Generic Error Page, see [How to Use Version Control to Manage Your Hosted Pages](/hosted-pages/version-control).

By going into the [Tenant Settings](${manage_url}/#/tenant/) page of the Management Dashboard, you may customize your Auth0 error page with the following fields:

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

Auth0 will display the **Tenant** information exactly as entered on the Settings page.

## Custom Error Pages

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page.

The [custom error pages](/hosted-pages/custom-error-pages) page details how you can configure your own custom error page for use with Auth0.
