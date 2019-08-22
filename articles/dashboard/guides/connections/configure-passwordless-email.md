---
title: Configure Passwordless Email Connections
topics:
    - connections
    - passwordless
    - email
contentType: how-to
useCase: customize-connections
---
# Configure Passwordless Email Connections

This guide will show you how to configure Passwordless SMS connections using Auth0's Dashboard.

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

1. Enter any **Authentication Parameters** you would like to include in the generated sign-in link. These will be included as query string parameters. You can use these parameters to alter the authentication process, e.g., requesting permissions to access things like user profile information. 

<%= include('./_includes/_otp-settings') %>

<%= include('./_includes/_control-sign-ups') %>

<%= include('./_includes/_enable-apps') %>