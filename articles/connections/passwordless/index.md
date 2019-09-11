---
title: Passwordless Connections
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

<dfn data-key="passwordless">Passwordless</dfn> connections in Auth0 allow users to login without the need to remember a password. Instead, users enter their mobile phone number or email address and receive a one-time code or link, which they can then use to log in.

Passwordless differs from [Multi-factor Authentication (MFA)](/multifactor-authentication) in that only one factor is used to authenticate a user&mdash;the one-time code or link received by the user. If you want to require that users use a one-time code or link **in addition** to another method of authentication, see [Multi-factor Authentication (MFA)](/multifactor-authentication).

When a user authenticates via Passwordless, the user is attached to the Passwordless connection using Auth0 asthe Identity Provider (IdP). Since you can't enforce that users use the same email address every time they authenticate, users can end up with multiple user profiles in the Auth0 datastore. Combining multiple user profiles will require [account linking](/extensions/account-link).

## Benefits

The benefits of enabling passwordless connections include:

* Improved user experience, particularly on mobile applications, since users only need an email address or phone number to sign up and the credential used for authentication is automatically validated after sign-up.

* Enhanced security since users avoid the insecure practice of using the same password for many purposes.

* Less effort for you since you will not need to implement a password reset procedure.

* Use of Auth0 as the Identity Provider (IdP), which provides a centralized location for [user management](/users).

## User experience

When using passwordless authentication, users:

1. Provide an email address or mobile phone number instead of a login/password combination.

| SMS | Email |
| ![Provide Mobile Phone Number](/media/articles/connections/passwordless/passwordless-email-request-web.png) | ![Provide Email Address](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png) |

2. Depending on which piece of information they provide and how you have configured your passwordless connection, receive either a one-time-use code or magic link via either SMS or email.

| SMS (Code) | Email (Code) | Email (Magic Link) |
| <div class="phone-mockup"><img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="Receive Code via SMS"/></div> | ![Receive Code via Email](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png) | ![Receive Magic Link via Email](/media/articles/connections/passwordless/passwordless-email-receive-link.png) |

3. Enter the one-time-use code on the login screen or click the magic link to access your application.

| SMS (Code) | Email (Code) |
| ![Enter Code for SMS](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png) | ![Enter Code for Email](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png) |

## Supported authentication methods

Auth0 Passwordless connections support one-time-use codes sent via SMS or email, and magic links sent via email.

## SMS

Send users one-time-use codes using:

- [your own SMS gateway](/dashboard/guides/connections/sms-gateway)
- [Twilio](/dashboard/guides/connections/configure-passwordess-sms)

### Customization

For SMS, you can customize the following properties:

- Message text and syntax (Markdown or [Liquid](/email/liquid-syntax)
- Message language
- One-time-use code length
- One-time-use code expiration period
- Whether to allow user sign-up via passwordless

## Email 

Send users one-time-use codes or magic links using:

- [your own custom SMTP email provider](/email/providers#configure-a-custom-smtp-server)
- [Mandrill](/email/providers#configure-mandrill
- [AWS](/email/providers#configure-amazon-ses)
- [Twilio SendGrid](/email/providers#configure-sendgrid)
- [SparkPost](/email/providers#configure-sparkpost)

### Customization

For emails, you can customize the following properties:

- Email template and syntax (HTML or [Liquid](/email/liquid-syntax)
- Message language
- Email variables (/email/templates)
- One-time-use code length
- One-time-use code expiration period
- Whether to allow user sign-up via passwordless

## Implementing Passwordless

## Recommended: Universal Login + Lock (with Passwordless)

We strongly recommend implementing passwordless with <dfn data-key="universal-login">[Universal Login](/universal-login</dfn>, which redirects users to a central domain, through which authentication is performed before redirecting users back to your application. In fact, if you are building a Native application, which uses device-specific hardware and software, Universal Login is the only way to go.

* [Universal Login + Lock (with Passwordless)](/connections/passwordless/guides/implement-universal-login-lock-passwordless): Learn how to set up a passwordless connection and configure your login page using the Classic Universal Login experience with the Lock (with Passwordless) template.

## Alternative

::: warning
If building a Native application, no alternatives exist.
:::

* [Embedded Login + Lock (with Passwordless)](/connections/passwordless/guides/configure-login-page): Learn how to set up a passwordless connection and configure your login page using an Embedded Login form with the Lock (with Passwordless) widget.

## Limitations

Passwordless connections have several limitations:

* Native applications, which use device-specific hardware and software, **must** use [Universal Login](/universal-login).
*  Only the Universal Login](/universal-login) [Classic Experience](/universal-login/classic) currently supports passwordless.
* Using [Embedded Login](/login/embedded) with any application type leaves your application vulnerable to cross-origin resource sharing (CORS) attacks and requires the use of [Auth0 Custom Domains](/custom-domains), which is a paid feature.
*  Since you can't enforce that users enter the same email address every time they authenticate, users can end up with multiple user profiles in the Auth0 data store. Combining multiple user profiles will require [account linking](/extensions/account-link).
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