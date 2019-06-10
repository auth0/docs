---
description: Understand what limits apply to Auth0's Authorization Extension.
toc: true
topics:
  - authorization
  - extension
  - groups
  - roles
  - permissions
  - limits
contentType: 
  - reference
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization Extension Limits

To ensure the quality of Auth0's Authorization Extension, certain limits apply.

Currently, the Authorization Extension is limited to 500KB of data, which equates to:

* 1000 groups, 3000 users, where each user is a member of 3 groups; or 
* 20 groups, 7000 users, where each user is a member of 3 groups

Alternatively, you can use our [Authorization core feature set](/authorization/guides/how-to), which we are expanding to match the functionality of the Authorization Extension. For a comparison of current functionality, see [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension).