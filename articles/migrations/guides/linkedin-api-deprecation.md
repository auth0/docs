---
title: Migration to LinkedIn API V2
description: This article covers the LinkedIn API deprecation and how to update your Auth0 LinkedIn Connection.
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Migration to LinkedIn API V2

In December 2018, LinkedIn [deprecated version 1.0 of their sign-in API](https://engineering.linkedin.com/blog/2018/12/developer-program-updates). The final shutdown date is set for March 1st, 2019. LinkedIn is replacing the sign-in API with [version 2.0 that has some key differences](https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/migration-faq?context=linkedin/consumer/context).

We've added the option to set the LinkedIn API version for LinkedIn Connections. On the Auth0 Dashboard you can change the API version for a LinkedIn Connection by selecting a **Strategy Version** under the connection's settings.

![New LinkedIn Connection Settings](/media/articles/connections/social/linkedin/linkedin-connection-new.png)

On March 1st, 2019 all connections will automatically be updated to use version 2 of the LinkedIn API. You may need to update your application code to accomodate these API changes.

## What's changed?

There are changes in the user attributes you can request.

For version 1.0 we exposed these attributes:

| **Auth0 Attribute**| **Linkedin Scope**|
|----------------|---------------|
| Profile|  r_basicprofile|
| Full Profile  | r_fullprofile|
| Network   | r_network|
| Email | r_emailaddress|

For version 2.0 we expose these options:

| **Auth0 Attribute**| **Linkedin Scope**|
|----------------|---------------|
|Profile|   r_liteprofile|
|Basic Profile| r_basicprofile|
|Email| r_emailaddress|

As you can see version 2.0:

* Adds support for the `r_liteprofile` scope
* Removes support for the `r_fullprofile` and `r_network` scopes
* Supports the `r_basicprofile` scope only for clients that are part of [LinkedIn’s Developer Enterprise](https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/migration-faq#what-are-the-main-differences-with-the-new-sign-in-with-linkedin) services.

::: note
Not all applications registered with LinkedIn can access their new API. For more details, check [Microsoft’s documentation](https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/migration-faq#does-my-developer-application-have-access-to-the-linkedin-v2-api).
:::
