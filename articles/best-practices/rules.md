---
description: Best practices for writing and managing Auth0 Rules.
topics:
  - best-practices
  - rules
contentType:
    - reference
useCase:
  - best-practices
  - rules
---

# Rules Best Practices

Here are some best practices for using [rules](/rules). Before you start writing rules, review [what you can use rules for](/rules/current#what-can-i-use-rules-for-) and take a look at some [examples](/rules/current#examples)

## Handle errors

Make sure your rules code catches errors after calls which may trigger an error. Also, ensure every branch through the code ends with a return statement to call the callback.

## Review rule order

Rules execute in the order shown on the Auth0 Dashboard. If a rule depends on the execution of another rule, move the dependent rule lower in the rules list.

## Exit soon

To improve performance, write rules that exit as soon as possible.

For example, if a rule has 3 checks to decide if it should run, the first check should eliminate the most cases. Followed by the check that eliminates the second-highest number of cases for the rule to run, and so on.

## Reduce API requests

Try not to use a lot of API calls in rules. Too many can slow down login response time and may cause failures during a timeout.

Avoid calling the Management API if possible, especially in high volume environments.

## Cache results

Rules have a [global variable you can use to cache information](/rules/guides/cache-resources). For API calls that are not user-specific, use this variable to cache the results between users. For example, getting an access token to your API.

## Limited read or update users scopes

If you use the [Management API in rules](/rules/current/management-api) for the limited scope of reading or updating the current user, use the `auth0.accessToken` variable instead. This token will suffice if you only need the `read:users` and `update:users` scopes.

## Rules for specific applications

To run a rule for only specific applications, check for a [client metadata field](/rules/current/context#list-of-properties) instead of comparing the client.

This can improve performance as the rule only executes for clients with a certain metadata field, rather than checking Client IDs. It also makes adding new clients and reading the rule code easier.

You can set client metadata for your application on the dashboard by going to [Application Settings -> Advanced Settings -> Application Metadata](${manage_url}/#/applications/). To access client metadata in rules, use the [context object](/rules/current/context).
