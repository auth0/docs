---
title: User Profile Management
description: Learn about user profile management planning considerations for your B2C implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-profiles
contentType: concept
useCase:
  - profile-management
---
# User Profile Management

User information is stored in Auth0 as part of the [*user profile*](/users/concepts/overview-user-profile), also known as the users' account, and can come from a variety of sources, such as third-party [identity providers](/identityproviders#social), your own [databases](/identityproviders#database-and-custom-connections), and [enterprise connections](identityproviders#enterprise) like Active Directory, SAML, etc.. 

You can *normalize* user data that comes from a variety of data sources. By default, Auth0 creates one user profile for each user identity.

## Design considerations

Here are some examples of the things that determine how you will manage user profile information:

* Where you store information to customize a user’s experience?
* Do you need to store user information that didn’t originate from an identity provider?
* Do you need to store user-related information that a user cannot modify?
* What if a user forgets or wants to change their password?

## User profile management tools

After your implementation is operational, you’ll need to manage the user profile information stored in the user data store. Management tasks can take many forms: 

* Self-served information updates
* Mandatory updates based on your organization's Ts and Cs
* Changes due to regulatory compliance
* Password resets
* Metadata changes
* Account verifications
* Blocking users 

There are two ways to manage user profile information:

* The Management API
* The Auth0 Dashboard

### Management API

You can use the [Auth0 Management API](/api/management/v2) to build your own centralized profile management user interface. See the [Management API user endpoints](/api/management/v2#!/Users/patch_users_by_id) for further details. Calls to the Management API require use of an [access token](/api/management/v2/tokens).

::: warning
Self service profile management can raise security as well as data privacy concerns. For example, you may want to allow a user to change their email address, however doing so without following best practice security guidance could result in the following: 
* Users locking themselves out of their accounts
* Leaked Personally Identifiable Information (PII)
* Potential breach in security
:::

::: panel Best Practice
<%= include('../_includes/_rate-limit-policy.md') %>
:::

### Auth0 Dashboard

You can also use the Auth0 Dashboard to manage aspects of a [user’s profile](users/guides/manage-users-using-the-dashboard). Managing a user’s profile via the Auth0 Dashboard is more of an administrative provision, and should not be used for self serviced profile management in a production environment. However, the interface provided by the Dashboard can be extremely useful during development as it provides a quick and simple way of manipulating a user’s profile information. 

## Metadata

Auth0 stores user profile [metadata](/users/concepts/overview-user-metadata) that contains information about users such as language preference or accessibility information. You can use metadata to store both information that a user can change and information they can’t. In the latter case, for example, you can associate a user profile with records in your existing systems without modifying the existing implementation. 

::: note
As is the case when managing the Normalized User Profile, calls to the Management API require use of an Access Token.
<%= include('../_includes/_rate-limit-policy.md') %>
:::

::: panel Best Practice
Use of Metadata should follow Auth0 [best practice guidance](/best-practices/user-data-storage-best-practices#metadata). Metadata storage is not designed to be a general purpose data store and you should still use your own external storage facility when possible. Metadata size and complexity should also be kept to a minimum, and the Auth0 Management API has a strict set of guidance when it comes to updating and/or deleting metadata associated with a user.
:::

At login, the identity provider updates information in the [Normalized User Profile](/users/normalized/auth0) and you can change a limited set of data through the Auth0 Management API. You can also use Auth0 Rules to override information in the Normalized User Profile. 

::: warning
A user profile cannot be directly accessed across multiple Auth0 tenants. See [Architecture](/architecture-scenarios/implementation/b2c/tenant-architecture) for details.
:::

### User metadata

User metadata is information that can be stored against a user profile and that a user can read and update as part of any self-service profile management. Metadata of this nature may be something like salutation for a user, or a user’s preferred language.

::: panel Best Practice
Any information that will be used to customize Auth0 emails, such as information used to determine the language for an email, should be stored in metadata and preferably `user_metadata` if the user is allowed to change it.   
:::

### App metadata

App metadata is additional information that can be stored with a user profile but can only be read or updated with appropriate authorization; `app_medata` is not directly accessible to a user. This type of metadata might be something like a flag to indicate the last set of valid terms and conditions was accepted by the user, and a date to indicate when the user accepted them.

## Password reset

For users who forget their passwords, or who are allowed to change their password via some existing self service mechanism - or self service mechanism you have planned - Auth0’s provides [Password Reset](/connections/database/password-change) functionality. This can be integrated with your (existing) implementation and comes already incorporated with out-of-the-box Auth0 UI widgets incorporated as past as Universal Login. 

::: warning
Password change and password reset is only supported for Auth0 Database Connection types. 
:::

Auth0 Universal Login widgets provide built in UX support for password reset using Auth0 Authentication API functionality. Alternatively, you can use the [Auth0 Authentication API](/connections/database/password-change#use-the-authentication-api) through one the Auth0 SDKs appropriate to your development environment if you are using fully customized Universal Login. Email templates used during password reset workflow can also be fully customized whether you use Auth0 out of box UI widgets or customized Universal Login.  

The Auth0 Management API, on the other hand, can be used to [directly change the password](/connections/database/password-change#directly-set-the-new-password) for a user identity defined using a Database Connection type. The Auth0 Management API can be used as part of any self service profile management implementation and is also used as part of any Change Password page customization. 

## Account verification

You’ll also want to make sure that you are working with a verified user account at all times, and make use of the mechanisms Auth0 provides. You should also consider regulatory compliance like [GDPR](https://eugdpr.org/) which has some very specific requirements when it comes to protecting all EU citizens from privacy and data breaches and guidance.  

Auth0 provides out of box functionality for sending a [verification email](/email/custom#verification-email) to a user's email address as one way of verifying their account. By default, Auth0 is configured to automatically send verification emails for any database connections user identity created (e.g as part of self sign up; discussed here). However, Auth0 also provides a Management API endpoint which can also be used to send verification emails in cases where email addresses validation is not performed by a Social Provider upon user registration. 

::: panel Best Practice
Any information that will be used to customise Auth0 emails, such as information used to determine the language for an email, should be stored in metadata: and preferably `user_metadata` if the user is allowed to change it. 
:::

## Blocking and unblocking users 

[Blocking user access](/users/guides/block-and-unblock-users) in Auth0 provides a way to prevent user login to applications under certain conditions. By default, the Auth0 Dashboard provides an out-of-the-box mechanism to give administrators the ability to both block and unblock user access to all applications. You can implement this with the Management API. Alternatively, you can use Auth0 extensibility to disable user access to certain applications as well as providing more fine grained access control.

The Auth0 Management API also provides you with the ability to unblock users disabled due to excessive use of incorrect credentials.  

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/tenant-architecture)
* [User Provisioning](/architecture-scenarios/implementation/b2c/user-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/authentication)
* [Branding](/architecture-scenarios/implementation/b2c/branding)
* [User Authorization](/architecture-scenarios/implementation/b2c/user-authorization)
* [User Logout](/architecture-scenarios/implementation/b2c/user-logout)
