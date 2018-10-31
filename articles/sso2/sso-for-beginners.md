# Single Sign On (SSO) 101

With the number of passwords that end users have to remember on a day-to-day basis, single sign on (SSO) is a great option to implement.

In short, single sign on is the process where you user logs in once and can then use everything to which they've been granted access. SSO helps minimize the number of times a user has to log in, as well as the number of websites with which they have to register.

For example, let's say that you own Example1.com and Example2.com. If a user signs in to Example1.com, they should be automatically signed in to Example2.com (as long as they haven't signed out themselves or been forced to log out).

## Auth0 and Single Sign On

Auth0 integrates with your application to help facilitate easy SSO setup. You write your code once, possibly leveraging one of our SDKs, and you can add as many identity systems as necessary.

Let's say that you want to allow your users to log in with their Facebook and Google credentials. There's also a subset of users who want to use their corporate credentials as well.

Rather than writing three sets of code for your application to handle this (or rolling your own identity solution to handle multiple forms of authentication), you can let Auth0 act as the service hub for these identity systems.

Furthermore, Auth0 simplifies the process of adding additional identity services in the future. Rather than adding to your app's code, you can configure the additional connections in Auth0 and let Auth0 handle the integration.