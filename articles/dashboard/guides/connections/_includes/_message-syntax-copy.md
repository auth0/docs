<h3>Message syntax</h3>

<% if (method === "sms") { %>

<p>The body of the message accepts either Markdown or [Liquid](/email/liquid-syntax) syntax. If you choose to use Liquid, you can programmatically construct elements of the message.</p>

<%  } else { %>

<p>The template editor accepts [Liquid](/email/liquid-syntax) syntax embedded within the HTML, which allows you to programmatically construct parts of your message.</p>

<p>You can also alter the authentication process by including parameters in the generated sign-in link; these will be passed in the query string. For example, you may want to request permission to access user profile information.</p>

<%  } %>