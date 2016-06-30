---
title: Auth0 Windows Phone SDK Tutorial
description: This tutorial will show you how to use the Auth0 Windows Phone SDK to add authentication and authorization to your mobile app.
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
seo_alias: windowsphone
---

## Windows Phone Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-WindowsPhone-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed/WindowsPhoneSilverlight',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Install the Auth0.WindowsPhone package

You can either run the following command or install it via the **Package Manager** UI.

${snippet(meta.snippets.dependencies)}

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <strong>Allowed Callback URLs</strong> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>
</div>

### 3. Instantiate the Auth0 client

${snippet(meta.snippets.setup)}

### 4. Allow users to log in

${snippet(meta.snippets.use)}

### 5. Use server API if necessary:

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

### 6. Sit back and relax

Now it's time to sit back and relax. You've implemented log in and signup with Auth0 for your Windows Phone application.


### Additional information
You can also check out the [Github page](https://github.com/auth0/auth0.windowsphone) access the source code, and additional documentation.
