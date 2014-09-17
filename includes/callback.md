### Before Starting

<div class="setup-callback">
<% if (account.userName && hasCallback) { %>
<p>Please remember that for security purposes, you have to register the URL of your app on the <a href="<%= uiAppSettingsURL %>" target="_blank">Settings Section</a> section on Auth0 Admin app as the callbackURL.</p>
<p>Right now, that callback is set to the following:
<pre><code><%= account.callback %></code></pre>
</p>
<% } else { %>
<p>Please remember that for security purposes, you have to register the URL of your app on the <a href="https://app.auth0.com/#/applications" target="_blank">Settings Section</a> section on Auth0 Admin app as the callbackURL.</p>
<% } %>

</div>
