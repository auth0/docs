---
title: Branding
description: Understand how you can configure Auth0 items to reflect your brand and desired user experience
toc: true
topics:
    - b2b
    - b2biam
    - branding
    - universal-login
    - login-pages
    - password-reset-pages
    - custom-domains
    - error-pages
contentType: concept
useCase:
    - user-logout
---
# Branding

<%= include('../../_includes/_branding/_introduction.md', { platform: 'b2b' }) %>

## Universal login and login pages

<%= include('../../_includes/_branding/_universal-login.md', { platform: 'b2b' }) %>

## Branding login by organization

Whether or not you need to do special customization on the Universal Login page is determined by how you plan to manage your customers’ organizations.  Before reading through this section, make sure you have read through the Universal Login sections.

If your organization users will all be isolated from each other, than it’s important to make it clear on the Universal Login page which organization the login page is for.  This can be done in a couple of ways:

* Create JavaScript on the Universal Login Page that can pull resources from a CDN based on the organization presented to it.

* Create a separate tenant for the organization and use the Universal Login page to customize as desired for that organization.

## Custom domain naming

<%= include('../../_includes/_branding/_custom-domain-naming.md', { platform: 'b2b' }) %>

::: warning
If your organization users will all be isolated from each other and you **require** that those users are presented a login page at a custom domain, then your only option is to create a [separate tenant for each organization](/architecture-scenarios/b2b/b2b-architecture#tenant-provision-for-complex-organizations).
:::

## Email template customization

<%= include('../../_includes/_branding/_email-templates.md', { platform: 'b2b' }) %>

## Password reset page customization

<%= include('../../_includes/_branding/_password-reset.md', { platform: 'b2b' }) %>

If your organization users will all be isolated from each other, than it is important to make it clear on the Universal Login page which organization the change password page is for. This can be done in a couple of ways:

* Create JavaScript on the Change Password Page that can pull resources from a CDN based on the connection parameter presented to it which should tell you which organization the user is from.

* Create a separate tenant for the organization and use the Universal Login page to customize any way desired for that organization

## Error page customization

<%= include('../../_includes/_branding/_error-page.md', { platform: 'b2b' }) %>

## Guardian multi-factor page customization

<%= include('../../_includes/_branding/_guardian.md', { platform: 'b2b' }) %>

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2b/b2b-authentication)
* [Deployment Automation](/architecture-scenarios/implementation/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/implementation/b2b/b2b-logout)
* [Operations](/architecture-scenarios/implementation/b2b/b2b-operations)
