---
title: User Authorization
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
# User Authorization

Let's start by distinguishing between Authentication, Authorization, and Access Control.

* **Authentication**: Determines if the user is who they say they are.
* **Authorization**: Identifies what the user is allowed to do in the system.
* **Access Control**: Limits a user to only perform actions they are allowed to do based on a combination of who the user is, what they are allowed to do in the system, and their consent.

 [Authentication](/architecture-scenarios/b2c/authentication) and some or all of Authorization are managed by your Auth0 tenant (the Authorization Server). But because Access Control is almost always contextual, your API or Application itself must manage it.

To implement user authorization inside your Application (typically access control), you must decide what information your application will need to know to make access control decisions. Once you know this, you can add additional and custom claims to an OIDC [ID Token](/tokens/id-token) (by using Auth0’s [Rules extensibility](/architecture-scenarios/b2c/user-authorization#id-token-claims)) before passing the token to your Application. You can then access these claims from within your Application to use with access control.

::: warning
When deciding what data to include in OIDC tokens, you need to consider token size, especially if you are passing the token in the URL. Regardless of how you're passing the token, you'll also need to consider other [limitations](/tokens/id-token).
:::

## ID Token Claims 

During the login process, Auth0 allows you to easily [add custom claims to an ID Token](/architecture-scenarios/b2c/user-authorization#id-token-claims) based on a user’s metadata (by using Auth0’s Rules extensibility). Though the process of adding rules is streamlined, because the rules engine is flexible and allows you to write custom code, you can also do things that may have negative effects. So it’s important to follow our [rules best practices](/best-practices/rules).

::: panel Best practices
When adding custom claims, we recommended that you store any data you need to include within the claims in the user's `user` or `app` [Metadata](/users/concepts/overview-user-metadata). Doing so prevents you from needing to call out to an external API to fetch the data, which can negatively impact the performance and scalability of the login sequence. Remember to check out our metadata best practices(missing link) too.
:::
