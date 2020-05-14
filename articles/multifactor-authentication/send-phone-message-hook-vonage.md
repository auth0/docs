---
description: Configure a Custom SMS Provider for MFA using Vonage
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure a Custom SMS Provider for MFA using Vonage

This guide explains how to send <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> text messages using the Vonage (previously Nexmo) SMS API.

<%= include('./_includes/_test-setup') %>

## What is Vonage?

Vonage provides an SMS API which can be used by Auth0 to deliver multi-factor verification via text messages. To learn more, see [Vonage's SMS API Overview](https://www.vonage.com/communications-apis/sms/).

## Get Started with Vonage

First, [sign up with Vonage](https://dashboard.nexmo.com/sign-up) and complete your profile and confirmation steps. Once done, you should be able to access the [SMS API screen of the Vonage dashboard](https://dashboard.nexmo.com/getting-started/sms). Here, you can try out the API with a test number.

![Vonage Dashboard Test SMS API](/media/articles/multifactor-authentication/01-guide-vonage-dashboard-sms-api-test.png)

Once you've successfully tested the SMS API and can receive a text message, you're ready to integrate with Auth0.

## Steps

To configure a custom SMS provider for MFA using Vonage, you will:

1. [Create a Send Phone Message Hook](#create-a-send-phone-message-hook)
2. [Configure Hook Secrets](#configure-hook-secrets)
3. [Include the nexmo module](#include-the-nexmo-module)
4. [Add the Vonage API Call](#add-the-vonage-api-call)
5. [Test your Hook implementation](#test-your-hook-implementation)
6. [Activate the custom SMS factor](#activate-the-custom-sms-factor)
7. [Test the MFA flow](#test-the-mfa-flow)

Optional: [Troubleshoot](#troubleshoot)

### Create a Send Phone Message Hook

You're going to use a Hook in the Auth0 dashboard to send the text message when MFA is required. To do that, you need the API information for your Vonage account and a simple Node function to send the message.

1. Navigate to the [Hooks screen](${manage_url}/#/hooks) in the Auth0 Dashboard, scroll down to **Send Phone Message**, and click **Create New Hook**.

![Auth0 Dashboard: Add New Hook](/media/articles/multifactor-authentication/02-guide-auth0-add-new-hook.png)

2. Give the Hook a name, click **Create**, then click the **Edit Hook** button to configure secrets and add the Vonage API call.

![Auth0 dashboard edit SMS hook](/media/articles/multifactor-authentication/03-guide-auth0-edit-new-sms-hook.png)

### Configure Hook Secrets

You're going to store each of the values needed from the Vonage dashboard in a [Hook Secret](/hooks/secrets). This way, the values are secure and can be used easily in your function.

1. Click the **Settings** icon (wrench) on the top left and select **Secrets**, then click **Add Secret**, and add the following secrets. You can find the values for all three of these secrets in the [Getting Started Guide](https://dashboard.nexmo.com/getting-started-guide) in the Vonage dashboard.

* `VONAGE_API_KEY`: Vonage API key
* `VONAGE_API_SECRET`: Vonage API secret
* `VONAGE_FROM_NUMBER`: Vonage "from" sending number

![Auth0 Dashboard: Add Hook Secret](/media/articles/multifactor-authentication/04-guide-auth0-add-hook-secrets.png)

### Include the nexmo module

The Hook uses the [Nexmo Client Library for Node.js](https://aws.amazon.com/sdk-for-node-js/), so you'll need to include this package in your Hook.

Next, you'll need to include the `nexmo` module in your hook.

1. Click the **Settings** icon again, and select **NPM Modules**. 

2. Search for `nexmo` and add the module that appears.

![Auth0 Dashboard: Add Hook Module](/media/articles/multifactor-authentication/05-guide-auth0-add-nexmo-module.png)

## Add the Vonage API call

To make the call to the Vonage API, add the appropriate code to the Hook.

1. Copy the code block below and paste it into the Hooks code editor. This function will run each time a user requires MFA, calling the Vonage API to send a verification code via SMS.

```js
module.exports = function(toNumber, text, context, cb) {
  const Nexmo = require('nexmo');
  const nexmo = new Nexmo({
    apiKey: context.webtask.secrets.VONAGE_API_KEY,
    apiSecret: context.webtask.secrets.VONAGE_API_SECRET,
  });

  const fromNumber = context.webtask.secrets.VONAGE_FROM_NUMBER;
  toNumber = toNumber.replace(/\D/g, '');

  nexmo.message.sendSms(fromNumber, toNumber, text, (err, responseData) => {
    if (err) {
      return cb(err);
    }

    const firstMsg = responseData.messages[0];
    if (firstMsg['status'] !== '0') {
      return cb(new Error('Message failed: ' + firstMsg['error-text']));
    }

    return cb(null, {});
  });
};
```

2. Click **Save**.

### Test your Hook implementation

Click the **Runner** button to try the completed Hook. Make sure to change the `recipient` value in the body to your test number from the Vonage API.

You should receive a test text message, and the webtask should complete successfully.

![Auth0 Dashboard: Run SMS Hook](/media/articles/multifactor-authentication/06-guide-auth0-run-sms-hook.png)

### Activate the custom SMS factor

The Hook is now ready to send MFA codes via the Vonage SMS API. The last steps are to configure the SMS Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **SMS** factor box.

2. In the modal that appears, select **Custom** for the **SMS Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the SMS factor using the toggle switch.

![Auth0 Dashboard: Activate SMS Factor](/media/articles/multifactor-authentication/07-guide-auth0-activate-sms-factor.png)

::: note
To use the SMS factor, your tenant needs to have MFA enabled globally or required for specific contexts using Rules. To learn how to enable the MFA feature itself, see the following docs:

- [Enable Multi-Factor Authentication](/mfa/guides/enable-mfa)
- [Customize Multi-Factor Authentication](/mfa/guides/customize-mfa-universal-login)
:::

### Test the MFA flow

You can now test your authentication flow to see the Vonage API in action.

![Test MFA SMS verification](/media/articles/multifactor-authentication/08-guide-test-sms-verification.png)

## Troubleshoot

If something was misconfigured in Vonage, the Hook, or the SMS Factor, you may see an error message on the login form when trying this factor out for the first time.

![Auth0 Universal Login MFA SMS Error](/media/articles/multifactor-authentication/09-guide-login-sms-error-message.png)

The best place to start debugging this issue is the [Logs screen](${manage_url}/#/logs) in the Auth0 dashboard. Look for a failed SMS log entry:

![Auth0 Logs: Error Sending MFA SMS](/media/articles/multifactor-authentication/10-guide-auth0-log-sms-error.png)

To learn which event types to search, see our [Log Event Type Code list](/logs/references/log-event-type-codes). Otherwise, use the **Filter** control to find `MFA` errors.

Once you find a log entry of interest, scroll down in the **Raw** tab to see an error message explaining what went wrong:

![Auth0 Logs: Error Sending MFA SMS Details](/media/articles/multifactor-authentication/11-guide-auth0-log-sms-error-details.png)

If this does not solve your issue, the next step would be to check the [Vonage SMS API logs](https://dashboard.nexmo.com/sms) for a sent message and check its status. If there is no record of the message with Vonage, then the API call likely failed and the problem is in the Hook code.

## Additional providers

::: next-steps
* [Configure a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
* [Configure a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
* [Configure a Custom SMS Provider for MFA using Infobip](/multifactor-authentication/send-phone-message-hook-infobip)
* [Configure a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
:::
