Auth0 makes extensive use of email to provide both user notifications and to drive the functionality needed for secure identity management (for example, email verification, account recovery, and brute force protections), and Auth0 provides a number of templates for these.

::: note
Before customizing email templates, please set up your [Email Provider](/architecture-scenarios/implementation/${platform}/${platform}-operations#email-provider-setup).
:::

Out of the box, the email templates used contain standard verbiage and Auth0 branding. However, you can configure almost every aspect of these templates to reflect the verbiage and user experience you want and make changes to things like the preferred language, accessibility options, and so forth.

Email templates are customized using [Liquid syntax](/email/liquid-syntax). If you are interested in customizing your templates based on user preferences, you will also have access to the [metadata](/users/concepts/overview-user-metadata) located in users' profiles, as well as any specific application metadata too. 
