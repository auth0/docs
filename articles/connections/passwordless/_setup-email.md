#### 1. Optional: Configure an email provider

By default, Auth0 sends the email from its own messaging provider. Optionally, you can [configure your own email provider](/email/providers) to better monitor and troubleshoot the email service.

#### 2. Configure the connection

In the Dashboard, on the **Email** page, under [Connections > Passwordless](${manage_url}/#/connections/passwordless), you can configure the contents and behavior of the email.

![](/media/articles/connections/passwordless/passwordless-email-config.png)

##### Multi-Language Support

The Message area supports usage of multiple languages.

By making a call to the [/passwordless/start](/api/authentication#!#post--with_email) authentication endpoint, you can set the value of an 'x-request-language' header to the language of your choice. If the value of this header is not set, the language will be extracted from the value in the 'accept-language' header that is automatically set by the browser.

The Message area accepts Liquid syntax. You can use this syntax, combined with exposed parameter values, to programmatically construct elements of the message. For example, you can reference the `request_language` parameter to change the language of the message:

```text
{% if request_language contains 'dutch' %}
   Hier is uw verificatie code: {{ code }}
{% endif %}

{% if request_language contains 'fr-FR' %}
   Ceci est votre code: {{ code }}
{% endif %}
```

The following parameters are available when defining the template:

| Exposed Parameter | Description |
|:------------------|:---------|
| `code`            | the password to use |
| `link`            | the magic link |
| `application.name` | the name of the application name where the user is signing up |
| `request_language` | the requested language for the message content |
| `operation` | equals `change_email` when the template is triggered by an update to a user's email via the API, otherwise null |