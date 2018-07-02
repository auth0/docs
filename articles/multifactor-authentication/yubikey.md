---
description: How to implement Multifactor Authentication Using YubiKey NEO.
toc: true
topics:
    - mfa
    - yubikey
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Multifactor Authentication with YubiKey NEO

This tutorial shows you how to implement Multifactor Authentication (MFA) using [YubiKey NEO](https://www.yubico.com/products/yubikey-hardware/yubikey-neo/).

:::warning
Binding an OTP to an identity is outside the scope of this article.
:::

Implementing MFA using YubiKey NEO requires use of the following Auth0 features for the described reasons:

| Feature | Usage |
| - | - |
| [Webtask](https://webtask.io) | Hosts the website where the user undergoes the second authentication factor using YubiKey |
| The [Redirect Protocol](/rules/redirect) | Redirects the user to the website that performs the second authentication factor using YubiKey |
| [Rule](/rules) | Evaluates whether the conditions you set for triggering MFA have been met or not |

In this tutorial, we will walk you through the configuration required for the Webtask, redirect protocol, and rules.

## Configure the Webtask

The first thing we'll do is create the website where the user completes the second authentication step using YubiKey. We'll use a Webtask, which allows you to run code using the Auth0 sandbox, to host the site. More specifically, the Webtask will:

* **Render** the UI with the `otpForm` function
* **Capture** the YubiKey NEO code and validate it using the Yubico API
* **Return** the result of the validation to Auth0 -- if successful, Auth0 continues to process the login transaction

### Step 1: Create the Webtask Code

Webtask runs code you provide, so we'll begin by creating the code needed. We've provided you with a [fully-functional sample](https://github.com/auth0/rules/blob/master/redirect-rules/yubico-mfa.md), which you need to save locally in a file called `yubico-mfa-wt.js`.

Within the code provided is a redirect URL to Auth0. It contains querystring parameters called `id_token` and `state`. The `id_token` parameter is used to transfer information back to Auth0. The `state` parameter is used to protect against CSRF attacks.

No actual key values are hard-coded into the Webtask code. Your Yubico Client ID and Secret values are referred to using `context.data.yubico_clientid` and `context.data.yubico_secret`. These parameters are securely embedded in the Webtask token when you created the Webtask.

### Step 2: Initialize the Webtask CLI

Now that we have the code for our Webtask, we'll need to create the Webtask itself. We do this using the Webtask CLI.

To use the Webtask CLI, you'll need to install it using instructions that can be found under [Tenant Settings > Webtasks](${manage_url}/#/tenant/webtasks) on the Auth0 Dashboard.

![](/media/articles/mfa/yubi-1.png)

Once you've installed the Webtask CLI, run the following code after you've replaced the placeholders with your Yubico Client ID and Secret values (make sure that the Webtask CLI can access to location where you have your `yubico-mfa-wt.js` file):

```txt
wt create --name yubikey-mfa --secret yubikey_secret={YOUR YUBIKEY SECRET} --secret yubikey_clientid={YOUR YUBIKEY CLIENT ID} --secret returnUrl=https://${account.namespace}/continue --profile {WEBTASK PROFILE} yubico-mfa-wt.js
```

::: note
You can get your `WEBTASK PROFILE` value (needed for the-p parameter shown at the end of the code above) in **Step 2** of the Webtask installation instructions shown on the [Tenant Settings > Webtasks](${manage_url}/#/tenant/webtasks) page.
:::

Running the `create` command as shown above will generate a URL that looks like this:

```txt
https://sandbox.it.auth0.com/api/run/${account.tenant}/yubikey-mfa?webtask_no_cache=1
```

Keep a copy of this URL.

## Create the Rule

This sample uses a single rule that handles:

* The initial redirect to the Webtask
* The returned result

Here is what the rule looks like:

```js
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
        url: configuration.WEBTASK_URL + "?user=" + user.name
  };

  callback(null,user,context);
}
```

You also need to create two new settings on [Rules](${manage_url}/#/rules):

* One using `WEBTASK_URL` as the key, and the URL returned by the `create` command as the value.
* Another using `YUBIKEY_SECRET` as the key, and `{YOUR YUBIKEY SECRET}` passed to `create` as the value.

::: note
The returning section of the rule validates the JWT issued by the Webtask. This prevents the result of the MFA part of the transaction from being tampered with because the payload is digitally signed with a shared secret.
:::

Some notes regarding the rule code:

* The `context.redirect` statement instructs Auth0 to redirect the user to the Webtask URL instead of calling back to the app
* The return is indicated by the `protocol` property of the `context` object
* The section handling the return validates the JWT issued by the Webtask to ensure that the result of MRA hasn't been tampered by an unauthorized party

You'll [create the rule using the Management Dashboard](${manage_url}/#/rules).

![](/media/articles/mfa/yubi-2.png)

Click **Create Your First Rule** (or **Create Rule** if you've already created rules before). Choose **empty rule**.

![](/media/articles/mfa/yubi-3.png)

You'll see the following editor window where you can paste in the rule code above.

![](/media/articles/mfa/yubi-4.png)

You can test your code for correctness using **Try This Rule**. When done, click **Save** to proceed.

You also need to create two new Settings for your [Rules](${manage_url}/#/rules):

| Setting | Value |
| - | - |
| `WEBTASK_URL` | The URL you saved after running the `CREATE` command in the Webtask CLI |
| `YUBIKEY_SECRET` | Your YubiKey client secret |

With these settings, you can access the provded values in your rules code using the configuration global object (such as `configuration.WEBTASK_URL`).

![](/media/articles/mfa/yubi-5.png)

With this rule in place, the user will be redirected to the Webtask after every login. They will see the following prompt for their second factor:

![](/media/articles/mfa/yubico-mfa.png)

### Customize the Rule

You can add logic to the rule to determine which conditions the challenge will be triggered based on:

You can add logic to the rule to set the conditions under which the MFA challenge will be triggered. Some examples include:

* The IP address or location of the user
* The application the user is logging into
* The type of authentication used (such as AD, LDAP, or Social)

## Keep Reading

::: next-steps
* [Rules](/rules)
* [Multi-factor in Auth0](/multifactor-authentication)
* [Auth0 Webtask](https://webtask.io/)
:::
