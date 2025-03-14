---
description: How to get and validate ID Tokens before storing and using them.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Authorize: Get and Validate ID Tokens

Learn how to get and validate an ID Token in JSON Web Token (JWT) format.


<div class="video-wrapper" data-video="hhzmeqdyqr"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

  In this video, we'll take a closer look at how authorization works, in Auth0, and we'll start by digging into ID Tokens. 

  The ID Token contains user profile information, such as the user's name and email, represented in the form of claims. These claims are statements about the user, which can be trusted if you can verify its signature. 

  You can get an ID Token for a user after they successfully authenticate and you must validate it before storing and using it. 
</details>

<details>
  <summary>Obtain an ID Token</summary>

  The first step is to obtain the ID token by authenticating the user. The previous video on authentication demonstrates how to do this. The best approach is to use your language specific SDK to redirect the user to your Auth0 tenant to authenticate the user. Then Auth0 will redirect the user back to your callback URL with the ID token (or a code to fetch the ID token).

  You can then add custom claims to the token using Auth0 Rules as we mentioned. The claim name must conform to a namespaced format something similar to the following: 

  `http://MY_NAMESPACE/CLAIM_NAME`
  
  Where `MY_NAMESPACE` is any domain except `auth0.com`, `webtask.io`, or `webtask.run`.  `CLAIM_NAME` can be anything you want. Some examples: `http://example.com/role` or `https://example.com/claims/locale`.

  The ID Token acts as a *cache* for user information and by default, the token is valid for 36,000 seconds&mdash;or 10 hours. You can shorten this lifetime limit if you have security concerns. Remember, that the ID Token helps ensure optimal performance by reducing the need to contact the Identity Provider every time the user performs an action.
</details>

<details>
  <summary>ID Token format</summary>

  Auth0 generates the ID Token in JSON Web Token, or *JWT* format. A JWT is an open, industry standard RFC 7519 method for representing claims securely between two parties. At Auth0, ID Tokens are always returned in JWT format, and Access Tokens can be either JWT format or opaque strings depending on the context. 

  A correctly formatted JWT consists of three concatenated base64url-encoded strings, separated by dots.

  * The first string is the **Header** which contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
  * The second string is the **Body**, also called the *payload*, which contains identity claims about a user. Here’s where you will see any custom claims that you’ve added. Note that in cases where the JWT is returned via a URL, you need to make sure to limit the custom claims to keep the JWT within browser size limitations for URLs. The ID Token payload can contain some or all of the following items: name, email, picture, sub, issuer, audience, and expiration. 
  * The third string contains the **Signature** which is used to validate that the token is trustworthy and has not been tampered with.
</details>

<details>
  <summary>Check the ID Token</summary>

  Next, we are going to walk through the three things your application will need to check for in the returned JWT. 

  1. The JWT format is correct.
  2. The contents contain the right claims
  3. The signature is trustworthy. 

  To check that the JWT format is correct, your application should parse the ID Token to make sure it conforms to the established structure of a JWT.  Your language specific SDK should have a method for validating the JWT.  Make sure this method actually checks the `aud`, `iss`, `exp`, and `nonce` (where applicable) claims, and validates the signature.

  You can decode well-formed JWTs at using the [jwt.io](https://jwt.io) debugger to view the claims. 
</details>

<details>
  <summary>Validate the ID Token claims</summary>

  Next, you need to verify that the standard claims and any custom claims you’ve added are in the payload. Remember it should contain some or all of the following items (depending on which openid scopes you requested): `name`, `email`, `picture`, `nonce`, `sub`, `iss`, `aud`, and `exp`.

  * Make sure the token expiration, named `exp`, which is a Unix timestamp, is set to be after the current date and time and matches what you require for token lifetime. 

  * Make sure the token issuer, named `iss`, matches the issuing authority identified in your Auth0 tenant’s discovery document which you can find at `https://YOUR_DOMAIN/.well-known/openid-configuration`. 

  * Make sure that the token audience, named `aud`, is the correct recipient for which the token is intended. The value must match the client ID of your Auth0 application.
  
  * The nonce claim is recommended (required for implicit flow) to pass in a single unique identifier when redirecting to Auth0 to authenticate, and helps in the prevention of replay attack scenarios.

  * There are also other claims which are used in specific use case scenarios.
</details>

<details>
  <summary>Verify the ID Token signature</summary>

  To verify the ID Token’s signature, you will need to base64url-decode the signature. You can check the signing algorithm and confirm that the token is correctly signed using the proper key.  We recommend you use an SDK to validate the signature, and [jwt.io](https://jwt.io) provides a list of SDKs that can be used for this purpose.
</details>

<details>
  <summary>Summary</summary>

  Now that you have validated that the token is legitimate, you can use the custom claims you added to the token combined with your application data to perform fine-grained access control. 

  We will go into more depth about API integration in a separate video, and in our next video, we’ll talk about how to manage user profiles. 
</details>

## Up next

<ul class="up-next">

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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>3:18</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/05_01-authorize-id-tokens-access-control">Authorize: ID Tokens and Access Control</a>
    <p>What an ID Token is and how you can add custom claims to make access control decisions for your users. </p>
  </li>

</ul>
