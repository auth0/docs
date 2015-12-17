---
title: Windows Phone Tutorial
name: Windows Phone
alias:
  - windows phone
language:
  - Javascript
  - C#
hybrid: false
image: /media/platforms/windows-phone.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/windows-phone/dependencies
  setup: native-platforms/windows-phone/setup
  use: native-platforms/windows-phone/use
alias:
  - win8
  - wp8
  - windows-phone
  - windows-phone-8
  - microsoft-phone
---

## Windows Phone Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'Auth0.WindowsPhone',
  pkgBranch: 'master',
  pkgPath: 'examples/WindowsPhoneSilverlight',
  pkgFilePath: null,
  pkgType: 'none' + account.clientParam
}) %>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API app to use it with Auth0.**

### 1. Install the Auth0.WindowsPhone package

You can either run the following command or install it via the **Package Manager** UI.

${snippet(meta.snippets.dependencies)}

### 2. Instantiate the Auth0 client

${snippet(meta.snippets.setup)}

### 3. Allow users to log in

${snippet(meta.snippets.use)}

### 4. Use server API if necessary:

```cs
var client = new HttpClient();

// Accessing public resource
var response = await client.GetAsync(new Uri("{YOUR API URL}/{PUBLIC RESOURCE}"));

// Accessing secured resource
// Initialize HTTP request message
var message = new HttpRequestMessage(HttpMethod.Get, new Uri("{YOUR API URL}/{SECURED RESOURCE}"));
// Add header so that server can recognize logged in user
message.Headers.Add("Authorization", "Bearer " + App.Auth0.CurrentUser.IdToken);
response = await client.SendRequestAsync(message);
```

### 5. Sit back and relax

Now it's time to sit back and relax. You've implemented log in and signup with Auth0 for your Windows Phone application.


### Additional information
You can also check out the [Github page](https://github.com/auth0/auth0.windowsphone) access the source code, and additional documentation.
