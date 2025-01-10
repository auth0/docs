---
description: What user profiles are, what they contain, and how you can use them to manage users.
classes: video-page
title: Explore User Profiles
public: false
---
<!-- markdownlint-disable-->
# Explore User Profiles

Learn what Auth0 User Profiles are used for and what they contain. Understand how Auth0 normalizes user profile data from various identity providers and uses metadata and root attributes. You can manage user profiles with the Auth0 Dashboard.  

<div class="video-wrapper" data-video="f2538qame5"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

Auth0 creates user profiles to contain information about your users such as name, email address, and last login. A user profile in Auth0 is essentially the cache of information obtained from an identity provider; together with any Auth0 specific information for a user&mdash;such as user metadata&mdash;the profile is stored in a user account record contained in the user account storage associated with an Auth0 tenant,

Depending on which connections you choose, there will most likely be data formatting differences between various identity providers. It is also likely that there will be different information provided too. To compensate for this, Auth0 provides standardized user profile claims in what is referred to as the Normalized User Profile.

Auth0 also provides a variety of tools in the Dashboard to help you manage certain aspects of a users’ profile. You can also use the Auth0 Management API to manage user profiles. You can use these tools to create, search, view, and delete users, and you can also define, manage, and store custom metadata too&mdash;unique profile attributes, which can hold information like favorite color, language preference, contact information, location, internal IDs, or access information.
</details>

<details>
  <summary>How Auth0 uses user profiles, metadata, and root attributes</summary>

Let’s now look at how Auth0 makes use of these user profiles.

When a user logs in, Auth0 populates or updates the User Profile with data supplied by the identity provider. By default, there is one user profile created for each user identity.

As discussed, Auth0 can store associated metadata with a user’s profile, that contains information such as language preferences or accessibility preferences that you can use to enhance your users’ experience with your application. There are two types of metadata available in Auth0: user metadata and app metadata. 

* User Metadata is information that can be stored against a user profile and that a user can read/update as part of any self-service profile management. Metadata of this nature may be something like salutation for a user, or perhaps a user’s preferred language&mdash;used to customize the emails sent by Auth0. Any information that will be used to customize Auth0 emails&mdash;such as information used to determine the language for an email&mdash;should be stored in Metadata, and preferably user_metadata if the user is allowed to change it.

* App Metadata is information that can be stored against a user profile but which can only be read or updated with appropriate authorization; app_metadata is not directly accessible to a user. Metadata of this nature might be something like a flag to indicate the last set of valid terms and conditions accepted by the user, and perhaps a date to indicate when the user accepted them.

There are also user profile attributes that are updatable called *root attributes*. 
</details>

<details>
  <summary>Use the Dashboard to manage user profile information</summary>

You can use the Auth0 Dashboard to manage aspects of a user’s profile&mdash;such as metadata and root attributes&mdash;during your development process, but we recommend you don’t use the Dashboard to make changes in a production environment. Instead, you can use the Auth0 Management API to build your own management tool or integrate with any already built UI for Profile Management. Managing a user’s profile using the Dashboard is more of an administrative provision, however, it can be extremely useful during design and development, as it provides a simple way to manipulate user profiles while you make adjustments to how your application uses the data.

Now we’ll show you a few of the management actions you can take with the user profile data and in what circumstances you can perform them.
</details>

<details>
  <summary>Create a user</summary>

First, let’s create a user to see how it works. 

You can see that we’ve created a user called John Doe. Clicking on the user’s name (by default his/her email address) will allow us to view the user’s profile details. 

In the main section, you’ll find essential data such as the user's email and login access information.
</details>

<details>
  <summary>Metadata</summary>

The next three sections on this page in the Dashboard are related to MFA, metadata, and identity provider attributes. Note that we’ll be covering MFA in a separate video. 

In the **Metadata** section, you can see parts of the metadata you can modify. You can see fields for the two types of metadata: *user metadata* and *app metadata*.

If you’re an Auth0 hosted subscriber, you can update selected root attributes which are name, given_name, family_name, nickname, and picture. Methods for updating root attributes vary depending on your connection type. 

* If you are using Auth0 as the identity provider, you can set root attributes on user sign-up using the Management API, through public signup, or on import. Auth0 is the identity provider for regular database connections, custom database connections with import mode, and for passwordless connections.

* If you are using an upstream identity provider such as Google or Facebook, the identity provider sets the root attributes when users are first created and then automatically updates them with each subsequent login. This is the default behavior. You can opt to have the identity provider set the root attributes on user creation only and not update them on subsequent logins, thereby allowing you to update them individually using the Management API. To enable this, you need to configure your connection sync with Auth0 in the dashboard. 

Let’s walk through how to do this. Go to the Dashboard and click **Connections**. Let’s choose **Social** and choose **Google** for this example. 

Click the name of the connection to see its settings.
Toggle the **Sync user profile attributes at each login** to the setting you want and click **Save**. 
</details>

<details>
  <summary>Root attributes</summary>

Because user profile root attributes are a new feature in Auth0, we’ve made it easy for you to transition from using `user_metadata` in the old way. We built a Rule in the **Enrich Profile** rule category named **Move user_metadata attributes to profile root attributes**. When you use this, the rule moves the attribute from your old metadata to the appropriately named root attribute and removes it from the user_metadata. 

Let’s look at this new Rule.

Note that this rule will be executed on each login event. For signup scenarios, you should only consider using this rule if you currently use a custom signup form or Authentication Signup API, as these signup methods do not support setting the root attributes.
</details>

<details>
  <summary>Other tabs in the Dashboard</summary>

Now, let’s go back to our new user and walk through the other information you can view in the Dashboard.

In the **Identity Provider Attributes** section you’ll find all the information retrieved from each identity provider.

The **Devices** tab lists the devices with which the user has requested authentication. Authenticating via a device links the device to the user's account; login details for the user are associated with any Refresh Token assigned to that device. To revoke the Refresh Token, click Unlink next to the device.

The History tab displays a log of the user's account activity for the past 2 days. The logs include information about:

* Events that have occurred
* When the events occurred
* The apps associated with the events
* The identity provider used for authentication
* The originating IP addresses for the events
* Where the events originated

The **Raw JSON** tab displays all of the information contained on the user's profile in JSON format so you can quickly view all of the available information about the user.

The **Authorized Applications** tab displays the applications that the user has been given permission to use. All users associated with a single Auth0 tenant are shared between the tenant's applications, and therefore have access to the applications. If you need to keep users separate and restrict their access to groups of applications, we recommend creating an additional tenant.

The **Permissions** tab lists the permissions assigned to the user. You can assign permissions here.
</details>

<details>
  <summary>Roles</summary>

The **Roles** tab lists the roles assigned to the users. You create roles on another page and assign them here. The roles you create appear in the drop-down on this tab. 

In the upper right corner of the User Details page, click the **Actions** button to see the list of actions you can perform. You can block or delete the user, send them a verification email, change their email address, and change their password. Note that you should never change a user’s password unless you have a system set up to force them to change it themselves the next time they log in, except in development or test environments. 

In the next video, we’ll talk about how to brand your sign up, login, and password reset pages.
</details>

## Up next

<ul class="up-next">

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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>6:02</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/05_02-authorize-get-validate-id-tokens">Authorize: Get and Validate ID Tokens</a>
    <p>How to get and validate ID Tokens before storing and using them. </p>
  </li>

</ul>
