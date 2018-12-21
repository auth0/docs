---
description: Understand scopes used with APIs.
topics:
  - scopes
contentType:
  - concept
useCase:
  - development
  - call-api
  - secure-api
---
# API Scopes

As an [API](/apis) developer, you need to define the scopes available for applications that might call your API. This way, you can apply fine-grained control to the information and actions available to your users. In this case, you need to define custom scopes for your API and then identify these scopes so that calling applications can use them.

For example, let's say you are building an API that provides data to a calendar application. You want some users to be able to edit items on the calendar, others to only be able to read them, and others to be able to both read and write to calendar items. To do this, you create two scopes for your API: one that authorizes write access (`write:appointments`) and one that authorizes read-only access (`read:appointments`). 

Now, when an app calls your API, it will specify the scope it needs in its request. The app may request read access by including `read:appointments` in its scope, write access by including `write:appointments` in its scope, or both read and write access by including both `read:appointments` and `write:appointments` in its scope.

For an example showing how to request custom API access for your application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access).


## Limit API scopes

An application can request any defined scope and the user will be prompted to approve that scope during the authorization flow. Instead, you may want to limit available scopes based on, for example, the role of a user. To do this, you can use the [Authorization Extension](/extensions/authorization-extension) and a custom [Rule](/rules).

We discuss this approach in more depth in our [SPA+API Architecture Scenario](/architecture-scenarios/spa-api). Specifically, you can review the [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section to learn how to configure the Authorization Extension and create a custom Rule that will ensure scopes are granted based on a user's role.


## Keep reading

- [Sample Use Cases: Scopes](/scopes/current/sample-use-cases)
- [Define Scopes for an API Using the Auth0 Dashboard](/scopes/guides/define-api-scopes-dashboard)
- [Customize the Consent Prompt](/scopes/guides/customize-consent-prompt)
