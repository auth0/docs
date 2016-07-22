---
description: How to configure your own SMTP email provider.
---

# Use your own SMTP Email Provider

Auth0 allows you to configure your own SMTP email provider. Auth0's built-in email infrastructure should be used for testing level emails only. By using your own provider you can more completely manage, monitor and troubleshoot your email communications.

Auth0 currently supports the following providers:

* [Amazon SES](#configure-amazon-ses-for-sending-email)
* [Mandrill](#configure-mandrill-for-sending-email)
* [SendGrid](#configure-sendgrid-for-sending-email)
* [Custom SMTP](#configure-a-custom-smtp-server-for-sending-email)

## Configure Amazon SES for Sending Email

There are several steps to follow to configure Amazon SES for sending email. If you want to use the SES API, please follow this guide.

You can use two types of credentials

1. API Credentials
2. SMTP Credentials (the secret is usually 44 characters long)

For more information about SES credentials, visit [Using Credentials With Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/using-credentials.html).

### Using API Credentials

1. Sign up for an [Amazon AWS](http://aws.amazon.com/ses/) account, or login.
2. [Verify your domain](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).

    ![](/media/articles/email/providers/ses-verify.png)

3. [Request production access](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html?icmpid=docs_ses_console).
4. [Get Your AWS Access Keys](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html). Copy these keys. You will need to enter these values into Auth0 (see below).

    ![](/media/articles/email/providers/aws-keys.png)

5. [Attach a policy with the right permissions](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html). Attach a policy with the `ses:SendRawEmail` and `ses:SendEmail` permissions, as in this example:

    ![](/media/articles/email/providers/aws-policy.png)

6. Go to the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. Click **Use my own Email Provider** and click the **Amazon Web Services** logo.

7. Enter your AWS `Access Key Id`, `Secret Access Key` and `Region` in the appropriate fields:

    ![](/media/articles/email/providers/enter-keys.png)

8. Click **Save**.

Now you can send a test email using the **SEND TEST EMAIL** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. If you don't receive an email after a few minutes, please check your [dashboard logs](${uiURL}/#/logs) for any failures.

The [Amazon SES console](https://console.aws.amazon.com/ses) will now display all emails which have been sent to your users.

### Using SMTP Credentials

1. Sign up for an [Amazon AWS](http://aws.amazon.com/ses/) account, or login.
2. [Verify your domain](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).

    ![](/media/articles/email/providers/ses-verify.png)

3. [Request production access](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html?icmpid=docs_ses_console).

4. [Get Your SMTP Credentials](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html). Copy the security credentials. You will need to enter these values into Auth0.

    ![](/media/articles/email/providers/ses-smtp.png)

5. Go to the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. Click **Use my own Email Provider** and click the **SMTP** logo.

6. Enter your SMTP server `Host`, `Port`, `Username` and `Password` in the appropriate fields. You can use `email-smtp.us-east-1.amazonaws.com` (using the appropriate region instead of `us-east-1`) for `Host` and `587` for `Port`.

    ![](/media/articles/email/providers/enter-smtp-data.png)

7. Click **Save**.

Now you can send a test email using the **SEND TEST EMAIL** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. If you don't receive an email after a few minutes, please check your [dashboard logs](${uiURL}/#/logs) for any failures.

The [Amazon SES console](https://console.aws.amazon.com/ses) will now display all emails which have been sent to your users.

## Configure Mandrill for Sending Email

1. Sign up for a [Mandrill](https://www.mandrill.com/signup/) account, or login. Go to the [Settings page](https://mandrillapp.com/settings) and click **Add API key**. Save this key value.

    ![](/media/articles/email/providers/mandrill-keygen.png)

2. Go to the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. Click **Use my own Email Provider** and click the **Mandrill** logo.

3. Enter your previously obtained Mandrill `API Key`:

    ![](/media/articles/email/providers/mandrill-key.png)

Now you can send a test email using the **SEND TEST EMAIL** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. If you don't receive an email after a few minutes, please check your [dashboard logs](${uiURL}/#/logs) for any failures.

The [Outbound Activity](https://mandrillapp.com/activity) page in Mandrill will now display all emails which have been sent to your users, including the subject and the delivery status of each message.

![](/media/articles/email/providers/email-mandrill-monitoring.png)

## Configure SendGrid for Sending Email

1. Sign up for a [SendGrid](https://sendgrid.com) account, or login. (If you have a Microsoft Azure subscription you can get a free account in the Azure Marketplace). 

2. Go to **Settings > API Keys** and click **Create API Key**.
3. Provide a name for your key and enable **Full Access** for **Mail Send** permissions. Click **Save**.

    ![](/media/articles/email/providers/sendgrid-permissions.png)
    
4. Copy the API key provided.

    ![](/media/articles/email/providers/sendgrid-key.png)

5. Go to the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. Click **Use my own Email Provider** and click the **SendGrid** logo.

6. Provide a **From** email and enter your previously obtained **SendGrid API Key**:

    ![](/media/articles/email/providers/sendgrid-dashboard.png)


Now you can send a test email using the **SEND TEST EMAIL** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. If you have configured everything correctly, you will receive a confirmation email: 

![](/media/articles/email/providers/sendgrid-test.png)

**NOTE:** If you do not receive an email after a few minutes, please check your [dashboard logs](${uiURL}/#/logs) for any failures.

The [Email Activity](https://sendgrid.com/logs/index) page in SendGrid will now display all emails which have been sent to your users and the delivery status of each message.

![](/media/articles/email/providers/email-sendgrid-monitoring.png)

## Configure a Custom SMTP Server for Sending Email

You can use your own SMTP server to send email. There are two requirements for the SMTP server:

* It must support LOGIN [authentication](https://en.wikipedia.org/wiki/SMTP_Authentication).
* It must support [TLS](https://en.wikipedia.org/wiki/STARTTLS) 1.0 or higher.

To be able to use your own SMTP server:

1. Open the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard.
2. Click on **Use my own Email Provider**.
3. Click the **SMTP** logo.
4. Enter your SMTP server `Host`, `Port`, `Username` and `Password` in the appropriate fields:

    ![](/media/articles/email/providers/enter-smtp-data.png)

5. Click **Save**.

**NOTE:** Common ports include 25, 465, and 587. Please avoid using port 25 if you can, since many providers have limitations on this port.

Now you can send a test email using the **SEND TEST EMAIL** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. If you don't receive an email after a few minutes, please check your [dashboard logs](${uiURL}/#/logs) for any failures.

::: panel-info Test services
SMTP makes it easy to setup test services that allow you to test that your setup is working without spamming your users. For more information, see: [Set up a Test SMTP Provider](/email/testing) .
:::

## Additional Information

- [Emails in Auth0](/email)
- [Customizing Your Emails](/email/templates)
- [Custom Email Handling](/email/custom)
- [Setting up a Test Provider](/email/testing)
