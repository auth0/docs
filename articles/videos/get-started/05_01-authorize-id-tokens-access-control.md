---
description: What an ID Token is and how you can add custom claims to customize them and make access control decisions for your users.
classes: video-page
---
# Authorize: ID Tokens and Access Control

Learn about using Auth0 authorization via the use of ID Tokens and understand what an ID Token is and how to add custom claims to customize them and make access control decisions for your users.

<div class="video-wrapper" data-video="tbd"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

  In part 1, we described a few of the ways that you can provide services to your users through your applications using user authentication. You can authenticate users via their social media accounts or with their usernames and passwords. You can add an additional level of certainty about their identities with Multi-factor Authentication.

  In this video, we will look at how the Quickstart single page application or SPA implementation uses Universal Login - which is the preferred method for authentication workflow in Auth0. 
</details>

<details>
  <summary>Quickstart: SPA with Backend</summary>

  You can find the quickstarts at auth0.com/docs/quickstarts. It is a good idea to login to a specific tenant. Here I am using the product-training tenant. This will make the user experience better later on.

  Next, we need to select the type of application we want to use. We can start with single page application. Then select the vanilla javascript quickstart.

  Here we are offered two options; the first is a detailed step by step guide to implementing authentication in an existing javascript application, and the second is to download a fully functional sample application.

  Let’s download the sample application. Becuase we are authenticated, the quickstart download gives us an option to select an existing application from our tenant. The downloaded sample application will be configured to use this applications credentials for authentication.

  We are also instructed to add our localhost development url to the **Callback URL** and **Allowed Web Origins** lists.

  Finally, assuming that `node.js` is installed we can install our dependences and start the application.

  Now we can test the authentication by clicking the login button.
</details>

<details>
  <summary>Universal Login</summary>

  Now that we have an application connected, let’s take a look at Universal Login. You can choose from Classic or New to create your own login pages that will authenticate your users. Later in another video, we will show you how to provide more extensive branding for these pages and more. 

  The buttons that appear on the login page depend on a number of factors - including the connections that have been enabled and the current state of a session the user may already have. These settings are dynamic and adjustable in real-time - no coding changes are required - since the functionality is driven by the web pages served by the Auth0 Authentication Server.
 
  If you have **Enable seamless SSO** enabled or if you have a new tenant, where this option is enabled by default and can’t be turned off, Auth0 will show the login UI only if the user doesn’t have a session. There may or may not be other prompts as well like MFA or consent, but if no user interaction is required then the application will get the results immediately. Therefore, in most cases, applications don’t really check if the user is logged in into the identity provider: they just request an authentication.

  Universal Login works by effectively delegating the authentication of a user; the user is redirected to the Authorization Service, your Auth0 tenant, and that service authenticates the user and then redirects them back to your application. In most cases, when your application needs to authenticate the user, it will request authentication from the OIDC provider, Auth0, via an /authorize request. As you can see from the Quickstart, the best approach to implementing this is to use one of the language-specific Auth0 SDKs - or some 3rd party middleware applicable to your technology stack. How to actually do this depends on the SDK and application type used.

  Once authenticated, and when using an OIDC authentication workflow, Auth0 will redirect the user back to your callback URL with an ID token or a code to fetch the ID token.

  For OIDC, Auth0 returns profile information in the ID token in a structured claim format as defined by the OIDC specification. This means that custom claims added to ID Tokens must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named myclaim, you would name the claim `https://foo.com/myclaim`, instead of myclaim.

  By choosing Universal Login, you don't have to do any integration work to handle the various flavors of authentication. You can start off using a simple username and password, and with a simple toggle switch, you can add new features such as social login and multi-factor authentication. 
</details>

<details>
  <summary>Integrate a second application</summary>

  Next, we’ll see how easy it is to integrate Auth0 in your second application. If you run another Quickstart, for example, to integrate a web application, you don’t have to do anything else. Running the second Quickstart against the same tenant will configure SSO between your applications automatically. 

  Let’s download another quickstart and see this in action.

  This time around, I will select the Regular Web App application type and asp.net core sample. Asp.net core is a typical enterprise server side rendered web application framework.

  The steps are the same as before: Select the application, set local developement urls, download and run the sample.

  After authenticating the user and redirecting them to an identity provider, you can check for active SSO sessions.
</details>

## Up next

<ul class="up-next">

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>5:53</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/05_02-authorize-get-validate-id-tokens">Authorize: Get and Validate ID Tokens</a>
    <p> </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:59</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/06-user-profiles">User Profiles</a>
    <p> </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>3:15</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/07_01-brand-how-it-works">Brand: How It Works</a>
    <p> </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>3:48</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/07_02-brand-signup-login-pages">Brand: Sign Up and Login Pages</a>
    <p> </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>5:42</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/08-brand-emails-error-pages">Brand: Emails and Error Pages</a>
    <p> </p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/10-logout">Logout</a>
    <p> </p>
  </li>

</ul>

## Previous videos

<ul class="up-next">

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:33</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/01-architecture-your-tenant">Architecture: Your Tenant</a>
    <p>What an Auth0 tenant is and how to configure it in the Auth0 Dashboard.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>2:15</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/02-provision-user-stores">Provision: User Stores</a>
    <p>How user profiles are provisioned within an Auth0 tenant.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>10:03</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/03-provision-import-users">Provision: Import Users</a>
    <p>How to move existing users to an Auth0 user store using automatic migration, bulk migration, or both.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>5:53</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/04_01-authenticate-how-it-works">Authenticate: How It Works</a>
    <p>How user authentication works and various ways to accomplish it with Auth0.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>6:58</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/04_02-authenticate-spa-example">Authenticate: SPA Example</a>
    <p>An example using the Auth0 Quickstart for a SPA implementation with Auth0 Universal Login. </p>
  </li>

</ul>

