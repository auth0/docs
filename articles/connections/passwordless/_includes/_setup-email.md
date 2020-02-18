
## Configure the connection

1. Navigate to the [Connections > Passwordless](${manage_url}/#/connections/passwordless) page in the [Auth0 Dashboard](${manage_url}/), and enable the Email toggle.

![Enable Email Passwordless](/media/articles/connections/passwordless/connections-passwordless-list.png)

2. Select your **Email Syntax**, and enter your email's **From**, **Subject**, and **Message** text.

![Configure Email Passwordless](/media/articles/connections/passwordless/connections-passwordless-email.png)

::: note
You must change the **From** value to a non **@auth0.com** address for your custom email to be sent. Otherwise the default email template will be sent.
:::

3. Enter any **Authentication Parameters** you would like to include in the generated sign-in link.

4. Adjust settings for your **OTP Expiry** and **OTP Length**

<%= include('../../_otp-limitations') %>

5. Decide if you want to **Disable Signups**. You can enable passwordless access just for existing users by enabling this setting.

### Multi-language support

The **Message** area supports multiple languages.

To choose the language, call the [/passwordless/start authentication endpoint](/api/authentication/reference#get-code-or-link) and set the value of the 'x-request-language' header. When this header is not set, the language is extracted from the 'accept-language' header, which is automatically set by the browser.

### Message syntax

The **Message** area accepts Liquid syntax. You can use this syntax, combined with exposed parameter values, to programmatically construct elements of the message. For example, you can reference the `request_language` parameter to change the language of the message:

```text
{% if request_language contains 'dutch' %}
   Hier is uw verificatie code: {{ code }}
{% endif %}

{% if request_language contains 'fr-FR' %}
   Ceci est votre code: {{ code }}
{% endif %}
```

The following parameters are available when defining the message template:

| Exposed Parameter | Description |
|:------------------|:---------|
| `code`            | The password to use |
| `link`            | The generated sign-in link |
| `application.name` | The name of the application with which the user is signing up |
| `request_language` | The requested language for message content |
| `operation` | Indicates when the template has been triggered by an update to a user's email via the API. Equals `change_email` when triggered; otherwise, null.|

## Enable your apps

Click the **Apps** tab, and enable the apps for which you would like to use Passwordless Email.

## Email Providers

By default, Auth0 sends the email from its own SMTP provider. Auth0's built-in email infrastructure should be used for testing-level emails only. You can [configure your own email provider](/email/providers) to better monitor and troubleshoot the email service as well as be able to fully customize the emails.

::: note
You will need to use your own email provider to be able to modify the `From`, `Subject`, and `Body` of Passwordless emails.
:::

You may configure Auth0 to send users one-time codes using:

* [Mandrill](/email/providers#configure-mandrill)
* [AWS](/email/providers#configure-amazon-ses)
* [Twilio SendGrid](/email/providers#configure-sendgrid)
* [SparkPost](/email/providers#configure-sparkpost)
* [Mailgun](/email/providers#configure-mailgun)
* [your own custom SMTP email provider](/email/providers#configure-a-custom-smtp-server)

::: note
To use a custom SMTP email provider, the SMTP server must:
* support LOGIN authentication
* support TLS 1.0 or higher
* use a certificate signed by a public certificate authority (CA)
:::
