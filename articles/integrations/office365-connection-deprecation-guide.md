---
description: Details migrating Office365 connections to Windows Azure AD.
topics:
  - integrations
  - microsoft
  - office-365
  - windows
  - azure-ad
  - active-directory
contentType: how-to
useCase: integrate-saas-sso
---

# Migrate Office365 Connections to Windows Azure AD

::: warning
Office365 has been deprecated. You should migrate your Office365 Connections to Windows Azure AD Connections.
:::

Since early days, we supported authenticating users with Office365. Office365 has always used Windows Azure AD behind the scenes, but there wasn't a good UI to create an "application" in Windows Azure AD. That's why you had to create it in the Seller Dashboard. Moving forward Microsoft wants you to use Windows Azure AD and you can now easily create a directory associated with your Office365 account and the application.

## How to migrate to Azure

1. Create a Windows Azure AD subscription (free)

2. Create a Directory (that will be associated with your Office365 account) and an application as explained [here](/waad-clientid).

::: warning
If you were using the `user_id` in your application, notice that it will change from `office365|....some-guid....` to `waad|...email....`.
:::
