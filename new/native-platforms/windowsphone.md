---
lodash: true
---

##Windows Phone

<div class="package">
  <blockquote>
    <a href="http://localhost:3000/Auth0.WindowsPhone/master/create-package?path=examples/WindowsPhoneSilverlight&amp;type=none@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
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
```Powershell
Install-Package Auth0.WindowsPhone
```

### 2. Instantiate the Auth0 client
Provide your domain and application's **Client ID** as parameters when creating the client instance:
```CSharp
private Auth0Client auth0Client = new Auth0Client("<%= account.namespace %>", "<%= account.clientId %>"); 
```

### 3. Allow users to log in

The simplest way is to simply call:
```CSharp
var user = await auth0Client.LoginAsync();
```

If you want to specify a particular connection you can do that using:
```CSharp
var user = await auth0Client.LoginAsync("{CONNECTION_NAME}");
```

Alternatively, if you want to allow database users to sign in and you have their credentials in memory:
```CSharp
var user = await auth0.LoginAsync("{CONNECTION_NAME}", "{USER_NAME}", "{PASSWORD}");
```

### 4. Sit back and relax

Now it's time to sit back and relax. You've implemented log in and signup with Auth0 for your Windows Phone application.

### Additional information
You can also check out the [Github page](https://github.com/auth0/auth0.windowsphone) access the source code, and additional documentation.