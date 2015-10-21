---
name: Setup Username and Password authentication
description: "In this video you'll leran how you can configure a Username and Password authentication with users stored in Auth0's database"
timeInSeconds: 154
videoId: n4rcb97mkd
---
In this screencast we’ll look at how to setup User and password based connections in Auth0.
There's 2 general ways of storing users and passwords:
Either using Auth0’s database servers or connecting to your own database on your servers.
Using Auth0’s servers is prefered because it is the most secure option and is the simplest to use.
The option to connect to your own servers is available primarily to support migration from your servers to Auth0 and to support legacy systems.  We’ll cover this topic is a future screencast.
When you first create an account in Auth0 a default database connection is setup for you.

## Checking out the default connection
You can see the default connection by clicking ‘Connections’ and ‘Database’ in the navigation menu. You can create a new database connection by clicking the ‘New Database Connection’ button, but for now we’ll just click on the ‘Username-Password-Authentication’ link, which will allow us to review the default configuration and make changes if desired.

## Simple settings & Configurations

There are just a few simple configuration options which will go over briefly:
If you’d like to store a username in addition to an email address you can enable the ‘Requires Username’ option.
Enabling the ‘Import Users to Auth0’ option would be used when you have an existing set of users that you wish to migrate over to Auth0.  The way this works is you’d setup a connection to your database through Auth0 and then as users login a simple script would verify the user and password in your existing database and then save the user and password in Auth0’s database.  After all your users have logged in once with Auth0, you’ve effectively migrated your users.
The ‘Disable Sign Ups’ option prevents users from signing up on their own. In this scenario, you’d need to either manually create the users from the Auth0 dashboard or create the users by using the Auth0 api.
The ‘Improved brute force protection’ option limits the number of failed login attempts for a particular account from a particular IP address.
You can specify the minimum password strength required for your users by clicking on the ‘password strength’ link and adjusting the level as appropriate for your applications.  We’ll go ahead and change our password strength to ‘Good’ and save this setting.

## Trying the connection
Now we can go ahead and test this out by clicking the ‘Try Connection’ link, which will open a new browser window that displays the Auth0 Lock.
I’ll go ahead and click ‘Signup’ and create a new user account.  When I start typing the password,  Lock shows us the password requirements based on what we just setup for ‘password strength’.
After we click the ‘Signup’ button, we’ll get forwarded to a page that confirms we are able to setup the new user.  This page also shows us the users profile information that will be available to your application.
Stay tuned for the next screencast where we’ll write a small app that will use Social and database connections with Lock.
