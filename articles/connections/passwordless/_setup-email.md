#### 1. Optional: Configure an Email Provider

By default Auth0 will send out the emails from its own infrastructure but optionally you can [configure your own Email Provider](/articles/email/providers) to better monitor and troubleshoot the email communication

#### 2. Configure the connection

On the **Email** page under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless) you are able to configure the behavior and the contents of the email.

![](/media/articles/connections/passwordless/passwordless-email-config.png)

The email contents can be writting in HTML with the Liquid syntax, allowing you to conditionally shape the contents of the email. The following macros are available when defining the template:

 - `{{ application.name }}`
 - `{{ code }}` (the one time code)