---
description: How to move existing users to an Auth0 user store using automatic migration, bulk migration, or both.
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Provision: Import Users

Learn how Auth0 allows you to move your existing users to an Auth0 user store and why you may want to use a combination of both automatic and bulk migration methods. Learn why it's a good idea to have an API between the cloud and your legacy database and how custom database scripts work.

<div class="video-wrapper" data-video="d0p3ai8gah"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

  Customers building new systems can easily take advantage of various types of user stores Auth0 supports to authenticate users. Now we will take a look at how Auth0 helps you import your existing users two ways: Automatic Migration and Bulk Migration. In this video we will show you the advantages to using both methods together and how to get the results you want.

  We’ve found that most customers don’t want to force their users to reset their passwords just because they chose to implement Auth0, so we’ve provided tools to help you move your users to a custom database as they authenticate over time or, depending on the algorithm you have used to hash the user’s passwords, you can bulk import the password hashes with the users. 

  Automatic migrations give your users a seamless migration experience that doesn’t require them to reset their passwords. You also benefit from only migrating active users, helping you to clean up your user data in the process. 

  Bulk migrations have the advantage of getting the migration done at the beginning in one effort and allow you to turn off your legacy system and remove legacy code sooner. If you are using a particular hashing algorithm and technique, you can even bulk migrate the passwords and not require a password reset.
</details>

<details>
  <summary>Auth0 Database Connections in the Dashboard</summary>

  Both Automatic and Bulk migration are supported using Auth0 Database Connections. After you create a database connection in the Dashboard, you enable user migration from that legacy database and create custom scripts to determine how the migration happens.

  First, you need to set up a custom database connection. Create a new database connection in the **Connections > Database** section of the Dashboard.

  Connect the database to the application. Navigate to the **Applications** tab of your database settings, under the **Applications Using This Connection** heading you can enable the database connection for each application.

  On the **Custom Database** page, enable the **Use my own database** option.

  On the **Settings** page for your database, enable the **Import Users to Auth0** option.
</details>

<details>
  <summary>Create API Front End to Your Database </summary>

  Next, if you don’t have an API already, we recommend that you create a simple API in front of your legacy database instead of allowing access directly from Auth0.

  Unless you have a private instance or enterprise cloud deployment, you probably don’t want to expose your entire database interface to the Auth0 IPs because those are shared IP addresses. Though you can whitelist Auth0 IPs, those IPs are shared in the cloud environment. 

  In compliance with the principle of least privilege, Auth0 recommends that you protect your database from too many actors directly talking directly to it. The easiest way to do that is to create a simple API endpoint that each script within Auth0 can call. Protect the API using an access token.  This access token can be created using the client-credentials grant. This grant type is for us in machine-to-machine contexts, like this one, where you don’t have the context of a particular user. 
</details>

<details>
  <summary>Custom Database Script Templates</summary>

  Next, we’ll show you how to use Auth0’s custom database script templates to perform certain actions on the user data stored in the database. 

  The script templates are pre-populated in the Dashboard script editor. The scripts cover Get User and Login.

  Here are some best practices that we’ve found work for most customers:

  * Set a `user_id` on the returned user profile that is consistent for the same user every time. This is important because if you set a random `user_id` in the `get_user` script, then call forgot password and change the password, the user will get duplicated every time they log in. In the non-migration scenario, if you set a random `user_id` you can end up with duplicate users for every login.

  * If using a username, ensure that you aren't returning the same email address for two different users in the `get_user` or `login` script. Auth0 will produce an error if you do this, but it is better to catch it in the script itself.

  * If setting `app_metadata`, call it `metadata` in the script. To support backwards compatibility, `app_metadata` is called `metadata` in `custom DB` scripts. If you don't use `metadata` in the script, you will get an error where `app_metadata` will work but if you use the API to merge `app_metadata` with a user, it will appear as if all of your metadata was lost. NOTE: `user_metadata` is not affected by this and can simply be called `user_metadata`.

  * Ensure you restrict access to that audience with a rule. As with any API that you create, if you create it solely for client credentials, then you will want to restrict access to the API in a rule. By default, Auth0 gives you a token for any API if you authenticate successfully and include the audience. Someone could intercept the redirect to authorize and add the audience to your legacy database API. If you don’t block this in a rule, they could get an access token.  You will also want to update the API to expect the subject claim of the token to end in `@clients`.

  * Make sure the `login` script and the `get_user` script both return the same user profile. Because of the two different flows (logging in, or using forgot password), if the `get_user` and `login` scripts return different user profiles, then depending on how a user migrates (either by logging in directly, or using the forgot password flow) they will end up with different profile information in Auth0.

  * If setting `app_metadata` or `user_metadata`, use a rule to fetch the metadata if it is missing. The metadata is not migrated until `https://YOUR_TENANT.auth0.com/login/callback` is called. However, the user credentials are migrated during the post to `https://YOUR_TENANT.auth0.com/usernamepassword/login`. 

    This means that if the flow is interrupted after the username password/login, but before login/callback, then they will have a user in the Auth0 database, but their app and user metadata are lost. It is really important, therefore, to create a rule that looks a lot like your `get_user` script to fetch the profile if app and user metadata are blank. This should only execute once per user at most and usually never.

  * Use a rule to mark users as migrated. This is not a hard requirement, but it does protect against one scenario in which a user changes their email address, then changes it back to the original email address. A rule should call out to the legacy database to mark the user as being migrated in the original database so that `get_user` can return false.
</details>

<details>
  <summary>Bulk Importing Users</summary>

  Next, let’s look at bulk importing users directly into the Auth0 database. It’s important to note that when you use Bulk Migration, you *can* migrate the user’s password if it was hashed using bcrypt with 10 salt rounds, otherwise you will have to force your users to reset their passwords.

  Before you launch the import users job, a database to which the users will be imported must already exist and it must be enabled for at least one application in your tenant. 

  You can then import a file containing your user data with our Management API. The file must have an array with the users' information in JSON format. You can use the `POST /api/v2/jobs/users/post_users_importsendpoint` to populate a database connection with the user information in the file. 

  The users import endpoint requires that your POST request use the `multipart/form-data` encoding type. See our documentation for a list of the parameters that must be part of the request. 

  There are some rate and file size limitations for bulk imports: 

  * Calls to the Management API are subject to rate limiting. The rate limits for this API differ depending on whether your tenant is free or paid, production or not. 
    * For all free and non-production tenants, you can have up to 2 requests per second and bursts up to 10 requests.
    * For paid tenants, you can have up to 15 requests per second and bursts up to 50 requests. 
    * The rate limits include calls made via Auth0 Rules. Note, that the limit is set by tenant and not by endpoint. For additional information about these endpoints, please consult the Management API explorer.
  * There is also an import JSON file size limitation of 500 kilobytes.  If your user database would result in a file larger than this, you will need to break the users up into chunks that keep each file smaller than 500 KB.

  Auth0 does provide an User Import/Export Extension however, we recommend that you use the Management API Bulk Migration for all but the most simple cases.

  After you’ve migrated your users to the Auth0 database, you can use the **List** or **Search** Management API endpoint to make sure the users are there. You can also view the users list in the Dashboard.

  We’ve found that customers often opt for a two-phased approach to user migration, employing Automatic Migration first in order to migrate as many active users as possible, and then turning off Automatic Migration and performing Bulk Migration for the users that remain.
</details>

<details>
  <summary>Summary</summary>
  
  After you have verified the migration of the final set of users, you can set the `login` and `get_user` scripts to simply `“return callback()”` in the Dashboard. Keep **Import Users to Auth0** enabled on the Settings page so that your users will be directed to the new database workflow.

  This gives your active users a nice experience by not forcing them to reset their passwords, even if your hashing algorithm is not compatible with bulk import, while still allowing you to decommission the legacy identity store.

  In the next video, we will take a look at user authentication.
</details>

## Up next

<ul class="up-next">

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

</ul>
