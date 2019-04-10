---
description: Learn what Rules are and how you can use them to customize and extend Auth0's capabilities.
toc: true
topics:
  - rules
  - extensibility
contentType:
  - reference
  - concept
  - index
useCase: extensibility-rules
---

# Rules

Rules are JavaScript functions that execute when a user authenticates to your application. They run once the authentication process is complete, and you can use them to customize and extend Auth0's capabilities. 

Please note that rules also run during the [token refresh](https://auth0.com/docs/tokens/refresh-token/current) flow.

![Rule Flow](/media/articles/rules/flow.png)

1. An app initiates an authentication request to Auth0.
1. Auth0 routes the request to an Identity Provider through a configured connection.
1. The user authenticates successfully.
1. The [ID Token](/tokens/id-token) and/or [Access Token](/tokens/overview-access-tokens) is passed through the Rules pipeline, then sent to the app.

## What can I use Rules for?

Among many possibilities, rules can be used to:

* __Enrich user profiles__: query for information on the user from a database/API, and add it to the user profile object.
* Create __authorization rules__ based on complex logic (anything that can be written in JavaScript).
* __Normalize attributes__ from different providers beyond what is provided by Auth0.
* Reuse information from existing databases or APIs for migration scenarios.
* Keep a __white-list of users__ and deny access based on email.
* __Notify__ other systems through an API when a login happens in real-time.
* Enable counters or persist other information. For information on storing user data, see: [Metadata in Rules](/rules/guides/metadata).
* Modify tokens: Change the returned __scopes__ of the Access Token and/or add claims to it, and to the ID Token.

::: warning How to Handle Rate Limits when calling Auth0 APIs
For rules that call Auth0 APIs, you should always handle rate limiting by checking the X-RateLimit-Remaining header and acting appropriately when the number returned nears 0. You should also add logic to handle cases in which you exceed the provided rate limits and receive the HTTP Status Code 429 (Too Many Requests); in this case, if a re-try is needed, it is best to allow for a back-off to avoid going into an infinite re-try loop. For more information about rate limits, see [Rate Limit Policy For Auth0 APIs](/policies/rate-limits).
:::

## Syntax

A Rule is a function with the following arguments:

* `user`: the user object as it comes from the identity provider. Check out the [User Object in Rules](/rules/references/user-object) page for a list of the available user properties.

* `context`: an object containing contextual information of the current authentication transaction, such as the user's IP address, application, or location. Check out the [Context Object in Rules](/rules/references/context-object) page for a list of the available context properties.

* `callback`: a function to send potentially modified tokens back to Auth0, or an error. Because of the async nature of Node.js, it is important to always call the `callback` function or else the script will timeout.

## Execution order

Rules execute in the order shown on the Auth0 Dashboard. If a rule depends on the execution of another rule, move the dependent rule lower in the list.

## Available modules

For security reasons, your Rules code executes isolated from the code of other Auth0 tenants in a sandbox. 

<%= include('./_includes/_supported-modules.md') %> 
