---
title: API Scopes
description: Understand the principle of scopes and how it is used with APIs.
topics:
  - scopes
  - permissions
contentType:
  - concept
useCase:
  - development
  - call-api
  - secure-api
---
# API Scopes

As an [API](/apis) developer, you need to:

1. Decide which information you would like applications to be able to access on a user's behalf.
2. Define these access levels as custom scopes.
3. Identify these scopes so that calling applications can use them. 

## Ways to use API scopes

You can use API scopes in a few different ways:

* In an API where the calling application is a third-party, or external, application. In this case, the calling application will request authorization from the user to access the requested scopes, and the user will approve or deny the request.
* In an API where the calling application is a first-party application, or application that is registered under the same Auth0 domain as the API it is calling. In this case, by default, user consent is not requested, but you may configure consent to be required.
* In an API where the calling application is a back-end service and no user exists. In this case, user consent is never requested.

::: note
All of these examples use scopes to limit access through use of a token. If you so choose, your API may also use additional logic beyond the token to enforce more extensive access control.
:::

For an example showing how to request custom API access for your application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access).

### Example: An API called by a third-party application

Let's say you are building an API that provides bank account information to online payment applications. At various times, apps may need to read account balances or transfer funds. To do this, you create two scopes for your API: one that authorizes read access to an account balance (`read:balance`), one that authorizes fund transfers (`transfer:funds`). Your API is registered with Auth0.

A calling application will request authorization from the user to access the requested scopes, and the user will approve or deny the request. The app may request read access to the user's balance by including the `read:balance` scope in its request, access to make fund transfers by including the `transfer:funds` scope in its request, or access to both read the user's balance and transfer funds by including both the `read:balance` and `transfer:funds` scopes in its request. 

Now, when the app calls your API, it will include a token which verifies that the user has provided authorization to access their content and also indicates which scopes the user has approved. Your API should respect the approved scopes and only release information that was authorized by the user to the calling application. 

### Example: An API called by a first-party application

Let's say you are building an API that provides data to a calendar application, which you have also written. At various times, the app may need to edit items on the calendar, read them, or both read and write to calendar items for a user. To do this, you create two scopes for your API: one that authorizes write access (`write:appointments`) and one that authorizes read-only access (`read:appointments`). Both your API and calendar application are registered with Auth0, and the **Allow Skipping User Consent** for first-party applications option is enabled for your API.

The calling application will request the necessary scopes, but because it is a first-party application, user consent will not be requested. The app may request read access by including the `read:appointments` scope in its request, write access by including the `write:appointments` scope in its request, or both read and write access by including both the `read:appointments` and `write:appointments` scopes in its request. 

Now, when the app calls your API, it will include a token which verifies that it has authorization for the requested scopes. 

### Example: An API called by a back-end service

Let's say you are building an API that tracks local train and bus schedules, and the calling application is an automated service for a smart alarm clock, which you have also written. The smart alarm clock interface lets you select your train route to work and if you so desire, lets you select a bus route as a back-up method of transportation, before defaulting to driving your own vehicle. During the four hours prior to your train's scheduled departure time, the automated service checks your API to see if your train is canceled, and if so, checks your back-up bus route. If the bus route is active, it determines the extra time you'll need to catch your bus; otherwise, it calculates the extra time you'll need to drive yourself to work. Then, it adjusts your wake time accordingly.

For this purpose, the automated service will need to read your train schedule and potentially, read your bus schedule. To do this, you create two scopes for your API: one that authorizes read-only access to a train schedule (`read:train_schedule`) and one that authorizes read-only access to a bus schedule (`read:bus_schedule`). Both your API and automated service are registered with Auth0 and you have authorized the automated service to request tokens for your API.

The calling automated service will request the necessary scopes, but because there is no user, consent will not be requested. The service may request read access to the train schedule by including the `read:train_schedule` scope in its request, read access to the bus schedule by including the `read:bus_schedule` scope in its request, or read access to both the train and bus schedules by including both the `read:train_schedule` and `read:bus_schedule` scopes in its request. 

Now, when the service calls your API, it will include a token which verifies that it has authorization for the requested scopes.

## Limit API scopes

An application can include any scope defined for an API in its request. Instead of allowing all available scopes to be requested, however, you can limit scopes for certain users. For example, a user of your application can be given a role so that requests on their behalf are limited to just the scopes assigned to that role. To do this, you can use the [Authorization Extension](/extensions/authorization-extension) and a custom [Rule](/rules).

We discuss this approach in more depth in our [SPA+API Architecture Scenario](/architecture-scenarios/spa-api). Specifically, you can review the [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section to learn how to configure the Authorization Extension and create a custom Rule that will ensure scopes are granted based on a user's role.


## Keep reading

- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [How to Define Scopes for an API Using the Auth0 Dashboard](/scopes/current/guides/define-api-scopes-dashboard)
- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [Represent Multiple APIs Using a Proxy API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [How to Restrict Application or User Requests for API Scopes](/api-auth/restrict-requests-for-scopes)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)
