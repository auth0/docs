---
title: Profile Management
description: Understand user profile management planning considerations for your B2C implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-profiles
contentType: concept
useCase:
  - profile-management
---
# Profile Management

At some point you’ll need to manage change to the information stored in a user’s [Profile](/users/concepts/overview-user-profile). A user’s profile - also known as the user’s Account - is stored in Auth0, and changes to the information it contains can be required for a number of different reasons: self-served information update, mandatory updates concerning your organizations T's & C’s, and changes due to regulatory compliance are just some of the things you’ll need to consider.

::: warning
A user profile cannot be directly accessed across multiple Auth0 tenants, so if you’re deploying multiple Auth0 tenants to production then this is something you need to be aware of.
:::

A user’s profile is populated from data supplied by an [identity provider](/identityproviders) during the login process, and this is referred to as the [Normalized User Profile](/users/normalized/auth0). By default there is one user profile created for each user identity, and there are a number of things to consider when looking at the management of it:

::: note
The Normalized User Profile is updated from the identity provider during login, and a limited set of the information it contains can be changed through the Auth0 Management API. Auth0 extensibility, such as Rules, can be used as an alternative to override information in the Normalized User Profile as described in the [Auth0 guidance](/users/concepts/overview-user-profile#user-profile-data-modification) provided.
:::

* What should I do if I need to store information to help customize a user’s experience?
* What if I need to store user information that didn’t originate from an identity provider?
* Why would I need to store user related information that a user cannot modify?
* What do I do if I need to store user related information that a user cannot modify?
* What happens if a user forgets their password?
* What should a user do if they want to change their password?

Auth0 provides for the storage of [Metadata](#metadata) against a user’s profile, which allows for the capture of additional information - such as preference for language and/or accessibility in order to enhance the user experience. Metadata can be used to store both information that a user can change, and also information they can’t; the latter giving you the capability of associating, for example, a user profile with records in your existing systems without modifying existing implementation. 

For users who forget their passwords, or who are allowed to change their password via some existing self-service mechanism (or self-service mechanism you have planned) Auth0 provided [Password Reset](#password-reset) functionality can be leveraged. This can be integrated with your (existing) implementation, and comes already incorporated with any out of box Auth0 UI widgets incorporated as part of [Universal Login](/universal-login).  

You’ll also want to make sure that you are working with a [verified user account](#account-verification) at all times, and Auth0 provides out-of-box mechanisms for doing that too. There is also regulatory compliance to be considered (GDPR for example - https://eugdpr.org/ - has some very specific requirements when it comes to protecting all EU citizens from privacy and data breaches) and [guidance concerning this](/compliance) is also provided.  

Though Auth0 doesn’t currently provide any form of centralized profile management portal out-of-the box for the purpose of self-serviced profile management, the Auth0 Management API can be leveraged to build your own (or utilize an already built) UI - and Auth0 [community guidance](https://community.auth0.com/t/how-to-allow-the-end-user-to-update-their-own-profile-information/6228) describes in further detail the Management API endpoint for doing this. N.B. calls to the Management API will require use of an [Access Token](/api/management/v2/tokens).

::: warning
Self-service profile management can raise security as well as data privacy concerns. For example you may want to allow a user to change their email address, however doing so without following best practice security guidance could result in a user locking themselves out of their account; leaking Personally Identifiable Information (PII); or worse, open up a potential breach in security.  
:::

Alternatively, the Auth0 Dashboard can be used to [manage aspects of a user’s profile](users/guides/manage-users-using-the-dashboard). Managing a user’s profile via the Auth0 Dashboard is more of an administrative provision, and **should not** be used for self-serviced profile management in a production environment. However, the interface provided by the Dashboard can be extremely useful during development as it provides a quick and simple way of manipulating a user’s profile information.

## Metadata

In addition to the Normalized User Profile information, [Metadata](/users/concepts/overview-user-metadata) can be stored in an Auth0 user profile. Metadata provides a way to store information that did not originate from an identity provider, or as a way to store information which overrides what an identity provider supplied. 

::: panel Best Practice
Use of Metadata should follow Auth0 [best practice guidance](/best-practices/user-data-storage-best-practices#metadata). Metadata storage is not designed to be a general purpose data store and you should still use your own external storage facility when possible. Metadata size and complexity should also be kept to a minimum, and the Auth0 Management API has a strict set of guidance when it comes to updating and/or deleting metadata associated with a user.
:::

Metadata can be manipulated via both the Auth0 Management API and the Auth0 Authentication API, and the [documentation provided](/users/guides/manage-user-metadata) describes further the endpoints for doing this. As is the case when managing the Normalized User Profile, calls to the Management API for manipulating Metadata will require use of an [Access Token](api/management/v2/tokens).

::: warning
<%= include('../../_includes/_rate-limit-policy.md') %>
:::

### User metadata

User metadata (also referred to as `user_metadata`) is information that can be stored against a user profile and that a user can read and update as part of any self-service profile management. Metadata of this nature may be something like salutation for a user, or a user’s preferred language (which could be used to [customize the emails](/email/templates#common-variables) sent by Auth0).

::: panel Best Practice
Any information that will be used to customize Auth0 emails, such as information used to determine the language for an email, should be stored in metadata and preferably `user_metadata` if the user is allowed to change it.   
:::

### App metadata

App metadata (also referred to as `app_metadata`) is, on the other hand, information that can be stored with a user profile but can **only be read or updated with appropriate authorization**; `app_medata` is not directly accessible to a user. This type of metadata might be something like a flag to indicate the last set of valid terms and conditions was accepted by the user, and a date to indicate when the user accepted them.

## Password reset

For users who forget their passwords, or who are allowed to change their password via some existing self serviced mechanism, Auth0 provides [Password Reset](/connections/database/password-change) functionality. This can be integrated with your (existing) implementation and comes already incorporated with out-of-the-box Auth0 UI widgets incorporated as past as [Universal Login](/universal-login). 

::: warning
Password change and password reset is only supported for Auth0 [Database Connection](/connections/database) types. 
:::

Auth0 Universal Login widgets provide built in UX support for password reset using Auth0 Authentication API functionality. Alternatively, you can use the [Auth0 Authentication API](/connections/database/password-change#use-the-authentication-api), through one of the Auth0 SDKs appropriate to your development environment, if you are using Universal Login [advanced customization](/universal-login#advanced-customization). Email templates used during password reset workflow can also be fully customized whether you use Auth0 out of box UI widgets or customized Universal Login.  

The Auth0 Management API, on the other hand, can be used to [directly change the password](/connections/database/password-change#directly-set-the-new-password) for a user identity defined using a Database Connection type. The Auth0 Management API can be used as part of any self-service profile management implementation, and is also used as part of any [Change Password page customization](/architecture-scenarios/implementation/b2c/b2c-branding#change-password-page-customization). 

## Account verification

You’ll also want to make sure that you are working with a verified user account at all times, and make use of the mechanisms Auth0 provides. You should also consider regulatory compliance like [GDPR](https://eugdpr.org/) which has some very specific requirements when it comes to protecting all EU citizens from privacy and data breaches and guidance.  

Auth0 provides out of box functionality for sending a [verification email](/email/custom#verification-email) to a user's email address as one way of verifying their account. By default, Auth0 is configured to automatically send verification emails for any database connections user identity created (e.g as part of [self sign up](/architecture-scenarios/implementation/b2c/b2c-provisioning#self-sign-up)). However, Auth0 also provides a [Management API endpoint](/api/v2#!/Tickets/post_email_verification) which can also be used to send verification emails (e.g. in cases where email addresses validation is not performed by a Social Provider upon user registration). 

## Blocking users 

[Blocking user access](/users/guides/block-and-unblock-users) in Auth0 provides a way to prevent user login to applications under certain conditions. By default, the Auth0 Dashboard provides an out-of-the-box mechanism to give administrators the ability to both block and unblock user access to all applications, and you can implement this functionality via use of the [Auth0 Management API](/api/management/v2#!/Users/patch_users_by_id). Auth0 extensibility can also be used to [disable user access to certain applications](/users/guides/manage-user-access-to-applications) as well as providing more fine grained [access control](/architecture-scenarios/implementation/b2c/b2c-authorization).

In addition, the Auth0 Management API also provides you with the ability to [unblock](/api/management/v2#!/User_Blocks/delete_user_blocks_by_id) users disabled due to excessive use of incorrect credentials.  

## Linking user accounts 

By default there is one [user profile](https://auth0.com/docs/users/concepts/overview-user-profile) - one user account -  for each user identity. If you enable login from multiple identity providers - via, say, a Facebook and/or Google Social Connection as well as an Auth0 Database Connection - then each will have a separate user profile. Auth0’s functionality for [linking user accounts](https://auth0.com/docs/link-accounts) (a.k.a account linking) can be utilised to create one profile for a user, as an aggregate of all the identities associated with him or her. 

The process of linking accounts essentially merges user profiles in pairs - a primary account and a secondary account must be specified in the linking process. The number of accounts that can be linked however extends beyond a single pair. For example, an account which already has multiple accounts merged with it can be used as the primary and an additional secondary account can be linked to it. This means that one user account can have multiple identities associated with it, which additionally provides a number of advantages: 

* Allows users to log in using multiple identities without creating a separate profile for each
* Allows registered users to use new login identities but continue using their existing profile
* Allows users to carry their profile arround, irrespective of which identity they use for login
* Allows users to link to an account with more identity information in order to provide a more complete profile
* Allows your apps to retrieve connection specific user profile data

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)
