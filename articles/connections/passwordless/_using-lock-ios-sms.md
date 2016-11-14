# Authenticate users with a one-time code via SMS

<%= include('./_ios-language-picker') %>

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Using Auth0 Lock

<% if (language === "objc") { %>
<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.iOS',
  path: 'Passwordless-SMS/Lock/ObjC'
}) %>
<% } else { %>
<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.iOS',
  path: 'Passwordless-SMS/Lock/Swift'
}) %>
<% } %>

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<% if (language === "objc") { %>
<%= include('./_sms-controller-objc') %>
<% } else { %>
<%= include('./_sms-controller-swift') %>
<% } %>

<%= include('./_using-lock-sms', { platform: 'ios' }) %>

This code will call `onAuthenticationBlock`, where the `id_token`, `refresh_token` and user profile are typically stored. Then the user will be allowed to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-ios.png)

### Using your own UI

If you choose to build your own UI, your code will need to ask the user for their phone number first. Then call the following method:

<% if (language === "objc") { %>
<%= include('./_sms-send-code-objc') %>
<% } else { %>
<%= include('./_sms-send-code-swift') %>
<% } %>

After the passwordless login process begins, ask the user for the one-time code. Then authenticate using that code:

<% if (language === "objc") { %>
<%= include('./_sms-login-objc') %>
<% } else { %>
<%= include('./_sms-login-swift') %>
<% } %>

Lastly, once the user is authenticated, your app will be able to access the user profile and tokens returned by Auth0.
