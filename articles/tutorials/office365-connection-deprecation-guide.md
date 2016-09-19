# Office365 Connections Deprecated - Use Windows Azure AD

## Immediate Action

Migrate your Office365 Connections to Windows Azure AD Connections.

## How

1. Create a Windows Azure AD subscription (free)
2. Create a Directory (that will be associated with your Office365 account) and an application as explained [here](/waad-clientid).

__IMPORTANT:__ If you were using the `user_id` in your application, notice that it will change from `office365|....some-guid....` to `waad|...email....`.

## Why

Since early days, we supported authenticating users with Office365. Office365 has always used Windows Azure AD behind the scenes, but there wasn't a good UI to create an "application" in Windows Azure AD. That's why you had to create it in the Seller Dashboard. Moving forward Microsoft wants you to use Windows Azure AD and you can now easily create a directory associated with your Office365 account and the application.
