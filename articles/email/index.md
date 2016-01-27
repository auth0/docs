---
url: /email
---

With Auth0, you can send emails to your users to: 

* validate their email address at sign up;
* confirm a password change request at a later date.

The dashboard allows you to customize emails using Markdown templates and macros, which include the context of the current application and user.

![](/media/articles/email/index/emails-fields.png)

## Configuring *From*, *Subject* and *Redirect To*

For each type of email, you can customize the **From Address**, the **Subject**, the **URL Lifetime**, and the **Redirect To** URL.

### *From Address*

Users will see the sender's address in the **From Address** field when receiving an email from Auth0.

If you do not configure a **From Address** for your emails:

* your emails will be sent from `no-reply@auth0.com` if you do not use a customized email template;
* your emails will be sent from the email address of the first owner of your Auth0 account if you are using customized email templates.

**NOTE:** For security purposes, you may not send customized emails from any `@auth0.com` address. If you are an Appliance user, you may configure a similar domain blacklist.

The **From Address** field supports the following macros:

* `{application.name}`
* `{connection.name}`

You can use these macros to set the display name of the **From Address** to something that relates to the application for which the user signed up. For example, the field could display `{application.name} <support@fabrikamcorp.com>`, as opposed to `<support@fabrikamcorp.com>`.

You must add the [Sender Policy Framework (SPF)](http://en.wikipedia.org/wiki/Sender_Policy_Framework) and [DomainKeys Identified Mail (DKIM)](http://en.wikipedia.org/wiki/DKIM) DNS records, which allow Auth0 to send digitally-signed emails on your behalf. Without these records, the emails may end up in your users' junk folders. Additionally, your users may see the following as the **From Address**:

`MyApp support@mail128-21.atl41.mandrillapp.com on behalf of MyApp support@fabrikamcorp.com`

#### SPF Configuration

You can configure the SPF by adding a TXT record to your domain. You should set the host name to `@`, or leave it empty, depending on the provider. If this is the first time you are setting up an SPF record, you will need to declare it as follows:

```text
v=spf1 include:spf.auth0.com ~all
```

If you are already sending emails from this domain and would like to add the Auth0 domain to the SPF configuration, append the domain to your existing definition:

```text
v=spf1 include:outlook.com include:spf.auth0.com ~all
```

#### DKIM Configuration

The DKIM configuration is configured by adding a TXT record to your domain. This domain should be the one you use to send emails. You must set the host name for this record to:

```text
mandrill._domainkey
``` 

and the value to:

```text
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrLHiExVd55zd/IQ/J/mRwSRMAocV/hMB3jXwaHH36d9NaVynQFYV8NaWi69c1veUtRzGt7yAioXqLj7Z4TeEUoOLgrKsn8YnckGs9i3B3tVFB+Ch/4mPhXWiNfNdynHWBcPcbJ8kjEQ2U8y78dHZj1YeRXXVvWob2OaKynO8/lQIDAQAB;
```

### Subject

You can use the following macros with the **Subject** field:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

If the **Subject** field is empty, Auth0 will auto-populate this text depending on what type of email you're sending. For example, one subject line might be "*Verify your email.*"

### Redirect To

You can redirect users to a specific page on the *Allowed Callback URL* using the following:

`{application.callback_domain}/result_page`

If your application has multiple *Allowed Callback URL*s configured, Auth0 will use the first URL listed.

### URL Lifetime

The **Verification Email** and **Change Password Confirmation Email** both contain links which allow users to verify their email address when signing up, or confirm their password change, respectively.

You can modify the lifetime of this link for security purposes. By default, the lifetime is 432000 seconds (which is equivalent to five days).

If users click on an expired link in either case, and a **Redirect To** URL is configured, they will be redirected to the configured **Redirect To** URL. The following text will be appended to the querystring:

```text
http://myapplication.com/my_page/?email=john%contoso.com&message=Access%20expired&success=false
```

## Email Templates

### Verification Email

When users sign up or log in for the first time, they will be sent a verification email. Clicking on the verification link in the email sets the 'email verified' property of their user profile to `true`.

The following macros are available in the **Verification Email** template:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

If you configure a **Redirect To** URL, the email directs the user to this URL after they visit the email address. The following will be appended to the querystring sent:

```text
http://myapplication.com/my_page/?email=john%40contoso.com&message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.&success=true
```

### Welcome Email

Once a user verifies their email address, they will receive a **Welcome Email**. If you turn off the **Verification Email** feature, the **Welcome Email** will be sent to the user when they sign up (or log in for the first time).

The following macros are available in the **Welcome Email** template:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

### Change Password Confirmation Email

If a user requests a password change, they will receive a **Change Password Confirmation Email**. Until the user follows the verification link contained in the email, the password will remain unchanged.

The following macros are available in the **Change Password Confirmation** email template:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

If you configure a **Redirect To** URL, the email directs the user to this URL after they verify the email address. The following will be appended to the querystring sent:

```text
http://myapplication.com/my_page/?success=true&message=You%20can%20now%20login%20to%20the%20application%20with%20the%20new%20password.
```

### Blocked Account Email

If a user attempts and fails to log in ten or more times from a specific IP address, the user's account becomes locked and they will receive a **Blocked Account** email. Once the user receives this email, they will not be able to log in from that IP address again until they click on the linked contained in the email.

If the user successfully logs in before they exhaust their ten allowed attempts, the counter is reset to zero.

The following macros are available in the **Blocked Account Email** template:

* `user.source_ip`
* `user.city`
* `user.country`
* `application.name`
* `connection.name`

## Email Limits

The Auth0 shared email provider restricts your account from sending more than ten emails per minute, regardless of email type. Additionally, your ability to send email from your account may be reduced, or even temporarily blocked, if your emails result in high bounce rates.

If these restrictions are problematic, you may configure your own email provider for use with Auth0. You may also wish to configure your own email provider if you:

* want guaranteed delivery;
* anticipate exceeding the shared email limits;
* want direct access to email logs;
* want greater control over the email server (for example, you may want to change the IP address from where your emails are sent).

For more information on setting up your own email provider, please consult the following resources:

* [Using your own SMTP provider (SendGrid/Amazon SES/Mandrill)](/email/providers)
* [Take control of the complete email flow](/email/custom)
