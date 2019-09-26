---
title: Test Sign In with Apple Configuration
description: Learn how to test the Auth0 Sign In with Apple app configuration. 
topics:
  - authentication
  - connections
  - social
  - apple
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---

# Test Sign In with Apple Configuration

::: note
If you are using the Classic Universal Login flow, or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later.
:::

1. Go to your application login page, and you should see an option for Sign In with Apple:

    ![Apple Login Page](/media/articles/connections/social/apple/apple-login-page.png)

2. Click **Continue with Apple**, then enter your Apple ID and password.

3. You will be asked to verify a new device. Click **Allow**.

4. Next, you'll be given a verification code. Make a note of this code, click **Done**, and then enter the code on the **Two-Factor Authentication** screen.

    ![Apple Two-Factor Authentication](/media/articles/connections/social/apple/apple-2FA.png)

5. When this is done, you'll have the option to edit your name and choose whether you'd like to share or hide your email. Make your choice, then click **Continue**.

    ![Apple Email Preferences](/media/articles/connections/social/apple/apple-email-preferences.png)

    You are now signed in to your application with Apple!

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits for Sign In with Apple](/policies/rate-limits#limits-on-sign-in-with-apple)
