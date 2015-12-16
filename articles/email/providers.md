# Using your own SMTP Provider for sending emails

Instead of using Auth0's infrastructure for email communication with your users the Auth0 API v2 also allows you to configure your own provider. This allows you to better monitor and troubleshoot the email communication.

We currently support the following providers:

 - [Amazon SES](http://aws.amazon.com/ses/)
 - [Mandrill](https://mandrill.com/)
 - [SendGrid](https://sendgrid.com/)

## Configuring Amazon SES for sending emails

Sign up for an account on [Amazon](http://aws.amazon.com) and [configure Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/setting-up-ses.html) by validating your domain and requesting production access.

Then on the API v2 page you can generate an API token with the right scopes (eg: to create or update the email provider) and you can post your Amazon SES credentials to the API:

```
curl -H "Authorization: Bearer YOUR_AUTH0_V2_API_TOKEN" -X POST  -H "Content-Type: application/json" -d '{ "name": "ses", "credentials": { "accessKeyId": "YOUR_AWS_ACCESS_KEY_ID", "secretAccessKey": "YOUR_AWS_SECRET_ACCESS_KEY", "region": "YOUR_AWS_DEFAULT_REGION" } }' https://YOUR_TENANT.auth0.com/api/v2/emails/provider
```

After setting up Amazon SES as your provider you can send a test mail [using the Try button in the Emails section of the dashboard](${uiURL}/#/emails). The [Amazon SES console](https://console.aws.amazon.com/ses) will now show all emails which are being sent to your users from Auth0.

## Configuring Mandrill for sending emails

Sign up for an account on [Mandrill](https://mandrill.com/) and create a new API key [in the dashboard](https://mandrillapp.com/settings/index/). 

Then on the API v2 page you can generate an API token with the right scopes (eg: to create or update the email provider) and you can post your Mandrill credentials to the API:

```
curl -H "Authorization: Bearer YOUR_AUTH0_V2_API_TOKEN" -X POST  -H "Content-Type: application/json" -d '{"name":"mandrill","credentials":{"api_key":"YOUR_MANDRILL_API_KEY"}}' https://YOUR_TENANT.auth0.com/api/v2/emails/provider
```

After setting up Mandrill as your provider you can send a test mail [using the Try button in the Emails section of the dashboard](${uiURL}/#/emails).

The [Outbound Activity](https://mandrillapp.com/activity) page in Mandrill will now show the emails which have been sent to your users, the subject and the delivery status of each message.

![](/media/articles/email/providers/email-mandrill-monitoring.png)

This page even allows you to see the contents of every email which has been sent to your users for advanced troubleshooting.

## Configuring SendGrid for sending emails

Sign up for an account on [SendGrid](https://sendgrid.com/home) or if you have a Microsoft Azure subscription you can get a free account in the Azure Marketplace.

Then on the API v2 page you can generate an API token with the right scopes (eg: to create or update the email provider) and you can post your SendGrid credentials to the API:

```
curl -H "Authorization: Bearer YOUR_AUTH0_V2_API_TOKEN" -X POST  -H "Content-Type: application/json" -d '{"name":"sendgrid","credentials":{"api_user":"YOUR_SENDGRID_API_USER","api_key":"YOUR_SENDGRID_API_KEY"}}' https://YOUR_TENANT.auth0.com/api/v2/emails/provider
```

After setting up SendGrid as your provider you can send a test mail [using the Try button in the Emails section of the dashboard](${uiURL}/#/emails).

The [Email Activity](https://sendgrid.com/logs/index) page in SendGrid will now show the emails which have been sent to your users and the delivery status of each message.

![](/media/articles/email/providers/email-sendgrid-monitoring.png)

## Other Topics

- [Emails in Auth0](/email)
- [Take control of the complete email flow](/email/custom)