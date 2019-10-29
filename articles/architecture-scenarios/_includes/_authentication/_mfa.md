In an era where misuse of user credentials is at an all-time high, protecting _your_ systems when it’s so common for hackers to steal users identity information in general is a challenge. One of the most effective ways though is to provide users with the ability to configure a second factor for protecting their account. More commonly referred to as [Multi-Factor Authentication](/multifactor-authentication). This will ensure that only a valid user can access his/her account, even if they use a username and password that may have been compromised from a different application.

::: panel Best Practice
It's quite common for customer facing applications to provide users with an _option_ for adding a second factor rather than _forcing_ them to use a second factor. For more information regarding this, see [providing your users with an option to add MFA](https://auth0.com/learn/multifactor-authentication-customers/).
:::

Auth0 supports a number of different options when it comes to enabling MFA for protecting user account access, and there are several practices to ensure that you will truly be providing a flexible second factor barrier to access:

* Auth0 [Guardian](https://auth0.com/multifactor-authentication): a service that provides both _Push_ notification generation and an application for allowing or denying requests. _Push_ sends notification to a user’s pre-registered device - typically a mobile or tablet - from which a user can immediately allow or deny account access via the simple press of a button.
* Time-based One-Time Password ([TOTP](https://auth0.com/blog/from-theory-to-practice-adding-two-factor-to-node-dot-js/)): allows you to register a device - such as Google Authenticator - that will generate a one-time password which changes over time and which can be entered as the second factor to validate a user’s account.
* [SMS](/multifactor-authentication/factors/sms): for sending a one-time code over SMS which the user is then prompted to enter before they can finish authenticating.
* [DUO](/multifactor-authentication/factors/duo): allows you to use your DUO account for multi-factor authentication.
* [Email](/multifactor-authentication/factors/email): allows you to use your email account for multi-factor authentication.

Whilst MFA workflow using technologies such as Guardian or Google Authenticator is typically provided via a separate application that runs on a mobile or tablet device, if you don’t want your customers to have to download a separate application Auth0 also provides you with an [SDK](https://auth0.com/blog/announcing-guardian-whitelabel-sdk/) that you can use to build second factor workflow right in your existing mobile device application(s).
