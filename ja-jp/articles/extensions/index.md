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

Auth0 Extensions enable you to install applications or run commands/scripts that extend the functionality of the Auth0 base product.

Each extension is separate from all other extensions. Auth0 defines extensions per tenant, so data is stored by the pair `tenant\extension`.

## Pre-defined extensions

Auth0 provides a selection of pre-defined extensions, which you can install via the [Dashboard](${manage_url}/extensions).

### Authorization

- [Auth0 Authorization Extension](/extensions/authorization-extension): Manage authorizations for users with groups, roles, and permissions. We recommend that you use our [Authorization Core](/authorization/guides/how-to) feature set instead, which is being expanded to match the functionality of the Authorization Extension and improves performance and scalability. For a comparison, see [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension).

- [Delegated Administration](/extensions/delegated-admin): Allow a select group of people to manage users without providing access to any other area of the Dashboard.

### Connections

- [Custom Social Connections Extension](/extensions/custom-social-extensions): Configure and manage custom social identity providers.

- [Single Sign-on (SSO) Dashboard Extension](extensions/sso-dashboard): Create a Single Sign-on (SS0) dashboard that allows users to sign into any of multiple listed enterprise applications.

### Manage users

- [Users Import / Export](/extensions/user-import-export): Bulk import and export database users.

### Extend and integrate

Use your own custom webhooks in conjunction with Auth0 APIs:

- [Auth0 Management API Webhooks](/extensions/management-api-webhooks)
- [Auth0 Authentication API Webhooks](/extensions/authentication-api-webhooks)

### Deployment and source control

Keep history and deploy [rules](/rules), [database connection](/connections/database) scripts and other assets from external repositories:

- [GitHub Deployments Extension](/extensions/github-deploy)
- [Bitbucket Deployments Extension](/extensions/bitbucket-deploy)
- [GitLab Deployments Extension](/extensions/gitlab-deploy)
- [Visual Studio Team Services Deployments Extension](/extensions/visual-studio-team-services-deploy)
- [Deploy CLI Tool Extension](/extensions/deploy-cli)

### Troubleshoot

Test Auth0 API endpoints:

- [Authentication API Debugger Extension](/extensions/authentication-api-debugger)

### Monitor

- [Auth0 AD/LDAP Connector Health Monitor](/extensions/adldap-connector): Monitor your [AD/LDAP Connectors](/connector/overview).

- [Real-time Webtask Logs](/extensions/realtime-webtask-logs): Access real-time Webtask logs.

### Logs export

Export Auth0 logs to external services:

- [Auth0 Logs to Application Insights](/extensions/application-insight)
- [Auth0 Logs to AWS Cloudwatch](/extensions/cloudwatch)
- [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage)
- [Auth0 Logs to Logentries](/extensions/logentries)
- [Auth0 Logs to Loggly](/extensions/loggly)
- [Auth0 Logs to Logstash](/extensions/logstash)
- [Auth0 Logs to Mixpanel](/extensions/mixpanel)
- [Auth0 Logs to Papertrail](/extensions/papertrail)
- [Auth0 Logs to Sumo Logic](/extensions/sumologic)
- [Auth0 Logs to Splunk](/extensions/splunk)

