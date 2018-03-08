<div class="setup-callback">
<% if (account.callback) { %>
<p>For security purposes, you must add the callback URL of your app to your <a href="${manage_url}/#/applications/${account.clientId}/settings">Client Settings</a>.</p>
<p>Your callback URL is currently set to:</p>
<pre><code><%= account.callback %></code></pre>
<% } else { %>
<p>For security purposes, you must add the callback URL of your app to your <a href="${manage_url}/#/applications">Client Settings</a>.</p>
<% } %>

</div>
