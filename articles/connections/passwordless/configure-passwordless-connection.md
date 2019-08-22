---
title: Configure Passwordless Connections
topics:
    - connections
    - passwordless
    - sms
    - email
contentType: how-to
useCase: customize-connections
---
# Configure Passwordless Connections

This guide will show you how to configure Passwordless connections using Auth0's Dashboard. This task can also be performed using the Management API.

## Configure Passwordless using SMS messages

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

1. In **Message**, enter the body text of the SMS.

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

1. Adjust settings for your **OTP Expiry** and **OTP Length**.

| Parameter | Description |
| - | - |
| OTP Expiry | The amount of time before the one-time password expires |
| OTP Length | The length of the one-time password sent to the user |

If you choose to extend the OTP expiry time, we recommend increasing the OTP length for security reasons. Otherwise, the malicious party has a longer time frame to try to guess an OTP that is shorter in length.

6. Control sign ups

If you want to restrict sign-ups and only allow the addition of new users via the API or the Dashboard, click the **Disable Sign Ups** toggle to do so.

When you are done making configuration changes, click **Save**.

## Enable your apps

Switch from the **Settings** tab to the the **Applications** tab. Enable the apps for which you would like to use the Passwordless connection with SMS messages.

## Configure Passwordless using email

1. Navigate to the [Connections > Passwordless](${manage_url}/#/connections/passwordless) page in the [Auth0 Dashboard](${manage_url}/), and enable the Email toggle.

![Enable Email Passwordless](/media/articles/connections/passwordless/connections-passwordless-list.png)

2. Enter the email address you want users to see as the sender in the **From** field, and set the **Subject** line for your email.

![Configure Email Passwordless](/media/articles/connections/passwordless/connections-passwordless-email.png)

Auth0 allows you to use either the default email template or a custom template you design, and the **From** field is tied to the template. If you are using a custom template, you must change the **From** value to an address that does *not* use the domain **auth0.com**. Otherwise, the default email template will be sent.

3. Edit the **Body** of your email. If you have an email template you want to use, you can provide the HTML for it here. Alternatively, you can use Auth0's default template.

::: note
If you want to revert the changes you make to your email template, you can do so at any time. You can either **reset to last saved** template, or you can **reset to default**.
:::

You can include custom information in your Passwordless email. To help with this, the following parameters are available to you for use in the email template:

| Parameter | Description |
| - | - |
| `password` or `code` | The one-time password to send to the user |
| `phone_number ` | The user's phone number |
| `application.name` | The name of the application to which the user is logging in |
| `request_language` | The requested language to be used for the SMS message's content |

### Multi-language email messages

You can also use multiple languages in your emails. To set the language used, call the [`passwordless/start`](/docs/api/authentication/reference#get-code-or-link) endpoint and set the `x-request-language` header to the language of your choice. Otherwise, the language used will be extracted from the `accept-language` header (which is automatically set by your browser).

### Email message syntax

The template editor accepts [Liquid](/email/liquid-syntax) syntax embedded within the HTML. This allows you to construct parts of your message programmatically.

1. Enter any **Authentication Parameters** you would like to include in the generated sign-in link. These will be included as query string parameters.

2. Adjust settings for your **OTP Expiry** and **OTP Length**.

| Parameter | Description |
| - | - |
| OTP Expiry | The amount of time before the one-time password expires |
| OTP Length | The length of the one-time password sent to the user |

If you choose to extend the OTP expiry time, we recommend increasing the OTP length for security reasons. Otherwise, the malicious party has a longer time frame to try to guess a OTP that is short in length.

6. Control sign ups

If you want to restrict sign-ups and only allow the addition of new users via the API or the Dashboard, click the **Disable Sign Ups** toggle to do so.

When you are done making configuration changes, click **Save**.

## Enable your apps

Switch from the **Settings** tab to the the **Applications** tab. Enable the apps for which you would like to use the Passwordless connection with email.
