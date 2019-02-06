---
description: Extensions enable you to install applications or run commands/scripts that extend the functionality of Auth0.
toc: true
topics:
  - extensions
contentType:
  - index
useCase: extensibility-extensions
---
# Auth0 Extensions

Auth0 Extensions enable you to install applications (such as [Webtasks](https://webtask.io/)) or run commands/scripts that extend the functionality of the Auth0 base product.

Each extension is separate from all other extensions. Auth0 defines extensions per tenant, so data is stored by the pair `tenant\extension`.

## Using an Extension

Auth0 provides the following pre-defined extensions, and they are available for installation via the [Dashboard](${manage_url}). To use one or more of the following apps, you must provide the required configuration information and finish installing the extensions.

![Auth0 Extensions](/media/articles/extensions/auth0-provided-extensions.png)

## What types of actions can I do with extensions?

### Manage the authorizations for Users using Groups, Roles and Permissions
- [Auth0 Authorization Extension](/extensions/authorization-extension)

### Easily manage custom social connections
- [Custom Social Connections Extension](/extensions/custom-social-extensions)

### Go through the audit logs and call the appropriate webhook for specific API event triggers
- [Auth0 Management API Webhooks](/extensions/management-api-webhooks)
- [Auth0 Authentication API Webhooks](/extensions/authentication-api-webhooks)

### Test various endpoints of the Auth0 Authentication API
- [Authentication API Debugger Extension](/extensions/authentication-api-debugger)

### Monitor your AD/LDAP connectors
- [Auth0 AD/LDAP Connector Health Monitor](/extensions/adldap-connector)

### Import or Export existing users
- [Users Import / Export](/extensions/user-import-export)

### Export Auth0 logs to an external service
- [Auth0 Logs to Application Insights](/extensions/application-insight)
- [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage)
- [Auth0 Logs to Loggly](/extensions/loggly)
- [Auth0 Logs to Papertrail](/extensions/papertrail)
- [Auth0 Logs to Sumo Logic](/extensions/sumologic)
- [Auth0 Logs to Splunk](/extensions/splunk)
- [Auth0 Logs to Logstash](/extensions/logstash)
- [Auth0 Logs to Mixpanel](/extensions/mixpanel)
- [Auth0 Logs to Logentries](/extensions/logentries)

### Access to real-time webtask logs
- [Real-time Webtask Logs](/extensions/realtime-webtask-logs)

### Expose the Users dashboard to a group of users without allowing them access to the dashboard
- [Delegated Administration](/extensions/delegated-admin)

### Deploy hosted pages, rules, and database connections scripts from external repositories
- [GitHub Deployments Extension](/extensions/github-deploy)
- [Bitbucket Deployments Extension](/extensions/bitbucket-deploy)
- [GitLab Deployments Extension](/extensions/gitlab-deploy)
- [Visual Studio Team Services Deployments Extension](/extensions/visual-studio-team-services-deploy)

### Create a SSO dashboard with multiple enterprise applications 
- [SSO Dashboard Extension](extensions/sso-dashboard)

### General Troubleshooting

The basis of this section is a general troubleshooting for extensions.

If you run into any extension issues, the first thing we suggest is to:
- Delete the current extension you have configured
- Logging out  of your Auth0 Dashboard
- Logging back in
- Re-installing the extensions and re-configuring it


Sometimes app configurations can become cached.

Additionally, many recent issues can be pinpointed to some tenants still using Node 4. Many of  our extensions rely on modules that use Node 8. We recommend to navigate to https://manage.auth0.com/#/tenant/advanced and scroll to the bottom to the Extensibility tab and to change the runtime from Node 4 to Node 8 and then, clicking save at the bottom of the page. 
Please note, if you are still on Node 4, this extension requires Node 8. I would recommend checking out this migration guide (https://auth0.com/docs/migrations/guides/extensibility-node8)  before updating to node 8 to see what may be affected by this change.

An example of errors we see in the scenario above  is this:   "Compilation failed: Cannot find module 'auth0-source-control-extension-tools'"

If you are still experiencing issues, it would be helpful if you could provide errors or Real-time Webtask Logs when submitting a support ticket. Instructions to use Real-time Webtask Logs can be found here: https://auth0.com/docs/extensions/realtime-webtask-logs


