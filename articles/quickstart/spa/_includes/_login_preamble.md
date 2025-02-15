### Authentication with Auth0

<a href="/hosted-pages/login" target="_blank">Universal Login</a> is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features. This guide will use it to provide a way for your users to log in to your ${library} application.

::: note
You can also embed the login dialog directly in your application using the <a href="/lock" target="_blank">Lock widget</a>. If you use this method, some features, such as single sign-on, will not be accessible. 
<% if (typeof embeddedLoginLink == 'string') { %>
To learn how to embed the Lock widget in your application, follow the <a href="$embeddedLoginLink" target="_blank">Embedded Login sample</a>.
<% } %>
:::

When a user logs in, Auth0 returns three items:
* `access_token`: to learn more, see the <a href="/tokens/concepts/access-tokens" target="_blank">Access Token documentation</a>
* `id_token`: to learn more, see the <a href="/tokens/concepts/id-tokens" target="_blank">ID Token documentation</a>
* `expires_in`: the number of seconds before the Access Token expires

You can use these items in your application to set up and manage authentication. 
