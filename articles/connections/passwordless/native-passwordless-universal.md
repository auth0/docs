---
title: Passwordless Authentication in Native Applications with Universal Login
description: Describes how to implement passwordless authentication in native applications, using Universal Login
tags:
    - connections
    - passwordless
    - native
---
# Passwordless Authentication in Native Applications with Universal Login

[Universal Login](/hosted-pages/login) is the only recommended way to set up passwordless authentication in your native application. We recommend using the Auth0 login page for the best experience, security and the fullest array of features.

If you implement passwordless with Universal Login, the user experience will be as follows:

1. A user clicks login and the Auth0 SDK redirects them to the login page on the web.
1. At this point, Lock Passwordless will ask them for a phone number or email, whichever type you chose.
1. The prompt will change to ask them for a code which they will receive by the designated method.
1. Once they enter the code, the transaction will finish and the user will be redirected to your app along with their credentials.

In this article we will see the steps involved in implementing this flow.

## 1. Set up your connection

To set up the passwordless connection, go to [Dashboard > Connections > Passwordless](${manage_url}/#/connections/passwordless) and turn on either Email or SMS. Then, go to the **Apps** tab and enable the connection for the applications that will be using it.

## 2. Configure your login page

Next, configure your login page. Head over to the [Hosted Pages](${manage_url}/#/login_page) section of your Dashboard. At the top of your the code editor, click the menu entitled **Default Templates** and pick **Lock (Passwordless)** from the list.

## 3. Configure your application

All that remains is to set up your application to call the login page. An easy to follow guide for this process already exists for both Swift and Android. Choose a quickstart below, and follow only the **Login** step. It will guide you on how to call the login page from your application.

* [iOS (Swift) Quickstart](/quickstart/native/ios-swift/00-login)
* [Android Quickstart](/quickstart/native/android/00-login)

::: note
The process for invoking Universal Login from a native app is the same whether `lock-passwordless` will be used inside the login page or not.
:::
