---
title: Authorization
description: Understand user authorization and related planning considerations for your B2B implementation.
topics:
    - b2b
    - iam
    - user-authorization
contentType: concept
useCase:
  - user-authorization
---
# Authorization

<%= include('../_includes/_authorization-intro.md') %>

## ID Token claims 

<%= include('../_includes/_authorization-id-token-claims.md') %>

<%= include('../_includes/_bp-custom-claims.md') %>

If you are creating different instances of your application for your customer organizations, a common practice is to create a custom claim in your ID Token to represent the user's organization. For example, `context.idToken[http://yourdomain.com/claims/organization"] = "organization A"`.

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/b2b/b2b-profile-mgmt)
* [Logout](/architecture-scenarios/b2b/b2b-logout)
* [Operations](/architecture-scenarios/b2b/b2b-operations)
