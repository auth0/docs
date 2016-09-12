#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

In the Dashboard under [Connections > Passwordless](${manage_url}/#/connections/passwordless), set the SMS slider to the right to enable the SMS Passwordless feature.

Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields. 

**NOTE**: For information on obtaining a Twilio SID and Auth Token, see: [How to create an Application SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and [Auth Tokens and how to change them](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it).

Select the **SMS Source** that users will see as the sender of the SMS.

**NOTE**: For information on using Copilot, see: [Sending Messages with Copilot](https://www.twilio.com/docs/api/rest/sending-messages-copilot).

Enter either your **Twilio Messaging Service SID** or a **From** phone number, depending on the **SMS Source** selected above.

Lastly, enter the **Message** that will appear in the body of the SMS.

**NOTE:**  The `@@password@@` placeholder in the Message will be automatically replaced with the one-time password that is sent to the user.

Click **SAVE**.

![](/media/articles/connections/passwordless/passwordless-sms-config.png)

##### Multi-Language Support

The Message area supports usage of multiple languages.

By making a call to the [/passwordless/start](/api/authentication#!#post--with_sms) authentication endpoint, you can set the value of an 'x-request-language' header to the language of your choice. If the value of this header is not set, the language will be extracted from the value in the 'accept-language' header that is automatically set by the browser.

The Message area accepts Liquid syntax. You can use this syntax, combined with exposed parameter values, to programmatically construct elements of the message. For example, you can reference the `request_language` parameter to change the language of the message:

```text
{% if request_language contains 'dutch' %}
   Hier is uw verificatie code: {{ password }}
{% endif %}

{% if request_language contains 'fr-FR' %}
   Ceci est votre code: {{ password }}
{% endif %}
```
The following paramaters are available when defining the template:

| Exposed Parameter | Description |
|:------------------|:---------|
| `password` or `code` | the password to use |
| `phone_number` | the user's phone number |
| `application.name` | the name of the application name where the user is signing up |
| `request_language` | the requested language for the message content |

#### 3. Enable your apps

Go to the **Apps** tab of the SMS settings and enable the apps for which you would like to use Passwordless SMS.