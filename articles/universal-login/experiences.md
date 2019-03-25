---
description: Overview of the two available experiences for Universal Login and how to choose between them.
topics:
  - login
  - universal-login
  - hosted-pages
contentType: how-to
toc: true
useCase: customize-hosted-pages
---
# Auth0 Universal Login - Choosing an Experience

The creation of the "New Experience" in Universal Login does not necessitate a migration from tenants using the "Classic Experience". It is a New Experience, but it does not replace all of the functionality of the Classic Experience, and does not intend to. For certain tenants, it may make sense to migrate; for others, it may not; and in any case, it is not mandatory.

## New Experience features

* The new login page was designed from the ground up to be lightweight and fast. It uses very little JavaScript and functions without JavaScript enabled.
* The new login page also features enhanced multi-factor authentication options, such as the ability to use Email as a second factor.
* The new login page was designed with modern styling and only the simple customization options, allowing 

### Potential use cases for the New Experience

* Your application is being newly set up with Auth0 and does not need
* Your application is currently using the Classic Experience, but is not heavily customized
* Your application is currently using the Classic Experience and is customized, but you wish to deliver a lighter weight login experience to your users.
* Your need for further MFA options (such as email as a factor) for your application outweighs your interest in extensive customization.

## Classic Experience features

* Default UI is based on Auth0's Lock widget
* Extensive customization options available
* Is no longer receiving new feature updates

### Potential use cases for the Classic Experience

* Your applications already use a customized Classic Experience
* Your application needs a custom designed login UI