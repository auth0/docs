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

When it comes to managing your sessions, there are three "layers" you'll need to consider.

| Session Layer/Type | Description | 
| - | - |
| **Application** | This is the session inside  |
| **Auth0** | Auth0  |
| **Identity Provider** |  |

When talking about managing sessions, there are typically three layers of sessions we need to consider:

Application Session: The first is the session inside the application. Even though your application uses Auth0 to authenticate users, you will still need to keep track of the fact that the user has logged in to your application. In a normal web application this is achieved by storing information inside a cookie.

Auth0 session: Next, Auth0 will also keep a session and store the user's information inside a cookie. Next time when a user is redirected to the Auth0 Lock screen, the user's information will be remembered.

Identity Provider session: The last layer is the Identity Provider, for example Facebook or Google. When you allow users to sign in with any of these providers, and they are already signed into the provider, they will not be prompted to sign in. They may simply be required to give permissions to share their information with Auth0 and in turn your application.

When developing a web application, you will therefore need to keep track of the fact that the user has logged in to your Web application. You can do this by making use of a cookie-based session to keep track of the fact that the user has signed in, and also store any of the user related information or tokens.

## How Single Sign On Works

In short, the single sign on process is managed by what's called the **central server**, and the central server is trusted by all of the applications with which it works.

Any time a user logs into one of the applications, the app checks with the central server to see if there is a valid session for that user (regardless of its origin). If there is, the user may proceed without providing their credentials again.

## How SSO Works in Auth0

With Auth0, SSO works by helping you streamline the login process for your users working with the apps you've built, as well as any third-party apps with which you're using.