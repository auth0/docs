---
description: Configuring a Custom SMS Provider for MFA using Vonage
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configuring a Custom SMS Provider for MFA using Vonage

This guide covers how to send multi-factor authentication text messages using the Vonage (previously Nexmo) SMS API.

**Please Note:** The following steps will add text-message-based multifactor to the login flow for the tenant that you're working in. We **highly** recommend testing this setup on a [staging or development server](/dev-lifecycle/setting-up-env) before making the changes to your production login flow.

## What is Vonage?

Vonage provides an SMS API which can be used by Auth0 to deliver multi-factor verification via text messages. In their words:

> *Support secure text messaging ... with private SMS communication, your users can seamlessly and safely book appointments, confirm deliveries, and more. Enable communication without compromising privacy, ensure conversations and transactions between parties stay on your platform, and perform analysis and generate new insights for your business.*

[More](https://www.vonage.com/communications-apis/sms/)

## Get Started with Vonage

First, [sign up with Vonage](https://dashboard.nexmo.com/sign-up) and complete your profile and confirmation steps. Once this is complete, you should be able to access the [SMS API screen of the Vonage dashboard](https://dashboard.nexmo.com/getting-started/sms). Here, you can try out the API with a test number.

![Vonage dashboard test SMS API](/media/articles/multifactor-authentication/01-guide-vonage-dashboard-sms-api-test.png)

Once you've successfully tested the SMS API and can receive a text message, you're ready to integrate with Auth0.

## Send Phone Message Hook

We're going to use a Hook in the Auth0 dashboard to send the text message when MFA is required. To do that, we need the API information for your Vonage account and a simple Node function to send the message.

Go to the [Hooks screen](https://manage.auth0.com/#/hooks) in the Auth0 Dashboard, scroll down to **Send Phone Message**, and click **Create New Hook**.

![Auth0 dashboard add new hook](/media/articles/multifactor-authentication/02-guide-auth0-add-new-hook.png)

Give the Hook a name, click **Create**, then click the **Edit Hook** button to add the Vonage API call.

![Auth0 dashboard edit SMS hook](/media/articles/multifactor-authentication/03-guide-auth0-edit-new-sms-hook.png)

We're going to store each of the values needed from the Vonage dashboard in a [Hook Secret](/hooks/secrets) so they can be stored securely and used easily in our function.

Click the **Settings** icon (wrench) on the top left and select **Secrets**. Click **Add Secret** and add the following secrets. All three of these values can be found on [Getting Started guide](https://dashboard.nexmo.com/getting-started-guide) in the Vonage dashboard.

- `VONAGE_API_KEY` - Vonage API key
- `VONAGE_API_SECRET` - Vonage API secret
- `VONAGE_FROM_NUMBER` - Vonage "from" sending number

![Auth0 dashboard add hook secret](/media/articles/multifactor-authentication/04-guide-auth0-add-hook-secrets.png)

Next, we'll need to include the `nexmo` module in our hook. Click the **Settings** icon again and select **NPM Modules**. Search for "nexmo" and add the module that appears.

![Auth0 dashboard add hook module](/media/articles/multifactor-authentication/05-guide-auth0-add-nexmo-module.png)

Next, copy the code block below and paste it into the Hooks code editor. This function will run each time a user requires MFA, calling the Vonage API to send a verification code via SMS.

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

Click **Save** in the editor, then click the **Runner** button to try the completed Hook. Make sure to change the `recipient` value in the body to your test number from the Vonage API.

You should receive a test text message and the webtask should complete successfully.

![Auth0 dashboard run SMS hook](/media/articles/multifactor-authentication/06-guide-auth0-run-sms-hook.png)

The Hook is now ready to send multi-factor authentication codes via the Vonage SMS API. The last step is  to configure the SMS Factor to use this custom code.

## Activate Custom SMS Factor

In the Auth0 dashboard, go to the [Multifactor Auth](https://manage.auth0.com/#/mfa) screen and click on the **SMS** factor box.

In the modal that appears, select **Custom** for the **SMS Delivery Provider** and make any adjustments you'd like to the templates. Click **Save** when complete, close the modal, and click the toggle switch to turn the SMS factor on.

![Auth0 dashboard activate SMS factor](/media/articles/multifactor-authentication/07-guide-auth0-activate-sms-factor.png)

To use the SMS factor, your tenant needs to have MFA enabled globally or required for specific contexts using Rules. Please see the documentation links links below for instructions on how to enable the MFA feature itself.

- [Enable Multi-Factor Authentication](/mfa/guides/enable-mfa)
- [Customize Multi-Factor Authentication](/mfa/guides/customize-mfa-universal-login)

With this complete, you can now test your authentication flow to see the Vonage API in action.

![Test MFA SMS verification](/media/articles/multifactor-authentication/08-guide-test-sms-verification.png)

## Troubleshooting

If something was misconfigured in Vonage, the Hook, or the SMS Factor, you may see an error message on the login form when trying this factor out for the first time.

![Auth0 universal login MFA SMS error](/media/articles/multifactor-authentication/09-guide-login-sms-error-message.png)

The best place to start debugging this issue is the [Logs screen](https://manage.auth0.com/#/logs) in the Auth0 dashboard. Look for a failed SMS log entry like this:

![Auth0 logs error sending MFA SMS](/media/articles/multifactor-authentication/10-guide-auth0-log-sms-error.png)

See our [Log Event Type Code list](/logs/references/log-event-type-codes) for types to search or use the **Filter** control to find "MFA" errors.

If you scroll down in the **Raw** tab, you should see an error message explaining what went wrong:

![Auth0 logs error sending MFA SMS details](/media/articles/multifactor-authentication/11-guide-auth0-log-sms-error-details.png)

If this does not solve your issue, the next step would be to check the Vonage [SMS API logs](https://dashboard.nexmo.com/sms) for a message sent and what the status was. If there was no record with Vonage of the message, then the API call likely failed and the problem is in the Hook code.
