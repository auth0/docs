<h3>Message syntax</h3>

<% if (method === "SMS") { %>

<p>The body of the message accepts either Markdown or <a href="/email/liquid-syntax">Liquid</a> syntax. If you choose to use Liquid, you can programmatically construct elements of the message by including variables inside <code>{{ }}</code>. For Markdown, use <code>@@ @@</code>.</p>

<%  } else { %>

<p>The template editor accepts <a href="/email/liquid-syntax">Liquid</a> syntax embedded within the HTML, which allows you to programmatically construct parts of your message by including variables inside <code>{{ }}</code>.</p>
<%  } %>

::: warning
You must include the <code>password</code> or <code>code</code> variable because it is the placeholder for the one-time-use code that will be sent to the user.
:::

<p>Commonly used available variables include:</p>

| Variable             | Description |
|----------------------|-------------|
| `password` or `code` | One-time-use code sent to the authenticating user. **Make sure that your message includes this variable because it is the placeholder that will be replaced with the one-time-use code that is sent to the user.** |
| `application.name` | Name of the application to which the user is logging in. |
| `request_language` | Requested language for the message's content. |

<% if (method === "Email") { %>
<p>For other possible variables, see <a href="/email/templates#passwordless-email">Customizing your Emails: Passwordless Email</a>.</p>
<%  } %>