<li>
In <strong><% if (method === "SMS") { %>Message<%  } else { %>Body<%  } %></strong>, enter the body text of the ${method} and customize as necessary.

<% if (method === "SMS") { %>

<%= include('./_message-syntax', {"method": "SMS"}) %>

<%  } else { %>

By default, your email message will use Auth0's email template. If you want to use a custom template for your email message, enter its HTML.

::: warning
If you use a custom template for your email message, the **From** email address must not include the **auth0.com** domain. Otherwise, the default email template will be sent.
:::

::: note
To revert changes made to the email template, you can either **reset to last saved** template or **reset to default** template.
:::

<%= include('./_message-syntax', {"method": "Email"}) %>

<%  } %>

<%= include('./_message-language') %>
</li>