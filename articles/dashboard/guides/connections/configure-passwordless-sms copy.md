---
title: Configure Passwordless Connections
topics:
    - connections
    - passwordless
    - sms
contentType: how-to
useCase: customize-connections
---
# Configure Passwordless Connections

This guide will show you how to set up a connection for [Passwordless Authentication](/connections/passwordless) using Auth0's Dashboard.

1. Navigate to the [Connections > Passwordless](${manage_url}/#/connections/passwordless) page in the [Auth0 Dashboard](${manage_url}/), and enable toggle for the passwordless method you would like to use.

![Enable Passwordless Method](/media/articles/connections/passwordless/connections-passwordless-list.png)

2. Configure the chosen passwordless method.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#sms" data-toggle="tab">SMS</a></li>
      <li><a href="#email" data-toggle="tab">Email</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="sms" class="tab-pane active">
      <pre class="text hljs"><code>GET /authorize?
    response_type=code
    &scope=openid email favorite_color offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &device=my-device-name</code></pre>
    <ul>
        <li>The <code>device</code> parameter is only needed if <a href="/tokens/refresh-token">requesting a <dfn data-key="refresh-token">Refresh Token</dfn></a> by passing the <code>offline_access</code> <dfn data-key="scope">scope</dfn>.</li>
    </ul>
    </div>

    <div id="email" class="tab-pane">
      <pre class="text hljs"><code>GET /authorize?
    response_type=code
    &scope=openid email offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &audience=https://api.example.com </code></pre>
    <ul>
        <li><code>favorite_color</code> is no longer a valid scope value.</li>
        <li>The <code>device</code> parameter is removed.</li>
        <li>The <dfn data-key="audience"><code>audience</code></dfn> parameter is optional.</li>
    </ul>
    </div>
  </div>
</div>



::: panel Twilio Account
Before proceeding, you will need a valid Twilio account. Auth0 will use your [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and [Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it) to send SMS messages to users.
:::


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

<li> Create the SMS body text.

<p>You can customize your SMS message by using the following parameters:

<table>
<th><td>Parameter</td><td>Description</td></th>
<tr><td><code>@@password@@</code> or <code>@@code@@</code></td><td>One-time-use code that is sent to the user; you must send this parameter for your users to receive their code.</td></tr>
<tr><td><code>@@phone_number@@</code></td><td>Phone number of the user that is authenticating.</td></tr>
<tr><td><code>@@application.name@@</code></td><td>Name of the application to which the user is authenticating.</td></tr>
<tr><td><code>@@request_language@@</code></td><td>Requested language that be used for the SMS message's content.</td></tr>
</table>

<strong>Make sure that your Message includes <code>@@password@@</code> since this is the placeholder that will be replaced with the one-time-use code that is sent to the user.</strong>
</p></li>

<%= include('./_includes/_message-syntax-copy', { if((#sms").length){ isSMS: true;}}) %>

<%= include('./_includes/_message-language-copy') %>

<%= include('./_includes/_otp-settings-copy') %>

<%= include('./_includes/_control-sign-ups-copy') %>

<li>To save your changes, click **Save**.</li>
</ul>

<%= include('./_includes/_enable-apps-copy') %>


