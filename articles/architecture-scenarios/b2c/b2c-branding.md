---
title: Branding
description: Understand how you can configure Auth0 items to reflect your brand and desired user experience
toc: true
topics:
    - b2c
    - ciam
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
* Can emails be customized so that they’re branded and based on user preferences?
* If I’m using your hosted pages, how will my users know they’re still on my domain?
* What should I do to provide for additional browser security, e.g. Extended Validation?
* Can I direct my users to our support organisation in case of errors, etc? And why would I want to? Can’t Auth0 take care of that for me? 

Auth0 provides tremendous flexibility when it comes to customizing and configuring Auth0 pages such as [Universal Login](/architecture-scenarios/b2c/b2c-branding#universal-login-and-login-pages) and [Change Password](/architecture-scenarios/b2c/b2c-branding#change-password-page-customization). So you can pretty much set up whatever UX look and feel you require. For many, the out-of-the-box experience - with perhaps a little alteration - is all that's required. However, for others the value of their brand and brand awareness requires more extensive customization. This flexibility extends to not only Auth0 pages, but via extensibility can also be applied to the [email templates](/architecture-scenarios/b2c/b2c-branding#email-template-customization). Auth0 [Custom Domain](/architecture-scenarios/b2c/b2c-branding#custom-domain-naming) functionality further enhances consumer awareness by providing users with the confidence and peace of mind when it comes to safety and security. 

While Auth0 provides for default information when it comes to error situations, out-of-the-box information can be somewhat cryptic as the context that can only be provided by you is missing. Auth0 [error page customization](/architecture-scenarios/b2c/b2c-branding#error-page-customization) guidance can however help mitigate that by allowing you to provide information of a more context-specific nature via your own support organization. 

<%= include('../_includes/_bp-dashboard-tenant-settings.md') %>

## Universal login and login pages

<%= include('../_includes/_branding-universal-login-intro.md') %>

::: panel Best Practice
If you choose to customize Universal Login page script then we strongly recommend that you make use of version control, and deploy to your Auth0 tenant via [deployment automation](/architecture-scenarios/b2c/b2c-deployment) or one of the [alternative strategies](/universal-login/version-control).
:::

<%= include('../_includes/_branding-login-widgets.md') %>

<%= include('../_includes/_warning-branding-maintenance.md') %>

## Change password page customization

<%= include('../_includes/_branding-change-password-page.md') %>

## Error page customization

<%= include('../_includes/_branding-error-pages.md') %>

<%= include('../_includes/_bp-branding-error-pages.md') %>

## Custom domain naming

<%= include('../_includes/_branding-custom-domain-naming.md') %>

## Email template customization

<%= include('../_includes/_branding-email-templates.md') %>

::: note
Before customizing email templates, please set up your [Email Provider](/architecture-scenarios/b2c/b2c-operations#email-provider-setup).
:::

<%= include('../_includes/_branding-email-templates2.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/b2c/b2c-authentication)
* [Deployment Automation](/architecture-scenarios/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/ib2c/b2c-authorization)
* [Logout](/architecture-scenarios/ib2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
