---
title: Quality Assurance
description: Quality Assurance considerations for your B2C implementation.
toc: true
topics:
    - qa
    - b2c
    - ciam
    - user-authorization
contentType: concept
useCase:
  - quality-assurance
---
# Quality Assurance

Quality Assurance is important in identifying issues before they impact your customers and, depending on the nature of your project, there are several different types of quality assurance tests that you’re going to want to consider performing as part of your integration with Auth0:

* Is my application easy to understand and use, even by those with a disability? 
* Does my application need to work on across various different browsers and devices?
* Does my application need to work in multi-national and/or international environments? 
* How will my application perform when subjected to unexpected production loads?
* How can I ensure my applications is safe from security related vulnerability?

Auth0 [Universal Login](/universal-login) and associated UI widgets (such as [Lock](/libraries/lock)) have already been designed and built following usability and accessibility best practices, and provided tested out-of-box support for a whole host of [browsers and devices](/support/matrix#browsers). Support for [internationalization](/docs/i18n)(I18N) is also provided out-of-box, with built-in extensibility designed for custom multi-language and localization(L10N) situations.  

To ensure funcional requirements are met and unexpected events are handled correctly, guidance is provided for testing the [integration](#integration-testing) between your application(s) and Auth0, and for [unit testing](#unit-testing) individual extensibility modules - such as [Rules](/rules/guides/debug#try-this-rule), [Hooks](/hooks/guides/edit-hooks-using-dashboard#test-hooks) and Custom Database scripts. Guidance is also provided regarding Auth0's [penetration testing policy](/policies/penetration-testing) to help when testing for security vulnerability, and also how [Mock](#mock-testing) testing can be leveraged in conjunction with our [load testing policy](/policies/load-testing) to help ensure your application(s) perform under unexpected load.  


## Unit Testing

The objective of unit testing is to test individual units of code. If you create custom code within Auth0 in the form of Rules, Hooks and/or Custom DB scripts, you should consider use a testing framework (such as [Mocha](https://mochajs.org/)) to test your code. Companies who have been most successful with Auth0 have found it useful to execute these unit tests prior to [automatically deploying](architecture-scenarios/implementation/b2c/b2c-deployment) Auth0 tenant configuration and collateral.


## Integration Testing 

It is a recommended best practice that you set up different tenants for development, testing and production as discussed in Architecture guidence for [SDLC support](architecture-scenarios/implementation/b2c/b2c-architecture#sdlc-support). Auth0 also allows you to configure variables that are available from within custom code. Rather than hard code references that change when moving code between development, test and production environments, you can use a variable name that is configured in the tenant and referenced by the code. This makes it easier for the same custom code to function, without changes, in different tenants because the code can reference variables which will be populated with tenant-specific values at execution time:

::: panel Best Practice

:::

### Test Automation

You can automate your overall build process by incorporating deployment automation as well as test automation. This can be used to deploy new versions of configuration and/or custom code to Auth0 and execute automated tests. If the tests uncover any failures, the deployment automation capabilities can be used to revert to the last working version. For further information, see deployment automation guidance provided here.

## Mock Testing 

In a balance between Auth0’s [load testing policy](/policies/load-testing) and the desire to load test, it is common practice among Auth0’s customers to mock out Auth0’s endpoints. This is a valuable practice in order to ensure that your application works with your expected interfaces without having to restrict your testing, and tools such as [MockServer](http://www.mock-server.com/), [JSON Server](https://github.com/typicode/json-server) or even [Postman](https://learning.getpostman.com/docs/postman/mock_servers/setting_up_mock/) can be used to assist. 


## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)

