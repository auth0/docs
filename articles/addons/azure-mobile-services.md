---
addon: Azure Mobile Services
thirdParty: true
url: /addons/azure-mobile-services-addon
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
description: This tutorial will show you how to use the Auth0 to authenticate and authorize Azure Mobile Services.
---

# Azure Mobile Services Addon

1. Create an application. 

WAMS endpoints can be used from anywhere. For example: [Android](/quickstart/native/android), [iOS](/quickstart/native/ios-objc), [Windows UWP C#](/quickstart/native/windows-uwp-csharp), [JavaScript](/quickstart/spa/vanillajs) or [Windows Phone](/quickstart/native/wpf-winforms). You can use any of these tutorials for configuring an app that interacts with WAMS.

   The samples that you can download from the Azure Portal are a good starting point.

   ![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-4.png)

2. Modify the sample to use Auth0. If you follow the Windows UWP sample (C#), you will end up with an `AuthenticateAsync` method that adds one of the standard WAMS authentication mechanisms.

   To modify the sample to use Auth0, include this code:

   ${snippet(meta.snippets.use)}

   The important aspects of these lines are:

  * The `Auth0Client` class takes 2 parameters: your `namespace` and the `clientId` of the application.
  * There are various overloads for the  `LoginAsync` method. In the example above, all options will be presented to the user. You can use other versions of `LoginAsync` to direct login to a specific provider. For example: `LoginAsync("github")` will have users login exclusively with GitHub.
  * The `GetDelegationToken` call exchanges the application token (received in step #2) for another token to be used for with WAMS.
  * The input for the `GetDelegationToken` method is the `clientID` of your WAMS enabled app.
  * A new `MobileServiceUser` object is created with the new information.

1. The `Auth0Client` class takes 2 parameters: your `namespace` and the `clientId` of the application.
2. There are various overloads for the  `LoginAsync` method. In the example above, all options will be presented to the user. You can use other versions of `LoginAsync` to direct login to a specific provider. For example: `LoginAsync("github")` will have users login exclusively with GitHub.
3. The `GetDelegationToken` call exchanges the application token (received in step #2) for another token to be used with WAMS.
4. The input for the `GetDelegationToken` method is the `clientID` of your WAMS enabled app.
5. A new `MobileServiceUser` object is created with the new information.

   For example, you can login a user with GitHub, then connect them to WAMS and also interact with an AWS hosted endpoint. The delegation call allows you to flow the identity of the user securely across multiple environments.

3. Use the information in the token in the server code. Most likely you will have to do the following two things:

  1. Change permissions on the table for each operation:

   ![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-5.png)

  2. Use the `user` object to change the behavior of the operation.

   This example inserts the `userId` on new rows:

   ![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-6.png)

   Then, when querying, it filters out rows for the logged in user:

   ![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-7.png)
