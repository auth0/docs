<dfn data-key="passwordless">Passwordless</dfn> connections in Auth0 allow users to login without the need to remember a password. The benefits of enabling passwordless connections include:

* Improved user experience, particularly on mobile applications, since users only need an email address or phone number to sign up and the credential used for authentication is automatically validated after sign-up.

* Enhanced security since users avoid the insecure practice of using the same password for many purposes.

* Less effort for you since you will not need to implement a password reset procedure.

## Configuration

Passwordless connections use an authentication channel like SMS or email, which need to be configured under [Connections > Passwordless](${manage_url}/#/connections/passwordless) in the [Auth0 Dashboard](${manage_url}/).

::: note
We recommend implementing passwordless with <dfn data-key="universal-login">Universal Login</dfn>. If you are using embedded login with <dfn data-key="lock"></dfn> or Auth0.js, you will need to enable custom domains for your tenant. To learn more, see [Custom Domains](/custom-domains).
:::

![](/media/articles/connections/passwordless/connections-passwordless-list.png)
