# Use your own SMTP Email Provider

Auth0 allows you to configure your own SMTP email provider. Auth0's built-in email infrastructure should be used for testing level emails only. By using your own provider you can more completely manage, monitor and troubleshoot your email communications.

Auth0 currently supports the following providers:

* [Amazon SES](#configure-amazon-ses-for-sending-email)
* [Mandrill](#configure-mandrill-for-sending-email)
* [SendGrid](#configure-sendgrid-for-sending-email)
* [Custom SMTP](#configure-a-custom-smtp-server-for-sending-email)

## Configure Amazon SES for Sending Email

There are several steps to follow to configure Amazon SES for sending email. If you want to use the SES API, please follow this guide.

If for some reason you want to use the SES SMTP endpoint, please check the [Custom SMTP guide](#configure-a-custom-smtp-server-for-sending-email).

### Amazon Web Services

1. Sign up for an [Amazon AWS](http://aws.amazon.com/ses/) account, or login.
2. [Verify your domain](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).

  ![](/media/articles/email/providers/ses-verify.png)

3. [Request production access](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html?icmpid=docs_ses_console).
4. [Get Your AWS Access Keys](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html). Copy these keys. You will need to enter these values into Auth0 (see below).

  ![](/media/articles/email/providers/aws-keys.png)

5. [Attach a policy with the right permissions](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html). Attach a policy with the `ses:SendRawEmail` and `ses:SendEmail` permissions, like the picture below.

  ![](/media/articles/email/providers/aws-policy.png)

**NOTE:** For more information see: [Setting up Email Sending with Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/setting-up-ses.html).

### Auth0 API

Once you have completed the steps above on Amazon, follow these steps on Auth0: 

1. Generate an API token with the correct scope (ie: to create or update your email provider) on the [API v2](/api/v2) page on Auth0:

  ![](/media/articles/email/providers/token-generator.png)

2. To configure Amazon SES as your email provider in Auth0, post your previously obtained Amazon SES credentials to the [Configure the email provider](/api/v2#!/Emails/post_provider) endpoint with this curl command:

```js
curl -H "Authorization: Bearer YOUR_AUTH0_V2_API_TOKEN" -X POST  -H "Content-Type: application/json" -d '{ "name": "ses", "credentials": { "accessKeyId": "YOUR_AWS_ACCESS_KEY_ID", "secretAccessKey": "YOUR_AWS_SECRET_ACCESS_KEY", "region": "YOUR_AWS_DEFAULT_REGION" } }' https://${account.tenant}.auth0.com/api/v2/emails/provider
```

### Auth0 Dashboard

Finally, you must enter your AWS keys into the Auth0 dashboard:

1. Open the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard.
2. Click **Use my own Email Provider**.
3. Click the **Amazon Web Services** logo.
4. Enter your AWS `Access Key Id`, `Secret Access Key` and `Region` in the appropriate fields:

  ![](/media/articles/email/providers/enter-keys.png)

5. Click **Save**.

  **NOTE:** You can send a test email using the **Try** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. 

The [Amazon SES console](https://console.aws.amazon.com/ses) will now display all emails which have been sent to your users.

## Configure Mandrill for Sending Email

1. Sign up for a [Mandrill](https://www.mandrill.com/signup/) account, or login. Go to the [Settings page](https://mandrillapp.com/settings) and click **Add API key**. Save this key value.

  ![](/media/articles/email/providers/mandrill-keygen.png)

2. Generate an API token with the correct scope (ie: to create or update your email provider) on the [API v2](/api/v2) page on Auth0.

  ![](/media/articles/email/providers/token-generator.png)

3. To configure Mandrill as your email provider in Auth0, post your previously obtained Mandrill credentials to the [Configure the email provider](/api/v2#!/Emails/post_provider) endpoint with this curl command:

  ```js
curl -H "Authorization: Bearer YOUR_AUTH0_V2_API_TOKEN" -X POST  -H "Content-Type: application/json" -d '{"name":"mandrill","credentials":{"api_key":"YOUR_MANDRILL_API_KEY"}}' https://${account.tenant}.auth0.com/api/v2/emails/provider
  ```

4. Go to the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. Click **Use my own Email Provider** and click the **Mandrill** logo.

5. Enter your previously obtained Mandrill `API Key`:

  ![](/media/articles/email/providers/mandrill-key.png)


  **NOTE:** You can send a test email using the **Try** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. 

The [Outbound Activity](https://mandrillapp.com/activity) page in Mandrill will now display all emails which have been sent to your users, including the subject and the delivery status of each message.

![](/media/articles/email/providers/email-mandrill-monitoring.png)

## Configure SendGrid for Sending Email

1. Sign up for a [SendGrid](https://sendgrid.com/pricing) account, or login. (If you have a Microsoft Azure subscription you can get a free account in the Azure Marketplace.) Go to [Manage User Credentials](https://app.sendgrid.com/settings/credentials) and create an API key.

2. Generate an API token with the correct scope (ie: to create or update your email provider) on the [API v2](/api/v2) page on Auth0.

  ![](/media/articles/email/providers/token-generator.png)

3. To configure SendGrid as your email provider in Auth0, post your previously obtained SendGrid credentials to the [Configure the email provider](/api/v2#!/Emails/post_provider) endpoint with this curl command:

  ```js
curl -H "Authorization: Bearer YOUR_AUTH0_V2_API_TOKEN" -X POST  -H "Content-Type: application/json" -d '{"name":"sendgrid","credentials":{"api_key":"YOUR_SENDGRID_API_KEY"}}' https://${account.tenant}.auth0.com/api/v2/emails/provider
  ```

4. Go to the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. Click **Use my own Email Provider** and click the **SendGrid** logo.

5. Enter your previously obtained SendGrid `API Key`:

  ![](/media/articles/email/providers/sendgrid-key.png)


  **NOTE:** You can send a test email using the **Try** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard. 

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

  **NOTE:** You can send a test email using the **Send Test Email** button on the [Custom Email Provider](${uiURL}/#/emails/provider) page of the Auth0 dashboard.

> Using SMTP makes it easy to [wire up test services](/email/testing) that will allow you to validate everything is working without spamming your real users.

## Additional Information

- [Emails in Auth0](/email)
- [Customizing Your Emails](/email/templates)
- [Custom Email Handling](/email/custom)
- [Setting up a Test Provider](/email/testing)
