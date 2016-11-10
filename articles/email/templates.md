---
description: The Emails section of the Auth0 dashboard allows you to customize your emails with Liquid templating syntax.
---

# Customizing Your Emails

::: panel-warning Notice
You must setup your own email provider using a [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/) or [SendGrid](https://sendgrid.com/pricing)) or a [custom provider](/email/custom) to be able to customize your emails.
:::

The [Emails](${manage_url}/#/emails) dashboard allows you to customize your emails, including templating with some user attributes [using Liquid syntax](#email-templates). This can include references to the context of the current application or user.

![](/media/articles/email/index/emails-fields.png)

## Configuring *From*, *Subject*, *Redirect To*, and *URL Lifetime*

For each type of email, you can customize the **From Address**, the **Subject**, the **Redirect To** and the **URL Lifetime**.

### *From Address*

Users will see the sender's address in the **From Address** field when receiving an email from Auth0. If you do not configure a **From Address** for your emails your emails will be sent from the email address of the first owner of your Auth0 account.

::: panel-info Domain blacklist
For security purposes, you may not send customized emails from any `@auth0.com` address. If you are an appliance user, you may configure a similar domain blacklist.
:::

The **From Address** field supports the following macros:

* `{application.name}`
* `{connection.name}`

You can use these macros to set the display name of the **From Address** to something that relates to the application for which the user signed up. For example, the field could display `{application.name} <support@fabrikamcorp.com>`, as opposed to simply `<support@fabrikamcorp.com>`.

You must add the [Sender Policy Framework (SPF)](http://en.wikipedia.org/wiki/Sender_Policy_Framework) and [DomainKeys Identified Mail (DKIM)](http://en.wikipedia.org/wiki/DKIM) DNS records to your domain's zone file to allow Auth0 to send digitally-signed emails on your behalf. Without these records, the emails may end up in your users' junkmail folders. Additionally, your users may see the following as the **From Address**:

```text
MyApp support@mail128-21.atl41.mandrillapp.com on behalf of MyApp support@fabrikamcorp.com
```

#### SPF Configuration

You can configure the SPF by adding a TXT record to your domain's zone file. You should set the host name to `@`, or leave it empty, depending on the provider.

#### DKIM Configuration

The DKIM configuration is configured by adding a TXT record to your domain's zone file. This domain should be the one you use to send emails. For example if you are using [Mandrill](https://www.mandrill.com/signup/) you would set the host name for this record to:

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

If the **Subject** field is empty, Auth0 will auto-populate this text depending on what type of email you are sending. For example, one subject line might be "*Verify your email.*"

### Redirect To URL

You can redirect users to a specific page on the **Allowed Callback URL** using the following:

```text
{application.callback_domain}/result_page
```

If your application has multiple **Allowed Callback URL**s configured, Auth0 will use the first URL listed.

#### Dynamic Redirect To URLs

You can set up a different Redirect To URLs based on your Client ID. For example:

```text
{% if application.clientID == '${account.clientId}' %} http://jwt.io {% else %} http://auth0.com {% endif %}
```

::: panel-info SPA Issue
For some single-page apps, the redirect to url can sometimes contain a hash that may be removed. This results in the **redirect To** url not working as expected. For more information, see: [Single-Page App Email Redirect Issue](/email/spa-redirect).
:::

### URL Lifetime

The **Verification Email** and **Change Password Confirmation Email** contain links which allow users to verify their email address when signing up, or confirm their password change, respectively.

You can modify the lifetime of this link for security purposes. By default, the lifetime is 432,000 seconds (five days).

If users click on an expired link and a **Redirect To** URL is configured, they will be redirected to the configured **Redirect To** URL. The following text will be appended to the query string:

```text
http://myapplication.com/my_page/?email=john%contoso.com&message=Access%20expired&success=false
```

## Email Templates

### Multilingual Email Templates

User attributes are available from the  **Verification Email**, **Welcome Email**, **Change Password Confirmation Email** and **Blocked Account Email** templates.

The available attributes vary depending on the syntax used.

#### HTML + Liquid syntax
Liquid syntax is the currently supported templating syntax to use when accessing user attributes in your email templates. Here are the attributes available to you:

* `email`
* `email_verified`
* `picture`
* `name`
* `nickname`
* `given_name`
* `family_name`
* `app_metadata` - stores user attributes (such as user preferences) that do not impact a user's core functionality
* `user_metadata` - stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

[Learn more about `app_metadata` and `user_metadata`](/metadata)

For example, you can refer to attributes in the template to control flow as follows:

```text
{% if user.user_metadata.lang == 'es' %}
  Hola {{ user.name }}, ...
{% elseif user.user_metadata.lang == 'it' %}
  Ciao {{ user.name }}, ...
{% else %}
  Hi {{ user.name }}, ...
{% endif %}
```

#### Using Markdown Syntax

> Use of Markdown in email templates has been deprecated, so you will no longer be able to add new Markdown formatting. If you have an existing template in Markdown, you will be able to toggle from Markdown to Liquid, but changing this setting will result in  you losing any existing Markdown, as well as the ability to use Markdown.

The use of Markdown in email templating has been **deprecated**, and is only available for templates which were already using Markdown as the templating syntax. The available attributes for Markdown syntax are:

* `email`
* `email_verified`
* `picture`
* `name`
* `nickname`
* `given_name`
* `family_name`

For example, you can refer to attributes in the template as follows:

```text
Hello @@user.given_name@@ @@user.family_name@@
```

### Verification Email

When users sign-up or login for the first time, they will be sent a verification email. Clicking on the verification link in the email sets the 'email verified' property of their user profile to `true`.

The following macros are available in the **Verification Email** template:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

If you configure a **Redirect To** URL, the user will be directed to this URL after clicking the verification link. The following will be appended to the query string:

```text
http://myapplication.com/my_page/ 
  ?email=john%40contoso.com
  &message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.
  &success=true
```

### Welcome Email

Once a user verifies their email address, they will receive a **Welcome Email**. If you turn off the **Verification Email** feature, the **Welcome Email** will be sent to the user when they sign-up (or login for the first time).

The following macros are available in the **Welcome Email** template:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

### Change Password Confirmation Email

If a user requests a password change, they will receive a **Change Password Confirmation Email**. Until the user clicks the verification link contained in the email, the password will remain unchanged.

The following macros are available in the **Change Password Confirmation** email template:

* `{application.name}`
* `{connection.name}`
* `{user.email}`

If you configure a **Redirect To** URL, the user will be directed to this URL after clicking the verification link. The following will be appended to the query string:

```text
http://myapplication.com/my_page/
  ?success=true
  &message=You%20can%20now%20login%20to%20the%20application%20with%20the%20new%20password.
```

### Blocked Account Email

If a user attempts to login ten or more times unsuccessfully from the same IP address, the user account will be locked and they will receive a **Blocked Account** email. Once the user receives this email, they will not be able to login from that IP address again until they click on the link contained in the email.

If the user successfully logs in before they exhaust their ten allowed attempts, the counter is reset.

The following macros are available in the **Blocked Account Email** template:

* `user.source_ip`
* `user.city`
* `user.country`
* `application.name`
* `connection.name`
