In order to provide services to your users, you must be able to identify who those users are. This process is called User  Authentication. There are a number of ways to perform authentication of a user - via social media accounts, username & password, <dfn data-key="passwordless">passwordless</dfn> - and it's often recommended that you go beyond a first factor for authenticating the user by adding a second factor as well (a.k.a. Multi-factor Authentication).

::: panel Best Practice
It's important to consider both security and user experience when designing how you will authenticate your users. Providing for multiple primary factors, and/or enforcing more than one factor during authentication, are ways that you can provide both.
:::

It’s important to consider both security and user experience when designing how you will authenticate your users, and so there are a number of things you will want to consider when looking at functionality and workflow:

* Where users will enter their credentials
* How you will keep user credentials safe
* How you will maintain your authentication system
* How you will provide password authentication for your users
* How you will prevent hackers from trying to log in as your users
* How you want to implement authentication in different kinds of applications using Auth0
* What to do if you want to make login easy for your users when they come from different language backgrounds
* How you will provide a good user experience as you migrate away from any legacy authentication system
* What do you need to consider when integrating your applications with Auth0?
* Can users log in using their existing social (e.g., Facebook or Google) accounts?
* Will I need to provide for multi-factor authentication (MFA)?

Auth0 [Universal Login](#universal-login) provides users with a safe and secure experience - no matter whether you choose to provide for user ID/password credentials sign in, or allow the so-called Bring Your Own Identity scenarios provided via [Social Login](https://auth0.com/learn/social-login/). There are also brand recognition benefits to centralizing the login experience with Universal Login, even if you feel you will also have product-specific [branding](/architecture-scenarios/implementation/${platform}/${platform}-branding) requirements. The Auth0 UI widgets typically used with Universal Login also provide out-of-the-box support with regards to [internationalization](/libraries/lock/v11/i18n) for users with different language requirements, and out-of-the-box support for Auth0 features such as [MFA](#multi-factor-authentication-mfa-) and [anomaly detection](#anomaly-detection) allow you to put barriers in place in order to prevent hackers attempting to access users' accounts. 

Allowing users to sign in via user ID/password credentials means that you're not reliant on the status of third-party identity providers for your users to access your system. You also have the means require the credentials used to align with your corporate policies. Auth0 assists with this by providing you with multiple options in support of user ID/password logins, and the [guidance provided](#username-and-password-authentication) will help you understand you can leverage these options. Adding [social](#social-authentication) support at some stage, as an additional primary authentication factor, gives you added flexibility and can help you better understand your users without the need to question them further by leveraging the information already stored by the various social login [providers](https://auth0.com/docs/identityproviders#social).

If you have an existing legacy identity store, you’ll also want to see [User Migration](/architecture-scenarios/implementation/${platform}/${platform}-provisioning#user-migration). This section discusses the advantages of migrating to Auth0’s managed identity storage in terms of safety and security.

For customer-facing applications, <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn> is the most frequently used industry standard protocol, and OIDC has first-class citizen support in Auth0. Auth0 provides support for various different approaches for integrating various different applications, so you'll want to see the section on [application integration](#application-integration) for the information you'll need to make an informed choice. 

