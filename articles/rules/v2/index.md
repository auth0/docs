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
useCase:
  - extensibility-rules
---

# Rules

Rules are JavaScript functions that are executed when a user authenticates to your application. They run once the authentication process is complete, and you can use them to customize and extend Auth0's capabilities. They can be chained together for modular coding and can be turned on and off individually.

1. An app initiates an authentication request to Auth0.
1. Auth0 routes the request to an Identity Provider through a configured connection.
1. The user authenticates successfully.
1. The [ID Token](/tokens/id-token) and/or [Access Token](/tokens/overview-access-tokens)) is passed through the Rules pipeline, then sent to the app.

Rules allow you to define arbitrary code which can be used to fulfill custom authentication and authorization requirements, log events, retrieve information from external services, and much more.

Easily create your own rules that will be executed as part of the authentication pipeline every time a user authenticates to an app.

Rules are code snippets written in JavaScript that are executed as part of the authentication pipeline in Auth0. This happens every time a user authenticates to an application. Rules enable very powerful customizations and extensions to be easily added to Auth0.

Custom Javascript snippets that run in a secure, isolated sandbox in the Auth0 service as part of your authentication pipeline.

## What can I use Rules for?

Among many possibilities, rules can be used to:

* __Enrich user profiles__: query for information on the user from a database/API, and add it to the user profile object.
* Create __authorization rules__ based on complex logic (anything that can be written in JavaScript).
* __Normalize attributes__ from different providers beyond what is provided by Auth0.
* Reuse information from existing databases or APIs for migration scenarios.
* Keep a __white-list of users__ and deny access based on email.
* __Notify__ other systems through an API when a login happens in real-time.
* Enable counters or persist other information. For information on storing user data, see: [Metadata in Rules](/rules/metadata-in-rules).
* Enable __multi-factor authentication__, based on context (such as last login, IP address of the user, location, and so on).
* Modify tokens: Change the returned __scopes__ of the Access Token and/or add claims to it, and to the ID Token.

Use custom Javascript snippets that run in a secure, isolated sandbox in the Auth0 service as part of your authentication pipeline.

Augment the customer profile by calling external APIs like FullContact and others.

Programatically filter which users can login to your application. Use whitelist, geolocated access or anything. Your imagination is the limit.

Create a javascript snippet running within the authentication pipeline on Auth0's server that can call another API to perform additional logic, then redirect back to the pipeline to complete processing.

## Create a Rule

To create a new Rule, go to [Rules > New Rule](${manage_url}/#/rules/new) on the Dashboard.

![Create New Rule]()

You can pick the empty Rule template to start from scratch, or use a pre-made Rule template adjust it to suit your needs.

For more examples, see our Github repo at [auth0/rules](https://github.com/auth0/rules).
