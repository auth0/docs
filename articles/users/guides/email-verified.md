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

The `email_verified` field of a user profile indicates if the user has verified their email address. Valid emails are required for things such as communications to users, password resets/recovery, and magic links.

However, valid emails should not be the basis to make decisions about authorization or to perform automatic account linking.

An email is usually verified when the user account is created or when the user logs in to the application for the first time. Since email verification happens at a specific moment, later on we can't ensure the person logged in with the account still owns the email address.

## Don't use the email_verified field to make authorization decisions

...

```js
// sample of rule you should not use
```

## Don't use emails as a way to perform automatic account linking

Even if the email is verified, the same email can be used by different people. For example: with email aliases or shared accounts.

An email can also change owners. The owner of the account you are linking to might no longer own the email address, and the new owner would take over the existing account. For example, a company might hire John Doe and give him the email address `john.doe@travel0.com`. If John Doe leaves the company, and another John Doe is hired, and he logs in to the same application using a GSuite connection, they’ll take over the previous account.

## Email domain used for validation

...

* in general, don't use the email domain to validate that a user belongs to any specific organization, unless you have control of that organization’s directory.
* example: if you are federating to your internal ADFSs, you can trust the email domains. If you are also federating to your customers' ADFS, you can’t. A rogue admin in those customers could potentially create email accounts with the domain of your internal ADFS.

## Guest users

* some Identity Providers support Guest users (e.g Azure AD).
* you might want to enable those users to use the features enabled for users from the main domain even if these users don’t have the same email domain.
* if you need to make sure the user belongs to the organization you can rely on the connection they authenticated with, or specific claims (e.g. tenant id in Azure AD)
* when the emails are returned as verified from upstream identity providers, we need to trust that they do proper email verification and report it correctly. We can’t really trust that unless we control the Identity Provider.
