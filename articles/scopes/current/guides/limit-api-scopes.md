---
description: Learn how to limit the API scopes issued by your API.
topics:
  - scopes
  - API
  - Dashboard
contentType:
  - how-to
useCase:
  - development
  - secure-api
---

# Limit API Scopes Issued by Your API

An application can request any scope you have defined for your API, and the end user will be prompted to approve requested scopes during the authorization flow. 

Instead, you may want to limit scopes based on, for example, the permissions (or role) of a user. We discuss this approach in more depth in our [SPA + API Architecture Scenario](/architecture-scenarios/spa-api), specifically, the [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section. In this section, you will learn how to configure the [Authorization Extension](/extensions/authorization-extension) and create a custom [Rule](/rules) that will ensure scopes are granted based on the permissions of a user.
