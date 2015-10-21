---
name: Auth0 Intro video
description: "In this video, within 6 minutes you'll go from having no app, to having an application that has authentication working with Twitter, Github, Google and Username and Password using Auth0."
videoId: 27i80efy8c
---
In this video, we'll look at how quickly we can have authentication up and running with Auth0.
We’ll start by Creating an account, which is free for development and testing.

## Initial setup
After signing in for the first time, we’ll need to perform a few simple setup steps.
First choosing an Auth0 domain, which our applications will use for api calls, and then the Authentication Providers we wish to use.
The initial setup shows the most commonly used providers, we’ll look at a more comprehensive list in a few moments.
After saving our initial setup, we’re forwarded to the quick start page, of the Default Application, which is automatically created for us.

## Connections - Identity Providers

I’d like to point out a few things, before we begin configuring our application, in particular lets look at the the identity providers, or what we call connections, that are available to use.
Auth0 has many choices, which are grouped into 4 general categories:
* Database connections are used for standard username & password based authentication.
* Social connections include providers such as Google, Facebook, Twitter, Github and many more.
* Enterprise connections allow using the identity providers commonly used in big corporations, such as LDAP and Active Directory
* Passwordless connections allow your users to authenticate via SMS using twilio, just like WhatsApp does,  and using apple’s touch id.

For this video, we’ll use Github and Twitter, in addition to regular username based authentication for our app, but keep in mind, it’s always easy to add more options later.
We’ll need to provide Auth0 a Consumer Key & Secret, which are supplied by twitter.  You’ll find simple instructions on how to get your consumer key, by clicking the ‘How to obtain a Consumer Key?’ link.

## Create an app

Now were ready to create our first application, which you can do from the dashboard, by clicking the ‘New App/Api’ button, and then naming the new application.

Auth0 supports many different types of applications:

* Native applications - with SDK’s for the major platforms, such as IOS, Android & Windows
* Single Page Applications - using popular frameworks such as EmberJS and AngularJS.
* Traditional Web Applications - using all the major platforms
* Hybrid mobile apps such as Cordova and ionic

For our app, we’ll select ‘Single Page App’ using Angularjs,  and Node.js.

## The docs

The first thing you’ll notice after choosing your prefered application and platform, is a completely personalized seed projects, to helps bootstrap the startup process.

We can download and run the seed projects.

Or, if you already have an existing application, that you would like to start using Auth0 in, you can follow the simple, step by step instructions, that include personalized code snippets, that you can copy and paste into your existing project.

## Downloading & Running the seed
For now, lets download and run each of the seed projects:
* The Angular.js based seed project
* The node.js based seed project.

There is one final thing, that we'll need to set up for our new app: the ‘allowed callback urls’.
For security reasons, we’ll need to enter the URLs that Auth0 can redirect to, after authenticating a user.
We’ll enter `http://localhost:3000`, which allows us to run the seed projects on our local machine.

Now let’s unzip the downloaded seed projects, then we’ll simply start serving the content of the angularjs app, and in parallel, we’ll run the expressjs based node app.

To serve the contents of the angular.js seed project, we’ll simply, cd into the angular seed project directory and use the `serve` command, which is available on npm.

To start the node.js based seed project, we’ll cd into the nodejs seed project, install the dependencies using the `npm install` command, and start the server using the `node server.js` command.

Now lets open up the browser and navigate to the localhost on port 3000.
You’ll notice were redirected to the login page, this is because the root path requires an authenticated user.

Clicking the Signin button will display a login form we call [Lock](https://auth0.com/lock).  Lock is a simple, clean embeddable login form that just works on all platforms.

We’re shown a list of the authentication options we set up for our app:
Github, Twitter as well as username and password.

In this video, we login using twitter, which after completing, redirects us to the root of our application.

## The JWT: JSON Web Token
You’ll notice a security Token, has been assigned to us, which is saved in `localStorage`.

To take a look at the token we received in the video, we can just paste it into [jwt.io](http://jwt.io/).
The debugger will allow us to easily identify the component parts of the token.
The token is made up of 3 parts: A header, a Payload and a Signature.
The interesting part of the token is the Payload, which is the second part of it.  It shows you the subject, in other words who this token represents, as well as other supporting information.
The way we can trust and use this payload, is by verifying the last part of the token, the secure signature, which was originally created by Auth0 using the algorithm specified in the header plus a secret.
Now this token will get sent to our server, when requests are made, then our server can verify the token’s signature, using the same secret Auth0 used to sign the token, and respond accordingly.  The server side logic needed to verify the token is pretty simple, usually just a few lines of code.

## Calling an API

Now If we click the `call api` button from the seed project, an api call is attempted against a secured rest endpoint.

As you can see by the alert box response, our api call was successful.

If we look at the request headers, you’ll see the token that we just saw saved in localStorage, was sent in the Authorization header.

When the server receives the request, the provided token will be checked, and the server will respond accordingly: either fulfilling the request if the token is verified or returning an error.

So here is the cool thing, if we want to add another provider, such as Google, we can simply enable Google as a social connection for our account, then enter the Client ID and Secret which can be obtained from Google.

Now when we logout, refresh the page, then click the Signin button again, we immediately see google as a new login choice.

That's all it takes to get up and running with Auth0,
stay tuned for future screencasts, where we’ll dive a little bit deeper, and gain a better understanding of the authentication process and JWT’s.
