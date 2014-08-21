---
lodash: true
---

## Phonegap

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-cordova/master/create-package?path=examples/phonegap-basic-sample&type=js&filePath=examples/phonegap-basic-sample/www/js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } else  { %>

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-cordova/master/create-package?path=examples/phonegap-basic-sample&type=js&filePath=examples/phonegap-basic-sample/www/js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. For that, just run the following command:

````bash
phonegap plugin add org.apache.cordova.inappbrowser
```

### 2. Follow the guide specific to the FrontEnd technology you're using

Now, you can just follow the tutorial for the FrontEnd technology that you're using. We currently support applications using [jQuery](https://docs.auth0.com/new/client-platforms/jquery), [AngularJS](https://docs.auth0.com/new/client-platforms/angularjs) and [Vanilla JS](https://docs.auth0.com/new/client-platforms/vanillajs).

> **Warning**: Phonegap doesn't support getting dependencies from a CDN, so you're going to have to download the JS and CSS dependencies locally and then point to the downloaded files.

> **Warning**: You must use `popup` mode when configuring an application with Phonegap. (All available guides currently do that by default)

### 3. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and Cordova.
