---
description: How to use email templates and customize error pages. 
classes: video-page
public: false
---
<!-- markdownlint-disable-->
# Brand: Emails and Error Pages

Learn how to use Auth0 email templates and make changes to the reply email address, subject, redirect URL, and URL lifetime. You can configure your email provider and customize how verify emails look. Learn how to use your own error pages.


<div class="video-wrapper" data-video="84wcgq7a75"></div>

## Video transcript

<details>
  <summary>Introduction</summary>

In the previous video we showed you how to add branding to your login pages using the universal login  Settings in the Auth0 Dashboard. In this video, we are going to show how easy it is to brand the rest of the things that your users might see, such as emails, and error pages.
</details>

<details>
  <summary>Email templates</summary>

First let’s take a look at email templates. 

We’ll start by choosing a template to customize. In this example, we’ll work on the **Change Password** template. This is the email that will be sent whenever a user requests a password change; the password will not be changed until the user follows the link in the email. 

Note that we enabled **Customize Password Reset Page** in the **Universal Login Password Reset** tab in the last video. If you haven’t done that yet, go ahead and do that now.

Enter all the information into the fields to determine the reply email address, subject, redirect URL, and URL lifetime. Email templates in Auth0 support [Liquid syntax](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers), and allow you to include a number of Auth0 provided common variables 

1. For the Reply Email Address, you can include any of the common variables like {{ application.name }}. For example: `{{ application.name }} <support@yourcompany.com>`.  For this field, however, you can not use liquid syntax as part of the email address itself.

2. For the Subject line, you can include any of the common variables like `{{ application.name }}` and `{{ user.email }}`. For example: Welcome to `{{ application.name }}!`.

3. For the Redirect URL, enter the URL that you want the user to be redirected to after the action finishes. You can use the `{{ application.name }}` and `{{ application.callback_domain }}` variables. 

4. The URL Lifetime default is set to 432,000 seconds which is 5 days. After that time has passed, the URL link will expire.

5. Click Save.

At the bottom, you can see the HTML code of message body. You can edit the HTML directly. You can also use common variables in the email message body. You can use liquid syntax in the body of the email to do everything&mdash;from just changing some of the text to be user specific, to using if/then statements to provide localization of the text. 
</details>

<details>
  <summary>Custom email providers</summary>

Now we will show you how easy it is to configure a custom email provider to use. In order to use a custom email template you will need to setup one of the out of box third-party email provider services, or provide credentials from any SMTP service that supports basic authentication. 

You can use an external email provider to manage, monitor, and troubleshoot your email communications. It’s as simple as opening the right ports and whitelisting inbound connections from specific IP addresses. Auth0 currently supports the following providers:

* Mandrill
* Amazon SES
* SendGrid
* SparkPost
* Or any Other SMTP provider (e.g., Gmail, Yahoo)

Note that you can only configure one email provider, which will be used for all emails.

You can also use your own SMTP server to send emails. This works well for testing your email templates without spamming your users. There are three requirements for the SMTP server:

* It must support LOGIN authentication.
* It must support TLS 1.0 or higher.
* And It must use a certificate signed by a public certificate authority (CA).

1. Open the **Custom Email Provider** page on the Auth0 Dashboard.
2. Click on **Use my own Email Provider**.
3. Click the **SMTP** logo.
4. Enter your SMTP server Host, Port, Username and Password in the appropriate fields.
5. Click **Save**.

Common SMTP ports include 25 and 587. Port 25 is generally reserved for unencrypted traffic and so should not be used; this is particularly important for emails from Auth0 since they often contain sensitive information. 

Now you can send a test email using the **SEND TEST EMAIL** button on the **Custom Email Provider** page of the Auth0 Dashboard. If you don't receive an email after a few minutes, check your dashboard logs for any failures.
</details>

<details>
  <summary>Custom error pages</summary>

Now we’re going to look at customizing error pages. 

By default, if your users encounter any problems at sign up or log in, Auth0 provides generic error pages, that includes the support URL and support email address, that's entered right here.

Down near the bottom of the page, under the **Error Pages** heading, you can select **Redirect users to your own error page** if desired

Using your own error pages allows you to add your branding (not Auth0’s) and provide user information about what your users should do next. To do this, you simply enter the URL for your error page.  When Auth0 redirects users to your own error pages, additional query parameters will be included in your URL, which provides additional information about the error that was encountered.

In the next video, we'll look at the user logout process.
</details>

## Up next

<ul class="up-next">

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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>2:20</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/get-started/07_02-brand-signup-login-pages">Brand: Sign Up and Login Pages</a>
    <p>How to use Universal Login to customize your sign up and login pages. </p>
  </li>

</ul>
