---
title: Authorization
description: Understand user authorization and related planning considerations for your B2C implementation.
toc: true
topics:
    - b2c
    - ciam
    - user-authorization
contentType: concept
useCase:
  - profile-management
---
# Authorization

It’s important to start by distinguishing between Authentication, Authorization, and Access Control. Your Auth0 tenant (the Authorization Server) is typically responsible for Authentication and some or all of Authorization. Access Control however must be the responsibility of the Application or API itself, because access control is almost always contextual: 

* **Authentication**: the process of determining if the user is who they say they are.
* **Authorization**: the proceess of determining what the user is allowed to do in the system.
* **Access Control**: the process of limiting a user to only the actions permitted, based on a combination of who the user is, what they are allowed to do in the system, and their consent.

For application level Authorization - typically referred to as Access Control - custom claims can be added to an OpenID Connect (OIDC) [ID Token](/tokens/id-token) via use of Auth0’s Rule [extensibility mechanism](#id-token-claims), and you will need to decide what that information might be in order for your application to make access control decisions.

::: warning
When deciding what data to include in OIDC tokens, you need to consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, there are other things that you will also need to consider - such as the potential of exposing sensitive PII (Personally Identifiable Information).
:::

## ID Token claims 

Through the use of Rule extensibility, Auth0 allows you to easily [add custom claims to an ID Token](/architecture-scenarios/implementation/b2c/b2c-authorization#id-token-claims) based on a user’s metadata. Though the process of adding custom claims via Rule is streamlined, because the rules engine is flexible and allows you to write custom code you can also do things that may have negative effects. So it’s important to follow our [rules best practice](/best-practices/rules) guidance anytime you utilize this extensibility feature.

::: panel Best Practice
When you are considering adding custom claims, we recommend that you choose to store any data you may need to include within the claims in the user's `user` or `app` [Metadata](/users/concepts/overview-user-metadata). Doing so prevents you from needing to call out to an external API to fetch the data, which can negatively impact the performance and scalability of the login sequence. Remember to check out our [metadata best practices](architecture-scenarios/implementation/b2c/b2c-profile-mgmt#metadata) too.
:::

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)
