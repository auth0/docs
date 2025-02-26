---
description: How to configure different kinds of user logout behavior using callback URLs.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Logout

Learn about different kinds of logout behavior and different session layers. Learn how to configure callback URLs in the application and tenant settings in the Dashboard.

<div class="video-wrapper" data-video="7l22iltru6"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

When we talk about logout in the context of Auth0 implementations, we are talking about the act of terminating an authenticated session. It is a security best practice to terminate sessions when they’re no longer needed to avoid a potential takeover by unauthorized parties. 

Auth0 provides tools to help you give users the ability to log out; this includes options for providing different levels of logout and also determining where the user will land after the logout is complete.
</details>

<details>
  <summary>Session layers</summary>

There are typically three session layers that can be created when you login and the logout behavior you choose for your applications should make it clear to users which have terminated&mdash;ideally displaying a visual confirmation of this. 

The first layer is the session inside your application or the *Application Session Layer*. Though your application uses Auth0 to authenticate users, you'll still need to track that the user has logged in to your application; in a regular web application, for example, you achieve this by storing this information inside a cookie. 

Logging users out of your applications typically results in their application session being cleared, and this should be handled by your application: for the Application Session Layer, there is nothing within your Auth0 tenant that you need to use to facilitate session termination. This will require you to utilize whatever application session stack you are using to clear out any session related information. Note that some of the Auth0 SDKs do provide some support for application sessions; please check the documentation to see if there is any local SDK session removal that needs to be done.

Auth0 also maintains a session for the user and stores their information inside a cookie, this is the *Auth0 Session Layer*. This layer is used so that the next time a user is redirected to Auth0 for login the user's information will be remembered. You can log users out of the Auth0 session layer by redirecting them to the Auth0 logout endpoint so Auth0 can clear the (single sign-on; SSO) cookie.

The last session layer is the *Identity Provider Session Layer*, for example, Facebook, Google or an Enterprise SAML provider. When users attempt to sign in using any of these providers, and they already have a valid sign-in (with whichever provider they choose) they will not be prompted again to sign in&mdash;though they may be asked to give permission to share their information with Auth0 and, in turn, your application. It is not necessary to log the users out of this session layer, but you can use Auth0 to force the logout if required. 

Logging out of your Auth0 Session Layer will require you to redirect the user to `https://<YOUR_CNAME or YOUR_TENANT.auth0.com>/v2/logout`&mdash;typically performed via use of the appropriate method in the Auth0 SDK for your technology stack. This will clear your Auth0 session. You will also want to add a query parameter for that request called `returnTo`&mdash;this parameter should contain a URL that has been pre-registered and protects you against open redirect attacks.  
</details>

<details>
  <summary>Set whitelisted URLs</summary>

Auth0 only redirects to whitelisted URLs after logout and there are two places you can configure these. 

The first place you can set this is at the tenant level&mdash;this is where you can put the set of logout URLs that are common to (that is shared between) all applications. 

The second place would be in the application settings: if you need different redirects for each application, you can whitelist the URLs in your application settings. This allows you to set logout URLs in an application-specific context. 
</details>

<details>
  <summary>Session timeouts</summary>

You can also set the behavior in cases where a user doesn’t explicitly logout of your application. Auth0 provides for session timeout to deal with Auth0 session termination in this scenario. We’ll cover the topic of session timeout in more detail in a future video.
</details>

<details>
  <summary>Application-specific logout URLs</summary>
There are two important things to consider when you use application-specific logout URLs:

1. You MUST send client_id as a query parameter when calling the /v2/logout endpoint. and the returnTo URL must be in the application’s list of allowed logout URLs.

2. This will end the Auth0 Session for the entire tenant, i.e. for all defined applications, not just the one that matches the client_id supplied!  Passing the client_id just tells the logout endpoint where to look for the logout URL white-list.

In either place, under **Allowed LogoutURLs**, specify the logout URLs; you must include the protocol&mdash;either `http://` or, as we would recommend, `https://`&mdash;otherwise the call will fail. Https should always be used for production environments. The URLs provided in the Allowed Logout URLs list are also case-sensitive, so the URL used for logout must match the case of the logout URLs configured on the dashboard. However, do note that the scheme and host parts are case insensitive. For example, if your URL is `http://www.Example.Com/FooHoo.html`, the `http://www.Example.Com` portion is case insensitive, while the `FooHoo.html` portion is case sensitive.

After the user logout occurs Auth0 will only redirect to a URL that is defined in this list. 

Note that if you redirect the user back to the application after logout and the application redirects to an identity provider that still has an authenticated session for that user, the user will be silently logged back into your application and it may appear that logout didn’t work. In these cases, we recommend that you have a specific logout landing page in your application so you can tell the user that they successfully logged out and, if desired, you can also warn them that they may still be logged into their identity provider.
</details>

<details>
  <summary>Identity provider session layer logout</summary>

Alternatively you may desire to also log the users out of the Identity Provider Session Layer; for many providers, Auth0 will give you this behavior by simply having you add the federated query parameter to the redirect to /v2/logout. This will then additionally redirect the user to their identity provider and log them out there as well.  

There are a few limitations with logout to keep in mind:
 
* No validation is performed on any URL provided as a value to the `returnTo` parameter, nor any querystring or hash information provided as part of the URL.

* The behavior of federated logouts with social providers is inconsistent. Each provider will handle the `returnTo` parameter differently and for some, it will not work. Please check your social provider's settings to determine how it will behave.

* If you are working with social identity providers such as Google or Facebook, you must set your Client ID and Secret for these providers in the Dashboard for the logout to function properly.

* If you are an Auth0 Enterprise user, you will typically have SSO enabled for multiple applications, for example, SharePoint, a few .NET applications, a few Java applications, Zendesk, etc. In this case, it's very common that when users sign out, this needs to happen for all of their applications.  

  However, redirecting users to the Auth0 log out endpoint does not currently cover all scenarios where users need to be signed out of all of the applications they use. Other than when Auth0 is using SAML, Auth0 does not natively support Single Logout. Single Logout can be achieved by having each application check the active session after their tokens expire, or you can force log out by terminating your application sessions at the application level. 

  You can configure Single Logout URLs for SAML that can log out of all SAML sessions, although Auth0 supports front-channel SAML SLO only, Auth0 does not support back-channel SLO.
</details>

<details>
  <summary>Summary</summary>

Auth0 provides quickstart guides that show you how to implement logout functionality in your specific type of application and provides sample code. These quickstarts support native/mobile apps, single-page apps, and web apps. 
</details>

## Previous videos

<ul class="up-next">

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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>5:57</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/04_01-authenticate-how-it-works">Authenticate: How It Works</a>
    <p>How user authentication works and various ways to accomplish it with Auth0.</p>
  </li>

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

</ul>
