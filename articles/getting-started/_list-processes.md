<% if (screen === "dashboard") { %>
  This is the dashboard home page where you can view statistics about your apps; the login activity for the past year, the logins and new signups for the past week, a list of the latest signups, and more.
  [More docs on the dashboard](/dashboard).
<% } else if (screen === "clients") { %>
  Use this page to manage your clients. For every app that you want to use Auth0, register a client here. You can create new clients, view your existing ones, review settings, enable connections, and more.
  [More info on clients](/clients).
<% } else if (screen === "apis") { %>
  Use this page to manage your APIs. Register a new API of yours that you want to secure with Auth0 and manage your existing ones.
  [More info on APIs](/apis).
<% } else if (screen === "sso") { %>
  Single Sign On (SSO) Integrations enable the use of external services for single sign-on. In this page you can see a list of the available external services that you can use, such as Office 365, Salesforce, and others. Create a new SSO integration, find tutorials on how to configure it, and review and update the settings of a particular integration.
  [More info on SSO Integrations](/sso/integrations).
<% } else if (screen === "connections") { %>
  Use this page to manage the identity providers that you use to log in to your apps. There are four types:
  - [Database](${manage_url}/#/connections/database): securely store and manage username / password credentials either in an Auth0 Database or in your own. To connect to an existing database you can use JavaScript scripts (we provide the templates) that run on Auth0's server on every authentication. Furthermore, you can migrate an existing legacy credentials database to Auth0 gradually as users authenticate with no password reset required. [More info on Database Connections](/connections/database).
  - [Social](${manage_url}/#/connections/social): configure social connections like Facebook, Twitter, Github and others, so your users can log in with them. [More info on individual social providers](/identityproviders#social).
  - [Enterprise](${manage_url}/#/connections/enterprise): configure Enterprise Connections like Active Directory, SAML, Office 365 and others so your users can log in with them. [More info on individual enterprise providers](/identityproviders#enterprise).
  - [Passwordless](${manage_url}/#/connections/passwordless): instead of passwords, let your users sign up and log in using one-click links or one-time codes delivered by email or SMS. [More info on Passwordless](/connections/passwordless).
<% } else if (screen === "users") { %>
  This is where you manage your user's identities. View your user's profiles, create new ones, perform password resets, block and delete users, and much more. You can also use this page to log in as any of your users in order to reproduce any issues that they report and debug your application. [More info on User Management](/users).
<% } else if (screen === "rules") { %>
  Here you can configure custom JavaScript snippets that are executed in Auth0 as part of the transaction every time a user authenticates to your application. You can call external APIs, filter which users can log in to your application, use a whitelist, geolocated access, and more. [More information on Rules](/rules).
<% } else if (screen === "hooks") { %>
  Here you can configure Node.js code that is executed against extensibility points, which are comparable to webhooks that come with a server. This way you can customize the behavior of Auth0 when you use Database Connections. [More info on Hooks](/hooks).
<% } else if (screen === "mfa") { %>
  Use this page to configure MultiFactor Authentication (MFA) for your apps, which allows you to add an additional factor to conventional logins to prevent unauthorized access. You can use push notifications, SMS, or both. [More info on MFA](/multifactor-authentication).
<% } else if (screen === "hlp") { %>
  Here you can create a fully customizable login page, hosted by Auth0, where you can redirect and authenticate your users. By using centralized authentication, your app will be more secure and you will be able to easily implement SSO. Except for the login, you can also add pages for the Password Reset process, MFA, and error pages. [More info on Hosted Pages](/hosted-pages).
<% } else if (screen === "emails") { %>
  Here you can configure the email templates for verification emails, welcome emails, change password emails, and more. You can also configure a custom SMTP email provider, which is a requirement for production purposes. Auth0 does offer a built-in email infrastructure for testing purposes only. [More info on emails](/email).
<% } else if (screen === "logs") { %>
  In this page you can view log data of actions taken in the dashboard by the administrators, as well as authentications made by your users. [More info on logs](/logs).
<% } else if (screen === "anomaly") { %>
  Here you can configure extra layers of security by enabling shields​ that protect you and your users against different types of attacks and user access anomalies. This is not available for free accounts and does require the purchase of an add-on to your Auth0 subscription. [More info on anomaly detection](/anomaly-detection).
<% } else if (screen === "extensions") { %>
  In this page you can see a list of pre-built add-ons that we have created for you. You can use them to extend the functionality of the Auth0 base product. You can enable extensions in order to import or export users, export logs to external services, expose the Users dashboard to a group of users (without allowing them access to the rest of the dashboard), manage user authorization, and more. [More info on extensions](/extensions).
<% } else { %>
  The last screen navigates you to our [Support Center](${env.DOMAIN_URL_SUPPORT}). The alternative to users that do not have access to support services is the [Auth0 Community](https://community.auth0.com/). [More info on support options](/support).
<% } %>
