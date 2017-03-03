---
description: Frequently asked questions regarding Passwordless authentication.
---

# Passwordless Authentication FAQ

## *General Questions*

### When is Passwordless Authentication the best option for login? How does this feature improve user experience?

Surveys indicate that [59% of users use the same password across multiple sites](https://www.passwordboss.com/password-habits-survey-part-1/), since the number of username/password combinations a person must remember, if all were unique, is overwhelming. Despite the fact that this exposes uses to greater risk of security breaches, reusing passwords minimizes the user's need to reset forgotten passwords using cumbersome processes involving email verification.

Auth0's Passwordless Authentication, however, is a simple, easy to use process that allows users to log in securely *without* having to remember a secure password. Additionally, there is no password database acting as a target for theft.

### What are the limitations of Passwordless Authentication?

For sites/apps that users access every day, the Passwordless flow might feel a bit slower that entering a memorized username/password combination.

As with using a username/password combination, the Passwordless login is compromised if the email account/mobile device used associated with the acccount is as well (though this risk can be mitigated by using multifactor authentication).

### How difficult is it for users to get accustomed to Passwordless Authentication?

Passwordless Authentication, which enables a nearly effortless experience using *magic links*, SMS messages, and Apple's *Touch ID* feature, is so simple that most users are immediately accustomed to the new login process.

### How is Passwordless Authentication different from using a Social login?

With Social login, the user authenticates with a separate account they own. Therefore, the user does not need to create an additional username/password combination, and the app owner does not need to manage passwords.

Social logins are appropriate when you:

* implement the login using providers popular with users of your app;
* can gain additional features by integrating your app with the social provider's API.

Social logins can be confusing to some users, however, because of the need to log in to a site that is a separate entity from your app/site. This is then followed by a grant page, requesting the user for additional permissions to share their data.

Because confused users are more likely to abandon the sign up/login process, using Passwordless Authentication has the advantage of reducing this confusion and retaining users.

### How much does Auth0's Passwordless Authentication cost?

Passwordless Authentication is included with every Auth0 account, subscription, and plan.

## Configure and Use Passwordless Authentication

### How does authentication using *magic links* work?

A *magic link* is a link sent to the user's email address that, when clicked on, logs the user into your site/app.

### How does authentication using email work?

When a user logs in, they are sent an email containing an authentication code. The user must then enter the provided code into the app/site to log in.

### How does authentication using SMS work?

When a user logs in, they are sent an SMS message containing an authentication code. The user must then enter the provided code into the app/site to log in.

### How does authentication using Apple's *Touch ID* work?

Apple's *Touch ID* feature identifies users via its fingerprint scanner.

To enable this feature, the user completes a one-time enrollment process. Afterwards, the user provides their fingerprint to log in.

The Passwordless library uses the matched fingerprint to retrieve a private key that is saved in the iOS keystore. *Touch ID* then generates and signs a JWT using that private key and sends the JWT to Auth0. Auth0 then validates the JWT against the user's saved public key and returns the user's authentication token.

### Can I offer users the option of authenticating with email or SMS?

Yes. With [Auth0’s Javascript SDK](https://github.com/auth0/auth0.js), you have complete control of how Passwordless Authentication works with your site/app. You can easily implement a mixed-mode user experience and build a custom UI using the SDK.

Please note that the Passwordless Lock Widget does not yet support mixed-mode implementations.

### How does a user sign in using a *magic link* if they are using a device that doesn't have access to registered email account?

Without access to the registered email account, the user cannot access the *magic link* required to log in. If this is likely to be a common scenario (for example, a user might register using their personal email address and then attempt to log in using a machine that only has access to their work-related email account), you would want to consider using codes sent via email or SMS, since those can be accessed from one device and then utilized on another.

### How do I style the Passwordless Lock Widget?

The Passwordless Lock Widget accepts two appearance-related parameters:

* *primaryColor*: changes the background color
* *icon* accepts an image to be displayed

In addition to these two parameters, you can customize the widget by modifying its CSS.

For additional design control, we recommend implementing your own user interface and integrating it with any of the Passwordless Connections using the [Auth0 JavaScript SDK](https://github.com/auth0/auth0.js).

### What are my email/SMS provider options?

By default, your Passwordless Connection is set up to use Auth0's messaging provider. However, because this is limited in terms of functionality, we recommend that you set up an account with your own provider.

For email-based Passwordless logins, Auth0 supports:

* SendGrid
* Mandrill
* Amazon SES

For SMS-based Passwordless Authentication, Auth0 supports:

* Twilio

### Can I use a messaging provider that's not currently supported by Auth0?

You can [configure your own SMS gateway](/connections/passwordless/sms-gateway) to send messages containing authentication codes.

### Does the Passwordless Lock Widget support authentication with *TouchID*?

While the Passwordless Lock Widget doesn't currently support Passwordless Authentication using *Touch ID*, the standard Auth0 Lock Widget does.

### Can I use email/SMS-based Passwordless Authentication with *Touch ID*?

Yes, you can implement both email/SMS-based Passwordless Authentication and *Touch ID* by linking user identities associated with either implementation.

### What happens if a user changes their email address or phone number?

An administrator with the appropriate permissions can change a user's email address or phone number using the Auth0 Dashboard.

## *Security*

### What happens if an unauthorized party gains access to a user's email account?

Anyone with access to the user's email account will be able to login via that user's Passwordless Authentication method. As such, we recommend that you guard against this possibility by using multifactor authentication as well.

### What happens if an unauthorized party gains access to a user's SMS messages?

As with email, anyone with access to the user's email account will be able to login via that user's Passwordless Authentication method. Though many phones ship with additional protections (such as fingerprint readers or complex unlock code requirements) that make it less likely the unauthorized party gains access to the phone's data, we still recommend that you guard against this type of compromise by using multifactor authentication.

### What does Auth0 do to prevent intercepted one-time-use codes or *magic links* from being used to establish unauthorized sessions?

While intercepted one-time-use codes or *magic links* can be as powerful as gaining access to a user's email account or SMS messages, codes and links have a short lifespan (typically about 5 minutes) and can only be used once. As such, the opportunities to use this information is limited.

To reduce the possibility of data being intercepted, we recommend either:

* Using encrypted end-to-end communication between email servers and clients;
* Enabling multifactor authentication.

### How do I use Passwordless Authentication with *step-up* multifactor authentication to improve security?

Whenever there's a "high-risk" login, such as a login from a user coming from an unknown IP address originating outside the user's home country, you can use *step-up* multifactor authentication to request additional verification details.

To do so, you can implement the appropriate [rule(s)](/rules), which are JavaScript snippets that run as part of the authentication process on Auth0 servers. Rules allow you to insert additional authentication elements into your user flow.

### How do I prevent phishing attacks where the fraudulent email appears to have come from my site/app?

Because phishing attacks are aimed at stealing credentials (such as username/password combinations), Passwordless Authentication reduces this type of fraud, because there are no passwords to steal.

However, it's possible that someone could send out fraudulent emails containing *magic links* that then ask your users to divulge their personal details. To mitigate this risk, we recommend the following:

* Education: Warn your users that they should not interact with links in emails if they haven't just attempted to log in.
* Implement best practices for validating email: Standards, such as **SPF**, **DKIM**, and **DMARC**, help ensure email authenticity, and we recommend utilizing these capabilities by by [configuring your own email provider](/email), including the [SPF and DKIM records](/email#spf-configuration), when you set up Passwordless Authentication.

### How does Auth0 guard against brute-force (code guessing) attacks?

The six-digit numeric codes issued as part of Passwordless Authentication are one-time use only and expire in a short amount of time (by default, they expire after five minutes). This limits the amount of time an unauthorized party has to guess the correct combination.

In addition, Auth0 utilizes rate limits and blocks IP addresses that exceed the limits. Auth0 then emails the app/site owner, and if the IP address is legitimate, they can unblock it. 
