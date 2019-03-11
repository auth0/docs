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

User information is stored in a [*user profile*](/users/concepts/overview-user-profile) and can come from a variety of sources such as [identity providers](/identityproviders), your own databases, and enterprise connections (Active Directory, SAML, etc.). You can *normalize* user data that comes from a variety of data sources. By default, Auth0 creates one user profile for each user identity.

Here are some examples of the things that will determine how you will manage user profile information:

* Where can I store information to help me customize a user’s experience?

* What if I need to store user information that didn’t originate from an identity provider?

* Why should I store user-related information that a user cannot modify?

* What happens if a user forgets or wants to change their password?

## Prerequisites

* [Architecture](/architecture-scenarios/b2c/tenant-architecture)
* [User Provisioning](/architecture-scenarios/b2c/user-provisioning)
* [Authentication](/architecture-scenarios/b2c/authentication)
* Authorization

## Design considerations

At some point after your implementation is complete, you’ll need to make changes to the user profile information stored in the user data store. Those changes can take many forms: 

* Self-served information updates
* Mandatory updates based on your organization's Ts and Cs
* Changes due to regulatory compliance
* Password resets
* Metadata changes
* Account verifications
* Blocking users 

Though Auth0 doesn’t currently provide any form of centralised profile management portal out-of-the box for self serviced profile management, the Auth0 Management API can be leveraged to build your own (or utilize an already built) UI; the documentation here describes in further detail the Management API endpoint for doing this. N.B. calls to the Management API will require use of an Access Token as described here.

::: warning
Self service profile management can raise security as well as data privacy concerns. For example you may want to allow a user to change their email address, however doing so without following best practice security guidance could result in a user locking themselves out of their account; leaking Personally Identifiable Information (PII); or worse, open up a potential breach in security!  
:::

Alternatively, the Auth0 Dashboard can be used to manage aspects of a user’s profile (see here for further details). Managing a user’s profile via the Auth0 Dashboard is more of an administrative provision, and should not be used for self serviced profile management in a production environment. However, the interface provided by the Dashboard can be extremely useful during development as it provides a quick and simple way of manipulating a user’s profile information. 

## Metadata

Auth0 stores user profile [metadata](/users/concepts/overview-user-metadata) that captures additional information about a user such as language preference or accessibility information. You can use metadata to store both information that a user can change and information they can’t. In the latter case, you can associate, for example, a user profile with records in your existing systems without modifying the existing implementation. 

::: note
As is the case when managing the Normalized User Profile, calls to the Management API  require use of an Access Token as described here.
:::

::: panel TL;DR
Use of Metadata should follow Auth0 best practice guidance; Metadata storage is not designed to be a general purpose data store (see here for further details) and you should still use your own external storage facility where applicable. Metadata size and complexity should also be kept to a minimum, and the Auth0 Management API has a strict set of guidance when it comes to updating and/or deleting metadata associated with a user. For further details see here.
:::

At login, the identity provider updates information in the [Normalized User Profile](/users/normalized/auth0) and you can change a limited set of data through the Auth0 Management API. You can also use Auth0 Rules to override information in the Normalized User Profile. 

::: warning
A user profile cannot be directly accessed across multiple Auth0 tenants. See [Architecture](/architecture-scenarios/b2c/tenant-architecture) for details.
:::

::: panel Best Practice
<%= include('../_includes/_rate-limit-policy.md') %>
:::

### User metadata

User metadata - otherwise referred to as user_metatdata - is information that can be stored against a user profile and that a user can read/update as part of any self-service profile management. Metadata of this nature may be something like salutation for a user, or perhaps a user’s preferred language - used to customize emails sent by Auth0 (see here).

::: panel Best Practice
Any information that will be used to customise Auth0 emails, such as information used to determine the language for an email, should be stored in Metadata: and preferably user_metadata if the user is allowed to change it.   
:::

### App metadata

App metadata on the other hand - otherwise referred to as app_metatdata - is additional information that can be stored against a user profile but which can only be read or updated with appropriate authorization; app_medata is not directly accessible to a user. Metadata of this nature might be something like a flag to indicate the last set of valid terms and conditions was accepted by the user, and a date to indicate when the user accepted them.

## Password reset

For users who forget their passwords, or who are allowed to change their password via some existing self service mechanism - or self service mechanism you have planned - Auth0’s provides [Password Reset](/docs/connections/database/password-change) functionality can be leveraged. This can be integrated with your (existing) implementation and comes already incorporated with out of box Auth0 UI widgets incorporated as past as Universal Login (here). 

::: warning
Password change and password reset is functionality that is only supported for Auth0 Database Connection types. 
:::

Out of box, Auth0 Universal Login widgets - such as Lock - provide built-in UX support for password reset (as described here) utilizing Auth0 Authentication API functionality (described here). Alternatively, you can utilize the Auth0 Authentication API - through one the Auth0 SDKs appropriate to your development environment - if you are using fully customized Universal Login (discussed here). Email templates used during password reset workflow can also be fully customized (as discussed here) whether you use Auth0 out of box UI widgets or customized Universal Login.  

The Auth0 Management API, on the other hand, can be used to directly change the password for a user identity defined using a Database Connection type (see here).  The Auth0 Management API can be used as part of any self service profile management implementation, and is also used as part of any Change Password page customization (as discussed here). 

::: panel Best Practice
<%= include('../_includes/_rate-limit-policy.md') %>
:::

## Account verification

You’ll also want to make sure that you are working with a verified user account at all times, and make use of the  mechanisms Auth0 provides for doing just that. There is also regulatory compliance to be considered like [GDPR](https://eugdpr.org/) has some very specific requirements when it comes to protecting all EU citizens from privacy and data breaches) and guidance concerning that can be found here.  

Auth0 provides out of box functionality for sending a [verification email](/docs/email/custom#verification-email) to a user's email address as one way of verifying their account. By default, Auth0 is configured to automatically send verification emails for any database connections user identity created (e.g as part of self sign up; discussed here). However, Auth0 also provides a Management API endpoint (described here) which can also be used to send verification emails in cases where email addresses validation is not performed by a Social Provider upon user registration. 

::: panel Best Practice
Any information that will be used to customise Auth0 emails, such as information used to determine the language for an email, should be stored in metadata: and preferably `user_metadata` if the user is allowed to change it. 
:::

## Blocking and unblocking users 

[Blocking user access](/docs/users/guides/block-and-unblock-users) in Auth0 provides a way of implementing mechanisms to prevent user login to applications under certain conditions. By default, the Auth0 Dashboard provides an out-of-box mechanism to give administrators the ability to both block and unblock a users access to all applications. This, in turn, utilizes Auth0 Management API functionality (described here). Alternatively, Auth0 extensibility can be used disable user access to certain applications (described here) as well as providing more fine grained access control as discussed here.

In addition, the Auth0 Management API also provides capabilities to build out facilities for unblocking users disabled due to excessive use of incorrect credentials (see here for further details).  

## Checklist

| Step Number | Description | Details | Comments |
| - | - | - | - |
| 1. | Metadata |  | |
| 2. | Password reset |  |  |
| 3. | Account verification |  |  |
| 4. | Blocking and unblocking users |  |  |

## Next steps

* [Branding](/architecture-scenarios/b2c/branding)