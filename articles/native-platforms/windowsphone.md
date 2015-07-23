---
lodash: true
title: Windows Phone Tutorial
name: Windows Phone
hybrid: false
image: //auth0.com/lib/platforms-collection/img/windows-phone.png
tags:
  - quickstart
snippets:
  dependancies: native-platforms/windows-phone/dependancies
  setup: native-platforms/windows-phone/setup
  use: native-platforms/windows-phone/use
---

## Windows Phone Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/Auth0.WindowsPhone/master/create-package?path=examples/WindowsPhoneSilverlight&amp;type=none@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
        <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API app to use it with Auth0.**

### 1. Install the Auth0.WindowsPhone package

You can either run the following command or install it via the **Package Manager** UI.

@@snippet(meta.snippets.dependancies)@@

### 2. Instantiate the Auth0 client
Provide your domain and application's **Client ID** as parameters when creating the client instance:

@@snippet(meta.snippets.setup)@@

### 3. Allow users to log in

The simplest way is to simply call:

@@snippet(meta.snippets.use)@@

If you want to specify a particular connection you can do that using:
```cs
var user = await auth0Client.LoginAsync("{CONNECTION_NAME}");
```

Alternatively, if you want to allow database users to sign in and you have their credentials in memory:
```cs
var user = await auth0.LoginAsync("{CONNECTION_NAME}", "{USER_NAME}", "{PASSWORD}");
```

### 4. Sit back and relax

Now it's time to sit back and relax. You've implemented log in and signup with Auth0 for your Windows Phone application.

### Additional information
You can also check out the [Github page](https://github.com/auth0/auth0.windowsphone) access the source code, and additional documentation.
