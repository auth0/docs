# Authenticate users with a one-time code via e-mail

<%= include('./_ios-language-picker') %>

<%= include('./_introduction-email', { isMobile: true }) %>

## Setup

<%= include('./_setup-email') %>

## Implementation

### Using Auth0 Lock

<% if (language === "objc") { %>
<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.iOS',
  path: 'Passwordless-Email/Lock/ObjC'
}) %>
<% } else { %>
<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.iOS',
  path: 'Passwordless-Email/Lock/Swift'
}) %>
<% } %>

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<% if (language === "objc") { %>
<%= include('./_email-controller-objc') %>
<% } else { %>
<%= include('./_email-controller-swift') %>
<% } %>

<%= include('./_using-lock-email', { platform: 'ios' }) %>

This code will call `onAuthenticationBlock`, where the `id_token`, `refresh_token` and user profile are typically stored. Then the user will be allowed to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-ios.png)

### Using your own UI

If you choose to build your own UI, your code will need to ask the user for their email address first. Then call the following method:

<% if (language === "objc") { %>
<%= include('./_email-send-code-objc') %>
<% } else { %>
<%= include('./_email-send-code-swift') %>
<% } %>

After the passwordless login process begins, ask the user for the one-time code. Then authenticate using that code:

<% if (language === "objc") { %>
<%= include('./_email-login-objc') %>
<% } else { %>
<%= include('./_email-login-swift') %>
<% } %>

## Authenticate users with a Magic Link via e-mail

<%= include('./_introduction-email-magic-link') %>

The next version of the iOS library will support magic links through iOS 9 Universal Links. When a user clicks a magic link they have received on their device, the link will automatically open your application (instead of opening in the browser) and sign in the user.

Lastly, once the user is authenticated, your app will be able to access the user profile and tokens returned by Auth0.
