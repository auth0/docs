---
description: Auth0 recommends you setup a fake SMTP server while in development or testing.
topics:
  - email
  - smtp
contentType: how-to
useCase: customize-emails
---

# Set Up a Test SMTP Provider

While working in your development or testing environment, we recommend that you use a test SMTP server so that you can:

* Check that deliveries are successful
* View how emails you sent appear to recipients prior to go live

You can either:

* Set up your own SMTP server
* Use a third-party service (see the [Resources to Consider](#resources-to-consider) section for options you might use)

Once you have either your own SMTP server set up or a test service available, you can provide its credentials the way you typically would for a [custom email provider](/email/providers#configure-a-custom-smtp-server-for-sending-email).

::: warning
We suggest establishing real email addresses for quality assurance purposes and using these addresses when testing. This will help you avoid disruption caused by the blacklisting of certain "false" domains that are commonly used to test.
:::

## Resources to Consider

::: next-steps
* [Debug Mail](https://debugmail.io/)
* [FakeSMTP](https://nilhcem.github.io/FakeSMTP/)
* [Haraka](https://haraka.github.io/)
* [MailTrap](https://mailtrap.io/)
* [smtp4dev](https://smtp4dev.codeplex.com/)
:::
