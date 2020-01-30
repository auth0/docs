---
description: Describes how the state parameter is now required on redirects from Rules.
topics:
  - redirects
  - state-parameter
contentType: reference
useCase:
  - redirect-from-rules
---
# Upgrade Notice: State Parameter Required on Redirect from Rule

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-11-01 |

When a redirect is done from an Auth0 rule, Auth0 takes care of generating and sending a state parameter in HTTP and Auth0 will check for a valid state parameter when flow returns to the /continue endpoint.  The site to which the redirect goes has to capture the value of the state parameter and return it by adding it as a parameter when returning to the /continue endpoint.

This is documented [here](/rules/redirect#what-to-do-after-redirecting)

## Are you affected?

You are effected by the change only if you redirect from rules, and do not yet capture and return (to the /continue end point) the state parameter.
