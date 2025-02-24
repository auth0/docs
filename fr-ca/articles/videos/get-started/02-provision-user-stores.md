---
description: How user profiles are provisioned within an Auth0 tenant.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Provision: User Stores

Learn how user profiles are provisioned within an Auth0 tenant. Users can come from a multitude of places: directly through creating an account using self sign-up, indirectly through using their favorite trusted social media platform, or collectively through a trusted enterprise directory. Auth0 makes it simple to quickly connect your tenant to multiple types of user stores. We group these users stores into three categories: database, social, and enterprise.

<div class="video-wrapper" data-video="qmqik9b6vk"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

  In this video, we will show you how user profiles are provisioned within an Auth0 tenant. Users can come from a multitude of places: directly through creating an account using self sign up, indirectly through using their favorite trusted social media platform, or collectively through a trusted enterprise directory.

  Auth0 makes it simple to quickly connect your tenant to multiple types of user stores. We group these users stores into three categories: database, social, and enterprise.

  * Database connections solve many traditional username and password based scenarios. By default, Auth0 offers identity storage out of the box that can be leveraged to manage the burden of storing user credentials safely and securely. Auth0 is also capable of providing proxies to existing legacy identity stores.

  * Social connections give users a simplified registration and login experience by using an existing authentication from a social network provider like Facebook, Twitter, or Google. Not only are popular social networks supported but close to 40 business, professional and industry-based connections are available. In fact, any OAuth2-conformant identity provider can be configured as a user store.

  * Finally, Enterprise connections allow business customers or partners to manage their own users within an Auth0 tenant. This is a very powerful feature that allows any set of businesses to collaborate in a secure way. 
</details>

<details>
  <summary>User store connections in the Dashboard</summary>

  Auth0 can be configured for any number and combination of connections to provide user identity for applications. Auth0 sits between the applications and their sources of users, which adds a level of abstraction so the application is isolated from any changes to and idiosyncrasies of each source's implementation.

  Now let’s dive a little deeper and discover how to establish each type of user store connection directly in the Auth0 Dashboard. This can be accomplished independently of any modifications or implementation within an application.

  First, let’s take a look at how to jump right in and authenticate users via username and password using infrastructure provided by Auth0. Out-of-the-box, each Auth0 tenant is preconfigured with an authentication database connection. This connection provides the best performance for the authentication process since all data is stored in Auth0.

  The Auth0-hosted database is highly secure. Passwords are never stored or logged in plain text but are hashed with bcrypt. Varying levels of password security requirements can also be enforced.

  The default database can be found on the Auth0 Dashboard for your tenant. From the Dashboard, click the **Connections** link in the left-hand navigation menu which will expand a list of the available connection types. Click **Database** and a list of all database connections will be displayed.

  As you can see, a database connection named **Username-Password-Authentication** is already available. By clicking the name of the connection we are taken to the configuration section for this database.

  The database configuration is split into a series of tabs: **Settings**, **Password Policy**, **Custom Database**, **Applications**, and **Try Connection**.

  By default, database connections authenticate users using their email and password. If you require the use of usernames, it can be enabled on the settings tab as well as setting minimum and maximum lengths for the username.

  There is also the ability to disable new user sign ups. This prevents new accounts from being created in the database by user-facing dialogs. Users can still be created using the Management API or directly in the Dashboard. 

  There is also a way to completely delete this database. Be careful though, as is mentioned, this is a destructive operation that is not reversible.
</details>

<details>
  <summary>Passwords</summary>

  Finally, we see an option to import users to Auth0. I will cover how this is used in a future video on migrations.

  On the password policy tab are several settings that allow you to align this database with your company password policy. Even if you do not have a password policy currently, it is worth considering each of the options available on this tab.

  By default, Auth0 has configured the password strength to a quality of Good which at a minimum requires a length of 8 characters containing both upper and lower case letters, numbers and special characters. For convenience, a tester is available that allows you to test the user experience of these settings.

  The password history policy, when enabled, will prevent users from reusing passwords they have previously used. Up to 24 previous passwords can be saved in the history.

  Enabling the password dictionary prevents the use of 10,000 of the most common passwords. There is even an option to add custom values to this list that might not be obvious like company names or a list of conference rooms in your building.

  The personal data option ensures that no data contained in the user's profile is used in the password as well.
</details>

<details>
  <summary>Custom Database</summary>

  The **Custom Database** tab allows you to configure this database connection to connect to an external database that is not managed by Auth0. This is useful for organizations who have data retention policies that do not allow external storage of data. For information on configuring a custom database connection, see the documentation linked below.

  I will talk more about custom database connections in a future video.
</details>

<details>
  <summary>Applications</summary>

  The **Applications** tab show us a list of applications that are currently using this database connection. Enabling or disabling an apps ability to use this connection is as simple a flipping a switch.
</details>

<details>
  <summary>Try connection</summary>

  Finally, the **Try Connection** tab will allow us to try out the database connection in a special test application configured just for this connection.

  Using this test application, we can verify all of our settings work as expected. Successfully authenticating will take us to a success page showing the user profile data that will be provided to applications using this database connection.

  Of course, from the database list, we can easily create a new database connection. You are free to create as many database connections as you need to support all of your applications and users.
</details>

<details>
  <summary>Summary</summary>

  In a future video, I will show you two powerful ways to add your existing users using either bulk imports or a more gradual migration using custom database connections.

  Next, let’s look at how to connect applications to social login providers. Auth0 offers simple integrations with dozens of popular social login providers. Additionally, you can add any OAuth2 Authorization Server you need.

  Social logins bring single sign-on semantics to end users. Using existing login information from a social network provider like Facebook, Twitter, or Google, the user can sign into an application instead of creating a new account specifically for that application. This simplifies registrations and logins for end users.

  Social login connections can be found on the Auth0 Dashboard. From the Dashboard, click the **Connections** link in the left-hand navigation menu which will expand a list of the available connection types. Click **Social** and a list of all available social connections will be displayed.
</details>

## Up next

<ul class="up-next">

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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/10-logout">Logout</a>
    <p>How to configure different kinds of user logout behavior using callback URLs. </p>
  </li>

</ul>

## Previous video

<ul class="up-next">
  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>8:33</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/01-architecture-your-tenant">Architect: Your Tenant</a>
    <p>What an Auth0 tenant is and how to configure it in the Auth0 Dashboard.</p>
   </li>

</ul>

