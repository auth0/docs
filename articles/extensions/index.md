---
url: /extensions
---

# Auth0 Extensions

Auth0 Extensions enable you to install applications (such as [Webtasks](https://webtask.io/)) or run commands/scripts that extend the functionality of the Auth0 base product.

Each extension is separate from all other extensions. Auth0 defines extensions per tenant, so data is stored by the pair `tenant\extension`.

When creating extensions, you have two options:
- [building off of one of Auth0's provided extensions](#using-an-auth0-provided-extension) in the Management Portal;
- [creating and installing your own](#creating-your-own-extension).

## Using an Auth0-Provided Extension

Auth0 provides the following pre-defined extensions, and they are available for installation via the Management Portal. They have not, however, been fully installed. To use one or more of the following apps, you must provide the required configuration information and finish installing the extensions.

![](/media/articles/extensions/auth0-provided-extensions.png)

### Provided Apps/Jobs:

- [Auth0 Authorization](/extensions/authorization-extension): manage group memberships for users.
- [Custom Social Connections](/extensions/custom-social-extensions): manage custom social connections in an easy way.
- [Auth0 Management API Webhooks](/extensions/management-api-webhooks): webhooks definition for the Auth0 Management API; goes through the audit logs and calls the appropriate webhook for specific events.
- [Auth0 AD/LDAP Connector Health Monitor](/extensions/adldap-connector): exposes endpoint for AD/LDAP connections monitoring.
- [Auth0 Logs to Application Insight](/extensions/application-insight): exports Auth0 logs to Application Insights.
- [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage): exports Auth0 logs to Azure Blob Storage
- [Auth0 Authentication API Webhooks](/extensions/authentication-api-webhooks): webhooks definition for the Auth0 Authentication API; goes through the audit logs and calls the appropriate webhook for specific events.
- [Auth0 Logs to Loggly](/extensions/loggly): exports Auth0 logs to Loggly.
- [Auth0 Logs to Papertrail](/extensions/papertrail): exports Auth0 logs to Papertrail.
- [Users Import / Export](/extensions/user-import-export): import or export users.
- [Auth0 Logs to Sumo Logic](/extensions/sumologic): export Auth0 logs to Sumo Logic.
- [Auth0 Logs to Splunk](/extensions/splunk): export Auth0 logs to Splunk.
- [Auth0 Logs to Logstash](/extensions/logstash): export Auth0 logs to Logstash.
- [Auth0 Logs to Mixpanel](/extensions/mixpanel): export Auth0 logs to Mixpanel.
- [Real-time Webtask Logs](/extensions/realtime-webtask-logs): allows browser-based access to real-time webtask logs.
- [Auth0 Logs to Logentries](/extensions/logentries): export Auth0 logs to Logentries.
- [GitHub Deployments](/extensions/github-deploy): deploy rules and database connections from GitHub to Auth0.


## Creating Your Own Extension

If you would like to [create your own extension](/extensions/custom-extensions), Auth0 provides the following sample code to help you get started:

- [Auth0 Extension Boilerplate](https://github.com/auth0/auth0-extension-boilerplate)
- [Auth0 Extension with API Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-api)
- [Auth0 Extension with React Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-react)

Alternatively, you may following the Development Instructions provided via the "New Extension" window that appears when you click on the "+ Extension" button. This allows you to create your own extension using the command line.

For instructions on how to install your custom extension, please see [Installing a Custom Extension](/extensions/custom-extensions#installing-a-custom-extension).
