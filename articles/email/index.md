---
url: /email
description: Auth0 built-in email services.
tags:
  - email
---

# Emails in Auth0

::: warning
Auth0's built-in email provider is not supported for use in a production environment and should be used for testing only.
:::

When you first create your application Auth0 provides a built-in email provider to send emails. This includes verification emails, welcome emails, change password emails, and blocked account emails. This is meant to be used for testing purposes only, and has several restrictions:

* You will not be able to use any of the email customization features. The content of the emails sent for testing will be restricted to format of the existing templates.

* All emails will be sent from a predefined **from** address (`no-reply@auth0user.net`).

* You will be restricted to sending no more than **ten emails per minute**, regardless of email type.

* Your ability to send email from your tenant may be reduced (or even temporarily blocked) if your emails result in high bounce rates.

![Test Email](/media/articles/email/index/email-notification.png)

To remove these restrictions in your testing or to setup your production level emails, you have to set up your own email provider:

* [Use your own SMTP Email Provider](/email/providers)
* [Custom Email Handling](/email/custom)

After you have configured your own email service provider, the [Emails](${manage_url}/#/emails) dashboard will allow you to customize your emails beyond the existing templates. 

::: note
For users with the **Free Subscription** plan, email workflows and using the custom email provider features are available. However a paid subscription plan is required for email customizations. See the [subscription pricing page](https://auth0.com/pricing) for more details.
:::

For more information see [Customizing Your Emails](/email/templates).
