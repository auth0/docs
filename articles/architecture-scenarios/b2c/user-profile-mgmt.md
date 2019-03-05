---
title: User Profile Management
description: Understand user profile management planning considerations for your B2C implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-profiles
contentType: concept
useCase:
  - user-profiles
---
# User Profile Management

At some point you’ll need to manage changes to the information stored in a user’s profile stored in user data store. Changes to user profile information contain come in many forms: 

* Self-served information updates
* Mandatory updates concerning your organisation's Ts and Cs
* Changes due to regulatory compliance
* Password resets
* Metadata changes
* Account verifications
* Blocking users

::: warning
A user profile cannot be directly accessed across multiple Auth0 tenants, so if you’re deploying multiple Auth0 tenants to production then this is something you need to be aware of. See [Architecture](/architecture-scenarios/b2c/tenant-architecture) for further details.
:::

A user’s profile is populated from data supplied by an identity provider during login (see here for further details) and this is referred to as the Normalized User Profile (described here). By default there is one user profile created for each user identity. There are are a number of things to consider when looking at user profile management:


## Prerequisites

* [Architecture](/architecture-scenarios/b2c/tenant-architecture)
* [User Provisioning](/architecture-scenarios/b2c/user-provisioning)
* User Authentication
* User Authorization

## Design considerations

## Metadata

### User metadata

### App metadata

## Password reset

## Account verification

## Blocked users

## Best practices

* Any information that will be used to customise Auth0 emails, such as information used to determine the language for an email, should be stored in metadata: and preferably `user_metadata` if the user is allowed to change it. 

## Checklist

| Step Number | Description | Details | Comments |
| - | - | - | - |
| 1. |  |  | |
| 2. | |  |  |
| 3. |  |  |  |

## Next steps

* Customization