---
title: Branding
description: How to configure Auth0 items to reflect your brand and desired user experience.
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

Whether or not you need to do special customization on the Universal Login page is determined by how you plan to manage your customers’ organization.  Before reading through this section, make sure you have read through the [Universal Login section](#universal-login-and-login-pages) and know how you are approaching organizations by reviewing [Multiple Organization Architecture](https://drive.google.com/a/auth0.com/file/d/1y2G8RNHTBujcCrnMRhp6_phQiRAkZzfF/view?usp=sharing).

If your organization users will all be isolated from each other, than it’s important to make it clear on the Universal Login page which organization the login page is for.  This can be done in a couple of ways:

* Create JavaScript on the Universal Login Page that can pull resources from a CDN based on the organization presented to it.
* Create a separate tenant for the organization and use the Universal Login page to customize as desired for that organization.

## Custom domain naming

<%= include('../../_includes/_branding/_custom-domain-naming.md', { platform: 'b2b' }) %>

## Email template customization

<%= include('../../_includes/_branding/_email-templates.md', { platform: 'b2b' }) %>

## Password reset page customization

<%= include('../../_includes/_branding/_password-reset.md', { platform: 'b2b' }) %>

## Error page customization

<%= include('../../_includes/_branding/_error-page.md', { platform: 'b2b' }) %>

## Guardian multi-factor page customization

<%= include('../../_includes/_branding/_guardian.md', { platform: 'b2b' }) %>

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

# Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'branding' }) %>
