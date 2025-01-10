---
description: How user authentication works and various ways to accomplish it with Auth0.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Authenticate: How It Works

Learn about the difference between authentication, authorization, and access control. Understand when and why you might use each type of authentication method: first factors, second factors, and multi-factor. Learn about the OpenID Connect (OIDC) authentication protocol.   

<div class="video-wrapper" data-video="suw4dsi0g8"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

  Before you can provide services to your users through your applications, you need to identify who they are, and that process is called *user authentication*. 

  In this video, we will show you a few ways to go about this. For example, you can authenticate users via their social media accounts or with their usernames and passwords. You can add an additional level of certainty about their identities with a second authentication factor; this is called *Multi-factor Authentication* (MFA).

  Before you start, think about security and user experience, if you want to offer multiple primary authentication methods, and if you want to add multi-factor authentication. Planning how you want the authentication process to work before you do the steps required to implement the actual authentication is critical because it will determine how you configure your application integration.

  One way to make sure you’ve considered all your authentication requirements is to adopt an iterative release style. For example, you may have three or four applications you need to integrate and, instead of tackling them all at once, you can make a series of iterations, tackling one application at a time. This way your teams can benefit from the experience, and you can leverage this approach to help increase velocity with each iteration.
</details>

<details>
  <summary>Authentication, authorization, and access control</summary>

  It’s important to distinguish between Authentication, Authorization, and Access Control. Your Auth0 tenant, the Authorization Server, is responsible for Authentication and some or all of Authorization. Access Control is the responsibility of the API or Application itself because access control is almost always contextual.

  So, to summarize:  
  * **Authentication** is the process of determining if the user is who they say they are
  * **Authorization** is declaring what that user is allowed to do in the system
  * **Access Control** is limiting a user to only perform actions they are allowed to do based on a combination of their identity, their authorization information, and their consent.

  In this video, we are only going to focus on authentication, we will address the other options such as MFA in a separate video. There are different types of connections you can make in the Dashboard that will enable authentication. 
</details>

<details>
  <summary>Social connections</summary>

  You can choose from among many social connections including the most commonly used ones like Google and Facebook. Choose connections that your users will most frequently have accounts with. 

  If you have more than one application, you will almost certainly want to have Single Sign-On between those applications. This is one of the easiest ways to give your users a good user experience without compromising on security.

  As you may already know, the OpenID Connect specification&mdash;or OIDC&mdash;is the most widely used industry-standard authentication specification when it comes to customer-facing applications. It is intended as a way to provide SSO between applications. OIDC is based on the OAuth 2.0 family of specifications. It uses simple JSON Web Tokens&mdash;or JWT&mdash;that you obtain using flows conforming to the OAuth 2.0 specifications. When a user signs in using their Google account, then they’ve used OIDC.

  We’ve made it easy to enable this type of authentication with Universal Login. The way this works is you delegate the authentication of a user by redirecting them to the Authorization Service, your Auth0 tenant, and that service authenticates the user and then redirects them back to your application.

  If each of your applications does this then Auth0 remembers whether the user has already logged in and sends them back to the new application without requiring them to re-enter their credentials. This is how we accomplish Single Sign On.

  The next step is to figure out how to do this in your application. To help you out we’ve provided some guides to help you get started.
</details>

<details>
  <summary>Auth0 Quickstarts</summary>

  Before figuring out which quickstart to use, it is important to figure out which one most closely represents your application. You answer two questions to make this determination:

  1. What type of application do you have? Do you have a traditional web application, a single page application, or a native mobile application?

    * A traditional web application is generally an application written in PHP, Java, or C#.  It is an application where the browser opens a page, the page is rendered on the server side and then the HTML is sent to the browser.  When someone performs an action it refreshes the page. There is a frontend, the code on the browser, which may include some javascript, and a backend, the code that executes on the server side.  The backend can maintain the state of the application on the server.  Most applications fall into this category.

    * A single page application is an application that renders once on the server and then the rest of the execution happens on the users’ browser.  The application must call API’s to perform actions that happen server side, but those APIs don’t maintain any state for the session.  You must give the API the information it needs.  Note that there is non-session state that can be stored in a database, but the API doesn’t know which instance of the application is calling it, so there is not sessions associated with your browser instance.

    * A native and/or mobile application is an application that is installed on a mobile device or desktop OS.  It must call an API to perform actions on the server side as well.

  2. Are you going to need an access token to call a separate API? If your application needs to call a separate API, then you will need to do some extra work after the quickstart to enable your SDK to get you an access token. You can learn more about that in the video that discusses Authorization.

  In the next video, we are going to show you how to use a quickstart guide to integrate a javascript single-page app and a backend. 
</details>

## Up next

<ul class="up-next">

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>7:01</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/04_02-authenticate-spa-example">Authenticate: SPA Example</a>
    <p>An example using the Auth0 Quickstart for a SPA implementation with Auth0 Universal Login. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>3:18</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/05_01-authorize-id-tokens-access-control">Authorize: ID Tokens and Access Control</a>
    <p>What an ID Token is and how you can add custom claims to make access control decisions for your users. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>6:02</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/05_02-authorize-get-validate-id-tokens">Authorize: Get and Validate ID Tokens</a>
    <p>How to get and validate ID Tokens before storing and using them. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:59</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/06-user-profiles">User Profiles</a>
    <p>What user profiles are, what they contain, and how you can use them to manage users. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>4:00</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/07_01-brand-how-it-works">Brand: How It Works</a>
    <p>Why your branding is important for your users and how it works with Auth0. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>2:20</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/07_02-brand-signup-login-pages">Brand: Sign Up and Login Pages</a>
    <p>How to use Universal Login to customize your sign up and login pages. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>5:42</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/08-brand-emails-error-pages">Brand: Emails and Error Pages</a>
    <p>How to use email templates and customize error pages. </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/10-logout">Logout</a>
    <p>How to configure different kinds of user logout behavior using callback URLs. </p>
  </li>

</ul>

## Previous videos

<ul  class="up-next">

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:33</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/01-architecture-your-tenant">Architect: Your Tenant</a>
    <p>What an Auth0 tenant is and how to configure it in the Auth0 Dashboard.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>2:14</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/02-provision-user-stores">Provision: User Stores</a>
    <p>How user profiles are provisioned within an Auth0 tenant.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>10:00</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/03-provision-import-users">Provision: Import Users</a>
    <p>How to move existing users to an Auth0 user store using automatic migration, bulk migration, or both.</p>
  </li>

</ul>