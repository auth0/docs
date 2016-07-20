---
title: MFA
description: This tutorial will show you how to add Multi-factor Authentication to your ReactJS with auth0.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/09-MFA'
}) %>_

<%= include('../_includes/_mfa-introduction') %>


On this tutorial you'll learn how to enable MFA in a ReactJS application created in the previous steps, such as [Login](/quickstart/spa/react/01-login).

## 1. Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## 2. Login

There is no need to update the code we have created in [Login](/docs/quickstart/spa/react/01-login) tutorial. As soon you try to sign in, you should be prompted to setup an 2-Factor authenticator application (auth0 Guardian is the default).

![verification code form screenshot]

## 3. All done!

You have completed the Multi-factor authentication setup with Auth0 in your ReactJS project.
