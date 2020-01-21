---
addon: Windows Azure Mobile Services
title: Windows Azure Mobile Services Add-on
thirdParty: true
url: /addons/azure-mobile-services
image: /media/platforms/azure.png
snippets:
  use: server-apis/azure-mobile-services/use
alias:
  - windows-azure
  - microsoft-azure
  - windows-azure-websites
  - windows-azure-vm
  - azure-websites
  - azure-vm
topics:
  - azure
  - mobile
  - addons
contentType: how-to
useCase: integrate-third-party-apps
description: Learn how to use Auth0 to authenticate and authorize Windows Azure Mobile Services (WAMS).
---

# Windows Azure Mobile Services Add-on

<%= include('../_includes/_uses-delegation') %>

## 1. Create an application

Windows Azure Mobile Services (WAMS) endpoints can be used from anywhere. To configure an app that interacts with WAMS, you can use any of the following tutorials:

- [Android](/quickstart/native/android)
- [iOS](/quickstart/native/ios-objc)
- [Windows UWP C#](/quickstart/native/windows-uwp-csharp)
- [JavaScript](/quickstart/spa/vanillajs)
- [Windows Phone](/quickstart/native/wpf-winforms)

The samples that you can download from the Azure Portal are a good starting point.

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-4.png)

## 2. Modify the sample to use Auth0

If you follow the Windows UWP sample (C#), you will end up with an `AuthenticateAsync` method that adds one of the standard WAMS authentication mechanisms.

To modify the sample to use Auth0, include this code:

${snippet(meta.snippets.use)}

The important aspects of these lines are:

1. The `Auth0Client` class takes 2 parameters: your `namespace` and the `clientId` of the application.
2. There are various overloads for the  `LoginAsync` method. In the example above, all options will be presented to the user. You can use other versions of `LoginAsync` to direct login to a specific provider. For example: `LoginAsync("github")` will have users login exclusively with GitHub.
3. The `GetDelegationToken` call exchanges the application token (received in step #2) for another token to be used with WAMS.
4. The input for the `GetDelegationToken` method is the `clientID` of your WAMS enabled app.
5. A new `MobileServiceUser` object is created with the new information.

The `GetDelegationToken` call allows your app to interact with multiple WAMS APIs (or even other APIs). In Auth0, you can control which applications can call which API.

For example, you can login a user with GitHub, then connect them to WAMS and also interact with an AWS hosted endpoint. The delegation call allows you to flow the identity of the user securely across multiple environments.

## 3. Use the user identity in the WAMS backend

The final step is to use the information in the token in the server code. Most likely you will have to do the following two things:

1. Change permissions on the table for each operation:

  ![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-5.png)

2. Use the `user` object to change the behavior of the operation.

This example inserts the `userId` on new rows:

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-6.png)

Then, when querying, it filters out rows for the logged in user:

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-7.png)
