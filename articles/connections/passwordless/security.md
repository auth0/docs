---
title: Passwordless Security
---

# Security with Passwordless Authentication

As the leader in Passwordless Authentication, Auth0 is happy to offer a variety of options to fit every need. Each passwordless mechanism operates under slightly different principles, and some may not be appropriate for your security posture. Please read the details below, and take careful note of the security implications of each.

## Email
With email-based passwordless authentication, a code is sent to the user's email address to show that the user has access to that email account. The possession of the email account is used to authenticate the user's identity.

The security implication here is that you're reliant on the security of the email provider itself, and that you're trusting that the user's account is being satisfactorily secured. Some providers may include multifactor authentication and strong passwords, but others may only provide the most rudimentary of security. The content of the email is also open to prying eyes at the email provider, and potentially in transit.

You also do not have control over the user's client -- potentially including an unlocked cell phone or an insecure browser connection -- so you need to factor that into the level of trust you have for this mechanism.

Ultimately, using email for passwordless authentication at best only establishes that the user has control over that email account, and includes some risk of interception via insecure email practices. Use this mechanism with caution.

## SMS
SMS-based passwordless authentication is predicated on the user's ability to receive a one-time code on their mobile device which will be entered into the website. This establishes possession of the phone number, and presumably a consistent identity for the user.

Unfortunately, there are a few attack vectors for this, as outlined by [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html). Risks include the phone number being reassigned, and even direct [attacks against the underlying telecommunications infrastructure](https://www.theguardian.com/technology/2016/apr/19/ss7-hack-explained-mobile-phone-vulnerability-snooping-texts-calls). NIST discourages the use of SMS for new applications, and it expected that they will deprecate its usage for any authentication in the future.

For now, SMS authentication is potentially sufficient for applications in which you're merely trying to associate a phone number, and don't have the risk of compromised data or application security.  

## Magic Links
Magic links are links that can be delivered to the user either via email or SMS, allowing single-click verification and authentication. The use of magic links has the same security considerations as for email-based and SMS-based passwordless mechanisms as noted above.

## Guardian
Passwordless Guardian is designed to strongly prove that the user has possession of their Guardian Authenticator.

For push notifications, Guardian uses RSA key-based authentication. A private key is generated on the device during enrollment, and the associated public key is sent to the Guardian backend. On subsequent login requests, the Guardian backend uses this public/private key pair for authentication, confirming that the Guardian Authenticator is the same one that originally enrolled. 

Note that Guardian uses [TOTP](https://tools.ietf.org/html/rfc6238) authentication as a backup mechanism, in case there are any communication problems (for example, if you're on an airplane). This out-of-band authentication is fairly robust and secure, but it does rely on a different mechanism than the key-based authentication above. You may want to factor that into your security decision.

Also note that Guardian can be configured to use SMS as an optional communication channel, in addition to the secure push notifications. You may want to disable the SMS option in order to avoid the security consequences as shown above.

## TouchID
TouchID-based passwordless authentication similarly uses key-based authentication to establish the identity of the mobile device. The private key on the device is locked behind the registered fingerprint.
