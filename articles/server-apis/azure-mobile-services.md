---
title: Azure Mobile Services Tutorial
name: Azure Mobile Services
thirdParty: true
image: /media/platforms/azure.png
tags:
  - quickstart
snippets:
  use: server-apis/azure-mobile-services/use
alias:
  - windows-azure
  - microsoft-azure
  - windows-azure-websites
  - windows-azure-vm
  - azure-websites
  - azure-vm
---
${include('./_thirdPartyApi')}

### Additional Information

#### 1. Create a client for the application

WAMS endpoints can be used from anywhere. For example: [Android](/native-platforms/android), [iOS](/native-platforms/ios-objc), [Windows UWP C#](/native-platforms/windows-uwp-csharp), [JavaScript](/client-platforms/vanillajs) or [Windows Phone](/native-platforms/windowsphone). You can use any of these tutorials for configuring your app that will interact with WAMS.

A very good starting point is any of the samples you can download from the Azure Portal. Download and follow these:

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-4.png)

#### 2. Changing the sample to use Auth0

Changing the samples to use Auth0 is very simple. As an example, if you followed the Windows UWP sample (C#), you will end up with an `AuthenticateAsync` method that adds one of the standard WAMS authentication mechanisms.


${snippet(meta.snippets.use)}

These 6 new lines of code do all the work for you. The important aspects:

1. The `Auth0Client` class takes 2 parameters: your `namespace` and the `clientId` of the client application.
2. There are various overloads for the  `LoginAsync` method. In the example above all options will be presented to the user. You can use other versions of `LoginAsync` to direct login to a specific provider. For example: `LoginAsync("github")` will have users login exclusively with GitHub.
3. The `GetDelegationToken` call exchanges the client token (just received in step #2) for another token to be used for with WAMS.
4. A new `MobileServiceUser` object is created with the new information.

The input for the `GetDelegationToken` method, is the clientID of the App / API where `Windows Azure Mobile Services (WAMS) API` addon was enable.

You might wonder why step #3 is necessary. This abstraction layer allows your client app to interact with multiple WAMS APIs (or even other APIs altogether). You can control in Auth0 which clients can call which API. You could, as an example, login a user with GitHub, then connect him to WAMS, and also interact with an AWS hosted endpoint. The delegation call allows you to flow the identity of the user across multiple environments in a clean, secure way.

#### 3. Using the user identity in the WAMS backend
The final step is to use the information on the token on the server code. You will likely have to do 2 things:

##### 1. Change permissions on the table for each operation:

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-5.png)


##### 2. Use the `user` object to change the behavior of the operation.

This example, inserts the `userId` on new rows:

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-6.png)

And then when querying, it filters out rows for the logged in user:

![](/media/articles/server-apis/azure-mobile-services/wams-tutorial-7.png)
