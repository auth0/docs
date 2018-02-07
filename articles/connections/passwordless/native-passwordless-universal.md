---
title: Passwordless Authentication in Native Applications with Universal Login
---
# Passwordless Authentication in Native Applications with Universal Login

[Universal Login](/hosted-pages/login) is the only recommended way to set up passwordless authentication in your native application. We recommend using the Auth0 login page for the best experience, security and the fullest array of features.

Once you are done with this guide, the process should be that a user runs across a need to authenticate in your application and the Auth0 SDK redirects them to the login page on the web. At that point, Lock Passwordless will ask them for a phone number or email, whichever type you chose, which they will give, and the prompt will change to ask them for a code which they will receive by the designated method. Once they enter the code, the transaction will finish and the user will be redirected to your app along with their credentials.

Implementing passwordless in the login page involves just a few steps.

## 1. Set up your connection

To set up the passwordless connection, go to your [Dashboard](${manage_url}/#/connections/passwordless) under **Connections > Passwordless** and turn on either Email or SMS. Also, ensure that you enable the connection for the client you are using. From the connection's settings, you can click the **Apps** tab to toggle on clients that you want to be able to use this connection.

## 2. Configure your login page

Next, configure your login page. Head over to the [Hosted Pages](${manage_url}/#/login_page) section of your Dashboard. At the top of your the code editor, click the menu entitled **Default Templates** and pick **Lock (Passwordless)** from the list.

## 3. Implement Auth0 in your application

All that remains is to set up your application to call the login page. An easy to follow guide for this process already exists for both Swift and Android. Using Auth0's quickstart guides, follow the **Login** step through. It will guide you on how to call the login page from your application. The process for invoking universal login from a native app is the same whether `lock-passwordless` will be used inside the login page or not.

[iOS (Swift) Quickstart](/quickstart/native/ios-swift/00-login)

[Android Quickstart](/quickstart/native/android/00-login)