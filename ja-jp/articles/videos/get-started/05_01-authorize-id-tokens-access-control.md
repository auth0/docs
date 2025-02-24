---
description: What ID Tokens are and how you can add custom claims to customize them and make access control decisions for your users.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Authorize: ID Tokens and Access Control

Learn about Auth0 authorization via the use of ID Tokens. Understand what an ID Token is, and learn how to add custom claims to customize tokens and make access control decisions for your users.

<div class="video-wrapper" data-video="0yh740dll2"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

  In this video, you will see how to use custom ID Token claims to support specific authorization requirements in your application. 

  As a refresher, if you’ve just seen the Authentication video, then you know that it’s important to correctly distinguish between Authentication, Authorization, and Access Control. Your Auth0 tenant is your Authorization Server and responsible for Authentication and some or all of Authorization, and sometimes some coarse-grained access control. In contrast, your application or API is responsible for most Access Control because most access control is contextual and too fine-grained for a central service to manage effectively.
</details>

<details>
  <summary>Access restrictions</summary>

  Auth0 allows you to apply coarse-grained access restrictions to certain applications or APIs using Rule extensibility or provide authorization information to an application through custom claims. For example: 

  * You can return an `UnauthorizedError` from a Rule, allowing Auth0 to provide coarse-grained denial of access to an application if the user doesn’t have the right claim or claims in their user profile metadata.
  * You can return an `UnauthorizedError` from a Rule, allowing Auth0 to provide coarse-grained denial of access to an API if a call is coming from a restricted application or location. 
  * You can add additional or custom claims to an OIDC-compliant ID Token via  Auth0 Rule extensibility. That information will appear in the body or payload of the returned ID Token and can be used by your application, in combination with application specific data, for fine-grained access control. 
</details>

<details>
  <summary>Apply different access restriction levels</summary>

  We’ll talk about API level integration in a future video, but for now, we’ll concentrate on how Auth0 can be leveraged to provide for both coarse-grained and fine-grained application-level authorization.

  First, you should decide if you require coarse-grained or fine-grained control. With coarse-grained control, you can use Auth0 extensibility to prevent allocation of an ID Token, thus denying access to the application overall. If you require fine-grained control, then you will need to decide what information your application requires in order to make access control decisions (for example the user may have a role associated with them or specific permissions associated with their profile). In this case, you can use Auth0 extensibility to add this information as custom claims to an ID Token, which can then be verified and used by the application, in combination with application specific data, to apply any access control restrictions. We recommend that you add this information to the user profile metadata, that way you don’t have to call an external API to fetch the information which could negatively impact the performance and scalability of the login sequence. 

</details>

<details>
  <summary>Role Based Access Control</summary>

  Additionally, Auth0 has out-of-box support for Role Based Access Control or RBAC. RBAC refers to assigning permissions to users based on their role within an organization. Use RBAC for simpler, fine-grained access control that is often less prone to error.

  Be wary of adding too fine-grained detail to the user profile. Application specific access control data should live with the application, and not in the user profile. Trying to put all access control information in the user profile can quickly grow into a complicated system to maintain. Limit the authorization information stored against the user to apply to attributes about the user themselves, but not about individual items they can access. For example: if a user has access to a document repository, you could store the fact that the user is an administrator of the document repository application in the user’s app_metadata, but you wouldn’t want to store the specific documents the user has access to.

  In the next video, we'll dig into some of the details on how authorization works with Auth0.

</details>

## Up next

<ul class="up-next">

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

</ul>

