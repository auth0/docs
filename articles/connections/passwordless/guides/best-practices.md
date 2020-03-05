---
title: Passwordless Connections Best Practices
description: Passwordless Connections Best Practices
toc: true
topics:
    - connections
    - passwordless
    - authentication
    - concept
---
# Passwordless Connections Best Practices

## Implementing login 

You can implement passwordless authentication by redirecting to Auth0's [Universal Login](/connections/passwordless/guides/universal-login) or by [Embedding Login](/connections/passwordless/guides/embedded-login) in your application.

We always recommend that [you implement Universal Login](guides/login/universal-vs-embedded).

## SMS and email as authentication factors

Auth0's passwordless implementation enables authenticating users with a single factor. That single factor can be one-time-use code sent by email or sms, or a magic link sent by email.

Even if using email or SMS can be more secure than a weak password, they have known issues:

-  Phone numbers are not sufficient for user authentication. The SS7 phone routing system used by cellular networks [has verified weaknesses](https://thehackernews.com/2017/05/ss7-vulnerability-bank-hacking.html) which have led to it not being recommended as an authentication factor. There are many attack vectors available, ranging from the use of social engineering, to swapping sim cards and buying access to the SS7 network. 

- Having an email address is not sufficient for user authentication (aliases, forwarding, multiple users in one account are all examples). Email providers vary in their security practices and some do not require any establishment of a user's identity. SMTP is a very old protocol, and many providers still route SMTP traffic unencrypted leading to an increased chance of an interception attack. 

We recommend that if you use passwordless authentication, you also implement [Multi-factor Authentication (MFA)](/multifactor-authentication) with a different factor when the user performs a security-sensitive operation.

## Preventing Phishing Attacks

A possible phishing attack could look like:

1. The user clicks a link in a malicious email or website.
1. The user lands in the attacker's site, where they are prompted to enter their phone number to authenticate.
1. The user enters the phone number, and the attacker enters the same phone number in the legitimate application.
1. The legitimate application sends an SMS to the user.
1. The user types the one-time-use code in the attacker's website.
1. The attacker can now login to the legitimate website.

To decrease the chances of success for this attack, the user should expect that the SMS clearly identifies the application. You should configure the SMS template so it mentions the tenant name and/or the Application Name:

```text
Your verification code for accessing's Acme @@application.name@@ is @@password@@
```

## Preventing brute force attacks 

Auth0 has the following protections against brute force attacks:

* Only the most recent one-time-use code (or link) issued will be accepted. Once the latest one is issued, any others are invalidated. Once used, the latest one is also invalidated.
* Only three failed attempts to input any single one-time-use code are allowed. After this, a new code will need to be requested.
* The one-time-use code issued will be valid for three minutes (by default) before it expires. 

If you choose to extend the amount of time it takes for your one-time-use code to expire, you should also extend the length of the one-time code. Otherwise, an attacker has a larger window of time to attempt to guess a short code.

The one-time-use code expiration time can be altered in the passwordless connection settings in the [Dashboard](${manage_url}/#/connections/passwordless).

## Link accounts

Users might want to authenticate using different passwordless factors during their lifetime. For example, they could initially sign up with an SMS, and later start authenticating with an email. You can achieve that by enabling them to link their different profiles using [account linking](/users/concepts/overview-user-account-linking).

<%= include('../_includes/_rate_limit_server_side') %>
