Passwordless connections in Auth0 allow users to login without the need to remember a password. 

This improves the user experience, especially on mobile applications, since users will only need an email address or phone number to register for your application.

Without passwords, your application will not need to implement a password reset procedure and users avoid the insecure practice of using the same password for many purposes.

In addition, the credential used for authentication is automatically validated since the user just entered it at sign-up.

## Configuration

These connections use an authentication channel like SMS or email. Each of these channels can be configured in the dashboard under [Connections > Passwordless](${manage_url}/#/connections/passwordless).

::: note
If you are implementing passwordless with embedded login using Lock or Auth0.js from within your app, rather than Universal Login, you will need to have custom domains set up. For more information, see [Custom Domains](/custom-domains).
:::


![](/media/articles/connections/passwordless/passwordless-connections.png)
