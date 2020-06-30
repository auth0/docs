<%= include('./_introduction-email', { isMobile: true }) %>

## Setup

<%= include('./_setup-email') %>

## Implementation

### Using Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<div>
<% if (language === "objc") { %>
<%= include('./_email-controller-objc') %>
<% } else { %>
<%= include('./_email-controller-swift') %>
<% } %>
</div>

<%= include('./_using-lock-email', { platform: 'ios' }) %>

This code will call `onAuthenticationBlock`, where the ID Token, <dfn data-key="refresh-token">Refresh Token</dfn>, and user profile are typically stored. Then the user will be allowed to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-ios.png)

### Using your own UI

If you choose to build your own UI, your code will need to ask the user for their email address first. Then call the following method:

<div>
<% if (language === "objc") { %>
<%= include('./_email-send-code-objc') %>
<% } else { %>
<%= include('./_email-send-code-swift') %>
<% } %>
</div>

After the <<dfn data-key="passwordless">passwordless</dfn> login process begins, ask the user for the one-time code. Then authenticate using that code:

<div>
<% if (language === "objc") { %>
<%= include('./_email-login-objc') %>
<% } else { %>
<%= include('./_email-login-swift') %>
<% } %>
</div>

## Authenticate users with a Magic Link via email

<%= include('./_introduction-email-magic-link') %>

Lastly, once the user is authenticated, your app will be able to access the user profile and tokens returned by Auth0.
