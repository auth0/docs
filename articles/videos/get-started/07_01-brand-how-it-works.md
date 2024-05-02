---
description: Why your branding is important for your users and how it works with Auth0.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Brand: How It Works

Learn how branding works with Auth0. Add your company name and logo, and choose colors for your pages.

<div class="video-wrapper" data-video="e2gdvmgruy"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

The way your sign up and login pages look to your users makes a difference in their overall experience. If those pages have your company branding and URL, your customers will have peace of mind that your application can be trusted and is secure. 

In this video, we’ll start by explaining what Auth0 Universal Login is and what it does for you, and then show you how easy it is to set up your branded pages.
</details>

<details>
  <summary>How Universal Login works</summary>

Universal Login is Auth0's implementation of the login flow, which is the key feature of an Authorization Server. Each time a user needs to prove their identity, your application redirects to your Auth0 tenant and Auth0 will do what's needed to verify the user's identity which often includes redirecting the user to the Universal Login Page to collect their credentials and/or provide them other options for login, such as social or enterprise identity providers.

By choosing Universal Login, you don't have to do any integration work to handle the various flavors of authentication. When you customize the login page, the customizations you make will persist, even when you add new features such as social logins, and multi-factor authentication.

You also benefit from all improvements Auth0 does in the login flow without you changing a single line of code in your application. 
</details>

<details>
  <summary>Use the Dashboard to customize your pages</summary>

The login page appearance and behavior is customizable right from the Dashboard. You can change the logo and colors of the login pages, and in more advanced use cases, you can modify the HTML code of each page. You can also customize the look of the URL used to navigate to the Universal Login page. Creating this *vanity URL* not only aligns with the idea of a consistent user experience, but also offers you complete control over the certificate management process, if you need it&mdash;so for example, you can use Extra Validation (EV) SSL certificates or similar to provide the visual, browser-based cues that offer your visitors additional peace of mind.

Let’s see how this is done.

First, we'll add a meaningful name to your application. Next, we'll configure the universal login settings, adding your company logo, then we'll specify a custom primary and background color. 

Now we'll configure the tenant settings, specifying a friendly name, a logo, a support email and a support url.

Next, we'll configure your custom vanity URL, by click on **Custom Domains** tab.

Go back to the **Tenant Settings page** and click the **Custom Domains** tab. 

1. Type in your custom domain URL&mdash;such as `accounts.acme.com`.
2. Select **Auth0-managed certificates** and click **Add Domain**.
3. Now you need to verify that you own that domain so you need to add the CNAME verification record listed in the Dashboard to your domain’s DNS record. Then click **Verify**. 

The steps may vary by domain provider but it’s easy to verify your domain.
</details>

<details>
  <summary>Summary</summary>

There may be additional steps you have to complete depending on which Auth0 features you are using. For example, if you are using Auth0.js or one of the other SDKs, or if you are using G Suite connections, there are some additional domain name related steps you will need to take. We provide documentation on the Auth0/docs website to help you. 

In the next video, we'll look at how to set up Universal Login.
</details>

## Up next

<ul class="up-next">

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

</ul>
