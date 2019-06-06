---
title: Provisioning
description: Understand user provisioning functionality and considerations for your B2B implementation. 
toc: true
topics:
    - b2b
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

<%= include('../_includes/_provisioning-intro.md') %>

<%= include('../_includes/_bp-universal-login.md') %>

<%= include('../_includes/_provisioning-design-considerations.md') %>

* Does a user get added to my company's domain or do they belong to or remain in their organization's domain?
* If the user stays in their own domain, do they belong to a single organization or can they belong to multiple organizations?
* Can you use Auth0 as an identity store?
* Can you use my own (legacy) identity store with Auth0?
* Can you migrate user identities from my identity store to Auth0?
* Can your users sign up using their organization's identity provider?
* Can your users be invited or self register?

One of the first decisions to make when providing your service(s) to other businesses is identifying to which domain users belong. Based on the answer to that question, there are a couple of different approaches you can take to provision those users. See [Provisioning organization users](#provisioning-organization-users) for more information. 

<%= include('../_includes/_provisioning-design-considerations2.md') %>

## Provisioning organization users

An organization should map directly to one of your business customers/partners.  Each business/partner that you are working with has users who will be logging in. We call those end users *organization users*.  

There are two different approaches to how to store your organization users:

* **Isolated to the organization**: Every user *belongs* to exactly one organization.  It would not make sense for that user to be a part of more than one organization, and even if they were, it would make sense for them to have a separate “identity” for that other organization. See [Provisioning Users Isolated to the Organization](#provisioning-users-isolated-to-the-organization) for more information.  For example, a retail employee that works part time at two different stores has two different logins for each of those stores even if the stores both use the SaaS application.
  
* **Shared between organizations**: In a case like this, users either create credentials in your company, or they can access other organizations instances of your application using credentials from their own organization.  A simple way to look at this is that one user may be authorized to access more than one organization’s instance of the application.  A user would understand that they can use the same credentials to access both instances of an application. See [Provisioning Users Isolated to the Organization](#provisioning-users-isolated-to-the-organization) for more information. For example, some doctors contract with multiple clinics and may need to be able to sign into each separate clinic with their same credentials.

### Provisioning users isolated to the organization

When users are isolated to the organization, this can provide a nice clean barrier between organizations.  If there are never any users that need to access more than one organization, then this is an attractive approach. 

You need to provision those users at the IDP level.  Each of the organizations will have its own IDP for accomplishing this.  This IDP will come in one of three flavors:

* **Your Auth0 Tenant is the IDP**: A Database Connection in your main tenant dedicated to this organization.

* **Organizations bring their own IDP**: You setup an Enterprise Connection for them.

* **Organizations with more than one IDP**: You setup a new Auth0 tenant just for them and add as many IDPs (which may include a database in Auth0) as they need to that tenant, along with their own custom domain and branding.

Using Auth0 as an IDP is the recommended starting point as it’s simple to implement a user invite workflow: an administrator creates a user; a randomly generated password is created for that user, but never stored or shown to anyone; the user then receives a welcome email with a link to set their password. The only thing special about this compared to other invite flows is that the person who is creating the user will have to either select the organization ahead of time, or the system will force the organization to match that of the user doing the inviting (in situations where there is an organization administrator who belongs to that organization only). See [User Invite](#user-invite) for more information.

::: panel Best Practice
If you can keep a main Auth0 tenant with a one-to-one mapping between organization and connection, it will greatly simplify your login system, making it more maintainable and extendable for the future.
:::

### Provisioning users shared between organizations

When sharing users between organizations, you will need a way to authorize access. Since you won’t know where a user might belong when authenticating, we typically recommend storing your users in a single domain and then figuring out which organizations they can access through the use of user app metadata. Because of this, provisioning will often be done by starting with a User Invite workflow for the single database connection, and then app metadata will be used to authorize access. 

User app metadata allows information to be stored in a user’s profile that can impact a user's capabilities but which a user cannot change. Let’s say I’m a doctor and I belong to Clinic A and Clinic B. I might have an organizations object in my app metadata that looks like: `{ “organizations”: [“clinicA”,”clinicB”] }`, and then when attempting to log into the app for Clinic B, a rule can check that Clinic B is in the `organizations` array.

::: panel Best Practice
Since users are shared, you won’t be able to determine who has access by isolating them to their own connection, therefore you will need to use their app metadata to make the determination. When provisioning you will need a way to set the organizations they have access to or add a new organization to an already existing user.
:::

### Deprovisioming limitations

<%= include('../_includes/_provisioning-deprovisioning.md') %>

## User invite

In most B2B scenarios, only particular individuals are allowed access to the application. As a result, it is often simpler to have an administrator provision user accounts instead of having users signup and then have an administrator approve them. This provisioning can often be done in an automated fashion when users are added to a centralized system as well.

There are three different personas who might be [inviting users](/docs/design/creating-invite-only-applications):

* An administrator at your company may create the users for each organization.

* An administrator from each organization may be assigned to createing users.

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

## User migration

<%= include('../_includes/_user-migration.md') %>

::: panel Best Practice
<%= include('../_includes/_rate-limit-policy.md') %>
:::

### Identity store proxy

<%= include('../_includes/_identity-store-proxy.md') %>

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2b/b2b-architecture)
* [Authentication](/architecture-scenarios/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/b2b/b2b-logout)
* [Operations](/architecture-scenarios/b2b/b2b-operations)
