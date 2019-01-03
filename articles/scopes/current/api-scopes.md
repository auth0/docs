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

As an [API](/apis) developer, you need to:

1. Decide which user information you would like external applications to be able to access on a user's behalf.
2. Define these access levels as custom scopes.
3. Identify these scopes so that calling applications can use them. 

For example, let's say you are building an API that provides data to a calendar application. At various times, the app may need to edit items on the calendar, read them, or both read and write to calendar items for a user. To do this, you create two scopes for your API: one that authorizes write access (`write:appointments`) and one that authorizes read-only access (`read:appointments`). 

A calling application will request authorization from the user to access the requested scopes, and the user will approve or deny the request. The app may request read access by including the `read:appointments` scope in its request, write access by including the `write:appointments` scope in its request, or both read and write access by including both the `read:appointments` and `write:appointments` scopes in its request. 

Now, when the app calls your API, it will include a token which verifies that the user has provided authorization to access their content and also indicates which scopes the user has approved. Your API should respect the approved scopes and only release information that was authorized by the user to the calling application.

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
