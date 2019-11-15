---
title: Passwordless Connections
description: Learn about passwordless connections, Auth0-supported passwordless methods of authentication, and how to implement passwordless authentication with Auth0.
toc: true
url: /connections/passwordless
topics:
    - connections
    - passwordless
    - authentication
contentType:
    - index
    - concept
useCase: customize-connections
---
# Passwordless Connections

<dfn data-key="passwordless">Passwordless</dfn> connections allow users to log in without the need to remember a password. Instead, users enter their mobile phone number or email address and receive a one-time code or link, which they can then use to log in.

When a user authenticates via Passwordless, the user is attached to the connection using Auth0 as the Identity Provider (IdP). Since you can't force users to use the same mobile phone number or email address every time they authenticate, users may end up with multiple user profiles in the Auth0 datastore; you can link multiple user profiles through [account linking](/extensions/account-link).

A passwordless connection is another type of connection separate from any existing database, social, or Enterprise connections. Even though a user from an Auth0 user database or social provider might share the same email address, the identity associated with their passwordless connection is distinct. As with linking multiple email addresses or mobile phone numbers used for the passwordless connection, [account linking](/extensions/account-link) can also be used to associate a passwordless identity with identities from other types of connections.

Also note that passwordless users cannot currently be created from the Dashboard and will need to be created from the [Management API](/api/management/v2#!/Users/post_users) if signup is disabled or users need to be created directly. The connection field should be "email" for passwordless users based on an email address and "sms" for passwordless users based on a mobile phone number.

Passwordless differs from Multi-factor Authentication (MFA) in that only one factor is used to authenticate a user&mdash;the one-time code or link received by the user. If you want to require that users log in with a one-time code or link **in addition** to another factor (e.g., username/password or a social Identity Provider, such as Google), see [Multi-factor Authentication (MFA)](/multifactor-authentication).

## Benefits

The benefits of enabling passwordless connections include:

* Improved user experience, particularly on mobile applications, because users only need an email address or mobile phone number to sign up, and the credential used for authentication is automatically validated after sign-up.

* Enhanced security because users avoid the insecure practice of using the same password for many purposes.

* Less effort for you because you will not need to implement a password reset procedure.

* Use of Auth0 as the Identity Provider (IdP), which provides a centralized location for [user management](/users).

## Supported authentication methods

Auth0 Passwordless connections support one-time-use codes sent via SMS or email, and magic links sent via email.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#sms" data-toggle="tab">SMS</a></li>
      <li><a href="#email" data-toggle="tab">Email</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="sms" class="tab-pane active">

### SMS

Send one-time-use codes to users' entered mobile phone number using:

* <a href="/dashboard/guides/connections/configure-passwordess-sms">Twilio</a>
* <a href="/connections/passwordless/guides/use-sms-gateway-passwordless">your own SMS gateway</a>

#### Customization

For SMS, you can customize the following properties:

* Message text and syntax (Markdown or [Liquid](/email/liquid-syntax))
* Message language
* One-time-use code length
* One-time-use code expiration period
* Whether to allow user sign-up via passwordless

#### User experience

When using passwordless authentication with SMS, users:

1. Provide a mobile phone number instead of a username/password combination.

 ![Provide Mobile Phone Number](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

2. Receive a one-time-use code via SMS.

<div class="phone-mockup">
  <img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="Receive Code via SMS"/>
</div>

3. Enter the one-time-use code on the login screen to access the application.

![Enter Code for SMS](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

</div>
    <div id="email" class="tab-pane">

### Email

Send users one-time-use codes or magic links using:

* [Mandrill](/email/providers#configure-mandrill)
* [AWS](/email/providers#configure-amazon-ses)
* [Twilio SendGrid](/email/providers#configure-sendgrid)
* [SparkPost](/email/providers#configure-sparkpost)
* [your own custom SMTP email provider](/email/providers#configure-a-custom-smtp-server)

#### Customization

For emails, you can customize the following properties:

* Email template and syntax (HTML or [Liquid](/email/liquid-syntax)
* Message language
* [Email variables](/email/templates)
* One-time-use code length
* One-time-use code expiration period
* Whether to allow user sign-up via passwordless

#### User experience

When using passwordless authentication with email, users:

1. Provide an email address instead of a username/password combination.

![Provide Email Address](/media/articles/connections/passwordless/passwordless-email-request-web.png)

2. Depending on how you have configured your passwordless connection, receive either a one-time-use code or magic link via email.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#code" data-toggle="tab">Code</a></li>
      <li><a href="#link" data-toggle="tab">Magic link</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="code" class="tab-pane active">

![Receive Code via Email](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)
    </div>
    <div id="link" class="tab-pane">
      ![Receive Magic Link via Email](/media/articles/connections/passwordless/passwordless-email-receive-link.png)
    </div>
  </div>
</div>

3. Enter the one-time-use code on the login screen (or click the magic link in the email) to access the application.

    </div>
  </div>
</div>

## Implement Passwordless

To implement passwordless authentication, you will need to:

1. Set up the passwordless connection in Auth0.
2. Set up your login page to work with Passwordless.
    * Universal Login + Lock (with passwordless)
    * Universal Login + Custom UI + Auth0.js
    * Embedded Login
3. Configure your application.

To learn how to set up a passwordless connection, configure your login page, and configure your application, see [Implement Passwordless Authentication](/connections/passwordless/guides/implement-passwordless).

## Limitations

Passwordless connections have several limitations:

* Native applications, which use device-specific hardware and software, **must** use [Universal Login](/universal-login).
*  Only the [Universal Login](/universal-login) [Classic Experience](/universal-login/classic) currently supports passwordless.
* Using [Embedded Login](/login/embedded) with any application type leaves your application vulnerable to cross-origin resource sharing (CORS) attacks and requires the use of [Auth0 Custom Domains](/custom-domains), which is a paid feature.
* Since you can't force users to use the same mobile phone number or email address every time they authenticate, users may end up with multiple user profiles in the Auth0 datastore; you can link multiple user profiles through [account linking](/extensions/account-link).
* With magic link transactions, both the initial request and its response must take place in the same browser or the transaction will fail. This is particularly relevant for iOS users, who cannot change their default web browser. For example, the user makes the request using Chrome, but iOS opens the magic link received via email using Safari. If this happens, the transaction fails.
* To use a custom SMTP email provider, the SMTP server must:
    - support LOGIN authentication
    - support TLS 1.0 or higher
    - use a certificate signed by a public certificate authority (CA)

### Limitations of One-Time Passwords

<%= include('../_otp-limitations') %>

## Best practices

* Use the [Universal Login](/universal-login) [Classic Experience](/universal-login/classic) with the Lock (passwordless) template for your login page.

## Keep reading

* [Sample Use Cases: Rules with Passwordless](/connections/passwordless/concepts/sample-use-cases-rules)
* [Relevant API Endpoints](/connections/passwordless/reference/relevant-api-endpoints)
* [Implement Passwordless Authentication](/connections/passwordless/guides/implement-passwordless)
* [Troubleshooting](/connections/passwordless/reference/troubleshoot)
