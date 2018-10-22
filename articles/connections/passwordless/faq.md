---
title: Passwordless FAQ
topics:
    - connections
    - passwordless
contentType: reference
useCase: customize-connections
---
# Passwordless FAQ

## General Questions

### Q: When is passwordless authentication the best option for login? How does this feature improve the user experience?

**A:** The number of passwords that users must remember has become overwhelming, and passwords that aren’t used frequently are often forgotten. When a user forgets their password, they must recover it through email using a process more cumbersome than Auth0’s simple, passwordless user experience. For many users, recovering a lost password for infrequently visited sites and apps is a common and unpleasant experience. 

In a [recent survey](https://www.passwordboss.com/password-habits-survey-part-1/), 59% of users admit to reusing passwords because it is too difficult to remember them all. Although this habit avoids the password recovery scramble, it exposes these users to risk.

Passwordless login is best for sites and apps where users maintain a presence but don’t visit often enough that they remember a unique password. This could encompass most of the Internet. For these sites, passwordless login creates a much better user experience and better security: no password resets or reuse, and no password database as a target for hackers.

For frequently visited sites, passwordless authentication offers a streamlined and simple user experience. Many companies, such as Slack and [Medium](https://medium.com/the-story/signing-in-to-medium-by-email-aacc21134fcd), have embraced the passwordless login as more secure than passwords.

### Q: When is passwordless login not a good idea? What are its limitations?

**A:** For sites and apps that users access every day, the passwordless flow may feel slower than the muscle memory of quickly entering a memorized password. As with a username/password login, if an email account is hacked or a phone is stolen and unlocked, the passwordless login is compromised, but so is every site not using multi-factor authentication.

Websites and web applications are trending toward longer session expirations so that users are not asked to login frequently, behaving more like native apps on a mobile device. Then, when a user initiates a sensitive operation, users are asked for *step-up* authentication such as a one-time password or a code from an authentication app like Google Authenticator. Auth0’s passwordless authentication takes the same approach. Like the `sudo` command on Linux, when the user initiates an activity that requires elevated privileges, they are presented with an extra challenge. Simple and effective, this procedure eliminates the hassle of multi-factor authentication, except when necessary.

<%= include('_single-browser-magic-link') %>

### Q: Is it difficult for users to become accustomed to passwordless login?

**A:** Passwordless login is so simple that most users will immediately get it. The user experience is nearly effortless, especially with *magic links* in emails. For most end-users, a passwordless login is easier than recalling a hard-to-remember password.

### Q: How is passwordless login different from a social login?

**A:** With a social login, the user is authenticated through a separate account that the user owns. Users need to remember and protect fewer passwords, and the site or app owner doesn’t need to manage any passwords.

Social logins are appropriate when users are likely to have accounts on popular social providers, and when your application can gain additional features by interacting with the social provider’s API. Auth0 supports a wide range of social providers out-of-the-box with just a few lines of code. However, social logins can be confusing to some users because of the need to login to a different site, and of the grant page which asks for additional permissions to share their data. When users are confused or worried, they might abandon their sign-up. For these users, passwordless login has the advantage of not asking them to share anything except for their email, or phone number for SMS.

One option is to offer users several popular social logins, and offer passwordless email as an alternative if they don’t have any social accounts or prefer not to use them.

### Q: How much does passwordless authentication from Auth0 cost?

**A:** There is no extra charge to use this feature. Passwordless authentication is included free with every Auth0 developer account, subscription, and custom plan.

## How to use and configure Passwordless

### Q: What are the advantages of using *magic links*?

**A:** A *magic link* is a link sent to a user’s email that logs the user into your site or application with a single click. It provides the simplest user experience and makes the login process smooth and friction-free.

### Q: What are the advantages of using emailed codes?

**A:** An emailed code requires slightly more effort for end-users than a magic link. A numeric code is sent to the user’s email. The user then types this code into a response field of the Auth0 passwordless lock widget on your site, which handles this part automatically. Once entered and validated, the user is logged in.

### Q: What are the advantages of using codes delivered through SMS?

**A:** Since users often have their phone nearby, SMS messages are likely to be delivered to the user’s hand or pocket. Typically, it’s impossible to steal SMS service without being in possession of the phone or SIM that is hard-coded with the wireless number. This eliminates the potential for malicious access through stolen email credentials, making SMS logins more secure.

An SMS login, like an emailed code, requires slightly more effort for end-users than a *magic link*. Depending on the user’s mobile subscription plan, there may be a fee for them to receive SMS messages or these messages may count against a pool of available free messages. For such users, the added cost of using the SMS side-channel may not be considered worthwhile.

### Q: Can I offer both email and SMS options at the same time?

**A:** Using [Auth0’s Javascript SDK](https://github.com/auth0/auth0.js), you have complete control of how passwordless authentication works with your site or application. It’s easy to implement a mixed-mode user experience and build your own UI using the SDK. However, the passwordless lock widget does not yet support this sort of mixed-mode interface. Such a mode may be added to future versions of the widget.

### Q: How would a user sign-in to your application using a *magic link* from a device that doesn’t have access to the registered email account?

**A:** A user may sign-up for your service using passwordless login with their personal email and may want to use that service at work but does not have their personal email account available from their work PC. If they visit the service on their work PC and ask to log in, providing their personal email address, the *magic link* is sent to their personal email account that they cannot access from their work PC.

The simplest way to solve this problem would be for the user to forward the *magic link* email to their work email account, and click the link from their work PC. They could also create an account with their work email address and link the two accounts, logging in with either of them.

If this is likely to be a common scenario for your end-users, you might want to consider using emailed codes, or codes sent through SMS, rather than emailed links. 

### Q: How do I style the passwordless lock widget to my own brand identity?

**A:** The passwordless lock widget accepts two parameters to change its appearance: the *primaryColor* option to change background color and the *icon* option to add your brand’s icon. You can also style the widget by modifying the CSS stylesheet.

If you need more design control, you can implement your own UI and call any of the passwordless connections through the [Auth0 JavaScript SDK](https://github.com/auth0/auth0.js).

### Q: How do I select which high-volume messaging provider passwordless logins will use? What are my options?

**A:** By default, your passwordless connections will be set-up to use Auth0’s messaging provider. However, this limits your ability to monitor and manage availability, troubleshoot issues, and connect to analytics. Accordingly, we recommend that you set up your own high-volume email or SMS provider.

Auth0 supports **Twilio SMS** for passwordless login with codes sent via SMS, and **SendGrid**, **Mandrill**, and **Amazon SES** for email-based passwordless authentication. These providers are all supported in the Auth0 dashboard. All you need are your API credentials.

### Q: Can I configure a different messaging provider than the ones you support directly?

**A:** Currently it is supported only for codes sent via SMS, you can follow [this link](/connections/passwordless/sms-gateway) to read more on how to configure your own SMS gateway to handle the delivery of those codes.

### Q: How can I use Passwordless as another factor in multi-factor authentication?

**A:** While Auth0’s passwordless connections (including SMS and email) are not built into the dashboard MFA capability at this time, Auth0’s flexible [rules execution pipeline](/rules) make it easy to use these passwordless authentication methods as part of an MFA flow. Rules are snippets of JavaScript that execute on the Auth0 server as part of the authentication pipeline and give you the flexibility to call APIs or perform arbitrary computations in order to implement customized authentication logic. Simply call the passwordless connection using a redirect rule, and treat it as a [custom MFA provider](/mfa).

In future versions of passwordless connections, supported MFA providers will be built-in.

### Q: What happens if a user changes email or phone number?

**A:** A self-service method for changing email or phone number is not included in this version of passwordless authentication. An administrator can change this information using the Auth0 Dashboard.

## Security

### Q: What if someone gains access to a user’s email address?

**A:** If someone gains access to a user’s email account, they will be able to log in with the user’s passwordless email login with either a link or a code. This is no different than for password-protected accounts, which use email as the back channel for password resets. Typically, you protect against this risk by enabling multi-factor authentication when your application detects activity that appears suspicious such as logging in from a new device, an unknown IP address, or outside the user’s country of residence.

### Q: What if someone gains access to a user’s SMS messages?

**A:** As with email, if a user’s SMS messages are compromised, someone can log in as the user with SMS codes. Many phones now have built-in protections against theft, such as fingerprint readers, complex unlock codes, and remote disable and wipe features. The best protection against this risk on your site or application is to use multi-factor authentication, requiring additional *step-up* authentication when the user tries to access sensitive data or perform sensitive actions.

### Q: How does the system prevent an intercepted one-time code or link from being used to establish an unauthorized session?

**A:** Think of an intercepted code or link as similar to a compromised email account or stolen phone. Once the link or code is in the wrong hands, it can be used to log in as that user. But codes and links have a short time-to-live (typically 5 minutes) and can only be used once. This limits the opportunity for a hacker to use an intercepted communication to a brief window. Security experts strongly recommend using encrypted end-to-end communication between email servers and applications to prevent the easy interception of email, and you might recommend this safeguard to your end users as part of your documentation. Implementation of multi-factor *step-up* authentication for sensitive data or actions will reduce this risk as well.

### Q: How could I use Passwordless sign in with *step-up* multi-factor authentication to improve security for more sensitive data or actions?

**A:** Auth0 features powerful [rules](/rules) - JavaScript snippets which run during the authentication process on the Auth0 server, and allow you to insert additional authentication elements when potentially high-risk logins are detected. For instance, if your application detects a user logging in from a previously unknown IP address with a location outside of the user’s home country, your application might request a password.

In future versions of passwordless logins, support for multi-factor *step-up* authentication will be added as part of the passwordless configuration options, replacing the use of rules to implement this security enhancement.

### Q: Since users can click a link to log in, how can I prevent a phishing attack in which the user receives a fraudulent email that appears legitimate, but contains a link to a site that tricks them into giving up their credentials?

**A:** Phishing attacks are about stealing credentials (user-names and passwords) through trickery. If there are no passwords to steal, these attacks will become less common. Passwordless logins are a big step in reducing the prevalence of phishing.

Since passwordless email logins with *magic links* include a link in the email that logs a user into your site, a hacker could use it to create a fraudulent imitation of your legitimate email to trick unsuspecting users into divulging their account credentials for some other site, like their email account.

There are several effective ways to reduce this risk. One is through education. The email to your users might include a warning not to click the link unless they recently requested to log in, and a notice that they will never be asked for any password when logging into your site.

Another way is to apply best practices for email authentication when using this feature. There are popular and effective standards for verifying email authenticity including **SPF**, **DKIM**, and **DMARC**. We strongly recommend utilizing these capabilities by [configuring your own email provider](/email) when you set up passwordless logins, including setting up [SPF and DKIM records](/email#spf-configuration). Your email provider may have more detailed information on email authentication and availability for you to explore.

Since you are using Auth0 passwordless logins, there are no passwords to phish, and phishing attacks cannot compromise the credentials to your site or application. This is great news. Whenever email is a component of an authentication flow however, there is always the potential for phishing (if only for harvesting the credentials of other sites). Passwordless email authentication protects your brand and online reputation, while foiling scammers.

### Q: How does the system protect against brute-force attacks (code guessing)?

**A:** The 6-digit numeric codes are one-time use and expire in a short time (5 minutes by default). In addition, Auth0 includes rate-limiting and IP address blocking after several failed attempts. Accordingly, it is impractical to brute-force guess these codes. The application owner will be notified by email of any attempt and can unblock the IP address for a legitimate user.

### Q: Our company uses an email security system that scans URLs and invalidates the token. What can we do?

**A:** The only solution to this is to ask your users to whitelist the passwordless emails.
