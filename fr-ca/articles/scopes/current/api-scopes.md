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
2. Define these access levels as custom <dfn data-key="scope">scopes</dfn>.
3. Identify these scopes so that calling applications can use them. 

## Ways to use API scopes

You can use API scopes in different ways:

* In an API where the calling application is a third-party, or external, application. In this case, the calling application will request authorization from the user to access the requested scopes, and the user will approve or deny the request.
* In an API where the calling application is a first-party application, or application that is registered under the same Auth0 domain as the API it is calling. In this case, by default, user consent is not requested, but you may configure consent to be required.
* In an API where the calling application is a back-end service, whether third-party or first-party, and no user exists. In this case, user consent is never requested.

::: note
All of these examples use scopes to limit access through use of a token. If you so choose, your API may also use additional logic beyond the token to enforce more extensive access control.
:::

For an example showing how to request custom API access for your application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access).

### Example: An API called by a third-party application

Let's say you are building an API that provides bank account information to online payment applications. At various times, apps may need to read account balances or transfer funds. To do this, you create two scopes for your API: one that authorizes read access to an account balance (`read:balance`), one that authorizes fund transfers (`transfer:funds`). Your API is registered with Auth0.

A calling application will request authorization from the user to access the requested scopes, and the user will approve or deny the request. The app may request read access to the user's balance by including the `read:balance` scope in its request, access to make fund transfers by including the `transfer:funds` scope in its request, or access to both read the user's balance and transfer funds by including both the `read:balance` and `transfer:funds` scopes in its request. 

Now, when the app calls your API, it will include a token which verifies that the user has provided authorization to access their content and also indicates which scopes the user has approved. Your API should respect the approved scopes and only release information that was authorized by the user to the calling application. 

### Example: An API called by a first-party application

Let's say you are building an API that provides data to an events application, which you have also written. You implement [role-based access control (RBAC)](/authorization/concepts/rbac), creating a <dfn data-key="role">role</dfn> of `organizer` and a role of `participant`. Users with a role of `organizer` need to create and update events, whereas users with a role of `participant` need to view events and register for events. To do this, you create four scopes for your API: one that authorizes create access for events(`create:events`), one that authorizes update access for events (`update:events`), one that authorizes read-only access for events (`view:events`), and one that authorizes registration access for events (`register:events`). Both your API and event application are registered with Auth0, and the **Allow Skipping User Consent** for first-party applications option is enabled for your API. You have installed the Authorization Extension and configured an `organizer` role and created the `create:events` and `update:events` scopes for it, and assigned it to User A. You have also configured a `participant` role and created the `view:events` and `register:events` scopes for it, and assigned it to User B.

User A authenticates with the calling application, which requests the necessary scopes, but because it is a first-party application, user consent will not be requested. The app may request any combination of `create:events`, `update:events`, `view:events`, and `register:events` scopes, but User A is recognized as having the role of `organizer` and therefore is only granted the `create:events` and `update:events` scopes.

Now, when the app calls your API, it will include a token which verifies that it has authorization for only the scopes associated with the role of the authenticated user.

### Example: An API called by a back-end service

Let's say you work for a hospital and have an API that produces large amounts of imaging data whenever a patient gets an MRI. You store the imaging data locally for six months, but the hospital needs the images to be stored long-term for the purpose of regulatory compliance. Because of this, the hospital has a service that copies imaging data to an offsite cold storage solution on a nightly basis and deletes all local medical data after six months of storage.

To do this, you create two scopes for your API: one that authorizes read access to your imaging data (`read:images`) and one that authorizes delete access to your imaging data (`delete:images`). Your API and automated service are registered with Auth0, and you have authorized the automated service to request tokens for your API.

The calling automated service will request the necessary scopes, but because there is no user, consent will not be requested. The service may request read access to your imaging data by including the `read:images` scope in its request, delete access by including the `delete:images` scope in its request, or both read and delete access by including the `read:images` and `delete:images` scopes in its request.

Now, when the automated service calls your API, it will include a token which verifies that it has authorization for the requested scopes.

## Limit API scopes

An application can include any scope defined for an API in its request. Instead of allowing all available scopes to be requested, however, you can limit scopes for certain users. For example, a user of your application can be given a role so that requests on their behalf are limited to just the scopes assigned to that role. To do this, you can use the [Authorization Extension](/extensions/authorization-extension) and a custom [Rule](/rules).

We discuss this approach in more depth in our [SPA+API Architecture Scenario](/architecture-scenarios/spa-api). Specifically, you can review the [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section to learn how to configure the Authorization Extension and create a custom Rule that will ensure scopes are granted based on a user's role.


## Keep reading

- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [Add API Permissions (Scopes)](/dashboard/guides/apis/add-permissions-apis)
- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Restrict Access to APIs](/api-auth/restrict-access-api)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)
