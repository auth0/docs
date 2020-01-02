
Navigate to the [Connections > Passwordless](${manage_url}/#/connections/passwordless) page in the [Auth0 Dashboard](${manage_url}/), and enable the SMS toggle.

![Enable SMS Passwordless](/media/articles/connections/passwordless/connections-passwordless-list.png)

To send the SMS, you can either use Twilio, or a Custom SMS Gateway.

### Configure Twilio settings

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

1. Enter your **Twilio Account SID** and **Twilio Auth Token**.

::: note
To learn how to find your Twilio SID and Auth Token, see Twilio docs: [How to create an Application SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and [Auth Tokens and how to change them](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it).
:::

![Configure SMS Passwordless](/media/articles/connections/passwordless/connections-passwordless-sms.png)

2. Select your **SMS Source** and depending on your selection, enter either your **Twilio Messaging Service SID** or a **From** phone number. Users will see what you enter as the sender of the SMS.

::: note
To learn about using Twilio Copilot, see Twilio docs: [Sending Messages with Copilot](https://www.twilio.com/docs/api/rest/sending-messages-copilot).
:::

### Configure a custom SMS gateway

If you would like to use your own SMS gateway, you will need to create the passwordless connection and then modify it using our Management API. To learn how to modify the connection to use your own SMS gateway, see [Configure SMS Gateway for Passwordless Connections](/connections/passwordless/guides/use-sms-gateway-passwordless).

### Configure passwordless SMS settings

1. In **Message**, enter the body text of the SMS.

::: note
The `@@password@@` placeholder will automatically be replaced with the one-time password that is sent to the user.
:::

2. Adjust settings for your **OTP Expiry** and **OTP Length**.

<%= include('../../_otp-limitations') %>

3. Decide if you want to **Disable Signups**. You can enable passwordless access just for existing users by enabling this setting.

4. Click **SAVE**.

#### Multi-language support

The **Message** area supports multiple languages. 

To choose the language, call the [/passwordless/start authentication endpoint](/api/authentication/reference#get-code-or-link) and set the value of the 'x-request-language' header. When this header is not set, the language is extracted from the 'accept-language' header, which is automatically set by the browser.

#### Message syntax

The **Message** area accepts Liquid syntax. You can use this syntax, combined with exposed parameter values, to programmatically construct elements of the message. For example, you can reference the `request_language` parameter to change the language of the message:

```text
{% if request_language contains 'dutch' %}
   Hier is uw verificatie code: {{ password }}
{% endif %}

{% if request_language contains 'fr-FR' %}
   Ceci est votre code: {{ password }}
{% endif %}
```

The following parameters are available when defining the message template:

| Exposed Parameter | Description |
|:------------------|:---------|
| `password` or `code` | The password to use |
| `phone_number` | The user's phone number |
| `application.name` | The name of the application with which the user is signing up |
| `request_language` | The requested language for message content |

### Enable your apps

Click the **Apps** tab, and enable the apps for which you would like to use <dfn data-key="passwordless">Passwordless</dfn> SMS.
