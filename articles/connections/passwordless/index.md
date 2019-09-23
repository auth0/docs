---
title: Passwordless Authentication
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
# Passwordless Authentication

<dfn data-key="passwordless">Passwordless</dfn> connections allow users to log in without the need to remember a password. Instead, users enter their mobile phone number or email address and receive a one-time code or link, which they can then use to log in.

When a user authenticates via Passwordless, the user is attached to the connection using Auth0 as the Identity Provider (IdP). Since you can't force users to use the same mobile phone number or email address every time they authenticate, users may end up with multiple user profiles in the Auth0 datastore; you can link multiple user profiles through [account linking](/extensions/account-link).

Passwordless differs from [Multi-factor Authentication (MFA)](/multifactor-authentication) in that only one factor is used to authenticate a user&mdash;the one-time code or link received by the user. If you want to require that users log in with a one-time code or link **in addition** to another factor (e.g., username/password or a social Identity Provider, such as Google), see [Multi-factor Authentication (MFA)](/multifactor-authentication).

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
      <h3>SMS</h3>
      Send one-time-use codes to users' entered mobile phone number using:
      <ul>
        <li><a href="/dashboard/guides/connections/configure-passwordess-sms">Twilio</a></li>
        <li><a href="/dashboard/guides/connections/sms-gateway">your own SMS gateway</a></li>
      </ul>
      <h4>Customization</h4>
      For SMS, you can customize the following properties:
      <ul>
        <li>Message text and syntax (Markdown or <a href="/email/liquid-syntax">Liquid</a>)</li>
        <li>Message language</li>
        <li>One-time-use code length</li>
        <li>One-time-use code expiration period</li>
        <li>Whether to allow user sign-up via passwordless</li>
      </ul>
      <h4>User experience</h4>
      When using passwordless authentication with SMS, users:
      <ol>
        <li>
          Provide a mobile phone number instead of a username/password combination.
          <br />
          <img src="/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png" alt="Provide Mobile Phone Number" />
        </li>
        <li>
          Receive a one-time-use code via SMS.
          <br />
          <div class="phone-mockup">
            <img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="Receive Code via SMS"/>
          </div>
        </li>
        <li>
          Enter the one-time-use code on the login screen to access the application.
          <br />
          <img src="/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png" alt="Enter Code for SMS" />
        </li>
      </ol>
    </div>
    <div id="email" class="tab-pane">
      <h3>Email</h3>
      Send users one-time-use codes or magic links using:
      <ul>
        <li><a href="/email/providers#configure-mandrill">Mandrill</a></li>
        <li><a href="/email/providers#configure-amazon-ses">AWS</a></li>
        <li><a href="/email/providers#configure-sendgrid">Twilio SendGrid</a></li>
        <li><a href="/email/providers#configure-sparkpost">SparkPost</a></li>
        <li><a href="/email/providers#configure-a-custom-smtp-server">your own custom SMTP email provider</a></li>
      </ul>
      <h4>Customization</h4>
      For emails, you can customize the following properties:
      <ul>
        <li>Email template and syntax (HTML or <a ref="/email/liquid-syntax">Liquid</a>)</li>
        <li>Message language</li>
        <li><a href="/email/templates">Email variables</a></li>
        <li>One-time-use code length</li>
        <li>One-time-use code expiration period</li>
        <li>Whether to allow user sign-up via passwordless</li>
      </ul>
      <h4>User experience</h4>
      When using passwordless authentication with email, users:
      <ol>
        <li>
          Provide an email address instead of a username/password combination.
          <br />
          <img src="/media/articles/connections/passwordless/passwordless-email-request-web.png" alt="Provide Email Address" />
        </li>
        <li>
          Depending on how you have configured your passwordless connection, receive either a one-time-use code or magic link via email.
          <br />
          <div class="code-picker">
            <div class="languages-bar">
              <ul>
                <li><a href="#code" data-toggle="tab">Code</a></li>
                <li><a href="#link" data-toggle="tab">Magic link</a></li>
              </ul>
            </div>
            <div class="tab-content">
              <div id="code" class="tab-pane active">
                <img src="/media/articles/connections/passwordless/passwordless-email-receive-code-web.png" alt="Receive Code via Email">
              </div>
              <div id="link" class="tab-pane">
                <img src="/media/articles/connections/passwordless/passwordless-email-receive-link.png" alt="Receive Magic Link via Email">
              </div>
            </div>
          </div>
        </li>
        <li>
        Enter the one-time-use code on the login screen (or click the magic link in the email) to access the application.
        </li>
      </ol>
    </div>
  </div>
</div>

## Implement Passwordless

### Recommended: Universal Login + Lock (with Passwordless)

We strongly recommend implementing passwordless with <dfn data-key="universal-login">[Universal Login](/universal-login</dfn>, which redirects users to a central domain, through which authentication is performed before redirecting users back to your application. In fact, if you are building a Native application, which uses device-specific hardware and software, Universal Login is the only way to go.

* [Universal Login + Lock (with Passwordless)](/connections/passwordless/guides/implement-universal-login-lock-passwordless): Learn how to set up a passwordless connection and configure your login page using the Classic Universal Login experience with the Lock (with Passwordless) template.

### Alternative

::: warning
If building a Native application, no alternatives exist.
:::

* [Embedded Login + Lock (with Passwordless)](/connections/passwordless/guides/configure-login-page): Learn how to set up a passwordless connection and configure your login page using an Embedded Login form with the Lock (with Passwordless) widget.

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

## Best practices

* Use the [Universal Login](/universal-login) [Classic Experience](/universal-login/classic) with the Lock (with passwordless) template for your login page.

## Keep reading

* [Use Cases: Rules with Passwordless](/connections/passwordless/concepts/sample-use-cases-rules)
* [Relevant API Endpoints](/connections/passwordless/reference/relevant-api-endpoints)
* [Set Up a Passwordless Connection: SMS](/dashboard/guides/connections/configure-passwordess-sms)
* [Set Up a Passwordless Connection: Email](/dashboard/guides/connections/configure-passwordess-email)
* [Set Up Login Page: Universal Login + Lock (with passwordless)]()
* [Set Up Login Page: Universal Login + Custom UI + Auth0.js]()
* [Set Up Login Page: Embedded Login + Lock (with passwordless)](/connections/passwordless/configure-login-page)
* [Troubleshooting](/connections/passwordless/reference/troubleshoot)