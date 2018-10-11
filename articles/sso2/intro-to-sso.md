# An Introduction to Single Sign On (SSO) with Auth0

In short, single sign on is the process where your user, after signing in to one site, no longer have to sign in to any of your affiliate sites (assuming that their sign in is still valid). For example, let's say that you own Example1.com and Example2.com. If a user signs in to Example1.com, they should be automatically signed in to Example2.com (as long as they haven't signed out themselves or been forced to log out).

## Sessions and Cookies

To store sign in (and other authentication-related) information and have it readily accessible by your application (or domain), you would use **sessions**, which is typically just a cookie.

Some of the information you might find as part of your users' sessions cookie include:

* Whether the user is authenticated (or not)
* Whether additional identifying factors (for multi-factor or step-up authentication) were requested and provided

However, browsers enforce what is called the *same origin policy* for security purposes, which essentially means that only the creator of the sessions cookie (and other locally stored data) can access it. That is, only Example1.com has access to the cookies it creates, not Example2.com.

Single sign on, therefore, is the solution to the problem of needing sessions-related information across multiple domains.

## Managing Your Sessions

When it comes to managing your sessions for users of your app, there are three different layers you'll need to consider.

| Session Layer/Type | Description | 
| - | - |
| **Application** | This is the session inside your application. Though you're using Auth0 for authentication, you'll need to track (within your application) of things like whether a user is logged in or not. |
| **Auth0** | Auth0 also keeps track of sessions via cookies. These cookies store user information so that when the user redirects to the Lock screen, they will not have to provide their credentials again. |
| **Identity Provider** | The final sessions layer is the Identity Provider (IdP), such as Facebook or Google. If you allow users to sign in with an IdP, and the user is already logged in with the IdP, they won't be prompted to sign in again. They'll simply be asked to allow the IdP to shared their information with Auth0 (and by extension, your app). |

## How Single Sign On Works

In short, the single sign on process is managed by what's called the **central server**, and the central server is trusted by all of the applications with which it works.

Any time a user logs into one of the SSO-enabled applications, the app checks with the central server to see if there is a valid session for that user (regardless of its origin). If there is, the user may proceed without providing their credentials again.

## How SSO Works in Auth0

With Auth0, SSO works by helping you streamline the login process for your users working with the apps you've built, as well as any third-party apps with which you're using.