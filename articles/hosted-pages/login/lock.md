---
description: How to use Lock with Universal Login
topics:
  - lock
  - login
  - universal-login
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# How to Use Lock with Universal Login

[Lock](/libraries/lock) is a signup and authentication widget that provides quick and easy authentication for your application's users without requiring you to design the UI or interact manually with an Auth0 API.

## Customize Lock in the Login Page

The default login page for your tenant is a template that will use Lock to provide your users with an attractive interface and smooth authentication process, as discussed above. You can look over that template and use it as a starting point if you choose to customize it in any way.

If you want to change any of Lock's [configurable options](/libraries/lock/configuration), you can do so using the [Hosted Pages](${manage_url}/#/login_page) editor interface. These options can alter the behavior of Lock itself, or the look and feel of the widget using the theming options. See the [configuration documentation](/libraries/lock/v11/configuration) for details on how to customize Lock.

When you're done making changes to the code, click **Save** to persist the changes.

![Login Page](/media/articles/hosted-pages/hlp-lock.png)

<%= include('./_custom-domains') %>

## Next Steps

::: next-steps
* [Read more about Lock](/libraries/lock)
* [Get started on your own login page](${manage_url}/#/login_page)
:::
