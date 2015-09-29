# Passwordless FAQ

## General Questions

### Q: For what types of use cases is passwordless authentication best? When does this feature really make things better?

**A:** The number of passwords that users must remember and use has become overwhelming, and passwords that aren’t used very frequently are often forgotten. When a user forgets their password, they must recover it through email, using a process much more cumbersome than Auth0’s simple passwordless user experience. For less frequently used sites and apps, recovering a lost password might be the normal, unpleasant experience for many users. To avoid the password recovery scramble, [nearly 60%](https://www.passwordboss.com/password-habits-survey-part-1/) of users admit to reusing passwords to "help" their memory, exposing them to much more risk. 

So passwordless login works best for those sites and apps on which users want to maintain a presence, but do not visit so often that they can remember a unique password. That describes most of the Internet! For such sites, passwordless login leads to a much better user experience, and better security: no password resets and no password to reuse. And no password database acting as an attractive target for hackers!

But even for frequently visited sites, passwordless authentication can offer a streamlined and simple user experience. Many forward-thinking companies such as Slack and [Medium](https://medium.com/the-story/signing-in-to-medium-by-email-aacc21134fcd) have embraced passwordless logins as just a better way to guard the door.

### Q: When is passwordless login not a good idea? What are its limitations?

**A:** For sites and apps that users access every day, the passwordless flow may feel slower than the "muscle memory" of quickly entering a password they have memorized. And just like username/password logins, if someone hacks your email account or steals your phone and unlocks it, your passwordless login is compromised (but so is every other site not using multi-factor authentication).

We are seeing a trend that websites and web applications are moving to longer session expirations so that users are not asked to log in frequently - like a native app on a mobile device. Then, whenever a user asks to perform a sensitive operation, they’re asked for "step up" authentication - perhaps a one-time password, or a code from an authentication app like Google Authenticator. The same approach works with Auth0’s passwordless authentication. Think of it like the “sudo” command on Linux - when you’re doing something that requires elevated privilege, you get an extra “challenge”. Simple and effective, and eliminates the hassle of multi-factor authentication except when it is needed.

### Q: How hard is it for users to get used to passwordless login?

**A:** Passwordless is so simple that we think most users will immediately "get it". Especially with “magic links” in emails or Apple Touch ID, the user experience is nearly effortless. But in all cases, passwordless logins are simpler to manage for most end users than using a hard-to-remember password.

### Q: How is passwordless login different from social logins?

**A:** With social logins you’re letting another account that the user owns authenticate that user - users need to remember and protect fewer passwords, and you, the site or app owner, don’t need to manage passwords yourself. 

Social logins are appropriate when your users are likely to have accounts on popular social providers, and when your application can gain additional features by interacting with the social provider’s API. Auth0 supports a wide range of social providers out of the box, with just a few lines of code. Social logins can be confusing or worrying to some users however, because of the need to login to a different site, and the grant page asking for additional permissions to share data. When users are confused or nervous about something like this, they might abandon their sign-up. Passwordless has the advantage for some users that they do not need to share anything except for their email or phone number for SMS.

One design pattern we have seen is to offer your users several popular social logins, but if they do not have or prefer not to use their social accounts, offer passwordless email as an alternative.

### Q: How much does passwordless authentication from Auth0 cost? Is it an added-cost feature?

**A:** There is no extra charge to use this feature. It is included free with every Auth0 developer account, subscription, and custom plan.

##How to use and configure Passwordless

### Q: What are the advantages of using emailed "magic links"?

**A:** "Magic links" are links sent to the user’s email inbox that with a single click, logs the user into your site or application. They provide the simplest possible user experience and make your login process smooth and friction-free.

### Q: What are the advantages of using emailed codes?

**A:** Emailed codes are only a little more effort for end-users than magic links - a numeric code is sent to the user’s email inbox. The user then types this code into a response field on the authentication dialog at your site - the Auth0 passwordless lock widget handles this part automatically. Once entered and matched, the user is logged in.

### Q: What are the advantages of using codes delivered through SMS?

**A:** Since users almost always have their phone nearby even when not at their desk or traveling, SMS messages are more likely to be delivered right to the user’s hand or pocket no matter what they’re doing. In addition, it typically isn’t possible to steal SMS service without physically being in possession of a phone or SIM hard-coded with a wireless phone number. This eliminates the potential for malicious access through stolen email credentials, making SMS logins potentially a bit more secure.

SMS logins, like emailed codes, are a small amount of extra effort for end-users than magic links. And depending on a user’s mobile subscription plan, there may be a fee for them to receive SMS messages or those messages may count against a pool of available free messages. For such users, the added cost of using the SMS side-channel may be seen as more trouble than it is worth.

### Q: How can I use both email and SMS modes at the same time - depending on whether the user provides an email or a phone number?

**A:** Using [Auth0’s Javascript SDK](https://github.com/auth0/auth0.js), you have complete control of how passwordless authentication works with your site or application. It is simple to implement a mixed mode user experience using the SDK, and building your own UI. The passwordless lock widget does not yet support this sort of mixed-mode interface. We’ll be looking into adding such a mode to a future version of the widget.

### Q: How do I sign in to an application using emailed links on a device for which I don’t have access to the registered email account?

**A:** Let’s say you signed up for a service using passwordless login with your personal email, but you need to use that service at work and don’t have your personal email account on your work PC. You visit the service on your work PC and ask to log in, giving your personal email address. But the magic link goes to your personal email account, and you cannot access that account from the PC where you initiated the login request.

The simplest way to solve this problem would be to forward the magic link email to your work email account, and then click the link from your work PC. If this is likely to be a common scenario for your end-users, you might want to consider using emailed codes, or codes sent through SMS rather than emailed links. You could also create an account with your work email address and link the two accounts, logging in with either of them.

### Q: How do I style the passwordless lock widget to my own brand identity?

**A:** The passwordless lock widget accepts two parameters to change its appearance: the primaryColor option and the icon option to change background color and add your brand’s icon, respectively. In addition, you can further style the widget by changing the CSS stylesheet.

If you need more control, you can implement your own UI and call any of the passwordless connections through the [Auth0 JavaScript SDK](https://github.com/auth0/auth0.js).

### Q: How do I select the high-volume messaging provider that Passwordless logins will use? What are my options?

**A:** By default, your passwordless connections will be set up to use Auth0’s messaging provider. This works but limits your ability to monitor and manage deliverability, troubleshoot issues, and connect to analytics. Accordingly, we recommend that you set up your own high-volume email or SMS provider.

Auth0 supports Twilio SMS for passwordless login with codes sent via SMS, and supports SendGrid, Mandrill, and Amazon SES for email-based passwordless authentication. These providers are all supported within the Auth0 dashboard - all you need are your API credentials.

### Q: Can I configure a different messaging provider than the ones you support directly?

**A:** At this time, no. If you have a need to integrate with other messaging services please contact Auth0’s customer success team for advice and assistance.

### Q: How can I use Passwordless as another factor in multifactor authentication?

**A:** While at this time, Auth0’s passwordless connections including SMS, email, and Apple Touch ID are not built-in to the dashboard MFA capability, Auth0’s flexible [rules execution pipeline](https://auth0.com/docs/rules) make it easy to use these passwordless authentication methods as part of an MFA flow. Rules are snippets of Javascript that execute on the Auth0 server as part of the authentication pipeline and that give you a lot of flexibility to call APIs or perform arbitrary computations to implement customized authentication logic. Just call the passwordless connection using a redirect rule, treating it as a [custom MFA provider](https://auth0.com/docs/mfa).

In a future version of passwordless connections, we plan to add them as built-in, supported MFA providers.

### Q: What are the advantages of Apple Touch ID for passwordless authentication?

**A:** Apple’s Touch ID fingerprint identity system is a very easy way for users to identify themselves to their iPhone or iPad equipped with a fingerprint scanner. To the user, the application unlocks with the touch of a finger. Nothing could be easier!

After a one-time enrollment process, each time the user logs in on your app, the Touch ID passwordless library uses the matched fingerprint to retrieve a private key saved in the IOS key store. It then generates and signs a JWT with that private key and sends it to Auth0. Auth0 validates the JWT with the user’s saved public key, and returns a token authenticating the user.

The only real disadvantages to Touch ID as a means of authenticating users is that it works only on native IOS apps installed on later-model iPhones and iPads. It doesn’t work on other devices like Android, nor can it protect a website or web application. And there must be a backup password authentication mechanism to handle lost devices or to change devices. Auth0 makes it simple to link accounts so that you can offer Touch ID on Apple devices, and SMS or email based passwordless logins for web or other mobile platforms.

Auth0’s standard Lock widget for IOS fully supports Touch ID with a very simple UI easily styled to your brand identity. You can implement passwordless logins for your IOS app in just a few lines of code.

### Q: Does the Passwordless Lock Widget support Apple Touch ID?

**A:** No. For Touch ID passwordless logins, you use the standard Auth0 IOS lock widget to get all the same benefits. The web-based passwordless lock widget doesn’t support Touch ID.

### Q: Can I combine email or SMS Passwordless authentication with Apple Touch ID?

**A:** Instead of using a backup password to handle lost or changed devices, you can use email or SMS passwordless logins and link the two user identities through Auth0’s account linking feature, so that your application sees the same authenticated user whether logged in through Touch ID, or through email or SMS.

### Q: What happens if a user changes email or phone number?

**A:** In this version of Passwordless authentication, we have not included a self-service method to change email or phone. An administrator can change this information using the Auth0 Dashboard.

## Security

### Q: What if someone gains access to my email address?

**A:** If someone gains access to your email account, they will be able to log in as you using passwordless email logins either with a link or a code. This is no different than for password protected accounts which use email as the back channel for password resets. Typically, you protect against this risk by enabling multifactor authentication when you detect something that appears risky - logging in from a new device, an unknown IP address, or from outside the user’s country of residence, for example.

### Q: What if someone gains access to my SMS messages (steals my phone or another way)?

**A:** As with email, if your SMS messages are compromised, someone can log in as you using SMS codes. Many phones now have built-in protections against theft, such as fingerprint readers, complex unlock codes, and remote disable and wipe features. The best protection against this risk on your site or application is to use multifactor authentication - perhaps requiring additional "step up" authentication when the user tries to access sensitive data or perform sensitive actions.

### Q: How does the system prevent an intercepted one-time code or link from being used to establish an unauthorized session?

**A:** Think of an intercepted code or link as the result of a compromised email account or stolen phone. Once the link or code is in the wrong hands, they can use it to log in as you. But codes and links have a short time-to-live - typically 5 minutes - and can only be used once. This limits the opportunity for a hacker to use an intercepted communication to a short window of time. Security experts strongly recommend using encrypted end-to-end communication between email servers and clients to prevent easy interception of email, and you might recommend this safeguard to your end users as part of your documentation. And multifactor "step-up" authentication for sensitive data or actions works to reduce this risk as well.

### Q: How could I use Passwordless sign in with step-up multifactor authentication to improve security for more sensitive data or actions?

**A:** Auth0 features powerful [rules](https://auth0.com/docs/rules) - Javascript snippets which run during the authentication process on the Auth0 server, and which allow you to insert additional authentication elements when you detect potentially higher-risk logins. For instance, if you detect a user logging in from a previously unknown IP address with a location outside of the user’s home country, you might request a password, or ask a security question from inside of Auth0’s authentication flow.

In a future version of passwordless logins, we’ll be adding support for multifactor step-up authentication as part of the configuration options for passwordless, rather than using rules to implement this security enhancement.

### Q: Since users can click a link to log in, how can I prevent a phishing attack in which my user receives a fraudulent email that looks legitimate, but that has a link to a site that tricks them into giving up their credentials?

**A:** Phishing attacks are all about stealing credentials - i.e. usernames and passwords - through trickery. If there are no passwords to steal then ultimately these attacks become much less prevalent.  Passwordless logins are a big step in that direction!

But because passwordless email logins with magic links include a link in the email that logs a user into your site, a hacker could use it to create a fraudulent imitation of your legitimate email to trick unsuspecting users into divulging their account credentials for some other site - say, their email account.

There are several effective ways to reduce this risk. One is through education: your email to your users might include the warnings to not click the link unless they just requested to log in, and that they will never be asked for any password when logging into your site.

Another important step is to use best practices for email authentication when using this feature. There are popular and effective standards for verifying email authenticity including SPF, DKIM, and DMARC. We strongly recommend utilizing these capabilities by [configuring your own email provider](https://auth0.com/docs/email) when you set up passwordless logins, including setting up [SPF and DKIM records](https://auth0.com/docs/email#spf-configuration). Your email provider may have more detailed information on email authentication and deliverability for you to investigate.

The good news is that since you’re using Auth0 passwordless logins, you have no passwords to phish. This means that phishing attacks cannot compromise credentials to your site or application. But whenever email is a component of an authentication flow, there is the potential for phishing - in this case, aimed at harvesting other credentials. Using email authentication helps protect your brand and online reputation, while foiling scammers. Highly recommended.

### Q: How does the system protect against brute-force attacks (guessing codes)?

**A:** 6-digit numeric codes are one-time use and expire in only a short time - 5 minutes by detault. In addition, Auth0 includes rate limiting and IP address blocking for too many failed attempts. Accordingly it is not practical to brute-force guess these codes. If someone tries, the application owner will be notified by email of the attempt, and in case it is a legitimate user, the owner can unblock that IP address again.
