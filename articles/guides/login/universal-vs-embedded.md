---
title: Universal vs Embedded Login
description: Read about the differences between Universal and Embedded login
toc: true
topics:
  - universal-login
  - embedded-login
  - migrations
contentType:
  - concept
useCase:
  - strategize
  - development
---
# Universal vs Embedded Login

When you design the authentication experience for your application, you have to choose whether the login flow will use **universal** or **embedded** login.

With Universal Login, when the users try to log in they are redirected to a central domain, through which authentication is performed, and then they are redirected back to the app. An example is G Suite. No matter which service you are trying to access (gmail, google calendar, google docs, etc) if you are not logged in you are redirected to `https://accounts.google.com` and once you successfully log in you are redirected back to the calling app.

![Google Universal Login](/media/articles/guides/login/google-login.jpg)

On the other hand, an embedded login flow does not redirect the user somewhere central. The login widget is served from the same page without redirecting the user to another domain. The credentials are then sent to the authentication provider for authentication. In a web app this is a **cross-origin** request.

<img src="/media/articles/guides/login/centralized-embedded-flow.svg" alt="Universal vs Embedded login flow" data-zoomable>

In this article, we will evaluate the pros and cons of these two options and see how you can use Auth0 to implement them.

## Pros and cons

- <dfn data-key="single-sign-on">**Single Sign-on (SSO)**</dfn>: If you are working with mobile apps you cannot have SSO unless you use Universal Login. With web apps you can, although the most secure way is to use a central service so the cookies are from the same origin. With embedded login, you'd have to collect the user credentials in an application served from one origin and then send them to another origin, which can present certain security vulnerabilities, including the possibility of a phishing attack (see [Embedded Login with Auth0 > Security risks](#security-risks) for more info). There are workarounds you could use, like third-party cookies, but the most secure option for SSO, and logins in general, is using a central service.

- **Consistency and Maintenance**: With embedded login, if you have more than one app, you will have to implement more than one login page. You will also have to maintain and manage these pages. Besides the extra effort it can also introduce inconsistencies which results in bad UX. Furthermore, with embedded login you would have to manage the dangers of cross-origin attack vectors. On the other hand, if you are using Universal Login, then your Authorization Server (the domain that logs the users in) owns all the login pages which makes the management easier and the pages more consistent and secure. You could also use a single login page among your apps, a process that creates an impression that users are logging into a centralized system, rather than an individual app. In the following diagram you can see an example of how the universal and embedded logins look. The reason why the Universal Login offers a more consistent and thus superior use experience is evident.

![Universal vs Embedded login UX](/media/articles/guides/login/centralized-embedded-ux.jpg)

- **Central Features Management**: When you use Universal Login with Auth0, you can turn on and off features across all your apps, using the Dashboard. An example is [Multi-factor Authentication](/multifactor-authentication) which you can enable using the toggles located at the [Dashboard > Multi-factor Auth](${manage_url}/#/mfa) page. These changes will be automatically available to all your registered apps.

- **User Experience**: In the past, an argument could be made that the user experience with embedded login was better because it did not require redirecting users to another subdomain. However, users are getting increasingly familiar with the process of being redirected to another subdomain to log in. As a result, they don't find the process disruptive to their experience. Think about this, when you try to access your Gmail, if you are not logged in, you get redirected to the Google Accounts subdomain in order to log in. Do you get frustrated with that? You probably don't even notice it.

- **Mobile Apps & Security**: According to the [Best Current Practice for OAuth 2.0 for Native Apps Request For Comments](https://www.rfc-editor.org/rfc/rfc8252.txt), only external user agents (such as the browser) should be used by native applications for authentication flows. Using the browser to make native app authorization requests results in better security and it gives users the confidence that they are entering credentials in the right domain. It also enables use of the user's current authentication state, making <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> possible. Embedded user agents are deemed unsafe for third parties and should not be implemented (see [Embedded Login with Auth0 > Security risks](#security-risks) for more info). With native login a malicious app could try and phish users for username/password or tokens. Also, if your mobile apps use native login, then your users have to enter their credentials for each of your apps, hence SSO is not possible.

## Universal Login with Auth0

For most situations, we recommend using a Universal Login strategy, where Auth0 will show a [login page](/hosted-pages/login) if authentication is required. You can customize your login page using the [Dashboard](${manage_url}/#/login_page).

You can use **Auth0's Custom Domains** in order to persist the same domain across the login page and the app. This way the redirect to the login page will be transparent to your users since the domain will not change. For more details, see [Custom Domains](/custom-domains).

Whenever your app triggers an authentication request, the user will be redirected to the login page in order to authenticate. This will create a cookie. In future authentication requests, Auth0 will check for this cookie, and if it is present the user will not be redirected to the login page. They will see the page only when they need to actually log in. This is the easiest way to implement SSO.

Note that if the incoming authentication request uses an external identity provider (for example, Facebook), the login page will not be displayed. Instead, Auth0 will direct the user to the identity provider's login page.

::: note
You can deploy your custom login page from an external repository, like [GitHub](/extensions/github-deploy#deploy-hosted-pages), [Bitbucket](/extensions/bitbucket-deploy#deploy-hosted-pages), [GitLab](/extensions/gitlab-deploy#deploy-hosted-pages), or [Visual Studio Team Services](/extensions/visual-studio-team-services-deploy#deployment).
:::

Our recommendation is to use Universal Login when you use Auth0. The first and foremost reason is security. Using Auth0 Universal Login instead of embedding login in your application provides seamless CSRF protection. This helps prevent third-party impersonation or the hijacking of sessions.

## Embedded login with Auth0

Embedded logins in web apps with Auth0 use [Cross-Origin Authentication](/cross-origin-authentication). This uses [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies) to allow for secure authentication transactions across different origins. This does not apply to native applications since they use the standard OAuth 2.0 token endpoint.

::: note
Cross-origin authentication is not recommended and is only necessary when authenticating against a directory using a username and password. Social IdPs and enterprise federation use a different mechanism, redirecting via standard protocols like <dfn data-key="openid">OpenID Connect (OIDC)</dfn> and <dfn data-key="security-assertion-markup-language">SAML</dfn>. Additionally, cross-origin authentication is only applicable to embedded login on the web (using Lock or auth0.js). Native applications using embedded login make use of the standard OAuth 2.0 token endpoint.
:::

In addition, if you have not enabled [custom domains](/custom-domains), the end user must have a browser that supports third-party cookies. Otherwise, in some browsers, cross-origin authentication will fail. For more information, see  [Cross-Origin Authentication](/cross-origin-authentication#limitations). This limitation applies to both traditional username/password database connections as well as to <dfn data-key="passwordless">passwordless</dfn> database connections.


### Security risks

Universal Login is more secure than embedded login. Authentication takes place over the same domain, eliminating cross-origin requests. Cross-origin authentication is inherently more dangerous. Collecting user credentials in an application served from one origin and then sending them to another origin can present certain security vulnerabilities. [Phishing attacks](https://auth0.com/blog/all-you-need-to-know-about-the-google-docs-phishing-attack/) are more likely, as are [man-in-the-middle attacks](/security/common-threats#man-in-the-middle-mitm-attacks). Universal Login does not send information between origins, thereby negating cross-origin concerns.

Embedded user agents are unsafe for third parties, including the authorization server itself. If an embedded login is used, the app has access to both the authorization grant and the user's authentication credentials. As a consequence, this data is left vulnerable to recording or malicious use. Even if the app is trusted, allowing it to access the authorization grant as well as the user's **full credentials** is unnecessary. This violates the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) and increases the potential for attack.

:::note
As a matter of fact, Google no longer supports an embedded approach when implementing OAuth. For more information on this, refer to [Google Blocks OAuth Requests Made via embedded browsers](https://auth0.com/blog/google-blocks-oauth-requests-from-embedded-browsers/). 
:::

Furthermore, according to the [Internet Engineering Task Force (IETF)](https://www.ietf.org/), authorization requests from native apps should only be made through external user agents, primarily the user's browser. Using the browser to make native app authorization requests results in better security. When embedded agents are used, the app has access to the OAuth authorization grant as well as the user's credentials, leaving this data vulnerable to recording or malicious use. For more info refer to [OAuth 2.0 Best Practices for Native Apps](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/).

## Keep reading

:::next-steps
- [Migrating from Embedded to Universal Login](/guides/login/migration-embedded-universal)
- [Browser-Based vs. Native Login Flows on Mobile Devices](/design/browser-based-vs-native-experience-on-mobile)
- [Authentication Provider Best Practices: Universal Login](https://auth0.com/blog/authentication-provider-best-practices-centralized-login/)
- [OAuth 2.0 Best Practices for Native Apps](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)
- [Modernizing OAuth interactions in Native Apps for Better Usability and Security](https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html)
:::
