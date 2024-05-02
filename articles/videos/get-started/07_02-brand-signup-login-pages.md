---
description: How to use Universal Login to customize your sign up and login pages. 
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Brand: Sign Up and Login Pages

Learn how to use Auth0’s Universal Login feature to customize your sign up and login pages to include your brand.

<div class="video-wrapper" data-video="ywiszjixbc"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

In this video, we'll look at how you can setup Universal Login.

In the Dashboard, you can see the settings for your login page by navigating to **Universal Login** and looking at the **Settings** tab.
</details>

<details>
  <summary>Settings</summary>

The settings available here are **Logo**, **Primary Color**, and **Background Color**. These settings once changed, will take effect on all pages where you have not enabled customization of the pages' code. Note that the settings will also work if you have enabled customization but assume you are using predefined templates and have not changed those options in the code.

1. Add the URL to your logo image.
2. Select a primary color.
3. Select a background color.  
</details>

<details>
  <summary>Customize login pages</summary>

Now we’ll move to the **Login** tab and enable the login page customization. 

Click the **Login** tab and toggle **Customize Login Page**.

Note that when the customization toggle is flipped on, irrespective of the page you are customizing, you then become responsible for updates and maintenance of that page; it can no longer be automatically updated by Auth0. This includes updating the version numbers for any included Auth0 SDK or widget.

If you have enabled customization to inspect the page code, and then decide not to customize your login page, you should make sure to disable the customize page&mdash;in this case the **Customize Login Page**&mdash;toggle, so Auth0 will render the default page. You can also use version control software to manage the source code of your pages. To do so, you can use an Auth0-provided extension that works with the version control system you're using, like GitHub for example. 

You should also exercise caution regarding the use of third-party JavaScript on your pages&mdash;particularly the Login Page&mdash;since sensitive security-related information often flows through pages and the introduction of cross-site scripting or XSS vulnerabilities can be a concern.
</details>

<details>
  <summary>Summary</summary>

In the next video, we’ll talk about how to customize emails and error pages, and in a future video, we’ll talk about customizing the Guardian multi-factor authentication page too.
</details>

## Up next

<ul class="up-next">

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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>4:00</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/07_01-brand-how-it-works">Brand: How It Works</a>
    <p>Why your branding is important for your users and how it works with Auth0. </p>
  </li>

</ul>
