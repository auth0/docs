---
title: Profile Management
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


## Metadata

Auth0 stores user profile [metadata](/users/concepts/overview-user-metadata) that contains information about users such as language preference or accessibility information. You can use metadata to store both information that a user can change and information they can’t. In the latter case, for example, you can associate a user profile with records in your existing systems without modifying the existing implementation. 

::: note
As is the case when managing the Normalized User Profile, calls to the Management API require use of an Access Token.
:::

::: panel Best Practice
Use of Metadata should follow Auth0 [best practice guidance](/best-practices/user-data-storage-best-practices#metadata). Metadata storage is not designed to be a general purpose data store and you should still use your own external storage facility when possible. Metadata size and complexity should also be kept to a minimum, and the Auth0 Management API has a strict set of guidance when it comes to updating and/or deleting metadata associated with a user.
:::

At login, the identity provider updates information in the [Normalized User Profile](/users/normalized/auth0) and you can change a limited set of data through the Auth0 Management API. You can also use Auth0 Rules to override information in the Normalized User Profile. 

::: warning
A user profile cannot be directly accessed across multiple Auth0 tenants. See [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture) for details.
:::

Alternatively, the Auth0 Dashboard can be used to [manage aspects of a user’s profile](users/guides/manage-users-using-the-dashboard). Managing a user’s profile via the Auth0 Dashboard is more of an administrative provision, and **should not** be used for self-serviced profile management in a production environment. However, the interface provided by the Dashboard can be extremely useful during development as it provides a quick and simple way of manipulating a user’s profile information.

### User metadata

In addition to the Normalized User Profile information, [Metadata](users/concepts/overview-user-metadata) can be stored in a user’s profile. Metadata provides a way to store information that did not originate from an identity provider, or as a way to store information which overrides what an identity provider supplies. 

::: warning
Use of Metadata should follow Auth0 best practice guidance: Metadata storage is [not designed to be a general purpose data store](/best-practices/user-data-storage-best-practices#metadata) and you may still use your own external storage facility where applicable. Metadata size and complexity should also be kept to a minimum, and the Auth0 Management API has a [strict set of guidance](/api/management/v2#!/Users/patch_users_by_id) when it comes to updating and/or deleting metadata associated with a user.
:::

Metadata can be manipulated via both the Auth0 Management API and the Auth0 Authentication API, and the [documentation provided](/users/guides/manage-user-metadata) describes further the endpoints for doing this. As is the case when managing the Normalized User Profile, calls to the Management API for manipulating Metadata will require use of an [Access Token](api/management/v2/tokens).





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

## Blocking users 

[Blocking user access](/users/guides/block-and-unblock-users) in Auth0 provides a way to prevent user login to applications under certain conditions. By default, the Auth0 Dashboard provides an out-of-the-box mechanism to give administrators the ability to both block and unblock user access to all applications. You can implement this with the Management API. Alternatively, you can use Auth0 extensibility to disable user access to certain applications as well as providing more fine grained access control.

The Auth0 Management API also provides you with the ability to unblock users disabled due to excessive use of incorrect credentials.  

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
