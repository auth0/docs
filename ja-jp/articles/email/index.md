---
url: /email
description: Auth0 built-in email services.
topics:
  - email
contentType:
    - index
    - reference
    - how-to
useCase: customize-emails
---

# Emails in Auth0

An Auth0 [Database Connection](/connections/database) provides several emails as a part of its authentication flow, including verification emails, welcome emails, change password emails, breached password, and blocked account emails. The **Multi-factor Authentication Enrollment Email** can be sent to users in any connection.

::: warning
Auth0's built-in email provider is not supported for use in a production environment, should be used for testing only, and has several restrictions.
:::

Auth0's built-in email provider has these restrictions:

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
For users with the **Free Subscription** plan, email workflows and using the custom email provider features are available. However, a paid subscription plan is required for email customizations. See the [subscription pricing page](https://auth0.com/pricing) for more details.
:::

For more information see [Customizing Your Emails](/email/templates).
