# An Introduction to Single Sign On (SSO) with Auth0

With the number of passwords that end users have to remember on a day-to-day basis, single sign on (SSO) is a great option to implement. 

In short, single sign on is the process where your user, after signing in to one site, no longer have to sign in to any of your affiliate sites (assuming that their sign in is still valid). SSO helps minimize the number of times a user has to log in, as well as the number of websites with which they have to register.

For example, let's say that you own Example1.com and Example2.com. If a user signs in to Example1.com, they should be automatically signed in to Example2.com (as long as they haven't signed out themselves or been forced to log out).

## How single sign on works

In short, the single sign on process is managed by what's called the **central server**, and the central server is trusted by all of the applications with which it works.

Any time a user logs into one of the SSO-enabled applications, the app checks with the central server to see if there is a valid session for that user (regardless of its origin). If there is, the user may proceed without providing their credentials again.

## How SSO works in Auth0

With Auth0, SSO works by helping you streamline the login process for your users working with the apps you've built, as well as any third-party apps with which you're using.

Auth0 acts as the central server, and by adding [applications](/applications) to your Auth0 tenant, you have a streamlined SSO implementation that works for all of your apps, regardless of whether they are web apps or single page apps.

Your users can log into any of the applications associated with your Auth0 tenant and access any of the other associated applications without providing their credentials again.

### Auth0 sessions

Auth0 uses cookie-based sessions to manage all things sessions. Auth0 uses **stateful** cookies that are pointers to its MongoDB collections where session-related information is stored. You can assume that Auth0 tracks all transactions -- e.g., login, MFA (which has its own session cookie), providing consent for application access.

Auth0 creates a session every time it interacts with the end user (e.g., your web app redirects the end user to Auth0 to log in). The session itself contains what are called *states*, which are used to maintain context -- you'll want to know, for example, that the user has logged in, but not completed the multi-factor authentication challenge. In short, it tracks the prompts the user has seen.

If the transaction, such as the one for login, completes, Auth0 removes the state-related information.

## Sessions and cookies

To store sign in (and other authentication-related) information and have it readily accessible by your application (or domain), you'll need to implement your own session management scheme and store the related cookies in a way that's accessible to your app.

Some of the information you might find as part of your users' sessions cookie include:

* Whether the user is authenticated (or not)
* Whether additional identifying factors (for multi-factor or step-up authentication) were requested and provided

### Which type of cookies should you use?

There are two ways of using cookies to store your session-related information: stateless (self-contained) cookies or stateful cookies.

**Stateless cookies** (or self-contained cookies) are those that will store all session information. At minimum, this will include the user ID for authenticated users. To prevent tampering, you'll need to sign or encrypt the cookie itself.

**Stateful cookies** are those that act simply as a pointer to a database record. All of the session-related information is stored in the database record itself, and whenever your app needs to access this information, it will need to call your database.

### A note about same-origin policies

However, browsers enforce what is called the *same origin policy* for security purposes, which essentially means that only the creator of the sessions cookie (and other locally stored data) can access it. That is, only Example1.com has access to the cookies it creates, not Example2.com.

Single sign on, therefore, is the solution to the problem of needing sessions-related information across multiple domains.

## Managing your sessions

We mentioned session management in a previous session, so let's take a step back and look at the big picture.

When it comes to managing your sessions for users of your app, there are three different layers you'll need to consider.

| Session Layer/Type | Description | 
| - | - |
| **Application** | This is the session inside your application. Though you're using Auth0 for authentication, you'll need to track (within your application) of things like whether a user is logged in or not. |
| **Auth0** | Auth0 keeps track of sessions via cookies. These cookies store user information so that when the user redirects to the Lock screen (or Auth0 in general), they will not have to provide their credentials again. |
| **Identity Provider** | The final sessions layer is the Identity Provider (IdP), such as Facebook or Google. If you allow users to sign in with an IdP, and the user is already logged in with the IdP, they won't be prompted to sign in again. They'll simply be asked to allow the IdP to shared their information with Auth0 (and by extension, your app). |

When you develop your application, you're responsible for implementing tracking of the **Application** sessions using cookies.