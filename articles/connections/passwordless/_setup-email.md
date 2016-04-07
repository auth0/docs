#### 1. Optional: Configure an email provider

By default, Auth0 sends the email from its own messaging provider. Optionally, you can [configure your own email provider](/email/providers) to better monitor and troubleshoot the email service.

#### 2. Configure the connection

In the Dashboard, on the **Email** page, under [Connections > Passwordless](${uiURL}/#/connections/passwordless), you can configure the contents and behavior of the email.

![](/media/articles/connections/passwordless/passwordless-email-config.png)

The email can be written in HTML with Liquid syntax, allowing you to conditionally shape its content. The following macros are available when defining the template:

 - `{{ application.name }}`
 - `{{ code }}` (the one-time code)
