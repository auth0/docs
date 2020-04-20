---
description: The Emails section of the Auth0 dashboard allows you to customize your emails with Liquid templating syntax.
topics:
  - email
contentType: how-to
useCase: customize-emails
toc: true
---

# Customizing Your Emails

::: warning
You must setup your own email provider using a [third-party service](/email/providers) (such as Amazon SES, Mandrill, SendGrid, SparkPost, Mailgun, or a custom SMTP provider) to be able to customize your emails.
:::

Auth0 provides an [Emails](${manage_url}/#/emails) dashboard that allows you to customize your HTML-based emails, including templating with some contextual attributes [using Liquid syntax](/email/liquid-syntax). This can include references to the context of the current application or user.

![](/media/articles/email/index/emails-fields.png)


::: note
Only one template can be used for each template type (for example, only one template for verify emails).
:::

At this time, Auth0 does not support plaintext/text-based emails.

## Configuring email templates

You can customize the **From Address**, the **Subject**, and the **Message** body for each email template. You can use [Liquid Syntax](/email/liquid-syntax) to dynamically generate content, with access to a number of contextual variables that will be replaced with the relevant values when rendering the email messages.

### Common variables

You can access the following common variables when using Liquid Syntax in the **From Address**, **Subject** and **Message** fields:

* The `application` object, with access to the standard client properties like
  * `application.name`
  * `application.clientID`
* `connection.name` (except in the **Multi-factor Enrollment Email**)
* The `user` object, with access to the following properties:
  * `user.email`
  * `user.email_verified`
  * `user.picture`
  * `user.nickname`
  * `user.given_name`
  * `user.family_name`
  * `user.name`
  * `user.app_metadata` - stores information (such as a user's support plan, security <dfn data-key="role">roles</dfn>, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.
  * `user.user_metadata` - stores user attributes (such as user preferences) that do not impact a user's core functionality.
* Tenant-related information (defined in the [Tenant Settings](${manage_url}/#/tenant)):
  * `tenant` - the raw tenant name
  * `friendly_name` 
  * `support_email`
  * `support_url`

Variables are referenced using the `{{ variable_name }}` syntax in Liquid. E.g.:

```text
Hello {{ user.name }}. Welcome to {{ application.name }} from {{ friendly_name }}.
```
Note that the attributes available for the `user` object will depend on the type of connection being used.

::: note
Individual email templates define additional variables that are appropriate for the specific template. Be sure to check out the [individual templates descriptions](#individual-templates-descriptions) below.
:::

For those emails where the user needs to follow a link to take action, you can also configure the **URL Lifetime** and **Redirect To** URL destination after the action is completed. Liquid Syntax is also supported in the **Redirect To** URL field, but only three variables are supported:

* `application.name`
* `application.clientID`
* `application.callback_domain`

See [Configuring the Redirect To URL](#configuring-the-redirect-to-url) for more details.

### Configuring the From Address

Users will see the sender's address in the **From Address** field when receiving an email from Auth0. If you do not configure a **From Address** for your emails your emails will be sent from the email address of the first owner of your Auth0 account.

::: note
For security purposes, you may not send customized emails from any `@auth0.com` address. If you are a Private Cloud user, you may configure a similar domain blacklist.
:::

The **From Address** field supports all the [common variables](#common-variables) for templates, but these are the most commonly used:

* `application.name`
* `friendly_name` (for the tenant's defined friendly name)

You can use these variables to set the display name of the **From Address** to something that relates to the application for which the user signed up. For example, the field could display `{{ application.name }} <support@fabrikamcorp.com>`, as opposed to simply `<support@fabrikamcorp.com>`.

You must add the [Sender Policy Framework (SPF)](http://en.wikipedia.org/wiki/Sender_Policy_Framework) and [DomainKeys Identified Mail (DKIM)](http://en.wikipedia.org/wiki/DKIM) DNS records to your domain's zone file to allow Auth0 to send digitally-signed emails on your behalf. Without these records, the emails may end up in your users' junkmail folders. Additionally, your users may see the following as the **From Address**:

```text
MyApp support@mail128-21.atl41.mandrillapp.com on behalf of MyApp support@fabrikamcorp.com
```

#### SPF Configuration

You can configure the SPF by adding a TXT record to your domain's zone file. You should set the host name to `@`, or leave it empty, depending on the provider. The value of the record should look something like the following.

 ```text
"v=spf1 include:spf.mandrillapp.com -all"
```

If you already have an SPF record you can simply add `include:spf.mandrillapp.com` to the existing record.

#### DKIM Configuration

The DKIM configuration is configured by adding a TXT record to your domain's zone file. This domain should be the one you use to send emails. For example if you are using [Mandrill](https://www.mandrill.com/signup/) you would set the host name for this record to:

```text
mandrill._domainkey
```

and the value to:

```text
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrLHiExVd55zd/IQ/J/mRwSRMAocV/hMB3jXwaHH36d9NaVynQFYV8NaWi69c1veUtRzGt7yAioXqLj7Z4TeEUoOLgrKsn8YnckGs9i3B3tVFB+Ch/4mPhXWiNfNdynHWBcPcbJ8kjEQ2U8y78dHZj1YeRXXVvWob2OaKynO8/lQIDAQAB;
```

### Configuring the Subject

The **Subject** field supports all the [common variables](#common-variables) for templates, including:

* `application.name` 
* `user.email` (and other properties of the `user` object)

If the **Subject** field is empty, Auth0 will auto-populate this text depending on what type of email you are sending. For example, one subject line might be "*Verify your email.*"

### Configuring the URL Lifetime

The **Verification Email**, **Change Password** and **Blocked Account Email** contain links which allow users to verify their email address when signing up, confirm their password change, or unblock a blocked account respectively.

You can modify the lifetime of this link for security purposes. By default, the lifetime is 432,000 seconds (five days).

If users click on an expired link and a **Redirect To** URL is configured, they will be redirected to the configured **Redirect To** URL. The following text will be appended to the query string:

```text
http://myapplication.com/my_page/?email=john%contoso.com&message=Access%20expired.&success=false
```

### Configuring the Redirect To URL

The **Redirect To** URL is an optional destination to redirect the user to after the relevant action (verify account, reset password, unblock account) was performed.

::: panel Redirect URLs
With the Classic Experience, you can provide a URL to which users are redirected after they reset their password. Auth0 sends a success indicator and a message to the URL.

With the New Experience, Auth0 redirects users to the [default log in route](/universal-login/default-login-url) when the user succeeds in resetting the password. If not, Auth0 handles the errors as part of the Universal Login flow and ignores the redirect URL provided in the email template.
:::

**Only the following three variables** are available on the **Redirect To** URL:

* `application.name` (or its synonym `client.name`)
* `application.clientID`
* `application.callback_domain` (or its synonym `client.callback_domain`)
  
The `application.callback_domain` variable will contain the origin of the **first** URL listed in the application's **Allowed <dfn data-key="callback">Callback URL</dfn>** list. This lets you redirect users to a path of the application that triggered the action by using a syntax like this:

```text
{{ application.callback_domain }}/result_page
```

Note that while the variable is called `callback_domain`, it is really an *origin*, so it includes the protocol in addition to the domain, e.g. `https://myapp.com`.

If your application has multiple **Allowed Callback URLs** configured, Auth0 will use the first URL listed. You can also provide a default origin using Liquid syntax:

```text
{{ application.callback_domain | default: "https://my-default-domain.com" }}/result_page
```

#### Dynamic Redirect To URLs

You can set up a different Redirect To URLs based on your application name. For example:

```text
{% if application.name == 'JWT.io' %} https://jwt.io {% else %} https://auth0.com {% endif %}
```

Because the application name is encoded for security, you should always use an encoded value (especially if your application name contains a character that changes once encoded). For example, you'll want to use `My%20App` instead of `My App`.

::: note
For some single-page apps, the redirect to url can sometimes contain a hash that may be removed. This results in the **redirect To** url not working as expected. For more information, see: [Single-Page App Email Redirect Issue](/email/spa-redirect).
:::

### Configuring the Message Body

Message bodies have HTML content, and Liquid syntax is the currently supported templating syntax to use. You can use all the [common variables](#common-variables) plus variables defined in each [individual template](#individual-templates-descriptions).

#### Multilingual Email Templates

You can use Liquid syntax along with properties from the user object to alter the content based on the user preferred language. For example:

```text
{% if user.user_metadata.lang == 'es' %}
  Hola {{ user.name }}, ...
{% elsif user.user_metadata.lang == 'it' %}
  Ciao {{ user.name }}, ...
{% else %}
  Hi {{ user.name }}, ...
{% endif %}
```

##### Debugging Liquid Template Variables

To assist your template development, we've added a custom `{% debug %}` liquid tag, which outputs a summary of the template variables available to your template when it was rendered.  _Remember to remove this tag from any "live" templates._

#### Using Markdown Syntax

::: warning
Use of Markdown in email templates has been deprecated, so you will no longer be able to add new Markdown formatting. If you have an existing template in Markdown, you will be able to toggle from Markdown to Liquid, but changing this setting will result in  you losing any existing Markdown, as well as the ability to use Markdown.
:::

The use of Markdown in email templating has been **deprecated**, and is only available for templates which were already using Markdown as the templating syntax. 
The Markdown syntax uses a `@@variable@@` format for variable substitution. The available variables are similar to those mentioned above for Liquid syntax.

For example, you can refer to a user in the template as follows:

```text
Hello @@user.given_name@@ @@user.family_name@@
```

## Individual Templates Descriptions

### Verification Email

If you turn on the **Verification Email**, users who sign up on a database connection will receive a message asking to confirm their email address by clicking on a URL included in the message.

In addition to the [common variables](#common-variables) available for all email templates, the **Verification Email** provides the `url` variable that refers to the URL that the user will have to click. You will use it in the **Message** field to create a link that the user can follow, as in this example:

```html
<a href="{{ url }}">Confirm my account</a>
```
#### Redirect To Results for the Verification Email Template

You can [configure a **Redirect To** URL](#configuring-redirect-to) to send the users to after the email verification action was attempted. When redirecting, Auth0 will include the following parameters:

* `email` indicating the email of the user
* `success` with value `true` or `false` indicating whether the email verification was successful
* `message` with an additional description of the outcome. Some possible values are:
  * `Your email was verified. You can continue using the application.` (with `success=true`)
  * `This URL can be used only once` (with `success=false`)
  * `Access expired.` (with `success=false`)
  * `User account does not exist or verification code is invalid.` (with `success=false`)
  * `This account is already verified.` (with `success=false`)

The target URL handler should be prepared to gracefully handle other possible messages as well. 

### Welcome Email

Once a user verifies their email address, they will receive a **Welcome Email**. If you turn off the **Verification Email** feature, the **Welcome Email** will be sent to the user when they sign-up (or login for the first time).

### Change Password Email

If a user requests a password change, they will receive a **Change Password** that contains a URL link. When the user clicks on the link, a [Password Reset page](/universal-login/password-reset) will be presented to enter the new password.

In addition to the [common variables](#common-variables) available for all email templates, the **Change Password** has the `url` variable that refers to the URL that the user will have to click. You will use it in the **Message** field to create a link that the user can follow, as in this example:

```html
<a href="{{ url }}">Click here to change your password</a>
```

#### Redirect To Results for the Change Password Template

You can [configure a **Redirect To** URL](#configuring-redirect-to) to send the users to after the password change action was attempted. When redirecting, Auth0 will include the following parameters:

* `email` indicating the email of the user
* `success` with value `true` or `false` indicating whether the password change was successful
* `message` with an additional description of the outcome. Some possible values are:
  * `You can now login to the application with the new password.` (with `success=true`)
  * `This URL can be used only once` (with `success=false`)
  * `Access expired.` (with `success=false`)
  * `The operation cannot be completed. Please try again.` (with `success=false`)

The target URL handler should be prepared to gracefully handle other possible messages as well. 

### Blocked Account Email

If a user attempts to login ten or more times unsuccessfully from the same IP address, the user account will be locked and they will receive a **Blocked Account** email. Once the user receives this email, they will not be able to login from that IP address again until they click on the link contained in the email.

If the user successfully logs in before they exhaust their ten allowed attempts, the counter is reset.

In addition to the [common variables](#common-variables) available for all email templates, the following ones are available in the **Blocked Account Email** template:

* `user.source_ip`
* `user.city`
* `user.country`

This template also provides the `url` variable that should be used to create the link that the user needs to follow. E.g.:

```html
<a href="{{ url }}">Click here to unblock your account</a>
```

#### Redirect To Results for the Blocked Account Email Template

You can [configure a **Redirect To** URL](#configuring-redirect-to) to send the users to after the account unblocking action was attempted. When redirecting, Auth0 will include the following parameters:

* `email` indicating the email of the user
* `success` with value `true` or `false` indicating whether the account unblocking was successful
* `message` with an additional description of the outcome. Some possible values are:
  * `Your account has been unblocked.` (with `success=true`)
  * `This URL can be used only once` (with `success=false`)
  * `Access expired.` (with `success=false`)

The target URL handler should be prepared to gracefully handle other possible messages as well. 

### Password Breach Alert Email

This email type is sent whenever Auth0 detects that the user is trying to access the application using a password that has been leaked by a third party. These emails are only set after enabling **Breached Password Detection** in the [Anomaly Detection](${manage_url}/#/anomaly) section of the dashboard.

Learn more about [Breached Password Detection](/anomaly-detection#breached-password-detection)

### Multi-factor Authentication Enrollment Email

This email will be generated when an multi-factor authentication enrollment invitation is sent. The message will contain a link that, when visited, will show the MFA enrollment experience.

Besides the [common variables](#common-variables) available for all email templates, the `link` variable is available in this email type, containing the URL that you will use to construct the link for this action, as in this example:

```html
<a href="{{ link }}">Enroll your MFA device</a>
```

Do note that, unlike other email templates, the correct variable name is `link` and not `url`. Also, the `connection.name` variable is not available on this email template type.

### Verification Code for Email MFA

This email will be generated when you use email as a MFA method and request a verification code to be sent.

In addition to the [common variables](#common-variables) available, the template provides a `code` variable to render the code used for MFA verification. E.g.:

```html
<div>Your code is: {{ code }}</div>
```

### Passwordless Email

Unlike the previous email templates types, this email template is not configured from the Email Templates section. Instead, it's part of the [settings for the Email Passwordless Connection](${manage_url}/#/connections/passwordless).

The <dfn data-key="passwordless">Passwordless</dfn> Email is sent when a passwordless access is requested, either by code (the user receives a code that types in the application) or by a link (the user clicks on a link and is taken directly to the application).

You can use all the [common variables](#common-variables) available in all templates, plus the following variables defined specifically for the **Passwordless Email** template:

* `send`, which will contain a value of `link`, `link_ios`, `link_android` or `code` depending on the type of passwordless email requested.
* `code` with the one-time-use code to access the application
* `link` with the link that can be clicked by the user to gain access to the application (only for link-type passwordless emails)
* `request_language` will have the language code of the user request, if available
* `operation`, which will be `change_email` if this is a passwordless email change operation.

The default template uses the above variables to do something like this:

```html
<!-- Email change content -->
{% if operation == 'change_email' %}
  <p>Your email address has been updated.</p>
{% else %}
  <!-- Signup email content -->
  {% if send == 'link' or send == 'link_ios' or send == 'link_android' %}
    <p>Click and confirm that you want to sign in to {{ application.name }}. This link will expire in five minutes.</p>
    <a href="{{ link }}">Sign in to {{ application.name }}</a>
    {% elsif send == 'code' %}
    <p>Your verification code is: <b>{{ code }}</b></p>
  {% endif %}
{% endif %}
```

Note that in the Passwordless Email template only the `email` property of the `user` object is available.
