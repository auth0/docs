---
title: Troubleshoot
description: Running into an issue? Here are the things you should check to narrow down and solve common issues in Auth0.
classes: topic-page
toc: true
topics:
  - troubleshooting
  - errors
contentType:
  - index
  - reference
useCase:
  - troubleshooting
---
# Troubleshoot

*add intro text here*

* [**Support Center**](https://support.auth0.com/): View and manage your subscription and tenants, file and view support requests, run automated production checks on a tenant, and view compliance information. Paid subscribers will find the support center a valuable resource if an issue or question cannot be solved by documentation or by searching the forum.

  * [**Create support cases**](/support/tickets): Create and file a support case if you need help.
  
  * [**Support Plans and Service Level Agreements**](/support#defect-responses): Learn about multiple levels of support available for purchase.

  * [**Troubleshooting tips**](/onboarding/enterprise-support#what-to-check-before-logging-an-issue) and [**Information to include in your support case**](/onboarding/enterprise-support#information-to-provide-when-logging-an-issue): Get advice to help your development and support teams analyze issues.

* [**Supported versions**](/support/matrix): Understand which versions of SDKs, browsers, and languages are supported. Architects and developers should review this to ensure your project employs languages, libraries, and SDKs that will allow your implementation to work with Auth0.

* [**Feedback Portal**](https://auth0.com/feedback): Make product suggestions. (You can also do this via the Support Center if you want better visibility into what you’ve filed over time.) Architects and developers can use this site to provide feedback on the Auth0 product for consideration as enhancements in the future.

* [**Professional Services**](/services): Engage our world-wide professional services team to help speed your project to success. Project owners will find this useful for learning how Auth0 identity experts can help accelerate your project or fill in any temporary skill gaps.

## Troubleshooting basics

<%= include('../_includes/_topic-links', { links: [
  'troubleshoot/guides/verify-auth0-status-availability',
  'troubleshoot/guides/verify-platform',
  'troubleshoot/guides/verify-connections',
  'troubleshoot/guides/verify-domain',
  'troubleshoot/guides/verify-rules',
  'troubleshoot/guides/check-error-messages',
  'errors/deprecation-errors',
  'troubleshoot/guides/generate-har-files'
] }) %>

## Authentication and authorization issues

<%= include('../_includes/_topic-links', { links: [
  'troubleshoot/guides/check-api-calls',
  'troubleshoot/guides/check-login-logout-issues',
  'troubleshoot/guides/check-user-profiles',
  'universal-login/error-pages',
  'authorization/concepts/troubleshooting',
  'multifactor-authentication/troubleshooting',
  'protocols/saml/saml-configuration/troubleshoot'
] }) %>

## Integration and extensibility issues

<%= include('../_includes/_topic-links', { links: [
  'cms/wordpress/troubleshoot',
  'cms/wordpress/invalid-state',
  'connections/how-to-test-partner-connection'
  'connections/passwordless/reference/troubleshoot',
  'connections/database/custom-db/error-handling',
  'connections/apple-siwa/troubleshooting',
  'connector/troubleshooting',
  'custom-domains/troubleshoot',
  'extensions/troubleshoot',
  'extensions/authorization-extension/v2/troubleshooting',
  'extensions/deploy-cli/references/troubleshooting', 
  'libraries/auth0-php/troubleshooting'
] }) %>
