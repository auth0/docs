# Office365 Connections Deprecated - Use Windows Azure AD

## Inmediate Action

Migrate your Office365 Connections to Windows Azure AD Connections.

## How

1. Create a Windows Azure AD subscription (free)
2. Create a Directory (that will be associated with your Office365 account) and an application as explained here <https://docs.auth0.com/waad-clientid>

IMPORTANT: If you were using the `user_id` in your application, notice that it will change from `office365|....some-guid....` to `waad|...email....`.

## Why

Since eary days, we supported authenticating users with Office365. Office365 always used Windows Azure AD behind the scenes, but there wasn't a proper UI to create an "application" in Windows Azure AD that's why you had to create it in the Seller Dashboard. Moving forward Microsoft wants you to use Windows Azure AD and you can now create a directory associated with your Office365 account and the application.
