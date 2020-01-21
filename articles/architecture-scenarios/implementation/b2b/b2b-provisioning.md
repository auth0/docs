---
title: Provisioning
description: User provisioning functionality and considerations for your B2B IAM implementation.
toc: true
topics:
    - b2b
    - b2biam
    - user-migration
    - custom-db
    - universal-login
    - user-profiles
contentType: concept
useCase:
  - user-provisioning
  - store-user-data
---
# Provisioning

<%= include('../../_includes/_provisioning/_introduction.md', { platform: 'b2b' }) %>

## Provisioning organizations

<%= include('../../_includes/_provisioning/_organizations.md', { platform: 'b2b' }) %>

## User migration

<%= include('../../_includes/_provisioning/_user-migration.md', { platform: 'b2b' }) %>

## Provisioning organization users

An organization should map directly to one of your business customers/partners.  Each business/partner that you are working with has users who will be logging in. We call those end users *organization users*.
There are two different approaches to how to store your organization users:

* **Isolated to the organization**: Every user *belongs* to exactly one organization.  It would not make sense for that user to be a part of more than one organization, and even if they were, it would make sense for them to have a separate “identity” for that other organization. See [Provisioning Users Isolated to the Organization](#provisioning-users-isolated-to-the-organization) for more information.  For example, a retail employee that works part time at two different stores has two different logins for each of those stores even if the stores both use the SaaS application.
* **Shared between organizations**: In a case like this, users either create credentials in your company, or they can access other organizations instances of your application using credentials from their own organization.  A simple way to look at this is that one user may be authorized to access more than one organization’s instance of the application.  A user would understand that they can use the same credentials to access both instances of an application. See [Provisioning Users Isolated to the Organization](#provisioning-users-isolated-to-the-organization) for more information. For example, some doctors contract with multiple clinics and may need to be able to sign into each separate clinic with their same credentials.

### Provisioning users isolated to the organization

When users are isolated to the organization, this can provide a nice clean barrier between organizations.  If there are never any users that need to access more than one organization (or you would rather force them to create multiple accounts), then this is an attractive approach.

You need to provision those users at the IdP level.  Each of the organizations will have its own IdP for accomplishing this.  This IdP will come in one of three flavors:

* **Your Auth0 Tenant is the IdP**: A Database Connection in your main tenant dedicated to this organization.
* **Organizations bring their own IdP**: You set up an Enterprise Connection for them.
* **Organizations with more than one IdP**: This situation is a little more tricky, you have multiple options for approaching this situation, here they are in decending order of complexity:
    * You convince them to (or find that they already have) one master IdP that can route to their individual IdPs
    * You create separate Organizations (e.g. customerorg-department1 and customerorg-department2) in your applications
    * You setup a new Auth0 tenant just for them and add as many IdPs (which may include a database in Auth0) as they need to that tenant, along with their own custom domain and branding
    * You make your existing tenant and login page more complex to handle [Home Realm Discovery](/architecture-scenarios/b2b/b2b-authentication#home-real-discovery) just for organizations that have more than one IdP.

Using Auth0 as an IdP is the recommended starting point as it’s simple to implement a user invite workflow: an administrator creates a user; a randomly generated password is created for that user, but never stored or shown to anyone; the user then receives a welcome email with a link to set their password. The only thing special about this compared to other invite flows is that the person who is creating the user will have to either select the organization ahead of time, or the system will force the organization to match that of the user doing the inviting (in situations where there is an organization administrator who belongs to that organization only). See [User invite](#user-invite) for more information.

::: panel Best Practice
If you can keep a main Auth0 tenant with a one-to-one mapping between organization and connection, it will greatly simplify your login system, making it more maintainable and extendable for the future.  See [Multiple Organization Architecture documents: isolated users by organization](https://drive.google.com/a/auth0.com/file/d/1fzWWu7CUWaPpmaSO01gEhVYmkSXvV28l/view?usp=sharing) for a more in-depth view.
:::

### Provisioning users shared between organizations

When sharing users between organizations, you will need a way to authorize access. Since you won’t know where a user might belong when authenticating, we typically recommend storing your users in a single domain and then figuring out which organizations they can access through the use of user app metadata. Because of this, provisioning will often be done by starting with a User Invite workflow for the single database connection, and then app metadata will be used to authorize access.
User app metadata allows information to be stored in a user’s profile that can impact a user's capabilities but which a user cannot change. Let’s say I’m a doctor and I belong to Clinic A and Clinic B. I might have an organizations object in my app metadata that looks like: `{ “organizations”: [“clinicA”,”clinicB”] }`, and then when attempting to log into the app for Clinic B, a rule can check that Clinic B is in the `organizations` array.

::: panel Best Practice
Since users are shared, you won’t be able to determine who has access by isolating them to their own connection, therefore you will need to use their app metadata to make the determination. When provisioning you will need a way to set the organizations they have access to or add a new organization to an already existing user.
:::

### Deprovisioning limitations

<%= include('../../_includes/_provisioning/_deprovisioning.md', { platform: 'b2b' }) %>

## User invite

In most B2B scenarios, only particular individuals are allowed access to the application. As a result, it is often simpler to have an administrator provision user accounts instead of having users signup and then have an administrator approve them. This provisioning can often be done in an automated fashion when users are added to a centralized system as well.

There are three different personas who might be [inviting users](/design/creating-invite-only-applications):

* An administrator at your company may create the users for each organization.
* An administrator from each organization may be assigned to creating users.
* There may be another system responsible for creating users and that system may then create a user in Auth0.
Regardless of the audience, the technique can be similar, with the exception of the third option which would require the use of the management API and could not be done using the Delegated Administration Extension. The rest is a matter of using the right authorization model for the application.
User invite can be accomplished in a few ways:
* Using the [Delegated Administration Extension](/extensions/delegated-admin/v3)
* Updating a pre-existing user administration system that you’ve already created to use the [Management API](/api/management/v2)
* Creating a new application to do this using the Management API.

::: panel Best Practice
Whether you are using the Management API or the Delegated Administration Extension, it is important to create each user with a random temporary password and *not* store that password anywhere! Then, use the Management API to send an email to the user with a link to set their password. This ensures that the only person who knows the password is the user themselves.
:::

::: warning
One of the main principles of OIDC is that no one except the user themselves ever knows their password. If you are doing an invite flow, have your backend system randomly generate a password and then discard it and have your user reset their password before ever logging in.  Do not create a temporary password and give it to them to login the first time.
:::

## Enterprise sign up

Enterprise sign up is synonymous with sign in via [enterprise login](/architecture-scenarios/implementation/b2b/b2b-authentication#enterprise-login) - there’s no distinction here *per se*, as user [profile](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt) creation happens automatically upon first enterprise login.

::: panel best practice
A nice advantage of allowing your customers to use their own IdP is that they can administer their users and assign roles and access in their own IdP setup instead of forcing you to build administration for them.  Working out the mapping for those customers will make this much easier.
:::

::: warning
  If mapping isn't enough and you must put some metadata in your system, keep in mind that Auth0 will not create the user until they log into the system the first time.  Therefore you will need to use rule extensibility to pull the initial information from somewhere else, or force users to log in the first time before you can add the metadata.
:::

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

## Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'provisioning' }) %>

