---
title: Email Verified Usage
description: Outlines proper usage of the email_verified field in a user profile.
topics:
    - users
    - user-management
    - user-profiles
contentType:
    - how-to
    - reference
useCase: manage-users
---
# Verified Email Usage

The `email_verified` field of a user profile indicates if the user has verified their email address. Valid emails are required for things such as communications to users, password resets/recovery, and passwordless magic links.

An email is usually verified immediately after the user account is created or when the user logs in to the application for the first time. It's a good way to know that the person signing up actually owns the email at that moment. 

Since email verification happens at that specific moment, later on we can't ensure the person logged in with the account still owns the email address. 

Federated identity providers sometimes report if the user has a verified email, and based on that, Auth0 sets the `email_verified` field in the user profile. However, you can't know if the identity provider is doing that properly, or if the verified email from that provider is still owned by the user.

For all of these reasons, we need to be careful on what we can assume based on a verified email.

## Verified Emails and Account Linking

When you want to [link two user accounts](/articles/users/concept/overview-user-account-linking), you need to make sure that the user still has access to both accounts. The only way to achieve that is to have users authenticate with both accounts before linking them. 

You **should not automatically link accounts based on the user's emails**. Always prompt users to authenticate again before doing that. This will prevent scenarios like:

- John Doe, an employee of Travel0, signs up to a site using his corporate email `john.doe@travel0.com` and a password. Months later, John Doe leaves Travel0, and a new John Doe is hired, with the same email account. That person goes to the same website, and authenticates with his corporate identity provider (e.g. GSuite), and gets the account automatically linked to the other user.

- Federated identity providers can make mistakes on how they handle email verification, and can report that users owns an email they do not. 

On the other hand, we recommend you to still check for the `email_verified` field *before* performing account linking, to mitigate scenarios like:

- An attacker creates a Google account 'attacker@gmail.com'
- Attacker creates a new database users with the victim's email (e.g. 'victim@hotmail.com').
- Attacker links both accounts.
- Attacker sends a phishing attack to victim.
- The victim tries to sign-up, they are told the user already exists, and get offered to reset the password.
- The user enters their password, and logs into the attacker's account, which now has access to whatever data the victim enters in the application.

## Verified Emails and Authorization Decisions

You **should not use the email's domain to make authorization decisions**. If you need to check if the user belongs to a specific organization, it's better to rely on the connection they used to authenticate, or in connection-specific attributes like the Azure AD's tenant id.

## Keep reading

* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Account Link Extension](/extensions/account-link)
* [User Initiated Account Linking - Client-Side Implementation](/users/references/link-accounts-client-side-scenario)
* [Suggested Account Linking - Server-Side Implementation](/users/references/link-accounts-server-side-scenario)
