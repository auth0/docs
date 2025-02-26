---
title: Deployment Best Practices
description: Learn about best practices for deployment.
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
  - rules
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
  - rules
---
# Deployment Best Practices

Coding a rule within the Auth0 Dashboard rule editor is a great way to implement and test while still in the development stage. However, when it comes time to deploy into automated test and/or production environments, a more automated mechanism is required; copying and pasting code between Auth0 tenants is not a satisfactory method to employ.

Out of the box, Auth0 provides a number of facilities for automated deployment of rule extensibility assets between Auth0 tenant environments. The Auth0 [GitHub](/extensions/github-deploy), [GitLab](/extensions/gitlab-deploy), and [Bitbucket](/extensions/bitbucket-deploy) extensions provide the ability to update rule assets from the respective third-party version control system&mdash;both manually and in many instances, automatically (i.e., when a change in the version control system is detected).

In addition, the Auth0 [Deploy CLI](/extensions/deploy-cli) tool can be used to automate deployment between Auth0 tenants. Deploy CLI works with files stored in the file system together with the Auth0 Management API and provides the capability to allow the export of rule assets from an Auth0 tenant, as well as import of them into an Auth0 tenant. Further, the tool provides for programmatic control over rule ordering and rule environment [configuration](/best-practices/rules#environment-variables) as part of deployment automation. In many ways, the Deploy CLI is like a Swiss Army knife when it comes to rule extensibility deployment in Auth0.

::: panel Best Practice
As a best practice, you should use the Auth0 [Deploy CLI](/extensions/deploy-cli) tool in almost all cases involving deployment to test or production environments. While the extensions can provide automated detection of changes deployed to the respective version control system, the Deploy CLI tool allows precise control of what’s deployed when, where, and how.
:::

## Versioning

There is no version management when it comes to rules in Auth0; changes made to a rule deployed to an Auth0 tenant will be made live immediately because any change written instantly overwrites what is already there. It is therefore recommended that:

* use of version control, such as Git via GitHub or the like, is employed to provide change management capability
* use of a separate [Test Tenant](/dev-lifecycle/setting-up-env) in Auth0 is employed (as part of testing strategy) to provide safe testing of any rule/rule changes before deploying to production
