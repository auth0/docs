<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Using Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<div>
<% if (language === "objc") { %>
<%= include('./_sms-controller-objc') %>
<% } else { %>
<%= include('./_sms-controller-swift') %>
<% } %>
</div>

<%= include('./_using-lock-sms', { platform: 'ios' }) %>

This code will call `onAuthenticationBlock`, where the ID Token, <dfn data-key="refresh-token">Refresh Token</dfn>, and user profile are typically stored. Then the user will be allowed to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-ios.png)

### Using your own UI

If you choose to build your own UI, your code will need to ask the user for their phone number first. Then call the following method:

<div>
<% if (language === "objc") { %>
<%= include('./_sms-send-code-objc') %>
<% } else { %>
<%= include('./_sms-send-code-swift') %>
<% } %>
</div>

After the <dfn data-key="passwordless">passwordless</dfn> login process begins, ask the user for the one-time code. Then authenticate using that code:

<div>
<% if (language === "objc") { %>
<%= include('./_sms-login-objc') %>
<% } else { %>
<%= include('./_sms-login-swift') %>
<% } %>
</div>

Lastly, once the user is authenticated, your app will be able to access the user profile and tokens returned by Auth0.
