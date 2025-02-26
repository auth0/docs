---
description: What an Auth0 tenant is and how to configure it in the Auth0 Dashboard.
classes: video-page
public: false 
---
<!-- markdownlint-disable-->
# Architect: Your Tenant

Learn what an Auth0 tenant is and how to configure it in the Auth0 Dashboard. Understand why you may want more than one tenant if you have different user communities, and also how you can use more than one tenant to support your Software Development Life Cycle (SDLC). Understand the importance of tenant naming and custom domain usage best practices. Also learn how to set up additional tenant administrators and how to associate tenants with your Auth0 account.

<div class="video-wrapper" data-video="ww3ykoy3vm"></div>

## Transcript
  
<details>
  <summary>Introduction</summary>
  
  In this video, we will talk about what an Auth0 tenant is, and show you how to configure it in the Auth0 Dashboard. We will also briefly explain why you may want to use more than one tenant if you have different user communities, and also how you can use more than one tenant in support of your Software Development Life Cycle. We’ll also describe the importance of tenant naming, use of custom domains, provisioning additional tenant admins, and how to associate tenants with your Auth0 account. 

  Once you create your account in Auth0, you will be asked to create a Tenant. This is a logical isolation unit. The term tenant is borrowed from the phrase "software multi-tenancy" and refers to an architecture where a single instance of the software serves multiple tenants. No tenant can access the instance of another tenant, even though the software might be running on the same machine (hence the logical isolation).

  When it comes to figuring out how to define your Auth0 tenants and accounts as part of your application integration, the value of investing time in the architectural “landscape” up front will pay dividends in the long run, and there are a number of things you’ll want to consider. 

  It’s important to understand how your applications need to function within your infrastructure, and this will help you understand how to configure your tenants to accomplish your goals. How your Auth0 tenants are configured&mdash;the architecture of your Auth0 deployment&mdash;will form the basis for the grouping of your Auth0 assets to leverage features such as Single Sign On, centralized user profile management, and consolidated billing capabilities. 

  The number of tenants you create can grow quickly, especially if you have different user communities and different phases for development, testing, and production. So, for ease of maintenance and simple organization, it is really important to consider exactly what you will need. 

  For example, it’s not uncommon for companies to have identity requirements that address multiple user communities such as customers, partners, and employees. There may also be other groups within your organization that are working with Auth0; it’s not uncommon for our customers to have disparate departments that serve different user communities. Identifying these early will potentially influence your choices, and doing so could mitigate decisions that might prove costly later on.

  So you will need to decide how many different production tenants you will require. Most companies only need a single production tenant, but if you have a set of applications for just employees, you may want a separate tenant for that. In some situations, you may also need different production tenants for different customer user communities. 

  Another reason you would want to create multiple tenants is to support your Software Development Life Cycle. Auth0 can fit into your process by allowing you to have a separate tenant for each phase&mdash;such as one for development, one for testing, and one for production. Even if you don’t use an SDLC methodology, you will most likely want to create at least two tenants: one for development and one for production. 

  You may want to name one tenant “company-dev” to serve as a shared environment where your development work occurs, and name another tenant “company-qa” for testing your Auth0 integration. You can then name a third tenant “company-prod” to serve as your production tenant. 

  You can also create tenants to serve as sandboxes to test potential changes, like different deployment scripts, without compromising your environment. Auth0 lets you create as many free tenants as you like, but you may be limited for the number of tenants where all paid features are enabled. You can have up to three tenants where all features are available.

  It’s also important to consider exactly what you will name your tenants. The ultimate goal is to end up with one or more production tenants that are branded exactly the way you want them to appear to your users. Tenant naming patterns are very important, so it’s good to plan the tenant names in advance because you won’t be able to change them once you create them, or use them again if you delete them.
</details>

<details>
  <summary>Configure your tenant</summary>

  Now let’s see how easy it is to configure your tenants. Everything you need to configure your Auth0 tenant is available via the Auth0 Dashboard. Here you’ll determine how you’ll use Auth0 features and where assets like applications, connections, and user profiles will be stored. 

  We’ll talk about these in other videos, but for now, we’re going to concentrate on Tenant Settings, accessible via the drop-down menu by going to the upper-right corner of the Dashboard and clicking on your tenant name. From this menu, you can also create additional tenants at any time by clicking on Create Tenant.
</details>

<details>
  <summary>General settings</summary>

   Starting with the General settings tab, you can specify your company name, a path to your company logo, and your company’s support email address and support URL. This is the information that is shown in the default error page that appears to your users, so they can contact your support if they have an issue. You may also want to consider creating a custom error page and configure Auth0 to use that instead. 

  Out-of-the-box, client-facing URLs are Auth0 branded; however, we recommend using the Auth0 custom domain capability to provide a consistent corporate identity and to also address potential user confidence concerns before they arise. Your company name as part of the URL, for example, will support your brand and should tell your users that they can trust that they are in the right place to enter their identity information. It’s also harder to phish your domain if you have a Custom Domain (a.k.a. vanity) URL because the phisher also has to create one to mimic yours. A centralized domain for authentication across multiple product or service brands so users see a consistent interface is also important. And keep in mind that some browsers make it harder to communicate in an iFrame if you don’t have a shared domain.

  Having more than one Auth0 Dashboard administrator is a good idea, and periodically reviewing the list of Auth0 Dashboard administrators to see that the right people have access to your Auth0 tenants will help you make sure that each person has a legitimate need for admin access. You should make sure that former employees no longer have access. We also recommend that you enable multi-factor authentication for all your admins for added security. Having more than one admin can alleviate the burden of Auth0 tenant administration, but if you only have one admin they may get locked out if they lose their phone. If you have more than one admin, however, another can temporarily disable MFA for the admin who lost their phone.
</details>

<details>
  <summary>Advanced settings</summary>
 
  There are also some advanced tenant settings that you can configure for your tenant. There are a couple of things you need to consider when you configure these items. 

  Logout is the act of terminating an authenticated session. It is a security best practice to terminate sessions when they’re no longer needed to avoid a potential takeover by unauthorized parties. This is usually achieved via the provision of some “logout” option on the UI. There are multiple types of sessions that could be created when a user logs in. For example, a local application session, Auth0 session, and/or a third-party Identity Provider session. You’ll need to determine which should be terminated when the user clicks on any “logout” option. You can configure the application to have a logout redirect URL.

  Session timeout settings allow you to specify when the SSO cookie times out. The value you set is the login session lifetime which is how long the session will stay valid, measured in minutes. The default setting is set for 10,080 minutes or 7 days. 

  Your contractual agreement with Auth0 should cover all the tenants you want to use. Make sure all your tenants are associated with your company account. If you have developers who want to create their own sandboxes for testing, make sure the tenants are associated with your account so they have the same permissions and Auth0 features available too. 

  If you need to add a tenant to your account, contact the Auth0 Support Center at <https://support.auth0.com.> Specify your production tenant so you can get higher rate limits than non-production tenants. Only one tenant per subscription can be set as the production tenant. 
</details>

<details>
  <summary>Summary</summary>
  
  So, to summarize, we described what an Auth0 tenant is, how to configure it, and why you may need more than one tenant. We also described the importance of tenant naming, and how to associate tenants with your Auth0 accounts to save money and leverage Auth0 features across your organization.

  In the next video, we’ll talk about provisioning your users and configuring user stores, and in a future video, we’ll talk more about Custom Domains too.
</details>

## Up next

<ul class="up-next">
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
    <p>How to get and validate ID Tokens before storing and using them.  </p>
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
    <p>Why your branding is important for your users and how it works with Auth0.  </p>
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
