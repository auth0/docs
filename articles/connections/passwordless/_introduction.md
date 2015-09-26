# Passwordless Authentication

Passwordless connections in Auth0 allow users to login without the need of a password. This can vastly improve the user experience (especially on mobile applications) because users only need their <% if (withFingerprint) { %> email address, phone number or fingerprint <% } else { %> email address or phone number <% } %> when they register for your application. In addition to that they don't need to remember any password (no more reset/forgot password or using the same password everywhere).

And this also means that the email address or phone number used for authentication is automatically validated because they just used it to sign up and authenticate.

## Configuration

These connections work by using an authentication channel like <% if (withFingerprint) { %> SMS, e-mails or Touch ID <% } else { %> SMS or e-mails <% } %>. Each of those can be configured in the dashboard under [Connections > Passwordless](${uiURL}/#/connections/passwordless).

![](/media/articles/connections/passwordless/passwordless-connections.png)