---
title: "API-Powered Authentication and Authorization for the Win"
type: whitepaper
description: Learn how you can solve custom and complex authentication scenarios with just a few lines of code, using Auth0's powerful, easy-to-use APIs.
hash: build-vs-buy
pdf: http://google.com/link-to.pdf
fourKeyConcepts:
  -
    text: Leveraging the Auth0 Rules Pipeline
    icon: css-class-bud-icon
  -
    text: Creating Dynamic Roles and Authorizations
    icon: css-class-bud-icon
  -
    text: Profile Enhancement On The Fly
    icon: css-class-bud-icon
  -
    text: Multi-party Authentication Flows Made Simple
    icon: css-class-bud-icon
  
longDescription: >
 In this white paper, we’ll look at some common use cases that go beyond the core features found in the Auth0 Dashboard, and see how an API-driven approach delivers more flexibility, and ultimately the best user experience.
shortTagline: When you have a rich API for Identity Management, even complex authentication flows become easy to implement.
---
# API-Powered Authentication and Authorization For The Win

* * *
<div class="toc-box"></div>

## <a href="#toc-1">OVERVIEW / EXECUTIVE SUMMARY</a>

Almost by definition, users are at the heart of any identity management system. You need to add them, remove them, let them log in and authorize them to access appropriate resources. You need to monitor, log, audit and manage them. When you add in privacy and regulatory compliance concerns, what seems like an easy bit of software quickly spirals into a big challenge. 

Auth0 has a unique, developer-centric approach. Some IAM products build every possible scenario for provisioning and managing the user population into a complex, hard-to-use and inflexible user interface managed by IT admins. Auth0 is different. The platform exposes a flexible, easy to use developer API that hides complexity behind a normalized and simple set of endpoints and schemas and a simple but powerful rules engine. Coupled with convenient SDKs for nearly any stack, the Auth0 API enables developers to build unique customizations.

Other solutions lock you into inflexible approaches they’ve developed in a vacuum, but with Auth0, you can integrate your own identity requirements directly into your application and quickly get into production. In this white paper, we’ll look at some common use cases that go beyond the core features found in the Auth0 Dashboard, and see how an API-driven approach delivers more flexibility, and ultimately the best user experience.

## <a href="#toc-2">DYNAMIC ROLES AND AUTHORIZATIONS</a>

With Auth0, you have the ability to add users from a wide range of connected identity providers, and grant them access to your applications. But what if you need more fine-grain control over which applications users may access, and the specific rights they have within those applications? With Auth0, you can handle this common use case by storing a set of permissions as part of the user metadata associated with each account. Your applications can check the appropriate metadata field to grant or deny access as appropriate.

Simple enough, but how do you manage those metadata fields? You might want to create a set of "roles" for your organization, and assign application permissions to those roles. Each user would then be assigned one or more roles and gain the corresponding permissions for their roles.

You can see this model in action with the sample [Roles and Permissions Dashboard](https://github.com/auth0/auth0-roles-permissions-dashboard-sample) application - open source software from Auth0, on GitHub. 

![](/media/articles/email-wall/whitepapers/api-driven-authentication-and-authorization/Roles-Permissions-Sample.png)

**Figure 1: Roles and Permissions Sample Application**

You can fork this project and use the sample code as the foundation of a solution customized to your unique situation.

Another option: if your organization represents these roles as groups within an enterprise IdP such as Active Directory, when a user authenticates to your AD, Auth0 can execute a rule which computes the union of permissions across all of the user’s group memberships and add those permissions to the outgoing authentication token dynamically. An enterprise CMS like SharePoint could allow or restrict access to specific internal sites based on this computed permission data. This dynamic "chaining" of group permissions is only possible with Auth0’s powerful, flexible rules. Other tools do simple authorization. But Auth0 orchestrates complex authorization workflows with just a few lines of code, executed within the authentication pipeline. You have the power to handle authorization according to your needs, not limited by inflexible tools.

## <a href="#toc-3">ON THE FLY ANALYTICS AND PROFILE ENHANCEMENT</a>

Rules are not just for authorization. The ability to reliably execute arbitrary code in the authentication pipeline can power advanced, server side features that would be difficult or impossible to implement unless you start from a blank slate and build your IAM solution from scratch.

Creating an account using Auth0’s self-service signup is a powerful signal of engagement. What if you could record that data in your data warehouse, or using an analytics tool such as Mixpanel? You can, with a rule: 
```javascript
function (user, context, callback) {

  if(user.signedUp) return callback(null,user,context);

  var mixPanelEvent = {
    "event": "Sign Up",
    "properties": {
        "distinct_id": user.user_id,
        "token": YOUR_MIXPANEL_TOKEN,
        "application": context.clientName
    }
  };

  var base64Event = new Buffer(JSON.stringify(mixPanelEvent)).toString('base64');

  request('http://api.mixpanel.com/track/?data=' + base64Event,
           function(e,r,b){
                  if(e) return callback(e);
                return callback(null,user,context);
              });
}
```
**Figure 2: Rule to Log Sign-ups into Mixpanel**

This executes every time a user authenticates but returns immediately except for the first time through for that user - where it calls Mixpanel with a record of the sign-up. Rules can run arbitrary code - call APIs, persist data in external databases, map SAML attributes, redirect to another service’s grant page to acquire a token - whatever you need. Rules are written in JavaScript and run in a protected sandbox within the Auth0 cloud, using webtasks, Auth0’s secure microcontainer implementation. They can be chained together and turned on and off individually, executed with specific clients, specific users, or dynamically based on user attributes so you can easily modularize the processing flow through Auth0.

Another example: you can call an external service such as FullContact to enrich a user profile with social, location, and demographic data automatically when a new user signs up for your service. Or add a new user to Salesforce as a prospect. Or [all of the above](https://auth0.com/docs/scenarios/mixpanel-fullcontact-salesforce) - limited only by your imagination.

## <a href="#toc-4">PUTTING IT TOGETHER - DIFFICULT USE CASES MADE EASY WITH APIs</a>

When your business depends on quickly getting your custom applications into production, you need an IAM platform that is designed by developers, for developers. Let’s look at a more complex case, and explore how Auth0 makes even sophisticated IAM workflows easy to implement, and getting your applications into production more quickly, more securely, and with less on-going maintenance.

Imagine that you are building a B2B SaaS travel application you will sell to enterprises, including SSO through their IdP. You aggregate lodging listings from multiple sources including hotels and AirBnB, with whom you have a trusted partnership. The challenge: book AirBnB properties through their private API<sup><a href="#1" data-note=" AirBnB has a private API used by some partners but we don’t know whether they would partner in this way. However, we picked a real, familiar company for a more realistic, multi-party authentication scenario to illustrate Auth0’s flexibility with complex use cases.">1</a></sup> on behalf of your customers’ users, without holding AirBnB account credentials.

In the past, such an application might require a custom, hand-built IAM solution, a big investment, specialized talent, and expensive, on-going maintenance. Today, no solution handles sophisticated, multi-party authentication workflows like this one out of the box. What you need is a developer-centric IAM platform that simplifies complex applications in which identity spans organizational boundaries. You need Auth0.

Auth0 includes broad support for enterprise identity standards such as SAML, ADFS, WS-Federation, and Google Apps, and can handle SSO between your app and your customers’ identity systems, no matter which enterprise IdP they prefer. So you can rely on Auth0’s experts to build, secure, and maintain these integrations as standards evolve.

![](/media/articles/email-wall/whitepapers/api-driven-authentication-and-authorization/AirBnB-UseCase.png)

**Figure 3: Example Multi-Party Authentication Workflow**

Even better, Auth0’s sophisticated rules engine lets your developers implement a one-time on-boarding workflow for AirBnB. This rule detects a user’s first login to your application, and redirects to AirBnB’s grant page. The user then grants Auth0 permission to acquire and securely store a user-specific, long-lived API token in the user’s profile. Your travel application can call Auth0’s API to retrieve (user.airbnb_token) and do AirBnB  lookups and bookings on behalf of a user. The user retains full control - able to revoke this access at any time. AirBnB could limit the duration of the access token, and another rule could automatically refresh the token before it expires.

Auth0’s redirect rules let you interrupt the authentication pipeline to call out to any service. You’re not limited to code you’ve written in your application. With this powerful capability, you can leverage the web API ecosystem, or build custom integrations to enterprise applications. And you can secure the redirect using JSON Web Tokens (JWTs) both when calling the external application and when that application calls back into Auth0 to complete the authentication processing.

Arbitrary code execution means you have the flexibility to compose complex authentication and authorization workflows, without building and maintaining a custom IAM solution. All using simple hooks and Auth0’s comprehensive front-end and back-end platform support to speed development.

When it comes time to implement your IOS and Android native applications, your developers can leverage this production identity workflow with no extra effort - mobile apps use the same Auth0 APIs. Easy!

This example just scratches the surface of how Auth0 may be tightly integrated with your applications to simplify even the most challenging use cases.

## <a href="#toc-5">CONCLUSION</a>

At the core of any IAM platform you’ll find authentication and authorization. Auth0 makes these critical functions easy for developers to integrate, and easy for end users to navigate - and pass the gate to your business value.

> *"Auth0 is built by developers with the modern developer in mind."*
> **-- Stephan Berard, Schneider Electric**

Why build it yourself or struggle with old-school identity solutions not designed for today’s web-native and mobile applications? Auth0’s unique developer design center is built with modern development methodologies in mind. But Auth0 comes with another unique feature - its lauded Customer Success team. Help is just a Slack chat or email away - to get you past any hurdles quickly and get your business critical applications into production.

For more information, contact the Auth0 sales team, or just try it out! The full capability of the Auth0 platform is always free for development use. Create your free account today at auth0.com and discover the developer-focused difference.

