---
description: Understand the differences between application, Auth0, and identity provider sessions and how logout works in the different sessions. 
toc: true
topics:
  - sessions
  - sso-session
  - auth0-session
  - idp-session
  - application-session
  - federated logout
contentType: concept
useCase:
  - sessions
  - session-logout
  - session-lifetime
  - using-cookies
---

# Session Layers

There are typically three session layers that can be created when your users log in: 

* **Application Session Layer**: This layer is the session inside your application. Though your application uses Auth0 to authenticate users, your application also tracks that the user has logged in to your application; in a regular web application, for example, you achieve this by storing this information inside a [cookie](/sessions/concepts/cookies). 

* **Auth0 Session Layer**: Auth0 also maintains a session on the Authorization Server for the user and stores their user information inside a cookie. This layer is used so that the next time a user is redirected to Auth0 for login the user's information will be remembered. This session layer makes the [Single Sign-On (SSO)](/sso) experience possible for [inbound SSO implementations](/sso/current/inbound).

* **Identity Provider Session Layer**: When users attempt to sign in using an identity providers such as Facebook or Google, and they already have a valid sign-in (with whichever provider they choose) they will not be prompted again to sign in though they may be asked to give permission to share their information with Auth0 and, in turn, your application. See [How to set up IdP-initiated SSO](/protocols/saml/idp-initiated-sso#how-to-set-up-idp-initiated-sso) for more information. 

## Session logout

<div class="video-wrapper" data-video="7l22iltru6"></div>

Logout in the context of Auth0 implementations is the act of terminating an authenticated session. It is a security best practice to terminate sessions when they’re no longer needed to avoid a potential takeover by unauthorized parties. 

Auth0 provides tools to help you give users the ability to log out; this includes options for providing different levels of logout and also determining where the user will land after the logout is complete.

* **Application Session Layer Logout**: Logging users out of your applications typically results in their application session being cleared, and this should be handled by your application: for the Application Session Layer, there is nothing within your Auth0 tenant that you need to use to facilitate session termination. This will require you to utilize whatever application session stack you are using to clear out any session related information. Note that some of the Auth0 SDKs do provide some support for application sessions; please check the documentation to see if there is any local SDK session removal that needs to be done.

* **Auth0 Session Layer Logout**: You can log users out of the Auth0 session layer by redirecting them to the Auth0 logout endpoint so Auth0 can clear the <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> cookie.

* **Identity Provider Session Layer Logout**: It is not necessary to log the users out of this session layer, but you can use Auth0 to force the logout if required. 

### Redirect URLs

Logging out of your Auth0 Session Layer will require you to redirect the user to `https://<YOUR_CNAME` or `YOUR_TENANT.auth0.com>/v2/logout` - typically performed via use of the appropriate method in the Auth0 SDK for your technology stack. This will clear your Auth0 session. You will also want to add a query parameter for that request called `returnTo` - this parameter should contain a URL that has been pre-registered and protects you against open redirect attacks. For more information, see [Authentication API: Logout](/api/authentication?javascript#logout).

Auth0 only redirects to whitelisted URLs after logout and there are two places you can configure these. The first place you can set this is at your Auth0 tenant level where you can put the set of logout URLs that are shared between all applications. The second place is in the application settings: if you need different redirects for each application, you can whitelist the URLs in your application settings. This allows you to set logout URLs in an application-specific context. 

### Session lifetime and session timout

You can also set the behavior in cases where a user doesn’t explicitly logout of your application. Auth0 provides for [session lifetime limits](/sessions/concepts/session-lifetime) to deal with Auth0 session termination in this scenario. 

### Federated logout

Alternatively you may desire to also [log the users out of the Identity Provider Session Layer](/logout/guides/logout-idps). While this is not recommended, for many providers, Auth0 will give you this behavior by simply having you add the `federated` query parameter to the redirect to `/v2/logout`. This will then additionally redirect the user to their identity provider and log them out there as well.  

## Keep reading

* [Auth0 Privacy & Cookie Policy](https://auth0.com/privacy)
* [sameSite Cookie Attributes](/sessions/concepts/cookie-attributes)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
* [Example: Short-lived session management workflow](/sessions/references/example-short-lived-session-mgmt)
* [Auth0 Ruby on Rails SDK Quickstarts: Session Handling](/quickstart/webapp/rails/02-session-handling)
* [Auth0 Android SDK Quickstarts: Session Handling](/quickstart/native/android/03-session-handling)
