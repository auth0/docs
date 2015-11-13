---
url: /email
---

# Emails in Auth0

Auth0 can send emails to your users at sign up, to validate their email address, and to confirm a password change request.

The dashboard allows you to customize emails using Markdown templates and macros which include the context of the current application and the current user.

![](/media/articles/email/index/emails-fields.png)

## Configuring *From*, *Subject* and *Redirect To*

For each email type, the **From address**, the **Subject**, the **URL Lifetime** and the **Redirect To** URL can be customized.

### *From Address*

The **From address** is the address users will see as the sender when receiving an email from Auth0.

If you haven't configured a **From address** for your emails, the following will occur:

* If your email templates are not customized, they will be sent from `no-reply@auth0.com`.
* Otherwise, they will be sent from the email address of the first owner of your Auth0 account.

**NOTE:** Because of security reasons, it is not possible to send customized emails from any `@auth0.com` address. Appliance users can configure a similar domain blacklist.

This field supports the following macros:

- `{application.name}`
- `{connection.name}`

With these macros, you could set the display name of the **From address** as something specific to the current application for which the user signed up. Eg: `{application.name} <support@fabrikamcorp.com>`

To avoid emails ending up in your users' junk folder, add the required [Sender Policy Framework (SPF)](http://en.wikipedia.org/wiki/Sender_Policy_Framework) and [DomainKeys Identified Mail (DKIM)](http://en.wikipedia.org/wiki/DKIM) DNS records, allowing Auth0 to send digitally-signed emails on your behalf.

When SPF and DKIM are not configured, users may see the **From address** as "on behalf of", depending on their email client:

`MyApp support@mail128-21.atl41.mandrillapp.com on behalf of MyApp support@fabrikamcorp.com`

#### SPF Configuration

The SPF is configured by adding a TXT record to your domain. The host name should be set to @ (or empty, depending on the provider). If this is the first time you are setting up an SPF record, you will need to declare it as follows:

```
v=spf1 include:spf.auth0.com ~all
```

If you are already sending emails from this domain and wish to add the Auth0 domain to the SPF configuration, simply add it after your existing definitions, as follows:

```
v=spf1 include:outlook.com include:spf.auth0.com ~all
```

#### DKIM Configuration

The DKIM configuration is also added using a TXT record to the domain from which you are sending. The host name for this record should be set to `mandrill._domainkey` and the value set to:

```
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrLHiExVd55zd/IQ/J/mRwSRMAocV/hMB3jXwaHH36d9NaVynQFYV8NaWi69c1veUtRzGt7yAioXqLj7Z4TeEUoOLgrKsn8YnckGs9i3B3tVFB+Ch/4mPhXWiNfNdynHWBcPcbJ8kjEQ2U8y78dHZj1YeRXXVvWob2OaKynO8/lQIDAQAB;
```

### Subject

The **Subject** supports the following macros:

- `{application.name}`
- `{connection.name}`
- `{user.email}`

If this value is empty, the subject text will depend on the type of email being sent, for example: "*Verify your email*".

### Redirect To

The **Redirect To** field allows you to control the URL to which users will be redirected after clicking the link in the email:

- `{application.callback_domain}`
- `{application.name}`

You are then able to redirect users to a page on the *Allowed Callback URL*, for example: `{application.callback_domain}/result_page`. If the application has multiple *Allowed Callback URL*s configured, the first one will be used.

### URL Lifetime

The **Verification Email** and **Change Password Confirmation Email** both contain a link which will allow users to verify their email address or confirm their password change.

The lifetime of this link can be modified for security reasons. The default value is 432000 seconds (5 days).

When users click the expired link and a **Redirect To** URL is configured, they will be redirected to this URL and the following information will be appended to the querystring:

```
http://myapplication.com/my_page/?email=john%contoso.com&message=Access%20expired&success=false
```

## Email Templates

### Verification Email

This email will be sent when users sign up or log in for the first time. When users follow the verification link, the `email_verified` property will be changed to `true` in their user profile.

The following macros are available in this template:

- `{application.name}`
- `{connection.name}`
- `{user.email}`

When a **Redirect To** URL is configured, users will be redirected to this URL after the email address has been verified. The following information will be appended to the querystring:

```
http://myapplication.com/my_page/?email=john%40contoso.com&message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.&success=true
```

### Welcome Email

This email is sent once users verify their email address. If the **Verification Email** is turned off, this email will be sent when users sign up or log in for the first time.

The following macros are available in this template:

- `{application.name}`
- `{connection.name}`
- `{user.email}`

### Change Password Confirmation Email

This email is sent when users requests a password change. The password is not changed until they follow the verification link in the email.

The following macros are available in this template:

- `{application.name}`
- `{connection.name}`
- `{user.email}`

When a **Redirect To** URL is configured, users will be redirected to this URL after their email address has been verified. The following information will be appended to the querystring:

```
http://myapplication.com/my_page/?success=true&message=You%20can%20now%20login%20to%20the%20application%20with%20the%20new%20password.
```

### Blocked Account Email

This email is sent when a user's account is has been blocked. Each time a login fails for a particular user at a specific IP address, the failed login count is incremented. When the count reaches 10, the user will be unable to log in again from that IP address until the link in the *Blocked Account Email* is clicked.

If a user successfully logs in before the counter reaches 10, the failed login counter is reset to 0.

The following macros are available in this template:

- `user.source_ip`
- `user.city`
- `user.country`
- `application.name`
- `connection.name`

## Email Limits

The Auth0 shared email provider restricts your account from sending more than 10 emails per minute total, including all email types (welcome, verification, password reset, etc.).

Auth0 makes its best effort to deliver all emails for our customers. However, you may wish to configure your own email provider for use with Auth0, especially if you:

* want guaranteed delivery
* anticipate a high volume that will exceed the shared email limits
* wish to have direct access to logs
* desire more control over the email service (for example: the IP address from which your emails are sent)

For more information on setting up your own email provider, see:
* [Using your own SMTP provider (SendGrid/Amazon SES/Mandrill)](/email/providers)
* [Take control of the complete email flow](/email/custom)