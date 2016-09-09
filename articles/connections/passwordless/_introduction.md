# Passwordless Authentication

Passwordless connections in Auth0 allow users to login without the need to remember a password. 

This improves the user experience, especially on mobile applications, since users will only need an <% if (withFingerprint) { %> email address, phone number or fingerprint <% } else { %> email address or phone number <% } %> to register for your application.

Without passwords, your application will not need to implement a password-reset procedure and users avoid the insecure practice of using the same password for many purposes.

In addition, the credential used for authentication is automatically validated since the user just entered it at sign-up.

## Configuration

These connections use an authentication channel like <% if (withFingerprint) { %> SMS, e-mail or Touch ID <% } else { %> SMS or e-mail <% } %>. Each of these channels can be configured in the dashboard under [Connections > Passwordless](${manage_url}/#/connections/passwordless).

![](/media/articles/connections/passwordless/passwordless-connections.png)