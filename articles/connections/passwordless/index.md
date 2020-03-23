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

::: note
You cannot create passwordless users from the Dashboard. Create then directly from the [Management API](/api/management/v2#!/Users/post_users) if signup is disabled. In the **Connection** field, use **email** for passwordless users using an email address and **sms** for passwordless users using a mobile phone number.
:::

Passwordless differs from Multi-factor Authentication (MFA) in that only one factor is used to authenticate a user&mdash;the one-time code or link received by the user. If you want to require that users log in with a one-time code or link **in addition** to another factor (e.g., username/password or a social Identity Provider, such as Google), see [Multi-factor Authentication (MFA)](/multifactor-authentication).

## Benefits

The benefits of using Passwordless authentication include:

* Improved user experience, particularly on mobile applications, because users only need an email address or mobile phone number to sign up.

* Enhanced security: Passwords are a major vulnerability as users reuse passwords and are able to share them with others. Passwords are the biggest attack vector and are responsible for a significant percentage of breaches. They also lead to attacks such as credentials stuffing, corporate account takeover, and brute force attacks.

* Reduces the total cost of ownership, as managing passwords is expensive (implementing password complexity policies, password expiration, password reset processes, password hashing and storing, breached password detection).

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

When using passwordless authentication with SMS, users:

1. Provide a mobile phone number instead of a username/password combination.

 ![Provide Mobile Phone Number](/media/articles/connections/passwordless/passwordless-sms.png)

2. Receive a one-time-use code via SMS.

3. Enter the one-time-use code on the login screen to access the application.

</div>
    <div id="email" class="tab-pane">

### Email

When using passwordless authentication with email, users:

1. Provide an email address instead of a username/password combination.

![Provide Email Address](/media/articles/connections/passwordless/passwordless-email.png)

2. Depending on how you have configured your passwordless connection, receive either a one-time-use code or magic link via email.

3. Enter the one-time-use code on the login screen (or click the magic link in the email) to access the application.

    </div>
  </div>
</div>

## Implement Passwordless

To implement passwordless you'll need to make two key decisions:

- Which authentication factor you want to use (SMS or Email with one-time-use code, Email with Magic Link).
- If you are going to implement authentication using *Embedded Login* or *Universal Login*.

### Authentication Factor

The main driver for picking the authentication factor is user experience, and that depends on your application and its target audience. If the application will run on mobile phones, it is highly likely that users will be able to receive SMS messages. If it's an internal web application that is used in an environment where users cannot have their mobile phones with them, Email would be the only choice.

If you decide to use Email, then you need to decide between an one-time-use code or a magic link. We recommend using one-time-use code as the login flow is more predictable for end users. To learn more refer to the following documents:

  - [Passwordless using Email and one-time-use code](/connections/passwordless/guides/email-otp)
  - [Passwordless using Email and Magic Links](/connections/passwordless/guides/email-magic-link)
  - [Passwordless using SMS](/connections/passwordless/guides/sms-otp)

### Implementing Login 

Auth0 supports two way of implementing authentication: *Embedded Login* and *Universal Login*.

The industry is aligned in that Universal Login is the proper way to implement authentication in all apps, but in the case of Native Applications, sometimes customers prefer to implement Embedded Login for UX reasons. 

  - [Passwordless Authentication with Universal Login](/connections/passwordless/guides/universal-login)
  - [Passwordless Authentication with Embedded Login](/connections/passwordless/guides/embedded-login)

## Keep reading

 * [Best practices for Passwordless Authentication](/connections/passwordless/guides/best-practices)
 * [API Documentation](/connections/passwordless/reference/relevant-api-endpoints)
 * [Migrating from deprecated Passwordless endpoints](/migrations/guides/migration-oauthro-oauthtoken-pwdless)
