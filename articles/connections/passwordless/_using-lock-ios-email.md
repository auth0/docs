# Authenticate users with a one time code via e-mail

<%= include('./_ios-language-picker') %>

<%= include('./_introduction-email', { isMobile: true }) %>

## Setup

<%= include('./_setup-email') %>

## Implementation

### Using the Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<% if (language === "objc") { %>
<%= include('./_email-controller-objc') %>
<% } else { %>
<%= include('./_email-controller-swift') %>
<% } %>

<%= include('./_using-lock-email', { platform: 'ios' }) %>

This will call the `onAuthenticationBlock` where you'll typically store the `id_token`, `refresh_token` and user profile after which the user will be able to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-ios.png)

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Lock/A0HomeViewController.m).

### Using your own UI

If you choose to build your own UI you'll need to start by asking your users for their email address and call the following method

<% if (language === "objc") { %>
<%= include('./_email-send-code-objc') %>
<% } else { %>
<%= include('./_email-send-code-swift') %>
<% } %>

After having started the passwordless login you will need to ask the user for the one time code and authenticate using that code:

<% if (language === "objc") { %>
<%= include('./_email-login-objc') %>
<% } else { %>
<%= include('./_email-login-swift') %>
<% } %>

## Authenticate users with a Magic Link via e-mail

<%= include('./_introduction-email-magic-link') %>

The next version of the iOS library will support these links through iOS 9 Universal Links. When users click the magic link they receive on their device it will automatically open your application and sign in the user (instead of opening the browser when clicking the link).

Finally when the user is authenticated you'll be able to access the user profile and the tokens returned by Auth0.
