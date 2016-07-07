---
url: /email
description: Auth0 provides built-in email services to easily communicate with your users.
---

# Emails in Auth0

::: panel-danger Notice
Auth0's built-in email provider is not supported for use in a production environment. 

[Click here to learn more about Email Delivery Changes](/migrations#email-delivery-changes)
:::

Auth0 provides built-in email services to easily communicate with your users. This includes verification emails, welcome emails, change password emails, and blocked account emails.

When you first create your application Auth0 provides a built-in email provider to send emails. This is meant to be used for testing purposes only. When using this, it is important to note:

* You will not be able to use any of the email customization features. The content of the emails sent for testing will be restricted to format of the existing templates.

* You will be restricted to sending no more than ten emails per minute, regardless of email type. 

* Your ability to send email from your account may be reduced (or even temporarily blocked) if your emails result in high bounce rates. 

To remove these restrictions in your testing or to setup your production level emails, please consult the following resources for information on setting up your own email provider:

* [Use your own SMTP Email Provider](/email/providers)
* [Custom Email Handling](/email/custom)

After you have configured your own email service provider, the [Emails](${uiURL}/#/emails) dashboard will allow you to customize your emails beyond the existing templates. For more information, see: [Customizing Your Emails](/email/templates).
