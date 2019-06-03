---
title: Quality Assurance
description: Quality assurance considerations for your B2C implementation.
toc: true
topics:
    - qa
    - b2c
    - ciam
    - quality
contentType: concept
useCase:
  - quality-assurance
---
# Quality Assurance

<%= include('../_includes/_qa-intro.md') %>

## Unit testing

The objective of unit testing is to test individual units of code. If you create custom code within Auth0 in the form of Rules, Hooks, and/or Custom DB scripts, you should consider use a testing framework (such as [Mocha](https://mochajs.org/)) to test your code. Companies who have been most successful with Auth0 have found it useful to execute these unit tests prior to [automatically deploying](/architecture-scenarios/b2c/b2c-deployment) Auth0 tenant configuration and collateral.

## Integration testing 

It is a recommended best practice that you set up different tenants for development, testing, and production as discussed in Architecture guidance for [SDLC support](architecture-scenarios/b2c/b2c-architecture#sdlc-support). Auth0 allows you to configure variables that are available from within custom [extensibility](/topics/extensibility); these can be thought of as environment variables for your Auth0 tenant. Rather than hard code references that change when moving code between development, test, and production environments, you can use a variable name that is configured in the tenant and referenced by the custom extensibility code. This makes it easier for the same custom code to function, without changes, in different tenants as the code can reference variables which will be populated with tenant-specific values at execution time:

* For use of variables in Rules, see how to [configure values](/rules/guides/configuration#configure-values)
* For use of variables in Hooks, see how to [configure secrets](https://webtask.io/docs/editor/secrets) in the editor used for Hooks
* For use of variables in Custom DB Scripts, see the [configuration parameters](/connections/database/custom-db/create-db-connection#step-3-add-configuration-parameters) 

<%= include('../_includes/_bp-variables.md') %>

### Test automation

You can automate your overall build process by incorporating deployment automation as well as test automation. This can be used to deploy new versions of configuration and/or custom code to Auth0 and execute automated tests. If the tests uncover any failures, the deployment automation capabilities can be used to revert to the last working version. See [Deployment automation](/architecture-scenarios/b2c/b2c-deployment) for more information.

## Mock testing 

<%= include('../_includes/_qa-mock-testing.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/b2c/b2c-deployment)
* [Profile Management](/architecture-scenarios/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/b2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
