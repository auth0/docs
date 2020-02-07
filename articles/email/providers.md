---
title: Use Your Own SMTP Email Provider
description: Learn how to configure your own SMTP email provider, so you can more completely manage, monitor, and troubleshoot your email communications.
toc: true
topics:
  - email
  - smtp
  - email-providers
contentType: how-to
useCase: customize-emails
---
# Use Your Own SMTP Email Provider

Auth0 allows you to configure your own SMTP email provider so you can more completely manage, monitor, and troubleshoot your email communications.

::: note
Auth0's built-in email infrastructure should be used for testing-level emails only.
:::

Auth0 currently supports the following providers:

* [Amazon SES](#configure-amazon-ses)
* [Mandrill](#configure-mandrill)
* [SendGrid](#configure-sendgrid)
* [SparkPost](#configure-sparkpost)
* [Mailgun](#configure-mailgun)
* [Other SMTP](#configure-a-custom-smtp-server) (e.g., Gmail, Yahoo)

You can only configure one email provider, which will be used for all emails.

## Whitelist IP addresses

To ensure that emails can be sent from Auth0 to your SMTP, you must open the right ports and allow inbound connections from specific IP addresses. To get the list of IPs, navigate to [Dashboard > Emails > Provider](${manage_url}/#/emails/provider).

## Configure Amazon SES

To use the Amazon SES API to send emails, you must complete several configuration steps. First, though, you need to decide which credentials you want to use:

* API Credentials
* SMTP Credentials (the secret is usually 44 characters long)

For more info about SES credentials, see Amazon's [Using Credentials With Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/using-credentials.html).

### Use API credentials

1. Sign up for an [Amazon AWS](http://aws.amazon.com/ses/) account, or log in.

2. [Verify your domain](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).

3. [Verify email addresses](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html)    

4. [Request production access](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html?icmpid=docs_ses_console).

5. [Get your AWS access keys](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html). Copy these keys; you will need to enter these values into Auth0.

6. [Attach a policy with the proper permissions](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html). Attach a policy with the `ses:SendRawEmail` and `ses:SendEmail` permissions, as in this example:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendRawEmail",
                "ses:SendEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

7. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **Amazon Web Services** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

8. Provide a **From** email address, enter your AWS **Access Key Id** and **Secret Access Key**, select your **Region**, and click **Save**:

    ![Enter AWS API Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-aws.png)

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

The [Amazon SES console](https://console.aws.amazon.com/ses) will now display delivery insights for all emails that have been sent to your users.

### Use SMTP credentials

1. Sign up for an [Amazon AWS](http://aws.amazon.com/ses/) account, or log in.

2. [Verify your domain](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).

3. [Request production access](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html?icmpid=docs_ses_console).

4. [Get your SMTP credentials](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html). Copy the security credentials; you will need to enter these values into Auth0.

5. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **SMTP** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

6. Provide a **From** email address, then enter your SMTP server **Host**, **Port**, **Username**, and **Password**, and click **Save**. You can use `email-smtp.us-east-1.amazonaws.com` (using the appropriate region rather than `us-east-1`) for **Host** and `587` for **Port**. 

    ![Enter AWS SMTP Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-smtp.png)

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

The [Amazon SES console](https://console.aws.amazon.com/ses) will now display delivery insights for all emails that have been sent to your users.

## Configure Mandrill

1. Sign up for a [Mandrill](https://www.mandrill.com/signup/) account, or log in.

2. Navigate to Mandrill [Settings](https://mandrillapp.com/settings), and click **Add API key**. Copy this key value.

3. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **Mandrill** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

4. Provide a *From** email address, enter the Mandrill **API Key** you previously copied, and click **Save**:

    ![Enter Mandrill Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-mandrill.png)

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

The Mandrill [Outbound Activity](https://mandrillapp.com/activity) page will now display delivery insights for all emails that have been sent to your users.

## Configure SendGrid

1. Sign up for a [SendGrid](https://sendgrid.com) account, or log in. (If you have a Microsoft Azure subscription, you can get a free account in the Azure Marketplace.)

2. Navigate to SendGrid **Settings > API Keys**, and click **Create API Key**. Provide a name for your key, enable **Full Access** for **Mail Send** permissions, and click **Save**. Copy this key value.

3. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **SendGrid** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

4. Provide a **From** email address, enter the SendGrid **API Key** you previously copied, and click **Save**:

    ![Enter SendGrid Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-sendgrid.png)

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

The SendGrid [Email Activity](https://sendgrid.com/logs/index) page will now display delivery insights for all emails that have been sent to your users.

## Configure SparkPost

1. Sign up for a [SparkPost](https://www.sparkpost.com/) account, or log in. 

2. Navigate to SparkPost [Sending Domains](https://app.sparkpost.com/account/sending-domains), and add your custom domain. SparkPost allows sending emails from only verified domains.

3. Navigate to SparkPost [Account API Keys](https://app.sparkpost.com/account/credentials), and click **New API key**. Save this key value and ensure it has `Transmissions: Read/Write` access. Copy this key value.

4. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **SparkPost** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

5. Provide a **From** email address, enter the SparkPost **API Key** you previously copied, select your **Region**, and click **Save**:

    ![Enter SparkPost Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-sparkpost.png)

::: warning
If you are changing to the EU region in an account that was already configured for the US region, you must replace the **API Key** in Auth0 with a Sparkpost EU API Key.
:::

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

::: note
If you haven't registered a custom domain with SparkPost, you can send a maximum of five test emails from the `sparkpostbox.com` domain. For more info, see SparkPost's [Transmissions: The Sandox Domain](https://developers.sparkpost.com/api/transmissions.html#header-the-sandbox-domain).
:::

The SparkPost [Message Events](https://app.sparkpost.com/reports/message-events) page will now display delivery insights for all emails that have been sent to your users.

## Configure Mailgun

1. Sign up for a [Mailgun](https://mailgun.com) account, or log in.

2. Navigate to Mailgun **Sending > Domains**, and add your custom domain. Mailgun allows sending emails from only verified domains.

3. Navigate to Mailgun **Settings > API Keys**. Your API key was created when you signed up for your account; copy it from **Private API Key**.

4. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **Mailgun** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

5. Provide a **From** email address, enter the **Domain** you previously added to Mailgun, enter the Mailgun **API Key** you previously copied, select your **Region**, and click **Save**:

    ![Enter Mailgun Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-mailgun.png)

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

The [Mailgun Dashboard](https://app.mailgun.com/app/dashboard) will now display delivery insights for all emails that have been sent to your users.

## Configure a custom SMTP server

When using your own SMTP server to send email, the server must:

* support LOGIN [authentication](https://en.wikipedia.org/wiki/SMTP_Authentication).
* support [TLS](https://en.wikipedia.org/wiki/STARTTLS) 1.0 or higher.
* use a certificate signed by a public certificate authority (CA).

If your SMTP server meets these criteria, then:

1. Navigate to Auth0 [Custom Email Providers](${manage_url}/#/emails/provider). Activate the **Use my own email provider** toggle, and click the **SMTP** logo.

    ![Select Email Provider](/media/articles/dashboard/emails/providers/emails-providers-list.png)

2. Provide a **From** email address, then enter your SMTP server **Host**, **Port**, **Username**, and **Password**, and click **Save**:

    ![Enter Custom SMTP Email Provider Values](/media/articles/dashboard/emails/providers/emails-providers-settings-smtp.png)

::: note
Common ports include 25 and 587. Please avoid using port 25 if you can because many providers have limitations on this port.
:::

You can now send a test email using the **Send Test Email** button. If you have configured everything correctly, you will receive a confirmation email. If you do not receive an email after a few minutes, please check your [Auth0 logs](${manage_url}/#/logs) for any failures.

::: panel Test services
SMTP makes it easy to set up test services that allow you to test that your setup is working without spamming your users. For more info, see [Set Up a Test SMTP Provider](/email/testing).
:::

## Keep reading

::: next-steps
* [Emails in Auth0](/email)
* [Customizing Your Emails](/email/templates)
* [Custom Email Handling](/email/custom)
* [Setting up a Test Provider](/email/testing)
:::
