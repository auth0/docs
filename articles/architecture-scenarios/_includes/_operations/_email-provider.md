Auth0 sends [emails](/email) to users for events such as signup welcome, email validation, breached password, and password reset events. You can customize the email templates for each type of event, and advanced customization of email handling is also possible. Auth0 provides a test email provider with limited capacity for basic testing, but you must set up your own email provider for production use, and customization of email templates will not work until you have established your own provider. 

::: panel Best Practice
The default Auth0 email provider does not support sending production volumes of email or customization of email templates. You should therefore configure your own email provider before deploying to production.
:::
