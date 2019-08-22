---
title: Configure Passwordless SMS Connections
topics:
    - connections
    - passwordless
    - sms
contentType: how-to
useCase: customize-connections
---
# Configure Passwordless SMS Connections

This guide will show you how to configure Passwordless SMS connections using Auth0's Dashboard.

::: panel Twilio Account
Before proceeding, you will need a valid Twilio account. Auth0 will use your [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and [ Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it) to send SMS messages tousers.
:::

1. Navigate to the [Connections > Passwordless](${manage_url}/#/connections/passwordless) page in the [Auth0 Dashboard](${manage_url}/), and enable the SMS toggle.

![Enable SMS Passwordless](/media/articles/connections/passwordless/connections-passwordless-list.png)

2. Enter your **Twilio Account SID** and **Twilio Auth Token**.

::: note
To learn how to find your Twilio SID and Auth Token, see the Twilio docs on the[Application SID](https://support.twilio.com/hc/en-us/articles/223136607-What-is-an-Application-SID-) and the [AuthToken](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them).
:::

![Configure SMS Passwordless](/media/articles/connections/passwordless/connections-passwordless-sms.png)

3. Select your **SMS Source** and, depending on your selection, enter either your **Twilio Messaging Service SID** or a **From** phone number.

The SMS Source indicates the number from which the SMS messages will be sent. You Users will see what you enter as the sender of the SMS.

::: note
Twilio Copilot is an app that offers an intelligent SMS delivery service. It helps with things like selecting a local number to use based on recipient and correcting errors in your SMS message that may affect delivery. To learn about using the Twilio Copilot features with your Passwordless SMS messages, see [Sending Messages with Copilot](https://www.twilio.com/docs/api/rest/sending-messages-copilot).
:::

4. In **Message**, enter the body text of the SMS.

You can include custom information in your SMS message. To help with this, the following parameters are available to you for use in the message template:

| Parameter | Description |
| - | - |
| `password` or `code` | The one-time password to send to the user |
| `phone_number ` | The user's phone number |
| `application.name` | The name of the application to which the user is logging in |
| `request_language` | The requested language to be used for the SMS message's content |

**Make sure that your Message includes `@@password@@` since this is the placeholder that will be replaced with the one-time password that is sent to the user.**

### Multi-language SMS messages

You can use multiple languages in your SMS Messages. You can choose the language used by calling the [`passwordless/start`](/docs/api/authentication/reference#get-code-or-link) endpoint and setting the `x-request-language` header to the language of your choice. Otherwise, the language used will be extracted from the `accept-language` header (which is automatically set by your browser).

### SMS message syntax

The **Message** area accepts Markdown and [Liquid](/email/liquid-syntax) syntax. If you choose to use Liquid, you can programmatically construct elements of the message.

<%= include('./_includes/_otp-settings') %>

<%= include('./_includes/_control-sign-ups') %>

<%= include('./_includes/_enable-apps') %>
