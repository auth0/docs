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
useCase:
  - troubleshooting
---
# Troubleshoot

Before submitting a ticket to Auth0 [Support Center](https://support.auth0.com/), review the following troubleshooting guides to identify and possibly fix the issue. If you still cannot address the issue, you can create a support ticket. For more details, see the following information: 

* [Supported versions](/support/matrix)
* [Support Plans and Service Level Agreements](/support#defect-responses)
* [Items to check before submitting a support ticket](/onboarding/enterprise-support#what-to-check-before-logging-an-issue)
* [Information to include in your support case](/onboarding/enterprise-support#information-to-provide-when-logging-an-issue)
* [Open and Manage Support Tickets](/support/tickets)  
* [Professional Services](/services)

## Basics

<%= include('../_includes/_topic-links', { links: [
  'troubleshoot/guides/verify-auth0-status-availability',
  'troubleshoot/guides/verify-platform',
  'troubleshoot/guides/verify-connections',
  'troubleshoot/guides/verify-domain',
  'troubleshoot/guides/verify-rules',
  'troubleshoot/guides/check-error-messages',
  'errors/deprecation-errors',
  'troubleshoot/guides/generate-har-files',
  'tokens/guides/jwt/validate-jwt'
] }) %>

## Authentication and authorization issues

<%= include('../_includes/_topic-links', { links: [
  'troubleshoot/guides/check-api-calls',
  'troubleshoot/guides/check-login-logout-issues',
  'troubleshoot/guides/check-user-profiles',
  'universal-login/error-pages',
  'authorization/concepts/troubleshooting',
  'multifactor-authentication/troubleshooting',
  'libraries/error-messages',
  'protocols/saml/saml-configuration/troubleshoot'
] }) %>

## Integration and extensibility issues

<%= include('../_includes/_topic-links', { links: [
  'cms/wordpress/troubleshoot',
  'cms/wordpress/invalid-state',
  'connections/how-to-test-partner-connection',
  'connections/passwordless/reference/troubleshoot',
  'connections/database/custom-db/error-handling',
  'connections/apple-siwa/troubleshooting',
  'connector/troubleshooting',
  'custom-domains/troubleshoot',
  'extensions/troubleshoot',
  'extensions/authentication-api-debugger',
  'extensions/authorization-extension/v2/troubleshooting',
  'extensions/deploy-cli/references/troubleshooting', 
  'libraries/auth0-php/troubleshooting'
] }) %>
