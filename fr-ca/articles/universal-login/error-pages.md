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

Throughout the authentication process, your users may encounter errors. Auth0 provides you the option of using [custom error pages](/hosted-pages/custom-error-pages), but you may also choose to use the generic error page that Auth0 provides by default.

To find the default page name for the generic error page, see [How to Use Version Control to Manage Your Universal Login Pages](/universal-login/version-control).

If you configure the following fields in your [Tenant Settings](${manage_url}/#/tenant/), the provided information will be included in the generic error page:

* **Friendly Name**: the name of your company
* **Logo URL**: the URL of your company logo
* **Support Email**: the email address of your company's support team
* **Support URL**: the URL for your company's support page

``` note
Auth0 will display the **Tenant** information exactly as entered on the Tenant Settings page.
```

In addition to these fields, the error page returns some contextual information to assist you in troubleshooting the source of an error. The following fields will be returned based on the request which resulted in the error:

* **Client ID**: the identifier for the Auth0 application
* **Connection**: the connection used at the time of error
* **Language**: the language set to be used at the time of error
* **Error**: the status code corresponding to the error
* **Error Description**: a description of the error
* **Show Log URL**: a link to the error in your tenant logs
* **Title**: the friendly name of the tenant
* **Tenant**: the tenant information (friendly name, logo URL, support email, and support URL)

::: note
The error page can only return information that was available in the request. If, for example, the request which resulted in an error did not contain a `client_id`, no client ID will be returned by the error page.
:::

Fields returned by the error page will be appended as query string parameters to the page's URL.

## Custom Error Pages

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page. If you choose to use a customized error page, you may do so by either redirecting users to your own error page or by updating the generic error page to display customized HTML.

See [Custom Error Pages](/universal-login/custom-error-pages) for details on how to configure your own custom error page for use with Auth0.
