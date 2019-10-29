<% if (screen === "dashboard") { %>
  This is the dashboard home page. Here you can view statistics about your apps: the login activity for the past year, the logins and new signups for the past week, a list of the latest signups, and more.
  [More docs on the dashboard](/dashboard).
<% } else if (screen === "applications") { %>
  Use this page to manage your applications. For every app of yours that you want to use Auth0, you should register an application here. You can create new applications, view your existing ones, review settings, enable connections, and more.
  [More info on applications](/applications).
<% } else if (screen === "apis") { %>
  Use this page to manage your APIs. Here you can register a new API of yours, that you want to secure with Auth0, and manage your existing ones.
  [More info on APIs](/api-auth).
<% } else if (screen === "sso") { %>
  <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> Integrations enable the use of external services for SSO. In this page you can see a list of the available external services that you can use, such as Office 365, Salesforce, and others. Here you can create a new SSO integration, find tutorials on how to configure it, and review and update the settings of a particular integration.
  [More info on SSO Integrations](/integrations/sso).
<% } else if (screen === "connections") { %>
  Use this page to manage the identity providers that you use to login to your apps. There are four types:
  - [Database](${manage_url}/#/connections/database): Securely store and manage username / password credentials either in an Auth0 Database or in your own. To connect to an existing database you can use JavaScript scripts (we provide the templates) that run on Auth0's server on every authentication. Furthermore, you can migrate an existing legacy credentials database to Auth0 gradually as users authenticate (no password reset required). [More info on Database Connections](/connections/database).
  - [Social](${manage_url}/#/connections/social): Configure social connections like Facebook, Twitter, Github and others, so that you can let your users login with them. [More info on individual social providers](/connections/identity-providers-social).
  - [Enterprise](${manage_url}/#/connections/enterprise): Configure Enterprise Connections like Active Directory, <dfn data-key="security-assertion-markup-language">SAML</dfn>, Office 365 and others so that you can let your users login with them. This way your users can use their enterprise credentials to login to your app. [More info on individual enterprise providers](/connections/identity-providers-enterprise).
  - [Passwordless](${manage_url}/#/connections/passwordless): Let your users signup and login using one-time codes (delivered by email or SMS) or one-click links, instead of passwords. [More info on Passwordless](/connections/passwordless).
  <% } else if (screen === "universal-login") { %>
  This is where you can create a beautiful universal login page where you can redirect to authenticate your users, customize the look and feel of your login page with CSS and HTML, and implement SSO in your applications with the flip of a switch. [More info on Universal Login](/universal-login).
<% } else if (screen === "users-roles") { %>
  This is where you manage your user's identities and permissions. 
  - [Users](${manage_url}/#/users): View your user's profiles, create new ones, perform password resets, block and delete users, and many more. [More info on Users](/users).
  - [Roles](${manage_url}/#/roles): Create and manage roles for your applications. Roles contain collection of permissions and can be assigned to users. [More info on Roles](/authorization/guides/manage-roles).
<% } else if (screen === "rules") { %>
  Here you can configure custom JavaScript snippets that are executed in Auth0 as part of the transaction every time a user authenticates to your application. You can call external APIs, filter which users can login to your application, use a whitelist, geolocated access or anything. [More information on Rules](/rules).
<% } else if (screen === "hooks") { %>
  Here you can configure Node.js code that is executed against extensibility points (which are comparable to webhooks that come with a server). This way you can customize the behavior of Auth0 when you use Database Connections. [More info on Hooks](/hooks).
<% } else if (screen === "mfa") { %>
  Use this page to configure <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> for your apps. This way you can add an additional factor to conventional logins to prevent unauthorized access. You can use Push Notifications, SMS or both. [More info on MFA](/multifactor-authentication).
<% } else if (screen === "emails") { %>
  Here you can configure the email templates for verification emails, welcome emails, change password emails, and more. You can also configure a custom SMTP email provider which is a requirement for production purposes. Auth0 does offer a built-in email infrastructure but it should be used for testing purposes only. [More info on emails](/email).
<% } else if (screen === "logs") { %>
  In this page you can view log data of both actions taken in the dashboard by the administrators, as well as authentications made by your users. [More info on logs](/logs).
<% } else if (screen === "anomaly") { %>
  Here you can configure extra layers of security by enabling shields​ that protect you and your users against different types of attacks and user access anomalies. This is not available for free accounts and does require the purchase of an addon to your Auth0 subscription. [More info on anomaly detection](/anomaly-detection).
<% } else if (screen === "extensions") { %>
  In this page you can see a list of pre-built addons that we have created for you. You can use them to extend the functionality of the Auth0 base product. You can enable extensions in order to import or export users, export logs to external services, expose the Users dashboard to a group of users (without allowing them access to the rest of the dashboard), manage user authorization, and more. [More info on extensions](/extensions).
<% } else { %>
  The last screen navigates you to our [Support Center](${env.DOMAIN_URL_SUPPORT}). The alternative to users that do not have access to support services is the [Auth0 Community](https://community.auth0.com/). [More info on support options](/support).
<% } %>
