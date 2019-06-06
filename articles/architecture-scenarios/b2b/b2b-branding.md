---
title: Branding
description: Understand how you can configure Auth0 items to reflect your brand and desired user experience
toc: true
topics:
    - b2b
    - iam
    - branding
    - universal-login
    - login-pages
    - change-password-pages
    - custom-domains
    - error-pages
    - templates
    - logos
contentType: concept
useCase:
    - branding
---
# Branding

<%= include('../_includes/_branding-intro.md') %>

When considering the items you want to brand, as well as how best to brand them, there are a number of things you'll want to consider:

* Can I use my own branding with Auth0 hosted pages, such as Universal Login?
* What do I do if I need to localize Auth0 hosted pages, such as Universal Login?
* If I am sharing an Auth0 tenant across customer organizations, should I add organization specific branding to their login experience?
* Can emails be customized so that they’re branded and based on user preferences?
* If I’m using your hosted pages, how will my users know they’re still on my domain?
* What should I do to provide for additional browser security, e.g. Extended Validation?
* Can I direct my users to our support organisation in case of errors, etc? And why would I want to? Can’t Auth0 take care of that for me? 

Auth0 provides tremendous flexibility when it comes to customizing and configuring Auth0 pages such as [Universal Login](/architecture-scenarios/b2b/b2b-branding#universal-login-and-login-pages) and [Change Password](/architecture-scenarios/b2b/b2b-branding#change-password-page-customization). So you can pretty much set up whatever UX look and feel you require. For many, the out-of-the-box experience - with perhaps a little alteration - is all that's required. However, for others the value of their brand and brand awareness requires more extensive customization. This flexibility extends to not only Auth0 pages, but via extensibility can also be applied to the [email templates](/architecture-scenarios/b2b/b2b-branding#email-template-customization). Auth0 [Custom Domain](/architecture-scenarios/b2b/b2b-branding#custom-domain-naming) functionality further enhances consumer awareness by providing users with the confidence and peace of mind when it comes to safety and security. 

If you are sharing an Auth0 tenant across different customer organizations, providing organizations with their own domain of users, and are managing their credentials, you need to consider how the users will know which credentials they should use and trust that this is where they should enter them.  See [Branding Login by organization](#branding-login-by-organization) for more information.

While Auth0 provides for default information when it comes to error situations, out-of-the-box information can be somewhat cryptic as the context that can only be provided by you is missing. Auth0 [error page customization](/architecture-scenarios/b2b/b2b-branding#error-page-customization) guidance can however help mitigate that by allowing you to provide information of a more context-specific nature via your own support organization. 

<%= include('../_includes/_bp-dashboard-tenant-settings.md') %>

## Universal login and login pages

<%= include('../_includes/_branding-universal-login-intro.md') %>

::: panel Best Practice
If you choose to customize Universal Login page script then we strongly recommend that you make use of version control, and deploy to your Auth0 tenant via [deployment automation](/architecture-scenarios/b2b/b2b-deployment) or one of the [alternative strategies](/universal-login/version-control).
:::

<%= include('../_includes/_branding-login-widgets.md') %>

<%= include('../_includes/_warning-branding-maintenance.md') %>

## Branding Login by organization

Whether or not you need to do special customization on the Universal Login page is determined by how you plan to manage your customers’ organizations.  Before reading through this section, make sure you have read through the Multitenancy and Universal Login sections.

If your organization users will all be isolated from each other, than it’s important to make it clear on the Universal Login page which organization the login page is for.  This can be done in a couple of ways:

* Create JavaScript on the Universal Login Page that can pull resources from a CDN based on the organization presented to it.
* Create a separate tenant for the organization and use the Universal Login page to customize as desired for that organization.

## Change password page customization

<%= include('../_includes/_branding-change-password-page.md') %>

If your organization users will all be isolated from each other, than it is important to make it clear on the Universal Login page which organization the change password page is for. This can be done in a couple of ways:

* Create JavaScript on the Change Password Page that can pull resources from a CDN based on the connection parameter presented to it which should tell you which organization the user is from.
* Create a separate tenant for the organization and use the Universal Login page to customize any way desired for that organization

## Error page customization

<%= include('../_includes/_branding-error-pages.md') %>

<%= include('../_includes/_bp-branding-error-pages.md') %>

## Custom domain naming

<%= include('../_includes/_branding-custom-domain-naming.md') %>

::: warning
If your organization users will all be isolated from each other and you **require** that those users are presented a login page at a custom domain, then your only option is to create a separate Auth0 tenant for each organization.
:::

## Email template customization

<%= include('../_includes/_branding-email-templates.md') %>

::: note
Before customizing email templates, please set up your [Email Provider](/architecture-scenarios/b2b/b2b-operations#email-provider-setup).
:::

<%= include('../_includes/_branding-email-templates2.md') %>

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/b2b/b2b-authentication)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios//b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/b2b/b2b-logout)
* [Operations](/architecture-scenarios/b2b/b2b-operations)
