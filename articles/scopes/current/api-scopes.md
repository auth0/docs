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

As an [API](/apis) developer, you need to define custom scopes available for applications that might call your API and then identify these scopes so that calling applications can use them. This way, you can apply fine-grained control to the information and actions available to your users.

For example, let's say you are building an API that provides data to a calendar application. You want some users to be able to edit items on the calendar, others to only be able to read them, and others to be able to both read and write to calendar items. To do this, you create two scopes for your API: one that authorizes write access (`write:appointments`) and one that authorizes read-only access (`read:appointments`). 

Now, when an app calls your API, it will specify the scope it needs in its request. The app may request read access by including the `read:appointments` scope in its request, write access by including the `write:appointments` scope in its request, or both read and write access by including both the `read:appointments` and `write:appointments` scopes in its request.

For an example showing how to request custom API access for your application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access).


## Limit API scopes

An application can include any defined scope in its request. Instead of including _all_ available scopes in every request, however, the scopes can be limited. For example, a user of your application can be given a role so that requests on their behalf are limited to just the scopes assigned to that role. To do this, you can use the [Authorization Extension](/extensions/authorization-extension) and a custom [Rule](/rules).

We discuss this approach in more depth in our [SPA+API Architecture Scenario](/architecture-scenarios/spa-api). Specifically, you can review the [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section to learn how to configure the Authorization Extension and create a custom Rule that will ensure scopes are granted based on a user's role.


## Keep reading

- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [How to Define Scopes for an API Using the Auth0 Dashboard](/scopes/current/guides/define-api-scopes-dashboard)
- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [How to Represent Multiple APIs Using a Single Auth0 API](/api-auth/tutorials/represent-multiple-apis)
- [How to Restrict Application or User Requests for API Scopes](/api-auth/restrict-requests-for-scopes)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)
