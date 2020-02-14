---
description: Describes the deprecation of the Auth0 built-in email provider template customization for cloud customers. 
contentType: reference
useCase:
  - migrate
---
# Email Template Customization Deprecation (Cloud Only)

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-07-21 | 2016-08-29 |

Auth0's built-in email provider will no longer be supported for use in a production environment. The emails sent using the Auth0 provider will no longer be customizable. They will be restricted to the template and you will not be able to change the *from address* or subject line.

## Next steps

The built-in email service may still be used for test purposes but you must switch to an Auth0-supported [third-party service](/email/providers) before moving your apps to production:

- [Amazon SES](https://aws.amazon.com/ses/)
- [Mandrill](https://www.mandrill.com/signup/)
- [SendGrid](https://sendgrid.com/pricing)) 
- or another [SMTP-based provider](/email/custom)

If you already use a custom email provider, no action is necessary.

For more information, see [Emails in Auth0](/email).

<%= include('./_contact-support') %>