---
description: How to implement Multifactor Authentication Using YubiKey NEO.
---

# Multifactor Authentication with YubiKey NEO

This tutorial shows you how to implement Multifactor Authentication (MFA) using [YubiKey NEO](https://www.yubico.com/products/yubikey-hardware/yubikey-neo/).

Implementing MFA using YubiKey NEO requires use of the following Auth0 features for the described reasons:

| Feature | Usage |
| - | - |
| [Webtask](https://webtask.io) | Hosts the website where the user undergoes the second authentication factor using YubiKey |
| The [Redirect Protocol](/protocols#redirect-protocol-in-rules) | Redirects the user to the website that performs the second authentication factor using YubiKey |
| [Rules](/rules) | Evaluates whether the conditions you set for triggering MFA have been met or not |

## Configure the Webtask

The first thing we'll do is create the website where the user completes the second authentication step using YubiKey. We'll be using Webtask, which allows you to run code using the Auth0 sandbox, to host the site. In this tutorial, we'll use a single Webtask to handle three steps:

* **Render** the UI with the `otpForm` function
* **Capture** the YubiKey NEO code and validate it using the Yubico API
* **Return** the result of the validation to Auth0 -- if successful, Auth0 continues to process the login transaction

### Step 1: Create the Webtask Code

Webtask runs code you provide, so we'll begin by creating the code needed. We've provided you with a [fully-functional sample](https://github.com/auth0/rules/blob/master/redirect-rules/yubico-mfa.md), which you need to save locally in a file called `yubico-mfa-wt.js`.

Within the code provided is a redirect URL to Auth0. It contains querystring parameters called `id_token` and `state`. The `id_token` parameter is used to transfer information back to Auth0. The `state`parameter is used to protect against CSRF attacks.

No actual key values are hard-coded into the Webtask code. Your Yubico Client ID and Secret values are referred to using `context.data.yubico_clientid` and `context.data.yubico_secret`. These parameters are securely embedded in the Webtask token when you created the Webtask.

### 1. Initialize Webtask CLI

**Rules** code is automatically packaged as Webtasks by Auth0. Since this is a custom Webtask, it must be created with the Webtask CLI.

Follow the instructions for installing Webtask CLI under [Tenant Settings > Webtasks](${manage_url}/#/tenant/webtasks) on the Auth0 dashboard.

Once the Webtask CLI is installed, run:

```txt
wt create --name yubikey-mfa --secret yubikey_secret={YOUR YUBIKEY SECRET} --secret yubikey_clientid={YOUR YUBIKEY CLIENT ID} --secret returnUrl=https://${account.namespace}/continue --profile {WEBTASK PROFILE} yubico-mfa-wt.js
```

::: note
Replace `WEBTASK PROFILE` in the code above with the value of the -p parameter shown at the end of the code in Step 2 of the [Tenant Settings > Webtasks](${manage_url}/#/tenant/webtasks) page.
:::

The `create` command will generate a URL that will look like:

```txt
https://sandbox.it.auth0.com/api/run/${account.tenant}/yubikey-mfa?webtask_no_cache=1
```

Keep a copy of this URL.

## Configure the Rule

This sample uses a single rule that handles both the initial redirect to the Webtask, and the returned result.

 * The `context.redirect` statement instructs Auth0 to redirect the user to the Webtask URL instead of calling back to the app.

 * Returning is indicated by the `protocol` property of the `context` object.

```JS
function (user, context, callback) {
  var jwt = require('jsonwebtoken@5.7.0');
  var yubikey_secret = configuration.YUBIKEY_SECRET;

  //Returning from OTP validation
  if(context.protocol === 'redirect-callback') {
    var decoded = jwt.verify(
      context.request.query.id_token,
      new Buffer(yubikey_secret,'base64')
    );
    if (!decoded) { return callback(new Error('Invalid OTP')); }
    if (decoded.status !== 'OK') { return callback(new Error('Invalid OTP Status')); }

    return callback(null,user,context);
  }

  //Trigger MFA
  context.redirect = {
        url: config.WEBTASK_URL + "?user=" + user.name
  }

  callback(null,user,context);
}
```

::: note
The returning section of the rule validates the JWT issued by the Webtask. This prevents the result of the MFA part of the transaction from being tampered with because the payload is digitally signed with a shared secret.
:::

Every time the user logs in they will be redirected to the Webtask and will see something like:

![](/media/articles/mfa/yubico-mfa.png)


### Rule customizations
You can add logic to the rule to decide under which  conditions the challenge will be triggered based on:

* The IP address or location of the user
* The application the user is logging into
* The type of authentication used (e.g. AD, LDAP, social, etc.)

## Additional Information:

* [Rules](/rules)
* [Multi-factor in Auth0](/multifactor-authentication)
* [Auth0 Webtask](https://webtask.io/)
