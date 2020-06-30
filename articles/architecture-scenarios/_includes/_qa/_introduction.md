Quality Assurance is important in identifying issues before they impact your customers and, depending on the nature of your project, there are several different types of quality assurance testing that you’re going to want to consider as part of your integration with Auth0:

* Is your application easy to understand and use, even by those with a disability?
* Does your application need to work across various different browsers and devices?
* Does your application need to work in multinational and/or international environments?
* How will your application perform when subjected to unexpected production loads?
* How can you ensure your application is safe from security-related vulnerabilities?

Auth0 [Universal Login](/universal-login) and associated UI widgets (such as [Lock](/libraries/lock)) have already been designed and built following usability and accessibility best practices, and provide tested out-of-box support for a whole host of [browsers and devices](/support/matrix#browsers). Support for [internationalization](/i18n) (I18N) is also provided out-of-box, with built-in extensibility designed for custom multi-language and localization (L10N) situations.

To ensure functional requirements are met and unexpected events are handled correctly, guidance is provided for testing the [integration](#integration-testing) between your application(s) and Auth0, and for [unit testing](#unit-testing) individual extensibility modules (such as [Rules](/rules/guides/debug#try-this-rule), [Hooks](/hooks/update), and Custom Database scripts). Guidance is also provided regarding Auth0's [penetration testing policy](/policies/penetration-testing) to help when testing for security vulnerability, and also how [Mock](#mock-testing) testing can be leveraged in conjunction with our [load testing policy](/policies/load-testing) to help ensure your application(s) perform under unexpected load.
