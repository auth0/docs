#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

In the Dashboard under [Connections > Passwordless](${uiURL}/#/connections/passwordless), set the SMS slider to the right to enable the SMS Passwordless feature.

At this point, select the apps for which you'd like to use Passwordless SMS. To activate this feature for a given app, set the slider to the right of the app's name to the right so that it is green. Click "Continue" to bring up the configuration screen for you to populate with the appropriate credentials.

Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

Enter the **From** phone number that users will see as the sender of the SMS. You may also configure this in Twilio.

Lastly, enter the **Message** that will appear in the body of the SMS.

Please note that the `@@password@@` placeholder in the Message will be automatically replaced with the one-time password that is sent to the user.

![](/media/articles/connections/passwordless/passwordless-sms-config.png)

##### Multi-Language Support

The Message area supports usage of multiple languages.

By making the appropriate `PATCH` call to the Auth0 Management API, you can set the value of the 'X-Request-Language' header to your language of choice. If the value of this header is not set, Auth0 defaults to the fallback, which is the value in the 'Accepts-Language' header that is automatically set by your browser.

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/connections/CONNECTION_ID",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer YOUR_TOKEN" }
    ],
    "queryString" : [],
    "postData" : {"options":{"request_language":"en-US"}},
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

The Message area accepts Liquid syntax, and you can use this, combined with the exposed value, to change the language of the message you send.

```text
{% if request_language contains 'dutch' %}
   Hier is uw verificatie code: @@password@@
{% endif %}

{% if request_language contains 'fr-FR' %}
   Ceci est votre code: @@password@@
{% endif %}
```
