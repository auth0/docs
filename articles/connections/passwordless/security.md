---
title: Passwordless Security
---

# Security with Passwordless Authentication

Paragraph about stuff. Your needs might vary. Something require extreme security, some less security, and it's more about having distinct users

## Email
With email-based authentication, a code is sent to the user's email address to establich possesion of that email account.

Ultimately, you're reliant on the security of the email provider itself, and you're trusting that the user's account is being satisfactorally secured. Some providers can include multifactor authentication and strong passwords, others may only provide the most rudimentary of security. The content of the email is also open to prying eyes at the email provider, and potentially in transit.

You also do not have control over the user's client -- potentially including an unlocked cell phone or an insecure browser connection -- so you need to factor that into the level of trust you have for this mechanism.

Using email for passwordless authentication at best only establishes that the user has control over that email account, and includes some risk of interception via insecure email practices. Use this mechanism with caution.

## SMS
Passwordless SMS is predicated on the user's ability to receive a one-time code on their mobile device to be entered into the website. This establishes possession of the phone number, and presumably a consistant identity for the user.

Unfortunately, there are a few attack vectors for this, as outlined by [NIST](link here). Risks include the phone number being reassigned, and even something about backend attacks. NIST discourages the use of SMS for new applications.

For now, SMS authentication is probably sufficient for applications in which you're merely trying to associate a phone number, and don't have the risk of compromised data or application security.

## Guardian
Passwordless Guardian is designed to strongly prove that the user has possession of their Guardian Authenticator. 

For push notifications, Guardian uses RSA key-based authentication. A private key is generated on the device during enrollment, and the associated public key is sent to the Guardian backend. Subsequent login requests use this public/private key pair for authentication, confirming that the Guardian Authenticator is the same one.

Note that Guardian uses [TOTP](link) authentication as a backup mechanism, in case there are any communication problems (for example, if you're on an airplane). This out-of-band authentication is fairly robust and secure, but it does rely on a different mechanism than the key-based authentication above. You may want to factor that into your security decision.

## TouchID

