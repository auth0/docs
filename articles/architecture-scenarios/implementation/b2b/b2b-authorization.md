---
title: Authorization
description: User authorization and related planning considerations for your B2B IAM implementation.
toc: true
topics:
    - b2b
    - b2biam
    - user-authorization
contentType: concept
useCase:
  - user-authorization
---
# Authorization

<%= include('../../_includes/_authorization/_introduction.md', { platform: 'b2b' }) %>

## Application integration

<%= include('../../_includes/_authorization/_application-integration.md', { platform: 'b2b' }) %>

## API integration

<%= include('../../_includes/_authorization/_api-integration.md', { platform: 'b2b' }) %>

## Machine-to-Machine (M2M) authorization

<%= include('../../_includes/_authorization/_m2m.md', { platform: 'b2b' }) %>

## Organization Data in an Access Token

If you have a separate API from your application in your system that supports your multi-organization application, it is important to restrict operations to only the organization that the token was generated for.  This requires that there is some sort of information in the access token to tell the API which organization the access token was issued for.  This can be done in a couple of different ways depending on the answers to a couple of simple questions:

1. Will the End Users in this organization potentially have more than one organization, or is each End User isolated to a specific organization?
2. Will you be allowing any Machine-to-Machine (M2M) access to your API?
3. If you are allowing Machine-to-Machine (M2M) access to your API, Will you have any developers who need a single client ID and secret to access multiple organizations (but not *all* organizations)?

If End Users are isolated to a single organization and you will either not be allowing M2M access to your API or you will have a separate client ID/secret for each organization that needs access, then the simplest approach is to just create a custom claim in the access token [using rules for the user based tokens](#access-token-claims) and [using the client credentials hook for M2M calls](#machine-to-machine-m2m-authorization).

If End Users have more than one organization they can belong to or you might give a single developer a client ID and secret for M2M calls to more than one organization, then you will be best served by creating a separate audience (a separate API instance in your Auth0 tenant) for each organization.  This gives you a few nice abilities:
1.  First, it allows you to pass the audience as a first-class parameter to Auth0 without having to create a custom parameter.  The benefit of this is that Auth0 will help enforce the existence of the audience, and it will pass it to your rules.  It will also ensure that an issued refresh token will only work for the specific audience it was originally issued to.
2.  It allows you to restrict client grants to only specific organizations out of the box.  The alternative is to create a more complicated client credentials hook to attempt to retrieve the restrictions from somewhere else and also require a much more complex and potentially troublesome way to tell the client credentials call which organization to issue the access token for.
3.  This also allows you to use the core RBAC feature with Auth0 and ensure that the End Users who have access to more than one organization can have a potentially different role for each organization.

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/implementation/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt)
* [Logout](/architecture-scenarios/implementation/b2b/b2b-logout)
* [Operations](/architecture-scenarios/implementation/b2b/b2b-operations)
