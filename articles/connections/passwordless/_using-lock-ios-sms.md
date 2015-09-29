# Authenticate users with a one time code via SMS

<%= include('./_ios-language-picker') %>

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Using the Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<% if (language === "objc") { %>
<%= include('./_sms-controller-objc') %>
<% } else { %>
<%= include('./_sms-controller-swift') %>
<% } %>

<%= include('./_using-lock-sms', { platform: 'ios' }) %>

This will call the `onAuthenticationBlock` where you'll typically store the `id_token`, `refresh_token` and user profile after which the user will be able to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-ios.png)

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Lock/A0HomeViewController.m).

### Using your own UI

If you choose to build your own UI you'll need to start by asking your users for their phone number and call the following method

<% if (language === "objc") { %>
<%= include('./_sms-send-code-objc') %>
<% } else { %>
<%= include('./_sms-send-code-swift') %>
<% } %>

After having started the passwordless login you will need to ask the user for the one time code and authenticate using that code:

<% if (language === "objc") { %>
<%= include('./_sms-login-objc') %>
<% } else { %>
<%= include('./_sms-login-swift') %>
<% } %>

Finally when the user is authenticated you'll be able to access the user profile and the tokens returned by Auth0.
