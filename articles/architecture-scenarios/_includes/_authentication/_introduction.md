In order to provide services to your users, you must be able to identify who those users are. This process is called User  Authentication. There are a number of ways to perform authentication of a user - via social media accounts, username and password, <dfn data-key="passwordless">passwordless</dfn> - and it's often recommended that you go beyond a first factor for authenticating the user by enabling multi-factor authentication (MFA).

::: panel Best Practice
It's important to consider both security and user experience when designing how you will authenticate your users. Providing for multiple primary factors, and/or enforcing more than one factor during authentication, are ways that you can provide both.
:::

There are a number of things you will want to consider when looking at functionality and workflow:

* Where will users enter their credentials?
* How will you keep user credentials safe?
* How will you maintain your authentication system?
* How can you provide password authentication for your users?
* How can you prevent hackers from trying to log in as your users?
* How will you implement authentication in different kinds of applications?
* How can you make login easy for your users when they come from different language backgrounds?
* How will you provide a good user experience as you migrate away from any legacy authentication system?
* What should you consider when integrating applications with Auth0?
<% if (platform === "b2c") { %>
* Can users log in using their existing social (e.g., Facebook or Google) accounts?
<%  } %>
* Do you need to provide multi-factor authentication?
* What do you do if you have a service that doesn't have a way for the user to log in ahead of time?
* Can you pass the same user access token from one API to another?
<% if (platform === "b2b") { %>
* What do you do if you need to isolate users by organization?
* How will you handle identifying which organization users belong to?
* What’s the benefit of providing enterprise connections for your organizations?
<%  } %>

Auth0 [Universal Login](#universal-login) provides users with a safe and secure experience - no matter whether you choose to provide for user ID/password credentials sign in, or allow the so-called Bring Your Own Identity scenarios provided via [Social Login](https://auth0.com/learn/social-login/). There are also brand recognition benefits to centralizing the login experience with Universal Login, even if you feel you will also have product-specific [branding](/architecture-scenarios/implementation/${platform}/${platform}-branding) requirements. The Auth0 UI widgets typically used with Universal Login also provide out-of-the-box support with regards to [internationalization](/libraries/lock/v11/i18n) for users with different language requirements, and out-of-the-box support for Auth0 features such as [MFA](#multi-factor-authentication-mfa-) and [anomaly detection](#anomaly-detection) allow you to put barriers in place in order to prevent hackers attempting to access users' accounts. 

Allowing users to sign in via user ID/password credentials means that you're not reliant on the status of third-party identity providers for your users to access your system. You also have the means require the credentials used to align with your corporate policies. Auth0 assists with this by providing you with multiple options in support of user ID/password logins, and the [guidance provided](#username-and-password-authentication) will help you understand you can leverage these options. Adding [social](#social-authentication) support at some stage, as an additional primary authentication factor, gives you added flexibility and can help you better understand your users without the need to question them further by leveraging the information already stored by the various social login [providers](/connections/identity-providers-social).

If you have an existing legacy identity store, you’ll also want to see [User Migration](/architecture-scenarios/implementation/${platform}/${platform}-provisioning#user-migration). This section discusses the advantages of migrating to Auth0’s managed identity storage in terms of safety and security.

For customer facing applications, OpenID Connect ([OIDC](/protocols/oidc)) is the most frequently used industry standard protocol, and OIDC has first-class citizen support in Auth0. Auth0 provides support for various different approaches for integrating various different applications, so you'll want to see the section on [application integration](#application-integration) for the information you'll need to make an informed choice. 

When calling one API from another API, or from any situation where there is no authenticated user context - such as one or more cron jobs, report generators, or continuous integration/delivery systems - you will need a way to authorize the _application_ instead of a _user_. This is a one step process where the application is authenticated (using a client ID and secret) and then authorized in one call. You can learn more about this in our authorization workstream under [machine-to-machine (m2m) authorization](/architecture-scenarios/implementation/${platform}/${platform}-authorization#machine-to-machine-m2m-authorization).

<% if (platform === "b2b") { %>
Often companies need to segregate their users by organization and sometimes users can have access to more than one organization.  Knowing which of these scenarios is relevant to your company will help define how to determine in which connection a user exists: whether you need to do it, when you need to do it, and how to accomplish it.  See [Home Realm Discovery](#home-realm-discovery) to determine if this is something relevant to your company.
<%  } %>

::: panel Get Started with Auth0 Videos
Watch these two short videos [Authenticate: How It Works](/videos/get-started/04_01-authenticate-how-it-works) and [Authenticate: SPA Example](/videos/get-started/04_01-authenticate-spa-example) to learn about the differences between authentication, authorization, and access control. Understand when and why you might use each type of authentication method: first factors, second factors, and multi-factor. Learn about the OpenID Connect (OIDC) authentication protocol. See an example using the Auth0 Quickstart for a single-page application (SPA) implementation.
:::
